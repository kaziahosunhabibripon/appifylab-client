"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { api } from "@/lib/api";
import { clearToken, getToken } from "@/lib/auth-storage";
import type { Comment, LikeState, Post, User } from "@/lib/types";

type FeedState = {
  token: string | null;
  user: User | null;
  posts: Post[];
  isLoading: boolean;
  error: string;
};

function applyLikeToComment(comment: Comment, state: LikeState): Comment {
  if (comment.id === state.target_id) {
    return {
      ...comment,
      is_liked: state.liked,
      likes_count: state.likes_count,
      liked_by: state.liked_by,
    };
  }

  return {
    ...comment,
    replies: comment.replies.map((reply) => applyLikeToComment(reply, state)),
  };
}

export function useFeed() {
  const router = useRouter();
  const [state, setState] = useState<FeedState>({
    token: null,
    user: null,
    posts: [],
    isLoading: true,
    error: "",
  });

  const refresh = useCallback(async (currentToken?: string) => {
    const token = currentToken ?? getToken();
    if (!token) {
      router.replace("/login");
      return;
    }

    setState((current) => ({ ...current, token, isLoading: true, error: "" }));

    try {
      const [user, posts] = await Promise.all([api.me(token), api.feed(token)]);
      setState({ token, user, posts, isLoading: false, error: "" });
    } catch (err) {
      clearToken();
      setState((current) => ({
        ...current,
        isLoading: false,
        error: err instanceof Error ? err.message : "Unable to load feed",
      }));
      router.replace("/login");
    }
  }, [router]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  function apiErrorMessage(err: unknown, fallback: string) {
    return err instanceof Error ? err.message : fallback;
  }

  async function createPost(data: FormData) {
    if (!state.token) return;
    try {
      const post = await api.createPost(state.token, data);
      setState((current) => ({ ...current, posts: [post, ...current.posts], error: "" }));
    } catch (err) {
      setState((current) => ({
        ...current,
        error: apiErrorMessage(err, "Unable to create post"),
      }));
    }
  }

  async function addComment(postId: number, content: string) {
    if (!state.token) return;
    try {
      const comment = await api.addComment(state.token, postId, content);
      setState((current) => ({
        ...current,
        error: "",
        posts: current.posts.map((post) =>
          post.id === postId ? { ...post, comments: [...post.comments, comment] } : post,
        ),
      }));
    } catch (err) {
      setState((current) => ({
        ...current,
        error: apiErrorMessage(err, "Unable to add comment"),
      }));
    }
  }

  async function addReply(postId: number, commentId: number, content: string) {
    if (!state.token) return;
    try {
      const reply = await api.addReply(state.token, commentId, content);
      setState((current) => ({
        ...current,
        error: "",
        posts: current.posts.map((post) =>
          post.id === postId
            ? {
                ...post,
                comments: post.comments.map((comment) =>
                  comment.id === commentId
                    ? { ...comment, replies: [...comment.replies, reply] }
                    : comment,
                ),
              }
            : post,
        ),
      }));
    } catch (err) {
      setState((current) => ({
        ...current,
        error: apiErrorMessage(err, "Unable to add reply"),
      }));
    }
  }

  async function toggleLike(targetType: "post" | "comment" | "reply", targetId: number) {
    if (!state.token) return;
    try {
      const likeState = await api.toggleLike(state.token, targetType, targetId);
      setState((current) => ({
        ...current,
        error: "",
        posts: current.posts.map((post) => {
          if (targetType === "post" && post.id === targetId) {
            return {
              ...post,
              is_liked: likeState.liked,
              likes_count: likeState.likes_count,
              liked_by: likeState.liked_by,
            };
          }

          return {
            ...post,
            comments: post.comments.map((comment) => applyLikeToComment(comment, likeState)),
          };
        }),
      }));
    } catch (err) {
      setState((current) => ({
        ...current,
        error: apiErrorMessage(err, "Unable to update like"),
      }));
    }
  }

  function logout() {
    clearToken();
    router.replace("/login");
  }

  return {
    ...state,
    refresh,
    createPost,
    addComment,
    addReply,
    toggleLike,
    logout,
  };
}

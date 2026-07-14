"use client";

import { FormEvent, useState } from "react";
import { Heart, MessageCircle, MoreHorizontal, Send, Share2 } from "lucide-react";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CommentThread } from "@/components/feed/comment-thread";
import { API_BASE_URL } from "@/lib/api";
import type { Post } from "@/lib/types";
import { compactNames, cn } from "@/lib/utils";

type PostCardProps = {
  post: Post;
  onAddComment: (postId: number, content: string) => Promise<void>;
  onAddReply: (postId: number, commentId: number, content: string) => Promise<void>;
  onToggleLike: (targetType: "post" | "comment" | "reply", targetId: number) => Promise<void>;
};

function displayImageUrl(url: string | null) {
  if (!url) return null;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;

  const origin = API_BASE_URL.replace(/\/api\/v1\/?$/, "");
  const path = url.startsWith("/") ? url : `/${url}`;
  return `${origin}${path}`;
}

function timeLabel(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Just now";
  const diff = Date.now() - date.getTime();
  const minutes = Math.max(1, Math.floor(diff / 60000));
  if (minutes < 60) return `${minutes} minute ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour ago`;
  return date.toLocaleDateString();
}

export function PostCard({ post, onAddComment, onAddReply, onToggleLike }: PostCardProps) {
  const [comment, setComment] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);
  const imageUrl = displayImageUrl(post.image_url);

  async function submitComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!comment.trim()) return;

    setIsCommenting(true);
    try {
      await onAddComment(post.id, comment.trim());
      setComment("");
    } finally {
      setIsCommenting(false);
    }
  }

  return (
    <Card className="overflow-hidden border-0 shadow-none">
      <div className="p-6">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <Avatar
              src="/assets/images/post_img.png"
              firstName={post.owner.first_name}
              lastName={post.owner.last_name}
            />
            <div className="min-w-0">
              <h3 className="truncate text-base font-semibold">
                {post.owner.first_name} {post.owner.last_name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {timeLabel(post.created_at)} .{" "}
                <span className="capitalize">{post.visibility}</span>
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" aria-label="Post options">
            <MoreHorizontal className="size-5" />
          </Button>
        </div>

        <p className="whitespace-pre-wrap text-[15px] leading-7 text-[#212121]">{post.content}</p>
      </div>

      {imageUrl ? (
        <div className="max-h-[520px] overflow-hidden bg-muted">
          <img src={imageUrl} alt="" className="h-auto w-full object-cover" />
        </div>
      ) : null}

      <div className="px-6 py-4">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="grid size-7 place-items-center rounded-full bg-primary text-white">
              <Heart className="size-4 fill-current" />
            </span>
            <span title={compactNames(post.liked_by)}>
              {post.likes_count > 0 ? compactNames(post.liked_by) : "Be the first to like"}
            </span>
          </div>
          <span>{post.comments.length} Comment</span>
        </div>

        <div className="grid grid-cols-3 border-y border-border">
          <button
            type="button"
            onClick={() => onToggleLike("post", post.id)}
            className={cn(
              "inline-flex h-12 items-center justify-center gap-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-primary",
              post.is_liked && "text-primary",
            )}
          >
            <Heart className={cn("size-5", post.is_liked && "fill-current")} />
            Like
          </button>
          <button
            type="button"
            className="inline-flex h-12 items-center justify-center gap-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-primary"
          >
            <MessageCircle className="size-5" />
            Comment
          </button>
          <button
            type="button"
            className="inline-flex h-12 items-center justify-center gap-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-primary"
          >
            <Share2 className="size-5" />
            Share
          </button>
        </div>

        <form onSubmit={submitComment} className="mt-5 flex gap-3">
          <Avatar src="/assets/images/comment_img.png" className="size-10" />
          <input
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            className="h-11 flex-1 rounded-full bg-muted px-4 text-sm outline-none focus:ring-2 focus:ring-primary/15"
            placeholder="Write a comment"
          />
          <Button size="icon" type="submit" disabled={isCommenting || !comment.trim()}>
            <Send className="size-4" />
          </Button>
        </form>

        {post.comments.length > 0 ? (
          <div className="mt-6 space-y-5">
            {post.comments.map((item) => (
              <CommentThread
                key={item.id}
                comment={item}
                onReply={(commentId, content) => onAddReply(post.id, commentId, content)}
                onToggleLike={onToggleLike}
              />
            ))}
          </div>
        ) : null}
      </div>
    </Card>
  );
}

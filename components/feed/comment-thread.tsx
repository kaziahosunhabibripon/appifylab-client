"use client";

import { FormEvent, useState } from "react";
import { Heart, MessageCircle, Send } from "lucide-react";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { compactNames, cn } from "@/lib/utils";
import type { Comment } from "@/lib/types";

type CommentThreadProps = {
  comment: Comment;
  onReply: (commentId: number, content: string) => Promise<void>;
  onToggleLike: (targetType: "comment" | "reply", targetId: number) => Promise<void>;
};

export function CommentThread({ comment, onReply, onToggleLike }: CommentThreadProps) {
  const [reply, setReply] = useState("");
  const [isReplying, setIsReplying] = useState(false);
  const targetType = comment.parent_id ? "reply" : "comment";

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!reply.trim()) return;

    setIsReplying(true);
    try {
      await onReply(comment.id, reply.trim());
      setReply("");
    } finally {
      setIsReplying(false);
    }
  }

  return (
    <div className={cn("flex gap-3", comment.parent_id && "ml-10")}>
      <Avatar
        firstName={comment.owner.first_name}
        lastName={comment.owner.last_name}
        src="/assets/images/txt_img.png"
        className="size-9"
      />
      <div className="min-w-0 flex-1">
        <div className="rounded-md bg-muted px-4 py-3">
          <div className="mb-1 flex items-center justify-between gap-3">
            <p className="truncate text-sm font-semibold">
              {comment.owner.first_name} {comment.owner.last_name}
            </p>
            {comment.likes_count > 0 ? (
              <span className="text-xs text-muted-foreground" title={compactNames(comment.liked_by)}>
                {comment.likes_count}
              </span>
            ) : null}
          </div>
          <p className="text-sm leading-6 text-muted-foreground">{comment.content}</p>
        </div>

        <div className="mt-2 flex items-center gap-4 text-xs font-medium text-muted-foreground">
          <button
            type="button"
            onClick={() => onToggleLike(targetType, comment.id)}
            className={cn(
              "inline-flex items-center gap-1 hover:text-primary",
              comment.is_liked && "text-primary",
            )}
          >
            <Heart className={cn("size-3.5", comment.is_liked && "fill-current")} />
            Like
          </button>
          {!comment.parent_id ? (
            <span className="inline-flex items-center gap-1">
              <MessageCircle className="size-3.5" />
              Reply
            </span>
          ) : null}
        </div>

        {!comment.parent_id ? (
          <form onSubmit={submit} className="mt-3 flex gap-2">
            <input
              value={reply}
              onChange={(event) => setReply(event.target.value)}
              className="h-9 flex-1 rounded-full bg-muted px-4 text-sm outline-none focus:ring-2 focus:ring-primary/15"
              placeholder="Write a reply"
            />
            <Button size="icon" type="submit" disabled={isReplying || !reply.trim()}>
              <Send className="size-4" />
            </Button>
          </form>
        ) : null}

        {comment.replies.length > 0 ? (
          <div className="mt-4 space-y-4">
            {comment.replies.map((replyItem) => (
              <CommentThread
                key={replyItem.id}
                comment={replyItem}
                onReply={onReply}
                onToggleLike={onToggleLike}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

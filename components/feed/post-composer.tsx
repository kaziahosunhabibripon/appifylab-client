"use client";

import Image from "next/image";
import { FormEvent, useRef, useState } from "react";
import { ImageIcon, Lock, Send, Users } from "lucide-react";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import type { User } from "@/lib/types";

type PostComposerProps = {
  user: User | null;
  onCreate: (data: FormData) => Promise<void>;
};

export function PostComposer({ user, onCreate }: PostComposerProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [content, setContent] = useState("");
  const [visibility, setVisibility] = useState<"public" | "private">("public");
  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!content.trim() && !image) return;

    const data = new FormData();
    data.append("content", content.trim());
    data.append("visibility", visibility);
    if (image) data.append("image", image);

    setIsSubmitting(true);
    try {
      await onCreate(data);
      setContent("");
      setImage(null);
      if (fileRef.current) fileRef.current.value = "";
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="border-0 p-6 shadow-none">
      <form onSubmit={submit}>
        <div className="flex gap-4">
          <Avatar
            src="/assets/images/profile.png"
            firstName={user?.first_name}
            lastName={user?.last_name}
          />
          <Textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Write something ..."
            className="min-h-24 resize-none border-0 bg-muted"
          />
        </div>

        {image ? (
          <div className="mt-4 overflow-hidden rounded-md border bg-muted">
            <Image
              src={URL.createObjectURL(image)}
              alt=""
              width={720}
              height={320}
              className="max-h-72 w-full object-cover"
            />
          </div>
        ) : null}

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => setImage(event.target.files?.[0] ?? null)}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => fileRef.current?.click()}
            >
              <ImageIcon className="size-4 text-primary" />
              Photo
            </Button>
            <button
              type="button"
              onClick={() => setVisibility("public")}
              className={`inline-flex h-9 items-center gap-2 rounded-md px-3 text-sm font-medium ${
                visibility === "public" ? "bg-primary/10 text-primary" : "text-muted-foreground"
              }`}
            >
              <Users className="size-4" />
              Public
            </button>
            <button
              type="button"
              onClick={() => setVisibility("private")}
              className={`inline-flex h-9 items-center gap-2 rounded-md px-3 text-sm font-medium ${
                visibility === "private" ? "bg-primary/10 text-primary" : "text-muted-foreground"
              }`}
            >
              <Lock className="size-4" />
              Private
            </button>
          </div>

          <Button type="submit" disabled={isSubmitting}>
            <Send className="size-4" />
            {isSubmitting ? "Posting..." : "Post"}
          </Button>
        </div>
      </form>
    </Card>
  );
}

"use client";

import { Loader2 } from "lucide-react";

import { FeedHeader } from "@/components/feed/feed-header";
import { LeftSidebar, RightSidebar } from "@/components/feed/sidebar";
import { PostCard } from "@/components/feed/post-card";
import { PostComposer } from "@/components/feed/post-composer";
import { StoryRail } from "@/components/feed/story-rail";
import { useFeed } from "@/components/feed/use-feed";
import { Button } from "@/components/ui/button";

export function FeedPage() {
  const feed = useFeed();

  return (
    <main className="min-h-screen bg-[#F0F2F5]">
      <FeedHeader user={feed.user} onLogout={feed.logout} />

      <div className="mx-auto grid max-w-[1320px] gap-4 px-4 py-4 lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)_300px]">
        <LeftSidebar />

        <section className="feed-scroll h-[calc(100vh-86px)] overflow-auto">
          {feed.isLoading ? (
            <div className="grid min-h-[60vh] place-items-center text-muted-foreground">
              <div className="flex items-center gap-3">
                <Loader2 className="size-5 animate-spin" />
                Loading feed
              </div>
            </div>
          ) : feed.error ? (
            <div className="rounded-md bg-card p-8 text-center">
              <p className="mb-4 text-destructive">{feed.error}</p>
              <Button onClick={() => feed.refresh()}>Try again</Button>
            </div>
          ) : (
            <div className="mx-auto max-w-[680px] space-y-4 pb-8">
              <StoryRail />
              <PostComposer user={feed.user} onCreate={feed.createPost} />

              {feed.posts.length === 0 ? (
                <div className="rounded-md bg-card p-8 text-center text-muted-foreground">
                  No posts yet.
                </div>
              ) : (
                feed.posts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onAddComment={feed.addComment}
                    onAddReply={feed.addReply}
                    onToggleLike={feed.toggleLike}
                  />
                ))
              )}
            </div>
          )}
        </section>

        <RightSidebar />
      </div>
    </main>
  );
}

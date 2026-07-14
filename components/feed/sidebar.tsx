import Image from "next/image";
import { Bookmark, CalendarDays, Gamepad2, Search, Settings, UserPlus, Users } from "lucide-react";

import { Card } from "@/components/ui/card";

const exploreItems = [
  { label: "Find friends", icon: UserPlus },
  { label: "Bookmarks", icon: Bookmark },
  { label: "Group", icon: Users },
  { label: "Gaming", icon: Gamepad2 },
  { label: "Settings", icon: Settings },
];

const people = [
  { name: "Steve Jobs", role: "CEO of Apple", image: "/assets/images/people1.png" },
  { name: "Ryan Roslansky", role: "CEO of Linkedin", image: "/assets/images/people2.png" },
  { name: "Dylan Field", role: "CEO of Figma", image: "/assets/images/people3.png" },
];

export function LeftSidebar() {
  return (
    <aside className="feed-scroll hidden h-[calc(100vh-86px)] overflow-auto lg:block">
      <Card className="mb-4 border-0 p-6 shadow-none">
        <h2 className="mb-5 text-lg font-semibold">Explore</h2>
        <div className="space-y-1">
          {exploreItems.map((item) => (
            <button
              key={item.label}
              className="flex w-full items-center gap-3 rounded-md px-2 py-3 text-left text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <item.icon className="size-5" />
              {item.label}
            </button>
          ))}
        </div>
      </Card>

      <Card className="mb-4 border-0 p-6 shadow-none">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Suggested People</h2>
          <span className="text-sm text-primary">See All</span>
        </div>
        <div className="space-y-5">
          {people.map((person) => (
            <div key={person.name} className="flex items-center gap-3">
              <Image
                src={person.image}
                alt=""
                width={46}
                height={46}
                className="size-11 rounded-full object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{person.name}</p>
                <p className="truncate text-xs text-muted-foreground">{person.role}</p>
              </div>
              <span className="text-sm font-medium text-primary">Connect</span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="border-0 p-6 shadow-none">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Events</h2>
          <span className="text-sm text-primary">See all</span>
        </div>
        <div className="overflow-hidden rounded-md border">
          <Image
            src="/assets/images/feed_event1.png"
            alt=""
            width={360}
            height={160}
            className="h-32 w-full object-cover"
          />
          <div className="p-4">
            <div className="flex gap-3">
              <div className="grid size-12 place-items-center rounded-md bg-primary/10 text-primary">
                <CalendarDays className="size-5" />
              </div>
              <div>
                <p className="font-semibold">No more terrorism no more cry</p>
                <p className="mt-1 text-sm text-muted-foreground">17 People Going</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </aside>
  );
}

export function RightSidebar() {
  return (
    <aside className="feed-scroll hidden h-[calc(100vh-86px)] overflow-auto xl:block">
      <Card className="mb-4 border-0 p-6 shadow-none">
        <h2 className="mb-5 text-lg font-semibold">You Might Like</h2>
        <div className="space-y-5">
          {people.map((person) => (
            <div key={person.name} className="flex items-center gap-3">
              <Image
                src={person.image}
                alt=""
                width={46}
                height={46}
                className="size-11 rounded-full object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{person.name}</p>
                <p className="truncate text-xs text-muted-foreground">{person.role}</p>
              </div>
              <span className="text-sm font-medium text-primary">Follow</span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="border-0 p-6 shadow-none">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Your Friends</h2>
          <span className="text-sm text-primary">See All</span>
        </div>
        <div className="relative mb-5">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            className="h-10 w-full rounded-full bg-muted pl-10 pr-4 text-sm outline-none"
            placeholder="input search text"
          />
        </div>
        <div className="space-y-4">
          {people.concat(people).map((person, index) => (
            <div key={`${person.name}-${index}`} className="flex items-center gap-3">
              <Image
                src={person.image}
                alt=""
                width={42}
                height={42}
                className="size-10 rounded-full object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{person.name}</p>
                <p className="truncate text-xs text-muted-foreground">{person.role}</p>
              </div>
              <span className="size-2 rounded-full bg-[#0ACF83]" />
            </div>
          ))}
        </div>
      </Card>
    </aside>
  );
}

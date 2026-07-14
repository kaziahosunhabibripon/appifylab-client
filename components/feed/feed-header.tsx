"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  Bell,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Home,
  LogOut,
  MessageCircle,
  MoreVertical,
  Search,
  Settings,
  Users,
} from "lucide-react";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { User } from "@/lib/types";

type FeedHeaderProps = {
  user: User | null;
  onLogout: () => void;
};

const notifications = [
  {
    id: 1,
    avatar: "/assets/images/people1.png",
    actor: "Steve Jobs",
    message: "Steve Jobs posted a link in your timeline.",
  },
  {
    id: 2,
    avatar: "/assets/images/card_ppl3.png",
    actor: "An admin",
    message: "An admin changed the name of the group Freelancer usa to Freelancer usa",
  },
  {
    id: 3,
    avatar: "/assets/images/people1.png",
    actor: "Steve Jobs",
    message: "Steve Jobs posted a link in your timeline.",
  },
  {
    id: 4,
    avatar: "/assets/images/card_ppl3.png",
    actor: "An admin",
    message: "An admin changed the name of the group Freelancer usa to Freelancer usa",
  },
  {
    id: 5,
    avatar: "/assets/images/people1.png",
    actor: "Steve Jobs",
    message: "Steve Jobs posted a link in your timeline.",
  },
];

export function FeedHeader({ user, onLogout }: FeedHeaderProps) {
  const [openMenu, setOpenMenu] = useState<"notifications" | "profile" | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const fullName = user ? `${user.first_name} ${user.last_name}` : "Loading";

  useEffect(() => {
    function closeMenu(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    }

    document.addEventListener("mousedown", closeMenu);
    return () => document.removeEventListener("mousedown", closeMenu);
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-card">
      <div ref={menuRef} className="relative mx-auto flex h-[70px] max-w-[1320px] items-center gap-5 px-4">
        <Image src="/assets/images/logo.svg" alt="Buddy Script" width={145} height={38} />

        <div className="hidden flex-1 md:block">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              className="h-10 w-full rounded-full border border-transparent bg-muted pl-11 pr-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
              placeholder="input search text"
              type="search"
            />
          </div>
        </div>

        <nav className="ml-auto hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="icon" aria-label="Home">
            <Home className="size-5 text-primary" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Friends">
            <Users className="size-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Notifications"
            className="relative"
            onClick={() => setOpenMenu(openMenu === "notifications" ? null : "notifications")}
          >
            <Bell className="size-5" />
            <span className="absolute right-1 top-1 grid size-5 place-items-center rounded-full bg-primary text-[11px] font-semibold text-white">
              6
            </span>
            {openMenu === "notifications" ? (
              <span className="absolute -bottom-[15px] left-1/2 h-0.5 w-12 -translate-x-1/2 bg-primary" />
            ) : null}
          </Button>
          <Button variant="ghost" size="icon" aria-label="Messages" className="relative">
            <MessageCircle className="size-5" />
            <span className="absolute right-1 top-1 grid size-5 place-items-center rounded-full bg-primary text-[11px] font-semibold text-white">
              2
            </span>
          </Button>
        </nav>

        <button
          type="button"
          onClick={() => setOpenMenu(openMenu === "profile" ? null : "profile")}
          className="flex min-w-0 items-center gap-3 rounded-md px-1 py-2 hover:bg-muted"
        >
          <Avatar
            src="/assets/images/profile.png"
            firstName={user?.first_name}
            lastName={user?.last_name}
            className="size-9"
          />
          <div className="hidden min-w-0 sm:block">
            <p className="truncate text-sm font-semibold">{fullName}</p>
          </div>
          <ChevronDown className="size-4" />
        </button>

        {openMenu === "notifications" ? <NotificationDropdown /> : null}
        {openMenu === "profile" ? (
          <ProfileDropdown fullName={fullName} user={user} onLogout={onLogout} />
        ) : null}
      </div>
    </header>
  );
}

function NotificationDropdown() {
  return (
    <div className="absolute right-0 top-[70px] z-40 h-[calc(100vh-70px)] w-[400px] max-w-[calc(100vw-24px)] overflow-hidden rounded-b-md bg-card shadow-2xl">
      <div className="flex items-center justify-between px-5 py-4">
        <h2 className="text-xl font-bold text-[#111827]">Notifications</h2>
        <Button variant="ghost" size="icon" aria-label="Notification options">
          <MoreVertical className="size-5 text-muted-foreground" />
        </Button>
      </div>

      <div className="flex gap-3 px-5 pb-4">
        <button className="rounded-md bg-primary/10 px-3 py-2 text-sm font-semibold text-primary">
          All
        </button>
        <button className="rounded-md bg-muted px-3 py-2 text-sm font-semibold text-[#1f2937]">
          Unread
        </button>
      </div>

      <div className="feed-scroll h-[calc(100%-122px)] overflow-auto px-5 pb-6">
        <div className="space-y-7">
          {notifications.map((notification) => (
            <div key={notification.id} className="flex gap-4">
              <Avatar src={notification.avatar} className="size-14 bg-muted" />
              <div className="min-w-0 pt-1">
                <p className="text-[15px] font-medium leading-6 text-[#4b5563]">
                  <span className="font-bold text-[#111827]">{notification.actor}</span>{" "}
                  {notification.message.replace(`${notification.actor} `, "")}
                </p>
                <p className="mt-1 text-sm font-bold text-primary">42 minutes ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProfileDropdown({
  fullName,
  user,
  onLogout,
}: {
  fullName: string;
  user: User | null;
  onLogout: () => void;
}) {
  return (
    <div className="absolute right-0 top-[64px] z-50 w-[312px] max-w-[calc(100vw-24px)] rounded-md bg-card p-5 shadow-2xl">
      <div className="flex gap-3">
        <Avatar
          src="/assets/images/profile.png"
          firstName={user?.first_name}
          lastName={user?.last_name}
          className="size-14 ring-2 ring-primary ring-offset-2"
        />
        <div className="min-w-0">
          <h2 className="truncate text-base font-bold text-[#1f2937]">{fullName}</h2>
          <button className="mt-1 text-sm font-medium text-primary">View Profile</button>
        </div>
      </div>

      <div className="my-5 h-px bg-border" />

      <div className="space-y-3">
        <ProfileMenuItem icon={Settings} label="Settings" />
        <ProfileMenuItem icon={CircleHelp} label="Help & Support" />
        <ProfileMenuItem icon={LogOut} label="Log Out" onClick={onLogout} />
      </div>
    </div>
  );
}

function ProfileMenuItem({
  icon: Icon,
  label,
  onClick,
}: {
  icon: typeof Settings;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-4 rounded-md py-1.5 text-left text-[15px] font-semibold text-muted-foreground hover:text-primary"
    >
      <span className="grid size-11 place-items-center rounded-full bg-primary/10 text-primary">
        <Icon className="size-5" />
      </span>
      <span className="flex-1">{label}</span>
      <ChevronRight className="size-4" />
    </button>
  );
}

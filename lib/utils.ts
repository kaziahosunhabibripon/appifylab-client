import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function initials(firstName?: string, lastName?: string) {
  const first = firstName?.[0] ?? "";
  const last = lastName?.[0] ?? "";
  return `${first}${last}`.toUpperCase() || "U";
}

export function compactNames(users: { first_name: string; last_name: string }[]) {
  if (users.length === 0) return "No likes yet";
  if (users.length === 1) return `${users[0].first_name} ${users[0].last_name}`;
  return `${users[0].first_name} ${users[0].last_name} and ${users.length - 1} more`;
}

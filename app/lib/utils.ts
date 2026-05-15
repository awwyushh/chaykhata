import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const ITEM_LABELS: Record<string, { label: string; emoji: string }> = {
  CHAY: { label: "Chay", emoji: "☕" },
  LUNCH: { label: "Lunch", emoji: "🍱" },
  SNACKS: { label: "Snacks", emoji: "🍔" },
  CUSTOM: { label: "Custom", emoji: "✍️" },
};

export const ROAST_MESSAGES = [
  "Still hasn't paid? Classic. 😤",
  "The audacity of this person 👀",
  "They owe you more chai than a dhaba 🫖",
  "Friendship tested. Chai not paid. 💀",
  "Running from debts like it's cardio 🏃",
  "This khata grows faster than interest 📈",
  "A professional chai avoider 🙈",
  "Memory shorter than an Instagram reel 🤳",
  "Will repay 'kisi din' (never) 😅",
];

export function getRandomRoast() {
  return ROAST_MESSAGES[Math.floor(Math.random() * ROAST_MESSAGES.length)];
}

export function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export function formatRelativeTime(date: Date | string) {
  const now = new Date();
  const then = new Date(date);
  const diffMs = now.getTime() - then.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

export function generateShareUrl(username: string) {
  if (typeof window !== "undefined") {
    return `${window.location.origin}/${username}`;
  }
  return `/${username}`;
}

export function getDicebearUrl(username: string) {
  return `https://api.dicebear.com/9.x/thumbs/svg?seed=${encodeURIComponent(username)}`;
}

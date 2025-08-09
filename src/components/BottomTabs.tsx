"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/", label: "Головна" },
  { href: "/market", label: "Торгова площа" },
  { href: "/inventory", label: "Інвентар" },
  { href: "/games", label: "Ігри" },
  { href: "/options", label: "Опції" }
];

export default function BottomTabs() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 backdrop-blur bg-black/20 text-white grid grid-cols-5 border-t border-white/20">
      {tabs.map((t) => {
        const active = pathname === t.href;
        return (
          <Link
            key={t.href}
            href={t.href}
            className={cn(
              "flex flex-col items-center justify-center text-xs",
              active ? "text-white" : "text-gray-400"
            )}
          >
            <span className="text-lg">􀋃</span>
            <span>{t.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}



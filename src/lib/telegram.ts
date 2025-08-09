"use client";

import { WebApp } from "@twa-dev/sdk";

export default function initTelegram() {
  try {
    // Ensure Telegram environment if inside Mini App
    if (typeof window !== "undefined" && (window as any).Telegram?.WebApp) {
      WebApp.ready();
      WebApp.expand();
      WebApp.setHeaderColor("#0F1638");
      WebApp.setBackgroundColor("#0F1638");
    }
  } catch {
    // no-op
  }
}



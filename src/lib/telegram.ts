"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function initTelegram() {
  try {
    // Ensure Telegram environment if inside Mini App
    if (typeof window !== "undefined" && (window as any).Telegram?.WebApp) {
      const WebApp = (window as any).Telegram.WebApp;
      if (typeof WebApp.ready === "function") WebApp.ready();
      if (typeof WebApp.expand === "function") WebApp.expand();
      if (typeof WebApp.setHeaderColor === "function")
        WebApp.setHeaderColor("#0F1638");
      if (typeof WebApp.setBackgroundColor === "function")
        WebApp.setBackgroundColor("#0F1638");
    }
  } catch {
    // no-op
  }
}
/* eslint-enable @typescript-eslint/no-explicit-any */

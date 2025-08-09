"use client";

export default function initTelegram() {
  try {
    // Ensure Telegram environment if inside Mini App
    if (
      typeof window !== "undefined" &&
      (window as unknown as { Telegram?: { WebApp?: unknown } }).Telegram
        ?.WebApp
    ) {
      const WebApp = (window as unknown as { Telegram: { WebApp: any } })
        .Telegram.WebApp;
      WebApp.ready();
      WebApp.expand();
      WebApp.setHeaderColor("#0F1638");
      WebApp.setBackgroundColor("#0F1638");
    }
  } catch {
    // no-op
  }
}

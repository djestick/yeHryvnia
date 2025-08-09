"use client";

export default function initTelegram() {
  try {
    // Ensure Telegram environment if inside Mini App
    if (
      typeof window !== "undefined" &&
      (window as unknown as { Telegram?: { WebApp?: unknown } }).Telegram
        ?.WebApp
    ) {
      const WebApp = (window as unknown as { Telegram: { WebApp: Record<string, unknown> } })
        .Telegram.WebApp;
      (WebApp as Record<string, unknown>).ready?.();
      (WebApp as Record<string, unknown>).expand?.();
      (WebApp as Record<string, unknown>).setHeaderColor?.("#0F1638");
      (WebApp as Record<string, unknown>).setBackgroundColor?.("#0F1638");
    }
  } catch {
    // no-op
  }
}

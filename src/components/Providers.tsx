"use client";

import { useEffect } from "react";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import initTelegram from "@/lib/telegram";

type ProvidersProps = {
  children: React.ReactNode;
};

const envManifest = process.env.NEXT_PUBLIC_TONCONNECT_MANIFEST;
const manifestUrl =
  envManifest && envManifest.length > 0
    ? envManifest
    : typeof window !== "undefined"
    ? `${window.location.origin}/tonconnect-manifest.json`
    : "/tonconnect-manifest.json";

export default function Providers({ children }: ProvidersProps) {
  useEffect(() => {
    initTelegram();
  }, []);

  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      {children}
    </TonConnectUIProvider>
  );
}

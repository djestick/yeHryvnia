"use client";

import { useTonWallet } from "@tonconnect/ui-react";
import { useEffect, useState } from "react";
import WalletConnect from "./WalletConnect";

export default function Header() {
  console.log("=== HEADER COMPONENT START ===");
  const wallet = useTonWallet();
  const [balance, setBalance] = useState<string>("0");
  const [loading, setLoading] = useState(false);

  console.log("Header component rendered, wallet:", wallet);

  // Функция для получения баланса єГрн
  const fetchBalance = async (address: string) => {
    console.log("fetchBalance called with address:", address);
    if (!address) {
      console.log("No address provided, returning");
      return;
    }

    setLoading(true);
    try {
      // Используем Toncenter API для получения баланса Jetton
      const jettonMaster =
        process.env.NEXT_PUBLIC_TON_JETTON_MASTER ||
        "EQDQ6e3CLKCiIiOGOGYuYHvs0zwztTpbIU1M6MVeGGx5_wlF";
      console.log("Fetching balance for:", address);
      console.log("Jetton master:", jettonMaster);
      console.log(
        "NEXT_PUBLIC_TON_JETTON_MASTER env:",
        process.env.NEXT_PUBLIC_TON_JETTON_MASTER
      );

      const response = await fetch(
        `https://toncenter.com/api/v2/jetton/balances?account=${address}&jetton_master=${jettonMaster}`
      );

      console.log("Response status:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log("API response:", data);

        if (data.result && data.result.length > 0) {
          // Конвертируем из нанограмм в єГрн (делим на 10^9)
          const balanceInNano = data.result[0].balance;
          const balanceInHryvnia = (parseInt(balanceInNano) / 1e9).toFixed(2);
          console.log("Balance in nano:", balanceInNano);
          console.log("Balance in hryvnia:", balanceInHryvnia);
          setBalance(balanceInHryvnia);
        } else {
          console.log("No jetton balance found");
          setBalance("0");
        }
      } else {
        console.error("API error:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error fetching balance:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Wallet changed:", wallet);
    console.log("Wallet account:", wallet?.account);

    if (wallet?.account?.address) {
      console.log("Fetching balance for address:", wallet.account.address);
      fetchBalance(wallet.account.address);
    } else {
      console.log("No wallet address, setting balance to 0");
      setBalance("0");
    }
  }, [wallet?.account?.address]);

  console.log("Header rendering with wallet:", wallet);
  console.log("Balance state:", balance);
  console.log("Loading state:", loading);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur border-b border-white/20 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <h1 className="text-lg font-bold text-white">TON Cards</h1>
          {wallet?.account?.address && (
            <div className="text-sm text-white/70">
              {wallet.account.address.slice(0, 6)}...
              {wallet.account.address.slice(-4)}
            </div>
          )}
        </div>

        <div className="flex items-center space-x-3">
          {wallet?.account?.address && (
            <div className="flex items-center space-x-2 bg-white/10 rounded-lg px-3 py-1">
              <span className="text-sm text-white/70">Баланс:</span>
              <span className="text-sm font-semibold text-white">
                {loading ? "..." : `${balance} єГрн`}
              </span>
            </div>
          )}
          <WalletConnect />
        </div>
      </div>
    </header>
  );
}

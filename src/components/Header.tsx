"use client";

import { useTonConnect } from "@tonconnect/ui-react";
import { useEffect, useState } from "react";
import WalletConnect from "./WalletConnect";

export default function Header() {
  const { account } = useTonConnect();
  const [balance, setBalance] = useState<string>("0");
  const [loading, setLoading] = useState(false);

  // Функция для получения баланса єГрн
  const fetchBalance = async (address: string) => {
    if (!address) return;

    setLoading(true);
    try {
      // Используем Toncenter API для получения баланса Jetton
      const jettonMaster = process.env.NEXT_PUBLIC_TON_JETTON_MASTER;
      const response = await fetch(
        `https://toncenter.com/api/v2/jetton/balances?account=${address}&jetton_master=${jettonMaster}`
      );

      if (response.ok) {
        const data = await response.json();
        if (data.result && data.result.length > 0) {
          // Конвертируем из нанограмм в єГрн (делим на 10^9)
          const balanceInNano = data.result[0].balance;
          const balanceInHryvnia = (parseInt(balanceInNano) / 1e9).toFixed(2);
          setBalance(balanceInHryvnia);
        }
      }
    } catch (error) {
      console.error("Error fetching balance:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (account?.address) {
      fetchBalance(account.address);
    } else {
      setBalance("0");
    }
  }, [account?.address]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur border-b border-white/20 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <h1 className="text-lg font-bold text-white">TON Cards</h1>
          {account?.address && (
            <div className="text-sm text-white/70">
              {account.address.slice(0, 6)}...{account.address.slice(-4)}
            </div>
          )}
        </div>

        <div className="flex items-center space-x-3">
          {account?.address && (
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

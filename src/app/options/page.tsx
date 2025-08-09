"use client";

import { useState } from "react";

export default function OptionsPage() {
  const [key, setKey] = useState("");

  const verify = () => {
    const allowed = process.env.NEXT_PUBLIC_ADMIN_PORTAL_KEY;
    if (key === allowed) {
      alert("Адмін-режим активовано (UI додамо).");
    } else {
      alert("Невірний ключ.");
    }
  };

  return (
    <div className="min-h-svh bg-gradient-to-b from-black to-[#0F1638] text-white pb-20 p-4">
      <h1 className="text-xl font-bold mb-4">Опції</h1>
      <div className="space-y-4">
        <div>
          <div className="text-sm opacity-70 mb-1">Ключ доступу до адмінпанелі</div>
          <input
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Введіть ключ"
            className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 outline-none"
          />
          <button onClick={verify} className="mt-2 px-4 py-2 bg-white/10 border border-white/20 rounded">
            Увійти як адмін
          </button>
        </div>
        <div className="opacity-70 text-sm">Відв’язка гаманця та поповнення єГрн будуть додані далі.</div>
      </div>
    </div>
  );
}



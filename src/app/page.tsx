import WalletConnect from "@/components/WalletConnect";

export default function Home() {
  return (
    <div className="min-h-svh bg-gradient-to-b from-black to-[#0F1638] text-white pb-20">
      <header className="p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20" />
        <div className="text-sm">
          <div className="opacity-70">Баланс (єГрн):</div>
          <div className="font-semibold">–</div>
        </div>
        <div className="ml-auto"><WalletConnect /></div>
      </header>
      <main className="p-4 pb-24">
        <h1 className="text-xl font-bold mb-4">Головна</h1>
        <p className="opacity-70 text-sm">Паки та підбірки з головної (згідно Figma) додамо на наступному кроці.</p>
      </main>
    </div>
  );
}

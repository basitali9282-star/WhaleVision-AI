"use client";

import { useEffect, useState } from "react";

export default function WhaleVision() {
  const [market, setMarket] = useState<any[]>([]);

  useEffect(() => {
    loadMarket();

    const interval = setInterval(loadMarket, 10000);

    return () => clearInterval(interval);
  }, []);

  async function loadMarket() {
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
      );

      const data = await res.json();

      setMarket(data.slice(0, 10));
    } catch (err) {
      console.log(err);
    }
  }

  const whales = [
    {
      wallet: "0xA42...91",
      action: "BUY",
      token: "BTC",
      amount: "$4.2M",
    },
    {
      wallet: "0xF87...12",
      action: "SELL",
      token: "ETH",
      amount: "$2.1M",
    },
    {
      wallet: "0xB22...89",
      action: "BUY",
      token: "SOL",
      amount: "$980K",
    },
    {
      wallet: "0xD67...31",
      action: "BUY",
      token: "LINK",
      amount: "$1.4M",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white flex">

      {/* Sidebar */}
      <div className="w-64 bg-[#131A2A] p-6 border-r border-gray-800">

        <h1 className="text-3xl font-bold text-cyan-400 mb-10">
          WhaleVision
        </h1>

        <div className="space-y-5">
          <div className="cursor-pointer hover:text-cyan-400">
            📊 Dashboard
          </div>

          <div className="cursor-pointer hover:text-cyan-400">
            🐋 Whale Activity
          </div>

          <div className="cursor-pointer hover:text-cyan-400">
            👛 Wallet Explorer
          </div>

          <div className="cursor-pointer hover:text-cyan-400">
            📈 Analytics
          </div>

          <div className="cursor-pointer hover:text-cyan-400">
            🚨 Alerts
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 mr-80">

        {/* Hero */}
        <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-3xl p-10 mb-8">

          <h1 className="text-5xl font-bold">
            Track Crypto Whales In Real Time
          </h1>

          <p className="mt-4 text-lg text-gray-100">
            Discover what smart money is buying and selling before the crowd.
          </p>

          <button className="mt-6 px-6 py-3 bg-white text-black rounded-xl font-semibold">
            Start Tracking
          </button>

        </div>

        {/* Wallet Card */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">

          <div className="bg-[#131A2A] rounded-2xl p-6">
            <h3 className="text-gray-400">Portfolio Value</h3>
            <p className="text-3xl font-bold">$124.5M</p>
          </div>

          <div className="bg-[#131A2A] rounded-2xl p-6">
            <h3 className="text-gray-400">Win Rate</h3>
            <p className="text-3xl font-bold text-green-400">
              78%
            </p>
          </div>

          <div className="bg-[#131A2A] rounded-2xl p-6">
            <h3 className="text-gray-400">Profit</h3>
            <p className="text-3xl font-bold text-cyan-400">
              +$39.2M
            </p>
          </div>

          <div className="bg-[#131A2A] rounded-2xl p-6">
            <h3 className="text-gray-400">Trades</h3>
            <p className="text-3xl font-bold">
              1245
            </p>
          </div>

        </div>

        {/* Whale Activity */}
        <div className="bg-[#131A2A] rounded-2xl p-6 mb-8">

          <h2 className="text-2xl font-bold mb-5">
            🐋 Live Whale Activity
          </h2>

          <div className="space-y-3">

            {whales.map((whale, index) => (
              <div
                key={index}
                className="flex justify-between border-b border-gray-800 pb-3"
              >
                <span>{whale.wallet}</span>

                <span
                  className={
                    whale.action === "BUY"
                      ? "text-green-400"
                      : "text-red-400"
                  }
                >
                  {whale.action}
                </span>

                <span>{whale.token}</span>

                <span>{whale.amount}</span>
              </div>
            ))}

          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-[#131A2A] rounded-2xl p-6">

          <h2 className="text-2xl font-bold mb-5">
            🏆 Whale Leaderboard
          </h2>

          <table className="w-full">

            <thead>
              <tr className="text-left border-b border-gray-700">
                <th>Rank</th>
                <th>Wallet</th>
                <th>ROI</th>
              </tr>
            </thead>

            <tbody>

              <tr className="border-b border-gray-800">
                <td>#1</td>
                <td>0xA4...91</td>
                <td className="text-green-400">412%</td>
              </tr>

              <tr className="border-b border-gray-800">
                <td>#2</td>
                <td>0xB7...11</td>
                <td className="text-green-400">387%</td>
              </tr>

              <tr className="border-b border-gray-800">
                <td>#3</td>
                <td>0xD2...84</td>
                <td className="text-green-400">331%</td>
              </tr>

            </tbody>

          </table>

        </div>

      </div>

      {/* Fixed Market Panel */}
      <div className="fixed right-0 top-0 h-screen w-80 bg-[#131A2A] border-l border-gray-800 p-5 overflow-y-auto">

        <h2 className="text-cyan-400 text-2xl font-bold mb-6">
          📈 Crypto Market
        </h2>

        {market.map((coin) => (
          <div
            key={coin.id}
            className="flex justify-between border-b border-gray-800 py-3"
          >
            <div>
              <div className="font-semibold">
                {coin.symbol.toUpperCase()}
              </div>

              <div className="text-xs text-gray-500">
                {coin.name}
              </div>
            </div>

            <div className="text-right">
              <div>
                ${coin.current_price.toLocaleString()}
              </div>

              <div
                className={
                  coin.price_change_percentage_24h > 0
                    ? "text-green-400 text-sm"
                    : "text-red-400 text-sm"
                }
              >
                {coin.price_change_percentage_24h?.toFixed(2)}%
              </div>
            </div>
          </div>
        ))}

      </div>

    </div>
  );
}
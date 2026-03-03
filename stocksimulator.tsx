import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import {
  TrendingUp, TrendingDown,
  Plus, Minus, ArrowUpRight, ArrowDownRight
} from 'lucide-react';

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  history: { time: string; price: number }[];
}

const initialStocks: Stock[] = [
  {
    symbol: 'TECH',
    name: 'TechCorp Inc.',
    price: 245.80,
    change: 3.45,
    changePercent: 1.42,
    history: [
      { time: '9:30', price: 242.35 }, { time: '10:00', price: 244.10 }, { time: '10:30', price: 243.80 },
      { time: '11:00', price: 245.20 }, { time: '11:30', price: 246.50 }, { time: '12:00', price: 245.90 },
      { time: '12:30', price: 244.70 }, { time: '13:00', price: 245.30 }, { time: '13:30', price: 246.10 },
      { time: '14:00', price: 245.80 },
    ]
  },
  {
    symbol: 'BANK',
    name: 'National Bank',
    price: 78.90,
    change: -1.20,
    changePercent: -1.50,
    history: [
      { time: '9:30', price: 80.10 }, { time: '10:00', price: 79.50 }, { time: '10:30', price: 79.80 },
      { time: '11:00', price: 78.90 }, { time: '11:30', price: 78.20 }, { time: '12:00', price: 78.50 },
      { time: '12:30', price: 79.10 }, { time: '13:00', price: 78.80 }, { time: '13:30', price: 78.40 },
      { time: '14:00', price: 78.90 },
    ]
  },
  {
    symbol: 'SHOP',
    name: 'ShopMart Corp',
    price: 156.40,
    change: 2.10,
    changePercent: 1.36,
    history: [
      { time: '9:30', price: 154.30 }, { time: '10:00', price: 155.20 }, { time: '10:30', price: 155.80 },
      { time: '11:00', price: 156.90 }, { time: '11:30', price: 157.20 }, { time: '12:00', price: 156.50 },
      { time: '12:30', price: 155.90 }, { time: '13:00', price: 156.30 }, { time: '13:30', price: 156.80 },
      { time: '14:00', price: 156.40 },
    ]
  },
  {
    symbol: 'ENGY',
    name: 'Energy Plus',
    price: 42.15,
    change: 0.85,
    changePercent: 2.06,
    history: [
      { time: '9:30', price: 41.30 }, { time: '10:00', price: 41.50 }, { time: '10:30', price: 41.80 },
      { time: '11:00', price: 42.20 }, { time: '11:30', price: 42.50 }, { time: '12:00', price: 42.30 },
      { time: '12:30', price: 42.00 }, { time: '13:00', price: 42.10 }, { time: '13:30', price: 42.25 },
      { time: '14:00', price: 42.15 },
    ]
  },
];

interface Portfolio {
  symbol: string;
  shares: number;
  avgCost: number;
}

export default function StockSimulator() {
  const [balance, setBalance] = useState(10000);
  const [stocks] = useState(initialStocks);
  const [selectedStock, setSelectedStock] = useState<Stock>(initialStocks[0]);
  const [portfolio, setPortfolio] = useState<Portfolio[]>([]);
  const [sharesToBuy, setSharesToBuy] = useState(1);

  const handleBuy = () => {
    const cost = selectedStock.price * sharesToBuy;
    if (cost > balance) return;

    setBalance((prev) => prev - cost);

    setPortfolio((prev) => {
      const existing = prev.find((p) => p.symbol === selectedStock.symbol);
      if (existing) {
        const totalShares = existing.shares + sharesToBuy;
        const totalCost = (existing.shares * existing.avgCost) + (sharesToBuy * selectedStock.price);
        return prev.map((p) =>
          p.symbol === selectedStock.symbol
            ? { ...p, shares: totalShares, avgCost: totalCost / totalShares }
            : p
        );
      }
      return [...prev, { symbol: selectedStock.symbol, shares: sharesToBuy, avgCost: selectedStock.price }];
    });
  };

  const handleSell = () => {
    const holding = portfolio.find((p) => p.symbol === selectedStock.symbol);
    if (!holding || holding.shares < sharesToBuy) return;

    const proceeds = selectedStock.price * sharesToBuy;
    setBalance((prev) => prev + proceeds);

    setPortfolio((prev) =>
      prev
        .map((p) =>
          p.symbol === selectedStock.symbol
            ? { ...p, shares: p.shares - sharesToBuy }
            : p
        )
        .filter((p) => p.shares > 0)
    );
  };

  const portfolioValue = portfolio.reduce((acc, holding) => {
    const stock = stocks.find((s) => s.symbol === holding.symbol);
    return acc + (stock ? stock.price * holding.shares : 0);
  }, 0);

  const totalValue = balance + portfolioValue;
  const profitLoss = portfolio.reduce((acc, holding) => {
    const stock = stocks.find((s) => s.symbol === holding.symbol);
    if (stock) {
      return acc + (stock.price - holding.avgCost) * holding.shares;
    }
    return acc;
  }, 0);

  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Trading Simulator
          </h2>
          <p className="text-gray-400">
            Practice trading with $10,000 virtual cash — no real risk
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          <motion.div
            className="lg:col-span-2 glass-panel rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <TrendingUp className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">{selectedStock.name}</h3>
                  <p className="text-gray-400 text-sm">{selectedStock.symbol}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-white">${selectedStock.price.toFixed(2)}</p>
                <p className={`text-sm flex items-center justify-end gap-1 ${
                  selectedStock.change >= 0 ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {selectedStock.change >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {selectedStock.change >= 0 ? '+' : ''}{selectedStock.change.toFixed(2)} ({selectedStock.changePercent.toFixed(2)}%)
                </p>
              </div>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={selectedStock.history}>
                  <defs>
                    <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={selectedStock.change >= 0 ? '#10b981' : '#ef4444'} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={selectedStock.change >= 0 ? '#10b981' : '#ef4444'} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="time" stroke="#666" fontSize={12} />
                  <YAxis domain={['auto', 'auto']} stroke="#666" fontSize={12} tickFormatter={(v) => `$${v}`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
                    labelStyle={{ color: '#888' }}
                    formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
                  />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke={selectedStock.change >= 0 ? '#10b981' : '#ef4444'}
                    fill="url(#priceGradient)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-4 gap-2 mt-4">
              {stocks.map((stock) => (
                <button
                  key={stock.symbol}
                  onClick={() => setSelectedStock(stock)}
                  className={`p-3 rounded-xl text-left transition-all ${
                    selectedStock.symbol === stock.symbol
                      ? 'bg-white/20 ring-2 ring-white/30'
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <p className="text-xs text-gray-400">{stock.symbol}</p>
                  <p className="text-sm font-medium text-white">${stock.price.toFixed(2)}</p>
                  <p className={`text-xs ${stock.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                  </p>
                </button>
              ))}
            </div>
          </motion.div>

          <div className="space-y-4">
            <motion.div
              className="glass-panel rounded-2xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold text-white mb-4">Your Portfolio</h3>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                  <div>
                    <p className="text-white font-medium">Cash Balance</p>
                    <p className="text-xs text-gray-500">Available to invest</p>
                  </div>
                  <p className="text-lg font-bold text-white">${balance.toLocaleString()}</p>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                  <div>
                    <p className="text-white font-medium">Portfolio Value</p>
                    <p className="text-xs text-gray-500">{portfolio.length} holdings</p>
                  </div>
                  <p className="text-lg font-bold text-white">${portfolioValue.toLocaleString()}</p>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                  <div>
                    <p className="text-white font-medium">Total Value</p>
                    <p className="text-xs text-gray-500">Cash + Portfolio</p>
                  </div>
                  <p className="text-lg font-bold text-white">${totalValue.toLocaleString()}</p>
                </div>
                <div className={`flex justify-between items-center p-3 rounded-xl ${profitLoss >= 0 ? 'bg-emerald-500/10' : 'bg-red-500/10'}`}>
                  <div>
                    <p className="text-white font-medium">Profit/Loss</p>
                    <p className="text-xs text-gray-500">Unrealized P&L</p>
                  </div>
                  <p className={`text-lg font-bold ${profitLoss >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {profitLoss >= 0 ? '+' : ''}${profitLoss.toLocaleString()}
                  </p>
                </div>
              </div>

              {portfolio.length > 0 && (
                <div className="border-t border-white/10 pt-4 mt-4">
                  <p className="text-sm text-gray-400 mb-2">Holdings</p>
                  {portfolio.map((holding) => {
                    const stock = stocks.find((s) => s.symbol === holding.symbol);
                    if (!stock) return null;
                    const value = stock.price * holding.shares;
                    const pl = (stock.price - holding.avgCost) * holding.shares;
                    return (
                      <div key={holding.symbol} className="flex justify-between items-center py-2 text-sm">
                        <span className="text-white">{holding.symbol} × {holding.shares}</span>
                        <span className={pl >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                          ${value.toFixed(2)} ({pl >= 0 ? '+' : ''}${pl.toFixed(2)})
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </motion.div>

            <motion.div
              className="glass-panel rounded-2xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-lg font-semibold text-white mb-4">Trade</h3>

              <div className="flex items-center justify-center gap-2 mb-4">
                <button
                  onClick={() => setSharesToBuy(Math.max(1, sharesToBuy - 1))}
                  className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center"
                >
                  <Minus size={18} className="text-white" />
                </button>
                <div className="flex-1 text-center">
                  <p className="text-3xl font-bold text-white">{sharesToBuy}</p>
                  <p className="text-xs text-gray-500">shares</p>
                </div>
                <button
                  onClick={() => setSharesToBuy(sharesToBuy + 1)}
                  className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center"
                >
                  <Plus size={18} className="text-white" />
                </button>
              </div>

              <p className="text-center text-gray-400 text-sm mb-4">
                Total: <span className="text-white font-medium">${(selectedStock.price * sharesToBuy).toFixed(2)}</span>
              </p>

              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  onClick={handleBuy}
                  className="py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-xl flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <TrendingUp size={18} />
                  Buy
                </motion.button>
                <motion.button
                  onClick={handleSell}
                  className="py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <TrendingDown size={18} />
                  Sell
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

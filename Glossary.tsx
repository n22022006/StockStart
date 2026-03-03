import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, BookMarked, ChevronRight } from 'lucide-react';

interface Term {
  term: string;
  definition: string;
  category: string;
}

const glossaryTerms: Term[] = [
  { term: 'Stock', definition: 'A share of ownership in a company. When you buy stock, you own a small piece of that company.', category: 'Basics' },
  { term: 'Share', definition: 'A single unit of stock. If a company has 1 million shares outstanding and you own 100 shares, you own 0.01% of the company.', category: 'Basics' },
  { term: 'Dividend', definition: 'A portion of a company\'s profits paid to shareholders, usually quarterly. Not all companies pay dividends.', category: 'Basics' },
  { term: 'Portfolio', definition: 'A collection of all the investments you own, including stocks, bonds, ETFs, and cash.', category: 'Basics' },
  { term: 'Market Capitalization', definition: 'The total value of a company\'s shares. Calculated by multiplying share price by total shares outstanding.', category: 'Analysis' },
  { term: 'P/E Ratio', definition: 'Price-to-Earnings ratio. Shows how much investors pay for each dollar of earnings. Higher P/E may indicate expected growth.', category: 'Analysis' },
  { term: 'EPS', definition: 'Earnings Per Share. A company\'s profit divided by its number of shares. Higher EPS generally indicates profitability.', category: 'Analysis' },
  { term: 'Bull Market', definition: 'A period when stock prices are rising and investor confidence is high. Typically defined as 20%+ rise from recent lows.', category: 'Markets' },
  { term: 'Bear Market', definition: 'A period when stock prices are falling (20%+ from recent highs) and investor confidence is low.', category: 'Markets' },
  { term: 'Volume', definition: 'The number of shares traded during a specific period. High volume often indicates strong interest in a stock.', category: 'Trading' },
  { term: 'Bid/Ask', definition: 'Bid is the highest price a buyer will pay. Ask is the lowest price a seller will accept. The difference is the spread.', category: 'Trading' },
  { term: 'Market Order', definition: 'An order to buy or sell a stock immediately at the current market price.', category: 'Trading' },
  { term: 'Limit Order', definition: 'An order to buy or sell a stock only at a specific price or better.', category: 'Trading' },
  { term: 'Stop Loss', definition: 'An order to sell a stock when it reaches a certain price, limiting potential losses.', category: 'Trading' },
  { term: 'ETF', definition: 'Exchange-Traded Fund. A basket of securities that trades like a stock. ETFs can track indexes, sectors, or commodities.', category: 'Products' },
  { term: 'Index Fund', definition: 'A mutual fund or ETF that tracks a market index like the S&P 500.', category: 'Products' },
  { term: 'Blue Chip', definition: 'Stocks of large, well-established, financially stable companies with a history of reliable performance.', category: 'Products' },
  { term: 'Volatility', definition: 'How much a stock\'s price fluctuates. High volatility means larger price swings.', category: 'Risk' },
  { term: 'Diversification', definition: 'Spreading investments across different assets to reduce risk. "Don\'t put all your eggs in one basket."', category: 'Risk' },
  { term: 'Risk Tolerance', definition: 'Your ability and willingness to lose some or all of your investment. Varies based on age, income, and goals.', category: 'Risk' },
  { term: 'Liquidity', definition: 'How easily an asset can be bought or sold without affecting its price. Cash is the most liquid asset.', category: 'Trading' },
  { term: 'Sector', definition: 'A group of companies in the same industry, like technology, healthcare, or energy.', category: 'Analysis' },
  { term: 'ROI', definition: 'Return on Investment. The profit or loss from an investment expressed as a percentage of the cost.', category: 'Analysis' },
  { term: 'Yield', definition: 'The income return on an investment, usually expressed as a percentage. Common for bonds and dividend stocks.', category: 'Analysis' },
];

const categories = ['All', 'Basics', 'Analysis', 'Markets', 'Trading', 'Products', 'Risk'];

export default function Glossary() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);

  const filteredTerms = glossaryTerms.filter((term) => {
    const matchesSearch = term.term.toLowerCase().includes(search.toLowerCase()) ||
                          term.definition.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || term.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Stock Market Glossary
          </h2>
          <p className="text-gray-400">
            Essential terms every investor should know
          </p>
        </motion.div>

        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search terms..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-500 text-white'
                    : 'bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="space-y-2">
          {filteredTerms.map((item, index) => (
            <motion.div
              key={item.term}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              className="glass-panel rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setExpandedTerm(expandedTerm === item.term ? null : item.term)}
                className="w-full p-4 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    <BookMarked className="text-emerald-400" size={18} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{item.term}</h3>
                    <span className="text-xs text-gray-500">{item.category}</span>
                  </div>
                </div>
                <ChevronRight
                  size={20}
                  className={`text-gray-500 transition-transform ${
                    expandedTerm === item.term ? 'rotate-90' : ''
                  }`}
                />
              </button>

              {expandedTerm === item.term && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-4 pb-4"
                >
                  <p className="text-gray-300 pl-14 leading-relaxed">
                    {item.definition}
                  </p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {filteredTerms.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No terms found matching your search.</p>
          </div>
        )}
      </div>
    </section>
  );
}

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp, PieChart, BarChart3, Activity,
  DollarSign, Globe, ChevronRight, CheckCircle2,
  Clock, BookOpen
} from 'lucide-react';

interface Module {
  id: number;
  title: string;
  description: string;
  icon: typeof TrendingUp;
  duration: string;
  lessons: number;
  difficulty: 'Beginner' | 'Intermediate';
  color: string;
  progress: number;
  chapters: { title: string; completed: boolean }[];
}

const modules: Module[] = [
  {
    id: 1,
    title: 'Stock Market Basics',
    description: 'Understand what stocks are, how the market works, and why companies issue shares.',
    icon: TrendingUp,
    duration: '2 hours',
    lessons: 8,
    difficulty: 'Beginner',
    color: 'emerald',
    progress: 100,
    chapters: [
      { title: 'What is a Stock?', completed: true },
      { title: 'How Stock Markets Work', completed: true },
      { title: 'Bull vs Bear Markets', completed: true },
      { title: 'Reading Stock Quotes', completed: true },
    ]
  },
  {
    id: 2,
    title: 'Reading Financial Statements',
    description: 'Learn to read balance sheets, income statements, and cash flow reports.',
    icon: BarChart3,
    duration: '3 hours',
    lessons: 10,
    difficulty: 'Intermediate',
    color: 'blue',
    progress: 60,
    chapters: [
      { title: 'Introduction to Financial Statements', completed: true },
      { title: 'Understanding the Balance Sheet', completed: true },
      { title: 'Reading the Income Statement', completed: true },
      { title: 'Cash Flow Analysis', completed: false },
    ]
  },
  {
    id: 3,
    title: 'Fundamental Analysis',
    description: 'Evaluate company health using financial ratios and valuation metrics.',
    icon: PieChart,
    duration: '2.5 hours',
    lessons: 9,
    difficulty: 'Intermediate',
    color: 'purple',
    progress: 0,
    chapters: [
      { title: 'What is Fundamental Analysis?', completed: false },
      { title: 'Key Financial Ratios', completed: false },
      { title: 'P/E Ratio Explained', completed: false },
      { title: 'Dividend Analysis', completed: false },
    ]
  },
  {
    id: 4,
    title: 'Trading Strategies',
    description: 'Explore different investing styles from day trading to long-term investing.',
    icon: Activity,
    duration: '4 hours',
    lessons: 12,
    difficulty: 'Intermediate',
    color: 'amber',
    progress: 0,
    chapters: [
      { title: 'Day Trading vs Swing Trading', completed: false },
      { title: 'Value Investing', completed: false },
      { title: 'Growth Investing', completed: false },
      { title: 'Portfolio Diversification', completed: false },
    ]
  },
  {
    id: 5,
    title: 'Understanding ETFs & Funds',
    description: 'Learn about exchange-traded funds, mutual funds, and index investing.',
    icon: DollarSign,
    duration: '1.5 hours',
    lessons: 6,
    difficulty: 'Beginner',
    color: 'cyan',
    progress: 0,
    chapters: [
      { title: 'What is an ETF?', completed: false },
      { title: 'Mutual Funds vs ETFs', completed: false },
      { title: 'Index Fund Investing', completed: false },
      { title: 'Expense Ratios Explained', completed: false },
    ]
  },
  {
    id: 6,
    title: 'Global Markets',
    description: 'Discover international markets, ADRs, and global diversification.',
    icon: Globe,
    duration: '2 hours',
    lessons: 7,
    difficulty: 'Intermediate',
    color: 'rose',
    progress: 0,
    chapters: [
      { title: 'US Stock Exchanges', completed: false },
      { title: 'International Markets', completed: false },
      { title: 'American Depositary Receipts', completed: false },
      { title: 'Currency Considerations', completed: false },
    ]
  },
];

const colorMap: Record<string, string> = {
  emerald: 'from-emerald-500 to-emerald-600',
  blue: 'from-blue-500 to-blue-600',
  purple: 'from-purple-500 to-purple-600',
  amber: 'from-amber-500 to-amber-600',
  cyan: 'from-cyan-500 to-cyan-600',
  rose: 'from-rose-500 to-rose-600',
};

export default function LearningModules() {
  const [expandedModule, setExpandedModule] = useState<number | null>(null);

  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="flex items-end justify-between mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Learning Path
            </h2>
            <p className="text-gray-400 text-lg">
              Structured curriculum designed for complete beginners
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-sm text-gray-500">
            <BookOpen size={16} />
            <span>6 Modules • 52 Lessons</span>
          </div>
        </motion.div>

        <div className="grid gap-4">
          {modules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div
                className={`glass-panel rounded-2xl overflow-hidden transition-all duration-300 ${
                  expandedModule === module.id ? 'ring-2 ring-white/20' : ''
                }`}
              >
                <button
                  onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
                  className="w-full p-6 flex items-center gap-4 text-left"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colorMap[module.color]} flex items-center justify-center flex-shrink-0`}>
                    <module.icon className="text-white" size={24} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-semibold text-white">{module.title}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        module.difficulty === 'Beginner'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-amber-500/20 text-amber-400'
                      }`}>
                        {module.difficulty}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm truncate">{module.description}</p>
                  </div>

                  <div className="hidden md:flex items-center gap-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {module.duration}
                      </span>
                      <span>{module.lessons} lessons</span>
                    </div>

                    {module.progress > 0 && (
                      <div className="w-24">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-500">Progress</span>
                          <span className="text-white">{module.progress}%</span>
                        </div>
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full bg-gradient-to-r ${colorMap[module.color]} rounded-full`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${module.progress}%` }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <ChevronRight
                    size={20}
                    className={`text-gray-500 transition-transform ${
                      expandedModule === module.id ? 'rotate-90' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {expandedModule === module.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 border-t border-white/5 pt-4">
                        <h4 className="text-sm font-medium text-gray-400 mb-3">Chapter Overview</h4>
                        <div className="grid sm:grid-cols-2 gap-2">
                          {module.chapters.map((chapter, i) => (
                            <div
                              key={i}
                              className={`flex items-center gap-3 p-3 rounded-lg ${
                                chapter.completed ? 'bg-emerald-500/10' : 'bg-white/5'
                              }`}
                            >
                              <CheckCircle2
                                size={18}
                                className={chapter.completed ? 'text-emerald-400' : 'text-gray-600'}
                              />
                              <span className={chapter.completed ? 'text-white' : 'text-gray-400'}>
                                {chapter.title}
                              </span>
                            </div>
                          ))}
                        </div>
                        <motion.button
                          className={`mt-4 px-6 py-3 bg-gradient-to-r ${colorMap[module.color]} text-white font-medium rounded-xl`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {module.progress > 0 ? 'Continue Learning' : 'Start Module'}
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

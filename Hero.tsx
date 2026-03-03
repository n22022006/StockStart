import { motion } from 'framer-motion';
import { TrendingUp, Users, Shield, ArrowRight } from 'lucide-react';

const stats = [
  { label: 'Students Learning', value: '12,500+' },
  { label: 'Practice Trades', value: '450K+' },
  { label: 'Topics Covered', value: '25+' },
];

const features = [
  { icon: TrendingUp, title: 'Start Small', desc: 'Learn with virtual money before risking real capital' },
  { icon: Users, title: 'Community', desc: 'Connect with fellow student investors' },
  { icon: Shield, title: 'Risk-Free', desc: 'Practice in a safe, simulated environment' },
];

export default function Hero() {
  return (
    <section className="relative py-20 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Built for Students
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Your First Steps in
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Stock Market Investing
            </span>
          </h2>

          <p className="text-xl text-gray-400 mb-8 leading-relaxed">
            Master the fundamentals of investing with interactive lessons,
            a risk-free simulator, and essential terminology — all designed
            specifically for beginners.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              className="group flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Start Learning Free
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <button className="px-8 py-4 border border-white/20 hover:border-white/40 text-white font-semibold rounded-xl transition-all">
              View Curriculum
            </button>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="glass-panel p-6 rounded-2xl text-center">
              <p className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="glass-panel p-6 rounded-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-4">
                <feature.icon className="text-emerald-400" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

'use client';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import { motion } from 'framer-motion';
import { Shield, Zap, Globe, BarChart3 } from 'lucide-react';

const features = [
  {
    icon: <Zap className="text-yellow-400" />,
    title: 'Instant Credits',
    description: 'Get approved for cloud and tool credits in less than 48 hours for your startup.'
  },
  {
    icon: <Shield className="text-blue-400" />,
    title: 'Verified Partners',
    description: 'We only partner with top-tier SaaS companies to ensure you get the best tools.'
  },
  {
    icon: <Globe className="text-emerald-400" />,
    title: 'Global Access',
    description: 'Deals are available to founders across the globe, regardless of location.'
  },
  {
    icon: <BarChart3 className="text-purple-400" />,
    title: 'Growth Analytics',
    description: 'Track the impact of your claimed benefits on your startup bottom line.'
  }
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />

      {/* Features Section */}
      <section className="py-24 bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-white sm:text-4xl"
            >
              Everything you need to scale
            </motion.h2>
            <p className="mt-4 text-slate-400">Join thousands of founders who are already saving thousands.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="p-8 rounded-3xl bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm hover:border-indigo-500/50 transition-all duration-300"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

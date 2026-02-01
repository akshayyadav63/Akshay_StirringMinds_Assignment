'use client';

import { useState, useEffect } from 'react';
import api from '@/services/api';
import { Deal } from '@/types';
import Navbar from '@/components/Navbar';
import DealCard from '@/components/DealCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Rocket } from 'lucide-react';

const categories = ['All', 'Cloud', 'Marketing', 'Analytics', 'Productivity', 'Design'];

export default function DealsPage() {
    const [deals, setDeals] = useState<Deal[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        const fetchDeals = async () => {
            try {
                const res = await api.get('/deals');
                setDeals(res.data);
            } catch (err) {
                console.error('Failed to fetch deals', err);
            } finally {
                setLoading(false);
            }
        };
        fetchDeals();
    }, []);

    const filteredDeals = deals.filter((deal) => {
        const matchesSearch = deal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            deal.partnerName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || deal.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <main className="min-h-screen pt-24 pb-20">
            <Navbar />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header content */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-2 text-indigo-400 font-bold uppercase tracking-widest text-xs mb-4"
                        >
                            <Rocket size={14} />
                            Benefits Marketplace
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl font-extrabold text-white"
                        >
                            Premium Resources for <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Your Modern Tech Stack</span>
                        </motion.h1>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="flex items-center gap-4 text-slate-400"
                    >
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[10px] font-bold">
                                    {String.fromCharCode(64 + i)}
                                </div>
                            ))}
                        </div>
                        <span className="text-sm font-medium">Join 500+ scale-ups</span>
                    </motion.div>
                </div>

                {/* Filters and Search */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col lg:flex-row gap-6 mb-12"
                >
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                        <input
                            type="text"
                            placeholder="Search by tool or partner..."
                            className="w-full rounded-2xl bg-slate-900 border border-slate-800 py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`flex-shrink-0 px-6 py-3 rounded-xl text-sm font-semibold transition-all ${selectedCategory === cat
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                                    : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="h-[400px] rounded-2xl bg-slate-900/50 animate-pulse border border-slate-800" />
                        ))}
                    </div>
                ) : (
                    <>
                        <motion.div
                            layout
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            <AnimatePresence mode="popLayout">
                                {filteredDeals.map((deal) => (
                                    <DealCard key={deal._id} deal={deal} />
                                ))}
                            </AnimatePresence>
                        </motion.div>

                        {filteredDeals.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                <div className="w-20 h-20 rounded-full bg-slate-900 flex items-center justify-center mb-6 border border-slate-800">
                                    <Search className="text-slate-500" size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">No deals found</h3>
                                <p className="text-slate-400">Try adjusting your filters or search terms.</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </main>
    );
}

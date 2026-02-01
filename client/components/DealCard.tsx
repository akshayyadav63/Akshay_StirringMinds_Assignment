'use client';

import { Deal } from '@/types';
import { motion } from 'framer-motion';
import { Lock, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface DealCardProps {
    deal: Deal;
}

const DealCard: React.FC<DealCardProps> = ({ deal }) => {
    const isRestricted = deal.accessLevel === 'restricted';

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ y: -5 }}
            className="group relative flex flex-col h-full rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden hover:border-indigo-500/50 transition-all duration-300"
        >
            <div className="p-6 flex-1">
                <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-xl bg-slate-800 p-2 flex items-center justify-center overflow-hidden">
                        <img
                            src={deal.logoUrl}
                            alt={deal.partnerName}
                            className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all"
                        />
                    </div>
                    {isRestricted ? (
                        <div className="flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-500 border border-amber-500/20">
                            <Lock size={12} />
                            Restricted
                        </div>
                    ) : (
                        <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-500 border border-emerald-500/20">
                            <CheckCircle2 size={12} />
                            Public
                        </div>
                    )}
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                    {deal.title}
                </h3>
                <p className="text-sm text-slate-400 line-clamp-2 mb-4">
                    {deal.description}
                </p>

                <div className="mt-auto">
                    <div className="text-2xl font-black text-indigo-400 mb-1">
                        {deal.benefit}
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                        {deal.category}
                    </div>
                </div>
            </div>

            <div className="border-t border-slate-800 p-4 bg-slate-900/50">
                <Link
                    href={`/deals/${deal._id}`}
                    className="flex items-center justify-center gap-2 w-full rounded-xl bg-indigo-600/10 py-2.5 text-sm font-semibold text-indigo-400 hover:bg-indigo-600 hover:text-white transition-all group-hover:gap-3"
                >
                    View Details
                    <ArrowUpRight size={16} />
                </Link>
            </div>
        </motion.div>
    );
};

export default DealCard;

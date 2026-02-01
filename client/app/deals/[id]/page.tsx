'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { Deal, Claim } from '@/types';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    CheckCircle2,
    Lock,
    Info,
    ExternalLink,
    CreditCard,
    Building2,
    Calendar
} from 'lucide-react';
import Link from 'next/link';

export default function DealDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const { user } = useAuth();
    const [deal, setDeal] = useState<Deal | null>(null);
    const [loading, setLoading] = useState(true);
    const [claiming, setClaiming] = useState(false);
    const [claimed, setClaimed] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dealRes = await axios.get(`http://localhost:5000/api/deals/${id}`);
                setDeal(dealRes.data);

                if (user) {
                    const claimsRes = await axios.get('http://localhost:5000/api/deals/my-claims');
                    const isAlreadyClaimed = claimsRes.data.some((c: Claim) => c.deal._id === id);
                    setClaimed(isAlreadyClaimed);
                }
            } catch (err) {
                console.error('Failed to fetch data', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id, user]);

    const handleClaim = async () => {
        if (!user) {
            router.push('/login');
            return;
        }

        if (deal?.accessLevel === 'restricted' && !user.isVerified) {
            setError('This deal is restricted to verified users only.');
            return;
        }

        setClaiming(true);
        setError('');
        try {
            await axios.post(`http://localhost:5000/api/deals/${id}/claim`);
            setClaimed(true);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to claim deal');
        } finally {
            setClaiming(false);
        }
    };

    if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Loading...</div>;
    if (!deal) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Deal not found</div>;

    return (
        <main className="min-h-screen pt-24 pb-20">
            <Navbar />

            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <Link
                    href="/deals"
                    className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Marketplace
                </Link>

                <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
                    <div className="p-8 md:p-12 border-b border-slate-800">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                            <div className="flex items-center gap-6">
                                <div className="w-24 h-24 rounded-2xl bg-white p-4 flex items-center justify-center shadow-lg">
                                    <img src={deal.logoUrl} alt={deal.partnerName} className="max-w-full max-h-full object-contain" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-black text-white mb-2">{deal.title}</h1>
                                    <div className="flex items-center gap-3">
                                        <span className="flex items-center gap-1.5 text-indigo-400 font-bold text-sm">
                                            <Building2 size={16} />
                                            {deal.partnerName}
                                        </span>
                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                                        <span className="text-slate-500 text-sm font-medium">{deal.category}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="text-right">
                                <div className="text-4xl font-black text-white mb-1">{deal.benefit}</div>
                                <div className="text-xs font-bold uppercase tracking-widest text-slate-500">Exclusive Perk</div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3">
                        <div className="md:col-span-2 p-8 md:p-12 space-y-10">
                            <section>
                                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                    <Info size={18} className="text-indigo-400" />
                                    About the Benefit
                                </h2>
                                <p className="text-slate-400 leading-relaxed text-lg">
                                    {deal.description}
                                    Join our mission to empower the next generation of builders. This partnership provides
                                    high-growth startups with the tools they need to iterate faster and scale bigger.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                    <CheckCircle2 size={18} className="text-emerald-400" />
                                    What you get
                                </h2>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {[
                                        'Direct priority support',
                                        'Extended trial periods',
                                        'Waived implementation fees',
                                        'Partner network access'
                                    ].map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-slate-300 text-sm bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                                            <Zap size={16} className="text-indigo-400 mt-0.5 flex-shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        </div>

                        <div className="p-8 md:p-12 bg-slate-900/50 border-l border-slate-800 space-y-8">
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4">Availability</h3>
                                <div className="flex items-center gap-3 text-white font-medium">
                                    {deal.accessLevel === 'public' ? (
                                        <><CheckCircle2 className="text-emerald-500" size={20} /> Open to All</>
                                    ) : (
                                        <><Lock className="text-amber-500" size={20} /> Restricted</>
                                    )}
                                </div>
                            </div>

                            <div className="pt-8 border-t border-slate-800">
                                {claimed ? (
                                    <div className="w-full rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-6 text-center">
                                        <CheckCircle2 className="text-emerald-500 mx-auto mb-3" size={32} />
                                        <h4 className="text-white font-bold mb-1">Perk Claimed!</h4>
                                        <p className="text-emerald-500/80 text-xs">Review status in your dashboard.</p>
                                    </div>
                                ) : (
                                    <button
                                        onClick={handleClaim}
                                        disabled={claiming}
                                        className={`w-full py-4 rounded-2xl font-bold transition-all shadow-xl ${deal.accessLevel === 'restricted' && !user?.isVerified
                                                ? 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50'
                                                : 'bg-indigo-600 text-white hover:bg-indigo-500 active:scale-95 shadow-indigo-600/30'
                                            }`}
                                    >
                                        {claiming ? 'Processing...' : 'Claim Benefit Now'}
                                    </button>
                                )}

                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium flex items-start gap-2"
                                    >
                                        <Info size={16} className="mt-0.5" />
                                        {error}
                                    </motion.div>
                                )}

                                {!user && (
                                    <p className="mt-4 text-center text-xs text-slate-500">
                                        Please <Link href="/login" className="text-indigo-400 hover:underline">login</Link> to claim this deal.
                                    </p>
                                )}

                                {deal.accessLevel === 'restricted' && user && !user.isVerified && (
                                    <p className="mt-4 text-center text-xs text-slate-500">
                                        This deal requires <Link href="/dashboard" className="text-indigo-400 hover:underline">verification</Link>.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

function Zap({ size, className }: { size: number, className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
        </svg>
    )
}

'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import api from '@/services/api';
import { Claim } from '@/types';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import {
    User as UserIcon,
    ShieldCheck,
    ShieldAlert,
    Package,
    ExternalLink,
    CheckCircle2,
    Clock,
    ArrowRight,
    TrendingUp,
    CreditCard
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
    const { user, loading: authLoading, verify } = useAuth();
    const router = useRouter();
    const [claims, setClaims] = useState<Claim[]>([]);
    const [loading, setLoading] = useState(true);
    const [verifying, setVerifying] = useState(false);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login');
        }
    }, [user, authLoading, router]);

    useEffect(() => {
        const fetchClaims = async () => {
            if (user) {
                try {
                    const res = await api.get('/deals/my-claims');
                    setClaims(res.data);
                } catch (err) {
                    console.error('Failed to fetch claims', err);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchClaims();
    }, [user]);

    const handleVerify = async () => {
        setVerifying(true);
        try {
            const res = await api.put('/auth/verify');
            verify(res.data);
        } catch (err) {
            console.error('Verification failed', err);
        } finally {
            setVerifying(false);
        }
    };

    if (authLoading || !user) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Loading...</div>;

    return (
        <main className="min-h-screen pt-24 pb-20">
            <Navbar />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar / Profile Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-1 space-y-6"
                    >
                        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/10 rounded-full blur-3xl -mr-16 -mt-16" />

                            <div className="flex flex-col items-center text-center">
                                <div className="w-20 h-20 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-2xl font-black mb-4 shadow-xl shadow-indigo-600/20">
                                    {user.name.charAt(0)}
                                </div>
                                <h2 className="text-xl font-bold text-white mb-1">{user.name}</h2>
                                <p className="text-slate-500 text-sm mb-6">{user.email}</p>

                                <div className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold border ${user.isVerified
                                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
                                    : 'bg-amber-500/10 border-amber-500/20 text-amber-500'
                                    }`}>
                                    {user.isVerified ? <ShieldCheck size={14} /> : <ShieldAlert size={14} />}
                                    {user.isVerified ? 'VERIFIED FOUNDER' : 'UNVERIFIED'}
                                </div>

                                {!user.isVerified && (
                                    <button
                                        onClick={handleVerify}
                                        disabled={verifying}
                                        className="mt-6 w-full py-3 rounded-xl bg-white text-slate-900 font-bold text-sm hover:bg-slate-200 transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
                                    >
                                        {verifying ? 'Verifying...' : 'Complete Verification'}
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="bg-slate-900/50 border border-slate-800/50 rounded-3xl p-6 space-y-4">
                            <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">Quick Stats</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-slate-400">Total Savings</span>
                                    <span className="text-sm font-bold text-white">$12,400</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-slate-400">Claimed Perks</span>
                                    <span className="text-sm font-bold text-white">{claims.length}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Main Dashboard Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="lg:col-span-3 space-y-8"
                    >
                        {/* Dashboard Header */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-3xl font-black text-white">Founder Dashboard</h1>
                                <p className="text-slate-400">Manage your claimed perks and tracking</p>
                            </div>
                            <Link
                                href="/deals"
                                className="flex items-center gap-2 rounded-2xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white hover:bg-indigo-500 transition-all group"
                            >
                                Explore More Perks
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        {/* Tracking Progress Mockup */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { label: 'Active Benefits', val: claims.filter(c => c.status === 'approved').length, icon: <TrendingUp size={20} className="text-indigo-400" /> },
                                { label: 'Pending Approval', val: claims.filter(c => c.status === 'pending').length, icon: <Clock size={20} className="text-amber-400" /> },
                                { label: 'Credit Limit Used', val: '45%', icon: <CreditCard size={20} className="text-emerald-400" /> },
                            ].map((stat, i) => (
                                <div key={i} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex items-center justify-between">
                                    <div>
                                        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                                        <p className="text-2xl font-black text-white">{stat.val}</p>
                                    </div>
                                    <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center">
                                        {stat.icon}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Claimed Perks Section */}
                        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
                            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                    <Package size={20} className="text-indigo-400" />
                                    Claimed Benefits
                                </h2>
                            </div>

                            <div className="divide-y divide-slate-800">
                                {loading ? (
                                    <div className="p-12 text-center text-slate-500">Loading your perks...</div>
                                ) : claims.length === 0 ? (
                                    <div className="p-16 text-center">
                                        <Package className="mx-auto text-slate-700 mb-4" size={48} />
                                        <h3 className="text-white font-bold mb-2">No perks claimed yet</h3>
                                        <p className="text-slate-500 mb-6 max-w-xs mx-auto text-sm">Start supercharging your business by exploring our marketplace.</p>
                                        <Link
                                            href="/deals"
                                            className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-6 py-2 text-sm font-bold text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
                                        >
                                            Browse Marketplace
                                        </Link>
                                    </div>
                                ) : (
                                    claims.map((claim) => (
                                        <div key={claim._id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-slate-800/30 transition-colors">
                                            <div className="flex items-center gap-5">
                                                <div className="w-14 h-14 rounded-2xl bg-white p-2 flex items-center justify-center flex-shrink-0 shadow-md">
                                                    <img src={claim.deal.logoUrl} alt={claim.deal.partnerName} className="max-w-full max-h-full object-contain" />
                                                </div>
                                                <div>
                                                    <h4 className="text-white font-bold">{claim.deal.title}</h4>
                                                    <div className="flex items-center gap-3 mt-1">
                                                        <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">{claim.deal.benefit}</span>
                                                        <span className="w-1 h-1 rounded-full bg-slate-700" />
                                                        <span className="text-xs text-slate-500">Claimed: {new Date(claim.claimedAt).toLocaleDateString()}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-6">
                                                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${claim.status === 'approved'
                                                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
                                                    : 'bg-amber-500/10 border-amber-500/20 text-amber-500'
                                                    }`}>
                                                    {claim.status === 'approved' ? (
                                                        <><CheckCircle2 size={12} /> Approved</>
                                                    ) : (
                                                        <><Clock size={12} /> Pending Approval</>
                                                    )}
                                                </div>

                                                <Link
                                                    href={`/deals/${claim.deal._id}`}
                                                    className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all border border-slate-700"
                                                >
                                                    <ExternalLink size={18} />
                                                </Link>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}

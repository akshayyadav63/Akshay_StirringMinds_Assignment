'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, useScroll } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import Link from 'next/link';

function AnimatedSphere() {
    const meshRef = useRef<THREE.Mesh>(null);

    return (
        <Float speed={4} rotationIntensity={1} floatIntensity={2}>
            <Sphere ref={meshRef} args={[1, 100, 200]} scale={2}>
                <MeshDistortMaterial
                    color="#4f46e5"
                    attach="material"
                    distort={0.5}
                    speed={2}
                    roughness={0}
                />
            </Sphere>
        </Float>
    );
}

const Hero = () => {
    return (
        <section className="relative min-h-screen pt-32 pb-20 overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                    >
                        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl">
                            Supercharge your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                                Startup Journey
                            </span>
                        </h1>
                        <p className="mt-6 text-lg text-slate-400 max-w-2xl leading-relaxed">
                            Unlock over $500,000 in exclusive deals from the world's leading SaaS platforms.
                            Designed specifically for early-stage founders and indie hackers.
                        </p>
                        <div className="mt-10 flex flex-wrap gap-4">
                            <Link
                                href="/deals"
                                className="rounded-full bg-indigo-600 px-8 py-4 text-sm font-semibold text-white shadow-xl shadow-indigo-600/30 hover:bg-indigo-500 transition-all hover:scale-105 active:scale-95"
                            >
                                Browse All Deals
                            </Link>
                            <Link
                                href="/register"
                                className="rounded-full border border-slate-700 bg-slate-800/50 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm hover:bg-slate-700 transition-all hover:scale-105 active:scale-95"
                            >
                                Join the Platform
                            </Link>
                        </div>

                        <div className="mt-12 flex items-center gap-8 grayscale opacity-50">
                            {/* Seed logos or just text */}
                            <div className="text-xs font-bold uppercase tracking-widest text-slate-500">Trusted Partners</div>
                            <div className="flex gap-6 items-center">
                                <span className="font-bold text-lg text-slate-400">AWS</span>
                                <span className="font-bold text-lg text-slate-400">Stripe</span>
                                <span className="font-bold text-lg text-slate-400">HubSpot</span>
                            </div>
                        </div>
                    </motion.div>

                    <div className="relative h-[400px] lg:h-[600px] w-full">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="h-full w-full"
                        >
                            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                                <ambientLight intensity={0.5} />
                                <directionalLight position={[10, 10, 5]} intensity={1} />
                                <pointLight position={[-10, -10, -5]} intensity={0.5} />
                                <AnimatedSphere />
                            </Canvas>
                        </motion.div>

                        {/* Background glows */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-600/30 rounded-full blur-[100px] -z-10" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] -z-10" />
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500"
            >
                <div className="w-1 h-3 rounded-full bg-slate-700" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Scroll</span>
            </motion.div>
        </section>
    );
};

export default Hero;

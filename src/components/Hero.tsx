import React from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';

interface HeroProps {
    readonly className?: string;
    readonly onOpenContact?: () => void;
}

const serviceBadges = [
    { label: 'SEO', icon: 'trending_up', initialX: -410, initialY: -110, hoverX: -430, hoverY: -130 }, // Top of 'W' in WE
    { label: 'Paid Ads', icon: 'ads_click', initialX: 410, initialY: -110, hoverX: 430, hoverY: -130 },   // Top-right of 'L' in DIGITAL
    { label: 'Web Design', icon: 'web_asset', initialX: -340, initialY: 100, hoverX: -360, hoverY: 120 }, // Bottom-left of 'R' in ROOTS
    { label: 'Social Media', icon: 'share', initialX: 380, initialY: 100, hoverX: 400, hoverY: 120 },     // Bottom-right of 'S' in SUCCESS
];

export const Hero: React.FC<HeroProps> = ({ className = '', onOpenContact }) => {
    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <section className={`relative pt-32 md:pt-28 pb-20 sm:pb-24 md:pb-32 px-4 sm:px-6 overflow-hidden bg-background-light dark:bg-background-dark transition-colors duration-500 ${className}`}>
            {/* Ambient background glows */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[10%] left-[15%] w-64 h-64 bg-primary/10 dark:bg-primary/20 blur-[100px] rounded-full animate-pulse" />
                <div className="absolute bottom-[20%] right-[10%] w-80 h-80 bg-primary/5 dark:bg-primary/10 blur-[120px] rounded-full" />
            </div>

            <div className="max-w-7xl mx-auto text-center relative z-10">
                {/* Badge/Tag */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 text-primary font-bold text-xs sm:text-sm mb-8 bg-primary/5 tracking-wider uppercase"
                >
                    <span className="relative flex h-2 w-2 shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                    </span>
                    Next-Gen Marketing Agency
                </motion.div>

                {/* Headline Section with Overlaying Chips */}
                <div
                    className="relative inline-block mb-8 group/headline"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Floating Service Badges Layer (Desktop) */}
                    <div className="absolute inset-0 pointer-events-none hidden md:block">
                        {serviceBadges.map((badge) => (
                            <motion.div
                                key={badge.label}
                                initial={false}
                                animate={{
                                    x: isHovered ? badge.hoverX : badge.initialX,
                                    y: isHovered ? badge.hoverY : badge.initialY,
                                    opacity: 1,
                                    scale: isHovered ? 1.05 : 1
                                }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 100,
                                    damping: 20,
                                    mass: 0.8
                                }}
                                className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
                            >
                                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 dark:bg-white/10 backdrop-blur-md border border-slate-200 dark:border-white/10 shadow-lg dark:shadow-none transition-all hover:border-primary group pointer-events-auto">
                                    <span className="material-symbols-outlined text-[18px] text-primary group-hover:scale-110 transition-transform">
                                        {badge.icon}
                                    </span>
                                    <span className="text-xs font-bold tracking-tight text-slate-700 dark:text-slate-100 whitespace-nowrap">
                                        {badge.label}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tight leading-[1.05] uppercase relative z-10 cursor-default"
                    >
                        WE BUILD THE DIGITAL <br className="hidden sm:block" />
                        <span className="bg-white dark:bg-white text-black px-3 sm:px-6 sticker-highlight inline-block">
                            ROOTS
                        </span>{' '}
                        OF YOUR SUCCESS
                    </motion.h1>
                </div>

                {/* Subheadline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-lg sm:text-xl md:text-2xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto mb-12 sm:mb-14 leading-relaxed px-4 font-medium"
                >
                    Comprehensive Digital Marketing for Startups. We handle SEO, Paid Ads,
                    Social Media, Branding, and AI Automation to skyrocket your growth.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4"
                >
                    <button
                        onClick={() => onOpenContact?.()}
                        className="w-full sm:w-auto bg-primary hover:bg-lime-500 text-black font-bold px-10 sm:px-12 py-5 sm:py-6 rounded-full text-xl sm:text-2xl transition-all hover:scale-105 shadow-2xl shadow-primary/30 flex items-center justify-center gap-3 cursor-pointer group"
                    >
                        Book Free Call
                        <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </button>
                    <a
                        href="#results"
                        className="w-full sm:w-auto px-10 sm:px-12 py-5 sm:py-6 rounded-full font-bold text-xl sm:text-2xl border-2 border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 transition-all text-center text-slate-700 dark:text-white"
                    >
                        View Our Results
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;

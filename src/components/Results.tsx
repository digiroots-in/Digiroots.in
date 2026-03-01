import React from 'react';
import { resultCards, resultStats } from '../data/mockData';

interface ResultsProps {
    readonly className?: string;
}

const cardThemeMap = {
    lime: {
        wrapper: 'bg-primary shadow-2xl shadow-primary/20',
        channel: 'text-black/60',
        metric: 'text-black',
        quote: 'text-black/80',
        badge: 'bg-black/10 border-black/5 text-black',
        icon: 'text-black',
    },
    glass: {
        wrapper:
            'bg-white/80 dark:bg-slate-800/40 backdrop-blur-xl border border-slate-200 dark:border-white/10 shadow-xl',
        channel: 'text-primary',
        metric: 'text-slate-900 dark:text-white',
        quote: 'text-slate-600 dark:text-slate-300',
        badge: 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200',
        icon: 'text-primary',
    },
    white: {
        wrapper: 'bg-white shadow-xl',
        channel: 'text-slate-500',
        metric: 'text-slate-900',
        quote: 'text-slate-700',
        badge: 'bg-slate-200 border-slate-300 text-slate-800',
        icon: 'text-slate-800',
    },
} as const;

export const Results: React.FC<ResultsProps> = ({ className = '' }) => {
    return (
        <section
            id="results"
            className={`relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 overflow-hidden bg-slate-100 dark:bg-background-dark text-slate-900 dark:text-white ${className}`}
        >
            {/* Ambient background glows */}
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative max-w-7xl mx-auto">
                {/* ── Section Header ── */}
                <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 mb-5 sm:mb-6">
                        <span className="material-symbols-outlined text-primary text-sm">
                            auto_awesome
                        </span>
                        <span className="text-primary text-xs font-bold uppercase tracking-widest">
                            Our Work Speaks
                        </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-extrabold uppercase leading-tight tracking-tight mb-4 sm:mb-6 text-slate-900 dark:text-white">
                        REAL BUSINESSES.<br />REAL RESULTS.
                    </h2>
                    <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                        We run ads, manage social media, and design content that actually
                        brings customers to your door.
                    </p>
                </div>

                {/* ── Story Cards ── */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 md:gap-8 mb-12 sm:mb-16 md:mb-20">
                    {resultCards.map((card) => {
                        const t = cardThemeMap[card.theme];
                        return (
                            <div
                                key={card.metric}
                                className={`${t.wrapper} rounded-[2rem] p-7 sm:p-9 lg:p-10 flex flex-col justify-between min-h-[360px] sm:min-h-[400px] lg:min-h-[420px]`}
                            >
                                <div>
                                    <span
                                        className={`${t.channel} text-xs font-bold uppercase tracking-widest block mb-3 sm:mb-4`}
                                    >
                                        {card.channel}
                                    </span>
                                    <h3
                                        className={`${t.metric} text-3xl sm:text-4xl font-display font-extrabold leading-none mb-5 sm:mb-6`}
                                    >
                                        {card.metric}
                                    </h3>
                                    <p
                                        className={`${t.quote} text-base sm:text-lg leading-relaxed italic`}
                                    >
                                        {card.quote}
                                    </p>
                                </div>
                                <div
                                    className={`inline-flex items-center gap-2 self-start mt-6 sm:mt-8 px-3 sm:px-4 py-2 rounded-full border ${t.badge}`}
                                >
                                    <span
                                        className={`material-symbols-outlined ${t.icon} text-sm`}
                                    >
                                        {card.icon}
                                    </span>
                                    <span className="text-xs font-bold">{card.badge}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* ── Stats Bar ── */}
                <div className="bg-primary rounded-[2rem] py-7 sm:py-8 px-4 sm:px-8 mb-10 sm:mb-14 md:mb-16">
                    <div className="flex flex-col sm:flex-row justify-around items-center gap-6 sm:gap-4">
                        {resultStats.map((stat, i) => (
                            <React.Fragment key={stat.label}>
                                <div className="flex flex-col items-center text-center">
                                    <span className="text-black text-3xl sm:text-4xl font-display font-extrabold leading-none">
                                        {stat.value}
                                    </span>
                                    <span className="text-black/70 text-xs sm:text-sm font-bold uppercase tracking-widest mt-1">
                                        {stat.label}
                                    </span>
                                </div>
                                {i < resultStats.length - 1 && (
                                    <div className="hidden sm:block h-12 w-px bg-black/15" />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* ── Bottom CTA ── */}
                <div className="flex justify-center">
                    <a
                        href="#"
                        className="group inline-flex items-center gap-3 bg-primary hover:bg-lime-500 transition-all duration-300 px-7 sm:px-8 py-4 sm:py-5 rounded-full shadow-lg shadow-primary/20"
                    >
                        <span className="text-black text-base sm:text-lg font-display font-extrabold uppercase">
                            Get Results Like These
                        </span>
                        <span className="material-symbols-outlined text-black group-hover:translate-x-1 transition-transform">
                            arrow_forward
                        </span>
                        <span className="h-5 w-px bg-black/25 mx-1 hidden sm:block" />
                        <span className="text-black font-bold text-sm hidden sm:block">
                            Book a Free Call
                        </span>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Results;

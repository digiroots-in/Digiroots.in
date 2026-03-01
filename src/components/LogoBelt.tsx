import React from 'react';
import { partnerLogos } from '../data/mockData';

interface LogoBeltProps {
    readonly className?: string;
}

export const LogoBelt: React.FC<LogoBeltProps> = ({ className = '' }) => {
    return (
        <section
            className={`py-12 border-y border-slate-200 dark:border-white/10 overflow-hidden ${className}`}
        >
            <div className="max-w-7xl mx-auto px-6">
                <p className="text-center text-sm font-semibold uppercase tracking-widest text-slate-400 mb-8">
                    Collaborating with global industry leaders
                </p>
                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all">
                    {partnerLogos.map((name) => (
                        <span key={name} className="text-2xl font-display font-bold">
                            {name}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LogoBelt;

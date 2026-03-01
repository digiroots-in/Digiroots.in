import React from 'react';
import { pricingPlans } from '../data/mockData';

interface PricingProps {
    readonly className?: string;
    readonly onOpenContact?: () => void;
}

export const Pricing: React.FC<PricingProps> = ({ className = '', onOpenContact }) => {
    return (
        <section
            id="pricing"
            className={`relative overflow-hidden bg-slate-100 dark:bg-background-dark py-16 sm:py-20 md:py-24 px-4 sm:px-6 ${className}`}
        >
            {/* Ambient background glows */}
            <div
                className="pointer-events-none absolute -top-20 -left-20 h-[400px] w-[400px] rounded-full opacity-40 dark:opacity-100"
                style={{
                    background: 'radial-gradient(circle, rgba(132,204,22,0.15) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                }}
            />
            <div
                className="pointer-events-none absolute top-40 -right-0 h-[400px] w-[400px] rounded-full opacity-30 dark:opacity-60"
                style={{
                    background: 'radial-gradient(circle, rgba(132,204,22,0.15) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                }}
            />

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Section header */}
                <div className="flex flex-col items-center text-center mb-14 sm:mb-16">
                    <div className="flex w-full max-w-xs items-center gap-4 mb-6">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-slate-300 dark:to-white/10" />
                        <span className="text-xs sm:text-sm font-bold tracking-widest text-primary uppercase">
                            Pricing
                        </span>
                        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-slate-300 dark:to-white/10" />
                    </div>

                    <h2 className="max-w-4xl font-display font-extrabold leading-[1.1] tracking-tight text-slate-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-7xl uppercase">
                        Transparent Pricing
                        <br />
                        <span className="text-primary">For Every Business</span>
                    </h2>

                    <p className="mt-5 sm:mt-6 max-w-xl text-base sm:text-lg text-slate-500 dark:text-slate-400">
                        Simple plans that grow with you. No hidden fees, just results.
                    </p>
                </div>

                {/* Pricing grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {pricingPlans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`
                                group relative flex flex-col rounded-[2rem]
                                bg-white dark:bg-surface-dark
                                p-8 sm:p-10
                                transition-transform duration-300
                                ${plan.featured
                                    ? 'border-2 border-primary'
                                    : 'border border-slate-200 dark:border-white/10 hover:-translate-y-1 hover:border-slate-300 dark:hover:border-white/20'
                                }
                            `}
                            style={plan.featured ? { boxShadow: '0 0 28px -5px rgba(132,204,22,0.25)' } : undefined}
                        >
                            {/* Most Popular badge */}
                            {plan.featured && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-black uppercase tracking-wider text-black shadow-sm">
                                    Most Popular
                                </div>
                            )}

                            {/* Plan name + description */}
                            <div className="mb-6">
                                <h3 className="font-display text-lg sm:text-xl font-extrabold tracking-wide text-slate-900 dark:text-white uppercase">
                                    {plan.name}
                                </h3>
                                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                                    {plan.description}
                                </p>
                            </div>

                            {/* Divider */}
                            <div className="mb-6 h-px w-full bg-slate-200 dark:bg-white/8" />

                            {/* Price */}
                            <div className="mb-7 flex items-baseline gap-1.5">
                                <span className={`font-display text-3xl sm:text-4xl font-bold ${plan.featured ? 'text-primary' : 'text-slate-900 dark:text-white'}`}>
                                    {plan.price}
                                </span>
                                <span className="text-sm text-slate-500 dark:text-slate-400">
                                    {plan.priceLabel}
                                </span>
                            </div>

                            {/* CTA */}
                            <button
                                onClick={() => onOpenContact?.()}
                                className={`
                                    mb-7 block w-full rounded-full py-3 text-center text-sm font-bold
                                    transition-all duration-200 cursor-pointer
                                    ${plan.featured
                                        ? 'bg-primary text-black hover:bg-lime-500 hover:scale-[1.02] active:scale-[0.98]'
                                        : 'border border-slate-300 dark:border-white/20 text-slate-700 dark:text-white hover:border-primary hover:text-primary dark:hover:border-white/40 dark:hover:bg-white/10'
                                    }
                                `}
                            >
                                Get Started
                            </button>

                            {/* Features */}
                            <ul className="flex-1 space-y-3 sm:space-y-4">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-start gap-3">
                                        <span
                                            className="material-symbols-outlined shrink-0 text-[20px] text-primary mt-0.5"
                                            style={{ fontVariationSettings: "'FILL' 1" }}
                                        >
                                            check_circle
                                        </span>
                                        <span className={`text-sm font-medium leading-snug ${plan.featured ? 'text-slate-800 dark:text-white' : 'text-slate-600 dark:text-slate-300'}`}>
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pricing;

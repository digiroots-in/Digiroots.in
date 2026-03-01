import React from 'react';
import { pricingPlans } from '../data/mockData';

interface PricingProps {
    readonly className?: string;
}

export const Pricing: React.FC<PricingProps> = ({ className = '' }) => {
    return (
        <section
            id="pricing"
            className={`py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-accent-blue/30 dark:bg-surface-dark ${className}`}
        >
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-10 sm:mb-14 md:mb-16">
                    <span className="text-primary font-bold tracking-widest uppercase text-sm">
                        Pricing
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold mt-3 sm:mt-4 mb-4 sm:mb-6 leading-tight">
                        TRANSPARENT PRICING FOR EVERY BUSINESS
                    </h2>
                    <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
                        Simple plans that grow with you. No hidden fees, just results.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
                    {pricingPlans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`bg-white dark:bg-white/5 p-6 sm:p-8 lg:p-10 rounded-[2rem] flex flex-col relative ${plan.featured
                                    ? 'border-2 border-primary'
                                    : 'border border-slate-200 dark:border-white/10'
                                }`}
                        >
                            {plan.featured && (
                                <span className="absolute top-4 sm:top-6 right-4 sm:right-6 bg-orange-500 text-white text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 rounded-full uppercase tracking-widest">
                                    Most Popular
                                </span>
                            )}

                            <div className="flex items-center gap-3 mb-5 sm:mb-6">
                                <div className={`p-2.5 sm:p-3 ${plan.iconBg} rounded-xl`}>
                                    <span
                                        className={`material-symbols-outlined ${plan.featured ? 'text-primary' : ''}`}
                                    >
                                        {plan.icon}
                                    </span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg sm:text-xl">{plan.name}</h3>
                                    <p className="text-slate-500 text-xs sm:text-sm">{plan.description}</p>
                                </div>
                            </div>

                            <div className="mb-6 sm:mb-8">
                                <span className="text-4xl sm:text-5xl font-extrabold">{plan.price}</span>
                                <span className="text-slate-500 text-sm sm:text-base">/month</span>
                            </div>

                            <button
                                className={`w-full py-3 sm:py-4 rounded-xl font-bold transition-all mb-6 sm:mb-8 text-sm sm:text-base ${plan.buttonClass}`}
                            >
                                Get Started
                            </button>

                            <div className="space-y-3 sm:space-y-4">
                                {plan.features.map((feature) => (
                                    <div key={feature} className="flex items-start sm:items-center gap-2 sm:gap-3">
                                        <span className="material-symbols-outlined text-primary text-sm shrink-0 mt-0.5 sm:mt-0">
                                            check_circle
                                        </span>
                                        <span className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
                                            {feature}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pricing;

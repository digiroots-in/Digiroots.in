import React from 'react';
import { faqItems } from '../data/mockData';

interface FaqProps {
    readonly className?: string;
}

export const Faq: React.FC<FaqProps> = ({ className = '' }) => {
    return (
        <section id="faq" className={`py-16 sm:py-20 md:py-24 px-4 sm:px-6 ${className}`}>
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 sm:gap-12 lg:gap-16">
                <div className="lg:w-1/3">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold mb-4 sm:mb-6 leading-tight">
                        EVERYTHING YOU NEED TO KNOW
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
                        Got questions? We've got answers. If you can't find what you're
                        looking for, feel free to contact us.
                    </p>
                </div>

                <div className="lg:w-2/3 space-y-3 sm:space-y-4">
                    {faqItems.map((item) => (
                        <details
                            key={item.question}
                            className="group bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/10 overflow-hidden"
                            open={item.defaultOpen}
                        >
                            <summary className="flex items-center justify-between p-4 sm:p-6 cursor-pointer list-none font-bold text-base sm:text-lg">
                                <span className="pr-4">{item.question}</span>
                                <span className="material-symbols-outlined group-open:rotate-180 transition-transform shrink-0">
                                    expand_more
                                </span>
                            </summary>
                            <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-0 text-slate-600 dark:text-slate-400 text-sm sm:text-base">
                                {item.answer}
                            </div>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Faq;

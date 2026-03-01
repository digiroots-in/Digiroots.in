import React from 'react';
import { services } from '../data/mockData';

interface ServicesProps {
    readonly className?: string;
}

export const Services: React.FC<ServicesProps> = ({ className = '' }) => {
    return (
        <section
            id="services"
            className={`py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-slate-50 dark:bg-surface-dark/50 ${className}`}
        >
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8 mb-10 sm:mb-14 md:mb-16">
                    <div className="max-w-2xl">
                        <span className="text-primary font-bold tracking-widest uppercase text-sm">
                            Our Services
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold mt-3 sm:mt-4 mb-4 sm:mb-6 leading-tight">
                            EVERYTHING YOUR BRAND NEEDS ONLINE
                        </h2>
                    </div>
                    <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 lg:max-w-sm lg:mb-2">
                        From SEO and paid ads to social media, branding, and web design —
                        we offer everything you need to grow and succeed online.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {services.map((service) => (
                        <div
                            key={service.title}
                            className={`p-6 sm:p-8 lg:p-10 rounded-3xl ${service.colorClass} text-slate-900 group hover:scale-[1.02] transition-transform`}
                        >
                            <span className="material-symbols-outlined text-3xl sm:text-4xl mb-4 sm:mb-6 block">
                                {service.icon}
                            </span>
                            <h3 className="text-xl sm:text-2xl font-extrabold mb-3 sm:mb-4">{service.title}</h3>
                            <p className="text-slate-700 text-sm sm:text-base">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;

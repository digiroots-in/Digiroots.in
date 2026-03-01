import React, { useState } from 'react';
import { footerLinks } from '../data/mockData';

interface FooterProps {
    readonly className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className = '' }) => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setEmail('');
    };

    return (
        <footer
            className={`bg-background-light dark:bg-background-dark pt-16 sm:pt-20 md:pt-24 pb-10 sm:pb-12 border-t border-slate-200 dark:border-white/10 ${className}`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                {/* CTA Banner */}
                <div className="bg-primary/10 dark:bg-white/5 rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12 md:p-20 text-center mb-14 sm:mb-20 md:mb-24 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-primary blur-[120px] opacity-20 -mr-24 sm:-mr-32 -mt-24 sm:-mt-32 pointer-events-none" />
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold mb-6 sm:mb-10 leading-tight">
                        FIND SOLUTIONS <br />
                        <span className="text-primary">THAT FIT YOUR NEEDS</span>
                    </h2>
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
                    >
                        <div className="relative w-full sm:w-96">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="w-full bg-white dark:bg-white/10 border-none rounded-full py-4 sm:py-5 px-6 sm:px-8 focus:ring-2 focus:ring-primary outline-none text-slate-900 dark:text-white text-sm sm:text-base"
                            />
                            <button
                                type="submit"
                                className="absolute right-2 top-2 bottom-2 bg-primary hover:bg-lime-500 text-black rounded-full px-4 sm:px-6 transition-colors"
                            >
                                <span className="material-symbols-outlined text-sm sm:text-base">arrow_forward</span>
                            </button>
                        </div>
                    </form>
                </div>

                {/* Footer links grid — 2 cols on mobile, 4 on md, 5 on lg */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 sm:gap-10 md:gap-12 mb-12 sm:mb-16 md:mb-20">
                    {/* Brand column — full width on mobile */}
                    <div className="col-span-2 lg:col-span-2">
                        <span className="text-2xl sm:text-3xl font-display font-extrabold mb-4 sm:mb-6 block">
                            digiroots<span className="text-primary">.</span>
                        </span>
                        <p className="text-slate-500 max-w-xs leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">
                            The growth partner for modern brands. We combine creative
                            storytelling with data-driven strategy.
                        </p>
                        <div className="flex gap-3 sm:gap-4">
                            <a
                                href="#"
                                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center hover:bg-primary hover:text-black transition-all"
                            >
                                <span className="material-symbols-outlined text-sm">
                                    public
                                </span>
                            </a>
                            <a
                                href="#"
                                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center hover:bg-primary hover:text-black transition-all"
                            >
                                <span className="material-symbols-outlined text-sm">
                                    alternate_email
                                </span>
                            </a>
                        </div>
                    </div>

                    {/* Main pages */}
                    <div>
                        <h4 className="font-bold mb-4 sm:mb-6 text-sm sm:text-base">Main Pages</h4>
                        <ul className="space-y-3 sm:space-y-4 text-slate-500 text-sm sm:text-base">
                            {footerLinks.mainPages.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="hover:text-primary transition-colors"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact — always visible (removed hidden lg:block) */}
                    <div className="col-span-2 md:col-span-1">
                        <h4 className="font-bold mb-4 sm:mb-6 text-sm sm:text-base">Contact</h4>
                        <ul className="space-y-3 sm:space-y-4 text-slate-500 text-sm sm:text-base">
                            <li className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm shrink-0">mail</span>
                                <span className="break-all">{footerLinks.contact.email}</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm shrink-0">
                                    location_on
                                </span>
                                {footerLinks.contact.location}
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="pt-6 sm:pt-8 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 text-xs sm:text-sm text-slate-500 text-center">
                    <p>© 2024 digiroots Agency. All rights reserved.</p>
                    <div className="flex items-center gap-4 sm:gap-6">
                        <a href="#" className="hover:text-primary">
                            Cookie Settings
                        </a>
                        <a href="#" className="hover:text-primary">
                            Legal Notice
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

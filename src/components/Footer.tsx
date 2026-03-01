import React, { useState } from 'react';
import { footerLinks } from '../data/mockData';

interface FooterProps {
    readonly className?: string;
    readonly onOpenContact?: () => void;
}

// Inline SVG social icons (Material Symbols has no brand icons)
const InstagramIcon = () => (
    <svg width="18" height="18" fill="currentColor" viewBox="0 0 256 256">
        <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z" />
    </svg>
);

const WhatsAppIcon = () => (
    <svg width="18" height="18" fill="currentColor" viewBox="0 0 256 256">
        <path d="M187.58,144.84l-32-16a8,8,0,0,0-8,.5l-14.69,9.8a40.55,40.55,0,0,1-16-16l9.8-14.69a8,8,0,0,0,.5-8l-16-32A8,8,0,0,0,104,64a40,40,0,0,0-40,40,88.1,88.1,0,0,0,88,88,40,40,0,0,0,40-40A8,8,0,0,0,187.58,144.84ZM152,176a72.08,72.08,0,0,1-72-72A24,24,0,0,1,99.29,80.46l11.48,23L101,118a8,8,0,0,0-.73,7.51,56.47,56.47,0,0,0,30.15,30.15A8,8,0,0,0,138,155l14.61-9.74,23,11.48A24,24,0,0,1,152,176ZM128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24Zm0,192a87.87,87.87,0,0,1-44.06-11.81,8,8,0,0,0-6.54-.67L40,216,52.47,178.6a8,8,0,0,0-.66-6.54A88,88,0,1,1,128,216Z" />
    </svg>
);

export const Footer: React.FC<FooterProps> = ({ className = '', onOpenContact }) => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onOpenContact?.();
        setEmail('');
    };

    return (
        <footer
            className={`relative w-full overflow-hidden bg-background-light dark:bg-background-dark border-t border-slate-200 dark:border-white/10 pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-10 px-4 sm:px-6 lg:px-10 ${className}`}
        >
            <div className="max-w-7xl mx-auto">

                {/* CTA Banner */}
                <div className="relative w-full rounded-[2rem] sm:rounded-[3rem] overflow-hidden mb-16 sm:mb-20 md:mb-24 border border-slate-200 dark:border-white/10 bg-primary/5 dark:bg-white/5">
                    {/* Ambient lime glow */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{ background: 'radial-gradient(circle at top right, rgba(132,204,22,0.18), transparent 50%)' }}
                    />
                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-10 px-8 sm:px-12 py-12 sm:py-16 lg:py-20">
                        {/* Headline */}
                        <div className="text-center lg:text-left max-w-2xl">
                            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight">
                                READY TO GROW?{' '}
                                <br />
                                <span className="text-primary">LET'S BUILD SOMETHING GREAT</span>
                            </h2>
                        </div>
                        {/* Email form */}
                        <div className="w-full max-w-md shrink-0">
                            <form
                                onSubmit={handleSubmit}
                                className="flex items-center bg-white dark:bg-surface-dark/60 border border-slate-200 dark:border-white/10 rounded-full p-1.5 focus-within:border-primary/60 transition-colors duration-300"
                            >
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email address"
                                    className="flex-1 bg-transparent border-none text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 px-5 py-3 focus:ring-0 text-sm sm:text-base outline-none"
                                />
                                <button
                                    type="submit"
                                    className="flex items-center justify-center bg-primary hover:bg-lime-500 text-black rounded-full w-11 h-11 sm:w-12 sm:h-12 transition-all hover:scale-105 active:scale-95 shrink-0"
                                >
                                    <span className="material-symbols-outlined text-xl">arrow_forward</span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Footer Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-12 sm:mb-16 pb-12 sm:pb-16 border-b border-slate-200 dark:border-white/10">

                    {/* Column 1: Brand — spans 2 cols on mobile */}
                    <div className="col-span-2 md:col-span-1 flex flex-col gap-5 sm:gap-6">
                        <a href="#" className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight">
                            digiroots<span className="text-primary">.</span>
                        </a>
                        <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed max-w-xs">
                            The growth partner for modern brands. We combine creative storytelling with data-driven strategy.
                        </p>
                        <div className="flex gap-3 sm:gap-4">
                            {[
                                { label: 'Instagram', Icon: InstagramIcon, href: footerLinks.contact.instagram },
                                { label: 'WhatsApp', Icon: WhatsAppIcon, href: `https://wa.me/${footerLinks.contact.phone.replace(/\D/g, '')}` },
                            ].map(({ label, Icon, href }) => (
                                <a
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-slate-300 dark:border-white/20 flex items-center justify-center text-slate-600 dark:text-white hover:bg-primary hover:text-black hover:border-primary transition-all duration-300"
                                >
                                    <Icon />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Services */}
                    <div className="flex flex-col gap-4 sm:gap-5">
                        <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">Services</h3>
                        <ul className="flex flex-col gap-3 sm:gap-4">
                            {footerLinks.services.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors duration-200 text-sm font-medium"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Quick Links */}
                    <div className="flex flex-col gap-4 sm:gap-5">
                        <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">Quick Links</h3>
                        <ul className="flex flex-col gap-3 sm:gap-4">
                            {footerLinks.mainPages.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors duration-200 text-sm font-medium"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Contact Us */}
                    <div className="flex flex-col gap-4 sm:gap-5">
                        <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">Contact Us</h3>
                        <ul className="flex flex-col gap-4 sm:gap-5">
                            <li className="flex items-start gap-3 text-slate-500 dark:text-slate-400">
                                <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">mail</span>
                                <a
                                    href={`mailto:${footerLinks.contact.email}`}
                                    className="text-sm hover:text-primary dark:hover:text-primary transition-colors break-all"
                                >
                                    {footerLinks.contact.email}
                                </a>
                            </li>
                            <li className="flex items-start gap-3 text-slate-500 dark:text-slate-400">
                                <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">location_on</span>
                                <span className="text-sm">{footerLinks.contact.location}</span>
                            </li>
                            <li className="flex items-start gap-3 text-slate-500 dark:text-slate-400">
                                <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">call</span>
                                <a
                                    href={`tel:${footerLinks.contact.phone.replace(/\s/g, '')}`}
                                    className="text-sm hover:text-primary dark:hover:text-primary transition-colors"
                                >
                                    {footerLinks.contact.phone}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400 text-center">
                    <p>© 2025 digiroots. All rights reserved.</p>
                    <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
                        <a href="#" className="hover:text-primary transition-colors duration-200">Privacy Policy</a>
                        <span className="opacity-40">·</span>
                        <a href="#" className="hover:text-primary transition-colors duration-200">Terms of Service</a>
                        <span className="opacity-40">·</span>
                        <a href="#" className="hover:text-primary transition-colors duration-200">Cookie Settings</a>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;

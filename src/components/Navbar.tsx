import React, { useState } from 'react';
import { navLinks } from '../data/mockData';
import { useDarkMode } from '../hooks/useDarkMode';

interface NavbarProps {
    readonly className?: string;
    readonly onOpenContact?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ className = '', onOpenContact }) => {
    const { isDark, toggle } = useDarkMode();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleContactClick = (e: React.MouseEvent) => {
        e.preventDefault();
        onOpenContact?.();
        setMenuOpen(false);
    };

    return (
        <nav
            className={`fixed w-full z-50 top-0 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-slate-200 dark:border-white/10 transition-colors duration-300 ${className}`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <span className="text-xl sm:text-2xl font-display font-extrabold tracking-tight">
                        digiroots<span className="text-primary">.</span>
                    </span>
                </div>

                {/* Desktop nav links */}
                <div className="hidden md:flex items-center gap-6 lg:gap-8 font-medium">
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="hover:text-primary transition-colors"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                {/* Right controls */}
                <div className="flex items-center gap-2 sm:gap-4">
                    <button
                        onClick={toggle}
                        className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                        aria-label="Toggle dark mode"
                    >
                        {isDark ? (
                            <span className="material-symbols-outlined">light_mode</span>
                        ) : (
                            <span className="material-symbols-outlined">dark_mode</span>
                        )}
                    </button>

                    {/* Desktop CTA */}
                    <button
                        onClick={handleContactClick}
                        className="hidden sm:block bg-primary hover:bg-lime-500 text-black font-bold px-4 lg:px-6 py-2 sm:py-2.5 rounded-full transition-all hover:scale-105 text-sm lg:text-base cursor-pointer"
                    >
                        Contact Us
                    </button>

                    {/* Hamburger — mobile only */}
                    <button
                        onClick={() => setMenuOpen((v) => !v)}
                        className="md:hidden p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                        aria-label="Toggle menu"
                    >
                        <span className="material-symbols-outlined">
                            {menuOpen ? 'close' : 'menu'}
                        </span>
                    </button>
                </div>
            </div>

            {/* Mobile dropdown menu */}
            {menuOpen && (
                <div className="md:hidden px-4 pb-4 border-t border-slate-200 dark:border-white/10 bg-background-light/95 dark:bg-background-dark/95">
                    <div className="flex flex-col gap-1 pt-4">
                        {navLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                onClick={() => setMenuOpen(false)}
                                className="font-medium py-3 px-4 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 hover:text-primary transition-all"
                            >
                                {link.label}
                            </a>
                        ))}
                        <button
                            onClick={handleContactClick}
                            className="mt-2 bg-primary hover:bg-lime-500 text-black font-bold px-6 py-3 rounded-full transition-all text-center cursor-pointer"
                        >
                            Contact Us
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

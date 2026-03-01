import React from 'react';

interface HeroProps {
    readonly className?: string;
}

export const Hero: React.FC<HeroProps> = ({ className = '' }) => {
    return (
        <section className={`pt-32 sm:pt-36 md:pt-40 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6 overflow-hidden ${className}`}>
            <div className="max-w-5xl mx-auto text-center relative">
                {/* Ambient glow decorations */}
                <div className="absolute -top-10 -left-10 w-24 sm:w-32 h-24 sm:h-32 bg-primary/20 blur-3xl rounded-full pointer-events-none" />
                <div className="absolute -bottom-10 -right-10 w-32 sm:w-48 h-32 sm:h-48 bg-primary/10 blur-3xl rounded-full pointer-events-none" />

                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-primary/30 text-primary font-semibold text-xs sm:text-sm mb-6 sm:mb-8 bg-primary/5">
                    <span className="relative flex h-2 w-2 shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                    </span>
                    #1 Digital Marketing Agency
                </div>

                {/* Headline */}
                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tight leading-[1.1] mb-6 sm:mb-8">
                    TRANSFORMING <br />
                    <span className="bg-white dark:bg-white text-black px-2 sm:px-4 sticker-highlight">
                        IDEAS
                    </span>{' '}
                    INTO{' '}
                    <span className="bg-primary text-black px-2 sm:px-4 sticker-highlight">
                        REAL
                    </span>{' '}
                    <br />
                    WORLD <span className="text-primary">RESULTS</span>
                </h1>

                {/* Subheadline */}
                <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2">
                    From strategy to execution — we handle everything from SEO and Paid
                    Ads to Social Media, Web Design, and beyond.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-2">
                    <a
                        href="#"
                        className="w-full sm:w-auto bg-primary hover:bg-lime-500 text-black font-bold px-8 sm:px-10 py-4 sm:py-5 rounded-full text-lg sm:text-xl transition-all hover:scale-105 shadow-xl shadow-primary/20 flex items-center justify-center gap-2"
                    >
                        Book A Call{' '}
                        <span className="material-symbols-outlined">arrow_forward</span>
                    </a>
                    <a
                        href="#results"
                        className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 rounded-full font-bold text-lg sm:text-xl border-2 border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 transition-all text-center"
                    >
                        View Results
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;

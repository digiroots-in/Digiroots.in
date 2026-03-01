import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import emailjs from '@emailjs/browser';
import { db } from '../lib/firebase';


interface ContactModalProps {
    readonly isOpen: boolean;
    readonly onClose: () => void;
}

const services = [
    'SEO Marketing',
    'Paid Advertising',
    'Social Media',
    'Branding',
    'Web Development',
    'Automation & AI',
];

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
    const [step, setStep] = useState(1);
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [formData, setFormData] = useState({
        businessName: '',
        email: '',
        phone: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Reset step on open
    useEffect(() => {
        if (isOpen) {
            setStep(1);
        }
    }, [isOpen]);

    // Close on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            window.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            window.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const toggleService = (service: string) => {
        setSelectedServices((prev) =>
            prev.includes(service)
                ? prev.filter((s) => s !== service)
                : [...prev, service]
        );
    };

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault();
        setStep(2);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            // Add a timeout so it doesn't hang infinitely if Firebase/EmailJS network requests fail
            const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => reject(new Error('Request timed out. Check your environment variables or network.')), 10000);
            });

            const submitTask = async () => {
                // 1. Save to Firestore
                await addDoc(collection(db, 'contacts'), {
                    ...formData,
                    selectedServices,
                    createdAt: serverTimestamp(),
                });

                // 2. Send Confirmation Email via EmailJS
                const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
                const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
                const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

                if (serviceId !== 'YOUR_SERVICE_ID' && serviceId && serviceId.trim() !== '') {
                    await emailjs.send(
                        serviceId,
                        templateId,
                        {
                            user_name: formData.businessName,
                            user_email: formData.email,
                            user_phone: formData.phone,
                            selected_services: selectedServices.join(', ') || 'No specific services',
                        },
                        publicKey
                    );
                } else {
                    console.warn("EmailJS credentials not set. Skipping email dispatch.");
                }
            };

            // Run both, if submitTask takes longer than 10s, it throws the timeout error
            await Promise.race([submitTask(), timeoutPromise]);

            setIsSuccess(true);
            setTimeout(() => {
                onClose();
                // Reset form after exit animation completes
                setTimeout(() => {
                    setStep(1);
                    setFormData({ businessName: '', email: '', phone: '' });
                    setSelectedServices([]);
                    setIsSuccess(false);
                }, 300);
            }, 3000);
        } catch (err: any) {
            console.error('Error saving document or sending email:', err);
            setError('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal Card */}
            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                className="relative z-10 w-full max-w-[520px] max-h-[90vh] bg-white dark:bg-[#0a260a] border border-slate-200 dark:border-white/10 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col"
            >
                {/* Glow Effect */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/20 blur-[80px] rounded-full pointer-events-none" />

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/5 transition-colors"
                >
                    <span className="material-symbols-outlined text-[24px]">close</span>
                </button>

                {/* Progress Bar */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-100 dark:bg-white/5 z-20">
                    <motion.div
                        initial={{ width: '50%' }}
                        animate={{ width: step === 1 ? '50%' : '100%' }}
                        className="h-full bg-primary"
                    />
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 sm:p-8 md:p-10">
                    <AnimatePresence mode="wait">
                        {isSuccess ? (
                            <motion.div
                                key="success"
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="flex flex-col items-center justify-center py-12 space-y-4 text-center"
                            >
                                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                                    <span className="material-symbols-outlined text-[40px] text-primary">check_circle</span>
                                </div>
                                <h3 className="text-2xl font-display font-extrabold text-slate-900 dark:text-white">
                                    Request Received!
                                </h3>
                                <p className="text-slate-500 dark:text-slate-400 max-w-[280px]">
                                    Thank you for reaching out. We will get back to you and send a confirmation email shortly.
                                </p>
                            </motion.div>
                        ) : step === 1 ? (
                            <motion.div
                                key="step1"
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: 20, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-6 pt-4"
                            >
                                {/* Header */}
                                <div className="space-y-1">
                                    <span className="text-primary font-bold tracking-wider text-xs uppercase">Step 1 of 2</span>
                                    <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-white leading-tight uppercase">
                                        Tell Us About<br />Your Business
                                    </h2>
                                </div>

                                <form className="space-y-4" onSubmit={handleNext}>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                                            <span className="material-symbols-outlined text-[20px]">storefront</span>
                                        </div>
                                        <input
                                            required
                                            type="text"
                                            placeholder="Business Name"
                                            value={formData.businessName}
                                            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                                            className="block w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm transition-all outline-none"
                                        />
                                    </div>

                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                                            <span className="material-symbols-outlined text-[20px]">mail</span>
                                        </div>
                                        <input
                                            required
                                            type="email"
                                            placeholder="Email Address"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="block w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm transition-all outline-none"
                                        />
                                    </div>

                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                                            <span className="material-symbols-outlined text-[20px]">call</span>
                                        </div>
                                        <input
                                            required
                                            type="tel"
                                            placeholder="Phone Number"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="block w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm transition-all outline-none"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-primary hover:bg-lime-500 text-black font-bold py-4 px-6 rounded-full transition-all flex items-center justify-center gap-2 group shadow-xl hover:shadow-primary/20 active:scale-[0.98] mt-4"
                                    >
                                        Next Step
                                        <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                    </button>
                                </form>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="step2"
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -20, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-6 pt-4"
                            >
                                {/* Header */}
                                <div className="space-y-1">
                                    <span className="text-primary font-bold tracking-wider text-xs uppercase">Step 2 of 2</span>
                                    <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-white leading-tight uppercase">
                                        How Can We<br />Help You?
                                    </h2>
                                </div>

                                <form className="space-y-6" onSubmit={handleSubmit}>
                                    <div>
                                        <label className="block text-slate-700 dark:text-slate-300 text-sm font-medium mb-4">
                                            Select all that apply:
                                        </label>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {services.map((service) => {
                                                const isSelected = selectedServices.includes(service);
                                                return (
                                                    <button
                                                        key={service}
                                                        type="button"
                                                        onClick={() => toggleService(service)}
                                                        className={`flex items-center gap-3 p-3.5 rounded-xl text-sm font-bold transition-all border ${isSelected
                                                            ? 'bg-primary/10 text-primary border-primary'
                                                            : 'bg-slate-50 dark:bg-white/5 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/30'
                                                            }`}
                                                    >
                                                        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${isSelected ? 'bg-primary border-primary' : 'bg-transparent border-slate-300 dark:border-white/20'}`}>
                                                            {isSelected && <span className="material-symbols-outlined text-black text-[16px] font-bold">check</span>}
                                                        </div>
                                                        {service}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                        <button
                                            type="button"
                                            onClick={() => setStep(1)}
                                            disabled={isSubmitting}
                                            className="flex-1 py-4 px-6 rounded-full font-bold text-slate-600 dark:text-slate-300 border-2 border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 transition-all text-center disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Back
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="grow-[2] bg-primary hover:bg-lime-500 disabled:bg-primary/50 text-black font-bold py-4 px-6 rounded-full transition-all flex items-center justify-center gap-2 group shadow-xl hover:shadow-primary/20 active:scale-[0.98] disabled:cursor-not-allowed"
                                        >
                                            {isSubmitting ? (
                                                <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                            ) : (
                                                <>
                                                    Book My Free Call
                                                    <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                    {error && (
                                        <p className="text-red-500 text-sm text-center font-medium mt-2">
                                            {error}
                                        </p>
                                    )}
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <p className="mt-8 text-xs text-slate-500 text-center font-sans">
                        No commitment. No spam. 100% free.
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default ContactModal;

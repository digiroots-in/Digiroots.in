import React from 'react';
import { avatarUrl } from '../data/mockData';

interface NotificationToastProps {
    readonly className?: string;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({
    className = '',
}) => {
    return (
        <div
            className={`fixed bottom-4 left-4 z-40 bg-white dark:bg-slate-900 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 animate-bounce cursor-pointer max-w-[180px] sm:max-w-none ${className}`}
        >
            <div className="flex items-center gap-2 sm:gap-3">
                <div className="relative shrink-0">
                    <img
                        src={avatarUrl}
                        alt="Client notification"
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-primary"
                    />
                    <span className="absolute -top-0.5 -right-0.5 bg-green-500 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border-2 border-white dark:border-slate-900" />
                </div>
                <div className="text-[10px] sm:text-xs leading-tight">
                    <p className="font-bold">New Result!</p>
                    <p className="text-primary font-bold">+420% ROI for "Luxe"</p>
                </div>
            </div>
        </div>
    );
};

export default NotificationToast;

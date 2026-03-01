import { useState } from 'react';

export const useDarkMode = () => {
    const [isDark, setIsDark] = useState(true);

    const toggle = () => {
        setIsDark((prev) => {
            const next = !prev;
            if (next) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
            return next;
        });
    };

    return { isDark, toggle };
};

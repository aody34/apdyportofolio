import { useState, useEffect, useCallback } from 'react';

/**
 * Hook to handle reduced motion preference
 * Respects both system preference and manual toggle
 */
export const useReducedMotion = () => {
    // Check system preference
    const getSystemPreference = () => {
        if (typeof window === 'undefined') return false;
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    };

    // Check localStorage for manual preference
    const getStoredPreference = () => {
        if (typeof window === 'undefined') return null;
        const stored = localStorage.getItem('reducedMotion');
        return stored !== null ? stored === 'true' : null;
    };

    const [reducedMotion, setReducedMotion] = useState(() => {
        const stored = getStoredPreference();
        return stored !== null ? stored : getSystemPreference();
    });

    // Toggle function
    const toggleReducedMotion = useCallback(() => {
        setReducedMotion(prev => {
            const newValue = !prev;
            localStorage.setItem('reducedMotion', String(newValue));

            // Apply/remove class to html element
            if (newValue) {
                document.documentElement.classList.add('reduced-motion');
            } else {
                document.documentElement.classList.remove('reduced-motion');
            }

            return newValue;
        });
    }, []);

    // Listen for system preference changes
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

        const handleChange = (event) => {
            // Only update if no manual preference is stored
            if (getStoredPreference() === null) {
                setReducedMotion(event.matches);
            }
        };

        mediaQuery.addEventListener('change', handleChange);

        // Apply initial class
        if (reducedMotion) {
            document.documentElement.classList.add('reduced-motion');
        }

        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [reducedMotion]);

    return { reducedMotion, toggleReducedMotion };
};

export default useReducedMotion;

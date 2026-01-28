import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

/**
 * Smooth Scroll Provider using Lenis
 * Creates that premium "heavy" scroll feel like Redoyan's site
 */
const SmoothScroll = ({ children }) => {
    const lenisRef = useRef(null);

    useEffect(() => {
        // Initialize Lenis
        lenisRef.current = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            smoothTouch: false,
            touchMultiplier: 2,
        });

        // Animation frame loop
        function raf(time) {
            lenisRef.current?.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Cleanup
        return () => {
            lenisRef.current?.destroy();
        };
    }, []);

    return <>{children}</>;
};

export default SmoothScroll;

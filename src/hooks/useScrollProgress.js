import { useState, useEffect } from 'react';

/**
 * Hook to track scroll progress (0 to 1)
 * Also tracks current section based on scroll position
 */
export const useScrollProgress = (sections = []) => {
    const [progress, setProgress] = useState(0);
    const [currentSection, setCurrentSection] = useState(0);
    const [scrollDirection, setScrollDirection] = useState('down');
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const newProgress = Math.min(scrollY / docHeight, 1);

            // Determine scroll direction
            setScrollDirection(scrollY > lastScrollY ? 'down' : 'up');
            setLastScrollY(scrollY);

            setProgress(newProgress);

            // Calculate current section (0-indexed)
            if (sections.length > 0) {
                const sectionHeight = docHeight / sections.length;
                const newSection = Math.floor(scrollY / sectionHeight);
                setCurrentSection(Math.min(newSection, sections.length - 1));
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial call

        return () => window.removeEventListener('scroll', handleScroll);
    }, [sections.length, lastScrollY]);

    return { progress, currentSection, scrollDirection };
};

export default useScrollProgress;

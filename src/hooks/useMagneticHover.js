import { useState, useCallback, useRef } from 'react';

/**
 * Hook for magnetic hover effect
 * Makes elements slightly follow the mouse cursor
 */
export const useMagneticHover = (strength = 0.3) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const elementRef = useRef(null);

    const handleMouseMove = useCallback((e) => {
        if (!elementRef.current) return;

        const rect = elementRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = (e.clientX - centerX) * strength;
        const deltaY = (e.clientY - centerY) * strength;

        setPosition({ x: deltaX, y: deltaY });
    }, [strength]);

    const handleMouseLeave = useCallback(() => {
        setPosition({ x: 0, y: 0 });
    }, []);

    return {
        ref: elementRef,
        position,
        handlers: {
            onMouseMove: handleMouseMove,
            onMouseLeave: handleMouseLeave,
        },
        style: {
            transform: `translate(${position.x}px, ${position.y}px)`,
            transition: position.x === 0 && position.y === 0
                ? 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
                : 'transform 0.1s ease-out',
        }
    };
};

export default useMagneticHover;

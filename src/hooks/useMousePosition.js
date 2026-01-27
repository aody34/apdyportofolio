import { useState, useEffect, useCallback } from 'react';

/**
 * Hook to track mouse position for parallax effects
 * Returns normalized values (-1 to 1) for easy parallax calculations
 */
export const useMousePosition = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [normalizedPosition, setNormalizedPosition] = useState({ x: 0, y: 0 });
    const [isMoving, setIsMoving] = useState(false);
    const [idleTime, setIdleTime] = useState(0);

    const handleMouseMove = useCallback((event) => {
        const { clientX, clientY } = event;
        const { innerWidth, innerHeight } = window;

        // Raw position
        setMousePosition({ x: clientX, y: clientY });

        // Normalized position (-1 to 1)
        setNormalizedPosition({
            x: (clientX / innerWidth) * 2 - 1,
            y: (clientY / innerHeight) * 2 - 1
        });

        setIsMoving(true);
        setIdleTime(0);
    }, []);

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove, { passive: true });

        // Track idle time
        const idleInterval = setInterval(() => {
            setIdleTime(prev => prev + 1);
            if (idleTime > 2) {
                setIsMoving(false);
            }
        }, 1000);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            clearInterval(idleInterval);
        };
    }, [handleMouseMove, idleTime]);

    return {
        mousePosition,
        normalizedPosition,
        isMoving,
        idleTime
    };
};

export default useMousePosition;

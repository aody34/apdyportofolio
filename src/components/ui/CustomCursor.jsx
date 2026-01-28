import { useState, useEffect, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [isHoveringLink, setIsHoveringLink] = useState(false);
    const cursorRef = useRef(null);

    // Smooth spring physics for cursor
    const cursorX = useSpring(0, { damping: 25, stiffness: 400 });
    const cursorY = useSpring(0, { damping: 25, stiffness: 400 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseEnter = () => setIsHovering(true);
        const handleMouseLeave = () => setIsHovering(false);

        // Detect hovering over links and buttons
        const handleElementHover = () => {
            const hoverables = document.querySelectorAll('a, button, [data-cursor-hover]');

            hoverables.forEach(el => {
                el.addEventListener('mouseenter', () => setIsHoveringLink(true));
                el.addEventListener('mouseleave', () => setIsHoveringLink(false));
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        document.body.addEventListener('mouseenter', handleMouseEnter);
        document.body.addEventListener('mouseleave', handleMouseLeave);

        // Run after DOM is ready
        setTimeout(handleElementHover, 1000);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.body.removeEventListener('mouseenter', handleMouseEnter);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [cursorX, cursorY]);

    // Hide on touch devices
    if (typeof window !== 'undefined' && 'ontouchstart' in window) {
        return null;
    }

    return (
        <>
            {/* Outer ring */}
            <motion.div
                ref={cursorRef}
                className={`custom-cursor ${isHoveringLink ? 'expanded' : ''} ${!isHovering ? 'hidden' : ''}`}
                style={{
                    x: cursorX,
                    y: cursorY,
                }}
            />
            {/* Inner dot */}
            <motion.div
                className={`custom-cursor-dot ${isHoveringLink ? 'expanded' : ''} ${!isHovering ? 'hidden' : ''}`}
                style={{
                    x: cursorX,
                    y: cursorY,
                }}
            />
        </>
    );
};

export default CustomCursor;

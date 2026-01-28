import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import './TiltCard.css';

/**
 * 3D Tilt Card with Spotlight Effect
 * Premium interactive card that tilts toward cursor and shows spotlight
 */
const TiltCard = ({ children, className = '', glowColor = 'var(--accent-cyan)' }) => {
    const cardRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    // Mouse position relative to card center
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring for tilt
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
        damping: 20,
        stiffness: 300
    });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
        damping: 20,
        stiffness: 300
    });

    // Spotlight position
    const spotlightX = useMotionValue('50%');
    const spotlightY = useMotionValue('50%');

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Normalized position (-0.5 to 0.5)
        const normalizedX = (e.clientX - centerX) / rect.width;
        const normalizedY = (e.clientY - centerY) / rect.height;

        mouseX.set(normalizedX);
        mouseY.set(normalizedY);

        // Spotlight follows cursor exactly
        const spotX = ((e.clientX - rect.left) / rect.width) * 100;
        const spotY = ((e.clientY - rect.top) / rect.height) * 100;
        spotlightX.set(`${spotX}%`);
        spotlightY.set(`${spotY}%`);
    };

    const handleMouseEnter = () => setIsHovered(true);

    const handleMouseLeave = () => {
        setIsHovered(false);
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            className={`tilt-card ${className}`}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
                '--glow-color': glowColor,
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ scale: { duration: 0.3 } }}
        >
            {/* Spotlight overlay */}
            <motion.div
                className="tilt-card-spotlight"
                style={{
                    opacity: isHovered ? 1 : 0,
                    background: `radial-gradient(circle at ${spotlightX.get()} ${spotlightY.get()}, 
                        rgba(255,255,255,0.15) 0%, 
                        transparent 50%)`,
                }}
            />

            {/* Card content */}
            <div className="tilt-card-content">
                {children}
            </div>

            {/* Glow border on hover */}
            <motion.div
                className="tilt-card-glow"
                style={{ opacity: isHovered ? 1 : 0 }}
            />
        </motion.div>
    );
};

export default TiltCard;

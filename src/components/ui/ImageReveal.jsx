import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import './ImageReveal.css';

/**
 * Image Reveal with Clip-Path Mask Animation
 * Creates a curtain/wipe reveal effect like Redoyan's portfolio
 */
const ImageReveal = ({
    src,
    alt = '',
    className = '',
    direction = 'left', // left, right, top, bottom
    delay = 0
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [isLoaded, setIsLoaded] = useState(false);

    // Clip-path values for different directions
    const clipPaths = {
        left: {
            hidden: 'inset(0 100% 0 0)',
            visible: 'inset(0 0% 0 0)'
        },
        right: {
            hidden: 'inset(0 0 0 100%)',
            visible: 'inset(0 0 0 0%)'
        },
        top: {
            hidden: 'inset(0 0 100% 0)',
            visible: 'inset(0 0 0% 0)'
        },
        bottom: {
            hidden: 'inset(100% 0 0 0)',
            visible: 'inset(0% 0 0 0)'
        }
    };

    return (
        <div ref={ref} className={`image-reveal ${className}`}>
            {/* Overlay that slides away */}
            <motion.div
                className="image-reveal-overlay"
                initial={{ scaleX: 1 }}
                animate={isInView ? { scaleX: 0 } : { scaleX: 1 }}
                transition={{
                    duration: 0.8,
                    delay: delay,
                    ease: [0.16, 1, 0.3, 1]
                }}
                style={{
                    transformOrigin: direction === 'left' ? 'right' : 'left'
                }}
            />

            {/* Image with clip-path animation */}
            <motion.div
                className="image-reveal-wrapper"
                initial={{ clipPath: clipPaths[direction].hidden }}
                animate={isInView ? { clipPath: clipPaths[direction].visible } : {}}
                transition={{
                    duration: 1,
                    delay: delay + 0.1,
                    ease: [0.16, 1, 0.3, 1]
                }}
            >
                <motion.img
                    src={src}
                    alt={alt}
                    className="image-reveal-img"
                    initial={{ scale: 1.3 }}
                    animate={isInView ? { scale: 1 } : { scale: 1.3 }}
                    transition={{
                        duration: 1.2,
                        delay: delay,
                        ease: [0.16, 1, 0.3, 1]
                    }}
                    onLoad={() => setIsLoaded(true)}
                />
            </motion.div>
        </div>
    );
};

export default ImageReveal;

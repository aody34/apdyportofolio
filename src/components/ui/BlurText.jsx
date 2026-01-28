import { motion } from 'framer-motion';
import './BlurText.css';

/**
 * Premium Blur Reveal Text Animation
 * Each word emerges from digital mist with staggered timing
 */
const BlurText = ({
    text,
    className = '',
    delay = 0,
    colorPulse = false,
    animateOnLoad = true
}) => {
    const words = text.split(' ');

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.12,
                delayChildren: delay
            }
        }
    };

    const wordVariants = {
        hidden: {
            filter: 'blur(20px)',
            opacity: 0,
            y: 30,
            scale: 0.9,
            ...(colorPulse && { color: '#a855f7' })
        },
        visible: {
            filter: 'blur(0px)',
            opacity: 1,
            y: 0,
            scale: 1,
            ...(colorPulse && { color: '#ffffff' }),
            transition: {
                duration: 1,
                ease: [0.16, 1, 0.3, 1]
            }
        }
    };

    // For hero section - animate on load
    if (animateOnLoad) {
        return (
            <motion.div
                className={`blur-text ${className}`}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {words.map((word, index) => (
                    <motion.span
                        key={index}
                        className="blur-text-word"
                        variants={wordVariants}
                    >
                        {word}
                        {index < words.length - 1 && '\u00A0'}
                    </motion.span>
                ))}
            </motion.div>
        );
    }

    // For sections below - animate when in view
    return (
        <motion.div
            className={`blur-text ${className}`}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
        >
            {words.map((word, index) => (
                <motion.span
                    key={index}
                    className="blur-text-word"
                    variants={wordVariants}
                >
                    {word}
                    {index < words.length - 1 && '\u00A0'}
                </motion.span>
            ))}
        </motion.div>
    );
};

export default BlurText;

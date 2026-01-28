import { motion } from 'framer-motion';
import './BlurText.css';

/**
 * Blur Reveal Text Animation
 * Words emerge from digital mist with staggered timing
 * 
 * @param {string} text - The text to animate
 * @param {string} className - Additional CSS class
 * @param {number} delay - Initial delay before animation starts
 * @param {boolean} colorPulse - Enable purple-to-white color shift
 * @param {string} as - HTML element type (h1, h2, p, span)
 */
const BlurText = ({
    text,
    className = '',
    delay = 0,
    colorPulse = false,
    as: Component = 'div'
}) => {
    const words = text.split(' ');

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.08,
                delayChildren: delay
            }
        }
    };

    const wordVariants = {
        hidden: {
            filter: 'blur(10px)',
            opacity: 0,
            y: 8,
            ...(colorPulse && { color: '#a855f7' })
        },
        visible: {
            filter: 'blur(0px)',
            opacity: 1,
            y: 0,
            ...(colorPulse && { color: '#ffffff' }),
            transition: {
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1]
            }
        }
    };

    return (
        <motion.div
            className={`blur-text ${className}`}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
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

/**
 * Character-by-character blur reveal for dramatic effect
 */
export const BlurTextCharacter = ({
    text,
    className = '',
    delay = 0
}) => {
    const characters = text.split('');

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.03,
                delayChildren: delay
            }
        }
    };

    const charVariants = {
        hidden: {
            filter: 'blur(8px)',
            opacity: 0,
            y: 5
        },
        visible: {
            filter: 'blur(0px)',
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4,
                ease: 'easeOut'
            }
        }
    };

    return (
        <motion.span
            className={`blur-text-chars ${className}`}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            {characters.map((char, index) => (
                <motion.span
                    key={index}
                    className="blur-text-char"
                    variants={charVariants}
                >
                    {char === ' ' ? '\u00A0' : char}
                </motion.span>
            ))}
        </motion.span>
    );
};

export default BlurText;

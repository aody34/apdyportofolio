import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMagneticHover } from '../../hooks/useMagneticHover';
import './CinematicHero.css';

// Typewriter Animation Component
const TypewriterText = ({ text, delay = 0 }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const startTimer = setTimeout(() => {
            setStarted(true);
        }, delay * 1000);

        return () => clearTimeout(startTimer);
    }, [delay]);

    useEffect(() => {
        if (!started) return;

        if (currentIndex < text.length) {
            const timer = setTimeout(() => {
                setDisplayedText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, 100); // Speed of typing

            return () => clearTimeout(timer);
        }
    }, [currentIndex, text, started]);

    return (
        <span className="typewriter-text">
            {displayedText}
            <motion.span
                className="typewriter-cursor"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
            >
                |
            </motion.span>
        </span>
    );
};

// Animated Text Line
const AnimatedLine = ({ children, delay = 0, className = '' }) => {
    return (
        <motion.div
            className={`animated-line ${className}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.8,
                delay: delay,
                ease: [0.16, 1, 0.3, 1]
            }}
        >
            {children}
        </motion.div>
    );
};

const CinematicHero = ({ mousePosition = { x: 0, y: 0 } }) => {
    const heroRef = useRef();
    const magnetic = useMagneticHover(0.15);

    return (
        <section ref={heroRef} className="hero" id="hero">
            {/* Particle Background - Subtle moving dots */}
            <div className="hero-particles" aria-hidden="true">
                {[...Array(50)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="particle"
                        initial={{
                            x: Math.random() * 100 + '%',
                            y: Math.random() * 100 + '%',
                            opacity: Math.random() * 0.5 + 0.2
                        }}
                        animate={{
                            y: [null, '-100%'],
                            opacity: [null, 0]
                        }}
                        transition={{
                            duration: Math.random() * 20 + 10,
                            repeat: Infinity,
                            ease: 'linear',
                            delay: Math.random() * 5
                        }}
                    />
                ))}
            </div>

            {/* Gradient Overlay */}
            <div className="hero-gradient-overlay" />

            {/* Content */}
            <div className="hero-content">
                <div className="hero-layout">
                    {/* Left Side - Text Content */}
                    <div className="hero-text-side">
                        <AnimatedLine delay={0.2} className="hero-intro">
                            THIS IS NOT A PORTFOLIO...
                        </AnimatedLine>

                        <div className="hero-title-block">
                            <AnimatedLine delay={0.5}>
                                <span className="hero-title-small">It's an</span>
                            </AnimatedLine>

                            <motion.h1
                                className="hero-title-main"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <TypewriterText text="Experience" delay={1} />
                            </motion.h1>
                        </div>

                        <motion.div
                            className="hero-divider"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 1, delay: 2.2, ease: [0.16, 1, 0.3, 1] }}
                        />

                        <AnimatedLine delay={2.4} className="hero-subtitle">
                            Crafted by <span className="hero-name">Youngdev</span>
                        </AnimatedLine>

                        <AnimatedLine delay={2.6} className="hero-role">
                            Frontend Developer & Creative Technologist
                        </AnimatedLine>

                        <AnimatedLine delay={2.8} className="hero-role hero-role-crypto">
                            Crypto Developer & Trader
                        </AnimatedLine>

                        {/* CTA Button */}
                        <motion.div
                            className="hero-cta"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 3.2, duration: 0.6 }}
                        >
                            <a href="#projects" className="btn-play">
                                <span className="btn-play-icon">▶</span>
                                <span className="btn-play-text">EXPLORE MY WORK</span>
                                <span className="btn-play-bg"></span>
                            </a>
                        </motion.div>

                        {/* Status Indicator */}
                        <motion.div
                            className="hero-status"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 3.5, duration: 1 }}
                        >
                            <span className="status-dot"></span>
                            <span className="status-text">Building in Public: <span className="status-highlight">MemeRadar</span></span>
                        </motion.div>
                    </div>

                    {/* Right Side - Rectangle with Profile Image */}
                    <motion.div
                        className="hero-visual-side"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        {...magnetic}
                    >
                        <div className="hero-image-container">
                            <div className="hero-image-border" />
                            <img
                                src="/profile.jpg"
                                alt="Youngdev - Crypto Developer"
                                className="hero-profile-image"
                            />
                            <div className="hero-image-glow" />
                        </div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    className="scroll-indicator"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3.5 }}
                >
                    <span>SCROLL TO EXPLORE</span>
                    <motion.div
                        className="scroll-arrow"
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        ↓
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default CinematicHero;

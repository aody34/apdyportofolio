import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { aiResponses, getTimeGreeting, getRandomResponse } from '../../data/aiResponses';
import './AIOrb.css';

const AIOrb = ({ currentSection, isScrolling, scrollDirection }) => {
    const [message, setMessage] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [expression, setExpression] = useState('neutral'); // neutral, happy, curious, thinking
    const messageTimeout = useRef(null);
    const typingTimeout = useRef(null);

    // Section names for responses
    const sectionNames = ['landing', 'about', 'skills', 'projects', 'contact'];

    // Get current section name
    const getCurrentSectionName = () => sectionNames[currentSection] || 'landing';

    // Animate message with typing effect
    const showMessage = (text, duration = 4000) => {
        if (messageTimeout.current) clearTimeout(messageTimeout.current);
        if (typingTimeout.current) clearTimeout(typingTimeout.current);

        setIsTyping(true);
        setMessage('');

        // Simulate typing delay
        typingTimeout.current = setTimeout(() => {
            setIsTyping(false);
            setMessage(text);

            // Auto-hide after duration
            messageTimeout.current = setTimeout(() => {
                setMessage('');
            }, duration);
        }, 500);
    };

    // Handle section changes
    useEffect(() => {
        const sectionName = getCurrentSectionName();
        const sectionResponses = aiResponses.sections[sectionName];

        if (sectionResponses?.enter) {
            setExpression('curious');
            showMessage(sectionResponses.enter, 5000);

            setTimeout(() => setExpression('neutral'), 2000);
        }
    }, [currentSection]);

    // Initial greeting based on time
    useEffect(() => {
        const timer = setTimeout(() => {
            showMessage(getTimeGreeting(), 4000);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    // React to scroll speed
    useEffect(() => {
        if (isScrolling && scrollDirection === 'down') {
            setExpression('happy');
        } else if (!isScrolling) {
            setExpression('neutral');
        }
    }, [isScrolling, scrollDirection]);

    // Toggle expanded state
    const handleOrbClick = () => {
        setIsExpanded(!isExpanded);
        if (!isExpanded) {
            const sectionName = getCurrentSectionName();
            const sectionResponses = aiResponses.sections[sectionName];
            showMessage(sectionResponses?.idle || "How can I help you explore?", 6000);
        }
    };

    return (
        <motion.div
            className={`ai-orb-container ${isExpanded ? 'expanded' : ''}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            {/* Message Bubble */}
            <AnimatePresence>
                {(message || isTyping) && (
                    <motion.div
                        className="ai-message-bubble"
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                    >
                        {isTyping ? (
                            <div className="typing-indicator">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        ) : (
                            <p>{message}</p>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* The Orb */}
            <motion.button
                className={`ai-orb ${expression}`}
                onClick={handleOrbClick}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="AI Guide - Click for help"
            >
                <div className="orb-inner">
                    <div className="orb-glow" />
                    <div className="orb-core" />
                    <div className="orb-ring" />

                    {/* Orb Face */}
                    <div className="orb-face">
                        <div className="orb-eyes">
                            <span className="eye left" />
                            <span className="eye right" />
                        </div>
                    </div>
                </div>

                {/* Pulse rings */}
                <div className="orb-pulse-ring ring-1" />
                <div className="orb-pulse-ring ring-2" />
                <div className="orb-pulse-ring ring-3" />
            </motion.button>

            {/* Label */}
            <span className="ai-orb-label">AI Guide</span>
        </motion.div>
    );
};

export default AIOrb;

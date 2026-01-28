import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './Contact.css';

// Magnetic button component
const MagneticButton = ({ children, href, className = '' }) => {
    const buttonRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!buttonRef.current) return;
        const rect = buttonRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        buttonRef.current.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    };

    const handleMouseLeave = () => {
        if (buttonRef.current) {
            buttonRef.current.style.transform = 'translate(0, 0)';
        }
    };

    return (
        <motion.a
            ref={buttonRef}
            href={href}
            className={`magnetic-btn ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
            {children}
        </motion.a>
    );
};

// Animated text character by character
const AnimatedText = ({ text, className = '', delay = 0 }) => {
    const characters = text.split('');

    return (
        <motion.span className={`animated-text ${className}`}>
            {characters.map((char, index) => (
                <motion.span
                    key={index}
                    className="animated-char"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                        duration: 0.5,
                        delay: delay + index * 0.03,
                        ease: [0.16, 1, 0.3, 1]
                    }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </motion.span>
            ))}
        </motion.span>
    );
};

const Contact = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const socialLinks = [
        {
            name: 'Email',
            href: 'mailto:youngdev34@gmail.com',
            icon: '✉️',
            label: 'youngdev34@gmail.com'
        },
        {
            name: 'GitHub',
            href: 'https://github.com/aody34',
            icon: '🐙',
            label: '@aody34'
        },
        {
            name: 'Twitter',
            href: 'https://x.com/Youngdev34',
            icon: '🐦',
            label: '@Youngdev34'
        }
    ];

    return (
        <section className="contact section" id="contact" ref={ref}>
            <div className="container">
                {/* Big CTA Header */}
                <motion.div
                    className="contact-cta"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <span className="contact-label">Ready to create something amazing?</span>

                    <h2 className="contact-title">
                        <AnimatedText text="Let's Work" delay={0.2} />
                        <br />
                        <AnimatedText text="Together" delay={0.5} className="highlight" />
                    </h2>

                    <motion.div
                        className="contact-line"
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: 1 } : {}}
                        transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    />
                </motion.div>

                {/* Main CTA Button */}
                <motion.div
                    className="contact-main-cta"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 1 }}
                >
                    <MagneticButton
                        href="mailto:apdykadir41@gmail.com"
                        className="cta-button-large"
                    >
                        <span className="cta-text">Say Hello</span>
                        <span className="cta-arrow">→</span>
                    </MagneticButton>
                </motion.div>

                {/* Social Links */}
                <motion.div
                    className="contact-links"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 1.2 }}
                >
                    {socialLinks.map((link, index) => (
                        <motion.a
                            key={link.name}
                            href={link.href}
                            className="social-link"
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 1.3 + index * 0.1 }}
                            whileHover={{ y: -5 }}
                        >
                            <span className="social-icon">{link.icon}</span>
                            <span className="social-label">{link.label}</span>
                        </motion.a>
                    ))}
                </motion.div>

                {/* Footer message */}
                <motion.p
                    className="contact-footer"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 1.6 }}
                >
                    Based in Somalia • Available Worldwide
                </motion.p>
            </div>

            {/* Background glow */}
            <div className="contact-glow" />
        </section>
    );
};

export default Contact;

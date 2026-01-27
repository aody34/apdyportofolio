import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './Contact.css';

const Contact = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.3 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        }
    };

    return (
        <section className="contact section" id="contact" ref={ref}>
            <div className="container">
                <motion.div
                    className="contact-content"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {/* Header */}
                    <motion.div className="contact-header" variants={itemVariants}>
                        <span className="contact-label">Connect</span>
                        <h2 className="contact-title">
                            Let's Create <span className="gradient-text">Together</span>
                        </h2>
                        <p className="contact-subtitle">
                            Ready to build something meaningful? The door is always open.
                        </p>
                    </motion.div>

                    {/* Contact Links */}
                    <motion.div className="contact-links" variants={itemVariants}>
                        <a
                            href="mailto:apdykadir41@gmail.com"
                            className="contact-link glass-card"
                        >
                            <span className="link-icon">📧</span>
                            <span className="link-text">Email Me</span>
                            <span className="link-arrow">→</span>
                        </a>

                        <a
                            href="https://github.com/aody34"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact-link glass-card"
                        >
                            <span className="link-icon">💻</span>
                            <span className="link-text">GitHub</span>
                            <span className="link-arrow">→</span>
                        </a>

                        <a
                            href="https://x.com/Youngdev34"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact-link glass-card"
                        >
                            <span className="link-icon">🐦</span>
                            <span className="link-text">Twitter</span>
                            <span className="link-arrow">→</span>
                        </a>
                    </motion.div>

                    {/* Closing Message */}
                    <motion.div className="contact-closing" variants={itemVariants}>
                        <p className="closing-message">
                            "The best is yet to come, <span className="highlight">Insha'Allah.</span>"
                        </p>
                    </motion.div>
                </motion.div>
            </div>

            {/* Background Element */}
            <div className="contact-bg-glow" />
        </section>
    );
};

export default Contact;

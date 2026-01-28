import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './About.css';

const BentoCard = ({ children, className = '', delay = 0, size = 'default' }) => {
    return (
        <motion.div
            className={`bento-card glass-card ${size} ${className}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                delay,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1]
            }}
            whileHover={{
                scale: 1.02,
                transition: { duration: 0.3 }
            }}
        >
            {children}
        </motion.div>
    );
};

const About = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section className="about section" id="about" ref={ref}>
            <div className="container">
                {/* Section Header */}
                <motion.div
                    className="about-header section-header"
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <span className="about-label">About</span>
                    <h2 className="section-title">The Journey</h2>
                </motion.div>

                {/* Bento Grid Layout */}
                <div className="bento-grid">
                    {/* Large Card - Philosophy */}
                    <BentoCard size="large" delay={0.1}>
                        <div className="bento-content">
                            <div className="bento-icon">🎯</div>
                            <h3 className="bento-title">Who I Am</h3>
                            <p className="bento-text">
                                I am a 2022 Bachelor of Information Technology graduate,
                                combining my technical background with a deep passion
                                for content creation and visual storytelling.
                            </p>
                            <p className="bento-text secondary">
                                My experience as a Video Shooter taught me the power of
                                angles, perspective, and motion—skills I now bring into
                                frontend development.
                            </p>
                        </div>
                    </BentoCard>

                    {/* Small Card - Location */}
                    <BentoCard size="small" delay={0.2}>
                        <div className="bento-content location">
                            <span className="bento-emoji">📍</span>
                            <span className="bento-label">Based in</span>
                            <span className="bento-value">Somalia</span>
                            <span className="bento-sublabel">Available Worldwide</span>
                        </div>
                    </BentoCard>

                    {/* Small Card - Status */}
                    <BentoCard size="small" delay={0.3}>
                        <div className="bento-content status">
                            <span className="status-dot"></span>
                            <span className="bento-label">Status</span>
                            <span className="bento-value">Open to Work</span>
                            <span className="bento-sublabel">Freelance & Full-time</span>
                        </div>
                    </BentoCard>

                    {/* Medium Card - Currently Building */}
                    <BentoCard size="medium" delay={0.4}>
                        <div className="bento-content now">
                            <div className="bento-icon">🔨</div>
                            <h3 className="bento-title">Currently Building</h3>
                            <div className="now-projects">
                                <div className="now-project">
                                    <span className="now-emoji">📈</span>
                                    <span>MemeRadar - Crypto Analysis</span>
                                </div>
                                <div className="now-project">
                                    <span className="now-emoji">🎬</span>
                                    <span>Cinematic Web Experiences</span>
                                </div>
                                <div className="now-project">
                                    <span className="now-emoji">🤖</span>
                                    <span>AI-Powered Tools</span>
                                </div>
                            </div>
                        </div>
                    </BentoCard>

                    {/* Medium Card - Experience */}
                    <BentoCard size="medium" delay={0.5}>
                        <div className="bento-content experience">
                            <div className="exp-stats">
                                <div className="exp-stat">
                                    <span className="exp-number">3+</span>
                                    <span className="exp-label">Years Creating</span>
                                </div>
                                <div className="exp-stat">
                                    <span className="exp-number">10+</span>
                                    <span className="exp-label">Projects</span>
                                </div>
                                <div className="exp-stat">
                                    <span className="exp-number">∞</span>
                                    <span className="exp-label">Learning</span>
                                </div>
                            </div>
                        </div>
                    </BentoCard>

                    {/* Small Card - Quote */}
                    <BentoCard size="quote" delay={0.6}>
                        <div className="bento-content quote">
                            <span className="quote-mark">"</span>
                            <p className="quote-text">
                                Still navigating my path in life, but we will be better,
                                <span className="quote-highlight"> Insha'Allah.</span>
                            </p>
                        </div>
                    </BentoCard>
                </div>
            </div>

            {/* Background */}
            <div className="about-bg-glow" />
        </section>
    );
};

export default About;

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import './About.css';

const About = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
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
        <section className="about section" id="about" ref={ref}>
            <div className="container">
                <motion.div
                    className="about-content"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {/* Section Header */}
                    <motion.div className="about-header" variants={itemVariants}>
                        <span className="about-label">About</span>
                        <h2 className="about-title">
                            The <span className="gradient-text">Journey</span>
                        </h2>
                    </motion.div>

                    {/* Main Story */}
                    <motion.div className="about-story" variants={itemVariants}>
                        <p className="about-lead">
                            I am a 2022 Bachelor of Information Technology graduate, currently
                            navigating my path in life while combining my technical background
                            with a deep passion for content creation.
                        </p>
                    </motion.div>

                    {/* Experience Cards */}
                    <motion.div className="about-experience" variants={itemVariants}>
                        <div className="experience-card glass-card">
                            <div className="experience-icon">🎬</div>
                            <h3>Content Creator</h3>
                            <p>
                                My experience as a Video Shooter taught me the power of angles,
                                perspective, and visual storytelling—skills I now bring into
                                frontend development.
                            </p>
                        </div>

                        <div className="experience-card glass-card">
                            <div className="experience-icon">💻</div>
                            <h3>Frontend Developer</h3>
                            <p>
                                Blending code, animation, and visual storytelling to build
                                immersive web experiences that feel alive and meaningful.
                            </p>
                        </div>

                        <div className="experience-card glass-card">
                            <div className="experience-icon">📈</div>
                            <h3>Crypto Trader</h3>
                            <p>
                                Understanding markets, patterns, and timing—skills that translate
                                to building responsive, data-driven interfaces.
                            </p>
                        </div>
                    </motion.div>

                    {/* Personal Note */}
                    <motion.div className="about-personal" variants={itemVariants}>
                        <blockquote className="about-quote">
                            <p>
                                "Still missing what I want in life, but we will be better,
                                <span className="quote-highlight"> Insha'Allah.</span>"
                            </p>
                        </blockquote>
                    </motion.div>

                    {/* Stats */}
                    <motion.div className="about-stats" variants={itemVariants}>
                        <div className="stat-item">
                            <span className="stat-number">2022</span>
                            <span className="stat-label">IT Graduate</span>
                        </div>
                        <div className="stat-divider" />
                        <div className="stat-item">
                            <span className="stat-number">3+</span>
                            <span className="stat-label">Years Creating</span>
                        </div>
                        <div className="stat-divider" />
                        <div className="stat-item">
                            <span className="stat-number">∞</span>
                            <span className="stat-label">Learning</span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Background elements */}
            <div className="about-bg-gradient" />
        </section>
    );
};

export default About;

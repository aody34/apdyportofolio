import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './TechStack.css';

const techStack = [
    { name: 'React', icon: '⚛️', color: '#61DAFB', description: 'UI Framework' },
    { name: 'GSAP', icon: '🎬', color: '#88CE02', description: 'Animation Library' },
    { name: 'Three.js', icon: '🌐', color: '#000000', description: '3D Graphics' },
    { name: 'Framer Motion', icon: '✨', color: '#FF0055', description: 'React Animations' },
    { name: 'Vite', icon: '⚡', color: '#646CFF', description: 'Build Tool' },
    { name: 'Lighthouse', icon: '🏆', color: '#F44B21', description: 'Performance' },
];

const TechCard = ({ tech, index }) => {
    return (
        <motion.div
            className="tech-card glass-card"
            style={{ '--tech-color': tech.color }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                delay: index * 0.1,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1]
            }}
            whileHover={{
                scale: 1.05,
                borderColor: tech.color
            }}
        >
            <div className="tech-icon">{tech.icon}</div>
            <h3 className="tech-name">{tech.name}</h3>
            <p className="tech-description">{tech.description}</p>
            <div className="tech-glow" />
        </motion.div>
    );
};

const TechStack = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section className="tech-stack section" id="tech" ref={ref}>
            <div className="container">
                <motion.div
                    className="tech-header section-header"
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <span className="tech-label">Tech</span>
                    <h2 className="section-title">Built With</h2>
                    <p className="section-subtitle">
                        Judges love a clean tech stack. Here's what powers this experience.
                    </p>
                </motion.div>

                <div className="tech-grid">
                    {techStack.map((tech, index) => (
                        <TechCard key={tech.name} tech={tech} index={index} />
                    ))}
                </div>

                {/* Performance Badge */}
                <motion.div
                    className="performance-badge glass-card"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                >
                    <div className="badge-content">
                        <span className="badge-icon">🎯</span>
                        <div className="badge-text">
                            <span className="badge-title">Lighthouse Optimized</span>
                            <span className="badge-desc">60 FPS • Lazy Loading • Mobile First</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default TechStack;

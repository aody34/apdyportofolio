import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './TechMarquee.css';

const techLogos = [
    { name: 'React', icon: '⚛️', color: '#61DAFB' },
    { name: 'JavaScript', icon: '🟨', color: '#F7DF1E' },
    { name: 'GSAP', icon: '🎬', color: '#88CE02' },
    { name: 'Three.js', icon: '🌐', color: '#000000' },
    { name: 'CSS3', icon: '🎨', color: '#1572B6' },
    { name: 'HTML5', icon: '📄', color: '#E34F26' },
    { name: 'Vite', icon: '⚡', color: '#646CFF' },
    { name: 'Git', icon: '📦', color: '#F05032' },
    { name: 'Framer', icon: '✨', color: '#FF0055' },
    { name: 'Figma', icon: '🎯', color: '#F24E1E' },
];

const MarqueeItem = ({ name, icon, color }) => (
    <div className="marquee-item" style={{ '--item-color': color }}>
        <span className="marquee-icon">{icon}</span>
        <span className="marquee-name">{name}</span>
    </div>
);

const TechMarquee = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    // Double the items for seamless loop
    const items = [...techLogos, ...techLogos];

    return (
        <section className="tech-marquee" ref={ref}>
            <motion.div
                className="marquee-container"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8 }}
            >
                {/* Gradient masks for fade effect */}
                <div className="marquee-mask marquee-mask-left" />
                <div className="marquee-mask marquee-mask-right" />

                {/* Marquee track */}
                <div className="marquee-track">
                    <div className="marquee-content">
                        {items.map((tech, index) => (
                            <MarqueeItem key={`${tech.name}-${index}`} {...tech} />
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default TechMarquee;

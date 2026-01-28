import { useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { projects } from '../../data/projects';
import './Projects.css';

// 3D Tilt Card Component with Spotlight
const ProjectCard = ({ project, index, size = 'default' }) => {
    const cardRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
        damping: 20,
        stiffness: 300
    });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
        damping: 20,
        stiffness: 300
    });

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            className={`project-card glass-card ${size} ${project.image ? 'has-image' : ''}`}
            style={{
                rotateX,
                rotateY,
                '--project-color': project.color,
                backgroundImage: project.image ? `url(${project.image})` : 'none'
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileHover={{
                scale: 1.02,
                y: -8,
                transition: { duration: 0.2 }
            }}
        >
            {/* Background overlay for image cards */}
            {project.image && <div className="project-image-overlay" />}

            {/* Spotlight effect */}
            <div
                className="project-spotlight"
                style={{ opacity: isHovered ? 1 : 0 }}
            />

            {/* Live badge */}
            {project.isLive && (
                <div className="project-badge live">
                    <span className="badge-dot"></span>
                    Live
                </div>
            )}

            {/* Project content */}
            <div className="project-content">
                <span className="project-year">{project.year}</span>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-problem">{project.problem}</p>

                <div className="project-tech">
                    {project.tech.slice(0, 4).map((tech, i) => (
                        <span key={i} className="tech-tag">{tech}</span>
                    ))}
                </div>

                {/* Metrics */}
                <div className="project-metrics">
                    {Object.entries(project.metrics).slice(0, 2).map(([key, value]) => (
                        <div key={key} className="metric">
                            <span className="metric-value">{value}</span>
                            <span className="metric-label">{key}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Hover glow */}
            <div
                className="project-glow"
                style={{ opacity: isHovered ? 1 : 0 }}
            />
        </motion.div>
    );
};

const Projects = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    // Assign sizes for bento layout
    const getSizeForIndex = (index) => {
        if (index === 0) return 'large';  // First project is 2x2
        if (index === 1) return 'medium'; // Second is medium
        return 'default';
    };

    return (
        <section className="projects section" id="projects" ref={ref}>
            <div className="container">
                {/* Section Header */}
                <motion.div
                    className="projects-header section-header"
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <span className="projects-label">Work</span>
                    <h2 className="section-title">Selected Projects</h2>
                    <p className="section-subtitle">
                        Building high-performance on-chain tools and automated systems
                    </p>
                </motion.div>

                {/* Bento Grid */}
                <div className="projects-bento">
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={index}
                            size={getSizeForIndex(index)}
                        />
                    ))}
                </div>
            </div>

            {/* Background */}
            <div className="projects-bg-glow" />
        </section>
    );
};

export default Projects;

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { projects } from '../../data/projects';
import './Projects.css';

const ProjectChapter = ({ project, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const isEven = index % 2 === 0;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: {
            opacity: 0,
            x: isEven ? -60 : 60
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        }
    };

    return (
        <article
            ref={ref}
            className={`project-chapter ${isEven ? 'left' : 'right'}`}
            style={{ '--project-color': project.color }}
        >
            <motion.div
                className="project-content"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                {/* Chapter Number */}
                <motion.div className="chapter-number" variants={itemVariants}>
                    <span>Chapter</span>
                    <span className="number">0{index + 1}</span>
                </motion.div>

                {/* Project Header */}
                <motion.div className="project-header" variants={itemVariants}>
                    <span className="project-year">{project.year}</span>
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-subtitle">{project.subtitle}</p>
                </motion.div>

                {/* Story Sections */}
                <div className="project-story">
                    <motion.div className="story-section" variants={itemVariants}>
                        <div className="story-icon">💭</div>
                        <div className="story-content">
                            <h4>The Problem</h4>
                            <p>{project.problem}</p>
                        </div>
                    </motion.div>

                    <motion.div className="story-section" variants={itemVariants}>
                        <div className="story-icon">💡</div>
                        <div className="story-content">
                            <h4>The Solution</h4>
                            <p>{project.solution}</p>
                        </div>
                    </motion.div>

                    <motion.div className="story-section tech-section" variants={itemVariants}>
                        <div className="story-icon">⚡</div>
                        <div className="story-content">
                            <h4>Tech Stack</h4>
                            <div className="tech-tags">
                                {project.tech.map((tech, i) => (
                                    <span key={i} className="tech-tag">{tech}</span>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    <motion.div className="story-section result-section" variants={itemVariants}>
                        <div className="story-icon">🎯</div>
                        <div className="story-content">
                            <h4>The Result</h4>
                            <p>{project.result}</p>

                            {/* Metrics */}
                            <div className="project-metrics">
                                {Object.entries(project.metrics).map(([key, value]) => (
                                    <div key={key} className="metric-item">
                                        <span className="metric-value">{value}</span>
                                        <span className="metric-label">{key}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Decorative Line */}
            <motion.div
                className="project-line"
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : {}}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Background Glow */}
            <div className="project-glow" />
        </article>
    );
};

const Projects = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <section className="projects section" id="projects" ref={ref}>
            <div className="container">
                {/* Section Header */}
                <motion.div
                    className="projects-header section-header"
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className="projects-label">Work</span>
                    <h2 className="section-title">Projects</h2>
                    <p className="section-subtitle">
                        Each project is a chapter in my story. Scroll to explore.
                    </p>
                </motion.div>

                {/* Project Timeline */}
                <div className="projects-timeline">
                    <div className="timeline-line" />

                    {projects.map((project, index) => (
                        <ProjectChapter
                            key={project.id}
                            project={project}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;

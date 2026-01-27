import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { skillCategories, allSkills } from '../../data/skills';
import './SkillGalaxy.css';

const SkillNode = ({ skill, index, isSelected, onClick, totalSkills }) => {
    // Calculate position in a galaxy-like pattern
    const angle = (index / totalSkills) * Math.PI * 2;
    const radius = 120 + Math.random() * 80;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    return (
        <motion.button
            className={`skill-node ${isSelected ? 'selected' : ''}`}
            style={{
                '--node-color': skill.categoryColor,
                '--x': `${x}px`,
                '--y': `${y}px`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
                opacity: 1,
                scale: 1,
                x: isSelected ? 0 : x,
                y: isSelected ? 0 : y,
            }}
            transition={{
                delay: index * 0.05,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1]
            }}
            whileHover={{ scale: 1.2 }}
            onClick={() => onClick(skill)}
        >
            <span className="node-label">{skill.name}</span>
            <div className="node-glow" />
        </motion.button>
    );
};

const SkillDetail = ({ skill, onClose }) => {
    if (!skill) return null;

    return (
        <motion.div
            className="skill-detail glass-card"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
            <button className="skill-detail-close" onClick={onClose}>×</button>

            <div className="skill-detail-header">
                <span
                    className="skill-category-badge"
                    style={{ '--badge-color': skill.categoryColor }}
                >
                    {skill.categoryIcon} {skill.categoryName}
                </span>
                <h3 className="skill-detail-name">{skill.name}</h3>
            </div>

            <div className="skill-level-bar">
                <div className="skill-level-track">
                    <motion.div
                        className="skill-level-fill"
                        style={{ '--fill-color': skill.categoryColor }}
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    />
                </div>
                <span className="skill-level-text">{skill.level}%</span>
            </div>

            <p className="skill-description">{skill.description}</p>

            <div className="skill-proof">
                <span className="proof-label">Proof:</span>
                <p>{skill.proof}</p>
            </div>
        </motion.div>
    );
};

const SkillGalaxy = () => {
    const [selectedSkill, setSelectedSkill] = useState(null);
    const [activeCategory, setActiveCategory] = useState(null);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const handleSkillClick = (skill) => {
        setSelectedSkill(selectedSkill?.name === skill.name ? null : skill);
    };

    const filteredSkills = activeCategory
        ? allSkills.filter(s => s.category === activeCategory)
        : allSkills;

    return (
        <section className="skills section" id="skills" ref={ref}>
            <div className="container">
                <motion.div
                    className="skills-header section-header"
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className="skills-label">Skills</span>
                    <h2 className="section-title">Skill Galaxy</h2>
                    <p className="section-subtitle">
                        Click on any node to explore. Each skill tells a story.
                    </p>
                </motion.div>

                {/* Category Filters */}
                <motion.div
                    className="skills-categories"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    <button
                        className={`category-btn ${!activeCategory ? 'active' : ''}`}
                        onClick={() => setActiveCategory(null)}
                    >
                        All
                    </button>
                    {Object.entries(skillCategories).map(([key, category]) => (
                        <button
                            key={key}
                            className={`category-btn ${activeCategory === key ? 'active' : ''}`}
                            style={{ '--cat-color': category.color }}
                            onClick={() => setActiveCategory(key)}
                        >
                            {category.icon} {category.name}
                        </button>
                    ))}
                </motion.div>

                {/* Galaxy Visualization */}
                <div className="galaxy-container">
                    <div className="galaxy-center">
                        <AnimatePresence mode="wait">
                            {selectedSkill ? (
                                <SkillDetail
                                    key="detail"
                                    skill={selectedSkill}
                                    onClose={() => setSelectedSkill(null)}
                                />
                            ) : (
                                <motion.div
                                    key="prompt"
                                    className="galaxy-prompt"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <div className="galaxy-core" />
                                    <p>Click a skill</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Skill Nodes */}
                    <div className="galaxy-nodes">
                        {isInView && filteredSkills.map((skill, index) => (
                            <SkillNode
                                key={skill.name}
                                skill={skill}
                                index={index}
                                totalSkills={filteredSkills.length}
                                isSelected={selectedSkill?.name === skill.name}
                                onClick={handleSkillClick}
                            />
                        ))}
                    </div>

                    {/* Connection Lines (decorative) */}
                    <svg className="galaxy-lines" viewBox="-300 -300 600 600">
                        {isInView && filteredSkills.map((skill, i) => {
                            const angle = (i / filteredSkills.length) * Math.PI * 2;
                            const radius = 120 + Math.random() * 80;
                            const x = Math.cos(angle) * radius;
                            const y = Math.sin(angle) * radius;
                            return (
                                <motion.line
                                    key={skill.name}
                                    x1="0" y1="0"
                                    x2={x} y2={y}
                                    stroke={skill.categoryColor}
                                    strokeWidth="1"
                                    strokeOpacity="0.2"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ delay: i * 0.05, duration: 0.8 }}
                                />
                            );
                        })}
                    </svg>
                </div>
            </div>

            {/* Background effects */}
            <div className="skills-bg-glow" />
        </section>
    );
};

export default SkillGalaxy;

// Skills Data - Organized by category for the Skill Galaxy
export const skillCategories = {
    frontend: {
        name: 'Core Frontend',
        color: '#00f0ff',
        icon: '💻',
        skills: [
            { name: 'HTML5', level: 95, description: 'Semantic markup & accessibility', proof: 'All projects built with semantic HTML' },
            { name: 'CSS3', level: 90, description: 'Modern layouts, animations, custom properties', proof: 'Complex animations in portfolio' },
            { name: 'JavaScript', level: 88, description: 'ES6+, async/await, DOM manipulation', proof: 'Interactive web experiences' },
            { name: 'React.js', level: 85, description: 'Hooks, context, component architecture', proof: 'This portfolio & multiple projects' }
        ]
    },
    animation: {
        name: 'Animation & Visuals',
        color: '#a855f7',
        icon: '✨',
        skills: [
            { name: 'GSAP', level: 90, description: 'Timeline animations, ScrollTrigger', proof: 'Scroll-based storytelling in portfolio' },
            { name: 'ScrollTrigger', level: 88, description: 'Scroll-driven animations', proof: 'Chapter transitions in projects section' },
            { name: 'Framer Motion', level: 80, description: 'React-native animations', proof: 'UI micro-interactions' },
            { name: 'Three.js', level: 65, description: 'Basic 3D scenes & effects', proof: 'Hero section 3D orb' }
        ]
    },
    creative: {
        name: 'Creative & Media',
        color: '#ec4899',
        icon: '🎬',
        skills: [
            { name: 'Video Shooting', level: 85, description: 'Composition, angles, lighting', proof: 'Content creation portfolio' },
            { name: 'Visual Storytelling', level: 90, description: 'Narrative through visuals', proof: 'Every project tells a story' },
            { name: 'Content Creation', level: 88, description: 'Engaging digital content', proof: 'Brand landing pages' },
            { name: 'Motion Composition', level: 82, description: 'Timing, pacing, flow', proof: 'Animation sequences' }
        ]
    },
    tools: {
        name: 'Tools & Workflow',
        color: '#fbbf24',
        icon: '🛠️',
        skills: [
            { name: 'Git & GitHub', level: 85, description: 'Version control, collaboration', proof: 'All projects versioned' },
            { name: 'Vite', level: 88, description: 'Fast build tool configuration', proof: 'This portfolio built with Vite' },
            { name: 'Figma', level: 60, description: 'Basic design & prototyping', proof: 'UI mockups' },
            { name: 'Lighthouse', level: 80, description: 'Performance optimization', proof: '90+ scores across metrics' }
        ]
    }
};

// Flat array for galaxy visualization
export const allSkills = Object.entries(skillCategories).flatMap(([categoryKey, category]) =>
    category.skills.map(skill => ({
        ...skill,
        category: categoryKey,
        categoryName: category.name,
        categoryColor: category.color,
        categoryIcon: category.icon
    }))
);

export default skillCategories;

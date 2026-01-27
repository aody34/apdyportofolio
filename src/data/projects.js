// Projects Data - Scroll-based storytelling
export const projects = [
    {
        id: 1,
        title: 'Cinematic Portfolio Website',
        subtitle: 'This very experience you\'re exploring',
        problem: 'Most developer portfolios feel static and fail to communicate personality or creativity. They list skills but don\'t show soul.',
        solution: 'Designed a cinematic, scroll-based animated portfolio using storytelling, motion, and interactive sections. Every scroll reveals a new chapter of the journey.',
        tech: ['React', 'GSAP', 'ScrollTrigger', 'Three.js', 'CSS Animations'],
        result: 'Created a memorable, immersive experience that visually represents both technical and creative skills.',
        metrics: {
            performance: '95+',
            animations: '60 FPS',
            sections: '5 chapters'
        },
        color: '#00f0ff',
        image: null, // Will be generated or use placeholder
        year: '2024',
        featured: true
    },
    {
        id: 2,
        title: 'Animated Landing Page',
        subtitle: 'For Content Creators',
        problem: 'Content creators struggle to stand out visually online. Generic templates kill authenticity.',
        solution: 'Built a visually engaging landing page focused on motion, transitions, and storytelling. Every element moves with purpose.',
        tech: ['HTML', 'CSS', 'JavaScript', 'GSAP'],
        result: 'Improved user engagement and brand perception through motion-driven UX. Visitors actually remember the experience.',
        metrics: {
            engagement: '+40%',
            bounce: '-25%',
            shares: 'Viral'
        },
        color: '#a855f7',
        image: null,
        year: '2024',
        featured: true
    },
    {
        id: 3,
        title: 'Video-Centered Web Experience',
        subtitle: 'Narrative Meets Interface',
        problem: 'Video content often feels disconnected from web interfaces. It\'s just... embedded. Not integrated.',
        solution: 'Integrated video as a core storytelling element within a responsive frontend layout. The video IS the interface.',
        tech: ['React', 'CSS', 'Video APIs', 'Custom Controls'],
        result: 'Created a seamless blend of video and web UI that enhances narrative flow. Users stay longer, engage deeper.',
        metrics: {
            watchTime: '+60%',
            completion: '85%',
            feedback: '4.8/5'
        },
        color: '#ec4899',
        image: null,
        year: '2024',
        featured: true
    }
];

// Project chapter backgrounds for scroll transitions
export const projectBackgrounds = {
    1: 'linear-gradient(135deg, #050508 0%, #0a1628 100%)',
    2: 'linear-gradient(135deg, #050508 0%, #1a0a28 100%)',
    3: 'linear-gradient(135deg, #050508 0%, #280a1a 100%)'
};

export default projects;

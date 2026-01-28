// Projects Data - Scroll-based storytelling
export const projects = [
    {
        id: 1,
        title: 'MemeRadar',
        subtitle: 'On-Chain Analytics Platform',
        problem: 'Crypto traders lack real-time insight into meme coin trends and wallet activity. Existing tools are slow and cluttered.',
        solution: 'Built a high-performance analytics dashboard with real-time wallet deep dives, token analysis, and AI-powered predictions.',
        tech: ['React', 'Moralis API', 'Vercel', 'TailwindCSS', 'AI Integration'],
        result: 'Deployed live tool used by traders to analyze meme coins and track whale wallets in real-time.',
        metrics: {
            wallets: '1000+',
            speed: '<2s',
            accuracy: '94%'
        },
        color: '#00f0ff',
        image: null,
        year: '2024',
        featured: true,
        isLive: true
    },
    {
        id: 2,
        title: 'Cinematic Portfolio',
        subtitle: 'This experience you\'re exploring',
        problem: 'Most developer portfolios feel static and fail to communicate personality or creativity.',
        solution: 'Designed a cinematic, scroll-based animated portfolio using storytelling, motion, and interactive sections.',
        tech: ['React', 'GSAP', 'Three.js', 'Framer Motion'],
        result: 'Created a memorable, immersive experience that visually represents both technical and creative skills.',
        metrics: {
            performance: '95+',
            animations: '60 FPS',
            sections: '5'
        },
        color: '#a855f7',
        image: null,
        year: '2024',
        featured: true,
        isLive: true
    },
    {
        id: 3,
        title: 'Animated Landing Page',
        subtitle: 'For Content Creators',
        problem: 'Content creators struggle to stand out. Generic templates kill authenticity.',
        solution: 'Built a visually engaging landing page focused on motion, transitions, and storytelling.',
        tech: ['HTML', 'CSS', 'JavaScript', 'GSAP'],
        result: 'Improved user engagement and brand perception through motion-driven UX.',
        metrics: {
            engagement: '+40%',
            bounce: '-25%',
            shares: 'Viral'
        },
        color: '#ec4899',
        image: null,
        year: '2024',
        featured: true,
        isLive: false
    }
];

// Project chapter backgrounds for scroll transitions
export const projectBackgrounds = {
    1: 'linear-gradient(135deg, #050508 0%, #0a1628 100%)',
    2: 'linear-gradient(135deg, #050508 0%, #1a0a28 100%)',
    3: 'linear-gradient(135deg, #050508 0%, #280a1a 100%)'
};

export default projects;

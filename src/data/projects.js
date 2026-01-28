// Projects Data - With Background Images
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
        image: '/memeradar-bg.png',
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
            animations: '60 FPS'
        },
        color: '#a855f7',
        image: '/portfolio-bg.png',
        year: '2024',
        featured: true,
        isLive: true
    },
    {
        id: 3,
        title: 'Animated Landing Page',
        subtitle: 'Premium Web Experiences',
        problem: 'Content creators struggle to stand out. Generic templates kill authenticity.',
        solution: 'Created custom animated landing pages with attention-grabbing visuals and smooth interactions.',
        tech: ['HTML', 'CSS', 'JavaScript', 'GSAP'],
        result: 'Increased engagement by 40% and reduced bounce rate by 25% compared to static alternatives.',
        metrics: {
            engagement: '+40%',
            bounce: '-25%'
        },
        color: '#10b981',
        image: '/landing-bg.png',
        year: '2024',
        featured: false,
        isLive: false
    }
];

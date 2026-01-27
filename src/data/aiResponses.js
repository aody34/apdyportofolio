// AI Guide Responses - Smart scripted logic that feels like AI
// The secret: Context-aware responses based on scroll position and interactions

export const aiResponses = {
    // Section-based greetings
    sections: {
        landing: {
            enter: "Welcome... I'll be your guide through this journey.",
            idle: "Scroll down when you're ready. There's a story to tell.",
            scroll: "That's it... let the story unfold."
        },
        about: {
            enter: "This is Abdi's story. Every developer has one.",
            idle: "A 2022 IT graduate, content creator, visual storyteller. The journey continues.",
            hover: "Still navigating... but always moving forward."
        },
        skills: {
            enter: "Frontend mastery detected: React, GSAP, Three.js.",
            idle: "Click on any skill node to explore deeper.",
            category: {
                frontend: "The foundation. Clean code, semantic markup, modern JavaScript.",
                animation: "Where the magic happens. Motion with purpose.",
                creative: "The eye of a cinematographer meets the mind of a developer.",
                tools: "Sharp tools, efficient workflows."
            }
        },
        projects: {
            enter: "Each project tells a story. Let me walk you through.",
            idle: "Scroll to explore each chapter.",
            hover: "This one solves a real problem. Hover to learn more."
        },
        contact: {
            enter: "Ready to connect? The door is always open.",
            idle: "Let's create something meaningful together.",
            hover: "Insha'Allah, the best is yet to come."
        }
    },

    // Interaction-based responses
    interactions: {
        mouseIdle: [
            "Take your time... good things are worth exploring slowly.",
            "The best experiences aren't rushed.",
            "Every pixel here was crafted with intention."
        ],
        fastScroll: [
            "Whoa, slow down! You might miss something good.",
            "Fast scrolling detected. That's okay, but details matter.",
            "The story is in the subtleties..."
        ],
        skillClick: (skillName) => `${skillName}... a tool in the creative arsenal.`,
        projectHover: (projectTitle) => `Ah, ${projectTitle}. There's a story behind this one.`,
        returnVisitor: "You came back. That means something."
    },

    // Time-based responses
    timeOfDay: {
        morning: "Good morning. Early birds catch the best code.",
        afternoon: "Afternoon focus mode. Let's explore.",
        evening: "Evening vibes. Perfect time for creative work.",
        night: "Late night coding session? I respect that."
    },

    // Easter eggs
    easterEggs: {
        konami: "You found it! A fellow person of culture.",
        longStay: "You've been here a while. Thank you for your attention.",
        allSections: "You've explored everything. You're thorough. I like that."
    }
};

// Helper function to get time-based greeting
export const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return aiResponses.timeOfDay.morning;
    if (hour >= 12 && hour < 17) return aiResponses.timeOfDay.afternoon;
    if (hour >= 17 && hour < 21) return aiResponses.timeOfDay.evening;
    return aiResponses.timeOfDay.night;
};

// Helper to get random response from array
export const getRandomResponse = (responses) => {
    return responses[Math.floor(Math.random() * responses.length)];
};

export default aiResponses;

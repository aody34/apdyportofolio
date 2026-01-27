import { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { useScrollProgress } from './hooks/useScrollProgress';
import { useMousePosition } from './hooks/useMousePosition';
import { useReducedMotion } from './hooks/useReducedMotion';

// Components
import LoadingScreen from './components/ui/LoadingScreen';
import Navigation from './components/ui/Navigation';
import MotionToggle from './components/ui/MotionToggle';
import CinematicHero from './components/landing/CinematicHero';
import AIOrb from './components/ai-guide/AIOrb';
import About from './components/about/About';
import SkillGalaxy from './components/skills/SkillGalaxy';
import Projects from './components/projects/Projects';
import TechStack from './components/tech-stack/TechStack';
import Contact from './components/contact/Contact';

// Styles
import './styles/index.css';

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollTimeoutRef = useRef(null);

    // Custom hooks
    const { progress, currentSection, scrollDirection } = useScrollProgress([
        'hero', 'about', 'skills', 'projects', 'tech', 'contact'
    ]);
    const { normalizedPosition } = useMousePosition();
    const { reducedMotion, toggleReducedMotion } = useReducedMotion();

    // Detect scrolling state
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolling(true);

            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }

            scrollTimeoutRef.current = setTimeout(() => {
                setIsScrolling(false);
            }, 150);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
        };
    }, []);

    const handleLoadingComplete = () => {
        setIsLoading(false);
    };

    return (
        <>
            {/* Loading Screen */}
            {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

            {/* Main Content */}
            <div className={`app ${isLoading ? 'is-loading' : ''}`}>
                {/* Noise Overlay for texture */}
                <div className="noise-overlay" aria-hidden="true" />

                {/* Navigation */}
                <Navigation scrollProgress={progress} />

                {/* Motion Toggle (Accessibility) */}
                <MotionToggle
                    reducedMotion={reducedMotion}
                    onToggle={toggleReducedMotion}
                />

                {/* AI Guide Orb */}
                {!isLoading && (
                    <AIOrb
                        currentSection={currentSection}
                        isScrolling={isScrolling}
                        scrollDirection={scrollDirection}
                    />
                )}

                {/* Sections */}
                <main>
                    <CinematicHero mousePosition={normalizedPosition} />
                    <About />
                    <SkillGalaxy />
                    <Projects />
                    <TechStack />
                    <Contact />
                </main>

                {/* Footer */}
                <footer className="footer">
                    <div className="container">
                        <p className="footer-text">
                            Crafted with 💙 by <span className="footer-name">Abdi Kadir Abdullahi</span>
                        </p>
                        <p className="footer-year">© 2024</p>
                    </div>
                </footer>
            </div>
        </>
    );
}

export default App;

import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './SideNav.css';

const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Work' },
    { id: 'tech', label: 'Tech' },
    { id: 'contact', label: 'Contact' },
];

const MagneticDot = ({ section, isActive, onClick }) => {
    const dotRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        if (!dotRef.current) return;
        const rect = dotRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = (e.clientX - centerX) * 0.3;
        const deltaY = (e.clientY - centerY) * 0.3;

        setPosition({ x: deltaX, y: deltaY });
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.div
            ref={dotRef}
            className={`side-nav-item ${isActive ? 'active' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            animate={{
                x: position.x,
                y: position.y,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
            <div className="side-nav-dot" />
            <motion.span
                className="side-nav-label"
                initial={{ opacity: 0, x: -10 }}
                animate={{
                    opacity: isHovered ? 1 : 0,
                    x: isHovered ? 0 : -10
                }}
                transition={{ duration: 0.2 }}
            >
                {section.label}
            </motion.span>
        </motion.div>
    );
};

const SideNav = () => {
    const [activeSection, setActiveSection] = useState('hero');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show nav after scrolling past hero
            setIsVisible(window.scrollY > window.innerHeight * 0.5);

            // Determine active section
            const scrollPos = window.scrollY + window.innerHeight / 2;

            for (const section of sections) {
                const element = document.getElementById(section.id);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
                        setActiveSection(section.id);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <motion.nav
            className="side-nav"
            initial={{ opacity: 0, x: 20 }}
            animate={{
                opacity: isVisible ? 1 : 0,
                x: isVisible ? 0 : 20
            }}
            transition={{ duration: 0.3 }}
        >
            {sections.map((section) => (
                <MagneticDot
                    key={section.id}
                    section={section}
                    isActive={activeSection === section.id}
                    onClick={() => scrollToSection(section.id)}
                />
            ))}
        </motion.nav>
    );
};

export default SideNav;

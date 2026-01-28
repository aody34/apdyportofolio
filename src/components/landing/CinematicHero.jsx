import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useMagneticHover } from '../../hooks/useMagneticHover';
import BlurText from '../ui/BlurText';
import './CinematicHero.css';

// 3D Floating Orb Component
const FloatingOrb = ({ mousePosition }) => {
    const meshRef = useRef();
    const targetRotation = useRef({ x: 0, y: 0 });

    useFrame((state) => {
        if (meshRef.current) {
            targetRotation.current.x = mousePosition.y * 0.3;
            targetRotation.current.y = mousePosition.x * 0.3;

            meshRef.current.rotation.x = THREE.MathUtils.lerp(
                meshRef.current.rotation.x,
                targetRotation.current.x,
                0.05
            );
            meshRef.current.rotation.y = THREE.MathUtils.lerp(
                meshRef.current.rotation.y,
                targetRotation.current.y,
                0.05
            );

            meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
        }
    });

    return (
        <Sphere ref={meshRef} args={[1, 64, 64]} scale={2.5}>
            <MeshDistortMaterial
                color="#00f0ff"
                attach="material"
                distort={0.4}
                speed={2}
                roughness={0.2}
                metalness={0.8}
                emissive="#00f0ff"
                emissiveIntensity={0.2}
            />
        </Sphere>
    );
};

// Particle Field Background
const ParticleField = () => {
    const particlesRef = useRef();
    const particleCount = 200;

    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }

    useFrame((state) => {
        if (particlesRef.current) {
            particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
            particlesRef.current.rotation.x = state.clock.elapsedTime * 0.01;
        }
    });

    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particleCount}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                color="#00f0ff"
                size={0.05}
                transparent
                opacity={0.6}
                sizeAttenuation
            />
        </points>
    );
};

const CinematicHero = ({ mousePosition = { x: 0, y: 0 } }) => {
    const heroRef = useRef();
    const magnetic = useMagneticHover(0.15);

    return (
        <section ref={heroRef} className="hero" id="hero">
            {/* 3D Canvas Background */}
            <div className="hero-canvas-container">
                <Canvas
                    camera={{ position: [0, 0, 6], fov: 50 }}
                    gl={{ antialias: true, alpha: true }}
                    dpr={[1, 2]}
                >
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} color="#00f0ff" />
                    <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" />
                    <FloatingOrb mousePosition={mousePosition} />
                    <ParticleField />
                </Canvas>
            </div>

            {/* Gradient Overlay */}
            <div className="hero-gradient-overlay" />

            {/* Content */}
            <div className="hero-content">
                <div className="hero-grid">
                    <div className="hero-text-container">
                        {/* Blur Reveal Intro */}
                        <BlurText
                            text="This is not a portfolio..."
                            className="hero-intro"
                            delay={0.3}
                        />

                        {/* Title with Blur Reveal */}
                        <h1 className="hero-title">
                            <BlurText
                                text="It's an"
                                className="hero-title-line"
                                delay={0.5}
                            />
                            <BlurText
                                text="Experience"
                                className="hero-title-highlight"
                                delay={0.8}
                                colorPulse={true}
                            />
                        </h1>

                        <motion.div
                            className="hero-divider"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        />

                        {/* Subtitle with Blur Reveal */}
                        <BlurText
                            text="Crafted by Youngdev"
                            className="hero-subtitle"
                            delay={1.4}
                        />

                        <BlurText
                            text="Frontend Developer & Creative Technologist"
                            className="hero-role"
                            delay={1.6}
                        />

                        <BlurText
                            text="Crypto Developer & Trader"
                            className="hero-role hero-role-crypto"
                            delay={1.8}
                        />

                        {/* Interactive CTA Button */}
                        <motion.div
                            className="hero-cta"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 2, duration: 0.6 }}
                        >
                            <a href="#projects" className="btn-play">
                                <span className="btn-play-icon">▶</span>
                                <span className="btn-play-text">Explore My Work</span>
                                <span className="btn-play-bg"></span>
                            </a>
                        </motion.div>
                    </div>

                    {/* Magnetic Image Container */}
                    <motion.div
                        className="hero-image-container"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div
                            className="hero-image-wrapper"
                            ref={magnetic.ref}
                            {...magnetic.handlers}
                            style={magnetic.style}
                        >
                            <div className="hero-image-glow" />
                            <img
                                src="/profile.jpg"
                                alt="Abdi Kadir Abdullahi"
                                className="hero-profile-img"
                            />
                            <div className="hero-image-border" />
                            <div className="hero-image-shine" />
                        </div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    className="hero-scroll-indicator"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5, duration: 0.6 }}
                >
                    <span className="scroll-text">Scroll to explore</span>
                    <div className="scroll-line">
                        <div className="scroll-dot" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default CinematicHero;

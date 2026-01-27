import { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import './CinematicHero.css';

// 3D Floating Orb Component
const FloatingOrb = ({ mousePosition }) => {
    const meshRef = useRef();
    const targetRotation = useRef({ x: 0, y: 0 });

    useFrame((state) => {
        if (meshRef.current) {
            // Smooth follow mouse
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

            // Floating animation
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

    useEffect(() => {
        // GSAP animations will be initialized here after GSAP loads
    }, []);

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
                        <p className="hero-intro">This is not a portfolio...</p>
                        <h1 className="hero-title">
                            <span className="hero-title-line">It's an</span>
                            <span className="hero-title-highlight">Experience</span>
                        </h1>
                        <div className="hero-divider" />
                        <p className="hero-subtitle">
                            Crafted by <span className="hero-name">Abdi Kadir Abdullahi</span>
                        </p>
                        <p className="hero-role">Frontend Developer & Creative Technologist</p>
                    </div>

                    <div className="hero-image-container">
                        <div className="hero-image-wrapper">
                            <div className="hero-image-glow" />
                            <img
                                src="/profile.jpg"
                                alt="Abdi Kadir Abdullahi"
                                className="hero-profile-img"
                            />
                            <div className="hero-image-border" />
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="hero-scroll-indicator">
                    <span className="scroll-text">Scroll to explore</span>
                    <div className="scroll-line">
                        <div className="scroll-dot" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CinematicHero;

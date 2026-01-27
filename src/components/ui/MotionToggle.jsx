import { motion } from 'framer-motion';
import './MotionToggle.css';

const MotionToggle = ({ reducedMotion, onToggle }) => {
    return (
        <motion.button
            className="motion-toggle"
            onClick={onToggle}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={reducedMotion ? "Enable animations" : "Reduce motion"}
            title={reducedMotion ? "Enable animations" : "Reduce motion"}
        >
            <span className="toggle-icon">
                {reducedMotion ? '⏸️' : '✨'}
            </span>
            <span className="toggle-label">
                {reducedMotion ? 'Motion Off' : 'Motion On'}
            </span>
        </motion.button>
    );
};

export default MotionToggle;

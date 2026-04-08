import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback } from 'react';

const EMOJIS = ['💖', '⭐', '✨', '🌟', '💫', '💕', '❤️', '🩷', '🧡', '💛'];

function FloatingEmoji({ x, y, emoji, onComplete }) {
  const randomX = (Math.random() - 0.5) * 100;
  const randomRotate = (Math.random() - 0.5) * 60;
  
  return (
    <motion.span
      initial={{ 
        opacity: 1, 
        scale: 0, 
        x: 0, 
        y: 0,
        rotate: 0
      }}
      animate={{ 
        opacity: 0, 
        scale: [0, 1.5, 1],
        x: randomX,
        y: -100 - Math.random() * 80,
        rotate: randomRotate
      }}
      exit={{ opacity: 0 }}
      transition={{ 
        duration: 1.2,
        ease: "easeOut"
      }}
      onAnimationComplete={onComplete}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        fontSize: '24px',
        pointerEvents: 'none',
        zIndex: 100
      }}
    >
      {emoji}
    </motion.span>
  );
}

export function PopButton({ children, className, onClick, ...props }) {
  const [particles, setParticles] = useState([]);
  const [particleId, setParticleId] = useState(0);

  const handleClick = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Create 5-8 particles
    const count = 5 + Math.floor(Math.random() * 4);
    const newParticles = [];
    
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: particleId + i,
        x: x + (Math.random() - 0.5) * 40,
        y: y + (Math.random() - 0.5) * 20,
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)]
      });
    }
    
    setParticles(prev => [...prev, ...newParticles]);
    setParticleId(prev => prev + count);
    
    if (onClick) onClick(e);
  }, [onClick, particleId]);

  const removeParticle = useCallback((id) => {
    setParticles(prev => prev.filter(p => p.id !== id));
  }, []);

  return (
    <motion.div
      className="relative inline-block"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      <button 
        className={className}
        onClick={handleClick}
      >
        {children}
      </button>
      
      <AnimatePresence>
        {particles.map(particle => (
          <FloatingEmoji
            key={particle.id}
            x={particle.x}
            y={particle.y}
            emoji={particle.emoji}
            onComplete={() => removeParticle(particle.id)}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

export function PopCard({ children, className, ...props }) {
  const [particles, setParticles] = useState([]);
  const [particleId, setParticleId] = useState(0);

  const handleClick = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Create 3-5 particles for cards
    const count = 3 + Math.floor(Math.random() * 3);
    const newParticles = [];
    
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: particleId + i,
        x: x + (Math.random() - 0.5) * 30,
        y: y + (Math.random() - 0.5) * 15,
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)]
      });
    }
    
    setParticles(prev => [...prev, ...newParticles]);
    setParticleId(prev => prev + count);
  }, [particleId]);

  const removeParticle = useCallback((id) => {
    setParticles(prev => prev.filter(p => p.id !== id));
  }, []);

  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={handleClick}
      {...props}
    >
      {children}
      
      <AnimatePresence>
        {particles.map(particle => (
          <FloatingEmoji
            key={particle.id}
            x={particle.x}
            y={particle.y}
            emoji={particle.emoji}
            onComplete={() => removeParticle(particle.id)}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

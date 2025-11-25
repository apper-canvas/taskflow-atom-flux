import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const ConfettiEffect = ({ show, onComplete }) => {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    if (show) {
      // Generate random confetti particles
      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: ["#4F46E5", "#7C3AED", "#F59E0B", "#10B981", "#EF4444"][Math.floor(Math.random() * 5)],
        size: Math.random() * 8 + 4,
        delay: Math.random() * 0.3
      }))
      
      setParticles(newParticles)
      
      // Auto-complete after animation
      const timer = setTimeout(() => {
        onComplete && onComplete()
      }, 800)
      
      return () => clearTimeout(timer)
    }
  }, [show, onComplete])

  if (!show) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{
            x: "50vw",
            y: "50vh",
            scale: 0,
            rotate: 0,
            opacity: 1
          }}
          animate={{
            x: `${particle.x}vw`,
            y: `${particle.y}vh`,
            scale: [0, 1, 0.8, 0],
            rotate: 360,
            opacity: [1, 1, 0.5, 0]
          }}
          transition={{
            duration: 0.8,
            delay: particle.delay,
            ease: "easeOut"
          }}
          style={{
            position: "absolute",
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            borderRadius: "50%"
          }}
        />
      ))}
    </div>
  )
}

export default ConfettiEffect
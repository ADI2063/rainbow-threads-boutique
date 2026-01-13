import { motion } from "framer-motion";

const shapes = [
  { size: 300, color: "hsl(var(--pride-red))", top: "10%", left: "5%", delay: 0 },
  { size: 200, color: "hsl(var(--pride-orange))", top: "60%", left: "80%", delay: 2 },
  { size: 250, color: "hsl(var(--pride-yellow))", top: "30%", left: "70%", delay: 4 },
  { size: 180, color: "hsl(var(--pride-green))", top: "70%", left: "15%", delay: 6 },
  { size: 220, color: "hsl(var(--pride-blue))", top: "20%", left: "40%", delay: 8 },
  { size: 280, color: "hsl(var(--pride-purple))", top: "80%", left: "50%", delay: 10 },
  { size: 150, color: "hsl(var(--pride-pink))", top: "45%", left: "25%", delay: 12 },
];

const FloatingShapes = () => {
  return (
    <div className="floating-shapes">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className="floating-shape"
          style={{
            width: shape.size,
            height: shape.size,
            background: shape.color,
            top: shape.top,
            left: shape.left,
            filter: "blur(80px)",
          }}
          animate={{
            y: [0, -30, -15, -35, 0],
            x: [0, 10, -5, 15, 0],
            scale: [1, 1.1, 0.95, 1.05, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            delay: shape.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default FloatingShapes;

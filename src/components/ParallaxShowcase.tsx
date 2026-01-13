import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ParallaxShowcase = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Different speeds for parallax layers
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -350]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const y4 = useTransform(scrollYProgress, [0, 1], [100, -150]);
  const y5 = useTransform(scrollYProgress, [0, 1], [50, -250]);
  
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -10]);
  const rotate3 = useTransform(scrollYProgress, [0, 1], [-5, 20]);
  
  const scale1 = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.9]);
  const scale2 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1]);
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section 
      ref={ref} 
      className="relative h-[80vh] overflow-hidden"
    >
      {/* Animated flowing gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Base animated gradient */}
        <motion.div 
          className="absolute inset-[-50%] w-[200%] h-[200%]"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 20% 40%, hsl(var(--pride-red) / 0.15) 0%, transparent 50%),
              radial-gradient(ellipse 60% 40% at 80% 20%, hsl(var(--pride-orange) / 0.12) 0%, transparent 50%),
              radial-gradient(ellipse 70% 60% at 40% 80%, hsl(var(--pride-yellow) / 0.1) 0%, transparent 50%),
              radial-gradient(ellipse 50% 50% at 70% 60%, hsl(var(--pride-green) / 0.12) 0%, transparent 50%),
              radial-gradient(ellipse 80% 40% at 30% 30%, hsl(var(--pride-blue) / 0.15) 0%, transparent 50%),
              radial-gradient(ellipse 60% 50% at 60% 70%, hsl(var(--pride-purple) / 0.12) 0%, transparent 50%),
              radial-gradient(ellipse 50% 60% at 90% 40%, hsl(var(--pride-pink) / 0.1) 0%, transparent 50%),
              hsl(var(--background))
            `,
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 60, repeat: Infinity, ease: "linear" },
            scale: { duration: 20, repeat: Infinity, ease: "easeInOut" },
          }}
        />
        
        {/* Secondary flowing layer */}
        <motion.div 
          className="absolute inset-[-30%] w-[160%] h-[160%]"
          style={{
            background: `
              radial-gradient(circle at 30% 50%, hsl(var(--pride-purple) / 0.1) 0%, transparent 40%),
              radial-gradient(circle at 70% 30%, hsl(var(--pride-blue) / 0.08) 0%, transparent 40%),
              radial-gradient(circle at 50% 80%, hsl(var(--pride-green) / 0.1) 0%, transparent 40%)
            `,
          }}
          animate={{
            rotate: [360, 0],
            x: [0, 50, 0, -50, 0],
            y: [0, -30, 0, 30, 0],
          }}
          transition={{
            rotate: { duration: 45, repeat: Infinity, ease: "linear" },
            x: { duration: 25, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 20, repeat: Infinity, ease: "easeInOut" },
          }}
        />

        {/* Mesh gradient overlay */}
        <motion.div 
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(45deg, transparent 40%, hsl(var(--pride-red) / 0.03) 45%, transparent 50%),
              linear-gradient(135deg, transparent 40%, hsl(var(--pride-blue) / 0.03) 45%, transparent 50%),
              linear-gradient(225deg, transparent 40%, hsl(var(--pride-yellow) / 0.03) 45%, transparent 50%),
              linear-gradient(315deg, transparent 40%, hsl(var(--pride-purple) / 0.03) 45%, transparent 50%)
            `,
            backgroundSize: "400% 400%",
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Background layer - slowest */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: y1 }}
      >
        {/* Large gradient orbs */}
        <motion.div 
          className="absolute top-[10%] left-[5%] w-[400px] h-[400px] rounded-full opacity-[0.12]"
          style={{ 
            background: "linear-gradient(135deg, hsl(var(--pride-red)), hsl(var(--pride-orange)))",
            filter: "blur(80px)",
            rotate: rotate1,
            scale: scale1,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="absolute top-[40%] right-[10%] w-[350px] h-[350px] rounded-full opacity-[0.12]"
          style={{ 
            background: "linear-gradient(135deg, hsl(var(--pride-blue)), hsl(var(--pride-purple)))",
            filter: "blur(80px)",
            rotate: rotate2,
            scale: scale2,
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.1, 0.18, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.div 
          className="absolute bottom-[20%] left-[30%] w-[300px] h-[300px] rounded-full opacity-[0.1]"
          style={{ 
            background: "linear-gradient(135deg, hsl(var(--pride-yellow)), hsl(var(--pride-green)))",
            filter: "blur(70px)",
          }}
          animate={{
            scale: [1, 1.25, 1],
            x: [0, 30, 0],
            opacity: [0.08, 0.14, 0.08],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />
      </motion.div>

      {/* Middle layer - medium speed */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: y2, opacity }}
      >
        {/* Geometric shapes */}
        <motion.div 
          className="absolute top-[20%] left-[20%] w-32 h-32 border-2 border-pride-red/30"
          style={{ rotate: rotate1 }}
          animate={{ 
            borderColor: [
              "hsl(var(--pride-red) / 0.3)",
              "hsl(var(--pride-orange) / 0.3)",
              "hsl(var(--pride-red) / 0.3)",
            ]
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.div 
          className="absolute top-[50%] right-[25%] w-24 h-24 border-2 border-pride-yellow/30 rounded-full"
          style={{ rotate: rotate2 }}
          animate={{ 
            borderColor: [
              "hsl(var(--pride-yellow) / 0.3)",
              "hsl(var(--pride-green) / 0.3)",
              "hsl(var(--pride-yellow) / 0.3)",
            ]
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-[30%] left-[40%] w-20 h-20 border-2 border-pride-green/30"
          style={{ rotate: rotate3, borderRadius: "30%" }}
          animate={{ 
            borderColor: [
              "hsl(var(--pride-green) / 0.3)",
              "hsl(var(--pride-blue) / 0.3)",
              "hsl(var(--pride-green) / 0.3)",
            ]
          }}
          transition={{ duration: 7, repeat: Infinity }}
        />
        
        {/* Animated pride stripe lines */}
        <div className="absolute top-[15%] left-0 right-0 flex flex-col gap-4">
          {["pride-red", "pride-orange", "pride-yellow", "pride-green", "pride-blue", "pride-purple"].map((color, i) => (
            <motion.div
              key={color}
              className={`h-[2px] bg-${color}/15`}
              style={{
                marginLeft: i % 2 === 0 ? "0" : "auto",
                y: useTransform(scrollYProgress, [0, 1], [0, -50 * (i + 1)]),
              }}
              animate={{
                width: [`${50 + i * 8}%`, `${70 + i * 5}%`, `${50 + i * 8}%`],
                opacity: [0.1, 0.25, 0.1],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Foreground layer - fastest */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y: y3 }}
      >
        {/* Floating dots with glow */}
        {[
          { top: "25%", left: "15%", color: "--pride-red", size: 12 },
          { top: "35%", left: "75%", color: "--pride-orange", size: 10 },
          { top: "55%", left: "25%", color: "--pride-yellow", size: 14 },
          { top: "45%", left: "85%", color: "--pride-green", size: 11 },
          { top: "65%", left: "45%", color: "--pride-blue", size: 13 },
          { top: "30%", left: "55%", color: "--pride-purple", size: 12 },
          { top: "70%", left: "70%", color: "--pride-pink", size: 10 },
        ].map((dot, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              top: dot.top,
              left: dot.left,
              width: dot.size,
              height: dot.size,
              background: `hsl(var(${dot.color}))`,
              boxShadow: `0 0 20px hsl(var(${dot.color}) / 0.5), 0 0 40px hsl(var(${dot.color}) / 0.3)`,
              y: useTransform(scrollYProgress, [0, 1], [0, -80 * (i + 1)]),
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </motion.div>

      {/* Diagonal pride stripes - dramatic parallax */}
      <motion.div 
        className="absolute -left-[20%] top-0 w-[140%] h-full pointer-events-none"
        style={{ y: y4, rotate: -12 }}
      >
        {[
          { top: "20%", color: "--pride-red" },
          { top: "28%", color: "--pride-orange" },
          { top: "36%", color: "--pride-yellow" },
          { top: "44%", color: "--pride-green" },
          { top: "52%", color: "--pride-blue" },
          { top: "60%", color: "--pride-purple" },
        ].map((stripe, i) => (
          <motion.div 
            key={i}
            className="absolute left-0 right-0 h-[3px]"
            style={{ 
              top: stripe.top,
              background: `linear-gradient(90deg, transparent 0%, hsl(var(${stripe.color}) / 0.3) 50%, transparent 100%)`,
            }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scaleX: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </motion.div>

      {/* Center floating text */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center"
        style={{ y: y5, opacity }}
      >
        <motion.p 
          className="text-6xl md:text-8xl lg:text-9xl font-display font-light tracking-wider select-none"
          style={{ 
            scale: scale2,
            background: "linear-gradient(90deg, hsl(var(--pride-red) / 0.08), hsl(var(--pride-orange) / 0.08), hsl(var(--pride-yellow) / 0.08), hsl(var(--pride-green) / 0.08), hsl(var(--pride-blue) / 0.08), hsl(var(--pride-purple) / 0.08))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            backgroundSize: "200% 100%",
          }}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          PRIDE
        </motion.p>
      </motion.div>

      {/* Animated gradient border at top and bottom */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background: "linear-gradient(90deg, hsl(var(--pride-red)), hsl(var(--pride-orange)), hsl(var(--pride-yellow)), hsl(var(--pride-green)), hsl(var(--pride-blue)), hsl(var(--pride-purple)), hsl(var(--pride-red)))",
          backgroundSize: "200% 100%",
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{
          background: "linear-gradient(90deg, hsl(var(--pride-purple)), hsl(var(--pride-blue)), hsl(var(--pride-green)), hsl(var(--pride-yellow)), hsl(var(--pride-orange)), hsl(var(--pride-red)), hsl(var(--pride-purple)))",
          backgroundSize: "200% 100%",
        }}
        animate={{
          backgroundPosition: ["100% 50%", "0% 50%", "100% 50%"],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </section>
  );
};

export default ParallaxShowcase;

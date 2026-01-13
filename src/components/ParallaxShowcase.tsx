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
      className="relative h-[80vh] overflow-hidden bg-background"
    >
      {/* Background layer - slowest */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: y1 }}
      >
        {/* Large gradient orbs */}
        <motion.div 
          className="absolute top-[10%] left-[5%] w-[400px] h-[400px] rounded-full opacity-[0.08]"
          style={{ 
            background: "linear-gradient(135deg, hsl(var(--pride-red)), hsl(var(--pride-orange)))",
            filter: "blur(60px)",
            rotate: rotate1,
            scale: scale1,
          }}
        />
        <motion.div 
          className="absolute top-[40%] right-[10%] w-[350px] h-[350px] rounded-full opacity-[0.08]"
          style={{ 
            background: "linear-gradient(135deg, hsl(var(--pride-blue)), hsl(var(--pride-purple)))",
            filter: "blur(60px)",
            rotate: rotate2,
            scale: scale2,
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
          className="absolute top-[20%] left-[20%] w-32 h-32 border-2 border-pride-red/20"
          style={{ rotate: rotate1 }}
        />
        <motion.div 
          className="absolute top-[50%] right-[25%] w-24 h-24 border-2 border-pride-yellow/20 rounded-full"
          style={{ rotate: rotate2 }}
        />
        <motion.div 
          className="absolute bottom-[30%] left-[40%] w-20 h-20 border-2 border-pride-green/20"
          style={{ rotate: rotate3, borderRadius: "30%" }}
        />
        
        {/* Pride stripe lines */}
        <div className="absolute top-[15%] left-0 right-0 flex flex-col gap-4">
          {["pride-red", "pride-orange", "pride-yellow", "pride-green", "pride-blue", "pride-purple"].map((color, i) => (
            <motion.div
              key={color}
              className={`h-[2px] bg-${color}/10`}
              style={{
                width: `${60 + i * 8}%`,
                marginLeft: i % 2 === 0 ? "0" : "auto",
                y: useTransform(scrollYProgress, [0, 1], [0, -50 * (i + 1)]),
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
        {/* Floating dots */}
        {[
          { top: "25%", left: "15%", color: "pride-red", size: 8 },
          { top: "35%", left: "75%", color: "pride-orange", size: 6 },
          { top: "55%", left: "25%", color: "pride-yellow", size: 10 },
          { top: "45%", left: "85%", color: "pride-green", size: 7 },
          { top: "65%", left: "45%", color: "pride-blue", size: 9 },
          { top: "30%", left: "55%", color: "pride-purple", size: 8 },
          { top: "70%", left: "70%", color: "pride-pink", size: 6 },
        ].map((dot, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full bg-${dot.color}/30`}
            style={{
              top: dot.top,
              left: dot.left,
              width: dot.size,
              height: dot.size,
              y: useTransform(scrollYProgress, [0, 1], [0, -80 * (i + 1)]),
            }}
          />
        ))}
      </motion.div>

      {/* Diagonal pride stripes - dramatic parallax */}
      <motion.div 
        className="absolute -left-[20%] top-0 w-[140%] h-full pointer-events-none"
        style={{ y: y4, rotate: -12 }}
      >
        <div className="absolute top-[20%] left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-pride-red/20 to-transparent" />
        <div className="absolute top-[28%] left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-pride-orange/20 to-transparent" />
        <div className="absolute top-[36%] left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-pride-yellow/20 to-transparent" />
        <div className="absolute top-[44%] left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-pride-green/20 to-transparent" />
        <div className="absolute top-[52%] left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-pride-blue/20 to-transparent" />
        <div className="absolute top-[60%] left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-pride-purple/20 to-transparent" />
      </motion.div>

      {/* Center floating text */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center"
        style={{ y: y5, opacity }}
      >
        <motion.p 
          className="text-6xl md:text-8xl lg:text-9xl font-display font-light tracking-wider text-foreground/[0.03] select-none"
          style={{ scale: scale2 }}
        >
          PRIDE
        </motion.p>
      </motion.div>

      {/* Animated gradient border at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] gradient-rainbow animate-gradient opacity-50" />
    </section>
  );
};

export default ParallaxShowcase;

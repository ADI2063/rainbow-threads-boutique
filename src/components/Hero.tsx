import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center pt-20 pattern-pride-waves">
      {/* Animated Rainbow accent line */}
      <motion.div 
        className="absolute top-20 left-0 right-0 h-[2px] gradient-rainbow animate-gradient"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      <motion.div 
        className="container mx-auto px-4 relative z-10"
        style={{ y, opacity, scale }}
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Tagline */}
          <motion.p 
            className="text-sm tracking-[0.3em] text-muted-foreground uppercase mb-8 font-body"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
          >
            Celebrating Identity Through Fashion
          </motion.p>

          {/* Main Heading */}
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-light mb-8 leading-[1.1] font-display"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Wear Your
            <br />
            <span className="italic gradient-rainbow-text">True Colors</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-12 leading-relaxed font-body font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Premium apparel that celebrates who you are. 
            Bold designs, inclusive sizing, timeless style.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <Link to="/shop">
              <Button variant="pride" size="xl" className="group min-w-[200px]">
                Shop Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button variant="pride-outline" size="xl" className="min-w-[200px]">
              Our Story
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-3 gap-8 md:gap-16 mt-24 pt-12 border-t border-border max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {[
              { value: "10K+", label: "Happy Customers" },
              { value: "100%", label: "Inclusive Sizing" },
              { value: "∞", label: "Ways to Express" },
            ].map((stat, index) => (
              <motion.div 
                key={stat.label} 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
              >
                <div className="text-3xl md:text-4xl font-light mb-2 font-display">
                  {stat.value}
                </div>
                <div className="text-xs tracking-widest text-muted-foreground uppercase font-body">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <div className="flex flex-col items-center gap-3">
          <span className="text-xs tracking-widest text-muted-foreground uppercase font-body">Scroll</span>
          <div className="w-[1px] h-12 bg-border relative overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 w-full h-1/3 gradient-rainbow"
              animate={{ y: [0, 32, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;

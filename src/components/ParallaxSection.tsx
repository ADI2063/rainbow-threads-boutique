import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  pattern?: "geometric" | "dots" | "waves" | "diagonal" | "none";
}

const ParallaxSection = ({
  children,
  className = "",
  speed = 0.5,
  pattern = "none",
}: ParallaxSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 100 * speed]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);

  const patternClass = pattern !== "none" ? `pattern-pride-${pattern}` : "";

  return (
    <motion.section
      ref={ref}
      style={{ y, opacity }}
      className={`relative parallax-section ${patternClass} ${className}`}
    >
      {children}
    </motion.section>
  );
};

export default ParallaxSection;

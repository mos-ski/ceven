"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { ReactNode, useEffect, useRef } from "react";

interface MouseParallaxProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

export function MouseParallax({ children, strength = 12, className }: MouseParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 60, damping: 20 });
  const y = useSpring(rawY, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const w = document.documentElement.clientWidth;
      const h = document.documentElement.clientHeight;
      rawX.set(((e.clientX - w / 2) / (w / 2)) * strength);
      rawY.set(((e.clientY - h / 2) / (h / 2)) * strength);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [rawX, rawY, strength]);

  return (
    <motion.div ref={ref} style={{ x, y }} className={className}>
      {children}
    </motion.div>
  );
}

"use client";

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Delay in seconds before the reveal starts. */
  delay?: number;
  /** Direction the content travels from. */
  from?: "bottom" | "left" | "right" | "none";
  once?: boolean;
}

/** Subtle scroll-into-view reveal. Honours prefers-reduced-motion. */
export function Reveal({ children, className, delay = 0, from = "bottom", once = true }: RevealProps) {
  const reduce = useReducedMotion();

  const offsets = {
    bottom: { y: 24, x: 0 },
    left: { x: -24, y: 0 },
    right: { x: 24, y: 0 },
    none: { x: 0, y: 0 },
  } as const;

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offsets[from] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: "-64px" }}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
}

const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const staggerChild: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] } },
};

/** Staggers direct children on scroll into view. */
export function StaggerGroup({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-48px" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div variants={staggerChild} className={className}>
      {children}
    </motion.div>
  );
}

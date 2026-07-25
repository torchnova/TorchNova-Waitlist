"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * The "Build boldly." accent line — bold, Torch-accent coloured, with a subtle
 * pulsing glow. Falls back to a static accent line under reduced-motion.
 */
export function BuildBoldly() {
  const reduce = useReducedMotion();

  if (reduce) {
    return <strong className="accent-text">Build boldly.</strong>;
  }

  return (
    <motion.strong
      className="accent-text"
      style={{ display: "inline-block" }}
      initial={{ opacity: 0, y: 6 }}
      animate={{
        opacity: 1,
        y: 0,
        textShadow: [
          "0 0 0px rgba(234,106,44,0)",
          "0 0 12px rgba(234,106,44,0.38)",
          "0 0 0px rgba(234,106,44,0)",
        ],
      }}
      transition={{
        opacity: { duration: 0.5 },
        y: { duration: 0.5 },
        textShadow: {
          duration: 2.4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        },
      }}
    >
      Build boldly.
    </motion.strong>
  );
}

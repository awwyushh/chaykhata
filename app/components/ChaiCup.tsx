import { motion } from "framer-motion";

interface ChaiCupProps {
  size?: number;
  animated?: boolean;
  className?: string;
}

export function ChaiCup({ size = 80, animated = true, className = "" }: ChaiCupProps) {
  const content = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Steam wisps */}
      <motion.path
        d="M35 22 Q38 16 35 10 Q32 4 35 -2"
        stroke="#D09A38"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        animate={animated ? { opacity: [0.3, 0.8, 0.3], y: [-1, -3, -1] } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.path
        d="M50 20 Q53 14 50 8 Q47 2 50 -4"
        stroke="#D09A38"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        animate={animated ? { opacity: [0.5, 1, 0.5], y: [-1, -3, -1] } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
      />
      <motion.path
        d="M65 22 Q68 16 65 10 Q62 4 65 -2"
        stroke="#D09A38"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        animate={animated ? { opacity: [0.3, 0.8, 0.3], y: [-1, -3, -1] } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
      />

      {/* Cup body */}
      <path
        d="M20 32 L27 88 Q28 94 34 94 L66 94 Q72 94 73 88 L80 32 Z"
        fill="url(#cupGradient)"
        stroke="#B8801E"
        strokeWidth="1.5"
      />

      {/* Cup rim */}
      <rect
        x="18"
        y="28"
        width="64"
        height="8"
        rx="4"
        fill="url(#rimGradient)"
        stroke="#B8801E"
        strokeWidth="1.5"
      />

      {/* Chai liquid */}
      <path
        d="M22 40 L25 75 Q26 80 32 80 L68 80 Q74 80 75 75 L78 40 Z"
        fill="url(#liquidGradient)"
      />

      {/* Liquid surface shimmer */}
      <ellipse cx="50" cy="42" rx="27" ry="4" fill="rgba(232, 180, 90, 0.4)" />

      {/* Handle */}
      <path
        d="M80 45 Q95 45 95 60 Q95 75 80 75"
        stroke="url(#rimGradient)"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />

      {/* Saucer */}
      <ellipse
        cx="50"
        cy="96"
        rx="38"
        ry="5"
        fill="url(#saucerGradient)"
        stroke="#9A6418"
        strokeWidth="1"
      />

      <defs>
        <linearGradient id="cupGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7C4D14" />
          <stop offset="50%" stopColor="#9A6418" />
          <stop offset="100%" stopColor="#7C4D14" />
        </linearGradient>
        <linearGradient id="rimGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#B8801E" />
          <stop offset="50%" stopColor="#D09A38" />
          <stop offset="100%" stopColor="#B8801E" />
        </linearGradient>
        <linearGradient id="liquidGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D09A38" />
          <stop offset="50%" stopColor="#A8681A" />
          <stop offset="100%" stopColor="#7C4D14" />
        </linearGradient>
        <linearGradient id="saucerGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#5E3A11" />
          <stop offset="50%" stopColor="#7C4D14" />
          <stop offset="100%" stopColor="#5E3A11" />
        </linearGradient>
      </defs>
    </svg>
  );

  if (!animated) return content;

  return (
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      {content}
    </motion.div>
  );
}

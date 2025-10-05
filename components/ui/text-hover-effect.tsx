import { useRef, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

// Custom hook to detect if we're on mobile
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

export const TextHoverEffect = ({
  text,
  duration,
  className = "",
  yPercent = 50,
}: {
  text: string;
  duration?: number;
  automatic?: boolean;
  className?: string;
  yPercent?: number; // 0-100, vertical position of the text baseline (percentage of SVG height)
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });
  const controls = useAnimation();
  const isMobile = useIsMobile();

  // Mobile animation effect
  useEffect(() => {
    if (isMobile) {
      const animateMobile = async () => {
        while (true) {
          // Animate from left to right
          await controls.start({
            cx: "100%",
            cy: "50%",
            transition: { duration: 2, ease: "easeInOut" }
          });
          // Reset to left
          await controls.start({
            cx: "0%",
            cy: "50%",
            transition: { duration: 0 }
          });
        }
      };
      animateMobile();
    }
  }, [isMobile, controls]);

  // Desktop hover effect
  useEffect(() => {
    if (!isMobile && svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor, isMobile]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox={isMobile ? "0 0 300 80" : "0 0 500 120"}
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className={`select-none ${className}`}
    >
      <defs>
        <linearGradient
          id="textGradient"
          gradientUnits="userSpaceOnUse"
          cx="50%"
          cy="50%"
          r="25%"
        >
          {hovered && (
            <>
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="25%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="75%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#ffffff" />
            </>
          )}
        </linearGradient>

        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r={isMobile ? "40%" : "20%"}
          initial={{ cx: "50%", cy: "50%" }}
          animate={isMobile ? controls : maskPosition}
          transition={{ duration: duration ?? 0, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="textMask">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#revealMask)"
          />
        </mask>
      </defs>
      <text
        x="50%"
        y={`${yPercent}%`}
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="1"
        className={`fill-transparent stroke-neutral-200 font-[helvetica] ${isMobile ? 'text-3xl sm:text-4xl' : 'text-[8rem]'} font-bold dark:stroke-neutral-800`}
        style={{ opacity: 0.15 }}
      >
        {text}
      </text>
      <motion.text
        x="50%"
        y={`${yPercent}%`}
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="1"
        className={`fill-transparent stroke-neutral-200 font-[helvetica] ${isMobile ? 'text-3xl sm:text-4xl' : 'text-[8rem]'} font-bold dark:stroke-neutral-800`}
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{
          strokeDashoffset: 0,
          strokeDasharray: 1000,
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
        }}
      >
        {text}
      </motion.text>
      <text
        x="50%"
        y={`${yPercent}%`}
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#textGradient)"
        strokeWidth="1"
        mask="url(#textMask)"
        className={`fill-transparent font-[helvetica] ${isMobile ? 'text-3xl sm:text-4xl' : 'text-7xl'} font-bold`}
      >
        {text}
      </text>
    </svg>
  );
};

"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const DefaultCursorSVG = ({ color = "currentColor" }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12"
        cy="12"
        r="11"
        stroke={color}
        strokeWidth="2"
        fill="transparent"
      />
      <circle cx="12" cy="12" r="4" fill={color} />
    </svg>
  );
};

export const SmoothCursor = ({
  cursor = <DefaultCursorSVG />,
  springConfig = {
    stiffness: 300,
    damping: 30,
    mass: 0.5,
  },
  className = "",
}) => {
  const cursorRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Use motion values for smooth interpolation
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Apply spring physics
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible, mouseX, mouseY]);

  return (
    <motion.div
      ref={cursorRef}
      className={`fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 ${className}`}
      style={{
        x: springX,
        y: springY,
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}
    >
      <div className="relative">{cursor}</div>
    </motion.div>
  );
};
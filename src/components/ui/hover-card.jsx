import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function HoverCard({
  children,
  content,
  className,
  contentClassName,
  direction = "top",
  delay = 300,
  arrow = true,
  width = "auto",
  trigger = "hover",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  const handleMouseEnter = () => {
    if (trigger !== "hover") return;
    
    clearTimeout(timeoutId);
    setIsHovering(true);
    const id = setTimeout(() => {
      setIsOpen(true);
    }, delay);
    setTimeoutId(id);
  };

  const handleMouseLeave = () => {
    if (trigger !== "hover") return;
    
    clearTimeout(timeoutId);
    setIsHovering(false);
    const id = setTimeout(() => {
      setIsOpen(false);
    }, delay);
    setTimeoutId(id);
  };

  const handleClick = () => {
    if (trigger === "click") {
      setIsOpen(!isOpen);
    }
  };

  const directionVariants = {
    top: {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 10 },
      contentStyles: "bottom-full mb-2",
      arrowStyles: "top-full left-1/2 -ml-1 border-t-white dark:border-t-gray-800 border-l-transparent border-r-transparent",
    },
    bottom: {
      initial: { opacity: 0, y: -10 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -10 },
      contentStyles: "top-full mt-2",
      arrowStyles: "bottom-full left-1/2 -ml-1 border-b-white dark:border-b-gray-800 border-l-transparent border-r-transparent",
    },
    left: {
      initial: { opacity: 0, x: 10 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 10 },
      contentStyles: "right-full mr-2",
      arrowStyles: "left-full top-1/2 -mt-1 border-l-white dark:border-l-gray-800 border-t-transparent border-b-transparent",
    },
    right: {
      initial: { opacity: 0, x: -10 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -10 },
      contentStyles: "left-full ml-2",
      arrowStyles: "right-full top-1/2 -mt-1 border-r-white dark:border-r-gray-800 border-t-transparent border-b-transparent",
    },
  };

  const variant = directionVariants[direction];

  return (
    <div
      className={cn("relative inline-block", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {children}
      <AnimatePresence>
        {(isOpen || isHovering) && (
          <motion.div
            className={cn(
              "absolute z-50 whitespace-normal",
              variant.contentStyles
            )}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variant}
            transition={{ duration: 0.2 }}
            style={{ width }}
          >
            <div
              className={cn(
                "rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 p-4 text-sm",
                contentClassName
              )}
            >
              {content}
              {arrow && (
                <div
                  className={cn(
                    "absolute w-0 h-0 border-solid border-8",
                    variant.arrowStyles
                  )}
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Modal({
  open,
  onClose,
  children,
  className,
  closeOnOverlayClick = true,
  showCloseButton = true,
  size = "md",
  fullScreen = false,
  position = "center",
  slideFrom = "bottom",
}) {
  const [mounted, setMounted] = useState(false);
  
  // Only mount component on client
  useEffect(() => setMounted(true), []);

  // Close on escape key
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape' && open) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [open, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose();
    }
  };

  // Animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.2, delay: 0.1 } }
  };

  const getContentVariants = () => {
    if (position === "center") {
      return {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { 
          opacity: 1, 
          scale: 1,
          transition: { type: "spring", damping: 25, stiffness: 500 }
        },
        exit: { 
          opacity: 0, 
          scale: 0.95,
          transition: { duration: 0.2 } 
        }
      };
    }

    // For slide animations
    const directions = {
      top: { y: "-100%" },
      bottom: { y: "100%" },
      left: { x: "-100%" },
      right: { x: "100%" }
    };
    
    const slideDirection = directions[slideFrom];
    
    return {
      hidden: { ...slideDirection, opacity: 0 },
      visible: { 
        x: 0, 
        y: 0, 
        opacity: 1,
        transition: { type: "spring", damping: 30, stiffness: 400 }
      },
      exit: { 
        ...slideDirection, 
        opacity: 0,
        transition: { duration: 0.3, ease: "easeInOut" } 
      }
    };
  };

  const contentVariants = getContentVariants();

  // Modal size classes
  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
    "5xl": "max-w-5xl",
    full: "max-w-full",
  };

  // Position classes
  const positionClasses = {
    center: "items-center justify-center",
    top: "items-start justify-center pt-12",
    bottom: "items-end justify-center pb-12",
    "top-left": "items-start justify-start p-12",
    "top-right": "items-start justify-end p-12",
    "bottom-left": "items-end justify-start p-12",
    "bottom-right": "items-end justify-end p-12",
  };

  // Don't render on server
  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={overlayVariants}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex"
            onClick={handleOverlayClick}
          >
            <div className={`flex w-full ${positionClasses[position]}`}>
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={contentVariants}
                className={cn(
                  "bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-xl w-full mx-4 overflow-hidden z-50",
                  fullScreen ? "h-full max-h-full m-0 rounded-none" : "max-h-[90vh]",
                  !fullScreen && sizeClasses[size],
                  className
                )}
                onClick={(e) => e.stopPropagation()}
              >
                {showCloseButton && (
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    aria-label="Close dialog"
                  >
                    <X size={18} />
                  </button>
                )}
                {children}
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

export function ModalHeader({ className, children, ...props }) {
  return (
    <div
      className={cn("px-6 py-4 border-b border-gray-200 dark:border-gray-800", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function ModalBody({ className, children, ...props }) {
  return (
    <div
      className={cn("px-6 py-4 overflow-auto", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function ModalFooter({ className, children, ...props }) {
  return (
    <div
      className={cn("px-6 py-4 border-t border-gray-200 dark:border-gray-800 flex justify-end gap-3", className)}
      {...props}
    >
      {children}
    </div>
  );
}

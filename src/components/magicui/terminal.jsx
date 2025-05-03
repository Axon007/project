import React, { useEffect, useState, forwardRef, useRef } from "react";
import { cn } from "../../lib/utils";

/**
 * Terminal Component - A customizable terminal UI component
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Terminal content
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.title - Terminal window title
 * @param {boolean} props.showCursor - Whether to show the cursor animation
 * @param {string} props.prompt - Command line prompt character
 * @param {string} props.cursorStyle - Cursor style ('block' or 'line')
 * @param {React.Ref} ref - Forwarded ref
 */
const Terminal = forwardRef(
  (
    {
      children,
      className,
      title = "Jason Tech Solutions",
      showCursor = true,
      prompt = ">",
      cursorStyle = "line",
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-md border border-border/50 bg-background/90 shadow-2xl backdrop-blur-sm",
          className
        )}
        ref={ref}
        {...props}
      >
        <div className="bg-background/90 backdrop-blur-sm p-2 border-b border-border/50 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-xs text-foreground/60 px-2 py-1 bg-background/50 rounded flex-1 text-center">
            {title}
          </div>
        </div>
        <div className="p-6 bg-background/95 backdrop-blur-sm font-mono text-sm max-h-[400px] overflow-y-auto">
          {prompt && <span className="text-primary mr-2">{prompt}</span>}
          {children}
        </div>
        {showCursor && (
          <div className="absolute bottom-6 right-6 animate-pulse">
            <div
              className={cn(
                "bg-primary",
                cursorStyle === "block" ? "w-3 h-5" : "w-2 h-4",
                cursorStyle === "block" ? "rounded" : "rounded-full"
              )}
            ></div>
          </div>
        )}
      </div>
    );
  }
);

Terminal.displayName = "Terminal";

/**
 * Component that creates a typing effect for its children
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to be typed out
 * @param {number} props.delay - Delay in milliseconds before animation starts
 * @param {string} props.className - Custom CSS class for styling
 * @param {number} props.duration - Duration in milliseconds for each character typed
 * @param {React.ElementType} props.as - The component type to render
 * @param {boolean} props.showCursor - Whether to show typing cursor
 * @param {Function} props.onComplete - Callback when typing animation completes
 */
const TypingAnimation = ({
  children,
  delay = 0,
  className,
  duration = 100,
  as: Component = "span",
  showCursor = false,
  onComplete = () => {},
  ...props
}) => {
  const [displayedContent, setDisplayedContent] = useState("");
  const [currentChild, setCurrentChild] = useState(0);
  const [currentCharacter, setCurrentCharacter] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const childrenArray = React.Children.toArray(children);
  const childRef = useRef(null);

  useEffect(() => {
    if (!childrenArray.length) return;

    const timer = setTimeout(() => {
      if (currentChild >= childrenArray.length) {
        if (!isComplete) {
          setIsComplete(true);
          onComplete();
        }
        return;
      }

      const child = childrenArray[currentChild];
      let text = "";

      if (typeof child === "string" || typeof child === "number") {
        text = String(child);
      } else if (
        React.isValidElement(child) &&
        typeof child.props.children === "string"
      ) {
        text = child.props.children;
      } else {
        setCurrentChild(currentChild + 1);
        setCurrentCharacter(0);
        return;
      }

      if (currentCharacter < text.length) {
        setDisplayedContent((prev) => prev + text[currentCharacter]);
        setCurrentCharacter(currentCharacter + 1);
      } else {
        setCurrentChild(currentChild + 1);
        setCurrentCharacter(0);
        if (childRef.current) {
          childRef.current.style.visibility = "visible";
        }
      }
    }, currentCharacter === 0 ? delay : duration);

    return () => clearTimeout(timer);
  }, [childrenArray, currentChild, currentCharacter, delay, duration, isComplete, onComplete]);

  return (
    <Component className={cn("inline-block relative", className)} {...props}>
      {childrenArray.map((child, index) => {
        if (index > currentChild) {
          return null;
        }

        if (index === currentChild) {
          if (typeof child === "string" || typeof child === "number") {
            return (
              <span key={index}>
                {displayedContent}
                {showCursor && currentCharacter < String(child).length && (
                  <span className="inline-block w-2 h-4 bg-primary ml-1 animate-pulse"></span>
                )}
              </span>
            );
          } else if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              key: index,
              ref: childRef,
              style: { visibility: "hidden" },
            });
          }
        }

        return child;
      })}
    </Component>
  );
};

/**
 * Component that reveals its children after a specified delay
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to be animated
 * @param {number} props.delay - Delay in milliseconds before animation starts
 * @param {string} props.className - Custom CSS class for styling
 * @param {string} props.animation - Animation type ('fade', 'slide', 'scale')
 * @param {Function} props.onReveal - Callback when content is revealed
 */
const AnimatedSpan = ({
  children,
  delay = 0,
  className,
  animation = "fade",
  onReveal = () => {},
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      onReveal();
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, onReveal]);

  const getAnimationClass = () => {
    switch (animation) {
      case "slide":
        return isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0";
      case "scale":
        return isVisible ? "scale-100 opacity-100" : "scale-90 opacity-0";
      case "fade":
      default:
        return isVisible ? "opacity-100" : "opacity-0";
    }
  };

  return (
    <span
      className={cn(
        "inline-block transition-all duration-300",
        getAnimationClass(),
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export { Terminal, TypingAnimation, AnimatedSpan };
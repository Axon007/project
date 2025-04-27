import React, { useEffect, useState, forwardRef, useRef } from "react";
import { cn } from "../../lib/utils";

const Terminal = forwardRef(({ children, className, ...props }, ref) => {
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
        Jason Tech Solutions 
        </div>
      </div>
      <div className="p-6 bg-background/95 backdrop-blur-sm font-mono text-sm max-h-[400px] overflow-y-auto">
        {children}
      </div>
      <div className="absolute bottom-6 right-6 animate-pulse">
        <div className="w-2 h-4 bg-primary rounded-full"></div>
      </div>
    </div>
  );
});

Terminal.displayName = "Terminal";

const TypingAnimation = ({
  children,
  delay = 0,
  className,
  duration = 100,
  as: Component = "span",
  ...props
}) => {
  const [displayedContent, setDisplayedContent] = useState("");
  const [currentChild, setCurrentChild] = useState(0);
  const [currentCharacter, setCurrentCharacter] = useState(0);
  const childrenArray = React.Children.toArray(children);
  const childRef = useRef(null);

  useEffect(() => {
    if (!childrenArray.length) return;

    const timer = setTimeout(() => {
      if (currentChild >= childrenArray.length) {
        return;
      }

      const child = childrenArray[currentChild];
      let text = "";

      if (typeof child === "string" || typeof child === "number") {
        text = String(child);
      } else if (React.isValidElement(child) && typeof child.props.children === "string") {
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
  }, [childrenArray, currentChild, currentCharacter, delay, duration]);

  return (
    <Component className={cn("inline-block", className)} {...props}>
      {childrenArray.map((child, index) => {
        if (index > currentChild) {
          return null;
        }

        if (index === currentChild) {
          if (typeof child === "string" || typeof child === "number") {
            return displayedContent;
          } else if (React.isValidElement(child)) {
            return React.cloneElement(child, {
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

const AnimatedSpan = ({ children, delay = 0, className, ...props }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <span
      className={cn("inline-block", isVisible ? "opacity-100" : "opacity-0", className)}
      {...props}
    >
      {children}
    </span>
  );
};

export { Terminal, TypingAnimation, AnimatedSpan };
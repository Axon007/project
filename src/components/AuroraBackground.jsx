import { cn } from "../lib/utils";
import React from "react";
import { useThemeContext } from "./ThemeProvider";

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  intensity = 0.5, // 0-1 scale for intensity
  ...props
}) => {
  const { isDark } = useThemeContext();
  
  // Adjust colors based on theme
  const lightColors = {
    aurora: "repeating-linear-gradient(100deg,#3b82f6 10%,#a5b4fc 15%,#93c5fd 20%,#ddd6fe 25%,#60a5fa 30%)",
    gradient: "repeating-linear-gradient(100deg,#fff 0%,#fff 7%,transparent 10%,transparent 12%,#fff 16%)"
  };
  
  const darkColors = {
    aurora: "repeating-linear-gradient(100deg,#1d4ed8 10%,#4f46e5 15%,#3b82f6 20%,#7c3aed 25%,#2563eb 30%)",
    gradient: "repeating-linear-gradient(100deg,#000 0%,#000 7%,transparent 10%,transparent 12%,#000 16%)"
  };
  
  const colors = isDark ? darkColors : lightColors;
  const opacityValue = isDark ? intensity * 0.4 : intensity * 0.5; // Slightly lower opacity for dark mode

  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center",
        className
      )}
      {...props}
    >
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          "--aurora": colors.aurora,
          "--gradient": colors.gradient,
        }}
      >
        <div
          className={cn(
            `after:animate-aurora pointer-events-none absolute -inset-[10px] 
            [background-image:var(--gradient),var(--aurora)] 
            [background-size:300%,_200%] 
            [background-position:50%_50%,50%_50%] 
            blur-[10px] will-change-transform 
            after:absolute after:inset-0 
            after:[background-image:var(--gradient),var(--aurora)] 
            after:[background-size:200%,_100%] 
            after:[background-attachment:fixed] 
            after:mix-blend-difference 
            after:content-[""]`,
            showRadialGradient &&
              `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]`
          )}
          style={{
            opacity: opacityValue,
            filter: isDark ? 'invert(0)' : 'invert(0.1)',
          }}
        />
      </div>
      {children}
    </div>
  );
};
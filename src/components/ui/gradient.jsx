import React from "react";
import { cn } from "@/lib/utils";

export function GradientText({ 
  children,
  className, 
  from="from-primary", 
  via="via-secondary", 
  to="to-primary",
  animate = false
}) {
  return (
    <span 
      className={cn(
        "bg-clip-text text-transparent bg-gradient-to-r", 
        from, via, to,
        animate && "animate-text-gradient bg-size-200",
        className
      )}
    >
      {children}
    </span>
  );
}

export function GradientBorder({
  className,
  children,
  from = "from-primary",
  via = "via-secondary",
  to = "to-primary",
  borderWidth = "border-2",
  animate = false,
  ...props
}) {
  return (
    <div className="relative p-[1px] overflow-hidden group/gradient rounded-lg">
      <div
        className={cn(
          "absolute inset-0 rounded-lg bg-gradient-to-r",
          animate && "animate-border-gradient",
          from,
          via,
          to
        )}
      />
      <div
        className={cn(
          "relative h-full w-full rounded-[7px] bg-white dark:bg-slate-950",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </div>
  );
}

export function GradientBackground({
  className,
  children,
  from = "from-primary/20",
  via = "via-secondary/10",
  to = "to-primary/5",
  animate = false,
  ...props
}) {
  return (
    <div
      className={cn(
        "bg-gradient-to-br",
        from,
        via,
        to,
        animate && "animate-bg-gradient bg-size-200",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

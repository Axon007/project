import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { GradientText } from "./gradient";

export default function SectionHeader({
  title,
  subtitle,
  badge,
  align = "center",
  className,
  titleClassName,
  subtitleClassName,
  badgeClassName,
  fadeIn = true,
  withLine = true,
}) {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const alignmentClasses = {
    center: "text-center mx-auto",
    left: "text-left",
    right: "text-right ml-auto",
  };

  const Component = fadeIn ? motion.div : "div";
  const ComponentProps = fadeIn ? {
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true },
    variants: containerVariants
  } : {};

  const ChildComponent = fadeIn ? motion.div : "div";
  const childProps = fadeIn ? {
    variants: itemVariants
  } : {};

  return (
    <Component 
      className={cn("max-w-3xl mb-16", alignmentClasses[align], className)}
      {...ComponentProps}
    >
      {badge && (
        <ChildComponent {...childProps}>
          <span className={cn(
            "inline-block px-4 py-1.5 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary",
            badgeClassName
          )}>
            {badge}
          </span>
        </ChildComponent>
      )}
      
      <ChildComponent {...childProps}>
        <h2 className={cn(
          "text-3xl md:text-4xl font-bold mb-4 tracking-tight",
          titleClassName
        )}>
          {title}
        </h2>
      </ChildComponent>
      
      {withLine && (
        <ChildComponent {...childProps}>
          <div className={cn(
            "h-1 w-12 bg-primary rounded-full mb-6",
            align === "center" && "mx-auto",
            align === "right" && "ml-auto"
          )} />
        </ChildComponent>
      )}
      
      {subtitle && (
        <ChildComponent {...childProps}>
          <p className={cn(
            "text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed",
            subtitleClassName
          )}>
            {subtitle}
          </p>
        </ChildComponent>
      )}
    </Component>
  );
}

export function AdvancedSectionHeader({
  title,
  subtitle,
  badge,
  gradientTitle = true,
  align = "center",
  className,
}) {
  const gradientFrom = "from-primary";
  const gradientVia = "via-blue-500";
  const gradientTo = "to-secondary";
  
  return (
    <div className={cn("max-w-4xl mb-16", 
      align === "center" && "text-center mx-auto",
      align === "left" && "text-left",
      align === "right" && "text-right ml-auto",
      className
    )}>
      {badge && (
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full 
                   bg-primary/10 text-primary"
        >
          {badge}
        </motion.span>
      )}
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
      >
        {gradientTitle ? (
          <GradientText
            from={gradientFrom}
            via={gradientVia}
            to={gradientTo}
            className="text-3xl md:text-5xl font-bold tracking-tight mb-6"
          >
            {title}
          </GradientText>
        ) : (
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            {title}
          </h2>
        )}
      </motion.div>
      
      {subtitle && (
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

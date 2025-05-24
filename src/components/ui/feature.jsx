import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export function FeatureIcon({ icon, className }) {
  return (
    <div className={cn(
      "w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center",
      className
    )}>
      {icon}
    </div>
  );
}

export function Feature({
  icon,
  title,
  description,
  className,
  iconClassName,
  fadeIn = true,
}) {
  const Component = fadeIn ? motion.div : "div";
  const componentProps = fadeIn
    ? {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5 }
      }
    : {};

  return (
    <Component 
      className={cn("flex gap-4", className)}
      {...componentProps}
    >
      {icon && (
        <FeatureIcon
          icon={icon}
          className={iconClassName}
        />
      )}
      <div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400">{description}</p>
      </div>
    </Component>
  );
}

export function FeatureList({
  items = [],
  className,
  compact = false,
}) {
  return (
    <ul className={cn("space-y-3", className)}>
      {items.map((item, index) => (
        <motion.li
          key={index}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
          viewport={{ once: true }}
          className="flex items-start gap-2"
        >
          <span className="rounded-full p-1 text-white bg-primary mt-0.5 flex-shrink-0">
            <Check size={compact ? 12 : 14} />
          </span>
          {compact ? (
            <span className="text-sm">{item}</span>
          ) : (
            <span>{item}</span>
          )}
        </motion.li>
      ))}
    </ul>
  );
}

export function FeatureGrid({
  features,
  columns = 3,
  className,
}) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={cn(
      "grid gap-8",
      gridCols[columns],
      className
    )}>
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
        >
          <Feature {...feature} fadeIn={false} />
        </motion.div>
      ))}
    </div>
  );
}

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function StatCard({
  value,
  label,
  icon,
  description,
  color = "blue",
  className,
  withAnimation = true,
}) {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const Component = withAnimation ? motion.div : "div";
  const componentProps = withAnimation
    ? {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true },
        variants: containerVariants,
      }
    : {};

  const colorClasses = {
    blue: "text-blue-500 bg-blue-50 dark:bg-blue-500/10",
    purple: "text-purple-500 bg-purple-50 dark:bg-purple-500/10",
    green: "text-green-500 bg-green-50 dark:bg-green-500/10",
    amber: "text-amber-500 bg-amber-50 dark:bg-amber-500/10",
    red: "text-red-500 bg-red-50 dark:bg-red-500/10",
    gray: "text-gray-500 bg-gray-50 dark:bg-gray-500/10",
    indigo: "text-indigo-500 bg-indigo-50 dark:bg-indigo-500/10",
  };

  const iconColorClass = colorClasses[color] || colorClasses.blue;

  return (
    <Component
      className={cn(
        "flex flex-col gap-4 rounded-xl p-6 bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800",
        className
      )}
      {...componentProps}
    >
      {icon && (
        <div
          className={cn(
            "w-12 h-12 rounded-lg flex items-center justify-center",
            iconColorClass
          )}
        >
          {icon}
        </div>
      )}

      <div>
        <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
          {value}
        </div>
        <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {label}
        </div>
        {description && (
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-500">
            {description}
          </div>
        )}
      </div>
    </Component>
  );
}

export function StatsGrid({
  stats,
  className,
  columns = 4,
  fadeDirection = "up",
}) {
  const gridClass = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  const getAnimationVariants = (index) => {
    const delay = index * 0.1;
    
    switch (fadeDirection) {
      case "up":
        return {
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { delay, duration: 0.5 },
          },
        };
      case "down":
        return {
          hidden: { opacity: 0, y: -20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { delay, duration: 0.5 },
          },
        };
      case "left":
        return {
          hidden: { opacity: 0, x: 20 },
          visible: {
            opacity: 1,
            x: 0,
            transition: { delay, duration: 0.5 },
          },
        };
      case "right":
        return {
          hidden: { opacity: 0, x: -20 },
          visible: {
            opacity: 1,
            x: 0,
            transition: { delay, duration: 0.5 },
          },
        };
      default:
        return {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { delay, duration: 0.5 },
          },
        };
    }
  };

  return (
    <div
      className={cn("grid gap-6", gridClass[columns], className)}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          variants={getAnimationVariants(index)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <StatCard {...stat} withAnimation={false} />
        </motion.div>
      ))}
    </div>
  );
}

export function SimpleStat({ value, label, className }) {
  return (
    <div className={cn("text-center", className)}>
      <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-1">
        {value}
      </div>
      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {label}
      </div>
    </div>
  );
}

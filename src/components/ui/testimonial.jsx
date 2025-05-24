import React from "react";
import { motion } from "framer-motion";
import { Star, Quote, User } from "lucide-react";
import { cn } from "@/lib/utils";

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut"
    }
  }
};

export function TestimonialCard({
  text,
  author,
  role,
  company,
  image,
  rating = 5,
  className,
  variant = "default"
}) {
  // Generate stars based on rating
  const stars = Array(5).fill(0).map((_, i) => (
    <Star
      key={i}
      size={14}
      className={cn(
        "fill-current",
        i < rating ? "text-amber-400" : "text-gray-300 dark:text-gray-600"
      )}
    />
  ));

  const cardStyles = {
    default: "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800",
    glass: "bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border border-gray-200/50 dark:border-gray-800/50",
    minimal: "bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800",
    featured: "bg-primary/5 dark:bg-primary/10 border border-primary/20 dark:border-primary/30"
  };

  return (
    <motion.div
      variants={variants}
      className={cn(
        "rounded-2xl p-6 flex flex-col h-full relative",
        cardStyles[variant],
        className
      )}
    >
      {/* Optional quote icon */}
      <Quote className="absolute top-6 right-6 w-8 h-8 text-gray-200 dark:text-gray-800 opacity-40" />
      
      {/* Star rating */}
      <div className="flex gap-1 mb-4">{stars}</div>
      
      {/* Testimonial text */}
      <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">"{text}"</p>
      
      {/* Author information */}
      <div className="flex items-center gap-3 mt-auto">
        {image ? (
          <img
            src={image}
            alt={author}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
            <User className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </div>
        )}
        <div>
          <p className="font-medium text-gray-900 dark:text-gray-100">{author}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {role}{company && `, ${company}`}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function TestimonialGrid({ testimonials, className }) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", className)}>
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={index}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                delay: index * 0.1,
                duration: 0.5,
                ease: "easeInOut"
              }
            },
            hidden: { opacity: 0, y: 20 }
          }}
        >
          <TestimonialCard
            {...testimonial}
            variant={index === 1 ? "featured" : "default"}
          />
        </motion.div>
      ))}
    </div>
  );
}

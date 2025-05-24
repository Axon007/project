import * as React from "react"
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils"

const cardVariants = cva(
  "group relative overflow-hidden transition-all duration-300",
  {
    variants: {
      variant: {
        default:
          "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800",
        glass: 
          "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50",
        subtle:
          "bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800",
        ghost:
          "border border-transparent hover:border-slate-200 dark:hover:border-slate-800",
        outline:
          "border border-slate-200 dark:border-slate-800 bg-transparent",
        feature:
          "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-feature dark:shadow-feature-dark"
      },
      radius: {
        none: "",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        "2xl": "rounded-2xl",
        "3xl": "rounded-3xl",
        full: "rounded-full"
      },
      shadow: {
        none: "",
        sm: "shadow-sm",
        md: "shadow-md",
        lg: "shadow-lg",
        xl: "shadow-xl"
      },
      hover: {
        none: "",
        raise: "hover:-translate-y-1",
        glow: "hover:shadow-glow dark:hover:shadow-glow-dark",
        border: "hover:border-primary/50 dark:hover:border-primary/50",
        scale: "hover:scale-[1.02]",
      }
    },
    defaultVariants: {
      variant: "default",
      radius: "lg",
      shadow: "none",
      hover: "none"
    },
  }
)

const Card = React.forwardRef(({ 
  className, 
  variant, 
  radius, 
  shadow,
  hover,
  children,
  ...props 
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, radius, shadow, hover, className }))}
      {...props}
    >
      {children}
    </div>
  )
})
Card.displayName = "Card"

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-xl font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-slate-500 dark:text-slate-400", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }

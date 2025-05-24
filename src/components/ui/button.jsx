import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/30 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-300",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-white shadow-sm hover:shadow-md hover:shadow-primary/20 hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-sm hover:shadow-md hover:shadow-destructive/20 hover:bg-destructive/90",
        outline:
          "border-2 border-primary/30 bg-transparent text-primary hover:bg-primary/10 hover:border-primary/50",
        secondary:
          "bg-secondary/10 text-secondary shadow-sm hover:bg-secondary/20",
        ghost: "hover:bg-accent/10 hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        gradient: "bg-gradient-to-r from-primary to-secondary text-white shadow-md hover:shadow-lg hover:shadow-primary/20"
      },
      size: {
        default: "h-10 px-5 py-2.5 rounded-lg",
        sm: "h-9 rounded-lg px-4 py-2 text-xs",
        lg: "h-12 rounded-xl px-8 py-3 text-base",
        icon: "h-10 w-10 rounded-lg",
        pill: "rounded-full"
      },
      animation: {
        none: "",
        grow: "transform-gpu hover:scale-105 active:scale-95",
        slideIcon: "group-hover:[&_svg]:translate-x-0.5",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ 
  className, 
  variant, 
  size, 
  animation = "none",
  asChild = false, 
  ...props 
}, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    (<Comp
      className={cn(buttonVariants({ variant, size, animation, className }))}
      ref={ref}
      {...props} />)
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }

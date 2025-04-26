import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const AnimatedSubscribeButton = ({
  subscribeStatus = false,
  children,
  className,
  ...props
}) => {
  // Ensure children is an array to access first and second child
  const childrenArray = Array.isArray(children) ? children : [children, null];

  return (
    <motion.button
      initial={{ backgroundColor: subscribeStatus ? "#10b981" : "#0070F3" }}
      animate={{ backgroundColor: subscribeStatus ? "#10b981" : "#0070F3" }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "relative w-full overflow-hidden rounded-xl px-6 py-3 text-white font-medium shadow-lg transition-all duration-300",
        className
      )}
      {...props}
    >
      <div className="relative z-10 flex items-center justify-center gap-2">
        <motion.span
          initial={{ opacity: subscribeStatus ? 0 : 1, y: subscribeStatus ? -20 : 0 }}
          animate={{ opacity: subscribeStatus ? 0 : 1, y: subscribeStatus ? -20 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {childrenArray[0]}
        </motion.span>
        <motion.span
          initial={{ opacity: subscribeStatus ? 1 : 0, y: subscribeStatus ? 0 : 20 }}
          animate={{ opacity: subscribeStatus ? 1 : 0, y: subscribeStatus ? 0 : 20 }}
          transition={{ duration: 0.3 }}
          className="absolute"
        >
          {childrenArray[1]}
        </motion.span>
      </div>
    </motion.button>
  );
};
import React, { useState } from "react";
import { motion } from "framer-motion";
import { BentoGrid, BentoGridItem } from "../components/ui/bento-grid";
import { cn } from "../lib/utils";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconCloudComputing,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";

export function BentoGridThirdDemo() {
  return (
    <BentoGrid className="mx-auto w-full auto-rows-fr md:auto-rows-[20rem]">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={cn("[&>img]:hover:scale-105 [&>img]:transition-all", item.className)}
          icon={item.icon}
        />
      ))}
    </BentoGrid>
  );
}

const Skeleton = ({ className }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={cn(
        "h-full w-full rounded-xl bg-neutral-100 dark:bg-neutral-900",
        isLoaded ? "animate-none" : "animate-pulse",
        className
      )}
    />
  );
};

const SkeletonOne = () => {
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  };
  
  const variantsSecond = {
    initial: {
      x: 0,
    },
    animate: {
      x: -10,
      rotate: -5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex h-full w-full flex-col space-y-2"
    >
      <motion.div
        variants={variants}
        className="flex-1 w-full rounded-xl bg-gradient-to-br from-neutral-200 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800"
      />
      <motion.div
        variants={variantsSecond}
        className="flex-1 w-full rounded-xl bg-gradient-to-br from-neutral-200 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800"
      />
    </motion.div>
  );
};

const SkeletonTwo = () => {
  const variants = {
    initial: {
      width: 0,
    },
    animate: {
      width: "100%",
      transition: {
        duration: 0.2,
      },
    },
    hover: {
      y: -5,
      x: 0,
      transition: {
        duration: 0.2,
      },
    },
  };
  
  const variantsSecond = {
    initial: {
      width: 0,
    },
    animate: {
      width: "70%",
      transition: {
        duration: 0.2,
      },
    },
    hover: {
      y: 5,
      x: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex h-full w-full flex-col justify-center"
    >
      <div className="flex-1 flex items-center">
        <motion.div
          variants={variants}
          className="h-4 w-full rounded-full bg-gradient-to-r from-neutral-100 to-neutral-800 dark:from-neutral-900 dark:to-neutral-200"
        />
      </div>
      <div className="mt-4 flex-1 flex items-center">
        <motion.div
          variants={variantsSecond}
          className="h-4 w-full rounded-full bg-gradient-to-r from-neutral-100 to-neutral-800 dark:from-neutral-900 dark:to-neutral-200"
        />
      </div>
    </motion.div>
  );
};

const SkeletonThree = () => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
      transition: {
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  };
  
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      className="h-full w-full rounded-xl bg-gradient-to-r from-neutral-100 via-neutral-200 to-neutral-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900"
    />
  );
};

const SkeletonFour = () => {
  const variants = {
    initial: {
      x: 0,
      y: 0,
    },
    animate: {
      x: [0, 5, 0, -5, 0],
      y: [0, 5, 0, -5, 0],
      transition: {
        duration: 10,
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  };
  
  return (
    <motion.div className="flex h-full w-full items-center justify-center rounded-xl bg-gradient-to-br from-neutral-100 to-neutral-300 dark:from-neutral-900 dark:to-neutral-700">
      <motion.div
        initial="initial"
        animate="animate"
        variants={variants}
        className="h-1/2 w-1/2 rounded-full bg-gradient-to-br from-neutral-600 to-neutral-500 dark:from-neutral-200 dark:to-neutral-400"
      />
    </motion.div>
  );
};

const SkeletonFive = () => {
  const variants = {
    initial: {
      opacity: 1,
    },
    animate: {
      opacity: [1, 0.5, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  };
  
  return (
    <motion.div className="flex h-full w-full items-center justify-center rounded-xl overflow-hidden">
      <motion.div
        initial="initial"
        animate="animate"
        variants={variants}
        className="h-full w-full bg-[url('https://images.unsplash.com/photo-1579546929662-711aa81148cf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover"
      />
    </motion.div>
  );
};

const SkeletonSix = () => {
  const variants = {
    initial: {
      rotate: 0,
      scale: 1,
    },
    animate: {
      rotate: 360,
      scale: [1, 1.1, 1],
      transition: {
        duration: 10,
        repeat: Infinity,
        repeatType: "loop",
      },
    },
  };
  
  return (
    <motion.div className="flex h-full w-full items-center justify-center rounded-xl overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-900 dark:to-neutral-800">
      <motion.div
        initial="initial"
        animate="animate"
        variants={variants}
        className="h-1/2 w-1/2 bg-gradient-to-br from-indigo-500 to-blue-500"
        style={{
          borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
        }}
      />
    </motion.div>
  );
};

const SkeletonSeven = () => {
  const variants = {
    initial: {
      opacity: 0,
      x: -40,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
    hover: {
      scale: 1.1,
    },
  };
  
  return (
    <div className="grid grid-cols-3 gap-2 h-full w-full">
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={`skeleton-seven-${i}`}
          initial="initial"
          whileInView="animate"
          whileHover="hover"
          variants={variants}
          className="rounded-md bg-neutral-200 h-full w-full dark:bg-neutral-800"
          style={{
            transformOrigin: "center bottom",
          }}
        />
      ))}
    </div>
  );
};

const items = [
  {
    title: "Responsive Design",
    description: "Elegantly crafted components that adapt to any device size for the best user experience.",
    header: <SkeletonOne />,
    className: "col-span-1",
    icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Fluid Animations",
    description: "Smooth transitions and animations that enhance user interaction and engagement.",
    header: <SkeletonTwo />,
    className: "col-span-1 md:col-span-2",
    icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Cloud Infrastructure",
    description: "Scalable and reliable cloud architecture that grows with your business needs.",
    header: <SkeletonThree />,
    className: "col-span-1 sm:col-span-2",
    icon: <IconCloudComputing className="h-4 w-4 text-neutral-500" />,
  },  {
    title: "Data Analytics",
    description: "Comprehensive analysis of user behavior and system performance metrics.",
    header: <SkeletonFour />,
    className: "col-span-1",
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Visual Design",
    description: "Beautiful and intuitive interfaces that enhance the user experience.",
    header: <SkeletonFive />,
    className: "col-span-1",
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Innovative Solutions",
    description: "Cutting-edge technology solutions that set your business apart from the competition.",
    header: <SkeletonSix />,
    className: "col-span-1",
    icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Error Recovery",
    description: "Robust error handling and recovery systems to ensure business continuity.",
    header: <SkeletonSeven />,
    className: "col-span-1 sm:col-span-2",
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
];

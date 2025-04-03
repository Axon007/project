import React, { useId } from "react";

export function GridFeatures() {
  return (
    <div className="py-20 lg:py-40">
      <div className="px-4 mb-12 text-center">
        <h2 className="text-3xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500 mb-4">
          Enterprise-Grade Features
        </h2>
        <p className="text-foreground/70 max-w-2xl mx-auto">
          Our platform provides comprehensive solutions with enterprise-level security and scalability.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 md:gap-2 max-w-7xl mx-auto px-4">
        {grid.map((feature) => (
          <div
            key={feature.title}
            className="relative bg-gradient-to-b from-secondary/30 to-background p-6 rounded-3xl overflow-hidden border border-secondary/30 hover:border-primary/30 transition-all group"
          >
            <Grid size={20} />
            <p className="text-base font-bold text-foreground relative z-20">
              {feature.title}
            </p>
            <p className="text-foreground/70 mt-4 text-base font-normal relative z-20">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

const grid = [
  {
    title: "HIPAA and SOC2 Compliant",
    description: "Our applications are HIPAA and SOC2 compliant, your data is safe with us, always.",
  },
  {
    title: "Automated Solutions",
    description: "Schedule and automate your business processes across multiple platforms to save time and maintain consistency.",
  },
  {
    title: "Advanced Analytics",
    description: "Gain insights into your performance with detailed analytics and reporting tools to measure ROI.",
  },
  {
    title: "Content Management",
    description: "Plan and organize your content with an intuitive management system, ensuring efficiency.",
  },
  {
    title: "Audience Targeting",
    description: "Reach the right audience with advanced targeting options, including demographics and behaviors.",
  },
  {
    title: "Real-time Monitoring",
    description: "Monitor systems and trends to stay informed and respond in real-time to any situations.",
  },
  {
    title: "Customizable Templates",
    description: "Create stunning solutions with our customizable templates, designed to fit your brand.",
  },
  {
    title: "Collaboration Tools",
    description: "Work seamlessly with your team using our collaboration tools for maximum productivity.",
  },
];

export const Grid = ({ pattern, size }) => {
  const p = pattern ?? [
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
  ];
  
  return (
    <div className="pointer-events-none absolute left-1/2 top-0 -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
      <div className="absolute inset-0 bg-gradient-to-r [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-primary/5 from-primary/5 to-blue-500/5 dark:to-blue-500/5 opacity-100">
        <GridPattern
          width={size ?? 20}
          height={size ?? 20}
          x="-12"
          y="4"
          squares={p}
          className="absolute inset-0 h-full w-full mix-blend-overlay dark:fill-white/10 dark:stroke-white/10 stroke-black/10 fill-black/10"
        />
      </div>
    </div>
  );
};

export function GridPattern({ width, height, x, y, squares, ...props }) {
  const patternId = useId();

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([x, y]) => (
            <rect
              strokeWidth="0"
              key={`${x}-${y}`}
              width={width + 1}
              height={height + 1}
              x={x * width}
              y={y * height}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}
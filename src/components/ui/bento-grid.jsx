import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children
}) => {
  return (
    (<div
      className={cn(
        "mx-auto grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 auto-rows-fr md:auto-rows-[18rem]",
        className
      )}>
      {children}
    </div>)
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon
}) => {
  return (
    (<div
      className={cn(
        "group/bento shadow-input h-full flex flex-col justify-between rounded-xl border border-neutral-200 bg-white p-5 transition duration-200 hover:shadow-xl dark:border-white/[0.2] dark:bg-black dark:shadow-none",
        className
      )}>
      <div className="flex-1 overflow-hidden mb-4 flex items-center justify-center">
        {header}
      </div>
      <div className="transition duration-200 group-hover/bento:translate-x-2 mt-auto">
        {icon && <div className="mb-1">{icon}</div>}
        <div
          className="mt-1 mb-2 font-sans font-bold text-neutral-600 dark:text-neutral-200">
          {title}
        </div>
        <div
          className="font-sans text-xs font-normal text-neutral-600 dark:text-neutral-300">
          {description}
        </div>
      </div>
    </div>)
  );
};

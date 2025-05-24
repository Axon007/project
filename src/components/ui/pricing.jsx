import React from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { GradientBorder } from "./gradient";

export function PricingCard({
  title,
  price,
  description,
  features,
  ctaText = "Choose Plan",
  ctaUrl = "#",
  popular = false,
  className,
  theme = "light",
  yearly = false,
  priceId
}) {
  const formatPrice = (price) => {
    if (typeof price === "string") return price;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <motion.div
      whileHover={popular ? { scale: 1.02 } : { scale: 1.01 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        "relative flex flex-col h-full rounded-2xl overflow-hidden",
        popular
          ? "shadow-xl border-primary/20"
          : "border border-gray-200 dark:border-gray-800",
        className
      )}
    >
      {popular && (
        <div className="absolute top-0 right-0 bg-primary text-white text-xs font-medium px-3 py-1 rounded-bl-md">
          Most Popular
        </div>
      )}

      <div className="p-6 md:p-8 flex flex-col h-full">
        <div className="mb-6">
          <h3 className={cn(
            "text-xl font-semibold mb-2",
            popular ? "text-primary" : "text-gray-900 dark:text-gray-100"
          )}>
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
            {description}
          </p>

          <div className="flex items-baseline mb-4">
            <span className="text-3xl md:text-4xl font-bold">
              {formatPrice(yearly && price.annually ? price.annually : price.monthly)}
            </span>
            <span className="text-gray-600 dark:text-gray-400 text-sm ml-2">
              {yearly ? "/year" : "/month"}
            </span>
          </div>
        </div>

        <div className="mb-6">
          <ul className="space-y-3 flex-grow mb-6">
            {features.map((feature, i) => {
              const included = typeof feature === "string" || feature.included;
              const featureText = typeof feature === "string" ? feature : feature.text;

              return (
                <li key={i} className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 mt-1">
                    {included ? (
                      <Check className={cn(
                        "w-5 h-5",
                        popular ? "text-primary" : "text-green-500"
                      )} />
                    ) : (
                      <X className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                  <span className={cn(
                    "text-sm ml-3",
                    included
                      ? "text-gray-700 dark:text-gray-300"
                      : "text-gray-500 dark:text-gray-500 line-through"
                  )}>
                    {featureText}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-auto pt-6">
          {popular ? (
            <Button
              className="w-full"
              variant="gradient"
              animation="grow"
              size="lg"
              href={ctaUrl}
              data-price-id={priceId}
            >
              {ctaText}
            </Button>
          ) : (
            <Button
              className="w-full"
              variant={theme === "light" ? "outline" : "secondary"}
              animation="grow"
              size="lg"
              href={ctaUrl}
              data-price-id={priceId}
            >
              {ctaText}
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function PricingTable({
  plans,
  className,
  columns = 3,
  yearly = false,
}) {
  const gridClass = {
    1: "grid-cols-1",
    2: "grid-cols-1 lg:grid-cols-2",
    3: "grid-cols-1 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={cn(
      "grid gap-6",
      gridClass[columns],
      className
    )}>
      {plans.map((plan, index) => (
        <PricingCard
          key={plan.title}
          {...plan}
          yearly={yearly}
        />
      ))}
    </div>
  );
}

export function PricingToggle({ yearly, setYearly }) {
  return (
    <div className="flex items-center justify-center mb-8 space-x-3">
      <span className={cn(
        "text-sm font-medium transition-colors",
        !yearly ? "text-primary" : "text-gray-600 dark:text-gray-400"
      )}>
        Monthly
      </span>
      
      <button 
        onClick={() => setYearly(prev => !prev)}
        className="relative inline-flex h-6 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 dark:bg-gray-700 transition-colors duration-200 ease-in-out focus:outline-none"
        role="switch"
        aria-checked={yearly}
      >
        <span 
          className={cn(
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
            yearly ? "translate-x-6" : "translate-x-0"
          )}
        />
      </button>
      
      <span className={cn(
        "inline-flex items-center text-sm font-medium transition-colors",
        yearly ? "text-primary" : "text-gray-600 dark:text-gray-400"
      )}>
        Yearly
        <span className="ml-1.5 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
          Save 20%
        </span>
      </span>
    </div>
  );
}

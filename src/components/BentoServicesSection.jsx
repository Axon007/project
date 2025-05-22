import React from "react";
import { BentoGridThirdDemo } from "./BentoGridThirdDemo";

const BentoServicesSection = () => {
  return (
    <div className="w-full mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Our Services</h2>
        <p className="text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
          Explore our range of innovative solutions designed to elevate your business
          to new heights with cutting-edge technology.
        </p>
      </div>
      
      <BentoGridThirdDemo />
    </div>
  );
};

export default BentoServicesSection;
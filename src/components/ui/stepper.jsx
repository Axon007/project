import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';

const Step = ({ children, title, description }) => {
  return (
    <div className="step-content">
      {title && <h3 className="text-xl font-semibold mb-2 text-foreground">{title}</h3>}
      {description && <p className="text-foreground/70 mb-4">{description}</p>}
      {children}
    </div>
  );
};

const Stepper = ({
  children,
  initialStep = 1,
  onStepChange = () => {},
  onFinalStepCompleted = () => {},
  stepCircleContainerClassName = "",
  stepContainerClassName = "",
  contentClassName = "",
  footerClassName = "",
  backButtonProps = {},
  nextButtonProps = {},
  backButtonText = "Back",
  nextButtonText = "Continue",
  disableStepIndicators = false,
  renderStepIndicator
}) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const steps = React.Children.toArray(children);
  const totalSteps = steps.length;

  useEffect(() => {
    onStepChange(currentStep);
  }, [currentStep, onStepChange]);

  const goToStep = (step) => {
    if (disableStepIndicators) return;
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step);
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onFinalStepCompleted();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const defaultStepIndicator = (step, index) => {
    const isActive = currentStep === step;
    const isCompleted = currentStep > step;
    
    return (
      <motion.button
        key={step}
        onClick={() => goToStep(step)}
        disabled={disableStepIndicators}
        className={`
          relative w-12 h-12 rounded-full flex items-center justify-center font-semibold text-sm
          transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary/20
          ${disableStepIndicators ? 'cursor-default' : 'cursor-pointer'}
          ${isActive 
            ? 'bg-primary text-white shadow-lg shadow-primary/30 ring-4 ring-primary/20' 
            : isCompleted 
            ? 'bg-green-500 text-white shadow-md shadow-green-500/20' 
            : 'bg-gray-200 text-gray-600 hover:bg-gray-300 hover:shadow-md'
          }
        `}
        whileHover={!disableStepIndicators ? { scale: 1.05 } : {}}
        whileTap={!disableStepIndicators ? { scale: 0.95 } : {}}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
      >
        <AnimatePresence mode="wait">
          {isCompleted ? (
            <motion.div
              key="check"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <Check className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.span
              key="number"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.2 }}
            >
              {step}
            </motion.span>
          )}
        </AnimatePresence>
        
        {isActive && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary"
            initial={{ scale: 1, opacity: 0 }}
            animate={{ scale: 1.3, opacity: [0, 1, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </motion.button>
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Step Indicators */}
      <div className={`flex items-center justify-center mb-12 ${stepCircleContainerClassName}`}>
        <div className={`flex items-center ${stepContainerClassName}`}>
          {steps.map((_, index) => {
            const step = index + 1;
            return (
              <React.Fragment key={step}>
                {renderStepIndicator 
                  ? renderStepIndicator(step, index, currentStep)
                  : defaultStepIndicator(step, index)
                }
                
                {/* Connector Line */}
                {index < totalSteps - 1 && (
                  <div className="mx-4">
                    <motion.div 
                      className="h-1 w-20 bg-gray-200 rounded-full relative overflow-hidden"
                      initial={{ width: 0 }}
                      animate={{ width: 80 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-primary to-purple-500 rounded-full"
                        initial={{ width: "0%" }}
                        animate={{ 
                          width: currentStep > step ? "100%" : "0%" 
                        }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                      />
                    </motion.div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <div className={`min-h-[400px] ${contentClassName}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 30, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -30, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full"
          >
            {steps[currentStep - 1]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Footer */}
      <div className={`flex justify-between items-center pt-8 border-t border-border/50 ${footerClassName}`}>
        <motion.button
          onClick={prevStep}
          disabled={currentStep === 1}
          className={`
            px-6 py-3 rounded-xl font-medium transition-all duration-300
            flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed
            bg-secondary text-foreground hover:bg-secondary/80 disabled:hover:bg-secondary
            border border-border shadow-sm hover:shadow-md
          `}
          whileHover={currentStep > 1 ? { scale: 1.02, y: -1 } : {}}
          whileTap={currentStep > 1 ? { scale: 0.98 } : {}}
          {...backButtonProps}
        >
          <ChevronLeft className="w-4 h-4" />
          {backButtonText}
        </motion.button>

        <div className="flex items-center gap-3 text-sm">
          <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
            <span className="font-semibold text-primary">{currentStep}</span>
            <span className="text-foreground/60">of</span>
            <span className="font-semibold text-foreground">{totalSteps}</span>
          </div>
        </div>

        <motion.button
          onClick={nextStep}
          className={`
            px-6 py-3 rounded-xl font-medium transition-all duration-300
            flex items-center gap-2 bg-primary text-white hover:bg-primary/90
            shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30
          `}
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
          {...nextButtonProps}
        >
          {currentStep === totalSteps ? 'Complete' : nextButtonText}
          <ChevronRight className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  );
};

Stepper.Step = Step;

export { Stepper, Step }; 
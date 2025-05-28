import React from 'react';
import { cn } from '../../../utils/cn';
import { Check } from 'lucide-react';
import { useUserOnboarding } from './UserOnboardingContext';

const steps = [
  { id: 1, title: 'Account Setup' },
  { id: 2, title: 'Personal Info' },
  { id: 3, title: 'Address' },
  { id: 4, title: 'Medical History' },
  { id: 5, title: 'Family History' },
  { id: 6, title: 'Health Goals' },
  { id: 7, title: 'Review & Submit' },
];

export function OnboardingSteps() {
  const { currentStep, isStepComplete } = useUserOnboarding();

  return (
    <div className="mb-8 overflow-x-auto">
      <div className="flex min-w-max">
        {steps.map((step, index) => {
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep || isStepComplete(step.id);
          const isLastStep = index === steps.length - 1;

          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center">
                <div className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full transition-colors",
                  isCompleted ? "bg-primary-600 text-white" : isActive ? "bg-primary-100 text-primary-600 border-2 border-primary-600" : "bg-gray-100 text-gray-400"
                )}>
                  {isCompleted ? (
                    <Check size={20} />
                  ) : (
                    <span className="text-sm font-medium">{step.id}</span>
                  )}
                </div>
                <span className={cn(
                  "mt-2 text-xs font-medium transition-colors whitespace-nowrap",
                  isActive ? "text-primary-600" : isCompleted ? "text-gray-800" : "text-gray-400"
                )}>
                  {step.title}
                </span>
              </div>
              
              {!isLastStep && (
                <div className="relative flex-1 mx-2">
                  <div className={cn(
                    "absolute top-5 h-0.5 w-full transition-colors",
                    isCompleted ? "bg-primary-600" : "bg-gray-200"
                  )} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
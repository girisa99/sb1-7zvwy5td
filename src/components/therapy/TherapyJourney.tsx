import React from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, ChevronRight, AlertTriangle, CheckCircle2, 
  Beaker, Microscope, Dna, Flask, Activity, HeartPulse,
  Syringe, ClipboardCheck, FileText, User
} from 'lucide-react';

interface JourneyStep {
  stage: string;
  description: string;
  duration: string;
  keyPoints: string[];
  icon?: React.ReactNode;
  substeps?: {
    title: string;
    description: string;
    duration: string;
    tasks: string[];
  }[];
  riskLevel?: 'low' | 'medium' | 'high';
  specialRequirements?: string[];
}

interface TherapyJourneyProps {
  journeySteps: JourneyStep[];
  therapyType: string;
  totalDuration: string;
}

export function TherapyJourney({ journeySteps, therapyType, totalDuration }: TherapyJourneyProps) {
  return (
    <div className="space-y-8">
      {/* Journey Overview */}
      <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Treatment Journey Overview
            </h3>
            <p className="text-gray-600">
              Complete treatment timeline for {therapyType}
            </p>
          </div>
          <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm">
            <Clock className="w-5 h-5 text-primary-600 mr-2" />
            <span className="text-sm font-medium text-gray-900">
              Estimated Total Duration: {totalDuration}
            </span>
          </div>
        </div>
      </div>

      {/* Journey Timeline */}
      <div className="relative">
        {journeySteps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative pl-8 pb-8"
          >
            {/* Timeline Line */}
            {index < journeySteps.length - 1 && (
              <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-gray-200" />
            )}

            {/* Stage Number */}
            <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-semibold">
              {index + 1}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Stage Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="mr-4">
                      {step.icon || <Activity className="w-6 h-6 text-primary-600" />}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{step.stage}</h4>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">{step.duration}</span>
                  </div>
                </div>

                {/* Risk Level Indicator */}
                {step.riskLevel && (
                  <div className={`
                    inline-flex items-center px-3 py-1 rounded-full text-sm
                    ${step.riskLevel === 'high' ? 'bg-red-100 text-red-700' :
                      step.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'}
                  `}>
                    <AlertTriangle className="w-4 h-4 mr-1" />
                    {step.riskLevel.charAt(0).toUpperCase() + step.riskLevel.slice(1)} Risk Stage
                  </div>
                )}
              </div>

              {/* Stage Content */}
              <div className="p-6 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Key Points */}
                  <div>
                    <h5 className="font-medium text-gray-900 mb-3">Key Points</h5>
                    <ul className="space-y-2">
                      {step.keyPoints.map((point, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle2 className="w-5 h-5 text-primary-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Special Requirements */}
                  {step.specialRequirements && (
                    <div>
                      <h5 className="font-medium text-gray-900 mb-3">Special Requirements</h5>
                      <ul className="space-y-2">
                        {step.specialRequirements.map((req, idx) => (
                          <li key={idx} className="flex items-start">
                            <AlertTriangle className="w-5 h-5 text-accent-600 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-600">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Substeps */}
                {step.substeps && (
                  <div className="mt-6">
                    <h5 className="font-medium text-gray-900 mb-3">Detailed Process</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {step.substeps.map((substep, idx) => (
                        <div key={idx} className="bg-white rounded-lg p-4 border border-gray-200">
                          <h6 className="font-medium text-gray-900 mb-2">{substep.title}</h6>
                          <p className="text-sm text-gray-600 mb-3">{substep.description}</p>
                          <div className="flex items-center text-sm text-gray-500 mb-2">
                            <Clock className="w-4 h-4 mr-1" />
                            {substep.duration}
                          </div>
                          <ul className="space-y-1">
                            {substep.tasks.map((task, taskIdx) => (
                              <li key={taskIdx} className="text-sm text-gray-600 flex items-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary-600 mr-2" />
                                {task}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
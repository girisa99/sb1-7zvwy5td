import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, ClipboardCheck, FlaskRound as Flask, Truck, Building2, HeartPulse, FileText, Activity, ArrowRight, CheckCircle2, Clock, AlertCircle, ChevronDown, ChevronUp, Thermometer, MapPin, Beaker } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Button } from '../../components/ui/Button';

const workflowSteps = [
  {
    title: 'Patient Referral & Eligibility',
    description: 'Initial patient evaluation and qualification process',
    icon: <Users size={24} />,
    color: 'bg-primary-500',
    image: 'https://images.pexels.com/photos/7089629/pexels-photo-7089629.jpeg',
    status: 'Verification',
    estimatedTime: '5-9 days total',
    substeps: [
      {
        title: 'Initial Referral',
        description: 'Healthcare provider submits patient referral',
        tasks: [
          'Patient information collection',
          'Medical history review',
          'Initial eligibility screening'
        ],
        estimatedTime: '1-2 days'
      },
      {
        title: 'Insurance Verification',
        description: 'Benefits investigation and coverage confirmation',
        tasks: [
          'Insurance pre-authorization',
          'Coverage determination',
          'Financial counseling'
        ],
        estimatedTime: '3-5 days'
      },
      {
        title: 'Patient Consent',
        description: 'Informed consent and documentation',
        tasks: [
          'Treatment explanation',
          'Risk discussion',
          'Consent documentation'
        ],
        estimatedTime: '1-2 days'
      }
    ]
  },
  {
    title: 'Treatment Center Coordination',
    description: 'Treatment center selection and preparation',
    icon: <Building2 size={24} />,
    color: 'bg-accent-500',
    image: 'https://images.pexels.com/photos/8460161/pexels-photo-8460161.jpeg',
    status: 'Scheduling',
    estimatedTime: '5-9 days total',
    substeps: [
      {
        title: 'Center Selection',
        description: 'Identify qualified treatment centers',
        tasks: [
          'Geographic assessment',
          'Capability verification',
          'Capacity confirmation'
        ],
        estimatedTime: '1-2 days'
      },
      {
        title: 'Resource Planning',
        description: 'Coordinate staff and facility resources',
        tasks: [
          'Staff scheduling',
          'Equipment preparation',
          'Protocol review'
        ],
        estimatedTime: '2-3 days'
      },
      {
        title: 'Patient Scheduling',
        description: 'Schedule treatment dates and logistics',
        tasks: [
          'Date coordination',
          'Travel arrangements',
          'Pre-treatment preparation'
        ],
        estimatedTime: '2-4 days'
      }
    ]
  },
  {
    title: 'Cell Collection & Manufacturing',
    description: 'Cell harvesting and processing',
    icon: <Flask size={24} />,
    color: 'bg-primary-600',
    image: 'https://images.pexels.com/photos/8460473/pexels-photo-8460473.jpeg',
    status: 'Processing',
    estimatedTime: '13-18 days total',
    substeps: [
      {
        title: 'Cell Collection',
        description: 'Harvest cells from patient',
        tasks: [
          'Patient preparation',
          'Collection procedure',
          'Initial processing'
        ],
        estimatedTime: '1 day'
      },
      {
        title: 'Manufacturing',
        description: 'Cell processing and modification',
        tasks: [
          'Cell modification',
          'Quality testing',
          'Product validation'
        ],
        estimatedTime: '10-14 days'
      },
      {
        title: 'Release Testing',
        description: 'Final product quality verification',
        tasks: [
          'Sterility testing',
          'Potency assessment',
          'Release criteria verification'
        ],
        estimatedTime: '2-3 days'
      }
    ]
  },
  {
    title: 'Distribution & Logistics',
    description: 'Product delivery to treatment center',
    icon: <Truck size={24} />,
    color: 'bg-accent-600',
    image: 'https://images.pexels.com/photos/8460589/pexels-photo-8460589.jpeg',
    status: 'In Transit',
    estimatedTime: '3-4 days total',
    substeps: [
      {
        title: 'Shipping Preparation',
        description: 'Prepare product for transport',
        tasks: [
          'Packaging verification',
          'Temperature monitoring setup',
          'Documentation preparation'
        ],
        estimatedTime: '1 day'
      },
      {
        title: 'Transport',
        description: 'Controlled delivery to treatment center',
        tasks: [
          'Route optimization',
          'Real-time monitoring',
          'Chain of custody tracking'
        ],
        estimatedTime: '1-2 days'
      },
      {
        title: 'Receipt & Verification',
        description: 'Treatment center product acceptance',
        tasks: [
          'Product inspection',
          'Temperature verification',
          'Documentation review'
        ],
        estimatedTime: '1 day'
      }
    ]
  },
  {
    title: 'Treatment Administration',
    description: 'Final therapy delivery to patient',
    icon: <HeartPulse size={24} />,
    color: 'bg-primary-700',
    image: 'https://images.pexels.com/photos/8460141/pexels-photo-8460141.jpeg',
    status: 'Treatment',
    estimatedTime: '34-36 days total',
    substeps: [
      {
        title: 'Pre-Treatment',
        description: 'Patient preparation procedures',
        tasks: [
          'Conditioning regimen',
          'Final assessments',
          'Treatment preparation'
        ],
        estimatedTime: '3-5 days'
      },
      {
        title: 'Administration',
        description: 'Therapy administration to patient',
        tasks: [
          'Product preparation',
          'Administration procedure',
          'Initial monitoring'
        ],
        estimatedTime: '1 day'
      },
      {
        title: 'Monitoring',
        description: 'Post-treatment patient observation',
        tasks: [
          'Vital signs monitoring',
          'Side effect management',
          'Response assessment'
        ],
        estimatedTime: '30+ days'
      }
    ]
  }
];

export function HowItWorksSection() {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const [expandedSubstep, setExpandedSubstep] = useState<number | null>(null);

  return (
    <section id="how-it-works" className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Revolutionary Process Overview
          </motion.h2>
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block py-1 px-3 rounded-full bg-primary-100 text-primary-800 text-sm font-medium mb-3"
          >
            Cell & Gene Therapy Workflow
          </motion.span>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-primary-50 rounded-lg p-4 mb-4"
          >
            <div className="text-lg text-primary-900 font-medium">
              Approximate Timeline: 60-76 days total
            </div>
            <div className="text-sm text-primary-700">
              *Timeline may vary based on individual patient needs and treatment requirements
            </div>
          </motion.div>
        </div>

        {/* Progress Timeline */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="flex items-center justify-between">
            {workflowSteps.map((step, index) => (
              <React.Fragment key={index}>
                <div className="flex flex-col items-center">
                  <div 
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center text-white",
                      step.color
                    )}
                  >
                    {step.icon}
                  </div>
                  <div className="text-sm font-medium mt-2 text-center max-w-[120px]">{step.title}</div>
                  <div className="text-xs text-gray-500 mt-1">{step.estimatedTime}</div>
                </div>
                {index < workflowSteps.length - 1 && (
                  <div className="flex-1 h-1 bg-gray-200 mx-2">
                    <div className={cn(
                      "h-full bg-primary-500 transition-all duration-500",
                      index < expandedStep! ? "w-full" : "w-0"
                    )} />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Detailed Steps */}
        <div className="space-y-8">
          {workflowSteps.map((step, stepIndex) => (
            <motion.div
              key={stepIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div 
                className={cn(
                  "p-6 cursor-pointer transition-colors",
                  expandedStep === stepIndex ? step.color : "hover:bg-gray-50"
                )}
                onClick={() => setExpandedStep(expandedStep === stepIndex ? null : stepIndex)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center",
                      expandedStep === stepIndex ? "bg-white text-primary-600" : `${step.color} text-white`
                    )}>
                      {step.icon}
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h3 className={cn(
                          "text-xl font-bold",
                          expandedStep === stepIndex ? "text-white" : "text-gray-900"
                        )}>
                          {step.title}
                        </h3>
                        <div className={cn(
                          "ml-3 flex items-center text-sm",
                          expandedStep === stepIndex ? "text-white/80" : "text-gray-500"
                        )}>
                          <Clock className="w-4 h-4 mr-1" />
                          {step.estimatedTime}
                        </div>
                      </div>
                      <p className={cn(
                        "text-sm",
                        expandedStep === stepIndex ? "text-white/80" : "text-gray-600"
                      )}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                  {expandedStep === stepIndex ? <ChevronUp className="w-6 h-6 text-white" /> : <ChevronDown className="w-6 h-6 text-gray-400" />}
                </div>
              </div>

              {expandedStep === stepIndex && (
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {step.substeps.map((substep, substepIndex) => (
                      <div
                        key={substepIndex}
                        className={cn(
                          "bg-white rounded-lg border transition-shadow",
                          expandedSubstep === substepIndex ? "shadow-lg border-primary-500" : "shadow border-gray-200"
                        )}
                      >
                        <div 
                          className="p-4 cursor-pointer"
                          onClick={() => setExpandedSubstep(expandedSubstep === substepIndex ? null : substepIndex)}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900">{substep.title}</h4>
                            <div className="flex items-center text-sm text-gray-500">
                              <Clock className="w-4 h-4 mr-1" />
                              {substep.estimatedTime}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-4">{substep.description}</p>
                          <div className="space-y-2">
                            {substep.tasks.map((task, taskIndex) => (
                              <div key={taskIndex} className="flex items-center text-sm">
                                <CheckCircle2 className="w-4 h-4 text-primary-500 mr-2" />
                                <span className="text-gray-700">{task}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Additional Resources */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Need More Information?</h3>
          <p className="text-gray-600 mb-8">
            Explore our comprehensive documentation and resources to learn more about the cell and gene therapy process.
          </p>
          <div className="flex justify-center space-x-4">
            <Button 
              href="/documentation"
              variant="outline"
              size="lg"
              icon={<FileText size={20} />}
              iconPosition="left"
            >
              View Documentation
            </Button>
            <Button 
              href="/contact"
              variant="primary"
              size="lg"
              icon={<Activity size={20} />}
              iconPosition="left"
            >
              Contact Support
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
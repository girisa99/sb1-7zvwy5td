import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, ClipboardCheck, FlaskRound, Truck, Building2, HeartPulse, FileText, Activity, 
  ArrowRight, CheckCircle2, Clock, AlertTriangle, ChevronDown, ChevronUp, Thermometer, 
  MapPin, Beaker, Workflow, Shield, Brain, Target, Package, Heart
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { Button } from '../../components/ui/Button';

const stakeholderChallenges = {
  healthcareProviders: {
    title: 'For Healthcare Providers',
    icon: <HeartPulse className="w-6 h-6" />,
    challenges: [
      {
        title: 'Complex Patient Management',
        description: 'Coordinating multiple aspects of patient care and treatment schedules',
        impact: 'Critical for outcomes',
        solution: {
          capability: 'Operations',
          features: [
            'Centralized patient tracking',
            'Treatment scheduling',
            'Outcome monitoring',
            'Care coordination'
          ]
        }
      },
      {
        title: 'Treatment Administration',
        description: 'Managing complex therapy administration protocols',
        impact: 'High risk area',
        solution: {
          capability: 'Technology',
          features: [
            'Protocol management',
            'Safety monitoring',
            'Documentation',
            'Compliance tracking'
          ]
        }
      },
      {
        title: 'Resource Management',
        description: 'Optimizing facility and staff resources for therapy delivery',
        impact: 'Operational efficiency',
        solution: {
          capability: 'Stakeholder Portals',
          features: [
            'Resource scheduling',
            'Staff training',
            'Facility management',
            'Capacity planning'
          ]
        }
      }
    ]
  },
  biotechCompanies: {
    title: 'For Biotech Companies',
    icon: <Building2 className="w-6 h-6" />,
    challenges: [
      {
        title: 'Manufacturing Complexity',
        description: 'Managing complex production processes and quality control',
        impact: 'Product quality',
        solution: {
          capability: 'Operations',
          features: [
            'Process automation',
            'Quality management',
            'Batch tracking',
            'Resource optimization'
          ]
        }
      },
      {
        title: 'Supply Chain Management',
        description: 'Coordinating complex logistics and distribution networks',
        impact: 'Product delivery',
        solution: {
          capability: 'Technology',
          features: [
            'Chain of custody',
            'Temperature monitoring',
            'Logistics tracking',
            'Documentation'
          ]
        }
      },
      {
        title: 'Regulatory Compliance',
        description: 'Maintaining compliance with evolving regulations',
        impact: 'Market access',
        solution: {
          capability: 'Stakeholder Portals',
          features: [
            'Compliance tracking',
            'Documentation management',
            'Audit support',
            'Reporting systems'
          ]
        }
      }
    ]
  },
  treatmentCenters: {
    title: 'For Treatment Centers',
    icon: <FlaskRound className="w-6 h-6" />,
    challenges: [
      {
        title: 'Patient Care Coordination',
        description: 'Managing complex treatment protocols and patient monitoring',
        impact: 'Treatment success',
        solution: {
          capability: 'Operations',
          features: [
            'Treatment scheduling',
            'Protocol management',
            'Patient monitoring',
            'Care coordination'
          ]
        }
      },
      {
        title: 'Quality Management',
        description: 'Maintaining quality standards and accreditation',
        impact: 'Center certification',
        solution: {
          capability: 'Technology',
          features: [
            'Quality systems',
            'Documentation',
            'Training management',
            'Compliance tracking'
          ]
        }
      },
      {
        title: 'Resource Optimization',
        description: 'Managing facility resources and staff expertise',
        impact: 'Operational efficiency',
        solution: {
          capability: 'Stakeholder Portals',
          features: [
            'Resource scheduling',
            'Staff management',
            'Facility utilization',
            'Capacity planning'
          ]
        }
      }
    ]
  },
  specialtyPharmacies: {
    title: 'For Specialty Pharmacies',
    icon: <Package className="w-6 h-6" />,
    challenges: [
      {
        title: 'Product Management',
        description: 'Handling specialized storage and preparation requirements',
        impact: 'Product integrity',
        solution: {
          capability: 'Operations',
          features: [
            'Inventory management',
            'Storage monitoring',
            'Preparation protocols',
            'Quality control'
          ]
        }
      },
      {
        title: 'Patient Support',
        description: 'Providing comprehensive patient support services',
        impact: 'Treatment adherence',
        solution: {
          capability: 'Technology',
          features: [
            'Patient education',
            'Adherence monitoring',
            'Side effect tracking',
            'Support coordination'
          ]
        }
      },
      {
        title: 'Benefits Management',
        description: 'Managing complex reimbursement and benefits',
        impact: 'Financial access',
        solution: {
          capability: 'Stakeholder Portals',
          features: [
            'Benefits verification',
            'Prior authorization',
            'Financial assistance',
            'Claims management'
          ]
        }
      }
    ]
  },
  distributionNetworks: {
    title: 'For Distribution Networks',
    icon: <Truck className="w-6 h-6" />,
    challenges: [
      {
        title: 'Cold Chain Management',
        description: 'Maintaining product integrity throughout transport',
        impact: 'Product viability',
        solution: {
          capability: 'Operations',
          features: [
            'Temperature monitoring',
            'Route optimization',
            'Container validation',
            'Quality assurance'
          ]
        }
      },
      {
        title: 'Chain of Custody',
        description: 'Ensuring secure and traceable product movement',
        impact: 'Product security',
        solution: {
          capability: 'Technology',
          features: [
            'Track and trace',
            'Documentation',
            'Security protocols',
            'Compliance tracking'
          ]
        }
      },
      {
        title: 'Network Coordination',
        description: 'Managing complex distribution networks',
        impact: 'Delivery efficiency',
        solution: {
          capability: 'Stakeholder Portals',
          features: [
            'Network management',
            'Resource allocation',
            'Performance tracking',
            'Communication tools'
          ]
        }
      }
    ]
  },
  patientsCaregivers: {
    title: 'For Patients and Caregivers',
    icon: <Heart className="w-6 h-6" />,
    challenges: [
      {
        title: 'Treatment Navigation',
        description: 'Understanding and managing complex treatment journeys',
        impact: 'Treatment success',
        solution: {
          capability: 'Operations',
          features: [
            'Treatment education',
            'Schedule management',
            'Support resources',
            'Progress tracking'
          ]
        }
      },
      {
        title: 'Care Coordination',
        description: 'Coordinating between multiple care providers',
        impact: 'Care continuity',
        solution: {
          capability: 'Technology',
          features: [
            'Care team communication',
            'Appointment scheduling',
            'Treatment updates',
            'Resource access'
          ]
        }
      },
      {
        title: 'Support Access',
        description: 'Accessing comprehensive support services',
        impact: 'Quality of life',
        solution: {
          capability: 'Stakeholder Portals',
          features: [
            'Support programs',
            'Resource directory',
            'Financial assistance',
            'Educational materials'
          ]
        }
      }
    ]
  }
};

const capabilities = {
  operations: {
    title: 'Operations',
    description: 'Comprehensive operational management tools',
    features: [
      {
        title: 'Case Management',
        icon: <ClipboardCheck size={24} />,
        description: 'End-to-end tracking of patient cases from referral through post-treatment monitoring'
      },
      {
        title: 'Hub Services',
        icon: <Activity size={24} />,
        description: 'Comprehensive benefits investigation, prior authorization, and patient assistance programs'
      },
      {
        title: 'Order Management',
        icon: <Package size={24} />,
        description: 'Streamlined ordering and tracking of cell and gene therapy products'
      },
      {
        title: 'Logistics Management',
        icon: <Truck size={24} />,
        description: 'Coordinated logistics including cold chain management and delivery tracking'
      }
    ]
  },
  technology: {
    title: 'Technology',
    description: 'Advanced technological solutions',
    features: [
      {
        title: 'API Integration',
        icon: <Workflow size={24} />,
        description: 'Secure integration hub connecting stakeholders and systems'
      },
      {
        title: 'Quality Control',
        icon: <Shield size={24} />,
        description: 'Comprehensive quality management and compliance systems'
      },
      {
        title: 'Data Analytics',
        icon: <Brain size={24} />,
        description: 'Advanced analytics and reporting capabilities'
      },
      {
        title: 'Automation',
        icon: <Target size={24} />,
        description: 'Automated workflows and process management'
      }
    ]
  },
  stakeholderPortals: {
    title: 'Stakeholder Portals',
    description: 'Dedicated interfaces for all stakeholders',
    features: [
      {
        title: 'Healthcare Provider Portal',
        icon: <HeartPulse size={24} />,
        description: 'Comprehensive interface for healthcare providers and treatment centers'
      },
      {
        title: 'Patient Portal',
        icon: <Users size={24} />,
        description: 'User-friendly platform for patients to track treatment progress'
      },
      {
        title: 'Manufacturer Portal',
        icon: <Building2 size={24} />,
        description: 'Specialized interface for manufacturing and quality control'
      },
      {
        title: 'Distribution Portal',
        icon: <Truck size={24} />,
        description: 'Logistics and distribution management interface'
      }
    ]
  }
};

export function FeaturesSection() {
  const [expandedChallenge, setExpandedChallenge] = useState<string | null>(null);
  const [activeCapability, setActiveCapability] = useState<keyof typeof capabilities>('operations');

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Stakeholder Challenges & Solutions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600"
          >
            Addressing critical needs across the cell and gene therapy ecosystem
          </motion.p>
        </div>

        {/* Stakeholder Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {Object.entries(stakeholderChallenges).map(([key, stakeholder]) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center text-primary-600 mr-4">
                  {stakeholder.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{stakeholder.title}</h3>
              </div>

              <div className="space-y-4">
                {stakeholder.challenges.map((challenge, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{challenge.title}</h4>
                      <span className="text-sm bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                        {challenge.impact}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{challenge.description}</p>
                    
                    <button
                      onClick={() => setExpandedChallenge(expandedChallenge === `${key}-${index}` ? null : `${key}-${index}`)}
                      className="flex items-center text-primary-600 text-sm font-medium"
                    >
                      View Solution
                      {expandedChallenge === `${key}-${index}` ? (
                        <ChevronUp className="ml-1 w-4 h-4" />
                      ) : (
                        <ChevronDown className="ml-1 w-4 h-4" />
                      )}
                    </button>

                    {expandedChallenge === `${key}-${index}` && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 pt-3 border-t border-gray-200"
                      >
                        <h5 className="font-medium text-gray-900 mb-2">
                          {challenge.solution.capability} Solution
                        </h5>
                        <ul className="space-y-2">
                          {challenge.solution.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center text-sm text-gray-600">
                              <CheckCircle2 className="w-4 h-4 text-primary-500 mr-2" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Platform Capabilities */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Platform Capabilities
          </h3>

          <div className="flex justify-center space-x-4 mb-8">
            {Object.entries(capabilities).map(([key, value]) => (
              <button
                key={key}
                onClick={() => setActiveCapability(key as keyof typeof capabilities)}
                className={cn(
                  "px-4 py-2 rounded-lg transition-colors",
                  activeCapability === key
                    ? "bg-primary-100 text-primary-700"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                )}
              >
                {value.title}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities[activeCapability].features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-lg p-6"
              >
                <div className="text-primary-600 mb-4">{feature.icon}</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
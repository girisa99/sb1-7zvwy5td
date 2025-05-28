import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Award, Shield, Users, FlaskRound as Flask, Microscope, HeartPulse, Truck, Package, MapPin, Pill, Beaker, FileText, Brain, Activity, Stethoscope, Bell as Cells, ChevronUp, ChevronDown } from 'lucide-react';
import { cn } from '@/utils/cn';

const partners = [
  {
    category: 'Research Institutions',
    icon: <Building2 className="w-8 h-8" />,
    description: 'Leading academic and research centers advancing cell and gene therapy development',
    partners: [
      {
        name: 'Academic Research Centers',
        examples: [
          'MIT Center for Cell & Gene Therapy',
          'Stanford Institute for Stem Cell Biology',
          'Harvard Stem Cell Institute'
        ],
        focus: 'Basic research and translational medicine'
      },
      {
        name: 'Clinical Research Organizations',
        examples: [
          'Cell & Gene Therapy Research Institute',
          'Advanced Therapeutics Research Center',
          'RNA Therapeutics Laboratory'
        ],
        focus: 'Clinical trials and therapy development'
      },
      {
        name: 'Biotech Research Labs',
        examples: [
          'Gene Editing Innovation Lab',
          'Cell Engineering Research Center',
          'Vector Development Institute'
        ],
        focus: 'Technology development and optimization'
      }
    ]
  },
  {
    category: 'Regulatory Bodies & Quality Control',
    icon: <Shield className="w-8 h-8" />,
    description: 'Organizations ensuring safety, efficacy, and compliance in advanced therapeutics',
    partners: [
      {
        name: 'Regulatory Agencies',
        examples: [
          'FDA Center for Biologics',
          'EMA Advanced Therapies Unit',
          'International Cell Therapy Society'
        ],
        focus: 'Regulatory oversight and guidance'
      },
      {
        name: 'Quality Control Organizations',
        examples: [
          'Cell Therapy Quality Forum',
          'Gene Therapy Standards Institute',
          'Advanced Therapy Testing Labs'
        ],
        focus: 'Quality standards and testing'
      },
      {
        name: 'Safety Monitoring Networks',
        examples: [
          'Cell Therapy Safety Network',
          'Gene Therapy Monitoring System',
          'Advanced Therapy Safety Coalition'
        ],
        focus: 'Post-market surveillance and safety'
      }
    ]
  },
  {
    category: 'Healthcare Providers & Treatment Centers',
    icon: <HeartPulse className="w-8 h-8" />,
    description: 'Specialized centers delivering advanced therapeutic treatments',
    partners: [
      {
        name: 'Treatment Centers',
        examples: [
          'Advanced Cell Therapy Centers',
          'Gene Therapy Treatment Network',
          'RNA Therapeutics Clinics'
        ],
        focus: 'Patient treatment and care'
      },
      {
        name: 'Specialized Hospitals',
        examples: [
          'Cell Therapy Medical Center',
          'Gene Medicine Institute',
          'Advanced Therapeutics Hospital'
        ],
        focus: 'Complex patient care and monitoring'
      },
      {
        name: 'Clinical Support Networks',
        examples: [
          'Patient Care Coordination Network',
          'Treatment Support Alliance',
          'Advanced Therapy Nursing Network'
        ],
        focus: 'Patient support and care coordination'
      }
    ]
  },
  {
    category: 'Manufacturing & Production',
    icon: <Flask className="w-8 h-8" />,
    description: 'State-of-the-art facilities for cell and gene therapy production',
    partners: [
      {
        name: 'Cell Manufacturing Facilities',
        examples: [
          'Advanced Cell Production Center',
          'CAR-T Manufacturing Facility',
          'Stem Cell Processing Lab'
        ],
        focus: 'Cell therapy production'
      },
      {
        name: 'Vector Manufacturing',
        examples: [
          'Viral Vector Production Center',
          'Gene Delivery Systems Lab',
          'Vector Engineering Facility'
        ],
        focus: 'Vector development and production'
      },
      {
        name: 'Quality Testing Labs',
        examples: [
          'Cell Therapy Quality Lab',
          'Gene Product Testing Center',
          'Release Testing Facility'
        ],
        focus: 'Product testing and validation'
      }
    ]
  },
  {
    category: 'Distribution & Logistics',
    icon: <Truck className="w-8 h-8" />,
    description: 'Specialized networks ensuring safe and timely delivery of advanced therapies',
    partners: [
      {
        name: 'Cold Chain Specialists',
        examples: [
          'Cell Therapy Logistics Network',
          'Gene Product Transport Systems',
          'Cryogenic Shipping Solutions'
        ],
        focus: 'Temperature-controlled transport'
      },
      {
        name: 'Distribution Centers',
        examples: [
          'Advanced Therapy Distribution Hub',
          'Regional Cell Therapy Centers',
          'Gene Product Storage Facility'
        ],
        focus: 'Product storage and distribution'
      },
      {
        name: 'Chain of Identity',
        examples: [
          'Cell Therapy Tracking Network',
          'Gene Product Tracing System',
          'Patient ID Management'
        ],
        focus: 'Product tracking and verification'
      }
    ]
  },
  {
    category: 'Patient Support & Community',
    icon: <Users className="w-8 h-8" />,
    description: 'Organizations providing comprehensive patient support and advocacy',
    partners: [
      {
        name: 'Patient Organizations',
        examples: [
          'Cell Therapy Patient Network',
          'Gene Medicine Alliance',
          'Advanced Therapy Support Group'
        ],
        focus: 'Patient advocacy and support'
      },
      {
        name: 'Support Services',
        examples: [
          'Treatment Navigation Services',
          'Financial Assistance Programs',
          'Patient Education Network'
        ],
        focus: 'Patient resources and assistance'
      },
      {
        name: 'Community Networks',
        examples: [
          'Care Partner Support Network',
          'Family Resource Centers',
          'Patient Community Hub'
        ],
        focus: 'Community support and education'
      }
    ]
  }
];

export function PartnersSection() {
  const [expandedPartner, setExpandedPartner] = useState<number | null>(null);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Revolutionary Partnership Network
          </motion.h2>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block py-1 px-3 rounded-full bg-primary-100 text-primary-800 text-sm font-medium mb-3"
          >
            Advanced Therapy Ecosystem
          </motion.span>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600"
          >
            Collaborating with world-class institutions and organizations across the cell and gene therapy ecosystem
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "bg-white rounded-xl shadow-lg p-6 transition-all duration-300",
                expandedPartner === index ? "lg:col-span-3" : ""
              )}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center text-primary-600 mr-4">
                  {partner.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{partner.category}</h3>
                  <p className="text-sm text-gray-600">{partner.description}</p>
                </div>
              </div>

              <AnimatePresence>
                {expandedPartner === index ? (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {partner.partners.map((subPartner, subIndex) => (
                        <div key={subIndex} className="bg-gray-50 rounded-lg p-4">
                          <h4 className="font-semibold text-gray-900 mb-2">{subPartner.name}</h4>
                          <p className="text-sm text-gray-600 mb-3">{subPartner.focus}</p>
                          <ul className="space-y-2">
                            {subPartner.examples.map((example, exIndex) => (
                              <li key={exIndex} className="text-sm text-gray-700 flex items-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mr-2" />
                                {example}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              <button
                onClick={() => setExpandedPartner(expandedPartner === index ? null : index)}
                className="mt-4 text-primary-600 hover:text-primary-700 flex items-center text-sm font-medium"
              >
                {expandedPartner === index ? (
                  <>
                    Show Less
                    <ChevronUp className="ml-1 w-4 h-4" />
                  </>
                ) : (
                  <>
                    View Network
                    <ChevronDown className="ml-1 w-4 h-4" />
                  </>
                )}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
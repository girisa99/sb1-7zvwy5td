import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, Download, X, Activity, Users, Building2, Truck, 
  FlaskRound as Flask, Microscope, Shield, HeartPulse, Clock,
  Beaker, Target, AlertTriangle, CheckCircle2, Package, MapPin,
  Thermometer, Syringe, ClipboardCheck, Brain, Workflow
} from 'lucide-react';

interface TherapyDocumentationProps {
  therapy: string;
  onClose: () => void;
}

export function TherapyDocumentation({ therapy, onClose }: TherapyDocumentationProps) {
  // Calculate total duration for Gene Therapy
  const calculateTotalDuration = () => {
    if (therapy === 'Gene') {
      const pretreatmentDuration = 6; // 1-2 + 2-3 + 1-2 + 2-4 weeks
      const treatmentDuration = 10; // 6-8 + 2-3 + 1-2 days + 1-3 days
      const posttreatmentDuration = 52; // 4-8 weeks + 3-6 months + ongoing monitoring
      return {
        pretreatment: `${pretreatmentDuration} weeks`,
        treatment: `${treatmentDuration} weeks`,
        posttreatment: `${posttreatmentDuration} weeks`,
        total: `${pretreatmentDuration + treatmentDuration + posttreatmentDuration} weeks`
      };
    }
    return null;
  };

  const totalDuration = calculateTotalDuration();

  const getTherapyDetails = () => {
    switch (therapy) {
      case 'Gene':
        return {
          process: {
            title: 'Gene Therapy Process',
            phases: [
              {
                name: 'Manufacturing & Production',
                stakeholder: 'Manufacturer',
                icon: <Building2 />,
                steps: [
                  { name: 'Vector Design', duration: '2-4 weeks', risk: 'medium' },
                  { name: 'Vector Production', duration: '4-6 weeks', risk: 'high' },
                  { name: 'Quality Testing', duration: '2-3 weeks', risk: 'high' },
                  { name: 'Release Testing', duration: '1-2 weeks', risk: 'medium' }
                ],
                requirements: [
                  'GMP-certified facilities',
                  'Vector production suites',
                  'Quality control labs',
                  'Environmental monitoring'
                ]
              },
              {
                name: 'Distribution & Logistics',
                stakeholder: 'Distribution Center',
                icon: <Truck />,
                steps: [
                  { name: 'Cold Chain Setup', duration: '1-2 days', risk: 'high' },
                  { name: 'Transport Validation', duration: '1-2 days', risk: 'medium' },
                  { name: 'Temperature Monitoring', duration: 'Continuous', risk: 'high' },
                  { name: 'Chain of Custody', duration: 'Continuous', risk: 'medium' }
                ],
                requirements: [
                  'Ultra-low temperature storage',
                  'Temperature monitoring systems',
                  'Validated shipping containers',
                  'Track & trace capabilities'
                ]
              },
              {
                name: 'Treatment Center Operations',
                stakeholder: 'Treatment Center',
                icon: <HeartPulse />,
                steps: [
                  { name: 'Patient Screening', duration: '1-2 weeks', risk: 'medium' },
                  { name: 'Pre-treatment Assessment', duration: '1 week', risk: 'medium' },
                  { name: 'Vector Administration', duration: '1-3 days', risk: 'high' },
                  { name: 'Post-treatment Monitoring', duration: '4-8 weeks', risk: 'high' }
                ],
                requirements: [
                  'Vector handling facilities',
                  'Patient monitoring systems',
                  'Emergency response protocols',
                  'Long-term follow-up infrastructure'
                ]
              },
              {
                name: 'Laboratory Services',
                stakeholder: 'Testing Laboratory',
                icon: <Flask />,
                steps: [
                  { name: 'Genetic Testing', duration: '1-2 weeks', risk: 'medium' },
                  { name: 'Safety Testing', duration: '1-2 weeks', risk: 'high' },
                  { name: 'Efficacy Analysis', duration: '2-4 weeks', risk: 'medium' },
                  { name: 'Long-term Monitoring', duration: 'Ongoing', risk: 'medium' }
                ],
                requirements: [
                  'Molecular testing facilities',
                  'Biomarker analysis equipment',
                  'Safety testing capabilities',
                  'Data management systems'
                ]
              }
            ],
            stakeholders: [
              { name: 'Manufacturing', icon: <Building2 />, role: 'Production' },
              { name: 'Distribution', icon: <Truck />, role: 'Logistics' },
              { name: 'Treatment', icon: <HeartPulse />, role: 'Administration' },
              { name: 'Labs', icon: <Flask />, role: 'Testing' }
            ]
          },
          journey: {
            pretreatment: [
              { phase: 'Initial Consultation', duration: '1-2 weeks', stakeholder: 'Healthcare Provider' },
              { phase: 'Genetic Testing', duration: '2-3 weeks', stakeholder: 'Testing Laboratory' },
              { phase: 'Treatment Planning', duration: '1-2 weeks', stakeholder: 'Treatment Center' },
              { phase: 'Insurance Approval', duration: '2-4 weeks', stakeholder: 'Payer' }
            ],
            treatment: [
              { phase: 'Vector Production', duration: '6-8 weeks', stakeholder: 'Manufacturer' },
              { phase: 'Quality Testing', duration: '2-3 weeks', stakeholder: 'Testing Laboratory' },
              { phase: 'Distribution', duration: '1-2 days', stakeholder: 'Distribution Center' },
              { phase: 'Administration', duration: '1-3 days', stakeholder: 'Treatment Center' }
            ],
            posttreatment: [
              { phase: 'Immediate Monitoring', duration: '4-8 weeks', stakeholder: 'Treatment Center' },
              { phase: 'Follow-up Care', duration: '3-6 months', stakeholder: 'Healthcare Provider' },
              { phase: 'Long-term Monitoring', duration: '5-15 years', stakeholder: 'Healthcare Provider' },
              { phase: 'Registry Reporting', duration: 'Ongoing', stakeholder: 'Treatment Center' }
            ]
          },
          requirements: {
            facility: [
              'GMP-certified facilities',
              'Vector production suites',
              'Quality control labs',
              'Environmental monitoring'
            ],
            personnel: [
              'Gene therapy specialists',
              'Quality control team',
              'Clinical staff',
              'Laboratory technicians'
            ],
            regulatory: [
              'FDA compliance',
              'GMP certification',
              'Quality management system',
              'Risk management protocols'
            ]
          }
        };
      case 'CAR-T':
        return {
          process: {
            title: 'CAR-T Cell Therapy Process',
            steps: [
              'Cell Collection (Leukapheresis)',
              'Genetic Modification',
              'Cell Expansion',
              'Quality Testing',
              'Cell Administration'
            ],
            stakeholders: [
              { name: 'Collection Center', icon: <Users />, role: 'Cell harvesting' },
              { name: 'Manufacturing', icon: <Building2 />, role: 'Cell engineering' },
              { name: 'Treatment Center', icon: <HeartPulse />, role: 'Administration' },
              { name: 'Labs', icon: <Microscope />, role: 'Testing, monitoring' }
            ]
          },
          journey: {
            title: 'Treatment Journey',
            phases: [
              { name: 'Screening', duration: '1-2 weeks', details: 'Eligibility assessment' },
              { name: 'Collection', duration: '1-2 days', details: 'Leukapheresis' },
              { name: 'Manufacturing', duration: '3-4 weeks', details: 'Cell engineering' },
              { name: 'Pre-conditioning', duration: '1 week', details: 'Lymphodepletion' },
              { name: 'Administration', duration: '1-3 days', details: 'Cell infusion' },
              { name: 'Monitoring', duration: '2-4 weeks', details: 'CRS/ICANS monitoring' }
            ]
          },
          requirements: {
            facility: [
              'FACT accreditation',
              'Cell processing facilities',
              'ICU capabilities',
              'Monitoring systems'
            ],
            personnel: [
              'CAR-T specialists',
              'Cell therapy nurses',
              'ICU team',
              'Apheresis staff'
            ],
            regulatory: [
              'REMS certification',
              'FDA compliance',
              'Adverse event reporting',
              'Chain of identity'
            ]
          }
        };
      case 'RNA':
        return {
          process: {
            title: 'RNA Therapeutics Process',
            steps: [
              'RNA Design & Synthesis',
              'LNP Formulation',
              'Quality Control',
              'Cold Chain Distribution',
              'Administration'
            ],
            stakeholders: [
              { name: 'Manufacturing', icon: <Building2 />, role: 'RNA production' },
              { name: 'Distribution', icon: <Truck />, role: 'Cold chain' },
              { name: 'Treatment Centers', icon: <HeartPulse />, role: 'Administration' },
              { name: 'Labs', icon: <Flask />, role: 'QC testing' }
            ]
          },
          journey: {
            title: 'Treatment Journey',
            phases: [
              { name: 'Screening', duration: '1-2 weeks', details: 'Patient assessment' },
              { name: 'Manufacturing', duration: '1-2 weeks', details: 'RNA production' },
              { name: 'Administration', duration: '1-3 days', details: 'Dosing' },
              { name: 'Monitoring', duration: '2-4 weeks', details: 'Response assessment' },
              { name: 'Follow-up', duration: '6-12 months', details: 'Long-term monitoring' }
            ]
          },
          requirements: {
            facility: [
              'Clean room facilities',
              'Cold storage (-20°C to -80°C)',
              'Administration rooms',
              'Monitoring equipment'
            ],
            personnel: [
              'RNA specialists',
              'Clinical staff',
              'Quality control team',
              'Storage managers'
            ],
            regulatory: [
              'GMP compliance',
              'Quality control protocols',
              'Safety monitoring',
              'Documentation systems'
            ]
          }
        };
      default:
        return {
          process: {
            title: 'Advanced Therapeutics Process',
            steps: [
              'Product Development',
              'Manufacturing',
              'Quality Control',
              'Distribution',
              'Administration'
            ],
            stakeholders: [
              { name: 'R&D', icon: <Flask />, role: 'Development' },
              { name: 'Manufacturing', icon: <Building2 />, role: 'Production' },
              { name: 'Distribution', icon: <Truck />, role: 'Logistics' },
              { name: 'Treatment', icon: <HeartPulse />, role: 'Administration' }
            ]
          },
          journey: {
            title: 'Treatment Journey',
            phases: [
              { name: 'Assessment', duration: '2-4 weeks', details: 'Initial evaluation' },
              { name: 'Planning', duration: '1-2 weeks', details: 'Treatment planning' },
              { name: 'Treatment', duration: 'Varies', details: 'Administration' },
              { name: 'Monitoring', duration: '4-8 weeks', details: 'Response tracking' },
              { name: 'Follow-up', duration: '6-12 months', details: 'Long-term assessment' }
            ]
          },
          requirements: {
            facility: [
              'Specialized facilities',
              'Storage systems',
              'Treatment rooms',
              'Monitoring equipment'
            ],
            personnel: [
              'Specialists',
              'Clinical staff',
              'Support team',
              'Quality personnel'
            ],
            regulatory: [
              'Compliance systems',
              'Safety protocols',
              'Documentation',
              'Risk management'
            ]
          }
        };
    }
  };

  const details = getTherapyDetails();

  const renderProcessSteps = () => {
    if (therapy === 'Gene' && details.process.phases) {
      return details.process.phases.map((phase, index) => (
        <div key={index} className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="flex items-start space-x-2 mb-3">
            <div className="p-2 bg-white rounded-lg">
              {phase.icon}
            </div>
            <div>
              <h4 className="font-medium text-gray-900">{phase.name}</h4>
              <p className="text-sm text-gray-600">Stakeholder: {phase.stakeholder}</p>
            </div>
          </div>
          <div className="space-y-2">
            {phase.steps.map((step, stepIndex) => (
              <div key={stepIndex} className="flex items-center justify-between bg-white p-2 rounded">
                <span className="text-gray-700">{step.name}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">{step.duration}</span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    step.risk === 'high' ? 'bg-red-100 text-red-700' :
                    step.risk === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {step.risk}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ));
    } else if (details.process.steps) {
      return (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-3 text-gray-700">Process Steps</h4>
          <div className="space-y-2">
            {details.process.steps.map((step, index) => (
              <div key={index} className="flex items-center space-x-2 text-gray-600">
                <Activity className="w-4 h-4 text-primary-500" />
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white z-10 p-6 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">{therapy} Therapy Documentation</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {totalDuration && (
            <div className="bg-primary-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-primary-900 mb-2 flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Total Treatment Duration: {totalDuration.total}
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white rounded p-3">
                  <div className="text-sm font-medium text-gray-600">Pre-treatment Phase</div>
                  <div className="text-lg font-semibold text-primary-700">{totalDuration.pretreatment}</div>
                </div>
                <div className="bg-white rounded p-3">
                  <div className="text-sm font-medium text-gray-600">Treatment Phase</div>
                  <div className="text-lg font-semibold text-primary-700">{totalDuration.treatment}</div>
                </div>
                <div className="bg-white rounded p-3">
                  <div className="text-sm font-medium text-gray-600">Post-treatment Phase</div>
                  <div className="text-lg font-semibold text-primary-700">{totalDuration.posttreatment}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 space-y-8">
          {/* Process Overview */}
          <section>
            <h3 className="text-xl font-semibold mb-4 text-gray-900">{details.process.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderProcessSteps()}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-3 text-gray-700">Key Stakeholders</h4>
                <div className="space-y-3">
                  {details.process.stakeholders.map((stakeholder, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="p-2 bg-white rounded-lg">
                        {stakeholder.icon}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{stakeholder.name}</div>
                        <div className="text-sm text-gray-600">{stakeholder.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Treatment Journey */}
          <section>
            <h3 className="text-xl font-semibold mb-4 text-gray-900">
              {therapy === 'Gene' ? 'Treatment Journey' : details.journey.title}
            </h3>
            <div className="space-y-4">
              {therapy === 'Gene' ? (
                <>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-3 text-gray-700">Pre-treatment Phase</h4>
                    {details.journey.pretreatment.map((item, index) => (
                      <div key={index} className="mb-2 flex items-center justify-between">
                        <div>
                          <span className="font-medium text-gray-900">{item.phase}</span>
                          <span className="text-sm text-gray-600 ml-2">({item.stakeholder})</span>
                        </div>
                        <span className="text-sm bg-primary-100 text-primary-700 px-3 py-1 rounded-full">
                          {item.duration}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-3 text-gray-700">Treatment Phase</h4>
                    {details.journey.treatment.map((item, index) => (
                      <div key={index} className="mb-2 flex items-center justify-between">
                        <div>
                          <span className="font-medium text-gray-900">{item.phase}</span>
                          <span className="text-sm text-gray-600 ml-2">({item.stakeholder})</span>
                        </div>
                        <span className="text-sm bg-primary-100 text-primary-700 px-3 py-1 rounded-full">
                          {item.duration}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-3 text-gray-700">Post-treatment Phase</h4>
                    {details.journey.posttreatment.map((item, index) => (
                      <div key={index} className="mb-2 flex items-center justify-between">
                        <div>
                          <span className="font-medium text-gray-900">{item.phase}</span>
                          <span className="text-sm text-gray-600 ml-2">({item.stakeholder})</span>
                        </div>
                        <span className="text-sm bg-primary-100 text-primary-700 px-3 py-1 rounded-full">
                          {item.duration}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                details.journey.phases.map((phase, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{phase.name}</h4>
                      <span className="text-sm bg-primary-100 text-primary-700 px-3 py-1 rounded-full">
                        {phase.duration}
                      </span>
                    </div>
                    <p className="text-gray-600">{phase.details}</p>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Requirements */}
          <section>
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Treatment Requirements</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-3 text-gray-700 flex items-center">
                  <Building2 className="w-5 h-5 mr-2" />
                  Facility Requirements
                </h4>
                <ul className="space-y-2">
                  {details.requirements.facility.map((req, index) => (
                    <li key={index} className="text-gray-600 flex items-center">
                      <Shield className="w-4 h-4 mr-2 text-primary-500" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-3 text-gray-700 flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Personnel Requirements
                </h4>
                <ul className="space-y-2">
                  {details.requirements.personnel.map((req, index) => (
                    <li key={index} className="text-gray-600 flex items-center">
                      <Shield className="w-4 h-4 mr-2 text-primary-500" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-3 text-gray-700 flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Regulatory Requirements
                </h4>
                <ul className="space-y-2">
                  {details.requirements.regulatory.map((req, index) => (
                    <li key={index} className="text-gray-600 flex items-center">
                      <Shield className="w-4 h-4 mr-2 text-primary-500" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>
      </motion.div>
    </motion.div>
  );
}
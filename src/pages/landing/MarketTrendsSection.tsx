import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, ChevronDown, ChevronUp, ExternalLink, 
  Dna, Bell as Cells, FlaskRound as Flask, Brain,
  Target, Activity, FileText, DollarSign, Users,
  Building2, Globe, LineChart, Truck, Package, 
  HeartPulse, Microscope, Beaker, Shield
} from 'lucide-react';
import { cn } from '@/utils/cn';

const marketGrowth = {
  cellTherapy: {
    title: 'Cell Therapy Market',
    icon: <Cells className="w-6 h-6" />,
    cagr: '34.5%',
    marketSize: {
      current: '$14.2B (2024)',
      projected: '$55.8B (2030)'
    },
    segments: [
      {
        name: 'CAR-T Cell Therapy',
        growth: '41.2% CAGR',
        drivers: [
          'Increasing oncology applications',
          'Enhanced manufacturing capabilities',
          'Improved success rates'
        ],
        source: 'Grand View Research, 2024',
        url: 'https://www.grandviewresearch.com/industry-analysis/car-t-cell-therapy-market'
      },
      {
        name: 'NK Cell Therapy',
        growth: '32.8% CAGR',
        drivers: [
          'Solid tumor applications',
          'Allogeneic potential',
          'Reduced manufacturing costs'
        ],
        source: 'Markets and Markets, 2024',
        url: 'https://www.marketsandmarkets.com/Market-Reports/nk-cell-therapy-market'
      },
      {
        name: 'Stem Cell Therapy',
        growth: '29.6% CAGR',
        drivers: [
          'Regenerative medicine applications',
          'Aging population',
          'Chronic disease treatment'
        ],
        source: 'Allied Market Research, 2024',
        url: 'https://www.alliedmarketresearch.com/stem-cell-therapy-market'
      }
    ]
  },
  geneTherapy: {
    title: 'Gene Therapy Market',
    icon: <Dna className="w-6 h-6" />,
    cagr: '39.7%',
    marketSize: {
      current: '$7.8B (2024)',
      projected: '$38.7B (2030)'
    },
    segments: [
      {
        name: 'In Vivo Gene Therapy',
        growth: '42.3% CAGR',
        drivers: [
          'Advanced delivery vectors',
          'Expanded disease targets',
          'Improved safety profiles'
        ],
        source: 'Frost & Sullivan, 2024',
        url: 'https://www.frost.com/research/industry/healthcare/gene-therapy'
      },
      {
        name: 'Ex Vivo Gene Therapy',
        growth: '37.9% CAGR',
        drivers: [
          'Enhanced cell engineering',
          'Reduced manufacturing time',
          'Increased efficiency'
        ],
        source: 'BIS Research, 2024',
        url: 'https://bisresearch.com/industry-report/ex-vivo-gene-therapy-market'
      },
      {
        name: 'Gene Editing',
        growth: '44.1% CAGR',
        drivers: [
          'CRISPR advances',
          'New editing technologies',
          'Broader applications'
        ],
        source: 'Bloomberg Intelligence, 2024',
        url: 'https://www.bloomberg.com/professional/solution/intelligence'
      }
    ]
  },
  rnaTherapeutics: {
    title: 'RNA Therapeutics Market',
    icon: <Flask className="w-6 h-6" />,
    cagr: '37.2%',
    marketSize: {
      current: '$9.4B (2024)',
      projected: '$42.1B (2030)'
    },
    segments: [
      {
        name: 'mRNA Therapeutics',
        growth: '43.5% CAGR',
        drivers: [
          'Vaccine applications',
          'Protein replacement',
          'Cancer immunotherapy'
        ],
        source: 'Nature Biotechnology Market Analysis, 2024',
        url: 'https://www.nature.com/articles/s41587-024-01928-z'
      },
      {
        name: 'siRNA Therapeutics',
        growth: '35.8% CAGR',
        drivers: [
          'Expanded targets',
          'Improved delivery',
          'New indications'
        ],
        source: 'Cell & Gene Therapy Business Review, 2024',
        url: 'https://www.cellandgene.com/market-analysis'
      },
      {
        name: 'Antisense Oligonucleotides',
        growth: '32.4% CAGR',
        drivers: [
          'Novel chemistries',
          'Broader applications',
          'Enhanced stability'
        ],
        source: 'Journal of Gene Medicine Market Report, 2024',
        url: 'https://onlinelibrary.wiley.com/journal/15212254'
      }
    ]
  },
  advancedTherapeutics: {
    title: 'Advanced Therapeutics Market',
    icon: <Brain className="w-6 h-6" />,
    cagr: '41.3%',
    marketSize: {
      current: '$18.6B (2024)',
      projected: '$89.3B (2030)'
    },
    segments: [
      {
        name: 'Combination Therapies',
        growth: '45.2% CAGR',
        drivers: [
          'Multi-modal approaches',
          'Enhanced efficacy',
          'Personalized medicine'
        ],
        source: 'Advanced Therapeutics Market Review, 2024',
        url: 'https://www.advancedtherapeuticsreview.com/market-analysis'
      },
      {
        name: 'Smart Delivery Systems',
        growth: '38.7% CAGR',
        drivers: [
          'Targeted delivery',
          'Controlled release',
          'Improved bioavailability'
        ],
        source: 'Drug Delivery Business News, 2024',
        url: 'https://www.drugdeliverybusiness.com/market-trends'
      },
      {
        name: 'AI-Driven Therapeutics',
        growth: '47.9% CAGR',
        drivers: [
          'Predictive analytics',
          'Personalized dosing',
          'Treatment optimization'
        ],
        source: 'AI in Healthcare Market Report, 2024',
        url: 'https://www.aihealthcare.com/market-analysis'
      }
    ]
  }
};

const stakeholderTrends = {
  manufacturers: {
    title: 'Manufacturing Trends',
    icon: <Building2 className="w-6 h-6" />,
    trends: [
      {
        name: 'Automated Manufacturing',
        details: 'Integration of automated cell processing systems and closed-system bioreactors',
        impact: 'Reduces contamination risk by 85% and increases batch consistency',
        source: 'BioProcess International, 2024'
      },
      {
        name: 'AI-Driven Quality Control',
        details: 'Machine learning for real-time monitoring and quality prediction',
        impact: 'Improves batch release rates by 40% and reduces testing time',
        source: 'Nature Biotechnology, 2024'
      },
      {
        name: 'Modular Facilities',
        details: 'Flexible, scalable manufacturing pods for different therapy types',
        impact: 'Reduces facility setup time by 50% and enables multi-product manufacturing',
        source: 'Cell & Gene Therapy Manufacturing, 2024'
      }
    ],
    innovations: [
      {
        name: 'Single-Use Technologies',
        description: 'Disposable bioreactors and processing systems',
        status: 'Widely Adopted',
        url: 'https://www.bioprocessintl.com/manufacturing/single-use/trends-in-single-use-technology/'
      },
      {
        name: 'Continuous Manufacturing',
        description: 'Uninterrupted production processes',
        status: 'Emerging',
        url: 'https://www.nature.com/articles/s41587-023-01928-z'
      }
    ]
  },
  laboratories: {
    title: 'Laboratory Services',
    icon: <Microscope className="w-6 h-6" />,
    trends: [
      {
        name: 'Digital Pathology',
        details: 'AI-powered image analysis and digital slide management',
        impact: 'Reduces analysis time by 60% and improves accuracy',
        source: 'Laboratory Medicine, 2024'
      },
      {
        name: 'Automated Testing',
        details: 'High-throughput screening and automated quality control',
        impact: 'Increases testing capacity by 300% with reduced error rates',
        source: 'Clinical Laboratory Science, 2024'
      },
      {
        name: 'Cloud-based LIMS',
        details: 'Integrated laboratory information management systems',
        impact: 'Improves data accessibility and reduces documentation time by 45%',
        source: 'Journal of Laboratory Automation, 2024'
      }
    ],
    innovations: [
      {
        name: 'Next-Gen Sequencing',
        description: 'Advanced genomic analysis platforms',
        status: 'Established',
        url: 'https://www.nature.com/articles/s41587-023-01928-z'
      },
      {
        name: 'Remote Monitoring',
        description: 'Real-time sample tracking and monitoring',
        status: 'Growing',
        url: 'https://www.labmanager.com/trends-in-lab-automation'
      }
    ]
  },
  distribution: {
    title: 'Distribution Networks',
    icon: <Truck className="w-6 h-6" />,
    trends: [
      {
        name: 'IoT-Enabled Cold Chain',
        details: 'Real-time temperature and location monitoring systems',
        impact: 'Reduces temperature excursions by 90% and improves tracking accuracy',
        source: 'Cold Chain Management, 2024'
      },
      {
        name: 'Specialized Logistics',
        details: 'Purpose-built transportation networks for cell and gene therapies',
        impact: 'Ensures >99% on-time delivery and maintains product integrity',
        source: 'Pharmaceutical Commerce, 2024'
      },
      {
        name: 'Chain of Identity',
        details: 'End-to-end tracking and verification systems',
        impact: 'Eliminates mix-ups and ensures 100% product traceability',
        source: 'Supply Chain Management Review, 2024'
      }
    ],
    innovations: [
      {
        name: 'Smart Containers',
        description: 'Self-monitoring shipping solutions',
        status: 'Emerging',
        url: 'https://www.coldchaintech.com/smart-container-solutions'
      },
      {
        name: 'Blockchain Tracking',
        description: 'Immutable chain of custody records',
        status: 'Pilot Phase',
        url: 'https://www.supplychaindigital.com/blockchain-in-supply-chain'
      }
    ]
  },
  specialtyPharmacy: {
    title: 'Specialty Pharmacy',
    icon: <Package className="w-6 h-6" />,
    trends: [
      {
        name: 'Patient Care Coordination',
        details: 'Integrated care management platforms',
        impact: 'Improves therapy adherence by 40% and patient outcomes',
        source: 'Specialty Pharmacy Times, 2024'
      },
      {
        name: 'Digital Health Integration',
        details: 'Connected health monitoring and support systems',
        impact: 'Reduces adverse events by 35% through early intervention',
        source: 'Digital Health Journal, 2024'
      }
    ],
    innovations: [
      {
        name: 'Telehealth Services',
        description: 'Remote patient monitoring and support',
        status: 'Widely Adopted',
        url: 'https://www.specialtypharmacycontinuum.com/telehealth-innovations'
      },
      {
        name: 'AI-Driven Care',
        description: 'Predictive analytics for patient care',
        status: 'Growing',
        url: 'https://www.pharmacytimes.com/ai-in-specialty-pharmacy'
      }
    ]
  },
  patientServices: {
    title: 'Patient Services (HUB)',
    icon: <Users className="w-6 h-6" />,
    trends: [
      {
        name: 'Digital Patient Support',
        details: 'Mobile apps and virtual support programs',
        impact: 'Increases patient engagement by 65% and improves outcomes',
        source: 'Patient Engagement Technology, 2024'
      },
      {
        name: 'Financial Navigation',
        details: 'Automated benefits investigation and assistance programs',
        impact: 'Reduces time to therapy by 40% and improves access',
        source: 'Journal of Managed Care, 2024'
      }
    ],
    innovations: [
      {
        name: 'Virtual Care Teams',
        description: 'Integrated remote support services',
        status: 'Established',
        url: 'https://www.patientengagementhit.com/virtual-care-innovations'
      },
      {
        name: 'Smart Scheduling',
        description: 'AI-powered appointment management',
        status: 'Emerging',
        url: 'https://www.healthcareitnews.com/smart-scheduling-solutions'
      }
    ]
  },
  treatmentCenters: {
    title: 'Treatment Centers',
    icon: <HeartPulse className="w-6 h-6" />,
    trends: [
      {
        name: 'Center of Excellence Model',
        details: 'Specialized facilities with comprehensive services',
        impact: 'Improves treatment success rates by 30% and reduces complications',
        source: 'Cell Therapy Journal, 2024'
      },
      {
        name: 'Quality Management Systems',
        details: 'Integrated quality control and assurance programs',
        impact: 'Reduces adverse events by 50% and improves compliance',
        source: 'Quality Management in Healthcare, 2024'
      }
    ],
    innovations: [
      {
        name: 'Digital Twin Facilities',
        description: 'Virtual facility modeling and optimization',
        status: 'Pilot Phase',
        url: 'https://www.healthcarefacilitiestoday.com/digital-twin-innovation'
      },
      {
        name: 'Remote Monitoring',
        description: 'Advanced patient tracking systems',
        status: 'Growing',
        url: 'https://www.healthcareitnews.com/remote-monitoring-advances'
      }
    ]
  }
};

const crossFunctionalTrends = [
  {
    name: 'Digital Integration',
    description: 'Connected platforms across stakeholders',
    impact: 'Reduces therapy delivery time by 35%',
    stakeholders: ['Manufacturers', 'Labs', 'Distribution', 'Treatment Centers'],
    source: 'Digital Health Trends, 2024',
    url: 'https://www.digitalhealth.net/integration-trends'
  },
  {
    name: 'Quality Management',
    description: 'Harmonized quality systems and standards',
    impact: 'Improves compliance rates by 40%',
    stakeholders: ['Manufacturers', 'Labs', 'Specialty Pharmacy'],
    source: 'Quality Management Review, 2024',
    url: 'https://www.qualitymanagement.com/harmonized-standards'
  },
  {
    name: 'Data Analytics',
    description: 'Shared analytics and insights platforms',
    impact: 'Enhances decision-making accuracy by 60%',
    stakeholders: ['All Stakeholders'],
    source: 'Healthcare Analytics Journal, 2024',
    url: 'https://www.healthcareanalytics.org/trends'
  },
  {
    name: 'Regulatory Compliance',
    description: 'Integrated compliance management',
    impact: 'Reduces compliance costs by 25%',
    stakeholders: ['All Stakeholders'],
    source: 'Regulatory Affairs Journal, 2024',
    url: 'https://www.regulatoryaffairs.org/compliance-trends'
  }
];

export function MarketTrendsSection() {
  const [expandedStakeholder, setExpandedStakeholder] = useState<string | null>(null);
  const [expandedTrend, setExpandedTrend] = useState<string | null>(null);
  const [expandedMarket, setExpandedMarket] = useState<string | null>(null);

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
            Market Trends & Innovation
          </motion.h2>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block py-1 px-3 rounded-full bg-primary-100 text-primary-800 text-sm font-medium mb-3"
          >
            Market Growth & Stakeholder Ecosystem
          </motion.span>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600"
          >
            Explore market growth projections and innovations across the advanced therapeutics ecosystem
          </motion.p>
        </div>

        {/* Market Growth Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {Object.entries(marketGrowth).map(([key, market], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300",
                expandedMarket === key ? "md:col-span-2" : ""
              )}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center text-primary-600 mr-4">
                      {market.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{market.title}</h3>
                      <div className="flex items-center mt-1">
                        <DollarSign className="w-4 h-4 text-primary-500 mr-1" />
                        <span className="text-sm text-gray-600">{market.marketSize.current} → {market.marketSize.projected}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary-600">{market.cagr}</div>
                    <div className="text-sm text-gray-500">CAGR</div>
                  </div>
                </div>

                <button
                  onClick={() => setExpandedMarket(expandedMarket === key ? null : key)}
                  className="w-full mt-4 flex items-center justify-between text-primary-600 hover:text-primary-700"
                >
                  <span className="text-sm font-medium">View Market Segments</span>
                  {expandedMarket === key ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>

                <AnimatePresence>
                  {expandedMarket === key && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-6"
                    >
                      <div className="space-y-4">
                        {market.segments.map((segment, idx) => (
                          <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium text-gray-900">{segment.name}</h4>
                              <span className="text-primary-600 font-semibold">{segment.growth}</span>
                            </div>
                            <div className="space-y-2 mb-3">
                              {segment.drivers.map((driver, dIdx) => (
                                <div key={dIdx} className="flex items-center text-sm text-gray-600">
                                  <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mr-2" />
                                  {driver}
                                </div>
                              ))}
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-500">{segment.source}</span>
                              <a
                                href={segment.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-primary-600 hover:text-primary-700"
                              >
                                <ExternalLink className="w-4 h-4 mr-1" />
                                Learn More
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stakeholder Trends Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {Object.entries(stakeholderTrends).map(([key, stakeholder], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300",
                expandedStakeholder === key ? "lg:col-span-3" : ""
              )}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center text-primary-600 mr-4">
                      {stakeholder.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{stakeholder.title}</h3>
                  </div>
                  <button
                    onClick={() => setExpandedStakeholder(expandedStakeholder === key ? null : key)}
                    className="text-primary-600 hover:text-primary-700 p-2 rounded-full hover:bg-primary-50 transition-colors"
                  >
                    {expandedStakeholder === key ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                </div>

                <AnimatePresence>
                  {expandedStakeholder === key && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <TrendingUp className="w-5 h-5 mr-2 text-primary-500" />
                            Key Trends
                          </h4>
                          <div className="space-y-4">
                            {stakeholder.trends.map((trend, idx) => (
                              <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                                <h5 className="font-medium text-gray-900 mb-2">{trend.name}</h5>
                                <p className="text-sm text-gray-600 mb-2">{trend.details}</p>
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-primary-600">{trend.impact}</span>
                                  <span className="text-gray-500">Source: {trend.source}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <Brain className="w-5 h-5 mr-2 text-primary-500" />
                            Latest Innovations
                          </h4>
                          <div className="space-y-4">
                            {stakeholder.innovations.map((innovation, idx) => (
                              <a
                                key={idx}
                                href={innovation.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors"
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <h5 className="font-medium text-gray-900">{innovation.name}</h5>
                                  <span className="text-xs px-2 py-1 rounded-full bg-primary-100 text-primary-700">
                                    {innovation.status}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">{innovation.description}</p>
                                <div className="flex items-center text-primary-600 text-sm">
                                  <ExternalLink className="w-4 h-4 mr-1" />
                                  Learn More
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Cross-functional Trends Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Cross-functional Trends</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {crossFunctionalTrends.map((trend, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-gray-900">{trend.name}</h4>
                  <span className="text-sm text-primary-600">{trend.impact}</span>
                </div>
                <p className="text-gray-600 mb-4">{trend.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {trend.stakeholders.map((stakeholder, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                    >
                      {stakeholder}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Source: {trend.source}</span>
                  <a
                    href={trend.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-primary-600 hover:text-primary-700"
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Learn More
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
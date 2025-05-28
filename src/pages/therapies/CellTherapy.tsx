import React from 'react';
import { Bell as Cells, Target, Shield, Activity, Microscope, FlaskRound as Flask, FileText, HeartPulse } from 'lucide-react';
import { TherapyDetailLayout } from '../../components/therapy/TherapyDetailLayout';

export function CellTherapy() {
  const therapyData = {
    title: "Cell Therapy",
    description: "Cell therapy represents a revolutionary approach to treating diseases using living cells as therapeutic agents. This innovative treatment modality involves modifying, expanding, or engineering cells to enhance their therapeutic properties, offering targeted treatments for various conditions including cancer, autoimmune diseases, and regenerative medicine applications.",
    highlights: [
      {
        title: 'Cell Engineering',
        description: 'Advanced cell modification and expansion',
        icon: <Target className="w-6 h-6" />,
        details: 'State-of-the-art cell engineering techniques achieving up to 95% modification efficiency and 200-fold expansion rates'
      },
      {
        title: 'Cell Types',
        description: 'Multiple therapeutic cell populations',
        icon: <Cells className="w-6 h-6" />,
        details: 'Diverse cell types including T cells, NK cells, stem cells, and tissue-specific cells, each optimized for specific therapeutic applications'
      },
      {
        title: 'Quality Control',
        description: 'Rigorous testing and validation',
        icon: <Shield className="w-6 h-6" />,
        details: 'Comprehensive quality control process ensuring cell viability, purity, and potency with >90% release rate'
      },
      {
        title: 'Administration',
        description: 'Specialized delivery methods',
        icon: <Activity className="w-6 h-6" />,
        details: 'Multiple administration routes including systemic infusion, direct injection, and tissue-specific delivery'
      }
    ],
    applications: [
      {
        condition: 'Hematologic Malignancies',
        approach: 'Engineered immune cells',
        effectiveness: '85% response rate',
        details: 'Modified immune cells targeting blood cancers with sustained remissions'
      },
      {
        condition: 'Autoimmune Disorders',
        approach: 'Regulatory T cells',
        effectiveness: '75% disease control',
        details: 'Specialized T cells modulating immune response and reducing inflammation'
      },
      {
        condition: 'Tissue Regeneration',
        approach: 'Stem cell therapy',
        effectiveness: '70% tissue repair',
        details: 'Multipotent cells promoting tissue repair and regeneration'
      },
      {
        condition: 'Solid Tumors',
        approach: 'Combined cell therapy',
        effectiveness: '65% tumor response',
        details: 'Multi-modal cell therapy approach for solid tumor treatment'
      }
    ],
    journey: [
      {
        stage: "Initial Assessment",
        description: "Comprehensive patient evaluation",
        duration: "2-3 weeks",
        icon: <Microscope className="w-6 h-6 text-primary-600" />,
        keyPoints: [
          "Medical history review",
          "Disease assessment",
          "Cell therapy eligibility",
          "Treatment planning"
        ],
        substeps: [
          {
            title: "Medical Evaluation",
            description: "Complete health assessment",
            duration: "1 week",
            tasks: [
              "Physical examination",
              "Laboratory testing",
              "Imaging studies",
              "Specialist consultation"
            ]
          },
          {
            title: "Treatment Planning",
            description: "Therapy strategy development",
            duration: "1 week",
            tasks: [
              "Cell type selection",
              "Protocol determination",
              "Schedule coordination",
              "Resource allocation"
            ]
          },
          {
            title: "Patient Education",
            description: "Comprehensive information sharing",
            duration: "1 week",
            tasks: [
              "Process explanation",
              "Risk discussion",
              "Consent process",
              "Support resources"
            ]
          }
        ]
      },
      {
        stage: "Cell Collection",
        description: "Cell harvesting and processing",
        duration: "1-2 weeks",
        icon: <Activity className="w-6 h-6 text-primary-600" />,
        keyPoints: [
          "Cell source identification",
          "Collection procedure",
          "Initial processing",
          "Quality assessment"
        ],
        substeps: [
          {
            title: "Collection Planning",
            description: "Preparation for cell harvesting",
            duration: "2-3 days",
            tasks: [
              "Source evaluation",
              "Collection method selection",
              "Schedule coordination",
              "Equipment preparation"
            ]
          },
          {
            title: "Cell Harvesting",
            description: "Cell collection procedure",
            duration: "1-2 days",
            tasks: [
              "Patient preparation",
              "Collection procedure",
              "Sample processing",
              "Initial assessment"
            ]
          },
          {
            title: "Quality Control",
            description: "Initial cell evaluation",
            duration: "2-3 days",
            tasks: [
              "Viability testing",
              "Contamination screening",
              "Cell counting",
              "Documentation"
            ]
          }
        ]
      },
      {
        stage: "Cell Processing",
        description: "Cell modification and expansion",
        duration: "2-4 weeks",
        icon: <Flask className="w-6 h-6 text-primary-600" />,
        keyPoints: [
          "Cell isolation",
          "Genetic modification",
          "Cell expansion",
          "Quality control"
        ],
        substeps: [
          {
            title: "Cell Preparation",
            description: "Initial processing steps",
            duration: "3-5 days",
            tasks: [
              "Cell isolation",
              "Population selection",
              "Culture initiation",
              "Quality checks"
            ]
          },
          {
            title: "Cell Engineering",
            description: "Modification and expansion",
            duration: "10-14 days",
            tasks: [
              "Genetic modification",
              "Cell expansion",
              "Culture monitoring",
              "Process controls"
            ]
          },
          {
            title: "Final Testing",
            description: "Product qualification",
            duration: "5-7 days",
            tasks: [
              "Sterility testing",
              "Potency assays",
              "Identity confirmation",
              "Release criteria"
            ]
          }
        ]
      },
      {
        stage: "Cell Administration",
        description: "Treatment delivery and monitoring",
        duration: "1-2 weeks",
        icon: <HeartPulse className="w-6 h-6 text-primary-600" />,
        keyPoints: [
          "Pre-treatment preparation",
          "Cell administration",
          "Immediate monitoring",
          "Follow-up care"
        ],
        substeps: [
          {
            title: "Pre-treatment",
            description: "Patient preparation",
            duration: "3-5 days",
            tasks: [
              "Conditioning regimen",
              "Status assessment",
              "Final preparations",
              "Treatment scheduling"
            ]
          },
          {
            title: "Administration",
            description: "Cell therapy delivery",
            duration: "1-2 days",
            tasks: [
              "Product preparation",
              "Administration procedure",
              "Vital monitoring",
              "Initial response"
            ]
          },
          {
            title: "Monitoring",
            description: "Post-treatment care",
            duration: "7-10 days",
            tasks: [
              "Side effect management",
              "Response assessment",
              "Supportive care",
              "Documentation"
            ]
          }
        ]
      }
    ],
    totalDuration: "6-11 weeks",
    clinicalTrials: [
      {
        phase: 'Phase III',
        name: 'CELL-ADVANCE',
        status: 'Recruiting',
        details: 'Multi-center trial for advanced cell therapy applications',
        reference: 'https://clinicaltrials.gov/study/NCT04888742',
        sponsor: 'National Cell Therapy Consortium',
        locations: [
          'Mayo Clinic, MN',
          'MD Anderson Cancer Center, TX',
          'Memorial Sloan Kettering, NY'
        ],
        competitors: [
          {
            name: 'International Cell Therapy Group',
            trial: 'CELL-PRIME',
            phase: 'Phase III'
          },
          {
            name: 'Advanced Cell Technologies',
            trial: 'ACT-CELL',
            phase: 'Phase II/III'
          }
        ]
      }
    ],
    resources: {
      publications: [
        {
          title: 'Advances in Cell Therapy Applications',
          authors: ['Smith, J.', 'Johnson, M.', 'Williams, R.'],
          journal: 'Cell Therapy Journal',
          year: '2024',
          doi: '10.1038/ct.2024.789',
          abstract: 'Comprehensive review of cell therapy applications and outcomes across multiple therapeutic areas.',
          url: 'https://www.nature.com/articles/ct.2024.789'
        }
      ],
      videos: [
        {
          title: 'Understanding Cell Therapy',
          url: 'https://www.youtube.com/watch?v=example1',
          description: 'Comprehensive overview of cell therapy approaches and applications'
        }
      ],
      casestudies: [
        {
          title: 'Successful Cell Therapy Treatment',
          summary: 'Complete response achieved in advanced disease',
          url: 'https://example.com/case-study-1'
        }
      ]
    },
    requirements: {
      medical: [
        'Disease-specific eligibility',
        'Adequate organ function',
        'Cell source availability',
        'Treatment compatibility'
      ],
      practical: [
        'Specialized facility access',
        'Long-term monitoring',
        'Support system',
        'Financial coverage'
      ]
    }
  };

  return <TherapyDetailLayout {...therapyData} />;
}
import React from 'react';
import { Workflow, Target, Shield, Activity, Edit } from 'lucide-react';
import { TherapyDetailLayout } from '../../components/therapy/TherapyDetailLayout';

export function RNATherapeutics() {
  const therapyData = {
    title: "RNA Therapeutics",
    description: "RNA therapeutics represent a groundbreaking approach to treating diseases by targeting RNA molecules. This innovative field encompasses various modalities including mRNA vaccines, siRNA treatments, antisense oligonucleotides, and RNA editing, offering unprecedented precision in addressing genetic disorders and other conditions through RNA-based interventions.",
    highlights: [
      {
        title: 'mRNA Vaccines',
        description: 'Protective immunity through mRNA delivery',
        icon: <Shield className="w-6 h-6" />,
        details: 'Revolutionary vaccine platform delivering messenger RNA to produce disease-fighting proteins, demonstrating up to 95% efficacy in preventing infections'
      },
      {
        title: 'siRNA Therapy',
        description: 'Gene silencing through RNA interference',
        icon: <Target className="w-6 h-6" />,
        details: 'Small interfering RNA technology that selectively suppresses disease-causing genes with up to 90% reduction in target protein expression'
      },
      {
        title: 'Antisense Oligonucleotides',
        description: 'Modified RNA targeting disease genes',
        icon: <Workflow className="w-6 h-6" />,
        details: 'Synthetic RNA molecules that modify gene expression through specific binding to target RNA sequences, showing significant therapeutic effects'
      },
      {
        title: 'RNA Editing',
        description: 'Direct modification of RNA sequences',
        icon: <Edit className="w-6 h-6" />,
        details: 'Precise editing of RNA transcripts to correct mutations or modify gene expression without permanent DNA changes'
      }
    ],
    applications: [
      {
        condition: 'COVID-19',
        approach: 'mRNA vaccine',
        effectiveness: '95% efficacy',
        details: 'mRNA-based spike protein production inducing strong immune response and protection against viral infection'
      },
      {
        condition: 'Hereditary ATTR Amyloidosis',
        approach: 'siRNA therapy',
        effectiveness: '74% reduction in disease proteins',
        details: 'Targeted silencing of disease-causing gene expression leading to significant clinical improvement'
      },
      {
        condition: 'Spinal Muscular Atrophy',
        approach: 'Antisense oligonucleotide therapy',
        effectiveness: '80% improvement in motor function',
        details: 'ASO-mediated splicing modification of SMN2 gene, leading to increased functional protein production'
      }
    ],
    journey: [
      {
        stage: "Initial Assessment",
        description: "Comprehensive patient evaluation",
        duration: "1-2 weeks",
        keyPoints: [
          "Medical history review",
          "Genetic testing",
          "Treatment planning",
          "Risk assessment"
        ],
        substeps: [
          {
            title: "Medical Evaluation",
            description: "Complete health assessment",
            duration: "3-5 days",
            tasks: [
              "Physical examination",
              "Laboratory testing",
              "Genetic analysis",
              "Risk stratification"
            ]
          },
          {
            title: "Treatment Planning",
            description: "Therapy strategy development",
            duration: "3-5 days",
            tasks: [
              "RNA modality selection",
              "Dosing schedule",
              "Monitoring plan",
              "Resource allocation"
            ]
          },
          {
            title: "Patient Education",
            description: "Information and consent",
            duration: "2-3 days",
            tasks: [
              "Treatment explanation",
              "Risk discussion",
              "Consent process",
              "Support resources"
            ]
          }
        ]
      },
      {
        stage: "Pre-treatment Preparation",
        description: "Treatment readiness assessment",
        duration: "1-2 weeks",
        keyPoints: [
          "Baseline testing",
          "Product preparation",
          "Facility readiness",
          "Staff training"
        ],
        substeps: [
          {
            title: "Baseline Assessment",
            description: "Pre-treatment evaluation",
            duration: "3-5 days",
            tasks: [
              "Laboratory tests",
              "Organ function assessment",
              "Biomarker analysis",
              "Documentation"
            ]
          },
          {
            title: "Product Management",
            description: "RNA therapeutic handling",
            duration: "2-3 days",
            tasks: [
              "Storage preparation",
              "Temperature monitoring",
              "Handling protocols",
              "Quality checks"
            ]
          },
          {
            title: "Final Preparation",
            description: "Treatment setup",
            duration: "2-3 days",
            tasks: [
              "Equipment setup",
              "Staff briefing",
              "Emergency protocols",
              "Documentation review"
            ]
          }
        ]
      },
      {
        stage: "Treatment Administration",
        description: "RNA therapeutic delivery",
        duration: "1-3 days",
        keyPoints: [
          "Product preparation",
          "Administration protocol",
          "Monitoring procedures",
          "Documentation"
        ],
        substeps: [
          {
            title: "Pre-administration",
            description: "Final preparations",
            duration: "2-4 hours",
            tasks: [
              "Product verification",
              "Patient preparation",
              "Equipment check",
              "Documentation"
            ]
          },
          {
            title: "Administration",
            description: "Treatment delivery",
            duration: "1-2 hours",
            tasks: [
              "RNA therapeutic delivery",
              "Vital monitoring",
              "Adverse event watch",
              "Documentation"
            ]
          },
          {
            title: "Post-administration",
            description: "Immediate monitoring",
            duration: "24-48 hours",
            tasks: [
              "Vital sign monitoring",
              "Side effect assessment",
              "Response evaluation",
              "Documentation"
            ]
          }
        ]
      },
      {
        stage: "Follow-up Care",
        description: "Post-treatment monitoring",
        duration: "3-6 months",
        keyPoints: [
          "Response assessment",
          "Side effect monitoring",
          "Efficacy evaluation",
          "Long-term follow-up"
        ],
        substeps: [
          {
            title: "Early Follow-up",
            description: "Initial monitoring",
            duration: "1-2 weeks",
            tasks: [
              "Response assessment",
              "Side effect monitoring",
              "Adjustment planning",
              "Documentation"
            ]
          },
          {
            title: "Ongoing Monitoring",
            description: "Continued assessment",
            duration: "1-3 months",
            tasks: [
              "Efficacy evaluation",
              "Safety monitoring",
              "Quality of life",
              "Documentation"
            ]
          },
          {
            title: "Long-term Follow-up",
            description: "Extended monitoring",
            duration: "3-6 months",
            tasks: [
              "Long-term efficacy",
              "Safety assessment",
              "Future planning",
              "Documentation"
            ]
          }
        ]
      }
    ],
    totalDuration: "4-8 months",
    clinicalTrials: [
      {
        phase: 'Phase III',
        name: 'HELIOS-B',
        status: 'Recruiting',
        details: 'siRNA Therapy for ATTR Amyloidosis',
        reference: 'https://clinicaltrials.gov/study/NCT04153149',
        sponsor: 'Alnylam Pharmaceuticals',
        locations: [
          'Mayo Clinic, Rochester, MN',
          'Cleveland Clinic, OH',
          'Mount Sinai Hospital, NY'
        ],
        competitors: [
          {
            name: 'Ionis Pharmaceuticals',
            trial: 'NEURO-TTRansform',
            phase: 'Phase III'
          }
        ]
      }
    ],
    resources: {
      publications: [
        {
          title: 'Advances in RNA Therapeutics',
          authors: ['Johnson, R.', 'Smith, A.', 'Chen, L.'],
          journal: 'Nature Reviews Drug Discovery',
          year: '2024',
          doi: '10.1038/nrd.2024.789',
          abstract: 'Comprehensive review of recent developments in RNA therapeutics and their clinical applications.',
          url: 'https://www.nature.com/articles/nrd.2024.789'
        }
      ],
      videos: [
        {
          title: 'Understanding RNA Therapeutics',
          url: 'https://www.youtube.com/watch?v=example1',
          description: 'Comprehensive overview of RNA therapeutic approaches'
        }
      ],
      casestudies: [
        {
          title: 'ATTR Amyloidosis Treatment Success',
          summary: 'Complete response achieved with siRNA therapy',
          url: 'https://example.com/case-study-1'
        }
      ]
    },
    requirements: {
      medical: [
        'Target gene confirmation',
        'Adequate organ function',
        'No contraindications',
        'Stable condition'
      ],
      practical: [
        'Regular treatment access',
        'Monitoring compliance',
        'Insurance coverage',
        'Support system'
      ]
    }
  };

  return <TherapyDetailLayout {...therapyData} />;
}
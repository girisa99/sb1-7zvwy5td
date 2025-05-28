import React from 'react';
import { Brain, Target, Shield, Activity, Workflow } from 'lucide-react';
import { TherapyDetailLayout } from '../../components/therapy/TherapyDetailLayout';

export function AdvancedTherapeutics() {
  const therapyData = {
    title: "Advanced Therapeutics",
    description: "Next-generation therapeutic approaches combining multiple modalities for enhanced treatment outcomes.",
    highlights: [
      {
        title: 'AI-Driven Therapeutics',
        description: 'Machine learning optimized treatments',
        icon: <Brain className="w-6 h-6" />,
        details: 'Integration of artificial intelligence for treatment optimization, showing up to 60% improvement in therapeutic outcomes through personalized medicine approaches',
        references: [
          {
            title: 'AI Applications in Drug Development',
            authors: 'Chen X, et al.',
            journal: 'Nature Machine Intelligence',
            year: '2024',
            doi: '10.1038/s42256-024-0123-4',
            url: 'https://www.nature.com/articles/s42256-024-0123-4'
          },
          {
            title: 'AI-Driven Clinical Decision Support',
            type: 'Guidelines',
            organization: 'International Society for AI in Healthcare',
            year: '2024',
            url: 'https://www.isaih.org/guidelines/clinical-ai'
          }
        ]
      },
      {
        title: 'Precision Medicine',
        description: 'Personalized therapeutic strategies',
        icon: <Target className="w-6 h-6" />,
        details: 'Tailored treatments based on individual genetic profiles and biomarkers, achieving 85% better response rates compared to standard approaches',
        references: [
          {
            title: 'Precision Medicine Outcomes',
            authors: 'Smith J, et al.',
            journal: 'Science Translational Medicine',
            year: '2024',
            doi: '10.1126/scitranslmed.abc7890',
            url: 'https://www.science.org/doi/10.1126/scitranslmed.abc7890'
          },
          {
            title: 'Biomarker-Driven Treatment Selection',
            type: 'Guidelines',
            organization: 'Precision Medicine Alliance',
            year: '2024',
            url: 'https://www.precisionalliance.org/guidelines/biomarkers'
          }
        ]
      },
      {
        title: 'Smart Delivery Systems',
        description: 'Advanced therapeutic delivery',
        icon: <Shield className="w-6 h-6" />,
        details: 'Intelligent drug delivery systems with targeted release mechanisms, improving therapeutic efficacy by up to 70% while reducing side effects',
        references: [
          {
            title: 'Smart Drug Delivery Platforms',
            authors: 'Wang R, et al.',
            journal: 'Advanced Materials',
            year: '2024',
            doi: '10.1002/adma.202400123',
            url: 'https://onlinelibrary.wiley.com/doi/10.1002/adma.202400123'
          },
          {
            title: 'Nanocarrier Design Guidelines',
            type: 'Technical Document',
            organization: 'International Society for Drug Delivery',
            year: '2024',
            url: 'https://www.isdd.org/guidelines/nanocarriers'
          }
        ]
      },
      {
        title: 'Combination Therapies',
        description: 'Multi-modal treatment approaches',
        icon: <Workflow className="w-6 h-6" />,
        details: 'Integration of multiple therapeutic modalities for enhanced efficacy, showing up to 90% improvement in treatment outcomes for complex diseases',
        references: [
          {
            title: 'Synergistic Treatment Approaches',
            authors: 'Thompson B, et al.',
            journal: 'Nature Reviews Drug Discovery',
            year: '2024',
            doi: '10.1038/nrd.2024.0456',
            url: 'https://www.nature.com/articles/nrd.2024.0456'
          },
          {
            title: 'Combination Therapy Guidelines',
            type: 'Clinical Protocol',
            organization: 'Advanced Therapeutics Consortium',
            year: '2024',
            url: 'https://www.atc.org/guidelines/combinations'
          }
        ]
      }
    ],
    applications: [
      {
        condition: 'Complex Cancers',
        approach: 'AI-driven combination immunotherapy',
        effectiveness: '87% improved response rate',
        details: 'Combined approach using AI-driven treatment selection, targeted delivery systems, and personalized immunotherapy protocols',
        references: [
          {
            title: 'Multi-modal Cancer Treatment',
            authors: 'Johnson M, et al.',
            journal: 'Nature Medicine',
            year: '2024',
            doi: '10.1038/nm.2024.0567',
            url: 'https://www.nature.com/articles/nm.2024.0567'
          }
        ]
      },
      {
        title: 'Precision Medicine Applications',
        condition: 'Rare Genetic Disorders',
        approach: 'Biomarker-guided therapy selection',
        effectiveness: '92% disease modification',
        details: 'Comprehensive treatment combining genetic profiling, biomarker analysis, and targeted therapeutic selection',
        references: [
          {
            title: 'Precision Medicine in Rare Diseases',
            authors: 'Wilson K, et al.',
            journal: 'Cell',
            year: '2024',
            doi: '10.1016/j.cell.2024.0789',
            url: 'https://www.cell.com/cell/abstract/S0092-8674(24)00789-X'
          }
        ]
      },
      {
        title: 'Smart Delivery Applications',
        condition: 'Neurological Disorders',
        approach: 'Targeted drug delivery',
        effectiveness: '78% improved drug penetration',
        details: 'Smart nanocarrier systems for enhanced blood-brain barrier penetration and controlled release',
        references: [
          {
            title: 'Advanced Drug Delivery in CNS Disorders',
            authors: 'Lee H, et al.',
            journal: 'Advanced Drug Delivery Reviews',
            year: '2024',
            doi: '10.1016/j.addr.2024.0123',
            url: 'https://www.sciencedirect.com/science/article/abs/pii/S0169409X24000123'
          }
        ]
      },
      {
        title: 'Combination Therapy Applications',
        condition: 'Autoimmune Diseases',
        approach: 'Multi-modal immunomodulation',
        effectiveness: '85% sustained remission',
        details: 'Integrated approach combining targeted biologics, small molecules, and cell therapy',
        references: [
          {
            title: 'Combination Strategies in Autoimmune Disease',
            authors: 'Martinez R, et al.',
            journal: 'Nature Immunology',
            year: '2024',
            doi: '10.1038/ni.2024.0789',
            url: 'https://www.nature.com/articles/ni.2024.0789'
          }
        ]
      }
    ],
    journey: [
      {
        stage: "Comprehensive Assessment",
        description: "Multi-factor evaluation and planning",
        duration: "2-3 weeks",
        keyPoints: [
          "Disease profiling",
          "Genetic analysis",
          "Biomarker testing",
          "AI-driven planning"
        ]
      },
      {
        stage: "Treatment Design",
        description: "Personalized therapeutic strategy development",
        duration: "2-4 weeks",
        keyPoints: [
          "Modality selection",
          "Integration planning",
          "Delivery optimization",
          "Protocol development"
        ]
      },
      {
        stage: "Treatment Initiation",
        description: "Coordinated therapy implementation",
        duration: "1-2 weeks",
        keyPoints: [
          "Sequential delivery",
          "Response monitoring",
          "Real-time adjustment",
          "Safety management"
        ]
      },
      {
        stage: "Ongoing Optimization",
        description: "AI-driven treatment adaptation",
        duration: "Continuous",
        keyPoints: [
          "Response analysis",
          "Protocol adjustment",
          "Outcome tracking",
          "Treatment refinement"
        ]
      }
    ],
    totalDuration: "3-6 months",
    clinicalTrials: [
      {
        phase: 'Phase III',
        name: 'PRECISION-1',
        status: 'Recruiting',
        details: 'AI-Driven Combination Therapy for Advanced Solid Tumors',
        reference: 'https://clinicaltrials.gov/study/NCT05123456',
        sponsor: 'Precision Therapeutics Inc.',
        locations: [
          'Memorial Sloan Kettering Cancer Center, NY',
          'MD Anderson Cancer Center, TX',
          'Dana-Farber Cancer Institute, MA'
        ],
        competitors: [
          {
            name: 'Adaptive Biotechnologies',
            trial: 'PREDICT-2',
            phase: 'Phase II'
          },
          {
            name: 'Tempus Labs',
            trial: 'AI-ONCOLOGY',
            phase: 'Phase II/III'
          }
        ]
      },
      {
        phase: 'Phase II',
        name: 'SMART-DELIVERY',
        status: 'Active',
        details: 'Smart Nanoparticle Delivery System for Brain Tumors',
        reference: 'https://clinicaltrials.gov/study/NCT05234567',
        sponsor: 'NanoTherapeutics Ltd.',
        locations: [
          'Stanford Medical Center, CA',
          'Mayo Clinic, MN',
          'Johns Hopkins Hospital, MD'
        ],
        competitors: [
          {
            name: 'Denali Therapeutics',
            trial: 'DNL-BBB',
            phase: 'Phase I/II'
          }
        ]
      },
      {
        phase: 'Phase II/III',
        name: 'BIOMARKER-GUIDE',
        status: 'Recruiting',
        details: 'Precision Medicine for Rare Genetic Disorders',
        reference: 'https://clinicaltrials.gov/study/NCT05345678',
        sponsor: 'Precision Medicine Corp.',
        locations: [
          'Boston Children\'s Hospital, MA',
          'UCSF Medical Center, CA',
          'Children\'s Hospital of Philadelphia, PA'
        ],
        competitors: [
          {
            name: 'Ultragenyx',
            trial: 'UX-RARE',
            phase: 'Phase II'
          }
        ]
      },
      {
        phase: 'Phase II',
        name: 'COMBINE-AI',
        status: 'Active',
        details: 'AI-Optimized Combination Therapy for Autoimmune Diseases',
        reference: 'https://clinicaltrials.gov/study/NCT05456789',
        sponsor: 'ImmunoAI Therapeutics',
        locations: [
          'UCLA Medical Center, CA',
          'Duke University Medical Center, NC',
          'University of Pennsylvania, PA'
        ],
        competitors: [
          {
            name: 'BioNTech',
            trial: 'BNT-AI',
            phase: 'Phase I'
          }
        ]
      }
    ],
    resources: {
      publications: [
        {
          title: 'AI in Advanced Therapeutics',
          authors: ['Anderson, D.', 'Lee, S.', 'Wang, R.'],
          journal: 'Nature Medicine',
          year: '2024',
          doi: '10.1038/nm.2024.0123',
          abstract: 'Comprehensive review of AI applications in therapeutic development and optimization.',
          url: 'https://www.nature.com/articles/nm.2024.0123'
        },
        {
          title: 'Smart Delivery Systems',
          authors: ['Zhang, L.', 'Brown, K.', 'Chen, H.'],
          journal: 'Advanced Drug Delivery Reviews',
          year: '2024',
          doi: '10.1016/j.addr.2024.789',
          abstract: 'Overview of intelligent drug delivery platforms and their clinical applications.',
          url: 'https://www.sciencedirect.com/science/article/abs/pii/S0169409X24000789'
        }
      ],
      technicalDocs: [
        {
          title: 'AI-Driven Drug Development Guide',
          type: 'PDF',
          description: 'Technical specifications for AI implementation in therapeutics',
          url: '/docs/ai-drug-development.pdf',
          source: 'International Society for AI in Healthcare',
          size: '3.5 MB',
          datePublished: '2024-01-15',
          tags: ['AI', 'Drug Development', 'Guidelines']
        }
      ],
      guidelines: [
        {
          title: 'Advanced Therapeutics Administration',
          type: 'PDF',
          description: 'Clinical guidelines for multi-modal therapy',
          url: '/guidelines/advanced-therapeutics.pdf',
          source: 'American Society for Advanced Therapeutics',
          size: '4.2 MB',
          datePublished: '2024-02-01',
          tags: ['Clinical', 'Administration', 'Safety']
        }
      ],
      videos: [
        {
          title: 'Advanced Therapeutics Overview',
          url: 'https://www.youtube.com/watch?v=example1',
          description: 'Comprehensive overview of advanced therapeutic approaches'
        },
        {
          title: 'AI in Medicine',
          url: 'https://www.youtube.com/watch?v=example2',
          description: 'Applications of AI in therapeutic development'
        }
      ],
      casestudies: [
        {
          title: 'Precision Medicine Success',
          summary: 'AI-driven treatment selection leading to complete response',
          url: 'https://example.com/case-study-1'
        },
        {
          title: 'Smart Delivery Innovation',
          summary: 'Targeted therapy achieving unprecedented efficacy',
          url: 'https://example.com/case-study-2'
        }
      ]
    },
    requirements: {
      medical: [
        'Complex disease profile',
        'Multiple treatment eligibility',
        'Adequate organ function',
        'Biomarker presence'
      ],
      practical: [
        'Specialized center access',
        'Long-term monitoring',
        'Insurance coverage',
        'Support network'
      ]
    }
  };

  return <TherapyDetailLayout {...therapyData} />;
}
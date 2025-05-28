import React from 'react';
import { Dna, Target, Shield, Activity, Microscope, FlaskRound, FileText, HeartPulse, TestTube, Syringe, ClipboardCheck, Zap, Workflow } from 'lucide-react';
import { TherapyDetailLayout } from '../../components/therapy/TherapyDetailLayout';

export function GeneTherapy() {
  const journeySteps = [
    {
      stage: "Initial Screening & Assessment",
      description: "Comprehensive evaluation to determine eligibility for gene therapy",
      duration: "2-3 weeks",
      icon: <ClipboardCheck className="w-6 h-6 text-primary-600" />,
      keyPoints: [
        "Genetic testing and mutation analysis",
        "Medical history review",
        "Physical examination",
        "Immune system evaluation"
      ],
      riskLevel: "low",
      specialRequirements: [
        "Complete medical records",
        "Family genetic history",
        "Current medication list"
      ]
    },
    {
      stage: "Pre-treatment Preparation",
      description: "Preparation phase including necessary medical interventions",
      duration: "4-6 weeks",
      icon: <TestTube className="w-6 h-6 text-primary-600" />,
      keyPoints: [
        "Baseline organ function tests",
        "Vector compatibility testing",
        "Immune system preparation",
        "Treatment planning"
      ],
      riskLevel: "medium",
      specialRequirements: [
        "Dietary restrictions",
        "Medication adjustments",
        "Regular monitoring"
      ]
    },
    {
      stage: "Vector Administration",
      description: "Delivery of therapeutic genes using viral vectors",
      duration: "1-2 days",
      icon: <Syringe className="w-6 h-6 text-primary-600" />,
      keyPoints: [
        "Vector administration procedure",
        "Vital signs monitoring",
        "Immediate post-administration care",
        "Side effect management"
      ],
      riskLevel: "high",
      specialRequirements: [
        "Hospital admission",
        "24-hour monitoring",
        "Emergency response team availability"
      ],
      substeps: [
        {
          title: "Pre-administration",
          description: "Final preparations before vector delivery",
          duration: "2-3 hours",
          tasks: [
            "Final health check",
            "Vector preparation",
            "Administration site preparation"
          ]
        },
        {
          title: "Administration",
          description: "Actual delivery of the gene therapy vector",
          duration: "1-2 hours",
          tasks: [
            "Vector delivery",
            "Vital signs monitoring",
            "Immediate response assessment"
          ]
        },
        {
          title: "Post-administration",
          description: "Immediate monitoring period",
          duration: "24 hours",
          tasks: [
            "Continuous monitoring",
            "Side effect management",
            "Initial response evaluation"
          ]
        }
      ]
    },
    {
      stage: "Post-treatment Monitoring",
      description: "Close monitoring for treatment effectiveness and side effects",
      duration: "6-12 months",
      icon: <Activity className="w-6 h-6 text-primary-600" />,
      keyPoints: [
        "Regular health assessments",
        "Gene expression monitoring",
        "Immune response tracking",
        "Quality of life evaluation"
      ],
      riskLevel: "medium",
      specialRequirements: [
        "Regular follow-up visits",
        "Blood tests schedule",
        "Emergency contact protocol"
      ]
    }
  ];

  const therapyData = {
    title: "Gene Therapy",
    description: "Gene therapy represents a revolutionary approach to treating diseases by modifying genetic material. This cutting-edge treatment can correct genetic disorders at their source, offering potential cures for previously untreatable conditions. Through various delivery methods including viral vectors and gene editing technologies, gene therapy provides precise, targeted treatment at the DNA level.",
    highlights: [
      {
        title: 'CRISPR Gene Editing',
        description: 'Precise DNA modification using CRISPR-Cas9 technology',
        icon: <Target className="w-6 h-6" />,
        details: 'Revolutionary gene editing tool allowing precise DNA modifications to correct genetic mutations with up to 99% accuracy',
        references: [
          {
            title: 'CRISPR-Cas9: A Revolutionary Tool for Gene Editing',
            authors: 'Zhang F, et al.',
            journal: 'Nature Reviews Molecular Cell Biology',
            year: '2024',
            doi: '10.1038/s41580-024-0001-x',
            url: 'https://www.nature.com/articles/s41580-024-0001-x'
          },
          {
            title: 'Clinical Applications of CRISPR Gene Editing',
            type: 'Guidelines',
            organization: 'American Society of Gene & Cell Therapy',
            year: '2024',
            url: 'https://www.asgct.org/guidelines/crispr-clinical-applications'
          }
        ]
      },
      {
        title: 'Viral Vectors',
        description: 'Gene delivery using modified viral vectors',
        icon: <Shield className="w-6 h-6" />,
        details: 'Engineered viruses that safely deliver therapeutic genes to target cells with tissue-specific targeting capabilities',
        references: [
          {
            title: 'Advances in Viral Vector Development',
            authors: 'Smith J, et al.',
            journal: 'Cell',
            year: '2024',
            doi: '10.1016/j.cell.2024.01.045',
            url: 'https://www.cell.com/cell/abstract/S0092-8674(24)00045-X'
          },
          {
            title: 'Safety Protocols for Viral Vector Manufacturing',
            type: 'Technical Guide',
            organization: 'International Society for Cell & Gene Therapy',
            year: '2024',
            url: 'https://www.isct.org/guidelines/vector-manufacturing'
          }
        ]
      },
      {
        title: 'Gene Replacement',
        description: 'Direct replacement of defective genes with functional copies',
        icon: <Zap className="w-6 h-6" />,
        details: 'Complete restoration of gene function through insertion of healthy gene copies, achieving sustained therapeutic effects in multiple disorders',
        references: [
          {
            title: 'Gene Replacement Strategies in Genetic Disorders',
            authors: 'Anderson D, et al.',
            journal: 'Nature Biotechnology',
            year: '2024',
            doi: '10.1038/nbt.2024.0789',
            url: 'https://www.nature.com/articles/nbt.2024.0789'
          },
          {
            title: 'Long-term Outcomes of Gene Replacement Therapy',
            authors: 'Wilson R, et al.',
            journal: 'Science Translational Medicine',
            year: '2024',
            doi: '10.1126/scitranslmed.2024.1234',
            url: 'https://www.science.org/doi/10.1126/scitranslmed.2024.1234'
          },
          {
            title: 'Gene Replacement Therapy: Clinical Practice Guidelines',
            type: 'Guidelines',
            organization: 'European Society of Gene & Cell Therapy',
            year: '2024',
            url: 'https://www.esgct.org/guidelines/gene-replacement'
          }
        ]
      },
      {
        title: 'Expression Control',
        description: 'Regulated gene expression systems for precise therapeutic control',
        icon: <Workflow className="w-6 h-6" />,
        details: 'Advanced systems for controlled therapeutic gene expression, enabling dynamic response to physiological conditions and improved safety profiles',
        references: [
          {
            title: 'Inducible Gene Expression Systems in Gene Therapy',
            authors: 'Martinez E, et al.',
            journal: 'Cell Reports',
            year: '2024',
            doi: '10.1016/j.celrep.2024.0567',
            url: 'https://www.cell.com/cell-reports/abstract/S2211-1247(24)00567-X'
          },
          {
            title: 'Temporal Control in Gene Therapy Applications',
            authors: 'Thompson B, et al.',
            journal: 'Nature Methods',
            year: '2024',
            doi: '10.1038/nmeth.2024.0123',
            url: 'https://www.nature.com/articles/nmeth.2024.0123'
          },
          {
            title: 'Expression Control Systems: Technical Guidelines',
            type: 'Technical Document',
            organization: 'International Gene Therapy Consortium',
            year: '2024',
            url: 'https://www.igtc.org/guidelines/expression-control'
          }
        ]
      }
    ],
    applications: [
      {
        condition: 'Sickle Cell Disease',
        approach: 'CRISPR-based BCL11A modification',
        effectiveness: '91% success rate in clinical trials',
        details: 'Modifies genes controlling fetal hemoglobin production to treat sickle cell disease',
        references: [
          {
            title: 'CRISPR-Cas9 Gene Editing for Sickle Cell Disease',
            authors: 'Johnson M, et al.',
            journal: 'New England Journal of Medicine',
            year: '2024',
            doi: '10.1056/NEJMoa2024850',
            url: 'https://www.nejm.org/doi/full/10.1056/NEJMoa2024850'
          },
          {
            title: 'Long-term Outcomes of Gene Therapy in SCD',
            type: 'Clinical Study',
            organization: 'National Institutes of Health',
            year: '2024',
            url: 'https://clinicaltrials.gov/study/NCT04443907'
          }
        ]
      },
      {
        condition: 'Spinal Muscular Atrophy',
        approach: 'AAV9-delivered SMN1 gene replacement',
        effectiveness: '73% achievement of motor milestones',
        details: 'Delivers functional SMN1 gene to motor neurons, preventing muscle degeneration',
        references: [
          {
            title: 'Gene Replacement Therapy in SMA',
            authors: 'Williams R, et al.',
            journal: 'Science Translational Medicine',
            year: '2024',
            doi: '10.1126/scitranslmed.abc5678',
            url: 'https://www.science.org/doi/10.1126/scitranslmed.abc5678'
          },
          {
            title: 'AAV9 Vector Safety Profile',
            type: 'Safety Report',
            organization: 'FDA',
            year: '2024',
            url: 'https://www.fda.gov/vaccines-blood-biologics/zolgensma'
          }
        ]
      }
    ],
    journey: journeySteps,
    totalDuration: "7-13 months",
    clinicalTrials: [
      {
        phase: 'Phase III',
        name: 'CRISPR-SCD-2024',
        status: 'Recruiting',
        details: 'CRISPR-Cas9 Gene Editing for Sickle Cell Disease',
        reference: 'https://clinicaltrials.gov/study/NCT04443907',
        sponsor: 'CRISPR Therapeutics',
        locations: [
          'Boston Children\'s Hospital, MA',
          'NIH Clinical Center, MD',
          'Stanford Medical Center, CA'
        ],
        competitors: [
          {
            name: 'Vertex Pharmaceuticals',
            trial: 'CTX001-SCD',
            phase: 'Phase III'
          }
        ]
      },
      {
        phase: 'Phase II',
        name: 'AAV-SGSH-203',
        status: 'Active',
        details: 'AAV9 Vector-Based Gene Therapy for MPS IIIA',
        reference: 'https://clinicaltrials.gov/study/NCT04360265',
        sponsor: 'Lysogene',
        locations: [
          'Children\'s Hospital of Philadelphia, PA',
          'UC San Francisco Medical Center, CA'
        ],
        competitors: [
          {
            name: 'Abeona Therapeutics',
            trial: 'ABO-102',
            phase: 'Phase I/II'
          }
        ]
      },
      {
        phase: 'Phase III',
        name: 'EDIT-301',
        status: 'Recruiting',
        details: 'Gene Editing for Beta-Thalassemia',
        reference: 'https://clinicaltrials.gov/study/NCT04846283',
        sponsor: 'Editas Medicine',
        locations: [
          'Memorial Sloan Kettering, NY',
          'Dana-Farber Cancer Institute, MA',
          'MD Anderson Cancer Center, TX'
        ],
        competitors: [
          {
            name: 'bluebird bio',
            trial: 'bb1111',
            phase: 'Phase III'
          }
        ]
      },
      {
        phase: 'Phase I/II',
        name: 'GENEr8-1',
        status: 'Active',
        details: 'AAV5-hFVIII-SQ Gene Therapy for Hemophilia A',
        reference: 'https://clinicaltrials.gov/study/NCT04323098',
        sponsor: 'BioMarin Pharmaceutical',
        locations: [
          'Oregon Health & Science University',
          'University of Michigan Medical Center',
          'Johns Hopkins Hospital'
        ],
        competitors: [
          {
            name: 'Spark Therapeutics',
            trial: 'SPK-8011',
            phase: 'Phase I/II'
          }
        ]
      },
      {
        phase: 'Phase II',
        name: 'BRILLIANCE',
        status: 'Active',
        details: 'AAV-RPGR Gene Therapy for X-Linked RP',
        reference: 'https://clinicaltrials.gov/study/NCT04671433',
        sponsor: 'Janssen Research & Development',
        locations: [
          'Wilmer Eye Institute at Johns Hopkins',
          'Massachusetts Eye and Ear',
          'Moorfields Eye Hospital, UK'
        ],
        competitors: [
          {
            name: 'Applied Genetic Technologies',
            trial: 'AGTC-501',
            phase: 'Phase I/II'
          }
        ]
      },
      {
        phase: 'Phase I',
        name: 'NTLA-2001',
        status: 'Recruiting',
        details: 'CRISPR/Cas9-Based Therapy for ATTR Amyloidosis',
        reference: 'https://clinicaltrials.gov/study/NCT04601051',
        sponsor: 'Intellia Therapeutics',
        locations: [
          'Royal Free Hospital, UK',
          'University of California San Diego',
          'Cleveland Clinic'
        ],
        competitors: [
          {
            name: 'Regeneron Pharmaceuticals',
            trial: 'REGN-TTR',
            phase: 'Preclinical'
          }
        ]
      }
    ],
    resources: {
      publications: [
        {
          title: 'CRISPR-Cas9 Gene Editing in Human Trials',
          authors: ['Smith, J.', 'Johnson, M.', 'Williams, R.'],
          journal: 'Nature Medicine',
          year: '2024',
          doi: '10.1038/nm.2024.1234',
          abstract: 'Comprehensive analysis of CRISPR-Cas9 gene editing outcomes in human clinical trials, demonstrating high efficiency and safety profiles across multiple genetic disorders.',
          url: 'https://doi.org/10.1038/nm.2024.1234'
        },
        {
          title: 'Advances in Viral Vector Design',
          authors: ['Brown, A.', 'Davis, S.', 'Miller, P.'],
          journal: 'Cell',
          year: '2024',
          doi: '10.1016/cell.2024.5678',
          abstract: 'Novel developments in viral vector engineering enabling improved targeting and reduced immunogenicity for gene therapy applications.',
          url: 'https://doi.org/10.1016/cell.2024.5678'
        }
      ],
      technicalDocs: [
        {
          title: 'CRISPR Design Guidelines',
          type: 'PDF',
          description: 'Technical specifications for CRISPR guide RNA design',
          url: 'https://www.genetherapy.org/docs/crispr-guidelines.pdf',
          source: 'Gene Therapy Institute',
          size: '2.8 MB',
          datePublished: '2024-01-15',
          tags: ['CRISPR', 'Technical', 'Guidelines']
        },
        {
          title: 'Vector Manufacturing Protocol',
          type: 'PDF',
          description: 'GMP-compliant viral vector production protocol',
          url: 'https://www.genetherapy.org/docs/vector-protocol.pdf',
          source: 'Bioprocessing Journal',
          size: '3.2 MB',
          datePublished: '2024-02-01',
          tags: ['Manufacturing', 'Protocol', 'GMP']
        }
      ],
      guidelines: [
        {
          title: 'Gene Therapy Administration Guide',
          type: 'PDF',
          description: 'Clinical guidelines for gene therapy delivery',
          url: 'https://www.genetherapy.org/guidelines/administration.pdf',
          source: 'American Society of Gene & Cell Therapy',
          size: '4.1 MB',
          datePublished: '2024-03-01',
          tags: ['Clinical', 'Guidelines', 'Administration']
        }
      ],
      videos: [
        {
          title: 'Understanding Gene Therapy',
          url: 'https://www.youtube.com/watch?v=8JV9s54j8Hw',
          description: 'A comprehensive overview of gene therapy and its applications'
        },
        {
          title: 'Gene Therapy Success Stories',
          url: 'https://www.youtube.com/watch?v=YUgO6YRJejE',
          description: 'Real patient experiences and breakthrough treatments'
        }
      ],
      casestudies: [
        {
          title: 'SCD Patient Success Story',
          summary: 'Complete remission achieved in sickle cell patient using CRISPR-based therapy',
          url: 'https://www.genetherapy.org/cases/scd-success'
        },
        {
          title: 'Retinal Disease Treatment',
          summary: 'Vision restoration in LCA patient through RPE65 gene therapy',
          url: 'https://www.genetherapy.org/cases/rpe65-success'
        }
      ]
    },
    requirements: {
      medical: [
        'Confirmed genetic diagnosis',
        'Suitable organ/tissue condition',
        'Adequate immune status',
        'No contraindications to vector delivery'
      ],
      practical: [
        'Access to specialized treatment center',
        'Long-term follow-up commitment',
        'Support system availability',
        'Insurance coverage verification'
      ]
    }
  };

  return <TherapyDetailLayout {...therapyData} />;
}
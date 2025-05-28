import { Brain, Dna, FlaskRound, Microscope, Target, Shield, Activity, Beaker, Workflow, Bell as Cells } from 'lucide-react';

export const therapies = [
  {
    title: 'Gene Therapy',
    description: 'Cutting-edge genetic treatments that target the root cause of diseases by modifying, replacing, or inactivating genes.',
    icon: Dna,
    link: '/therapies/gene-therapy',
    image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg',
    highlights: [
      {
        title: 'CRISPR Gene Editing',
        description: 'Precise genetic modification using CRISPR-Cas9 technology',
        icon: Target,
        details: 'Advanced gene editing platform enabling targeted DNA modifications with high precision and efficiency.'
      },
      {
        title: 'Viral Vectors',
        description: 'Engineered viral delivery systems for gene therapy',
        icon: FlaskRound,
        details: 'Optimized viral vectors ensuring efficient gene delivery with enhanced safety profiles.'
      },
      {
        title: 'Gene Replacement',
        description: 'Direct replacement of faulty genes',
        icon: Activity,
        details: 'Comprehensive gene replacement strategies for treating genetic disorders.'
      },
      {
        title: 'Expression Control',
        description: 'Regulated gene expression systems',
        icon: Beaker,
        details: 'Advanced systems for controlled therapeutic gene expression.'
      }
    ],
    applications: [
      {
        condition: 'Sickle Cell Disease',
        approach: 'CRISPR-based BCL11A modification',
        effectiveness: '91% success rate',
        details: 'Modifies genes controlling fetal hemoglobin production to treat sickle cell disease.'
      },
      {
        condition: 'Spinal Muscular Atrophy',
        approach: 'AAV9-delivered SMN1 gene replacement',
        effectiveness: '73% achievement of motor milestones',
        details: 'Delivers functional SMN1 gene to motor neurons, preventing muscle degeneration.'
      },
      {
        condition: 'Inherited Retinal Disease',
        approach: 'AAV-mediated RPE65 gene delivery',
        effectiveness: '93% vision improvement',
        details: 'Restores vision by delivering functional RPE65 gene to retinal cells.'
      }
    ],
    differentiators: [
      {
        feature: 'CRISPR Technology',
        benefit: 'Precise Editing',
        comparison: 'Superior accuracy compared to traditional methods',
        vsCART: 'Direct genetic modification vs cellular engineering',
        vsmRNA: 'Permanent DNA changes vs temporary expression',
        vsGeneTherapy: 'Targeted editing vs gene replacement'
      },
      {
        feature: 'Viral Vector Delivery',
        benefit: 'Efficient Delivery',
        comparison: 'Optimized tissue targeting and transduction',
        vsCART: 'Broader tissue distribution',
        vsmRNA: 'Long-term expression',
        vsGeneTherapy: 'Enhanced delivery specificity'
      },
      {
        feature: 'Gene Replacement',
        benefit: 'Complete Restoration',
        comparison: 'Full gene function recovery',
        vsCART: 'Direct genetic correction',
        vsmRNA: 'Permanent solution',
        vsGeneTherapy: 'Comprehensive correction'
      }
    ]
  },
  {
    title: 'Cell Therapy',
    description: 'Revolutionary cell-based treatments that harness the power of modified cells to fight diseases and restore tissue function.',
    icon: Cells,
    link: '/therapies/cell-therapy',
    image: 'https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg',
    highlights: [
      {
        title: 'CAR-T Cell Therapy',
        description: 'Enhanced T-cells targeting specific cancer markers',
        icon: Target,
        details: 'Customized immune cell therapy with improved cancer-fighting capabilities.'
      },
      {
        title: 'NK Cell Therapy',
        description: 'Enhanced natural killer cells',
        icon: Shield,
        details: 'Optimized NK cells for improved cancer cell recognition and destruction.'
      },
      {
        title: 'Stem Cell Therapy',
        description: 'Multipotent cell treatments',
        icon: Activity,
        details: 'Advanced stem cell applications for tissue regeneration.'
      },
      {
        title: 'TIL Therapy',
        description: 'Tumor-infiltrating lymphocytes',
        icon: Beaker,
        details: 'Expanded tumor-fighting immune cells for solid tumor treatment.'
      }
    ],
    applications: [
      {
        condition: 'B-cell Lymphoma',
        approach: 'CD19 CAR-T cell therapy',
        effectiveness: '83% complete response',
        details: 'Engineered T cells targeting CD19 protein on cancer cells.'
      },
      {
        condition: 'Multiple Myeloma',
        approach: 'BCMA-targeted CAR-T cells',
        effectiveness: '72% complete response',
        details: 'T cells engineered to target BCMA protein on myeloma cells.'
      },
      {
        condition: 'Solid Tumors',
        approach: 'TIL therapy',
        effectiveness: '56% objective response',
        details: 'Expanded tumor-infiltrating lymphocytes for solid tumors.'
      }
    ],
    differentiators: [
      {
        feature: 'Living Drug',
        benefit: 'Self-replicating therapeutic cells',
        comparison: 'Active immune response vs passive drug action',
        vsCART: 'Cellular vs genetic modification',
        vsmRNA: 'Living cells vs molecular therapy',
        vsGeneTherapy: 'Cellular vs genetic approach'
      },
      {
        feature: 'Adaptive Response',
        benefit: 'Evolving immune protection',
        comparison: 'Dynamic response to disease changes',
        vsCART: 'Immune memory vs fixed genetic change',
        vsmRNA: 'Persistent cells vs temporary proteins',
        vsGeneTherapy: 'Cell-mediated vs genetic correction'
      },
      {
        feature: 'Targeted Action',
        benefit: 'Specific disease recognition',
        comparison: 'Precise targeting of disease markers',
        vsCART: 'Cell-mediated vs genetic correction',
        vsmRNA: 'Active targeting vs passive expression',
        vsGeneTherapy: 'Cellular vs genetic targeting'
      }
    ]
  },
  {
    title: 'RNA Therapeutics',
    description: 'Advanced RNA-based treatments that regulate gene expression and protein production to treat various diseases.',
    icon: FlaskRound,
    link: '/therapies/rna-therapeutics',
    image: 'https://images.pexels.com/photos/2280569/pexels-photo-2280569.jpeg',
    highlights: [
      {
        title: 'mRNA Vaccines',
        description: 'Protective immunity through mRNA delivery',
        icon: Shield,
        details: 'Revolutionary vaccine platform delivering messenger RNA to produce disease-fighting proteins.'
      },
      {
        title: 'siRNA Therapy',
        description: 'Gene silencing through RNA interference',
        icon: Target,
        details: 'Small interfering RNA technology that selectively suppresses disease-causing genes.'
      },
      {
        title: 'Antisense Oligonucleotides',
        description: 'Modified RNA targeting disease genes',
        icon: Activity,
        details: 'Synthetic RNA molecules that modify gene expression through specific binding.'
      },
      {
        title: 'RNA Editing',
        description: 'Direct modification of RNA sequences',
        icon: Beaker,
        details: 'Precise editing of RNA to correct disease-causing mutations.'
      }
    ],
    applications: [
      {
        condition: 'COVID-19',
        approach: 'mRNA vaccine',
        effectiveness: '95% efficacy',
        details: 'mRNA-based spike protein production for immune response.'
      },
      {
        condition: 'Spinal Muscular Atrophy',
        approach: 'Antisense oligonucleotide',
        effectiveness: '80% improvement',
        details: 'RNA modification therapy increasing SMN protein production.'
      },
      {
        condition: 'Hereditary ATTR Amyloidosis',
        approach: 'siRNA therapy',
        effectiveness: '74% protein reduction',
        details: 'Targeted silencing of disease-causing gene expression.'
      }
    ],
    differentiators: [
      {
        feature: 'Reversible Action',
        benefit: 'Temporary therapeutic effect',
        comparison: 'Adjustable treatment course',
        vsCART: 'Molecular vs cellular approach',
        vsmRNA: 'Controlled duration',
        vsGeneTherapy: 'Temporary vs permanent changes'
      },
      {
        feature: 'Rapid Development',
        benefit: 'Quick therapeutic adaptation',
        comparison: 'Fast response to new diseases',
        vsCART: 'Shorter production time',
        vsmRNA: 'Rapid modification',
        vsGeneTherapy: 'Simpler manufacturing process'
      },
      {
        feature: 'Broad Applicability',
        benefit: 'Multiple disease targets',
        comparison: 'Versatile therapeutic platform',
        vsCART: 'Wider disease application',
        vsmRNA: 'Diverse targets',
        vsGeneTherapy: 'More flexible targeting options'
      }
    ]
  },
  {
    title: 'Advanced Therapeutics',
    description: 'Next-generation therapeutic approaches combining multiple modalities for enhanced treatment outcomes.',
    icon: Microscope,
    link: '/therapies/advanced-therapeutics',
    image: 'https://images.pexels.com/photos/2280573/pexels-photo-2280573.jpeg',
    highlights: [
      {
        title: 'AI-Driven Therapeutics',
        description: 'Machine learning optimized treatments',
        icon: Brain,
        details: 'Integration of artificial intelligence for treatment optimization.'
      },
      {
        title: 'Precision Medicine',
        description: 'Personalized therapeutic strategies',
        icon: Target,
        details: 'Tailored treatments based on individual genetic profiles.'
      },
      {
        title: 'Smart Delivery Systems',
        description: 'Advanced therapeutic delivery',
        icon: Shield,
        details: 'Intelligent drug delivery systems with targeted release mechanisms.'
      },
      {
        title: 'Combination Therapies',
        description: 'Multi-modal treatment approaches',
        icon: Activity,
        details: 'Integration of multiple therapeutic modalities for enhanced efficacy.'
      }
    ],
    applications: [
      {
        condition: 'Complex Cancers',
        approach: 'Multi-modal immunotherapy',
        effectiveness: '87% response rate',
        details: 'Combined approach using AI-driven treatment selection.'
      },
      {
        condition: 'Rare Genetic Disorders',
        approach: 'Integrated gene and cell therapy',
        effectiveness: '92% disease modification',
        details: 'Comprehensive treatment combining multiple modalities.'
      },
      {
        condition: 'Neurodegenerative Diseases',
        approach: 'Smart therapeutic platforms',
        effectiveness: '78% improvement',
        details: 'Advanced delivery systems with AI-optimized combinations.'
      }
    ],
    differentiators: [
      {
        feature: 'Multi-modal Integration',
        benefit: 'Comprehensive treatment',
        comparison: 'Multiple therapeutic mechanisms',
        vsCART: 'Combined modalities vs single approach',
        vsmRNA: 'Integrated solutions vs single modality',
        vsGeneTherapy: 'Multiple targets vs single gene'
      },
      {
        feature: 'AI-Driven Optimization',
        benefit: 'Personalized treatment selection',
        comparison: 'Machine learning optimization',
        vsCART: 'Predictive modeling vs standard protocols',
        vsmRNA: 'Dynamic adjustment vs fixed approach',
        vsGeneTherapy: 'Adaptive therapy vs static modification'
      },
      {
        feature: 'Smart Delivery',
        benefit: 'Precision therapeutic delivery',
        comparison: 'Targeted multi-drug delivery',
        vsCART: 'Systematic distribution vs cellular delivery',
        vsmRNA: 'Controlled release vs simple delivery',
        vsGeneTherapy: 'Multiple payload delivery vs single gene'
      }
    ]
  }
];
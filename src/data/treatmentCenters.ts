import { TreatmentCenter } from '../components/therapy/types';

export const treatmentCenters: TreatmentCenter[] = [
  {
    name: "Mayo Clinic",
    location: { lat: 44.0225, lng: -92.4651 },
    address: "200 First St. SW, Rochester, MN 55905",
    phone: "(507) 284-2511",
    email: "info@mayoclinic.org",
    website: "https://www.mayoclinic.org",
    state: "Minnesota",
    city: "Rochester",
    specialties: [
      "CAR-T Cell Therapy",
      "Gene Therapy",
      "Cell Therapy",
      "Clinical Trials"
    ],
    therapies: ["Gene Therapy", "Cell Therapy"],
    indications: [
      "B-cell Lymphoma",
      "Multiple Myeloma",
      "Leukemia"
    ],
    doctors: [
      {
        name: "Dr. Stephen Russell",
        specialty: "Gene Therapy",
        credentials: "MD, PhD - Director of Molecular Medicine"
      },
      {
        name: "Dr. Yi Lin",
        specialty: "CAR-T Cell Therapy",
        credentials: "MD, PhD - Director of Cell Therapy Program"
      }
    ]
  },
  {
    name: "MD Anderson Cancer Center",
    location: { lat: 29.7070, lng: -95.4009 },
    address: "1515 Holcombe Blvd, Houston, TX 77030",
    phone: "(877) 632-6789",
    email: "info@mdanderson.org",
    website: "https://www.mdanderson.org",
    state: "Texas",
    city: "Houston",
    specialties: [
      "CAR-T Cell Therapy",
      "Gene Therapy",
      "Immunotherapy",
      "Clinical Trials"
    ],
    therapies: ["Cell Therapy", "Gene Therapy", "RNA Therapeutics"],
    indications: [
      "B-cell Lymphoma",
      "Multiple Myeloma",
      "Solid Tumors"
    ],
    doctors: [
      {
        name: "Dr. Sattva Neelapu",
        specialty: "CAR-T Cell Therapy",
        credentials: "MD - Professor, Lymphoma/Myeloma"
      },
      {
        name: "Dr. Elizabeth Shpall",
        specialty: "Cell Therapy",
        credentials: "MD - Director, Cell Therapy Laboratory"
      }
    ]
  },
  {
    name: "Memorial Sloan Kettering Cancer Center",
    location: { lat: 40.7642, lng: -73.9567 },
    address: "1275 York Avenue, New York, NY 10065",
    phone: "(212) 639-2000",
    email: "info@mskcc.org",
    website: "https://www.mskcc.org",
    state: "New York",
    city: "New York City",
    specialties: [
      "CAR-T Cell Therapy",
      "Gene Therapy",
      "Immunotherapy",
      "Clinical Trials"
    ],
    therapies: ["Cell Therapy", "Gene Therapy", "Advanced Therapeutics"],
    indications: [
      "B-cell Lymphoma",
      "Multiple Myeloma",
      "Solid Tumors",
      "Leukemia"
    ],
    doctors: [
      {
        name: "Dr. Michel Sadelain",
        specialty: "CAR-T Cell Therapy",
        credentials: "MD, PhD - Director, Center for Cell Engineering"
      },
      {
        name: "Dr. Renier Brentjens",
        specialty: "Cell Therapy",
        credentials: "MD, PhD - Director, Cellular Therapeutics"
      }
    ]
  },
  {
    name: "Dana-Farber Cancer Institute",
    location: { lat: 42.3375, lng: -71.1071 },
    address: "450 Brookline Ave, Boston, MA 02215",
    phone: "(617) 632-3000",
    email: "info@dfci.harvard.edu",
    website: "https://www.dana-farber.org",
    state: "Massachusetts",
    city: "Boston",
    specialties: [
      "CAR-T Cell Therapy",
      "Gene Therapy",
      "Immunotherapy",
      "Clinical Trials"
    ],
    therapies: ["Cell Therapy", "Gene Therapy", "RNA Therapeutics"],
    indications: [
      "B-cell Lymphoma",
      "Multiple Myeloma",
      "Leukemia",
      "Solid Tumors"
    ],
    doctors: [
      {
        name: "Dr. Jerome Ritz",
        specialty: "Cell Therapy",
        credentials: "MD - Executive Director, Connell O'Reilly Cell Manipulation Core Facility"
      },
      {
        name: "Dr. Catherine Wu",
        specialty: "Cancer Immunotherapy",
        credentials: "MD - Chief, Division of Stem Cell Transplantation"
      }
    ]
  },
  {
    name: "Stanford Medicine",
    location: { lat: 37.4349, lng: -122.1751 },
    address: "300 Pasteur Drive, Stanford, CA 94305",
    phone: "(650) 723-4000",
    email: "info@stanfordhealthcare.org",
    website: "https://stanfordhealthcare.org",
    state: "California",
    city: "Stanford",
    specialties: [
      "CAR-T Cell Therapy",
      "Gene Therapy",
      "Stem Cell Therapy",
      "Clinical Trials"
    ],
    therapies: ["Cell Therapy", "Gene Therapy", "Advanced Therapeutics"],
    indications: [
      "B-cell Lymphoma",
      "Multiple Myeloma",
      "Solid Tumors",
      "Genetic Disorders"
    ],
    doctors: [
      {
        name: "Dr. Crystal Mackall",
        specialty: "CAR-T Cell Therapy",
        credentials: "MD - Director, Stanford Center for Cancer Cell Therapy"
      },
      {
        name: "Dr. Maria Grazia Roncarolo",
        specialty: "Gene Therapy",
        credentials: "MD - Director, Stanford Center for Definitive and Curative Medicine"
      }
    ]
  }
];
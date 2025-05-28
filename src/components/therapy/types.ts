export type Doctor = {
  name: string;
  specialty: string;
  credentials: string;
  image?: string;
};

export type TreatmentCenter = {
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  address: string;
  phone: string;
  email: string;
  website: string;
  specialties: string[];
  doctors: Doctor[];
  therapies: string[];
  indications: string[];
  state: string;
  city: string;
};

export type CommercialProduct = {
  name: string;
  company: string;
  approvalStatus: string;
  indication?: string;
  approvedIndications?: string[];
  description: string;
  ndcCode?: string;
  dosageForm?: string;
  packaging?: string;
  storage?: string;
  shelfLife?: string;
  dosing?: {
    schedule: string;
    targetDose: string;
    maxDose?: string;
  };
  preInfusion?: string[];
  infusion?: string[];
  postInfusion?: string[];
  sideEffects?: string[];
  patentExpiration?: string;
  competitors?: {
    name: string;
    company: string;
    status: string;
    differentiator?: string;
  }[];
};
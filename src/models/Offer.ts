export interface Offer {
  title: string;
  id: string;
  state: number;
  city: string;
  experienceMin: ExperienceMin;
  category: Category;
  subcategory: Subcategory;
  studiesMin: StudiesMin;
  residence: Residence;
  country: Country;
  contractType: ContractType;
  journey: Journey;
  profile: Profile;
  vacancies: number;
  minRequirements: string;
  description: string;
  jobLevel: JobLevel;
  staffInCharge: StaffInCharge;
  link: string;
  active: boolean;
  skillsList: SkillsList[];
  salaryDescription: string;
}

export interface ExperienceMin {
  id: number;
  value: string;
}

export interface Category {
  id: number;
  value: string;
}

export interface Subcategory {
  id: number;
  value: string;
}

export interface StudiesMin {
  id: number;
  value: string;
}

export interface Residence {
  id: number;
  value: string;
}

export interface Country {
  id: number;
  value: string;
}

export interface ContractType {
  id: number;
  value: string;
}

export interface Journey {
  id: number;
  value: string;
}

export interface Profile {
  id: string;
  name: string;
  corporateWebsiteUrl: string;
  typeIndustry: TypeIndustry;
}

export interface TypeIndustry {
  id: number;
  value: string;
}

export interface JobLevel {
  id: number;
  value: string;
}

export interface StaffInCharge {
  id: number;
  value: string;
}

export interface SkillsList {
  skill: string;
}

export interface OfferCompare {
  offerOne?: Offer | null;
  offerTwo?: Offer | null;
}

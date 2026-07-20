export type Persona = "admin" | "parent" | "caregiver";

export type ParentIntent = "creche" | "caregiver" | "both";
export type CareType = "full-time" | "part-time" | "occasional";
export type ExperienceRange = "<1" | "1-3" | "3-5" | "5+";
export type AgeGroup = "infants" | "toddlers" | "preschool" | "school-age";
export type LocationsAnswer = "1" | "2+";
export type StaffCountAnswer = "1-5" | "6-15" | "16-30" | "30+";
export type CurrentToolsAnswer = "paper" | "spreadsheets" | "other-software" | "nothing-yet";

export interface OnboardingAnswers {
  persona: Persona | null;

  // admin track
  capacity: number;
  locations: LocationsAnswer | null;
  currentTools: CurrentToolsAnswer | null;
  staffCount: StaffCountAnswer | null;

  // parent track
  parentIntent: ParentIntent | null;
  crecheQuery: string;
  crecheFound: boolean | null;
  parentChildrenCount: number;
  parentChildrenAges: string;
  hasCaregiverInMind: "yes" | "no" | null;
  careType: CareType | null;
  parentLocation: string;

  // caregiver track
  hasFamily: boolean | null;
  experience: ExperienceRange | null;
  caregiverLocation: string;
  availability: CareType | null;
  ageGroups: AgeGroup[];

  // shared final step (parent + caregiver)
  name: string;
  email: string;
  phone: string;
  sendToWhatsApp: boolean;
}

export const INITIAL_ANSWERS: OnboardingAnswers = {
  persona: null,
  capacity: 30,
  locations: null,
  currentTools: null,
  staffCount: null,
  parentIntent: null,
  crecheQuery: "",
  crecheFound: null,
  parentChildrenCount: 1,
  parentChildrenAges: "",
  hasCaregiverInMind: null,
  careType: null,
  parentLocation: "",
  hasFamily: null,
  experience: null,
  caregiverLocation: "",
  availability: null,
  ageGroups: [],
  name: "",
  email: "",
  phone: "",
  sendToWhatsApp: false,
};

export type StepId =
  | "persona-select"
  | "admin-capacity"
  | "admin-locations"
  | "admin-current-tools"
  | "admin-staff-count"
  | "admin-email"
  | "parent-intent"
  | "parent-creche-search"
  | "parent-creche-children"
  | "parent-caregiver-has-one"
  | "parent-caregiver-children"
  | "parent-caregiver-care-type"
  | "parent-caregiver-location"
  | "parent-final"
  | "caregiver-has-family"
  | "caregiver-experience"
  | "caregiver-location"
  | "caregiver-availability"
  | "caregiver-age-groups"
  | "caregiver-final";

export type EnrollmentRequest = {
  id: string;
  requestDate: string;
  parentName: string;
  childName: string;
  childAge: string;
  room: string;
  status: "active" | "pending" | "declined";
  photo: string;
  gender: string;
  parentEmail: string;
  emergencyContactName: string;
  emergencyContact: string;
  dateOfBirth: string;
  allergies: string;
  chronicConditions: string;
  bloodGroup: string;
  medication: string;
  pediatricianFullName: string;
  pediatricianPhone: string;
  pediatricianHospital: string;
  immunizationHistory: string;
  feedingType: string;
  favoriteMeals: string;
  dislikedFoods: string;
  dietaryRestriction: string;
  sleepTime: string;
  comfortItems: string;
  toiletTraining: string;
  milestone: string;
  communicationStyle: string;
  behaviorNotes: string;
};

export type Caregiver = {
  id: string;
  fullName: string;
  email: string;
  assignedChildren: number;
  phoneNumber: string;
  status: "active" | "inactive";
  assignedChildrenList: {
    assignedDate: string;
    parentName: string;
    childName: string;
    childAge: string;
    room: string;
  }[];
};

export type TeamMember = {
  id: string;
  dateAdded: string;
  fullName: string;
  email: string;
  role: string;
  status: "Active" | "Disabled";
};

export type ActivityLog = {
  id: string;
  dateCreated: string;
  recipients: string;
  title: string;
  message: string;
};

export const ENROLLMENT_REQUESTS: EnrollmentRequest[] = [
  {
    id: "1",
    requestDate: "16 Jul 2026 4:26pm",
    parentName: "Adedamola Adewale",
    childName: "Joy Adewale",
    childAge: "6 years",
    room: "Warlords",
    status: "active",
    photo: "/avatars/child-1.jpg",
    gender: "Female",
    parentEmail: "adewaledamola52@yahoo.com",
    emergencyContactName: "Tess",
    emergencyContact: "08099818202",
    dateOfBirth: "6 Feb 2020",
    allergies: "None",
    chronicConditions: "None",
    bloodGroup: "A+",
    medication: "-",
    pediatricianFullName: "-",
    pediatricianPhone: "-",
    pediatricianHospital: "-",
    immunizationHistory: "-",
    feedingType: "Formula",
    favoriteMeals: "-",
    dislikedFoods: "-",
    dietaryRestriction: "-",
    sleepTime: "-",
    comfortItems: "-",
    toiletTraining: "-",
    milestone: "-",
    communicationStyle: "-",
    behaviorNotes: "-",
  },
  {
    id: "2",
    requestDate: "16 Jul 2026 4:25pm",
    parentName: "Adedamola Adewale",
    childName: "Zain Adewale",
    childAge: "6 months",
    room: "Rainbow",
    status: "active",
    photo: "/avatars/child-2.jpg",
    gender: "Male",
    parentEmail: "adewaledamola52@yahoo.com",
    emergencyContactName: "Tess",
    emergencyContact: "08099818202",
    dateOfBirth: "12 Jan 2026",
    allergies: "None",
    chronicConditions: "None",
    bloodGroup: "O+",
    medication: "-",
    pediatricianFullName: "-",
    pediatricianPhone: "-",
    pediatricianHospital: "-",
    immunizationHistory: "-",
    feedingType: "Breastfeeding",
    favoriteMeals: "-",
    dislikedFoods: "-",
    dietaryRestriction: "-",
    sleepTime: "-",
    comfortItems: "-",
    toiletTraining: "-",
    milestone: "-",
    communicationStyle: "-",
    behaviorNotes: "-",
  },
  {
    id: "3",
    requestDate: "16 Jul 2026 4:14pm",
    parentName: "Adedamola Adewale",
    childName: "Philip Adewale",
    childAge: "2 years",
    room: "Horn",
    status: "active",
    photo: "/avatars/child-3.jpg",
    gender: "Male",
    parentEmail: "adewaledamola52@yahoo.com",
    emergencyContactName: "Tess",
    emergencyContact: "08099818202",
    dateOfBirth: "3 Mar 2024",
    allergies: "Peanuts",
    chronicConditions: "None",
    bloodGroup: "B+",
    medication: "-",
    pediatricianFullName: "Dr. Smith",
    pediatricianPhone: "08012345678",
    pediatricianHospital: "Lagos General Hospital",
    immunizationHistory: "Up to date",
    feedingType: "Solid food",
    favoriteMeals: "Rice and beans",
    dislikedFoods: "Vegetables",
    dietaryRestriction: "No peanuts",
    sleepTime: "12pm - 2pm",
    comfortItems: "Blanket",
    toiletTraining: "In progress",
    milestone: "Walking, talking",
    communicationStyle: "Verbal",
    behaviorNotes: "-",
  },
];

export const CAREGIVERS: Caregiver[] = [
  {
    id: "1",
    fullName: "Tess Adewale",
    email: "adewaledamola52+@yahoo.com",
    assignedChildren: 1,
    phoneNumber: "08103674006",
    status: "active",
    assignedChildrenList: [
      {
        assignedDate: "16 Jul 2026 4:14pm",
        parentName: "Adedamola Adewale",
        childName: "Philip Adewale",
        childAge: "2 years",
        room: "Horn",
      },
    ],
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "1",
    dateAdded: "16 Jul 2026 4:01pm",
    fullName: "- -",
    email: "aorthardesignteam@gmail.com",
    role: "Super Admin",
    status: "Active",
  },
];

export const ACTIVITY_LOGS: ActivityLog[] = [
  {
    id: "1",
    dateCreated: "16 Jul 2026 6:00pm",
    recipients: "1 Selected Child's Parent",
    title: "New Picture Activity",
    message: "eating: Ate Rice Tod...",
  },
];

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
    photo: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=200&h=200&fit=crop&q=80",
    gender: "Female",
    parentEmail: "adewaledamola52@yahoo.com",
    emergencyContactName: "Tess",
    emergencyContact: "08099818202",
    dateOfBirth: "6 Feb 2020",
    allergies: "None",
    chronicConditions: "None",
    bloodGroup: "A+",
    medication: "None",
    pediatricianFullName: "Dr. Ngozi Umeh",
    pediatricianPhone: "08023456789",
    pediatricianHospital: "St Nicholas Hospital, Lagos",
    immunizationHistory: "Up to date",
    feedingType: "Formula",
    favoriteMeals: "Mashed banana, oats",
    dislikedFoods: "Bitter leaf soup",
    dietaryRestriction: "None",
    sleepTime: "1pm - 3pm",
    comfortItems: "Teddy bear",
    toiletTraining: "Not started",
    milestone: "Talking in full sentences",
    communicationStyle: "Verbal, expressive",
    behaviorNotes: "Sociable, plays well with others in Warlords room.",
  },
  {
    id: "2",
    requestDate: "16 Jul 2026 4:25pm",
    parentName: "Adedamola Adewale",
    childName: "Zain Adewale",
    childAge: "6 months",
    room: "Rainbow",
    status: "pending",
    photo: "https://images.unsplash.com/photo-1544126592-807ade215a0b?w=200&h=200&fit=crop&q=80",
    gender: "Male",
    parentEmail: "adewaledamola52@yahoo.com",
    emergencyContactName: "Tess",
    emergencyContact: "08099818202",
    dateOfBirth: "12 Jan 2026",
    allergies: "None",
    chronicConditions: "None",
    bloodGroup: "O+",
    medication: "Vitamin D drops",
    pediatricianFullName: "Dr. Ngozi Umeh",
    pediatricianPhone: "08023456789",
    pediatricianHospital: "St Nicholas Hospital, Lagos",
    immunizationHistory: "Up to date",
    feedingType: "Breastfeeding",
    favoriteMeals: "Pureed carrots",
    dislikedFoods: "None reported yet",
    dietaryRestriction: "None",
    sleepTime: "10am - 12pm, 2pm - 4pm",
    comfortItems: "Pacifier",
    toiletTraining: "Not applicable",
    milestone: "Rolling over, babbling",
    communicationStyle: "Cooing and gestures",
    behaviorNotes: "Calm and settles quickly with familiar caregivers.",
  },
  {
    id: "3",
    requestDate: "16 Jul 2026 4:14pm",
    parentName: "Adedamola Adewale",
    childName: "Philip Adewale",
    childAge: "2 years",
    room: "Horn",
    status: "active",
    photo: "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=200&h=200&fit=crop&q=80",
    gender: "Male",
    parentEmail: "adewaledamola52@yahoo.com",
    emergencyContactName: "Tess",
    emergencyContact: "08099818202",
    dateOfBirth: "3 Mar 2024",
    allergies: "Peanuts",
    chronicConditions: "None",
    bloodGroup: "B+",
    medication: "None",
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
    behaviorNotes: "Energetic, prefers outdoor play and building blocks.",
  },
  {
    id: "4",
    requestDate: "14 Jul 2026 10:05am",
    parentName: "Chika Obi",
    childName: "Amara Obi",
    childAge: "4 years",
    room: "Rainbow",
    status: "declined",
    photo: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=200&h=200&fit=crop&q=80",
    gender: "Female",
    parentEmail: "chika.obi@gmail.com",
    emergencyContactName: "Ifeoma Obi",
    emergencyContact: "08134567890",
    dateOfBirth: "2 Jun 2022",
    allergies: "Dairy",
    chronicConditions: "None",
    bloodGroup: "AB+",
    medication: "None",
    pediatricianFullName: "Dr. Femi Alade",
    pediatricianPhone: "08045678901",
    pediatricianHospital: "Reddington Hospital, Lagos",
    immunizationHistory: "Up to date",
    feedingType: "Solid food",
    favoriteMeals: "Jollof rice, plantain",
    dislikedFoods: "Milk-based dishes",
    dietaryRestriction: "Dairy-free",
    sleepTime: "1pm - 3pm",
    comfortItems: "Storybook",
    toiletTraining: "Completed",
    milestone: "Counting to 10, drawing shapes",
    communicationStyle: "Verbal, curious",
    behaviorNotes: "Room capacity was full at time of request.",
  },
];

export const CAREGIVERS: Caregiver[] = [
  {
    id: "1",
    fullName: "Tess Adewale",
    email: "adewaledamola52+@yahoo.com",
    assignedChildren: 2,
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
      {
        assignedDate: "16 Jul 2026 4:26pm",
        parentName: "Adedamola Adewale",
        childName: "Joy Adewale",
        childAge: "6 years",
        room: "Warlords",
      },
    ],
  },
  {
    id: "2",
    fullName: "Blessing Okoro",
    email: "blessing.okoro@ringodaycare.com",
    assignedChildren: 1,
    phoneNumber: "08056781234",
    status: "active",
    assignedChildrenList: [
      {
        assignedDate: "16 Jul 2026 4:25pm",
        parentName: "Adedamola Adewale",
        childName: "Zain Adewale",
        childAge: "6 months",
        room: "Rainbow",
      },
    ],
  },
  {
    id: "3",
    fullName: "Musa Ibrahim",
    email: "musa.ibrahim@ringodaycare.com",
    assignedChildren: 0,
    phoneNumber: "08067891234",
    status: "inactive",
    assignedChildrenList: [],
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "1",
    dateAdded: "16 Jul 2026 4:01pm",
    fullName: "Adedamola Adewale",
    email: "aorthardesignteam@gmail.com",
    role: "Super Admin",
    status: "Active",
  },
  {
    id: "2",
    dateAdded: "16 Jul 2026 5:10pm",
    fullName: "Tess Adewale",
    email: "adewaledamola52+@yahoo.com",
    role: "Manager",
    status: "Active",
  },
  {
    id: "3",
    dateAdded: "17 Jul 2026 9:30am",
    fullName: "Blessing Okoro",
    email: "blessing.okoro@ringodaycare.com",
    role: "Staff",
    status: "Active",
  },
];

export const ACTIVITY_LOGS: ActivityLog[] = [
  {
    id: "1",
    dateCreated: "16 Jul 2026 6:00pm",
    recipients: "1 Selected Child's Parent",
    title: "New Picture Activity",
    message: "Eating: Ate rice today, finished the whole plate.",
  },
  {
    id: "2",
    dateCreated: "16 Jul 2026 2:30pm",
    recipients: "Zain Adewale's Parent",
    title: "Nap Time Update",
    message: "Sleeping: Napped from 10:15am to 11:45am, woke up happy.",
  },
  {
    id: "3",
    dateCreated: "15 Jul 2026 4:45pm",
    recipients: "Joy Adewale's Parent",
    title: "New Milestone Logged",
    message: "Development: Counted to 20 unprompted during playtime.",
  },
  {
    id: "4",
    dateCreated: "15 Jul 2026 11:00am",
    recipients: "All Parents",
    title: "Weekly Menu Update",
    message: "Announcement: Next week's meal plan has been posted to the app.",
  },
];

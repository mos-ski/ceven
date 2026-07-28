export type SpecialRequestStatus = "Pending" | "In Progress" | "Done" | "Undone";

export type SpecialRequest = {
  id: string;
  title: string;
  description: string;
  parentName: string;
  parentAvatar: string;
  childName: string;
  childRoom: string;
  caregiverName: string;
  scheduledTime: string;
  reminderTime: string;
  comment: string;
  status: SpecialRequestStatus;
  date: string;
};

export const SPECIAL_REQUESTS: SpecialRequest[] = [
  {
    id: "sr-1",
    title: "Apply sunscreen before outdoor play",
    description: "Please apply SPF 50 sunscreen on Tosin before the afternoon outdoor session. The bottle is in her bag.",
    parentName: "Mrs. Johnson",
    parentAvatar: "MJ",
    childName: "Tosin Johnson",
    childRoom: "Lion",
    caregiverName: "Mr. Ben Ayadi",
    scheduledTime: "12:30pm",
    reminderTime: "12:15pm",
    comment: "She is allergic to some brands — use the one in her bag only.",
    status: "Done",
    date: "Jul 25, 2026",
  },
  {
    id: "sr-2",
    title: "Give vitamin D drops at lunch",
    description: "Administer 2 drops of vitamin D supplement with lunch. Prescription is in the medical file.",
    parentName: "Mr. Adeyemi",
    parentAvatar: "MA",
    childName: "Zara Adeyemi",
    childRoom: "Panda",
    caregiverName: "Ms. Funke Obi",
    scheduledTime: "12:00pm",
    reminderTime: "11:50am",
    comment: "",
    status: "In Progress",
    date: "Jul 25, 2026",
  },
  {
    id: "sr-3",
    title: "No dairy for lunch today",
    description: "Daniel has a mild dairy intolerance. Please ensure his lunch has no milk, cheese, or yogurt.",
    parentName: "Mrs. Okafor",
    parentAvatar: "MO",
    childName: "Daniel Okafor",
    childRoom: "Owl",
    caregiverName: "Mr. Ben Ayadi",
    scheduledTime: "12:00pm",
    reminderTime: "11:30am",
    comment: "Kitchen has been informed. Alternative meal is prepared.",
    status: "Pending",
    date: "Jul 26, 2026",
  },
  {
    id: "sr-4",
    title: "Early pickup at 3pm",
    description: "I will be picking up Chinwe at 3pm today for a dental appointment. Please have her ready.",
    parentName: "Mrs. Eze",
    parentAvatar: "CE",
    childName: "Chinwe Eze",
    childRoom: "Lion",
    caregiverName: "Ms. Grace Nwosu",
    scheduledTime: "3:00pm",
    reminderTime: "2:45pm",
    comment: "I will send my ID photo via chat.",
    status: "Done",
    date: "Jul 24, 2026",
  },
  {
    id: "sr-5",
    title: "Nap time comfort — bring favourite blanket",
    description: "Kunle sleeps better with his blue blanket. Please ensure it is in his cot during nap time.",
    parentName: "Mr. Balogun",
    parentAvatar: "KB",
    childName: "Kunle Balogun",
    childRoom: "Panda",
    caregiverName: "Ms. Funke Obi",
    scheduledTime: "1:00pm",
    reminderTime: "12:45pm",
    comment: "",
    status: "Pending",
    date: "Jul 26, 2026",
  },
  {
    id: "sr-6",
    title: "Do not give snacks after 4pm",
    description: "Amara has a dentist appointment tomorrow. Please avoid giving her any snacks or sweets after 4pm today.",
    parentName: "Mrs. Chukwuma",
    parentAvatar: "CC",
    childName: "Amara Chukwuma",
    childRoom: "Owl",
    caregiverName: "Mr. Ben Ayadi",
    scheduledTime: "4:00pm",
    reminderTime: "3:45pm",
    comment: "She may ask for cookies — please redirect her to water.",
    status: "Undone",
    date: "Jul 23, 2026",
  },
  {
    id: "sr-7",
    title: "Extra nappy changes please",
    description: "Ifemelu has a rash. Please change her nappy every 1.5 hours instead of the usual schedule.",
    parentName: "Mrs. Onwueme",
    parentAvatar: "FO",
    childName: "Ifemelu Onwueme",
    childRoom: "Lion",
    caregiverName: "Ms. Grace Nwosu",
    scheduledTime: "All day",
    reminderTime: "Every 1.5hrs",
    comment: "Cream is in her bag. Apply after each change.",
    status: "In Progress",
    date: "Jul 25, 2026",
  },
];

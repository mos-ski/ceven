export type ChildStatus = "Present" | "Absent" | "Late";
export type FeeStatus = "Paid" | "Overdue" | "Pending";

export type Child = {
  id: string;
  name: string;
  gender: "M" | "F";
  bloodGroup: string;
  age: string;
  room: string;
  parentName: string;
  parentEmail: string;
  status: ChildStatus;
  healthFlag: string | null;
  feeStatus: FeeStatus;
};

export const CHILDREN: Child[] = [
  {
    id: "child-1",
    name: "King Andrew",
    gender: "M",
    bloodGroup: "0+",
    age: "4 years",
    room: "Lion",
    parentName: "Mrs Bakare",
    parentEmail: "bakareolatuji@gmail.com",
    status: "Present",
    healthFlag: "Nut Allergy",
    feeStatus: "Overdue",
  },
  {
    id: "child-2",
    name: "Amara Chukwu",
    gender: "F",
    bloodGroup: "A+",
    age: "3 years",
    room: "Panda",
    parentName: "Mr & Mrs Chukwu",
    parentEmail: "chukwufamily@gmail.com",
    status: "Present",
    healthFlag: null,
    feeStatus: "Paid",
  },
  {
    id: "child-3",
    name: "Tobi Adewale",
    gender: "M",
    bloodGroup: "B+",
    age: "5 years",
    room: "Owl",
    parentName: "Mrs Adewale",
    parentEmail: "adewale.funke@gmail.com",
    status: "Absent",
    healthFlag: "Asthma",
    feeStatus: "Pending",
  },
  {
    id: "child-4",
    name: "Zainab Bello",
    gender: "F",
    bloodGroup: "O-",
    age: "2 years",
    room: "Bear",
    parentName: "Mr Bello",
    parentEmail: "bello.ibrahim@gmail.com",
    status: "Present",
    healthFlag: null,
    feeStatus: "Paid",
  },
  {
    id: "child-5",
    name: "Daniel Okafor",
    gender: "M",
    bloodGroup: "AB+",
    age: "4 years",
    room: "Lion",
    parentName: "Mrs Okafor",
    parentEmail: "okaforchidinma@gmail.com",
    status: "Late",
    healthFlag: null,
    feeStatus: "Paid",
  },
  {
    id: "child-6",
    name: "Faith Eze",
    gender: "F",
    bloodGroup: "A-",
    age: "3 years",
    room: "Panda",
    parentName: "Mr & Mrs Eze",
    parentEmail: "ezefamily01@gmail.com",
    status: "Present",
    healthFlag: "Egg Allergy",
    feeStatus: "Overdue",
  },
  {
    id: "child-7",
    name: "Hassan Yusuf",
    gender: "M",
    bloodGroup: "O+",
    age: "5 years",
    room: "Owl",
    parentName: "Mrs Yusuf",
    parentEmail: "yusuf.aisha@gmail.com",
    status: "Present",
    healthFlag: null,
    feeStatus: "Pending",
  },
  {
    id: "child-8",
    name: "Ireti Olawale",
    gender: "F",
    bloodGroup: "B-",
    age: "2 years",
    room: "Bear",
    parentName: "Mr Olawale",
    parentEmail: "olawale.tunde@gmail.com",
    status: "Present",
    healthFlag: null,
    feeStatus: "Paid",
  },
];

export const CHILDREN_STATS = {
  totalEnrolled: CHILDREN.length,
  active: CHILDREN.filter((c) => c.status !== "Absent").length,
  newThisMonth: 3,
  averageActivityLog: 5.2,
};

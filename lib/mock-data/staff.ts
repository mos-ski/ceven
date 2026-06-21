export type StaffStatus = "Active" | "Absent" | "Pending";

export type StaffMember = {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateAdded: string;
  role: string;
  status: StaffStatus;
};

export const STAFF: StaffMember[] = [
  {
    id: "1",
    name: "Mrs. Sarah Okonkwo",
    email: "sarah.o@udebemcresh.com",
    phone: "+234 90 9827 2738",
    dateAdded: "10 Oct 2025",
    role: "Caregiver",
    status: "Active",
  },
  {
    id: "2",
    name: "Mr. James Adamu",
    email: "james.a@udebemcresh.com",
    phone: "+234 81 2345 6789",
    dateAdded: "05 Sep 2025",
    role: "Marketer",
    status: "Absent",
  },
  {
    id: "3",
    name: "Mrs. Ngozi Eze",
    email: "ngozi.e@udebemcresh.com",
    phone: "+234 70 3456 7890",
    dateAdded: "12 Aug 2025",
    role: "Caregiver",
    status: "Active",
  },
  {
    id: "4",
    name: "Mr. Chukwu Bello",
    email: "chukwu.b@udebemcresh.com",
    phone: "+234 90 4567 8901",
    dateAdded: "20 Jul 2025",
    role: "Admin",
    status: "Pending",
  },
  {
    id: "5",
    name: "Mrs. Amaka Taiwo",
    email: "amaka.t@udebemcresh.com",
    phone: "+234 81 5678 9012",
    dateAdded: "15 Jun 2025",
    role: "Caregiver",
    status: "Active",
  },
];

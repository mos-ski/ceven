import { notFound } from "next/navigation";

import { StaffProfileView } from "@/components/admin/staff/staff-profile-view";
import { STAFF } from "@/lib/mock-data/staff";

export default async function StaffProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const staff = STAFF.find((s) => s.id === id);

  if (!staff) {
    notFound();
  }

  return <StaffProfileView staff={staff} />;
}

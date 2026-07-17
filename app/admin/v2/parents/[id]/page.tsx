import { notFound } from "next/navigation";

import { ParentProfileView } from "@/components/admin/parents/parent-profile-view";
import { PARENTS } from "@/lib/mock-data/children";

export default async function ParentProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const parent = PARENTS.find((p) => p.id === id);

  if (!parent) {
    notFound();
  }

  return <ParentProfileView parent={parent} />;
}

import { notFound } from "next/navigation";

import { ChildProfileView } from "@/components/admin/children/child-profile-view";
import { CHILDREN } from "@/lib/mock-data/children";

export default async function ChildProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const child = CHILDREN.find((c) => c.id === id);

  if (!child) {
    notFound();
  }

  return <ChildProfileView child={child} />;
}

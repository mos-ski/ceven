import { redirect } from "next/navigation";

export default function ParentV1Page() {
  redirect("/parent/auth");
}

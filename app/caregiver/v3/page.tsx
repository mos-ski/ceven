const PROTOTYPE_SRC = "/prototypes/parent-caregiver-v3.html";

export default function CaregiverV3ImportPage() {
  return (
    <main className="h-dvh w-full overflow-hidden bg-[#EFE6D8]">
      <iframe
        src={PROTOTYPE_SRC}
        title="Parent/Caregiver v3 imported prototype"
        className="h-full w-full border-0"
      />
    </main>
  );
}

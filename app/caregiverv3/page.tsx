const PROTOTYPE_SRC = "/prototypes/parent-caregiver-v3.html";

export default function CaregiverV3Page() {
  return (
    <main className="h-dvh w-full overflow-hidden bg-[#EFE6D8]">
      <iframe
        src={PROTOTYPE_SRC}
        title="Caregiver v3 prototype"
        className="h-full w-full border-0"
      />
    </main>
  );
}

const PROTOTYPE_SRC = "/prototypes/parent-caregiver-v3.html";

export default function ParentV3Page() {
  return (
    <main className="h-dvh w-full overflow-hidden bg-[#EFE6D8]">
      <iframe
        src={PROTOTYPE_SRC}
        title="Parent v3 prototype"
        className="h-full w-full border-0"
      />
    </main>
  );
}

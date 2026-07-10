export function AboutMissionSection() {
  return (
    <section className="bg-[#F5EFE4] px-12 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <div className="inline-flex items-center border border-[#3B2513]/30 text-[#3B2513] text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
            What Drives Us
          </div>
          <h2 className="font-[family-name:var(--font-merriweather-import)] text-[#1A1208] text-4xl font-bold">
            Mission &amp; Vision
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-10">
          <div>
            <p className="text-[#9A6033] text-sm font-semibold mb-4">Our Vision</p>
            <h3 className="text-[#1A1208] text-xl font-bold leading-snug mb-4">
              A world where working parents never have to choose between presence
              and progress
            </h3>
            <p className="text-[#6B5744] text-sm leading-relaxed">
              We imagine an Africa where modern infrastructure catches up with modern
              ambition. Where every working parent — in Lagos, in Nairobi, in Accra —
              can build their career without surrendering their peace of mind.
            </p>
          </div>

          <div className="bg-[#EDE8E0] border border-[#D4C4B0] rounded-2xl p-8">
            <p className="text-[#9A6033] text-sm font-semibold mb-4">Our Mission</p>
            <h3 className="text-[#1A1208] text-xl font-bold leading-snug mb-4">
              To connect working parents and crèches through transparent, dignified
              communication
            </h3>
            <p className="text-[#6B5744] text-sm leading-relaxed">
              CEven is the layer that makes that connection real. Not through
              surveillance, but through structured care. Not through anxiety, but through
              information. Every family deserves this infrastructure.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

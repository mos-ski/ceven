const STATS = [
  {
    value: "100+",
    label: "Happy Children",
    description:
      "We've connected the parents of over 100 kids to a better way of parenting, while others still struggle to be part of their kids lives",
  },
  {
    value: "25k",
    label: "Registered Hours",
    description:
      "Over 25,000 hours of very detailed care and attention given to the beautiful kids in our crèches, while parents keep their careers going.",
  },
  {
    value: "12",
    label: "Registered Crèches",
    description:
      "We helped over 12 crèches build trust with parents, and offer detailed care and information to both parents and children",
  },
];

export function AboutStatsSection() {
  return (
    <section className="bg-[#F5EFE4] px-12 pt-12 pb-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-[family-name:var(--font-mogra-import)] text-[#3B2513] text-4xl mb-8">
          We've achieved
        </h2>

        <div className="bg-[#FFF9F0] rounded-3xl border border-[#E8DDD0] p-12">
          <div className="grid grid-cols-3 gap-8 text-center">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="font-[family-name:var(--font-mogra-import)] text-[#3B2513] text-7xl leading-none mb-3">
                  {stat.value}
                </p>
                <p className="text-[#1A1208] font-bold text-lg mb-3">{stat.label}</p>
                <p className="text-[#6B5744] text-sm leading-relaxed max-w-[220px] mx-auto">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

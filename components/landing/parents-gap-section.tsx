export function ParentsGapSection() {
  return (
    <section className="bg-[#3B2513] px-4 sm:px-8 lg:px-16 py-16 sm:py-20">
      <div className="max-w-3xl mx-auto">
        <p className="text-[#FAF2E1]/50 text-xs font-semibold uppercase tracking-widest mb-6">
          The Thing Nobody Talks About
        </p>
        <h2 className="font-[family-name:var(--font-merriweather-import)] text-[#FAF2E1] text-2xl sm:text-3xl lg:text-4xl font-bold leading-[1.2] mb-6 sm:mb-8">
          The gap between work and home<br />
          shouldn't cost you peace of mind
        </h2>

        <p className="text-[#FAF2E1]/70 text-base leading-relaxed mb-5">
          It's not guilt exactly. It's something quieter, more persistent. A small, constant
          hum underneath your day; meetings, deliverables, traffic, that never quite goes
          silent.{" "}
          <em className="text-[#C8823A]">
            Is she okay? Did she eat? Is anyone paying attention to her right now?
          </em>
        </p>

        <p className="text-[#FAF2E1]/70 text-base leading-relaxed mb-8">
          You've called the crèche from a bathroom stall. You've refreshed a WhatsApp group
          looking for any mention of your child's name. You've felt the weight of choosing,
          again and again, between the job that provides and the presence you can't give.
          That weight is real. And it accumulates.
        </p>

        <blockquote className="border-l-2 border-[#C8823A] pl-6">
          <p className="text-[#C8823A] text-base leading-relaxed italic">
            Knowing isn't the same as being there. But it's the closest thing to it.
            <br />
            That's why CEven exists.
          </p>
        </blockquote>
      </div>
    </section>
  );
}

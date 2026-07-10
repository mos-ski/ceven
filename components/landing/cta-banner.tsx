export function CtaBanner() {
  return (
    <section className="relative bg-[#3B2513] overflow-hidden">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='%235B391E'/%3E%3C/svg%3E\")",
        }}
      />
      <div className="relative z-10 px-12 py-24 text-center max-w-3xl mx-auto">
        <h2 className="text-[#FAF2E1] text-4xl font-bold leading-[1.2] mb-5">
          Childcare support is now in<br />
          your pocket
        </h2>
        <p className="text-[#FAF2E1]/60 text-base leading-relaxed mb-10 max-w-xl mx-auto">
          Be part of every aspect of your child's life, while building your dreams.
          Whether it's their first steps, or their first words, you can be part of those
          special moments without your career taking the hit. CEven connects intentional
          parents to the best crèche services there is.
        </p>
        <a
          href="#"
          className="inline-flex items-center gap-2.5 bg-[#FAF2E1] text-[#3B2513] text-sm font-semibold px-6 py-3.5 rounded-full hover:bg-white transition-colors"
        >
          <PlayStoreIcon />
          Download on Google Play
        </a>
      </div>
    </section>
  );
}

function PlayStoreIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 20.5v-17c0-.83 1-.83 1.5-.5l14 8.5c.5.3.5 1.2 0 1.5L4.5 21c-.5.33-1.5.33-1.5-.5z" />
    </svg>
  );
}

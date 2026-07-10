export function ParentsPhotoCTASection() {
  return (
    <section className="relative bg-[#3B2513] overflow-hidden min-h-[340px] flex items-center">
      <div className="absolute inset-0 bg-gradient-to-r from-[#1A1208]/80 to-[#3B2513]/40" />
      <div className="relative z-10 px-12 py-20 max-w-2xl">
        <h2 className="text-[#FAF2E1] text-4xl font-bold leading-[1.2] mb-4">
          Let's help you be part of every<br />
          moment of your child's life
        </h2>
        <p className="text-[#FAF2E1]/60 text-base leading-relaxed mb-8">
          Start your easier and better parenting journey with CEven.
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

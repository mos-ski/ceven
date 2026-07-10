import Image from "next/image";

export function ParentsPhotoCTASection() {
  return (
    <section className="relative overflow-hidden min-h-[340px] sm:min-h-[420px] flex items-center">
      <Image
        src="/255fa3500055ffd7821889527696eab502edda6a.jpg"
        alt=""
        fill
        className="object-cover object-top"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1A1208]/85 via-[#1A1208]/60 to-transparent" />
      <div className="relative z-10 px-4 sm:px-8 lg:px-16 py-16 sm:py-20 max-w-2xl">
        <h2 className="text-[#FAF2E1] text-2xl sm:text-3xl lg:text-4xl font-bold leading-[1.2] mb-4">
          Let's help you be part of every<br />
          moment of your child's life
        </h2>
        <p className="text-[#FAF2E1]/70 text-sm sm:text-base leading-relaxed mb-8">
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
    <Image
      src="/google-play-icon.png"
      alt=""
      width={16}
      height={16}
      className="w-4 h-4"
    />
  );
}

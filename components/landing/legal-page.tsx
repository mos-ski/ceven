import { LandingNav } from "./nav";

type LegalSection = {
  title: string;
  body: string[];
};

type LegalPageProps = {
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
};

export function LegalPage({ eyebrow, title, updated, intro, sections }: LegalPageProps) {
  return (
    <article className="bg-[#F5EFE4] text-[#2D1810]">
      <LandingNav variant="light" />

      <header className="px-4 pb-14 pt-10 sm:px-8 lg:px-16 lg:pb-18 lg:pt-14">
        <div className="mx-auto max-w-4xl">
          <p className="mb-5 inline-flex rounded-full border border-[#D4C4B0] bg-[#EDE8E0] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#7A4E2E]">
            {eyebrow}
          </p>
          <h1 className="font-[family-name:var(--font-merriweather-import)] text-4xl font-bold leading-[1.08] text-[#1A1208] sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-7 text-[#6B5744] sm:text-lg">
            {intro}
          </p>
          <p className="mt-6 text-sm font-medium text-[#9A6033]">Last updated: {updated}</p>
        </div>
      </header>

      <section className="bg-[#FFF9F0] px-4 py-14 sm:px-8 lg:px-16 lg:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[260px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-8 border-l border-[#D8C7B2] pl-5">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#9A6033]">
                On this page
              </p>
              <ol className="space-y-3 text-sm text-[#6B5744]">
                {sections.map((section) => (
                  <li key={section.title}>{section.title}</li>
                ))}
              </ol>
            </div>
          </aside>

          <div className="space-y-8">
            {sections.map((section) => (
              <section
                key={section.title}
                className="rounded-[8px] border border-[#E8D9C6] bg-white px-5 py-6 shadow-[0_18px_50px_rgba(59,37,19,0.06)] sm:px-8 sm:py-7"
              >
                <h2 className="mb-4 font-[family-name:var(--font-merriweather-import)] text-2xl font-bold leading-tight text-[#2D1810]">
                  {section.title}
                </h2>
                <div className="space-y-4 text-base leading-7 text-[#5E4A39]">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}

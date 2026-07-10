import Link from "next/link";

const FOOTER_LINKS = {
  Audience: [
    { label: "For Parents", href: "/for-parents" },
    { label: "For Crèches", href: "/for-creches" },
    { label: "Download App", href: "#" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Swayosoo™", href: "#" },
    { label: "Contact Us", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Data & Children", href: "#" },
  ],
};

export function LandingFooter() {
  return (
    <footer className="relative bg-[#3B2010]">
      <CloudWaveTop />
      <div className="px-12 pt-16 pb-8">
        <div className="flex justify-between items-start mb-12">
          <div>
            <div className="flex items-center gap-2 bg-[#FAF2E1] rounded-xl px-4 py-2.5 w-fit mb-4">
              <CevenIcon />
              <span className="text-[#3B2513] font-bold text-base tracking-tight">CEven</span>
            </div>
            <p className="text-[#FAF2E1] text-lg font-medium mb-1">Life made easier for families</p>
            <p className="text-[#FAF2E1]/60 text-sm">
              A product by{" "}
              <span className="text-[#9A6033] font-medium">Swayosoo™</span>
            </p>
          </div>

          <div className="flex gap-20">
            {Object.entries(FOOTER_LINKS).map(([category, links]) => (
              <div key={category}>
                <p className="text-[#9A6033] text-sm font-semibold mb-4">{category}</p>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[#FAF2E1]/70 text-sm hover:text-[#FAF2E1] transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-[#FAF2E1]/10 pt-6 flex justify-between items-center">
          <p className="text-[#FAF2E1]/50 text-sm">
            © 2025 CEven by Swayosoo™. All rights reserved.
          </p>
          <p className="text-[#FAF2E1]/50 text-sm">Lagos, Nigeria</p>
        </div>
      </div>
    </footer>
  );
}

function CloudWaveTop() {
  return (
    <div className="w-full overflow-hidden leading-none">
      <svg
        viewBox="0 0 1280 90"
        preserveAspectRatio="none"
        className="w-full h-20 block"
        style={{ background: "#F5EFE4" }}
      >
        <path
          d="M0,90 L0,50 C40,20 80,70 120,45 C160,20 200,65 240,42 C280,18 320,68 360,44 C400,20 440,66 480,42 C520,18 560,64 600,40 C640,16 680,62 720,40 C760,18 800,64 840,42 C880,20 920,66 960,44 C1000,22 1040,68 1080,46 C1120,24 1160,70 1200,48 C1220,37 1250,55 1280,45 L1280,90 Z"
          fill="#3B2010"
        />
      </svg>
    </div>
  );
}

function CevenIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
      <circle cx="7" cy="10" r="6" fill="#9A6033" />
      <circle cx="13" cy="10" r="6" fill="#4A7C59" opacity="0.9" />
    </svg>
  );
}

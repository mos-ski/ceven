interface AppDownloadHandoffProps {
  email: string;
  phone: string;
  sendToWhatsApp: boolean;
  inline?: boolean;
}

export function AppDownloadHandoff({ email, phone, sendToWhatsApp, inline = false }: AppDownloadHandoffProps) {
  const inner = (
    <div className="w-full max-w-[440px] text-center">
      <h1 className="font-[family-name:var(--font-merriweather-import)] text-[28px] font-bold text-heading">
        You&apos;re all set. Get the CEven app.
      </h1>
      <p className="mt-3 font-[family-name:var(--font-urbanist-import)] text-base text-muted-text">
        We&apos;ve sent the download link to{" "}
        <span className="font-semibold text-heading">{email}</span>
        {sendToWhatsApp && phone && (
          <>
            {" "}
            and to your WhatsApp at <span className="font-semibold text-heading">{phone}</span>
          </>
        )}
        .
      </p>
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <a
          href="#"
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#3B2513] px-6 font-[family-name:var(--font-urbanist-import)] text-sm font-semibold text-[#faf2e1] sm:w-auto"
        >
          Google Play
        </a>
        <a
          href="#"
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#3d444f] px-6 font-[family-name:var(--font-urbanist-import)] text-sm font-semibold text-[#3d444f] sm:w-auto"
        >
          App Store
        </a>
      </div>
    </div>
  );

  if (inline) {
    return (
      <div className="flex w-full flex-col items-center py-10 px-6">
        {inner}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#faf2e1] px-6 py-14 text-center">
      {inner}
    </div>
  );
}

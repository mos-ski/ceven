interface FinalContactStepProps {
  name: string;
  onNameChange: (v: string) => void;
  email: string;
  onEmailChange: (v: string) => void;
  phone: string;
  onPhoneChange: (v: string) => void;
  sendToWhatsApp: boolean;
  onSendToWhatsAppChange: (v: boolean) => void;
  onSubmit: () => void;
}

export function FinalContactStep({
  name,
  onNameChange,
  email,
  onEmailChange,
  phone,
  onPhoneChange,
  sendToWhatsApp,
  onSendToWhatsAppChange,
  onSubmit,
}: FinalContactStepProps) {
  const canSubmit =
    name.trim().length > 0 && email.trim().length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) && (!sendToWhatsApp || phone.trim().length > 0);

  return (
    <div className="flex flex-col gap-4">
      <input
        type="text"
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        placeholder="Your name"
        className="h-14 w-full rounded-xl border border-[#E5E1D8] bg-white px-4 font-[family-name:var(--font-urbanist)] text-base text-heading outline-none focus:border-brand-dark"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => onEmailChange(e.target.value)}
        placeholder="you@example.com"
        className="h-14 w-full rounded-xl border border-[#E5E1D8] bg-white px-4 font-[family-name:var(--font-urbanist)] text-base text-heading outline-none focus:border-brand-dark"
      />
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={sendToWhatsApp}
          onChange={(e) => onSendToWhatsAppChange(e.target.checked)}
          className="h-4 w-4 accent-[#3B2513]"
        />
        <span className="font-[family-name:var(--font-urbanist)] text-sm text-muted-text">
          Also send this to my WhatsApp
        </span>
      </label>
      {sendToWhatsApp && (
        <input
          type="tel"
          value={phone}
          onChange={(e) => onPhoneChange(e.target.value)}
          placeholder="WhatsApp phone number"
          className="h-14 w-full rounded-xl border border-[#E5E1D8] bg-white px-4 font-[family-name:var(--font-urbanist)] text-base text-heading outline-none focus:border-brand-dark"
        />
      )}
      <button
        onClick={onSubmit}
        disabled={!canSubmit}
        className={`h-12 w-full rounded-xl font-[family-name:var(--font-urbanist)] text-sm font-semibold text-white transition-opacity ${
          canSubmit ? "bg-brand-dark hover:opacity-90" : "bg-brand-dark/40"
        }`}
      >
        Get the CEven app
      </button>
    </div>
  );
}

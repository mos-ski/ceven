export function SocialAuthRow() {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-input-border" />
        <span className="font-[family-name:var(--font-urbanist)] text-xs text-muted-text">
          OR
        </span>
        <div className="h-px flex-1 bg-input-border" />
      </div>
      <div className="flex gap-3">
        <button
          type="button"
          className="flex h-11 flex-1 items-center justify-center gap-2 rounded-lg border border-input-border bg-white font-[family-name:var(--font-urbanist)] text-sm font-medium text-heading"
        >
          <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
            <path
              fill="#4285F4"
              d="M23.49 12.27c0-.79-.07-1.54-.2-2.27H12v4.51h6.47c-.28 1.48-1.13 2.73-2.41 3.58v2.97h3.86c2.26-2.08 3.57-5.15 3.57-8.79z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.92-2.92l-3.86-2.97c-1.07.72-2.45 1.15-4.06 1.15-3.13 0-5.78-2.11-6.73-4.96H1.27v3.06C3.23 21.3 7.27 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.27 14.3a7.16 7.16 0 0 1 0-4.6V6.64H1.27a11.96 11.96 0 0 0 0 10.72l4-3.06z"
            />
            <path
              fill="#EA4335"
              d="M12 4.74c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.94 1.18 15.24 0 12 0 7.27 0 3.23 2.7 1.27 6.64l4 3.06C6.22 6.85 8.87 4.74 12 4.74z"
            />
          </svg>
          Google
        </button>
        <button
          type="button"
          className="flex h-11 flex-1 items-center justify-center gap-2 rounded-lg border border-input-border bg-white font-[family-name:var(--font-urbanist)] text-sm font-medium text-heading"
        >
          <svg viewBox="0 0 24 24" className="size-5 fill-heading" aria-hidden="true">
            <path d="M16.36 1.05c.1 1.04-.27 2.05-.94 2.83-.7.82-1.85 1.45-2.92 1.36-.12-1 .33-2.06 1-2.79.74-.83 1.99-1.46 2.86-1.4zM20.4 17.2c-.43.99-.64 1.43-1.2 2.31-.79 1.24-1.9 2.79-3.28 2.8-1.22.01-1.54-.79-3.2-.78-1.66.01-2.02.8-3.24.79-1.38-.01-2.43-1.41-3.22-2.65-2.22-3.45-2.45-7.5-1.08-9.66.97-1.55 2.5-2.46 3.93-2.46 1.45 0 2.36.79 3.56.79 1.16 0 1.87-.79 3.55-.79 1.28 0 2.64.7 3.6 1.9-3.17 1.74-2.66 6.26.58 7.75z" />
          </svg>
          Apple
        </button>
      </div>
    </div>
  );
}

"use client";

type Props = {
  value: string;
  onChange: (v: string) => void;
  length?: number;
};

export function OtpInput({ value, onChange, length = 6 }: Props) {
  function handleKey(key: string) {
    if (key === "backspace") {
      onChange(value.slice(0, -1));
      return;
    }
    if (value.length < length && /^\d$/.test(key)) {
      onChange(value + key);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Boxes */}
      <div className="flex gap-2">
        {Array.from({ length }).map((_, i) => (
          <div
            key={i}
            className="flex h-12 flex-1 items-center justify-center rounded-lg border border-gray-200 bg-white text-lg font-bold text-cg-brand"
          >
            {value[i] ?? <span className="text-gray-300">–</span>}
          </div>
        ))}
      </div>

      {/* Numeric keypad */}
      <div className="mt-2 rounded-t-3xl bg-gray-100 px-4 pt-4 pb-2">
        {/* Display row */}
        <div className="mb-2 flex h-10 items-center justify-center rounded-lg bg-white text-base font-mono text-gray-500">
          {value || ""}
        </div>
        {/* Keys */}
        {[["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"], ["", "0", "backspace"]].map(
          (row, ri) => (
            <div key={ri} className="mb-2 flex gap-2">
              {row.map((k) => (
                <button
                  key={k}
                  onClick={() => k && handleKey(k)}
                  className={`flex h-14 flex-1 items-center justify-center rounded-xl text-lg font-medium ${
                    k ? "bg-white text-cg-brand shadow-sm active:bg-gray-200" : "bg-transparent"
                  }`}
                  disabled={!k}
                >
                  {k === "backspace" ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M9 9L15 15M15 9L9 15M3 12L7 5H21V19H7L3 12Z"
                        stroke="#3B2513"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    k
                  )}
                </button>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}

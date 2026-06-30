"use client";

type Props = {
  value: string;
  onChange: (v: string) => void;
  label: string;
  length?: number;
};

export function PinInput({ value, onChange, label, length = 6 }: Props) {
  function handleKey(key: string) {
    if (key === "backspace") {
      onChange(value.slice(0, -1));
    } else if (value.length < length && /^\d$/.test(key)) {
      onChange(value + key);
    }
  }

  return (
    <div>
      <p className="mb-2 text-sm font-medium text-gray-700">{label}</p>
      <div className="flex gap-2">
        {Array.from({ length }).map((_, i) => (
          <div
            key={i}
            className="flex h-11 flex-1 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-lg font-bold text-cg-brand"
          >
            {value[i] ? "●" : <span className="text-gray-300">–</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

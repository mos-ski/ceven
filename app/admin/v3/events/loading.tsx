export default function EventsLoading() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-8 w-24 bg-[#F5EDD8] rounded-lg animate-pulse" />
          <div className="h-8 w-16 bg-[#F5EDD8] rounded-lg animate-pulse" />
          <div className="flex gap-1">
            <div className="h-8 w-8 bg-[#F5EDD8] rounded-lg animate-pulse" />
            <div className="h-8 w-8 bg-[#F5EDD8] rounded-lg animate-pulse" />
          </div>
          <div className="h-6 w-32 bg-[#F5EDD8] rounded animate-pulse" />
        </div>
        <div className="flex gap-2">
          <div className="h-8 w-20 bg-[#F5EDD8] rounded-lg animate-pulse" />
          <div className="h-8 w-28 bg-[#3B2513]/20 rounded-lg animate-pulse" />
        </div>
      </div>

      <div className="flex gap-4 flex-1">
        <div className="flex-1 rounded-2xl border border-black/[0.07] bg-white">
          <div className="grid grid-cols-7 border-b border-black/[0.07]">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="py-2 flex justify-center">
                <div className="h-3 w-6 bg-[#F5EDD8] rounded animate-pulse" />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {Array.from({ length: 35 }).map((_, i) => (
              <div key={i} className="min-h-[80px] border-b border-r border-black/[0.04] p-1">
                <div className="h-5 w-5 bg-[#F5EDD8]/60 rounded-full mb-1 animate-pulse" />
                {i % 4 === 0 && <div className="h-3 w-full bg-[#F5EDD8]/40 rounded animate-pulse" />}
                {i % 5 === 0 && <div className="h-3 w-3/4 bg-[#F5EDD8]/30 rounded mt-0.5 animate-pulse" />}
              </div>
            ))}
          </div>
        </div>

        <div className="hidden w-[280px] shrink-0 flex-col gap-4 lg:flex">
          <div className="rounded-2xl border border-black/[0.07] bg-white p-4">
            <div className="h-3 w-24 bg-[#F5EDD8] rounded mb-3 animate-pulse" />
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 35 }).map((_, i) => (
                <div key={i} className="flex justify-center">
                  <div className="h-5 w-5 bg-[#F5EDD8]/40 rounded-full animate-pulse" />
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 rounded-2xl border border-black/[0.07] bg-white p-4">
            <div className="h-3 w-32 bg-[#F5EDD8] rounded mb-3 animate-pulse" />
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="mb-2 rounded-xl border border-black/[0.06] p-3">
                <div className="h-3 w-24 bg-[#F5EDD8] rounded mb-2 animate-pulse" />
                <div className="h-2 w-32 bg-[#F5EDD8]/60 rounded mb-1 animate-pulse" />
                <div className="h-2 w-20 bg-[#F5EDD8]/40 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

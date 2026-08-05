export default function MessagesLoading() {
  return (
    <div className="flex h-[calc(100vh-140px)] flex-col">
      <div className="mb-4">
        <div className="h-8 w-32 bg-[#F5EDD8] rounded-lg animate-pulse" />
        <div className="h-4 w-48 bg-[#F5EDD8] rounded mt-2 animate-pulse" />
      </div>
      <div className="flex min-h-0 flex-1 overflow-hidden rounded-2xl border border-black/[0.07] bg-white">
        {/* Left panel skeleton */}
        <div className="w-[320px] shrink-0 border-r border-black/[0.07] p-3">
          <div className="h-9 w-full bg-[#F5EDD8]/60 rounded-lg mb-3 animate-pulse" />
          <div className="px-2 mb-2">
            <div className="h-2 w-16 bg-[#F5EDD8] rounded animate-pulse" />
          </div>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-start gap-3 px-2 py-2.5">
              <div className="h-9 w-9 rounded-lg bg-[#F5EDD8] animate-pulse" />
              <div className="flex-1">
                <div className="h-3 w-28 bg-[#F5EDD8] rounded mb-1 animate-pulse" />
                <div className="h-2.5 w-36 bg-[#F5EDD8]/60 rounded mb-1 animate-pulse" />
                <div className="h-2.5 w-20 bg-[#F5EDD8]/40 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>

        {/* Right panel skeleton */}
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-center gap-3 border-b border-black/[0.07] px-4 py-3">
            <div className="h-9 w-9 rounded-lg bg-[#F5EDD8] animate-pulse" />
            <div>
              <div className="h-3.5 w-40 bg-[#F5EDD8] rounded mb-1 animate-pulse" />
              <div className="h-2.5 w-32 bg-[#F5EDD8]/60 rounded animate-pulse" />
            </div>
          </div>
          <div className="flex-1 p-4 space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className={`flex ${i % 3 === 0 ? "justify-end" : "justify-start"} gap-2`}>
                {i % 3 !== 0 && <div className="h-8 w-8 rounded-full bg-[#F5EDD8] animate-pulse" />}
                <div className={`max-w-[60%] ${i % 3 === 0 ? "items-end" : "items-start"} flex flex-col`}>
                  {i % 3 !== 0 && <div className="h-2.5 w-20 bg-[#F5EDD8] rounded mb-1 animate-pulse" />}
                  <div className={`h-10 ${i % 2 === 0 ? "w-48" : "w-36"} bg-[#F5EDD8]/60 rounded-2xl animate-pulse`} />
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-black/[0.07] px-4 py-3">
            <div className="h-10 w-full bg-[#F5EDD8]/60 rounded-xl animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}

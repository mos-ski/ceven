"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Search, MapPin, Star, Users } from "lucide-react";
import { SafeImage } from "@/components/ui/safe-image";
import { mockCreches } from "@/lib/parent/mock-data";

const CRECHE_IMAGES: Record<string, string> = {
  "creche-1": "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?auto=format&fit=crop&w=400&q=80",
  "creche-2": "https://images.unsplash.com/photo-1566004100631-35d015d6a491?auto=format&fit=crop&w=400&q=80",
  "creche-3": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=400&q=80",
  "creche-4": "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=400&q=80",
  "creche-5": "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=400&q=80",
};

function SkeletonCard() {
  return (
    <div className="flex items-start gap-3 animate-pulse">
      <div className="h-20 w-20 shrink-0 rounded-xl bg-gray-200" />
      <div className="flex-1 pt-1 space-y-2">
        <div className="h-4 w-3/4 rounded bg-gray-200" />
        <div className="h-3 w-1/2 rounded bg-gray-200" />
        <div className="flex gap-3 mt-1">
          <div className="h-3 w-12 rounded bg-gray-200" />
          <div className="h-3 w-10 rounded bg-gray-200" />
          <div className="h-3 w-14 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

export default function CrecheDiscoveryPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(t);
  }, []);

  const filtered = query
    ? mockCreches.filter(
        (c) =>
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.location.toLowerCase().includes(query.toLowerCase())
      )
    : mockCreches;

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {/* Brown header with banner image */}
      <div className="shrink-0 bg-cg-brand px-6 pb-6 pt-4">
        <button
          onClick={() => router.back()}
          className="mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/20"
        >
          <ArrowLeft size={16} className="text-white" />
        </button>

        {/* Banner */}
        <div className="mb-4 overflow-hidden rounded-2xl">
          <div className="relative h-32">
            <SafeImage
              src="https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?auto=format&fit=crop&w=800&q=80"
              alt="Find a creche"
              className="h-full w-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#5B391E]/80 via-[#5B391E]/20 to-transparent" />
            <div className="absolute bottom-3 left-4 right-4">
              <p className="text-lg font-bold text-white">Find the Right Creche</p>
              <p className="text-[11px] text-white/70">Browse top-rated crèches near you</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center gap-3 rounded-xl bg-white px-4 py-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by creche name, city, state"
            className="flex-1 bg-transparent text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
          />
          <Search size={18} className="shrink-0 text-gray-400" />
        </div>
      </div>

      {/* White content card */}
      <div className="flex-1 overflow-y-auto rounded-t-2xl bg-white px-6 pt-5 -mt-3 relative z-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-bold text-gray-800">Recommendations</h2>
          <button className="text-sm font-medium text-cg-accent">See all</button>
        </div>

        <div className="flex flex-col gap-4">
          {loading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            filtered.map((creche) => (
              <Link
                key={creche.id}
                href={`/parent/creche/${creche.id}`}
                className="flex items-start gap-3 active:scale-[0.98] transition-transform"
              >
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-cg-quick-action">
                  <SafeImage
                    src={CRECHE_IMAGES[creche.id] ?? CRECHE_IMAGES["creche-1"]}
                    alt={creche.name}
                    className="h-full w-full"
                  />
                </div>
                <div className="flex-1 min-w-0 pt-1">
                  <p className="font-bold text-gray-800 text-sm leading-tight">{creche.name}</p>
                  <p className="mt-0.5 text-xs text-gray-400">{creche.location}</p>
                  <div className="mt-1.5 flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <MapPin size={11} className="text-rose-400" fill="currentColor" />
                      {creche.distance}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star size={11} className="text-amber-400" fill="currentColor" />
                      {creche.rating.toFixed(1)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={11} className="text-gray-400" />
                      {creche.spots} spots
                    </span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

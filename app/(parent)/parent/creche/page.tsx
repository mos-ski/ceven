"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Search, MapPin, Star, Users } from "lucide-react";
import { mockCreches } from "@/lib/parent/mock-data";

export default function CrecheDiscoveryPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const filtered = query
    ? mockCreches.filter(
        (c) =>
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.location.toLowerCase().includes(query.toLowerCase())
      )
    : mockCreches;

  return (
    <div className="flex flex-1 flex-col">
      {/* Brown header with search */}
      <div className="shrink-0 bg-cg-brand px-6 pb-6 pt-4">
        <button
          onClick={() => router.back()}
          className="mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/20"
        >
          <ArrowLeft size={16} className="text-white" />
        </button>
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
          {filtered.map((creche) => (
            <Link
              key={creche.id}
              href={`/parent/creche/${creche.id}`}
              className="flex items-start gap-3"
            >
              {/* Thumbnail placeholder */}
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-cg-quick-action">
                <div className="flex h-full w-full items-center justify-center">
                  <div className="h-10 w-10 rounded-full bg-cg-accent-muted/60" />
                </div>
              </div>

              {/* Info */}
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
          ))}
        </div>
      </div>
    </div>
  );
}

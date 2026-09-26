"use client";

import { useEffect, useState } from "react";
import WorkoutCard from "./WorkoutCard";

type Workout = {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
};

function SkeletonCard() {
  return (
    <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="w-full h-48 bg-[#1a1a1a]" />

      {/* Content skeleton */}
      <div className="p-5">
        {/* Category pills */}
        <div className="flex gap-2 mb-4">
          <div className="h-5 w-16 bg-[#1f1f1f] rounded-full" />
          <div className="h-5 w-12 bg-[#1f1f1f] rounded-full" />
        </div>

        {/* Title */}
        <div className="h-6 w-3/4 bg-[#1f1f1f] rounded mb-2" />

        {/* Equipment */}
        <div className="h-4 w-1/2 bg-[#1f1f1f] rounded mb-5" />

        {/* Stats */}
        <div className="flex gap-4 border-t border-[#1f1f1f] pt-3">
          <div className="h-4 w-16 bg-[#1f1f1f] rounded" />
          <div className="h-4 w-16 bg-[#1f1f1f] rounded" />
          <div className="h-4 w-12 bg-[#1f1f1f] rounded" />
        </div>
      </div>
    </div>
  );
}

export default function Library() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWorkouts() {
      try {
        const res = await fetch("/data/workouts.json");
        const data = await res.json();
        setWorkouts(data);
      } catch (err) {
        console.error("Failed to load workouts:", err);
      } finally {
        // একটু delay দিলে loading animation ভালোভাবে দেখা যাবে
        setTimeout(() => setLoading(false), 500);
      }
    }
    fetchWorkouts();
  }, []);

  return (
    <section id="library" className="max-w-7xl mx-auto px-6 py-16 scroll-mt-24">
      {/* Header */}
      <div className="mb-8">
        <h2
          className="text-white font-extrabold text-3xl md:text-4xl uppercase"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          THE LIBRARY
        </h2>
        <p className="text-gray-400 mt-2 text-sm md:text-base">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      {/* Loading state — spinner + skeleton */}
      {loading && (
        <>
          {/* Spinner */}
          <div className="flex items-center justify-center gap-3 mb-10">
            <div className="w-6 h-6 border-[3px] border-[#ccff00] border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-400 text-sm">Loading workouts…</p>
          </div>

          {/* Skeleton Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </>
      )}

      {/* Real Data */}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
}
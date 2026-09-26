"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePlan } from "@/context/PlanContext";

type Tab = "plan" | "saved";
type SortKey = "duration" | "calories" | "rating";

export default function MyPlanPage() {
  const { plan, saved, removeFromPlan, removeFromSaved } = usePlan();
  const [tab, setTab] = useState<Tab>("plan");
  const [sortBy, setSortBy] = useState<SortKey>("duration");
  const [toast, setToast] = useState<string | null>(null);

  const list = tab === "plan" ? plan : saved;

  const sortedList = [...list].sort((a, b) => {
    if (sortBy === "duration") return a.duration - b.duration;
    if (sortBy === "calories") return a.caloriesBurned - b.caloriesBurned;
    return b.rating - a.rating;
  });

  // Metrics from PLAN (not saved)
  const totalExercises = plan.length;
  const totalMinutes = plan.reduce((sum, w) => sum + w.duration, 0);
  const totalCalories = plan.reduce((sum, w) => sum + w.caloriesBurned, 0);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleRemove = (id: number, name: string) => {
    if (tab === "plan") removeFromPlan(id);
    else removeFromSaved(id);
    showToast(`Removed ${name}`);
  };

  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <h1
          className="text-white font-extrabold text-4xl uppercase mb-2"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          MY PLAN
        </h1>
        <p className="text-gray-400 text-sm md:text-base mb-8">
          Cap of five lifts for today. Finish them, then load more.
        </p>

        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#111111] border border-[#1f1f1f] rounded-2xl p-6 mb-8">
          <div>
            <p className="text-gray-500 text-sm mb-1">Exercises</p>
            <p className="text-[#ccff00] text-4xl font-extrabold">
              {totalExercises}
            </p>
          </div>
          <div className="sm:border-l sm:border-[#1f1f1f] sm:pl-6">
            <p className="text-gray-500 text-sm mb-1">Minutes</p>
            <p className="text-white text-4xl font-extrabold">{totalMinutes}</p>
          </div>
          <div className="sm:border-l sm:border-[#1f1f1f] sm:pl-6">
            <p className="text-gray-500 text-sm mb-1">Calories</p>
            <p className="text-white text-4xl font-extrabold">
              {totalCalories}
            </p>
          </div>
        </div>

        {/* Tabs + Sort */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex gap-2 bg-[#111111] border border-[#1f1f1f] rounded-xl p-1">
            <button
              onClick={() => setTab("plan")}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition ${
                tab === "plan"
                  ? "bg-[#1f1f1f] text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Today&apos;s Plan
            </button>
            <button
              onClick={() => setTab("saved")}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition ${
                tab === "saved"
                  ? "bg-[#1f1f1f] text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Saved
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-gray-500 text-sm">Sort By</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortKey)}
              className="bg-[#111111] border border-[#1f1f1f] text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-[#ccff00] cursor-pointer"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        {/* Empty state */}
        {sortedList.length === 0 && (
          <div className="border border-dashed border-[#2a2a2a] rounded-2xl py-20 px-6 text-center">
            <h2
              className="text-white font-extrabold text-2xl uppercase mb-2"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              NOTHING HERE YET
            </h2>
            <p className="text-gray-400 text-sm mb-6">
              Browse the library and add a lift to get today moving.
            </p>
            <Link
              href="/"
              className="inline-block bg-[#ccff00] text-black font-bold text-sm px-6 py-3 rounded-lg hover:bg-[#b3e600] transition"
            >
              Go to workouts
            </Link>
          </div>
        )}

        {/* List */}
        {sortedList.length > 0 && (
          <div className="space-y-4">
            {sortedList.map((workout) => (
              <div
                key={workout.id}
                className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center gap-4"
              >
                {/* Thumbnail */}
                <div className="relative w-full md:w-32 h-24 rounded-xl overflow-hidden shrink-0 bg-[#0a0a0a]">
                  <Image
                    src={workout.image}
                    alt={workout.name}
                    fill
                    sizes="128px"
                    className="object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h3
                    className="text-white font-bold text-lg uppercase mb-1"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    {workout.name}
                  </h3>
                  <p className="text-gray-500 text-xs mb-2">
                    {workout.equipment}
                  </p>

                  {/* Stats Row — সবুজ icons */}
                  <div className="flex items-center gap-4 text-sm text-gray-300">
                    <span className="flex items-center gap-1.5">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ccff00"
                        strokeWidth="2.5"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      {workout.duration} min
                    </span>


                    <span className="flex items-center gap-1.5">
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#ccff00"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  </svg>
  {workout.caloriesBurned} kcal
</span>


                    <span className="flex items-center gap-1.5">

                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ccff00"
                        strokeWidth="2.5"
                        strokeLinejoin="round"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>



                      {workout.rating}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <Link
                    href={`/workouts/${workout.id}`}
                    className="flex-1 md:flex-none text-center border border-[#2a2a2a] text-white text-xs font-semibold px-4 py-2.5 rounded-lg hover:border-[#ccff00] hover:text-[#ccff00] transition"
                  >
                    View Details
                  </Link>

                  {tab === "plan" && (
                    <button
                      onClick={() => showToast(`Marked ${workout.name} as done`)}
                      className="flex-1 md:flex-none bg-[#ccff00] text-black text-xs font-bold px-4 py-2.5 rounded-lg hover:bg-[#b3e600] transition flex items-center justify-center gap-1.5"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Mark as Done
                    </button>
                  )}

                  <button
                    onClick={() => handleRemove(workout.id, workout.name)}
                    className="text-gray-500 hover:text-red-500 transition p-2"
                    aria-label="Remove"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

     {/* Toast — Top Right */}
{toast && (
  <div className="fixed top-24 right-6 bg-[#ccff00] text-black font-bold text-sm px-5 py-3 rounded-lg shadow-2xl shadow-black/50 z-[100]">
    {toast}
  </div>
)}
    </div>
  );

}

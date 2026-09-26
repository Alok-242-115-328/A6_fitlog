"use client";

import { usePlan } from "@/context/PlanContext";
import { useState } from "react";

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

export default function AddToPlanButtons({ workout }: { workout: Workout }) {
  const { addToPlan, saveForLater, plan, saved } = usePlan();
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleAddToPlan = () => {
    if (plan.length >= 5) {
      showToast("Plan is full (max 5 lifts)");
      return;
    }
    const success = addToPlan(workout);
    if (success) showToast("Added to today's plan");
  };

  const handleSaveForLater = () => {
    saveForLater(workout);
    showToast("Saved for later");
  };

  const inPlan = plan.some((p) => p.id === workout.id);
  const inSaved = saved.some((s) => s.id === workout.id);

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleAddToPlan}
          disabled={inPlan}
          className={`inline-flex items-center gap-2 font-bold text-sm px-6 py-3.5 rounded-lg transition ${
            inPlan
              ? "bg-[#333] text-gray-500 cursor-not-allowed"
              : "bg-[#ccff00] text-black hover:bg-[#b3e600] shadow-lg shadow-[#ccff00]/20"
          }`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
            <line x1="12" y1="14" x2="12" y2="18" />
            <line x1="10" y1="16" x2="14" y2="16" />
          </svg>
          {inPlan ? "Already in Plan" : "Add to today's plan"}
        </button>

        <button
          onClick={handleSaveForLater}
          disabled={inSaved}
          className={`inline-flex items-center gap-2 font-bold text-sm px-6 py-3.5 rounded-lg border transition ${
            inSaved
              ? "border-[#333] text-gray-500 cursor-not-allowed"
              : "bg-transparent text-white border-[#2a2a2a] hover:border-[#ccff00] hover:text-[#ccff00]"
          }`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
          {inSaved ? "Already Saved" : "Save for later"}
        </button>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-[#ccff00] text-black font-bold text-sm px-5 py-3 rounded-lg shadow-2xl z-[100] animate-in">
          {toast}
        </div>
      )}
    </>
  );
}
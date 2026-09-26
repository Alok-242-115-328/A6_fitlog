"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

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

type PlanContextType = {
  plan: Workout[];
  saved: Workout[];
  addToPlan: (w: Workout) => boolean;
  saveForLater: (w: Workout) => void;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
};

const PlanContext = createContext<PlanContextType | null>(null);

export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const p = localStorage.getItem("fitlog_plan");
      const s = localStorage.getItem("fitlog_saved");
      if (p) setPlan(JSON.parse(p));
      if (s) setSaved(JSON.parse(s));
    } catch (err) {
      console.error("Failed to load localStorage:", err);
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem("fitlog_plan", JSON.stringify(plan));
  }, [plan, loaded]);

  useEffect(() => {
    if (loaded) localStorage.setItem("fitlog_saved", JSON.stringify(saved));
  }, [saved, loaded]);

  const addToPlan = (w: Workout): boolean => {
    if (plan.length >= 5) return false;
    if (plan.find((item) => item.id === w.id)) return true;
    setPlan([...plan, w]);
    return true;
  };

  const saveForLater = (w: Workout) => {
    if (saved.find((item) => item.id === w.id)) return;
    setSaved([...saved, w]);
  };

  const removeFromPlan = (id: number) => {
    setPlan(plan.filter((item) => item.id !== id));
  };

  const removeFromSaved = (id: number) => {
    setSaved(saved.filter((item) => item.id !== id));
  };

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        addToPlan,
        saveForLater,
        removeFromPlan,
        removeFromSaved,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used within PlanProvider");
  return ctx;
}
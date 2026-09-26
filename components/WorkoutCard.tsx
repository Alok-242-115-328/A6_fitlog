"use client";

import Image from "next/image";
import Link from "next/link";

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

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="group block bg-[#111111] border border-[#1f1f1f] rounded-2xl overflow-hidden hover:border-[#ccff00]/50 transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-black/40"
    >
      {/* Image */}
      <div className="relative w-full h-48 bg-[#0a0a0a] overflow-hidden">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {workout.muscleGroups.map((cat) => (
            <span
              key={cat}
              className="bg-[#ccff00] text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider"
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Name */}
        <h3
          className="text-white font-bold text-xl uppercase mb-2 leading-tight tracking-wide"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          {workout.name}
        </h3>

        {/* Equipment */}
        <p className="text-gray-500 text-sm mb-5">{workout.equipment}</p>

        {/* Stats Row */}
        <div className="flex items-center gap-4 text-sm text-gray-300 border-t border-[#1f1f1f] pt-3">
          {/* Clock icon */}
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
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {workout.duration} min
          </span>

          {/* Flame icon — OUTLINE version */}
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

          {/* Star icon */}
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
    </Link>
  );
}
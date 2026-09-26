import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import workouts from "@/public/data/workouts.json";
import AddToPlanButtons from "@/components/AddToPlanButtons";

export default async function WorkoutDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const workout = workouts.find((w) => w.id === Number(id));

  if (!workout) notFound();

  // Specs data
  const specs = [
    { label: "EQUIPMENT", value: workout.equipment },
    { label: "DIFFICULTY", value: workout.difficulty },
    { label: "SETS", value: workout.sets },
    { label: "REPS", value: workout.reps },
    { label: "DURATION", value: `${workout.duration} min` },
    { label: "CALORIES", value: `${workout.caloriesBurned} kcal` },
    { label: "RATING", value: workout.rating },
  ];

  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Back link */}
        <Link
          href="/"
          className="text-gray-400 hover:text-[#ccff00] text-sm mb-6 inline-flex items-center gap-2 transition"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to library
        </Link>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* LEFT: Image */}
          <div className="relative w-full aspect-square lg:aspect-auto lg:h-[600px] rounded-2xl overflow-hidden bg-[#111111] border border-[#1f1f1f]">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>

          {/* RIGHT: Content */}
          <div>
            {/* Title */}
            <h1
              className="text-white font-extrabold text-4xl md:text-5xl uppercase leading-tight mb-3"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              {workout.name}
            </h1>

            {/* Description */}
            <p className="text-gray-400 text-sm md:text-base mb-5 leading-relaxed">
              {workout.description}
            </p>

            {/* Category pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              {workout.muscleGroups.map((cat) => (
                <span
                  key={cat}
                  className="bg-[#ccff00] text-black text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider"
                >
                  {cat}
                </span>
              ))}
            </div>

            {/* Specs Table */}
            <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl overflow-hidden mb-8">
              {specs.map((spec, idx) => (
                <div
                  key={spec.label}
                  className={`flex items-center justify-between px-5 py-3.5 ${
                    idx !== specs.length - 1 ? "border-b border-[#1f1f1f]" : ""
                  }`}
                >
                  <span className="text-gray-500 text-xs font-bold tracking-wider uppercase">
                    {spec.label}
                  </span>
                  <span className="text-white text-sm font-medium">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Instructions */}
            <div className="mb-8">
              <h2
                className="text-white font-extrabold text-lg uppercase tracking-wider mb-4"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                INSTRUCTIONS
              </h2>
              <ol className="space-y-3">
                {workout.instructions.map((step, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="text-[#ccff00] font-bold text-sm min-w-[20px]">
                      {idx + 1}.
                    </span>
                    <span className="text-gray-300 text-sm leading-relaxed">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            {/* CTA Buttons */}
            <AddToPlanButtons workout={workout} />
          </div>
        </div>
      </div>
    </div>
  );
}
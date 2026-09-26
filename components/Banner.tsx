import Image from "next/image";

export default function Banner() {
  return (
    <section className="w-full bg-[#0a0a0a] px-4 md:px-6 py-8 md:py-12">
      <div className="max-w-7xl mx-auto bg-[#111111] rounded-2xl p-6 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10 border border-[#1f1f1f]">
        {/* Left Content */}
        <div className="flex-1 w-full">
          <p className="text-[#ccff00] text-xs font-bold tracking-[0.25em] mb-4">
            WORKOUT LIBRARY
          </p>

          <h1
            className="text-white font-extrabold text-4xl md:text-6xl leading-[1.05] uppercase mb-6"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            TRAIN WITH INTENT.
            <br />
            LOG EVERY SET.
          </h1>

          <p className="text-gray-400 text-sm md:text-base mb-8 max-w-xl leading-relaxed">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <a
            href="#library"
            className="inline-flex items-center gap-2 bg-[#ccff00] text-black font-bold text-sm px-6 py-3.5 rounded-lg hover:bg-[#b3e600] transition shadow-lg shadow-[#ccff00]/20"
          >
            BROWSE WORKOUTS
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
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center md:justify-end w-full">
          <Image
            src="/banner.png"
            alt="Workout Banner"
            width={400}
            height={400}
            className="object-contain w-64 md:w-80 lg:w-96 h-auto"
            priority
          />
        </div>
      </div>
    </section>
  );
}
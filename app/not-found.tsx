import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-[#0a0a0a] min-h-[70vh] flex items-center justify-center px-6">
      <div className="text-center max-w-lg">


        {/* 404 Big Number */}
      <h1
  className="text-[#ccff00] font-extrabold text-[120px] md:text-[180px] leading-none mb-6"
  style={{ fontFamily: "'Oswald', sans-serif" }}
>
  404
</h1>

<h2
  className="text-white font-extrabold text-3xl md:text-4xl uppercase mb-4"
  style={{ fontFamily: "'Oswald', sans-serif" }}
>
  PAGE NOT FOUND
</h2>



        {/* Description */}
        <p className="text-gray-400 text-sm md:text-base mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back to the grind.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#ccff00] text-black font-bold text-sm px-6 py-3.5 rounded-lg hover:bg-[#b3e600] transition shadow-lg shadow-[#ccff00]/20"
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
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Back to Home
          </Link>

          <Link
            href="/my-plan"
            className="inline-flex items-center gap-2 bg-transparent text-white font-bold text-sm px-6 py-3.5 rounded-lg border border-[#2a2a2a] hover:border-[#ccff00] hover:text-[#ccff00] transition"
          >
            My Plan
          </Link>
        </div>
      </div>
    </div>
  );
}
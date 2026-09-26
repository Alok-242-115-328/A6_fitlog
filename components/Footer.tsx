import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0a0a0a] border-t border-[#1f1f1f] mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-6 gap-4">
        {/* Left: Logo + Brand */}
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="FitLog"
            width={28}
            height={28}
            className="w-7 h-7 object-contain"
          />
          <span className="text-white font-bold tracking-wider">FITLOG</span>
        </div>

        {/* Right: Copyright */}
        <p className="text-gray-500 text-xs md:text-sm text-center md:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
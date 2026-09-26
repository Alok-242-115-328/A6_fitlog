"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  const navLinks = [
    { name: "Workouts", href: "/" },
    { name: "My Plan", href: "/my-plan" },
  ];

  return (
    <nav className="w-full bg-[#0a0a0a] border-b border-[#1f1f1f] sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="FitLog"
            width={32}
            height={32}
            className="w-8 h-8 object-contain"
          />
          <span className="text-white font-bold text-xl tracking-wider">
            FITLOG
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition px-4 py-2 rounded-full ${
                  isActive
                    ? "text-[#ccff00] bg-[#1a1a1a]"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-5">
          <Link href="/my-plan" className="flex items-center gap-2 group">
            <span className="text-white text-sm font-medium">Plan</span>
            <span className="bg-[#ccff00] text-black text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center group-hover:scale-110 transition">
              {plan.length}
            </span>
          </Link>

          <Link href="/my-plan" className="flex items-center gap-2 group">
            <span className="text-white text-sm font-medium">Saved</span>
            <span className="border border-white/30 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center group-hover:scale-110 transition">
              {saved.length}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
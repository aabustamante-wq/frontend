import Link from "next/link";
import { CONFIG } from "@/lib/config";

export default function HomePage() {
  return (
    <div className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-[#1c1714] text-stone-900">
      {/* Subtle Ambient Restaurant Backdrop */}
      <img
        src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20 blur-[2px]"
      />

      {/* Top Navigation */}
      <header className="relative z-10 border-b border-white/10 bg-[#15110f]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#4338ca] text-white shadow-sm">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
            </div>
            <span className="text-base font-bold tracking-tight text-white">
              Table &amp; Hearth
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={CONFIG.ROUTES.LOGIN}
              className="px-3 py-1.5 text-xs font-semibold text-stone-200 transition hover:text-white"
            >
              Sign In
            </Link>
            <Link
              href={CONFIG.ROUTES.REGISTER}
              className="inline-flex h-9 items-center justify-center rounded-full bg-[#4338ca] px-5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#3730a3]"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 mx-auto grid w-full max-w-5xl items-center gap-10 px-6 py-12 lg:grid-cols-2">
        {/* Left: White Welcome Card */}
        <div className="bg-white p-8 shadow-2xl sm:p-12">
          <span className="inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-[#4338ca]">
            Restaurant &amp; Lounge Portal
          </span>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#4338ca] sm:text-4xl">
            Fine Dining Operations, Simplified.
          </h1>

          <p className="mt-4 text-sm leading-relaxed text-stone-600">
            Manage evening reservations, monitor live table occupancy, and keep
            your dining room service running seamlessly from one unified
            dashboard.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={CONFIG.ROUTES.LOGIN}
              className="inline-flex h-11 flex-1 items-center justify-center rounded-full bg-[#4338ca] px-6 text-sm font-semibold text-white shadow-md transition hover:bg-[#3730a3]"
            >
              Login to Portal
            </Link>

            <Link
              href={CONFIG.ROUTES.REGISTER}
              className="inline-flex h-11 flex-1 items-center justify-center rounded-full border border-stone-300 bg-white px-6 text-sm font-semibold text-stone-700 transition hover:bg-stone-50"
            >
              Create Account
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-stone-200 pt-6 text-center">
            <div>
              <p className="text-base font-bold text-[#4338ca]">Live Floor</p>
              <p className="text-xs text-stone-500">Table Tracking</p>
            </div>
            <div>
              <p className="text-base font-bold text-stone-900">Instant</p>
              <p className="text-xs text-stone-500">Guest Seating</p>
            </div>
            <div>
              <p className="text-base font-bold text-stone-900">Secure</p>
              <p className="text-xs text-stone-500">JWT Access</p>
            </div>
          </div>
        </div>

        {/* Right: Framed Fine-Dining Photo */}
        <div className="hidden lg:block">
          <div className="overflow-hidden rounded-2xl border-2 border-white/85 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1000&q=85"
              alt="Cocktails and small plates on a restaurant table"
              className="aspect-[4/4.3] w-full object-cover"
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-4 text-center text-xs text-stone-400">
        Table &amp; Hearth Hospitality Management
      </footer>
    </div>
  );
}
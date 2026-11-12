"use client";

import { useRouter } from "next/navigation";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { CONFIG } from "@/lib/config";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function DashboardPage() {
  const router = useRouter();
  const { isChecking } = useAuthGuard({ requireAuth: true });

  if (isChecking) return null;

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.clear();
    }
    router.push(CONFIG.ROUTES.LOGIN);
  };

  return (
    <div className="min-h-screen bg-[#1c1714] text-white font-sans">
      <header className="border-b border-white/10 bg-[#15110f]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#4338ca] text-white">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
            </div>
            <span className="text-base font-bold tracking-tight">
              Table &amp; Hearth Dashboard
            </span>
          </div>

          <Button
            onClick={handleLogout}
            className="rounded-full bg-[#4338ca] px-5 text-xs font-semibold text-white hover:bg-[#3730a3]"
          >
            Sign Out
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 px-6 py-10">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Dining Room Overview
          </h1>
          <p className="mt-1 text-xs text-stone-300">
            Authenticated session active via NestJS JWT backend.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          <Card className="border border-white/15 bg-white/10 text-white backdrop-blur-md">
            <CardHeader className="pb-2">
              <CardDescription className="text-xs text-stone-300">
                Active Tables
              </CardDescription>
              <CardTitle className="text-3xl font-bold">14 / 20</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-indigo-300">70% floor occupancy</p>
            </CardContent>
          </Card>

          <Card className="border border-white/15 bg-white/10 text-white backdrop-blur-md">
            <CardHeader className="pb-2">
              <CardDescription className="text-xs text-stone-300">
                Evening Reservations
              </CardDescription>
              <CardTitle className="text-3xl font-bold">32</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-stone-300">Next seating at 7:30 PM</p>
            </CardContent>
          </Card>

          <Card className="border border-white/15 bg-white/10 text-white backdrop-blur-md">
            <CardHeader className="pb-2">
              <CardDescription className="text-xs text-stone-300">
                System Status
              </CardDescription>
              <CardTitle className="text-3xl font-bold text-emerald-400">
                Online
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-stone-300">Connected to NestJS API</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
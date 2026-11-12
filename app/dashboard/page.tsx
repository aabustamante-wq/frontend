"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { clearTokens } from "@/lib/auth";
import { CONFIG } from "@/lib/config";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ReservationStatus = "Seated" | "Confirmed" | "Pending";

interface Reservation {
  id: string;
  guest: string;
  party: number;
  table: string;
  time: string;
  status: ReservationStatus;
}

const INITIAL_RESERVATIONS: Reservation[] = [
  { id: "RES-101", guest: "Maria Santos", party: 4, table: "Table 04", time: "7:00 PM", status: "Seated" },
  { id: "RES-102", guest: "Carlos Reyes", party: 2, table: "Table 02", time: "7:30 PM", status: "Confirmed" },
  { id: "RES-103", guest: "Elena Cruz", party: 6, table: "Table 08", time: "8:00 PM", status: "Confirmed" },
  { id: "RES-104", guest: "Miguel Navarro", party: 3, table: "Table 05", time: "8:30 PM", status: "Pending" },
];

export default function DashboardPage() {
  const router = useRouter();
  const { isChecking } = useAuthGuard({ requireAuth: true });
  const [reservations, setReservations] = useState<Reservation[]>(INITIAL_RESERVATIONS);

  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#1c1714]">
        <p className="text-sm text-stone-300">Verifying session...</p>
      </div>
    );
  }

  const handleLogout = () => {
    clearTokens();
    router.push(CONFIG.ROUTES.LOGIN);
  };

  const cycleStatus = (id: string) => {
    const order: ReservationStatus[] = ["Pending", "Confirmed", "Seated"];
    setReservations((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: order[(order.indexOf(item.status) + 1) % order.length] }
          : item
      )
    );
  };

  const getBadgeStyle = (status: ReservationStatus) => {
    switch (status) {
      case "Seated":
        return "bg-emerald-100 text-emerald-800";
      case "Confirmed":
        return "bg-indigo-100 text-[#4338ca]";
      case "Pending":
        return "bg-stone-100 text-stone-700";
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#1c1714] px-4 py-8 text-stone-900 sm:px-8">
      {/* Subtle Ambient Restaurant Backdrop */}
      <img
        src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20 blur-[2px]"
      />

      <div className="relative z-10 mx-auto max-w-5xl space-y-6">
        {/* Top Navigation Header */}
        <header className="flex items-center justify-between bg-white px-6 py-4 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4338ca] text-white shadow-sm">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12a4.5 4.5 0 1 0-4.5-4.5A4.5 4.5 0 0 0 12 12Zm0 2.25c-4.14 0-7.5 2.02-7.5 4.5V20h15v-1.25c0-2.48-3.36-4.5-7.5-4.5Z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-[#4338ca]">
                Dashboard
              </h1>
              <p className="text-xs text-stone-500">Restaurant Lounge Portal</p>
            </div>
          </div>

          <Button
            variant="destructive"
            onClick={handleLogout}
            className="rounded-full px-6 text-xs font-semibold shadow-sm"
          >
            Logout
          </Button>
        </header>

        {/* Welcome Card + Framed Restaurant Photo (Matching Login/Register Layout) */}
        <div className="grid items-stretch gap-6 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border-2 border-white/85 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1000&q=85"
              alt="Cocktails and small plates on a restaurant table"
              className="h-64 w-full object-cover lg:h-full"
            />
          </div>

          <Card className="flex flex-col justify-between rounded-none border-0 bg-white p-2 shadow-2xl">
            <CardHeader>
              <div className="mb-2 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                  Session Active
                </span>
              </div>
              <CardTitle className="text-2xl font-bold text-[#4338ca]">
                Welcome back!
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              <p className="text-sm leading-relaxed text-stone-600">
                You are authenticated. Your active JWT session is stored in LocalStorage.
              </p>

              <div className="grid grid-cols-3 gap-3 border-t border-stone-200 pt-5 text-center">
                <div>
                  <p className="text-lg font-bold text-[#4338ca]">12 / 16</p>
                  <p className="text-xs text-stone-500">Tables</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-stone-900">64</p>
                  <p className="text-xs text-stone-500">Guests</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-stone-900">$2,640</p>
                  <p className="text-xs text-stone-500">Sales</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live Reservations Card */}
        <Card className="rounded-none border-0 bg-white shadow-2xl">
          <CardHeader className="border-b border-stone-200">
            <CardTitle className="text-lg font-bold text-[#4338ca]">
              Tonight&apos;s Reservations
            </CardTitle>
          </CardHeader>
          <CardContent className="divide-y divide-stone-200 p-0">
            {reservations.map((res) => (
              <div
                key={res.id}
                className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-stone-50"
              >
                <div>
                  <p className="text-sm font-semibold text-stone-900">
                    {res.guest}{" "}
                    <span className="font-normal text-stone-400">({res.id})</span>
                  </p>
                  <p className="text-xs text-stone-500">
                    {res.table} &bull; {res.party} Guests &bull; {res.time}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => cycleStatus(res.id)}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition hover:opacity-80 ${getBadgeStyle(
                    res.status
                  )}`}
                >
                  {res.status}
                </button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
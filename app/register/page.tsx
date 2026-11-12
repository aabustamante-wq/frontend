"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { apiClient } from "@/lib/api";
import { CONFIG } from "@/lib/config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function RegisterPage() {
  const router = useRouter();
  const { isChecking } = useAuthGuard({ requireAuth: false });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (isChecking) return null;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!acceptedTerms) {
      setError("Please accept the terms of the agreement.");
      return;
    }

    setLoading(true);

    try {
      await apiClient("/auth/register", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });

      router.push(CONFIG.ROUTES.LOGIN);
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#1c1714] px-4 py-10">
      {/* Subtle Ambient Restaurant Backdrop */}
      <img
        src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20 blur-[2px]"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-5xl items-center gap-10 lg:grid-cols-2">
        {/* Left: Framed Fine-Dining Photo */}
        <div className="hidden lg:block">
          <div className="overflow-hidden rounded-2xl border-2 border-white/85 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1000&q=85"
              alt="Cocktails and small plates on a restaurant table"
              className="aspect-[4/4.3] w-full object-cover"
            />
          </div>
        </div>

        {/* Right: White Create Account Card */}
        <Card className="mx-auto w-full max-w-md rounded-none border-0 bg-white px-4 py-6 text-stone-900 shadow-2xl sm:px-8 sm:py-8">
          <CardHeader className="items-center text-center">
            {/* Avatar Badge */}
            <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-[#4338ca] text-white shadow-sm">
              <svg className="h-11 w-11" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12a4.5 4.5 0 1 0-4.5-4.5A4.5 4.5 0 0 0 12 12Zm0 2.25c-4.14 0-7.5 2.02-7.5 4.5V20h15v-1.25c0-2.48-3.36-4.5-7.5-4.5Z" />
              </svg>
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight text-[#4338ca]">
              Create Account
            </CardTitle>
            <CardDescription className="text-xs text-stone-500">
              Register a new account to get started.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleRegister}>
            <CardContent className="space-y-5 pt-2">
              {error && (
                <div className="rounded-md border border-red-200 bg-red-50 p-3 text-center text-xs font-medium text-red-600">
                  {error}
                </div>
              )}

              {/* Username */}
              <div className="space-y-1">
                <Label htmlFor="username" className="sr-only">
                  Username
                </Label>
                <div className="flex items-center border-b border-stone-300 pb-1.5 transition-colors focus-within:border-[#4338ca]">
                  <svg
                    className="h-4 w-4 shrink-0 text-stone-300"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 12a4.5 4.
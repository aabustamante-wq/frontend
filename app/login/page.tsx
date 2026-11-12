"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { apiClient } from "@/lib/api";
import { setTokens } from "@/lib/auth";
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

interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
}

export default function LoginPage() {
  const router = useRouter();
  const { isChecking } = useAuthGuard({ requireAuth: false });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (isChecking) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await apiClient<LoginResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });

      setTokens(data.accessToken, data.refreshToken);
      router.push(CONFIG.ROUTES.DASHBOARD);
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Login failed. Please check your credentials."
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

        {/* Right: White Login Card */}
        <Card className="mx-auto w-full max-w-md rounded-none border-0 bg-white px-4 py-6 text-stone-900 shadow-2xl sm:px-8 sm:py-8">
          <CardHeader className="items-center text-center">
            <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-[#4338ca] text-white shadow-sm">
              <svg className="h-11 w-11" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight text-[#4338ca]">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-xs text-stone-500">
              Enter your credentials to access your restaurant account.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleLogin}>
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
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                  </svg>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="h-8 border-0 bg-transparent px-3 text-sm text-stone-800 shadow-none placeholder:text-stone-400 focus-visible:ring-0"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1">
                <Label htmlFor="password" className="sr-only">
                  Password
                </Label>
                <div className="flex items-center border-b border-stone-300 pb-1.5 transition-colors focus-within:border-[#4338ca]">
                  <svg
                    className="h-4 w-4 shrink-0 text-stone-300"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="4" y="11" width="16" height="10" rx="2" />
                    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                  </svg>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-8 border-0 bg-transparent px-3 text-sm text-stone-800 shadow-none placeholder:text-stone-400 focus-visible:ring-0"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="text-stone-400 hover:text-stone-600"
                  >
                    {showPassword ? (
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    ) : (
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M3 3l18 18" />
                        <path d="M10.5 6.2A10 10 0 0 1 22 12s-4 7-10 7a10 10 0 0 1-5.5-1.7" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-5 pt-4">
              <Button
                type="submit"
                disabled={loading}
                className="h-11 w-full rounded-full bg-[#4338ca] text-sm font-semibold text-white shadow-md hover:bg-[#3730a3]"
              >
                {loading ? "Logging in..." : "Login"}
              </Button>

              <p className="text-center text-xs text-stone-500">
                Don&apos;t have an account?{" "}
                <Link
                  href={CONFIG.ROUTES.REGISTER}
                  className="font-semibold text-[#4338ca] hover:underline"
                >
                  Register
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
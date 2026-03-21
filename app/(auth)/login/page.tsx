"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn } from "@/services/auth";
import { useAuthStore } from "@/store/auth-store";
import { Mail, Lock, ShieldCheck, BarChart3, Users } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    if (!authLoading && user) {
      router.replace("/dashboard");
    }
  }, [user, authLoading, router]);

  function validateEmail(value: string) {
    if (!value) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Invalid email address";
    return "";
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    const emailErr = validateEmail(email);
    if (emailErr) {
      setEmailError(emailErr);
      return;
    }
    setEmailError("");

    if (!password) {
      setError("Password is required");
      return;
    }

    setLoading(true);
    try {
      await signIn(email, password);
      router.push("/dashboard");
    } catch {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (user) return null;

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-[45%] bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#1D4ED8_0%,#2563EB_50%,#3B82F6_100%)]" />
        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          <div>
            <span className="text-xl font-bold tracking-tight">MedDash</span>
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-4 leading-tight">
              Healthcare Management,<br />Simplified.
            </h1>
            <p className="text-blue-100 text-sm leading-relaxed max-w-sm">
              Monitor patients, track analytics, and manage your healthcare facility from a single, unified dashboard.
            </p>

            <div className="mt-10 space-y-4">
              {[
                { icon: Users, text: "Real-time patient monitoring" },
                { icon: BarChart3, text: "Advanced analytics & reporting" },
                { icon: ShieldCheck, text: "HIPAA-compliant data handling" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/10 flex items-center justify-center">
                    <item.icon size={16} />
                  </div>
                  <span className="text-sm text-blue-50">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-blue-200">
            &copy; 2026 MedDash. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-sm">
          <div className="lg:hidden mb-10">
            <span className="text-lg font-bold tracking-tight text-text">MedDash</span>
          </div>

          <h2 className="text-xl font-bold text-text">Sign in to your account</h2>
          <p className="text-sm text-text-secondary mt-1 mb-8">
            Enter your credentials to access the dashboard
          </p>

          {error && (
            <div className="mb-6 p-3 bg-danger-light border border-red-200 text-red-700 text-xs font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Email Address"
              type="email"
              placeholder="you@hospital.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) setEmailError("");
              }}
              error={emailError}
              icon={<Mail size={16} />}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock size={16} />}
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-3.5 h-3.5 border-border text-primary focus:ring-primary/30"
                />
                <span className="text-xs text-text-secondary">Remember me</span>
              </label>
              <button type="button" className="text-xs text-primary font-medium hover:text-primary-dark">
                Forgot password?
              </button>
            </div>

            <Button type="submit" loading={loading} className="w-full" size="lg">
              Sign in
            </Button>
          </form>

          <p className="mt-10 text-center text-[11px] text-gray-500">
            Use email: <span className="text-black">demo@gmail.com</span> and password: <span className="text-black">#Demo123</span>
          </p>
        </div>
      </div>
    </div>
  );
}

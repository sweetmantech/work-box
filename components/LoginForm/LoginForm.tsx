"use client";
import SEO from "@/utils/seo";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error("Error logging in:", error.message);
    } else {
      router.push("/dashboard");
    }
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) {
      console.error("Error sending magic link:", error.message);
    } else {
      alert("Check your email for the magic link!");
    }
  };

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      console.error("Error signing in with Google:", error.message);
    }
  };

  return (
    <>
      <SEO
        title="My SaaS Boilerplate"
        description="A Next.js TypeScript Login form."
        canonicalUrl="https://yourdomain.com"
        ogImageUrl="https://yourdomain.com/og-image.png"
        twitterHandle="yourtwitterhandle"
      />
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleLogin} className="space-y-4 pb-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
          <div className="flex flex-col space-y-4">
            <Button
              onClick={handleMagicLink}
              variant="outline"
              className="w-full"
            >
              Send Magic Link
            </Button>
            <Button
              onClick={handleGoogleSignIn}
              variant="outline"
              className="w-full"
            >
              Sign in with Google
            </Button>
          </div>
          <p className="text-center text-sm pt-4">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

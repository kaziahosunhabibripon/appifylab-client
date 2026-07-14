"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api";
import { setToken } from "@/lib/auth-storage";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await api.login({ email, password });
      setToken(response.access_token);
      router.push("/feed");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Button type="button" variant="outline" className="mb-10 h-12 w-full gap-2">
        <Image src="/assets/images/google.svg" alt="" width={20} height={20} />
        <span>Or sign-in with google</span>
      </Button>

      <div className="mb-10 flex items-center gap-4 text-sm text-[#C4C4C4]">
        <span className="h-px flex-1 bg-border" />
        <span>Or</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-[#2D3748]" htmlFor="email">
            Email
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-[#2D3748]" htmlFor="password">
            Password
          </label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-sm">
          <label className="inline-flex items-center gap-2 text-[#2D3748]">
            <input className="size-4 accent-primary" type="checkbox" defaultChecked />
            Remember me
          </label>
          <span className="text-[#2D3748]">Forgot password?</span>
        </div>

        {error ? (
          <div className="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        ) : null}

        <Button type="submit" className="mt-6 w-full" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Login now"}
        </Button>
      </form>
    </>
  );
}

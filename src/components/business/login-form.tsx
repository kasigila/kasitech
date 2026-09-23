"use client";

import { useActionState } from "react";
import { loginBusiness, type LoginState } from "@/lib/business-portal/actions";

const empty: LoginState = {};

export function BusinessLoginForm() {
  const [state, action, pending] = useActionState(loginBusiness, empty);
  return (
    <form action={action} className="mt-8 space-y-4">
      {state.error ? (
        <p role="alert" className="text-sm text-red-300">
          {state.error}
        </p>
      ) : null}
      <label className="block text-sm">
        Username
        <input
          name="email"
          type="email"
          autoComplete="username"
          required
          className="mt-1 h-12 w-full border border-kasi-border bg-black px-3"
        />
      </label>
      <label className="block text-sm">
        Password
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="mt-1 h-12 w-full border border-kasi-border bg-black px-3"
        />
      </label>
      <button disabled={pending} className="h-12 w-full bg-kasi-ivory text-sm text-kasi-black disabled:opacity-60">
        {pending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}

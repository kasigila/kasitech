"use client";

import { useSyncExternalStore } from "react";

function subscribe() {
  return () => {};
}

/** true after hydration on the client; false during SSR */
export function useIsClient() {
  return useSyncExternalStore(subscribe, () => true, () => false);
}

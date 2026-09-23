"use client";

import type { ComponentProps } from "react";

export function ConfirmButton({ message, children, ...props }: { message: string } & ComponentProps<"button">) {
  return (
    <button
      {...props}
      onClick={(event) => {
        if (!window.confirm(message)) event.preventDefault();
      }}
    >
      {children}
    </button>
  );
}

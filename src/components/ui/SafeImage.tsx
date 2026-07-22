"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";

type Props = Omit<ImageProps, "onError"> & {
  fallbackLabel?: string;
  fallbackClassName?: string;
};

/** Image with graceful fallback when a remote asset 404s. */
export function SafeImage({
  className,
  fallbackLabel,
  fallbackClassName,
  alt,
  ...props
}: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={cn(
          "flex h-full w-full items-end bg-gradient-to-br from-kasi-border via-[#151515] to-kasi-black p-4",
          fallbackClassName,
          className,
        )}
        role="img"
        aria-label={alt}
      >
        {fallbackLabel ? (
          <span className="font-mono text-[10px] tracking-[0.16em] text-kasi-grey">
            {fallbackLabel}
          </span>
        ) : null}
      </div>
    );
  }

  return (
    <Image
      {...props}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}

"use client";

import { useState } from "react";

export function PhotoField({
  name = "images",
  folder,
  initial,
  single,
  origin = "",
}: {
  name?: string;
  folder: "products" | "brands" | "collections" | "homepage";
  initial: { url: string; alt?: string }[];
  single?: boolean;
  origin?: string;
}) {
  const [images, setImages] = useState(initial);
  const [error, setError] = useState("");

  async function upload(file: File) {
    setError("");
    const body = new FormData();
    body.set("file", file);
    body.set("folder", folder);
    const response = await fetch("/api/business/upload", { method: "POST", body });
    const data = (await response.json()) as { url?: string; error?: string };
    if (!response.ok || !data.url) {
      const message = data.error || "";
      setError(
        message.toLowerCase().includes("not ready") || message.toLowerCase().includes("technical support")
          ? "New photos cannot be added yet. The pictures already on the shop stay as they are."
          : message || "The photo could not be saved. Try again.",
      );
      return;
    }
    setImages((current) => (single ? [{ url: data.url as string, alt: "" }] : [...current, { url: data.url as string, alt: "" }]));
  }

  const stored = single ? images[0]?.url || "" : JSON.stringify(images);

  return (
    <div className="space-y-3">
      <input type="hidden" name={single ? name : "images"} value={stored} />
      {error ? <p className="text-sm text-red-300">{error}</p> : null}
      <div className="flex flex-wrap gap-3">
        {images.map((image) => (
          <div key={image.url} className="relative h-24 w-20 bg-kasi-border">
            {/* Photos are already stored as web-sized files. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image.url.startsWith("http") ? image.url : `${origin}${image.url}`} alt="" className="h-full w-full object-cover" />
            <button
              type="button"
              className="absolute right-1 top-1 bg-black/70 px-1 text-xs"
              onClick={() => setImages((current) => current.filter((item) => item.url !== image.url))}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <label className="inline-flex h-11 cursor-pointer items-center border border-kasi-ivory px-4 text-sm">
        Add a photo
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="sr-only"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) void upload(file);
            event.target.value = "";
          }}
        />
      </label>
      <p className="text-sm text-kasi-grey">Choose a JPG or PNG, then press Save.</p>
    </div>
  );
}

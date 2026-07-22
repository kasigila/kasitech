"use client";

import { useEffect } from "react";

export function ConsoleEgg() {
  useEffect(() => {
    console.log(
      "%cKasiTech%c\nYou found the engine room.\nGood products reward curiosity.",
      "color:#C7FF00;font-weight:700;font-size:14px",
      "color:#929292;font-size:12px",
    );
  }, []);
  return null;
}

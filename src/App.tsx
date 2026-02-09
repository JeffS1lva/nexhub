"use client";

import { Hero } from "@/components/Hero";
import { Showcase } from "@/components/ShowCase";
import { Pricing } from "@/components/Pricing";

export function App() {
  document.documentElement.classList.remove("light", "dark");
  document.documentElement.classList.add("light");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Hero />
      <Showcase />
      <Pricing />
    </div>
  );
}

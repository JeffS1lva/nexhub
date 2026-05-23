"use client";

import { Hero } from "@/components/Hero";
import { Showcase } from "@/components/ShowCase";
import { Pricing } from "@/components/Pricing";
import { Footer } from "@/components/Footer"; // ← novo import
import { ScrollToTop } from "./ScrollToTop";

export function App() {
  document.documentElement.classList.remove("light", "dark");
  document.documentElement.classList.add("light");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Hero />

      <section id="serviços" >
        <Showcase />
      </section>

      <section id="preços" >
        <Pricing />
      </section>

      {/* Footer de contatos separado */}
      <section id="contato">
        <Footer />
      </section>

      <ScrollToTop/>
    </div>
  );
}
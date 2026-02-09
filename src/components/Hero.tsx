"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { NumberTicker } from "@/components/ui/number-ticker";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { TextAnimate } from "@/components/ui/text-animate";
import { ShimmerButton } from "@/components/ui/shimmer-button";

// Importe o DarkVeil (ajuste o caminho conforme sua estrutura de pastas)
import DarkVeil from "@/components/DarkVeil"; // ← ajuste o caminho

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-background scroll-smooth">
      {/* DarkVeil como fundo animado */}
      <div className="absolute inset-0 z-0">
        <DarkVeil
          hueShift={158}
          noiseIntensity={0.015}
          scanlineIntensity={0.03}
          speed={0.30}
          scanlineFrequency={480}
          warpAmount={0.004}
          resolutionScale={1}
        />
      </div>

      {/* Efeitos opcionais que combinam bem com DarkVeil (comente se não quiser) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/4 blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-primary/6 blur-3xl animate-pulse"
          style={{ animationDelay: "1.8s" }}
        />
      </div>

      {/* Navbar – z-20 para ficar acima do fundo */}
      <nav className="relative z-20 flex items-center justify-between px-6 py-5 md:px-12 lg:px-20">
        <BlurFade delay={0} direction="down">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-green-500 flex items-center justify-center"> {/* mudei bg-green-500 → bg-primary para consistência */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary-foreground"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-2xl font-bold tracking-tight text-foreground">
              NexHub
            </span>
          </div>
        </BlurFade>

        {/* Pill Nav – estilo React Bits Pill Nav */}
        <div className="hidden md:flex items-center gap-1.5 bg-card/60 backdrop-blur-md border border-border/60 rounded-full px-10 py-3.5 shadow-sm">
          {["Portfolio", "Planos", "Contato"].map((item, i) => {
            // Opcional: detectar active baseado na URL ou seção atual (exemplo simples com hash)
            const isActive = typeof window !== 'undefined' && window.location.hash ===
              (item === "Portfolio" ? "#showcase" : item === "Planos" ? "#pricing" : "#contact");

            return (
              <BlurFade key={item} delay={0.1 + i * 0.08} direction="down">
                <a
                  href={
                    item === "Portfolio"
                      ? "#showcase"
                      : item === "Planos"
                        ? "#pricing"
                        : "#contact"
                  }
                  className={`
              relative px-5 py-2 text-md font-medium rounded-full transition-all duration-300
              ${isActive
                      ? 'text-white bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-primary/5'
                    }
            `}
                >
                  {item}
                  {/* Indicador ativo sutil (pill glow) */}
                  {isActive && (
                    <span className="absolute inset-0 rounded-full bg-primary/10 animate-pulse pointer-events-none" />
                  )}
                </a>
              </BlurFade>
            );
          })}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <BlurFade delay={0.4} direction="down">
            <a
              href="#pricing"
              className="hidden md:inline-flex items-center gap-2 rounded-full bg-green-500 px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 hover:shadow-lg hover:shadow-primary/30"
            >
              Comece Agora
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>
          </BlurFade>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden p-2 text-muted-foreground"
          aria-label="Menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </nav>

      {/* Removi o grid pattern porque o DarkVeil já tem ruído e textura — fica mais limpo */}
      {/* Se quiser manter, descomente: */}
      {/* <div className="absolute inset-0 z-0 opacity-[0.02]" ... /> */}

      {/* Hero content – z-10 para ficar acima do fundo */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <BlurFade delay={0.2} inView>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 mb-8 backdrop-blur-sm">
              <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              <AnimatedShinyText className="text-xs font-medium text-white/85" shimmerWidth={80}>
                Sites entregues com qualidade e rapidez
              </AnimatedShinyText>
            </div>
          </BlurFade>

          {/* Title */}
          <BlurFade delay={0.35} inView>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance leading-[1.1]">
              <TextAnimate animation="blurInUp" by="word" delay={0.1} duration={0.4} as="span" className="text-foreground">
                {"Sites que "}
              </TextAnimate>
              <TextAnimate animation="blurInUp" by="word" delay={0.4} duration={0.4} as="span" className="text-green-500">
                convertem
              </TextAnimate>
              <br />
              <TextAnimate animation="blurInUp" by="word" delay={0.6} duration={0.4} as="span" className="text-foreground">
                {"visitantes em clientes"}
              </TextAnimate>
            </h1>
          </BlurFade>

          <BlurFade delay={0.6} inView>
            <p className="mt-6 md:mt-8 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed text-balance">
              Criamos websites profissionais, modernos e otimizados para performance. Do conceito ao deploy, transformamos sua ideia em um produto digital de impacto.
            </p>
          </BlurFade>

          {/* CTAs */}
          <BlurFade delay={0.8} inView>
            <div className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <ShimmerButton
                className="w-full sm:w-auto h-12 px-8 text-sm font-semibold"
                shimmerColor="hsl(var(--primary-foreground))"
                background="hsl(var(--primary))"
              >
                <span className="flex items-center gap-2">
                  Ver Planos
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
              </ShimmerButton>
              <a
                href="#showcase"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card/80 backdrop-blur-sm px-8 py-3.5 text-sm font-semibold text-foreground transition-all hover:bg-secondary hover:border-muted-foreground/20"
              >
                Ver Portfolio
              </a>
            </div>
          </BlurFade>

          {/* Stats */}
          <BlurFade delay={1.0} inView>
            <div className="mt-16 md:mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto">
              {[
                { value: 200, suffix: "+", label: "Sites Entregues" },
                { value: 98, suffix: "%", label: "Satisfação" },
                { value: 4.9, label: "Avaliação", decimal: 1 },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-foreground">
                    <NumberTicker
                      value={stat.value}
                      decimalPlaces={stat.decimal || 0}
                      delay={1.2}
                    />
                    {stat.suffix && <span>{stat.suffix}</span>}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </BlurFade>
        </div>
      </div>

      {/* Scroll indicator */}
      <BlurFade delay={1.4} inView>
        <div className="relative z-10 flex justify-center pb-8">
          <div className="flex flex-col items-center gap-2 text-muted-foreground animate-bounce">
            <span className="text-xs">Scroll</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14" />
              <path d="m19 12-7 7-7-7" />
            </svg>
          </div>
        </div>
      </BlurFade>
    </section>
  );
}
"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { BlurFade } from "@/components/ui/blur-fade";
import { NumberTicker } from "@/components/ui/number-ticker";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { TextAnimate } from "@/components/ui/text-animate";
import { ShimmerButton } from "@/components/ui/shimmer-button";

import DarkVeil from "@/components/DarkVeil";
import LogoNexionHub from "@/components/assets/LogoNexionHub.png"

const PHONE_NUMBER = "5511914675286";

function getWhatsAppLink(message: string) {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${PHONE_NUMBER}?text=${encodedMessage}`;
}

// ============================================
// EFEITOS REUTILIZÁVEIS
// ============================================

function MagneticText({ children, className = "" }: { children: string; className?: string }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLSpanElement>(null);
  const rafRef = useRef<number | undefined>(undefined);
  const lastMoveRef = useRef(0);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const now = performance.now();
    if (now - lastMoveRef.current < 33) return;
    lastMoveRef.current = now;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const rect = ref.current!.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.2;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.2;
      setPosition({ x, y });
    });
  }, []);

  const handleMouseLeave = useCallback(() => setPosition({ x: 0, y: 0 }), []);

  return (
    <span
      ref={ref}
      className={`inline-block transition-transform duration-300 ease-out will-change-transform ${className}`}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </span>
  );
}

function ClipReveal({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const timeout = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  if (prefersReducedMotion) return <span className={className}>{text}</span>;

  return (
    <span className={`relative inline-block overflow-hidden ${className}`}>
      <span className={`inline-block transition-transform duration-700 ease-out ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
        {text}
      </span>
      <span
        className={`absolute inset-0 bg-emerald-500 transition-transform duration-500 ease-in-out origin-bottom ${isVisible ? 'scale-y-0' : 'scale-y-100'}`}
        style={{ transitionDelay: '200ms' }}
      />
    </span>
  );
}

function FloatingCard({ children, delay = 0, className = "", intensity = 20 }: { children: React.ReactNode; delay?: number; className?: string; intensity?: number }) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | undefined>(undefined);
  const lastMoveRef = useRef(0);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const now = performance.now();
    if (now - lastMoveRef.current < 33) return;
    lastMoveRef.current = now;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const rect = ref.current!.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setRotation({ x: y * intensity, y: -x * intensity });
    });
  }, [intensity]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  }, []);

  return (
    <div
      ref={ref}
      className={`relative transition-all duration-300 ease-out will-change-transform ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) ${isHovered ? 'scale(1.02)' : 'scale(1)'}`,
        transformStyle: 'preserve-3d',
        transitionDelay: `${delay}ms`,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}

function LightSweep({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative overflow-hidden group ${className}`}>
      {children}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none" />
    </div>
  );
}

function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={onClose} />
      <div className="absolute top-20 left-4 right-4 bg-[#0f0f0f] border border-white/10 rounded-2xl p-6 shadow-2xl">
        <div className="flex flex-col gap-4">
          {["Serviços", "Preços", "Contato"].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} onClick={onClose} className="text-lg font-medium text-white/80 hover:text-emerald-400 transition-colors py-2 border-b border-white/5 last:border-0">
              {item}
            </a>
          ))}
          <a href="#pricing" onClick={onClose} className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-black">
            Começar Agora
          </a>
        </div>
      </div>
    </div>
  );
}

function ModernScrollIndicator() {
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY < 100);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;
  return (
    <div className="hidden sm:block absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
      <BlurFade delay={1.5} inView duration={0.8}>
        <button onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })} className="group flex flex-col items-center gap-3 cursor-pointer">
          <div className="relative w-8 h-14 rounded-full border-2 border-emerald-500/30 group-hover:border-emerald-400/60 transition-colors bg-emerald-500/5">
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-3 bg-emerald-400 rounded-full animate-bounce shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
            <div className="absolute inset-0 rounded-full border border-emerald-400/20 animate-ping" />
          </div>
          <span className="text-[10px] font-mono text-emerald-500/60 uppercase tracking-[0.2em] group-hover:text-emerald-400 transition-colors">Sincronizar</span>
        </button>
      </BlurFade>
    </div>
  );
}

// ============================================
// VISUAL ÚNICO: GRID DE SERVIÇOS INTERATIVO
// ============================================

function ServiceShowcase() {
  const services = [
    {
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      ),
      title: "SaaS Completo",
      desc: "Plataforma pronta com painel admin, usuários e pagamentos",
      color: "#10b981",
      gradient: "from-emerald-500/20 to-teal-500/5",
      border: "border-emerald-500/20",
      hoverBorder: "hover:border-emerald-400/50",
    },
    {
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
      title: "Landing Pages",
      desc: "Páginas de alta conversão com copy otimizada e formulários",
      color: "#3b82f6",
      gradient: "from-blue-500/20 to-cyan-500/5",
      border: "border-blue-500/20",
      hoverBorder: "hover:border-blue-400/50",
    },
    {
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      ),
      title: "Sistemas Web",
      desc: "Dashboards, ERPs e ferramentas internas sob medida",
      color: "#8b5cf6",
      gradient: "from-violet-500/20 to-purple-500/5",
      border: "border-violet-500/20",
      hoverBorder: "hover:border-violet-400/50",
    },

    {
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      title: "Entrega Rápida",
      desc: "De 7 a 21 dias para ter seu produto no ar funcionando",
      color: "#06b6d4",
      gradient: "from-cyan-500/20 to-sky-500/5",
      border: "border-cyan-500/20",
      hoverBorder: "hover:border-cyan-400/50",
    },
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="w-full max-w-lg mx-auto relative">
      {/* Glow de fundo */}
      <div className="absolute -inset-4 bg-emerald-500/5 rounded-3xl blur-2xl pointer-events-none" />

      {/* Header do showcase */}
      <BlurFade delay={0.4} inView duration={0.8}>
        <div className="text-center mb-8 relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="text-xs font-medium text-emerald-400 uppercase tracking-wider">
              O Que Entregamos
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white/90 leading-tight">
            Sua ideia,<br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-cyan-400">
              nossa execução
            </span>
          </h3>
        </div>
      </BlurFade>

      {/* Grid de cards */}
      <BlurFade delay={0.6} inView duration={0.8}>
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`
                group relative p-4 sm:p-5 rounded-2xl cursor-pointer
                bg-linear-to-br ${service.gradient}
                border ${service.border} ${service.hoverBorder}
                transition-all duration-500 ease-out
                hover:scale-[1.03] active:scale-[0.97]
                ${activeIndex === i ? 'scale-[1.03] ring-1 ring-white/20' : ''}
              `}
              style={{
                transitionDelay: `${i * 50}ms`,
                boxShadow: activeIndex === i ? `0 0 40px ${service.color}20` : 'none'
              }}
              onMouseEnter={() => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(null)}
              onClick={() => setActiveIndex(activeIndex === i ? null : i)}
            >
              {/* Ícone com glow */}
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 transition-all duration-500 group-hover:scale-110"
                style={{
                  backgroundColor: `${service.color}15`,
                  color: service.color,
                  boxShadow: `0 0 20px ${service.color}15`
                }}
              >
                {service.icon}
              </div>

              {/* Título */}
              <h4 className="text-sm sm:text-base font-semibold text-white/90 mb-1 group-hover:text-white transition-colors">
                {service.title}
              </h4>

              {/* Descrição - aparece no hover/active */}
              <p
                className={`
                  text-[11px] sm:text-xs text-white/40 leading-relaxed
                  transition-all duration-500 overflow-hidden
                  ${activeIndex === i ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0 sm:max-h-20 sm:opacity-100'}
                `}
              >
                {service.desc}
              </p>

              {/* Indicador de ativo */}
              <div
                className={`
                  absolute top-3 right-3 w-1.5 h-1.5 rounded-full transition-all duration-300
                  ${activeIndex === i ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}
                `}
                style={{ backgroundColor: service.color, boxShadow: `0 0 10px ${service.color}` }}
              />

              {/* Borda brilhante no hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, ${service.color}08 0%, transparent 50%, ${service.color}04 100%)`,
                }}
              />
            </div>
          ))}
        </div>
      </BlurFade>

      {/* Barra de progresso visual */}
      <BlurFade delay={0.8} inView duration={0.8}>
        <div className="mt-8 flex items-center gap-3 px-1">
          <div className="flex-1 h-1 rounded-full bg-white/5 overflow-hidden">
            <div
              className="h-full rounded-full bg-linear-to-r from-emerald-500 via-cyan-500 to-blue-500 transition-all duration-700 ease-out"
              style={{
                width: activeIndex !== null ? `${((activeIndex + 1) / services.length) * 100}%` : '0%',
                opacity: activeIndex !== null ? 1 : 0.3
              }}
            />
          </div>
          <span className="text-[10px] font-mono text-white/30 uppercase tracking-wider">
            {activeIndex !== null ? `${String(activeIndex + 1).padStart(2, '0')}/${String(services.length).padStart(2, '0')}` : '00/06'}
          </span>
        </div>
      </BlurFade>

      {/* CTA secundário */}
      <BlurFade delay={1.0} inView duration={0.8}>
        <div className="mt-6 text-center">
          <p className="text-xs text-white/30 mb-3">
            Não encontrou o que precisa? A gente adapta.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 transition-colors group"
          >
            <span>Fale com a gente</span>
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
        </div>
      </BlurFade>
    </div>
  );
}

// ============================================
// HERO PRINCIPAL
// ============================================

export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const mouseThrottleRef = useRef(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - mouseThrottleRef.current < 50) return;
      mouseThrottleRef.current = now;
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setIsScrolled(currentScrollY > 50);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const stats = [
    { value: 200, suffix: "+", label: "Negócios", sublabel: "Digitalizados" },
    { value: 0, suffix: "", label: "Dor de Cabeça", sublabel: "Com Técnico" },
    { value: 4.9, suffix: "", label: "Satisfação", sublabel: "Dos Clientes" },
  ];

  return (
    <section ref={heroRef} className="relative min-h-dvh overflow-hidden bg-[#0a0a0a] selection:bg-emerald-500/30 selection:text-emerald-400">
      {/* Background Layer - DarkVeil */}
      <div
        className="absolute inset-0 z-0 transition-transform duration-1000 ease-out will-change-transform"
        style={{
          transform: prefersReducedMotion ? 'none' : `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px) scale(1.1)`,
        }}
      >
        <DarkVeil
          hueShift={158}
          noiseIntensity={0.02}
          scanlineIntensity={0.04}
          speed={0.25}
          scanlineFrequency={400}
          warpAmount={0.005}
          resolutionScale={1}
        />
      </div>

      {/* Grid sutil */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] will-change-transform"
        style={{
          backgroundImage: `
            linear-gradient(to right, #10b981 1px, transparent 1px),
            linear-gradient(to bottom, #10b981 1px, transparent 1px)
          `,
          backgroundSize: 'clamp(40px, 8vw, 60px) clamp(40px, 8vw, 60px)',
          transform: prefersReducedMotion ? 'none' : `perspective(500px) rotateX(60deg) translateY(${scrollY * 0.3}px)`,
          transformOrigin: 'center top',
        }}
      />

      {/* Orbes de luz */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[30vw] h-[30vw] min-w-37.5 min-h-37.5 max-w-100 max-h-100 rounded-full bg-emerald-500/20 blur-3xl animate-pulse"
          style={{
            top: '5%',
            left: '5%',
            transform: prefersReducedMotion ? 'none' : `translate(${mousePosition.x * 1.5}px, ${mousePosition.y * 1.5}px)`,
            animationDuration: '4s',
          }}
        />
        <div
          className="absolute w-[25vw] h-[25vw] min-w-30 min-h-30 max-w-87.5 max-h-87.5 rounded-full bg-teal-500/15 blur-3xl animate-pulse"
          style={{
            bottom: '15%',
            right: '10%',
            transform: prefersReducedMotion ? 'none' : `translate(${-mousePosition.x * 1.2}px, ${-mousePosition.y * 1.2}px)`,
            animationDuration: '6s',
            animationDelay: '1s',
          }}
        />
      </div>

      {/* ============================================
          NAVBAR
          ============================================ */}
      <nav className="absolute top-0 left-0 right-0 z-50 px-4 pt-4 sm:pt-6 transition-all duration-700">
        <BlurFade delay={0} direction="down" duration={0.8}>
          <div className="mx-auto max-w-6xl">
            <div
              className={`relative flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 rounded-2xl transition-all duration-500 ease-out ${isScrolled ? 'mt-2' : 'mt-0'}`}
              style={{
                background: 'rgba(10, 10, 10, 0.85)',
                backdropFilter: 'blur(12px) saturate(150%)',
                WebkitBackdropFilter: 'blur(12px) saturate(150%)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                boxShadow: `0 20px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(16, 185, 129, 0.1), 0 0 30px -5px rgba(16, 185, 129, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.05)`,
              }}
            >
              <div
                className="absolute -inset-px rounded-2xl opacity-50 pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(16,185,129,0.4), transparent)',
                  mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  maskComposite: 'xor',
                  WebkitMaskComposite: 'xor',
                  padding: '1px',
                }}
              />
              <div
                className="absolute top-0 left-8 right-8 h-px pointer-events-none"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(16,185,129,0.6), transparent)' }}
              />

              {/* Logo */}
              <div className="flex items-center gap-2 sm:gap-3 group cursor-pointer relative z-10">
                <div
                  className="relative h-8 w-8 sm:h-10 sm:w-10 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                  style={{

                    boxShadow: '0 0 20px rgba(16,185,129,0.5), inset 0 1px 0 rgba(255,255,255,0.3)',
                  }}
                >
                  <img
                    src={LogoNexionHub}
                    alt="NexHub Logo"
                    className="h-full w-full object-contain"
                  />
                  <div className="absolute inset-0 rounded-xl bg-emerald-400/50 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <span className="flex flex-col">
                  <span className="text-lg sm:text-xl font-bold tracking-tight text-white relative">
                    {/* Glow layers para efeito neon */}
                    <span className="absolute inset-0 text-emerald-400 blur-[8px] opacity-60 animate-pulse" aria-hidden="true">
                      NexHub
                    </span>
                    <span className="absolute inset-0 text-emerald-300 blur-[2px] opacity-80" aria-hidden="true">
                      NexHub
                    </span>
                    <span className="relative z-10 drop-shadow-[0_0_12px_rgba(16,185,129,0.4)]">
                      Nex<span className="text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.6)]">Hub</span>
                    </span>
                  </span>

                  {/* Tagline estilo circuit board */}
                  <span className="flex items-center gap-1.5 mt-0.5">
                    <span className="h-px w-3 bg-emerald-500/40" />
                    <span className="text-[10px] font-mono text-emerald-500/60 uppercase tracking-[0.25em]">
                      Technology
                    </span>
                    <span className="relative flex h-1 w-1">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-40" />
                      <span className="relative inline-flex rounded-full h-1 w-1 bg-emerald-500" />
                    </span>
                  </span>
                </span>

              </div>

              {/* Links desktop */}
              <div className="hidden md:flex items-center gap-2 relative z-10">
                {[
                  { label: "Serviços", id: "serviços", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
                  { label: "Preços", id: "preços", icon: "M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" },
                  { label: "Contato", id: "contato", icon: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" },
                ].map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="relative px-5 py-2.5 text-sm font-medium transition-all duration-500 group rounded-xl overflow-hidden"
                  >
                    {/* Base dark layer - fundo preto sólido no hover */}
                    <span className="absolute inset-0 rounded-xl bg-[#0a0a0a] border border-emerald-500/0 group-hover:border-emerald-500/30 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100" />

                    {/* Inner glow */}
                    <span className="absolute inset-0 rounded-xl bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

                    {/* Top scan line */}
                    <span className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-emerald-400 group-hover:w-1/2 transition-all duration-500 shadow-[0_0_12px_rgba(16,185,129,0.8)] rounded-full" />

                    {/* Bottom scan line */}
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-emerald-500/40 group-hover:w-1/3 transition-all duration-700 delay-100" />

                    {/* Corner accents - visíveis sutilmente no estado normal */}
                    <span className="absolute top-1.5 left-1.5 w-1 h-1 border-t border-l border-white/10 group-hover:border-emerald-500/60 transition-all duration-300 rounded-tl-sm" />
                    <span className="absolute top-1.5 right-1.5 w-1 h-1 border-t border-r border-white/10 group-hover:border-emerald-500/60 transition-all duration-300 delay-75 rounded-tr-sm" />
                    <span className="absolute bottom-1.5 left-1.5 w-1 h-1 border-b border-l border-white/10 group-hover:border-emerald-500/60 transition-all duration-300 delay-150 rounded-bl-sm" />
                    <span className="absolute bottom-1.5 right-1.5 w-1 h-1 border-b border-r border-white/10 group-hover:border-emerald-500/60 transition-all duration-300 delay-225 rounded-br-sm" />

                    {/* Content */}
                    <span className="relative z-10 flex items-center gap-2">
                      {/* Icon - sempre visível, brilha no hover */}
                      <svg
                        className="w-3.5 h-3.5 text-white/30 group-hover:text-emerald-400 transition-all duration-300"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d={item.icon} />
                      </svg>

                      {/* Label com brilho sutil no estado normal */}
                      <span className="text-white/70 group-hover:text-emerald-300 transition-all duration-300 group-hover:drop-shadow-[0_0_6px_rgba(52,211,153,0.5)] tracking-wide">
                        {item.label}
                      </span>
                    </span>

                    {/* Active indicator dot - visível sutilmente no estado normal */}
                    <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white/20 group-hover:bg-emerald-400 transition-all duration-300 group-hover:shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                  </a>
                ))}
              </div>

              {/* Botão mobile */}
              <div className="flex items-center gap-2 md:hidden relative z-10">
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="p-2 text-white/80 hover:text-emerald-400 transition-colors rounded-lg hover:bg-white/5"
                  aria-label="Abrir menu"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </svg>
                </button>
              </div>

              {/* CTA Button */}
              <div className="hidden md:block relative z-10">
                <LightSweep className="rounded-xl">
                  <a
                    href="#pricing"
                    className="relative inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-black transition-all duration-300 rounded-xl overflow-hidden group"
                    style={{
                      background: 'linear-gradient(135deg, #34d399 0%, #10b981 100%)',
                      boxShadow: '0 4px 20px rgba(16,185,129,0.4), inset 0 1px 0 rgba(255,255,255,0.4), 0 0 0 1px rgba(16,185,129,0.5',
                    }}
                  >
                    <span className="absolute inset-0 rounded-xl bg-linear-to-b from-white/40 to-transparent opacity-100" />
                    <span className="absolute inset-0 rounded-xl bg-emerald-400/0 group-hover:bg-emerald-400/30 transition-colors duration-300" />
                    <span className="relative z-10 flex items-center gap-2 font-bold">
                      Começar Agora
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform duration-300 group-hover:translate-x-1">
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </span>
                  </a>
                </LightSweep>
              </div>
            </div>
          </div>
        </BlurFade>
      </nav>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      {/* ============================================
          CONTEÚDO PRINCIPAL
          ============================================ */}
      <div className="relative z-10 min-h-dvh flex items-center pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-12 md:pb-16 px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center ">

          {/* Coluna Esquerda - Texto */}
          <div className="space-y-5 sm:space-y-6 lg:space-y-8 order-2 lg:order-1 ">
            <BlurFade delay={0.2} inView duration={0.8}>
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-sm hover:border-emerald-500/40 transition-colors cursor-default">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-300"></span>
                </span>
                <AnimatedShinyText className="text-[10px] sm:text-xs font-medium text-slate-300 uppercase tracking-wider" shimmerWidth={60}>
                  Tecnologia Sem Complicação
                </AnimatedShinyText>
              </div>
            </BlurFade>

            <div className="space-y-2 sm:space-y-3">
              <BlurFade delay={0.3} inView duration={0.8}>
                <h1 className="font-bold leading-[1.1] tracking-tight">
                  <span className="block text-white/90 text-[clamp(1.75rem,6vw,4.5rem)]">
                    <TextAnimate animation="blurInUp" by="word" delay={0.1} duration={0.4} as="span">
                      Sua Plataforma
                    </TextAnimate>
                  </span>
                  <span className="block mt-1 sm:mt-2 text-[clamp(1.75rem,6vw,4.5rem)]">
                    <MagneticText className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 via-emerald-500 to-emerald-600">
                      Pronta pra Uso
                    </MagneticText>
                  </span>
                  <span className="block mt-1 sm:mt-2 text-white/90 text-[clamp(1.75rem,6vw,4.5rem)]">
                    <ClipReveal text="Em Poucos Dias" delay={600} />
                  </span>
                </h1>
              </BlurFade>
            </div>

            <BlurFade delay={0.6} inView duration={0.8}>
              <p className="text-[clamp(0.875rem,2vw,1.25rem)] text-white/50 max-w-lg leading-relaxed font-light">
                Você não precisa entender de tecnologia. <span className="text-emerald-400 font-medium">A gente cuida de tudo</span> — desde a construção até a manutenção.
              </p>
            </BlurFade>

            <BlurFade delay={1.0} inView duration={0.8}>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <FloatingCard intensity={15} className="w-full sm:w-auto">
                  <a
                    href={getWhatsAppLink("Olá! Vi o site da NexHub e quero solicitar uma proposta para minha plataforma. Poderia me orientar sobre as melhores soluções ? Agradeço desde já pela atenção.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full sm:w-auto"
                  >
                    <ShimmerButton
                      className="w-full sm:w-auto h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base font-semibold rounded-xl active:scale-95 transition-transform"
                      shimmerColor="#ffffff"
                      background="hsl(160 84% 39%)"
                      shimmerSize="0.2em"
                    >
                      <span className="flex items-center justify-center gap-2 text-black">
                        <span className="hidden sm:inline">Quero Minha Plataforma</span>
                        <span className="sm:hidden">Quero Agora</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M5 12h14" />
                          <path d="m12 5 7 7-7 7" />
                        </svg>
                      </span>
                    </ShimmerButton>
                  </a>
                </FloatingCard>

                <FloatingCard intensity={15} delay={100} className="w-full sm:w-auto">
                  <a
                    href="#showcase"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 sm:h-14 px-6 sm:px-8 rounded-xl border border-white/10 bg-white/5 text-white font-semibold transition-all duration-300 hover:bg-white/10 hover:border-white/20 active:scale-95 backdrop-blur-sm group text-sm sm:text-base"
                  >
                    <span>Ver Exemplos</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform">
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </a>
                </FloatingCard>
              </div>
            </BlurFade>

            <BlurFade delay={1.2} inView duration={0.8}>
              <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-6 sm:pt-4">
                {stats.map((stat, i) => (
                  <FloatingCard key={stat.label} delay={i * 100} intensity={10}>
                    <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-black/40 border border-emerald-400/20 backdrop-blur-sm hover:bg-cyan-500/5 hover:border-emerald-400/40 active:scale-95 transition-all duration-500 group cursor-pointer touch-manipulation relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-8 h-8 bg-linear-to-bl from-emerald-400/20 to-transparent rounded-bl-full" />
                      <div className="text-[clamp(1.25rem,4vw,2rem)] font-bold text-white mb-0.5 sm:mb-1 group-hover:text-emerald-400 transition-colors">
                        <NumberTicker value={stat.value} decimalPlaces={stat.value % 1 !== 0 ? 1 : 0} delay={1.3 + i * 0.2} />
                        <span className="text-emerald-400 text-sm sm:text-lg">{stat.suffix}</span>
                      </div>
                      <div className="text-[10px] sm:text-xs text-white/40 uppercase tracking-wider leading-tight">{stat.label}</div>
                      <div className="text-[8px] sm:text-[10px] text-white/30 leading-tight">{stat.sublabel}</div>
                    </div>
                  </FloatingCard>
                ))}
              </div>
            </BlurFade>
          </div>

          {/* ============================================
              COLUNA DIREITA - SHOWCASE DE SERVIÇOS
              ============================================ */}
          <div className="order-2 lg:order-2 relative mt-2 sm:mt-0">
            <ServiceShowcase />
          </div>
        </div>
      </div >

      <ModernScrollIndicator />
      <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_30%_30%,transparent_0%,rgba(0,0,0,0.4)_80%)]" />
    </section >
  );
}
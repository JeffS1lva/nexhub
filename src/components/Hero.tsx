"use client";

import { 
  useEffect, 
  useState, 
  useRef, 
  useCallback, 
  useMemo,
  lazy, 
  Suspense,
  memo 
} from "react";
import { BlurFade } from "@/components/ui/blur-fade";
import { NumberTicker } from "@/components/ui/number-ticker";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { TextAnimate } from "@/components/ui/text-animate";
import { ShimmerButton } from "@/components/ui/shimmer-button";

// Lazy load do componente pesado
const DarkVeil = lazy(() => import("@/components/DarkVeil"));

// ============================================
// UTILITÁRIOS DE PERFORMANCE
// ============================================

// Hook para detectar visibilidade na viewport
function useInView<T extends HTMLElement = HTMLDivElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, { threshold: 0.1, ...options });

    observer.observe(element);
    return () => observer.disconnect();
  }, [options?.threshold, options?.rootMargin]);

  return { ref, isInView };
}

// Hook para detectar dispositivo de baixo desempenho
function useDeviceCapabilities() {
  const [isLowEnd, setIsLowEnd] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Detecta preferência de redução de movimento
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    // Detecta hardware limitado
    const memory = (navigator as any).deviceMemory;
    const cores = navigator.hardwareConcurrency;
    setIsLowEnd((memory && memory < 4) || (cores && cores <= 4));

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return { isLowEnd, prefersReducedMotion };
}

// Throttle para RAF
function useThrottledCallback<T extends (...args: any[]) => void>(
  callback: T,
  deps: React.DependencyList
) {
  const rafRef = useRef<number | undefined>(undefined);
  
  return useCallback((...args: Parameters<T>) => {
    if (rafRef.current) return;
    
    rafRef.current = requestAnimationFrame(() => {
      callback(...args);
      rafRef.current = undefined;
    });
  }, deps);
}

// ============================================
// CONSTANTES ESTÁTICAS (sem hooks)
// ============================================

const PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  top: 20 + ((i * 137) % 60),
  left: 20 + ((i * 89) % 60),
  duration: 2 + ((i * 3) % 4),
  delay: ((i * 7) % 5) * 0.5,
  size: 1 + (i % 3),
  opacity: 0.2 + ((i * 13) % 3) * 0.1,
}));

// Ícones como constantes (não componentes)
const TechIconSVG = {
  react: (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 sm:w-8 sm:h-8">
      <circle cx="12" cy="12" r="2" fill="#61DAFB" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1" fill="none" transform="rotate(0 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1" fill="none" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1" fill="none" transform="rotate(120 12 12)" />
    </svg>
  ),
  typescript: (
    <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
      <rect width="256" height="256" rx="24" fill="#3178C6" />
      <text x="50%" y="58%" textAnchor="middle" fontFamily="Segoe UI, Arial, sans-serif" fontSize="110" fontWeight="bold" fill="white">
        TS
      </text>
    </svg>
  ),
  vite: (
    <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="triangleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#41D1FF" />
          <stop offset="100%" stopColor="#BD34FE" />
        </linearGradient>
        <linearGradient id="boltGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD000" />
          <stop offset="100%" stopColor="#FF8C00" />
        </linearGradient>
      </defs>
      <polygon points="128,16 232,216 24,216" fill="url(#triangleGradient)" />
      <path d="M140 40 L70 150 H120 L100 220 L200 110 H150 L170 40 Z" fill="url(#boltGradient)" />
    </svg>
  ),
  nodejs: (
    <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
      <polygon points="128,16 224,72 224,184 128,240 32,184 32,72" fill="#339933" />
      <text x="50%" y="58%" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontSize="64" fontWeight="bold" fill="white">
        node
      </text>
    </svg>
  ),
  postgresql: (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 sm:w-8 sm:h-8">
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" fill="#336791" />
      <path d="M12 6c-2 0-3.5 1.5-3.5 3.5 0 2 1.5 3.5 3.5 3.5s3.5-1.5 3.5-3.5C15.5 7.5 14 6 12 6z" fill="white" />
      <path d="M12 14c-3 0-5.5 1.5-5.5 3.5V19h11v-1.5c0-2-2.5-3.5-5.5-3.5z" fill="white" />
    </svg>
  ),
  sqlite: (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 sm:w-8 sm:h-8">
      <rect x="4" y="2" width="16" height="20" rx="2" fill="#003B57" stroke="#003B57" strokeWidth="0.5" />
      <path d="M6 6h12M6 10h12M6 14h8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <text x="12" y="20" textAnchor="middle" fill="white" fontSize="3" fontWeight="bold">SQLite</text>
    </svg>
  ),
  tailwind: (
    <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="twGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#0EA5E9" />
        </linearGradient>
      </defs>
      <path d="M40 110 C70 80, 110 80, 140 110 C170 140, 200 140, 216 120 C190 160, 150 165, 120 135 C90 105, 60 105, 40 130 Z" fill="url(#twGradient)" />
      <path d="M40 150 C70 120, 110 120, 140 150 C170 180, 200 180, 216 160 C190 200, 150 205, 120 175 C90 145, 60 145, 40 170 Z" fill="url(#twGradient)" />
    </svg>
  ),
  nextjs: (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 sm:w-8 sm:h-8">
      <circle cx="12" cy="12" r="10" fill="black" stroke="white" strokeWidth="1" />
      <path d="M8 8v8M8 8l6 8M16 8v8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  prisma: (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 sm:w-8 sm:h-8">
      <path d="M12 2L2 19h20L12 2z" fill="#2D3748" stroke="white" strokeWidth="0.5" />
      <path d="M12 6l-5 9h10l-5-9z" fill="white" />
    </svg>
  ),
};

const ORBITALS_CONFIG = [
  {
    radius: 28,
    speed: 0.5,
    direction: 1,
    nodes: [
      { id: "react", icon: "react" as const, color: "#61DAFB", label: "React", offset: 0 },
      { id: "typescript", icon: "typescript" as const, color: "#3178C6", label: "TypeScript", offset: Math.PI },
    ]
  },
  {
    radius: 42,
    speed: 0.3,
    direction: -1,
    nodes: [
      { id: "vite", icon: "vite" as const, color: "#646CFF", label: "Vite", offset: 0 },
      { id: "nodejs", icon: "nodejs" as const, color: "#339933", label: "Node.js", offset: Math.PI / 2 },
      { id: "tailwind", icon: "tailwind" as const, color: "#06B6D4", label: "Tailwind", offset: Math.PI },
      { id: "nextjs", icon: "nextjs" as const, color: "#ffffff", label: "Next.js", offset: -Math.PI / 2 },
    ]
  },
  {
    radius: 56,
    speed: 0.2,
    direction: 1,
    nodes: [
      { id: "postgresql", icon: "postgresql" as const, color: "#336791", label: "PostgreSQL", offset: 0 },
      { id: "sqlite", icon: "sqlite" as const, color: "#003B57", label: "SQLite", offset: Math.PI },
      { id: "prisma", icon: "prisma" as const, color: "#2D3748", label: "Prisma", offset: Math.PI / 2 },
    ]
  }
];

// ============================================
// COMPONENTES OTIMIZADOS
// ============================================

const MagneticText = memo(function MagneticText({
  children,
  className = ""
}: {
  children: string;
  className?: string;
}) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isTouch, setIsTouch] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const { ref: inViewRef, isInView } = useInView<HTMLSpanElement>();

  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const setRefs = useCallback((node: HTMLSpanElement | null) => {
    (ref as any).current = node;
    (inViewRef as any).current = node;
  }, [inViewRef]);

  const handleMouseMove = useThrottledCallback((e: React.MouseEvent) => {
    if (!ref.current || isTouch || !isInView) return;

    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.2;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.2;
    setPosition({ x, y });
  }, [isTouch, isInView]);

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  return (
    <span
      ref={setRefs}
      className={`inline-block transition-transform duration-300 ease-out will-change-transform ${className}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </span>
  );
});

const ClipReveal = memo(function ClipReveal({
  text,
  delay = 0,
  className = ""
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const { prefersReducedMotion } = useDeviceCapabilities();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const timeout = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timeout);
  }, [delay, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={`relative inline-block overflow-hidden ${className}`}>
      <span
        className={`inline-block transition-transform duration-700 ease-out ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}
      >
        {text}
      </span>
      <span
        className={`absolute inset-0 bg-emerald-500 transition-transform duration-500 ease-in-out origin-bottom ${isVisible ? 'scale-y-0' : 'scale-y-100'}`}
        style={{ transitionDelay: '200ms' }}
      />
    </span>
  );
});

const FloatingCard = memo(function FloatingCard({
  children,
  delay = 0,
  className = "",
  intensity = 20,
  disabled = false
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  intensity?: number;
  disabled?: boolean;
}) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { ref: inViewRef, isInView } = useInView<HTMLDivElement>();

  const setRefs = useCallback((node: HTMLDivElement | null) => {
    (ref as any).current = node;
    (inViewRef as any).current = node;
  }, [inViewRef]);

  const handleMouseMove = useThrottledCallback((e: React.MouseEvent) => {
    if (!ref.current || disabled || !isInView) return;

    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotation({ x: y * intensity, y: -x * intensity });
  }, [intensity, disabled, isInView]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  }, []);

  return (
    <div
      ref={setRefs}
      className={`relative transition-all duration-300 ease-out will-change-transform ${className}`}
      style={{
        transform: disabled 
          ? 'none' 
          : `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) ${isHovered ? 'scale(1.02)' : 'scale(1)'}`,
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
});

const LightSweep = memo(function LightSweep({
  children,
  className = ""
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden group ${className}`}>
      {children}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none" />
    </div>
  );
});

const MobileMenu = memo(function MobileMenu({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={onClose} />
      <div className="absolute top-20 left-4 right-4 bg-[#0f0f0f] border border-white/10 rounded-2xl p-6 shadow-2xl">
        <div className="flex flex-col gap-4">
          {["Como Funciona", "Serviços", "Preços", "Contato"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              onClick={onClose}
              className="text-lg font-medium text-white/80 hover:text-emerald-400 transition-colors py-2 border-b border-white/5 last:border-0"
            >
              {item}
            </a>
          ))}
          <a
            href="#pricing"
            onClick={onClose}
            className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-black"
          >
            Começar Agora
          </a>
        </div>
      </div>
    </div>
  );
});

const ModernScrollIndicator = memo(function ModernScrollIndicator() {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    let rafId: number;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setIsVisible(window.scrollY < 100);
      });
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!isVisible) return null;
  
  return (
    <div className="hidden sm:block absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
      <BlurFade delay={1.5} inView duration={0.8}>
        <button
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          className="group flex flex-col items-center gap-3 cursor-pointer"
        >
          <div className="relative w-8 h-14 rounded-full border-2 border-emerald-500/30 group-hover:border-emerald-400/60 transition-colors bg-emerald-500/5">
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-3 bg-emerald-400 rounded-full animate-bounce shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
            <div className="absolute inset-0 rounded-full border border-emerald-400/20 animate-ping" />
          </div>
          <span className="text-[10px] font-mono text-emerald-500/60 uppercase tracking-[0.2em] group-hover:text-emerald-400 transition-colors">
            Sincronizar
          </span>
        </button>
      </BlurFade>
    </div>
  );
});

// Sistema de Órbitas 3D - ALTAMENTE OTIMIZADO
const OrbitalSystem = memo(function OrbitalSystem({ 
  isTouch, 
  isLowEnd,
  prefersReducedMotion 
}: { 
  isTouch: boolean; 
  isLowEnd: boolean;
  prefersReducedMotion: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const timeRef = useRef(0);
  const [, forceUpdate] = useState({});
  
  const { ref: inViewRef, isInView } = useInView<HTMLDivElement>({ threshold: 0.1 });
  
  const setRefs = useCallback((node: HTMLDivElement | null) => {
    (containerRef as any).current = node;
    (inViewRef as any).current = node;
  }, [inViewRef]);

  useEffect(() => {
    if (!isInView || isTouch || isLowEnd || prefersReducedMotion) return;
    
    let animationId: number;
    let frameCount = 0;
    
    const animate = () => {
      frameCount++;
      if (frameCount % 2 === 0) {
        timeRef.current += 0.01;
        forceUpdate({});
      }
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [isInView, isTouch, isLowEnd, prefersReducedMotion]);

  const handleMouseMove = useThrottledCallback((e: React.MouseEvent) => {
    if (!containerRef.current || isTouch || !isInView) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setMousePos({ x, y });
  }, [isTouch, isInView]);

  const handleMouseLeave = useCallback(() => {
    setMousePos({ x: 0, y: 0 });
  }, []);

  if (isLowEnd || prefersReducedMotion) {
    return (
      <div className="relative w-full aspect-square max-w-150 mx-auto">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-linear-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
        </div>
        {ORBITALS_CONFIG.flatMap((orbit, oi) => 
          orbit.nodes.map((node, ni) => {
            const angle = (ni / orbit.nodes.length) * Math.PI * 2;
            const x = Math.cos(angle) * orbit.radius;
            const y = Math.sin(angle) * orbit.radius;
            return (
              <div
                key={node.id}
                className="absolute top-1/2 left-1/2 w-12 h-12 sm:w-16 sm:h-16 rounded-xl backdrop-blur-md border border-white/10 flex items-center justify-center"
                style={{
                  transform: `translate(calc(-50% + ${x}%), calc(-50% + ${y}%))`,
                  backgroundColor: `${node.color}15`,
                }}
              >
                {TechIconSVG[node.icon]}
              </div>
            );
          })
        )}
      </div>
    );
  }

  const getNodePosition = (orbit: typeof ORBITALS_CONFIG[0], node: typeof orbit.nodes[0]) => {
    const angle = timeRef.current * orbit.speed * orbit.direction + node.offset;
    const x = Math.cos(angle) * orbit.radius;
    const y = Math.sin(angle) * orbit.radius;
    return { x, y, angle };
  };

  return (
    <div
      ref={setRefs}
      className="relative w-full aspect-square max-w-150 mx-auto perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{
          transform: `rotateY(${mousePos.x}deg) rotateX(${-mousePos.y}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Centro - Núcleo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
          <div className="relative w-20 h-20 sm:w-28 sm:h-28">
            <div className="absolute inset-0 rounded-full border border-emerald-500/30 animate-[spin_8s_linear_infinite]" />
            <div className="absolute inset-2 rounded-full border border-emerald-400/20 animate-[spin_12s_linear_infinite_reverse]" />
            <div className="absolute inset-4 rounded-full border border-emerald-300/10 animate-[spin_16s_linear_infinite]" />
            <div className="absolute inset-6 rounded-full bg-linear-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.6)] animate-pulse">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="sm:w-10 sm:h-10 drop-shadow-lg">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <div className="absolute inset-0 rounded-full bg-emerald-500/30 blur-2xl animate-pulse" />
          </div>
        </div>

        {/* Órbitas e Nós */}
        {ORBITALS_CONFIG.map((orbit, orbitIndex) => (
          <div key={orbitIndex} className="absolute inset-0 pointer-events-none">
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5"
              style={{
                width: `${orbit.radius * 2}%`,
                height: `${orbit.radius * 2}%`,
                boxShadow: `0 0 40px rgba(16, 185, 129, ${0.1 - orbitIndex * 0.02}), inset 0 0 40px rgba(16, 185, 129, ${0.05 - orbitIndex * 0.01})`,
              }}
            >
              <div
                className="absolute inset-0 rounded-full opacity-30"
                style={{
                  background: `conic-gradient(from ${timeRef.current * 20}deg, transparent 0deg, rgba(16,185,129,0.4) 90deg, transparent 180deg, transparent 270deg, rgba(16,185,129,0.4) 360deg)`,
                  mask: 'radial-gradient(transparent 65%, black 66%)',
                  WebkitMask: 'radial-gradient(transparent 65%, black 66%)',
                }}
              />
            </div>

            {orbit.nodes.map((node) => {
              const pos = getNodePosition(orbit, node);
              const isHovered = hoveredNode === node.id;
              const left = `calc(50% + ${pos.x}%)`;
              const top = `calc(50% + ${pos.y}%)`;

              return (
                <div
                  key={node.id}
                  className="absolute pointer-events-auto"
                  style={{
                    left,
                    top,
                    transform: 'translate(-50%, -50%)',
                    zIndex: isHovered ? 40 : 20,
                    transition: 'z-index 0s',
                  }}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  <div
                    className={`
                      relative w-12 h-12 sm:w-16 sm:h-16 rounded-xl backdrop-blur-md border transition-all duration-300 cursor-pointer
                      flex items-center justify-center
                      ${isHovered ? 'scale-125 border-white/50 shadow-[0_0_30px_rgba(16,185,129,0.8)]' : 'scale-100 border-white/10 hover:border-white/30'}
                    `}
                    style={{
                      backgroundColor: `${node.color}15`,
                      boxShadow: isHovered ? `0 0 30px ${node.color}80, inset 0 0 20px ${node.color}40` : `0 0 20px ${node.color}20`,
                      transform: isHovered ? 'scale(1.25) translateZ(20px)' : 'scale(1)',
                    }}
                  >
                    <div className="relative z-10 filter drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                      {TechIconSVG[node.icon]}
                    </div>
                    <div
                      className="absolute inset-0 rounded-xl animate-pulse"
                      style={{
                        background: `radial-gradient(circle at center, ${node.color}30 0%, transparent 70%)`,
                        opacity: isHovered ? 1 : 0.5,
                      }}
                    />
                    <div
                      className={`
                        absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 rounded-full 
                        bg-black/80 border border-white/20 text-xs font-bold transition-all duration-300
                        ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}
                      `}
                    >
                      <span style={{ color: node.color }}>{node.label}</span>
                    </div>
                    {isHovered && (
                      <svg
                        className="absolute top-1/2 left-1/2 w-50 h-50 pointer-events-none -z-10"
                        style={{ transform: 'translate(-50%, -50%)' }}
                      >
                        <line
                          x1="50%"
                          y1="50%"
                          x2={`${50 - pos.x * 2}%`}
                          y2={`${50 - pos.y * 2}%`}
                          stroke={node.color}
                          strokeWidth="1"
                          strokeDasharray="4 4"
                          className="animate-pulse opacity-50"
                        />
                      </svg>
                    )}
                  </div>
                  <div
                    className="absolute top-1/2 left-1/2 h-0.5 bg-linear-to-r from-transparent to-emerald-400/30 -z-10"
                    style={{
                      transform: `translate(-50%, -50%) rotate(${pos.angle + Math.PI}rad)`,
                      transformOrigin: 'center',
                      width: '30px',
                    }}
                  />
                </div>
              );
            })}
          </div>
        ))}

        {/* Partículas de fundo */}
        {PARTICLES.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full animate-pulse pointer-events-none"
            style={{
              top: `${particle.top}%`,
              left: `${particle.left}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
              opacity: particle.opacity,
              backgroundColor: '#10b981',
              boxShadow: `0 0 ${4 + particle.size}px #10b981`,
            }}
          />
        ))}
      </div>

      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-2/3 h-16 bg-emerald-500/20 blur-3xl rounded-full transform rotateX(60deg)" />
    </div>
  );
});

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  
  const { isLowEnd, prefersReducedMotion } = useDeviceCapabilities();

  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleMouseMove = useThrottledCallback((e: MouseEvent) => {
    if (isTouch || prefersReducedMotion) return;
    setMousePosition({
      x: (e.clientX / window.innerWidth - 0.5) * 20,
      y: (e.clientY / window.innerHeight - 0.5) * 20,
    });
  }, [isTouch, prefersReducedMotion]);

  useEffect(() => {
    let rafId: number;
    
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        setScrollY(currentScrollY);
        setIsScrolled(currentScrollY > 50);
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [handleMouseMove]);

  const stats = useMemo(() => [
    { value: 200, suffix: "+", label: "Negócios", sublabel: "Digitalizados" },
    { value: 0, suffix: "", label: "Dor de Cabeça", sublabel: "Com Técnico" },
    { value: 4.9, suffix: "", label: "Satisfação", sublabel: "Dos Clientes" },
  ], []);

  const darkVeilFallback = (
    <div className="absolute inset-0 bg-[#0a0a0a] animate-pulse" />
  );

  return (
    <section ref={heroRef} className="relative min-h-dvh overflow-hidden bg-[#0a0a0a] selection:bg-emerald-500/30 selection:text-emerald-400">
      {/* Background Layer */}
      <div
        className="absolute inset-0 z-0 transition-transform duration-1000 ease-out will-change-transform"
        style={{
          transform: prefersReducedMotion ? 'none' : `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px) scale(1.1)`,
        }}
      >
        <Suspense fallback={darkVeilFallback}>
          <DarkVeil
            hueShift={158}
            noiseIntensity={0.02}
            scanlineIntensity={0.04}
            speed={0.25}
            scanlineFrequency={400}
            warpAmount={0.005}
            resolutionScale={isLowEnd ? 0.5 : 1}
          />
        </Suspense>
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
          className={`absolute w-[30vw] h-[30vw] min-w-37.5 min-h-37.5 max-w-100 max-h-100 rounded-full bg-emerald-500/20 blur-3xl ${isLowEnd ? '' : 'animate-pulse'}`}
          style={{
            top: '5%',
            left: '5%',
            transform: prefersReducedMotion ? 'none' : `translate(${mousePosition.x * 1.5}px, ${mousePosition.y * 1.5}px)`,
            animationDuration: '4s',
          }}
        />
        {!isLowEnd && (
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
        )}
      </div>

      {/* NAVBAR */}
      <nav className="absolute top-0 left-0 right-0 z-50 px-4 pt-4 sm:pt-6 transition-all duration-700">
        <BlurFade delay={0} direction="down" duration={0.8}>
          <div className="mx-auto max-w-6xl">
            <div
              className={`
                relative flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 rounded-2xl
                transition-all duration-500 ease-out
                ${isScrolled ? 'mt-2' : 'mt-0'}
              `}
              style={{
                background: 'rgba(10, 10, 10, 0.85)',
                backdropFilter: 'blur(12px) saturate(150%)',
                WebkitBackdropFilter: 'blur(12px) saturate(150%)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                boxShadow: `
                  0 20px 50px -12px rgba(0, 0, 0, 0.8),
                  0 0 0 1px rgba(16, 185, 129, 0.1),
                  0 0 30px -5px rgba(16, 185, 129, 0.15),
                  inset 0 1px 0 rgba(255, 255, 255, 0.05)
                `,
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
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(16,185,129,0.6), transparent)',
                }}
              />

              {/* Logo */}
              <div className="flex items-center gap-2 sm:gap-3 group cursor-pointer relative z-10">
                <div
                  className="relative h-8 w-8 sm:h-10 sm:w-10 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                  style={{
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    boxShadow: '0 0 20px rgba(16,185,129,0.5), inset 0 1px 0 rgba(255,255,255,0.3)',
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-white sm:w-5 sm:h-5 drop-shadow-md">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                  <div className="absolute inset-0 rounded-xl bg-emerald-400/50 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <span className="text-lg sm:text-xl font-bold tracking-tight text-white drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                  NexHub
                </span>
              </div>

              {/* Links de navegação */}
              <div className="hidden md:flex items-center gap-1 relative z-10">
                {["Como Funciona", "Serviços", "Preços", "Contato"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                    className="relative px-4 py-2 text-sm font-medium transition-all duration-300 group"
                  >
                    <span
                      className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
                      style={{ background: 'rgba(16, 185, 129, 0.1)' }}
                    />
                    <span className="relative z-10 text-white/70 group-hover:text-emerald-400 transition-colors duration-300 drop-shadow-sm">
                      {item}
                    </span>
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.8)] group-hover:w-2/3 transition-all duration-300 rounded-full" />
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
                      boxShadow: '0 4px 20px rgba(16,185,129,0.4), inset 0 1px 0 rgba(255,255,255,0.4), 0 0 0 1px rgba(16,185,129,0.5)',
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

      {/* Conteúdo Principal */}
      <div className="relative z-10 min-h-dvh flex items-center pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-12 md:pb-16 px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">

          {/* Coluna Esquerda */}
          <div className="space-y-5 sm:space-y-6 lg:space-y-8 order-2 lg:order-1">
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
                <FloatingCard intensity={isTouch ? 0 : 15} className="w-full sm:w-auto" disabled={isTouch}>
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
                </FloatingCard>

                <FloatingCard intensity={isTouch ? 0 : 15} delay={100} className="w-full sm:w-auto" disabled={isTouch}>
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
                  <FloatingCard 
                    key={stat.label} 
                    delay={i * 100} 
                    intensity={isTouch ? 0 : 10} 
                    disabled={isTouch}
                  >
                    <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-black/40 border border-emerald-400/20 backdrop-blur-sm hover:bg-cyan-500/5 hover:border-emerald-400/40 active:scale-95 transition-all duration-500 group cursor-pointer touch-manipulation relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-8 h-8 bg-linear-to-bl from-emerald-400/20 to-transparent rounded-bl-full" />
                      <div className="text-[clamp(1.25rem,4vw,2rem)] font-bold text-white mb-0.5 sm:mb-1 group-hover:text-emerald-400 transition-colors">
                        <NumberTicker
                          value={stat.value}
                          decimalPlaces={stat.value % 1 !== 0 ? 1 : 0}
                          delay={1.3 + i * 0.2}
                        />
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

          {/* Coluna Direita - Sistema de Órbitas */}
          <div className="order-1 lg:order-2 relative mt-2 sm:mt-0">
            <BlurFade delay={0.4} inView duration={1}>
              <OrbitalSystem 
                isTouch={isTouch} 
                isLowEnd={isLowEnd}
                prefersReducedMotion={prefersReducedMotion}
              />
            </BlurFade>
          </div>
        </div>
      </div>

      <ModernScrollIndicator />
      <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_30%_30%,transparent_0%,rgba(0,0,0,0.4)_80%)]" />
    </section>
  );
}
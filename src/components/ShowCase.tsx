"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import GestaoLogistic from "./assets/GestaoLogistc.png"
import PortalNexion from "./assets/Nexxion.png"
import PlatCoffe from "./assets/CoffePlat.png"

const projects = [
  {
    title: "Nexion Hub Transport",
    category: "Sistema de Gestão Logística",
    client: "Nexion Logistics",
    description:
      "Plataforma de gestão logística com dashboards analíticos de pagamentos e entregas, cadastro de motoristas e veículos, fechamento automatizado de pagamentos e controle de acesso com níveis administrador, editor e visualizador.",
    image: GestaoLogistic,
    demoUrl: "https://nexion-hubtransportadora.vercel.app/",
    tags: [
      "Next.js",
      "TypeScript",
      "TailwindCSS",
      "Dashboard",
      "Logística",
      "SaaS",
    ],
    year: "2026",
    metrics: {
      conversion: "+320%",
      speed: "99/100",
    },
    accent: "#059669",
    duration: 7000,
  },
  {
    title: "Portal Nexion",
    category: "Portal Empresarial",
    client: "Nexion",
    description:
      "Portal integrado ao SAP para gestão de pedidos, boletos e rastreamento de entregas em tempo real, com dashboards analíticos, autenticação segura e automação de processos.",
    image: PortalNexion,
    demoUrl: "https://portal-nexion.vercel.app/login",
    tags: [
      "React",
      "TypeScript",
      "TailwindCSS",
      "SAP Integration",
      "Dashboard",
      "ERP",
    ],
    year: "2026",
    metrics: {
      conversion: "+280%",
      speed: "99/100",
      users: "5K+",
    },
    accent: "#3b82f6",
    duration: 7000,
  },
  {
    title: "CaféLux",
    category: "Cafeteria Premium",
    client: "Plat Coffe",
    description:
      "Plataforma moderna para cafeterias com catálogo digital, pedidos online, gestão de produtos e experiência visual premium focada em performance e conversão.",
    image: PlatCoffe,
    demoUrl: "https://plat-coffe.vercel.app/",
    tags: [
      "React",
      "TypeScript",
      "TailwindCSS",
      "UI/UX",
      "E-Commerce",
      "Vite",
    ],
    year: "2026",
    metrics: {
      conversion: "+420%",
      speed: "97/100",
      users: "25K+",
    },
    accent: "#f59e0b",
    duration: 6500,
  },
];

// Easing suave
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export function Showcase() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Refs para animação fluida sem re-renders
  const progressRef = useRef(0);
  const slideProgressRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef(0);

  const currentProject = projects[activeIndex];

  // Animação principal - 60fps pura
  useEffect(() => {
    const duration = currentProject.duration;

    const animate = (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;

      const delta = time - lastTimeRef.current;
      lastTimeRef.current = time;

      // Atualizar progresso
      progressRef.current += delta / duration;

      if (progressRef.current >= 1) {
        // Transição para próximo slide
        progressRef.current = 0;
        setActiveIndex((prev) => (prev + 1) % projects.length);
      }

      // Aplicar transformações diretamente via DOM - sem re-render!
      const easedProgress = easeOutCubic(progressRef.current);

      // Atualizar barra de progresso circular
      if (slideProgressRef.current) {
        const circle = slideProgressRef.current.querySelector('circle:last-child') as SVGCircleElement;
        if (circle) {
          circle.setAttribute('stroke-dasharray', `${easedProgress * 100}, 100`);
        }
      }

      // Atualizar slides
      slidesRef.current.forEach((slide, index) => {
        if (!slide) return;

        const diff = index - activeIndex;
        const normalizedDiff = ((diff % projects.length) + projects.length) % projects.length;
        const adjustedDiff = normalizedDiff > projects.length / 2 ? normalizedDiff - projects.length : normalizedDiff;

        const isActive = index === activeIndex;
        const isEntering = adjustedDiff === 0 && progressRef.current < 0.2;
        const isExiting = adjustedDiff === 0 && progressRef.current > 0.8;

        // Calcular posição
        let x = adjustedDiff * 100;
        let scale = 1 - Math.abs(adjustedDiff) * 0.15;
        let opacity = 1 - Math.abs(adjustedDiff) * 0.6;
        let blur = Math.abs(adjustedDiff) * 8;

        if (isActive) {
          if (isEntering) {
            const enterProgress = progressRef.current / 0.2;
            scale = 0.8 + easeOutCubic(enterProgress) * 0.2;
            opacity = easeOutCubic(enterProgress);
            x = 50 * (1 - easeOutCubic(enterProgress));
          } else if (isExiting) {
            const exitProgress = (progressRef.current - 0.8) / 0.2;
            scale = 1 - easeInOutCubic(exitProgress) * 0.2;
            opacity = 1 - easeInOutCubic(exitProgress) * 0.5;
            x = -30 * easeInOutCubic(exitProgress);
          }
        }

        // Aplicar transformações diretamente
        const clampedOpacity = Math.max(0.1, Math.min(1, opacity));
        const clampedScale = Math.max(0.6, scale);

        slide.style.transform = `translateX(${x}%) scale(${clampedScale})`;
        slide.style.opacity = String(clampedOpacity);
        slide.style.filter = `blur(${blur}px)`;
        slide.style.zIndex = String(10 - Math.abs(adjustedDiff));

        // Atualizar conteúdo interno se ativo
        if (isActive) {
          const content = slide.querySelector('.slide-content') as HTMLElement;
          const image = slide.querySelector('img') as HTMLImageElement;

          if (image) {
            const kenBurnsX = Math.sin(progressRef.current * Math.PI * 2) * 10;
            const kenBurnsY = Math.cos(progressRef.current * Math.PI * 2) * 10;
            const kenBurnsScale = 1 + progressRef.current * 0.05;
            image.style.transform = `scale(${kenBurnsScale}) translate(${kenBurnsX}px, ${kenBurnsY}px)`;
          }

          if (content) {
            const title = content.querySelector('.slide-title') as HTMLElement;
            const desc = content.querySelector('.slide-desc') as HTMLElement;
            const tags = content.querySelector('.slide-tags') as HTMLElement;
            const metrics = content.querySelectorAll('.slide-metric') as NodeListOf<HTMLElement>;
            const demoBtn = content.querySelector('.demo-button') as HTMLElement;

            if (title) {
              const titleProgress = progressRef.current < 0.15
                ? easeOutCubic(progressRef.current / 0.15)
                : 1;
              title.style.transform = `translateY(${(1 - titleProgress) * 100}%)`;
              title.style.opacity = String(titleProgress);
            }

            if (desc) {
              const descProgress = progressRef.current < 0.2
                ? easeOutCubic(progressRef.current / 0.2)
                : 1;
              desc.style.opacity = String(descProgress);
              desc.style.transform = `translateY(${(1 - descProgress) * 20}px)`;
            }

            if (tags) {
              const tagsOpacity = progressRef.current > 0.15 ? 1 : 0;
              tags.style.opacity = String(tagsOpacity);
              tags.style.transform = `translateY(${progressRef.current > 0.15 ? 0 : 10}px)`;
            }

            if (demoBtn) {
              const btnProgress = progressRef.current > 0.3 ? 1 : 0;
              demoBtn.style.opacity = String(btnProgress);
              demoBtn.style.transform = `translateY(${btnProgress ? 0 : 20}px)`;
            }

            metrics.forEach((metric, i) => {
              const metricProgress = progressRef.current > (0.25 + i * 0.05) ? 1 : 0;
              metric.style.opacity = String(metricProgress);
              metric.style.transform = `translateY(${metricProgress ? 0 : 20}px)`;
            });
          }
        }
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [activeIndex, currentProject.duration, projects.length]);

  // Navegação manual
  const goToSlide = useCallback((index: number) => {
    progressRef.current = 0;
    setActiveIndex(index);
  }, []);

  const nextSlide = useCallback(() => {
    progressRef.current = 0;
    setActiveIndex((prev) => (prev + 1) % projects.length);
  }, []);

  const prevSlide = useCallback(() => {
    progressRef.current = 0;
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  }, [projects.length]);

  const openDemo = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="showcase"
      className="relative h-screen w-full overflow-hidden bg-[#030303]"
    >
      {/* Background dinâmico */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 transition-colors duration-1000"
          style={{
            background: `
              radial-gradient(circle at 20% 50%, ${currentProject.accent}15 0%, transparent 50%),
              radial-gradient(circle at 80% 50%, ${currentProject.accent}05 0%, transparent 40%)
            `,
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #fff 1px, transparent 1px),
              linear-gradient(to bottom, #fff 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: currentProject.accent,
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              opacity: 0.2 + Math.random() * 0.3,
              animation: `float ${8 + Math.random() * 8}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Container dos slides */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: "2000px" }}>
        <div className="relative w-full h-full flex items-center justify-center">
          {projects.map((project, index) => {
            const isActive = index === activeIndex;

            return (
              <div
                key={project.title}
                ref={(el) => { slidesRef.current[index] = el; }}
                className="absolute w-[85vw] md:w-[70vw] lg:w-[60vw] aspect-16/10 will-change-transform"
                style={{
                  transform: "translateX(100%) scale(0.6)",
                  opacity: 0,
                }}
              >
                <div
                  className="relative w-full h-full rounded-3xl overflow-hidden"
                  style={{
                    background: "rgba(10, 10, 10, 0.9)",
                    boxShadow: isActive
                      ? `0 50px 100px -20px ${project.accent}30, 0 30px 60px -30px rgba(0,0,0,0.8)`
                      : "0 25px 50px -12px rgba(0,0,0,0.5)",
                    border: `1px solid ${isActive ? project.accent + "40" : "rgba(255,255,255,0.1)"}`,
                  }}
                >
                  {/* Imagem */}
                  <div className="absolute inset-0 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover will-change-transform"
                      style={{
                        transform: "scale(1.1)",
                        filter: isActive ? "brightness(1)" : "brightness(0.6)",
                      }}
                    />

                    <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-black/20" />

                    <div
                      className="absolute inset-0 mix-blend-overlay"
                      style={{
                        background: `radial-gradient(circle at 30% 50%, ${project.accent} 0%, transparent 60%)`,
                        opacity: isActive ? 0.3 : 0.1,
                      }}
                    />
                  </div>

                  {/* Conteúdo */}
                  <div className="slide-content absolute inset-0 p-8 md:p-12 lg:p-16 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-4">
                        <span
                          className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider"
                          style={{
                            background: `${project.accent}20`,
                            border: `1px solid ${project.accent}40`,
                            color: project.accent,
                            boxShadow: `0 0 20px ${project.accent}20`,
                          }}
                        >
                          {project.category}
                        </span>
                        <span className="text-white/40 text-sm font-mono">
                          {project.year}
                        </span>
                      </div>

                      <div className="text-right">
                        <div className="text-white/60 text-sm font-medium">{project.client}</div>
                      </div>
                    </div>

                    <div className="max-w-2xl">
                      <div className="overflow-hidden mb-4">
                        <h2
                          className="slide-title text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white will-change-transform"
                          style={{
                            textShadow: `0 0 80px ${project.accent}40`,
                            transform: "translateY(100%)",
                            opacity: 0,
                          }}
                        >
                          {project.title}
                        </h2>
                      </div>

                      <p
                        className="slide-desc text-lg md:text-xl text-white/70 leading-relaxed mb-6 will-change-transform"
                        style={{
                          opacity: 0,
                          transform: "translateY(20px)",
                        }}
                      >
                        {project.description}
                      </p>

                      <div
                        className="slide-tags flex flex-wrap gap-2 mb-8 will-change-transform"
                        style={{
                          opacity: 0,
                          transform: "translateY(10px)",
                        }}
                      >
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1.5 rounded-lg text-xs text-white/60 bg-white/5 border border-white/10 backdrop-blur-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Botão Demo */}
                      <button
                        onClick={() => openDemo(project.demoUrl)}
                        className="demo-button group relative px-8 py-4 rounded-xl font-semibold text-sm uppercase tracking-wider overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 will-change-transform"
                        style={{
                          opacity: 0,
                          transform: "translateY(20px)",
                          background: `linear-gradient(135deg, ${project.accent} 0%, ${project.accent}dd 100%)`,
                          boxShadow: `0 10px 40px -10px ${project.accent}50`,
                        }}
                      >
                        <span className="relative z-10 flex items-center gap-2 text-white">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          Ver Demo ao Vivo
                        </span>
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{
                            background: `linear-gradient(135deg, ${project.accent}dd 0%, ${project.accent} 100%)`,
                          }}
                        />
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                      </button>

                      <div className="flex gap-8 md:gap-12 mt-8">
                        {Object.entries(project.metrics).map(([key, value], _i) => (
                          <div
                            key={key}
                            className="slide-metric relative will-change-transform"
                            style={{
                              opacity: 0,
                              transform: "translateY(20px)",
                            }}
                          >
                            <div
                              className="text-2xl md:text-3xl font-bold mb-1"
                              style={{ color: project.accent }}
                            >
                              {value}
                            </div>
                            <div className="text-[10px] uppercase tracking-wider text-white/40">
                              {key === "conversion" ? "Conversão" : key === "speed" ? "Performance" : "Base de Usuários"}
                            </div>

                            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-white/10 rounded-full overflow-hidden">
                              <div
                                className="metric-bar h-full rounded-full will-change-transform"
                                style={{
                                  background: project.accent,
                                  width: "0%",
                                  transition: "width 0.3s ease-out",
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div
                      className="absolute bottom-8 right-8 text-[150px] md:text-[200px] font-bold leading-none select-none pointer-events-none"
                      style={{
                        color: "transparent",
                        WebkitTextStroke: `1px ${project.accent}20`,
                        opacity: 0.5,
                      }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>

                  {/* Borda luminosa */}
                  {isActive && (
                    <div
                      className="absolute inset-0 rounded-3xl pointer-events-none"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${project.accent}40, transparent)`,
                        backgroundSize: "200% 100%",
                        animation: "shimmer 3s infinite linear",
                        mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        maskComposite: "xor",
                        WebkitMaskComposite: "xor",
                        padding: "2px",
                      }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* UI Overlay */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 md:p-12 z-20">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-[10px] uppercase tracking-[0.4em] text-white/30 mb-2 font-mono">
              Portfólio de Software
            </div>
            <h1 className="text-2xl md:text-3xl font-light text-white/80 tracking-tight">
              Projetos <span className="font-semibold text-white">Desenvolvidos</span>
            </h1>
          </div>

          <div ref={slideProgressRef} className="relative w-16 h-16">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="2"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke={currentProject.accent}
                strokeWidth="2"
                strokeDasharray="0, 100"
                strokeLinecap="round"
                className="transition-none"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-mono text-white/60">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-end pointer-events-auto">
          <div className="flex items-center gap-4">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-all duration-300 hover:scale-110"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <div className="flex gap-2">
              {projects.map((project, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="group relative h-1 rounded-full overflow-hidden transition-all duration-300"
                  style={{
                    width: index === activeIndex ? 48 : 16,
                    background: "rgba(255,255,255,0.1)",
                  }}
                >
                  <div
                    className="absolute inset-0 rounded-full transition-all duration-300"
                    style={{
                      background: project.accent,
                      opacity: index === activeIndex ? 1 : 0,
                      transform: index === activeIndex ? "scaleX(1)" : "scaleX(0)",
                      transformOrigin: "left",
                    }}
                  />
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-32 h-20 rounded-lg overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                    <img src={project.image} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50" />
                    <div className="absolute bottom-2 left-2 text-[10px] text-white font-medium truncate max-w-[90%]">
                      {project.title}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-all duration-300 hover:scale-110"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="absolute right-8 top-1/2 -translate-y-1/2 h-64 w-px bg-white/10 hidden lg:block">
        <div
          className="w-full transition-all duration-300"
          style={{
            height: `${((activeIndex + progressRef.current) / projects.length) * 100}%`,
            background: `linear-gradient(to bottom, ${currentProject.accent}, transparent)`,
          }}
        />

        {projects.map((_, index) => (
          <div
            key={index}
            className="absolute w-2 h-2 rounded-full -left-0.5 transition-all duration-300"
            style={{
              top: `${(index / projects.length) * 100}%`,
              background: index === activeIndex ? currentProject.accent : "rgba(255,255,255,0.2)",
              transform: index === activeIndex ? "scale(1.5)" : "scale(1)",
              boxShadow: index === activeIndex ? `0 0 10px ${currentProject.accent}` : "none",
            }}
          />
        ))}
      </div>

      <style >{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </section>
  );
}
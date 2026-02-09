"use client";

import React from "react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { BlurFade } from "./ui/blur-fade";
import { Marquee } from "./ui/marquee";

const projects = [
  {
    title: "E-Commerce Premium",
    category: "Loja Virtual",
    description:
      "Plataforma completa de vendas online com checkout otimizado e painel administrativo.",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80",
    tags: ["React", "Next.js", "Stripe"],
    year: "2025",
  },
  {
    title: "SaaS Dashboard",
    category: "Aplicacao Web",
    description:
      "Dashboard analitico com visualizacao de dados em tempo real e gestao de equipes.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    tags: ["TypeScript", "Tailwind", "Charts"],
    year: "2025",
  },
  {
    title: "Restaurante Gourmet",
    category: "Site Institucional",
    description:
      "Website elegante com sistema de reservas online e cardapio digital interativo.",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80",
    tags: ["Design", "SEO", "Mobile"],
    year: "2024",
  },
  {
    title: "Agencia Criativa",
    category: "Portfolio",
    description:
      "Portfolio moderno com animacoes fluidas e showcase de projetos interativo.",
    image:
      "https://images.unsplash.com/photo-1519222970733-f546218fa6d7?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["Motion", "3D", "Creative"],
    year: "2024",
  },
  {
    title: "Imobiliaria Digital",
    category: "Plataforma",
    description:
      "Plataforma de imoveis com busca avancada, mapa interativo e tour virtual.",
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80",
    tags: ["Maps", "Filters", "API"],
    year: "2024",
  },
  {
    title: "Fitness & Wellness",
    category: "Landing Page",
    description:
      "Landing page de alta conversao com agendamento online e area de membros.",
    image:
      "https://images.unsplash.com/photo-1554284126-aa88f22d8b74?auto=format&fit=crop&w=1200&q=80",
    tags: ["Conversion", "CRM", "Auth"],
    year: "2024",
  },
];

// SVG icons for each technology
function ReactIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.31 0-.603.045-.871.133-3.053 1.007-2.986 7.58.184 12.645C3.24 18.178.627 21.19 1.645 22.514c.336.438.856.663 1.544.663 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.31 0 .603-.044.871-.133 3.053-1.007 2.986-7.58-.184-12.645C16.76 5.822 19.373 2.81 18.355 1.486a1.997 1.997 0 0 0-1.544-.662zM12 17.598c-3.1 0-5.598-2.508-5.598-5.598S8.9 6.402 12 6.402s5.598 2.508 5.598 5.598-2.498 5.598-5.598 5.598z" />
    </svg>
  );
}

function NextjsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.049-.106.005-4.703.007-4.705.073-.091a.637.637 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.86-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.572 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z" />
    </svg>
  );
}

function TypeScriptIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z" />
    </svg>
  );
}

function TailwindIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
    </svg>
  );
}

function NodejsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.604.065-.037.151-.023.218.017l2.256 1.339a.29.29 0 0 0 .272 0l8.795-5.076a.277.277 0 0 0 .134-.238V6.921a.28.28 0 0 0-.137-.242l-8.791-5.072a.278.278 0 0 0-.271 0L3.075 6.68a.28.28 0 0 0-.138.24v10.15a.27.27 0 0 0 .136.235l2.409 1.392c1.307.654 2.108-.116 2.108-.89V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.112.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551L2.28 18.675a1.857 1.857 0 0 1-.922-1.604V6.921c0-.659.353-1.275.922-1.603L11.075.242a1.929 1.929 0 0 1 1.848 0l8.794 5.076c.57.329.924.944.924 1.603v10.15a1.86 1.86 0 0 1-.924 1.604l-8.794 5.078a1.834 1.834 0 0 1-.925.247zm2.722-6.986c-3.942 0-4.766-1.813-4.766-3.332 0-.142.114-.253.255-.253h1.14c.127 0 .233.092.253.216.172 1.164.686 1.75 3.118 1.75 1.918 0 2.734-.434 2.734-1.453 0-.588-.232-1.024-3.213-1.317-2.49-.245-4.03-.796-4.03-2.791 0-1.837 1.55-2.932 4.148-2.932 2.917 0 4.36 1.012 4.543 3.182a.26.26 0 0 1-.066.193.254.254 0 0 1-.183.08h-1.145a.252.252 0 0 1-.247-.199c-.274-1.222-.942-1.614-2.902-1.614-2.137 0-2.386.745-2.386 1.302 0 .676.293.873 3.11 1.254 2.793.377 4.133.912 4.133 2.84 0 1.985-1.655 3.12-4.543 3.12z" />
    </svg>
  );
}

function PostgresIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M23.5594 14.7228a.5269.5269 0 0 0-.0563-.1191c-.139-.2632-.4768-.3418-1.0074-.2321-1.6533.3418-2.2773.1191-2.5765-.0805.7468-1.214 1.3708-2.5744 1.8735-4.0783.2441-.7317.4199-1.4531.5205-2.1434.1006-.6903.1328-1.3497.0938-1.957a5.0393 5.0393 0 0 0-.3281-1.6729C21.3027 2.8594 19.9961 1.5 18.1094 1.5c-.7578 0-1.4336.2188-2.0156.6523-.3281-.0898-.666-.168-1.0117-.2344-1.4805-.2812-3.0039-.1562-4.3125.3516-.5781-.3516-1.207-.6094-1.8789-.7734C7.9492 1.2891 6.8789 1.2891 5.9297 1.5703 4.6992 1.9375 3.75 2.7266 3.1641 3.8672c-.5859 1.1406-.7734 2.543-.5625 4.1797.2109 1.6367.7969 3.3867 1.7109 5.082.6523 1.207 1.3711 2.2109 2.1328 2.9883.5156.5273 1.043.918 1.5859 1.1758.0625.0312.125.0547.1914.0742a.7584.7584 0 0 0 .1953.0352c.3359.0352.9766-.168 1.4219-.5586.3789-.332.6445-.7656.8086-1.207a4.4948 4.4948 0 0 0 .9336.0898l.1289-.0078c.3125.3633.6836.6836 1.1055.9453.207.1289.4258.2344.6523.3203-.207.7422-.1758 1.4219.1289 1.9961.3516.6602.9844 1.0547 1.8242 1.1367.5195.0508 1.1133.0312 1.7656-.0586 1.043-.1445 1.9688-.4023 2.4414-.5742.2344.0508.5078.0742.8086.0742.7578 0 1.6562-.1836 2.4453-.7305.1172-.082.2266-.1719.3281-.2695.3281-.3125.5625-.7031.6875-1.1445.1094-.3867.1328-.8008.0703-1.2266z" />
    </svg>
  );
}

function VercelIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M24 22.525H0l12-21.05 12 21.05z" />
    </svg>
  );
}

function FigmaIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.354-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.019 3.019 3.019h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.098-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.354-3.019-3.019-3.019h-.098z" />
    </svg>
  );
}


function FramerMotionIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
    </svg>
  );
}

const techStack: { name: string; icon: React.FC<{ className?: string }>; color: string }[] = [
  { name: "React", icon: ReactIcon, color: "#61DAFB" },
  { name: "Next.js", icon: NextjsIcon, color: "#000000" },
  { name: "TypeScript", icon: TypeScriptIcon, color: "#3178C6" },
  { name: "Tailwind CSS", icon: TailwindIcon, color: "#06B6D4" },
  { name: "Node.js", icon: NodejsIcon, color: "#5FA04E" },
  { name: "PostgreSQL", icon: PostgresIcon, color: "#4169E1" },
  { name: "Vercel", icon: VercelIcon, color: "#000000" },
  { name: "Figma", icon: FigmaIcon, color: "#F24E1E" },
  { name: "Framer Motion", icon: FramerMotionIcon, color: "#0055FF" },
];

function FadeIn({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        isVisible
          ? "opacity-100 translate-y-0 blur-0"
          : "opacity-0 translate-y-8 blur-[2px]",
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <FadeIn delay={index * 100}>
      <div
        ref={cardRef}
        className="group relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
      >
        {/* Spotlight border glow */}
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: isHovered
              ? `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, hsl(var(--primary) / 0.12), transparent 60%)`
              : "none",
          }}
        />

        {/* Card */}
        <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card transition-all duration-500 group-hover:border-border group-hover:shadow-2xl group-hover:shadow-foreground/3">
          {/* Image container */}
          <div className="relative aspect-16/10 overflow-hidden">
            <img
              src={project.image || "/placeholder.svg"}
              alt={`Preview do projeto ${project.title}`}
              className="h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.04]"
              crossOrigin="anonymous"
            />

            {/* Image overlay gradient */}
            <div className="absolute inset-0 bg-linear-to-t from-card via-card/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Top bar: category + year */}
            <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-foreground/10 bg-background/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-foreground backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {project.category}
              </span>
              <span className="rounded-full border border-foreground/10 bg-background/70 px-2.5 py-1 text-[11px] font-medium tabular-nums text-muted-foreground backdrop-blur-md">
                {project.year}
              </span>
            </div>

            {/* Hover CTA */}
            <div className="absolute inset-0 flex items-end justify-start p-5 translate-y-4 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-[13px] font-semibold text-background transition-transform duration-300 hover:scale-105 active:scale-95"
              >
                Ver Projeto
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="relative p-5 pb-6">
            {/* Title row */}
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-lg font-semibold tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary">
                {project.title}
              </h3>
              <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border/80 text-muted-foreground transition-all duration-300 group-hover:border-primary/30 group-hover:text-primary">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </div>
            </div>

            {/* Description */}
            <p className="mt-2.5 text-[13px] leading-relaxed text-muted-foreground">
              {project.description}
            </p>

            {/* Divider */}
            <div className="my-4 h-px bg-border/60" />

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-md border border-border/60 bg-muted/50 px-2.5 py-1 text-[11px] font-medium text-muted-foreground transition-colors duration-300 group-hover:border-primary/20 group-hover:text-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

export function Showcase() {
  return (
    <section
      id="showcase"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20"
    >
      {/* Background accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-20 max-w-2xl">
          <FadeIn>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Selected Work
            </span>
          </FadeIn>

          <FadeIn delay={100}>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl text-balance">
              Projetos que entregam{" "}
              <span className="text-primary">resultados reais</span>
            </h2>
          </FadeIn>

          <FadeIn delay={200}>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
              Cada site e criado sob medida para maximizar conversao, performance
              e experiencia do usuario.
            </p>
          </FadeIn>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        {/* Tech Marquee */}
        <BlurFade delay={0.3} inView>
          <div className="mt-16 relative bg-muted/30 py-6 rounded-2xl border">
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-32 bg-linear-to-r from-muted/40 to-transparent rounded-2xl" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-32 bg-linear-to-l from-muted/40 to-transparent rounded-2xl" />
            <Marquee pauseOnHover className="[--duration:30s]">
              {techStack.map((tech) => {
                const Icon = tech.icon;
                return (
                  <div
                    key={tech.name}
                    className="mx-4 flex items-center gap-2.5 rounded-full border border-border/50 bg-card px-4 py-2"
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                      {tech.name}
                    </span>
                  </div>
                );
              })}
            </Marquee>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}

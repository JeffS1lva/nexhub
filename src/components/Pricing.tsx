"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { TextAnimate } from "@/components/ui/text-animate";

const PHONE_NUMBER = "5511914675286";

const plans = [
  {
    name: "Landing Page",
    description:
      "Página única desenvolvida do zero. Ideal para apresentar um produto, serviço ou capturar contatos.",
    price: "1.497",
    popular: false,
    features: [
      "Design exclusivo (sem templates prontos)",
      "Desenvolvimento React/Next.js",
      "Responsivo (desktop, tablet, mobile)",
      "Formulário de contato funcional",
      "Animações e interações",
      "1 mês de suporte técnico",
    ],
    cta: "Quero Landing Page",
    whatsappMessage:
      "Olá, gostaria de solicitar uma proposta para o pacote *Landing Page* (R$ 1.497).\n\nAgradeço desde já pela atenção.",
  },
  {
    name: "Site Institucional",
    description:
      "Site completo com múltiplas páginas. Perfeito para empresas que precisam de presença digital profissional.",
    price: "3.497",
    popular: true,
    features: [
      "Até 8 páginas personalizadas",
      "Design UI/UX exclusivo",
      "Código limpo e documentado",
      "Painel administrativo para edição",
      "Integração com Analytics (visualização de dados)",
      "3 meses de manutenção inclusa",
    ],
    cta: "Quero Site Completo",
    whatsappMessage:
      "Olá, gostaria de solicitar uma proposta para o pacote *Site Institucional* (R$ 3.497).\n\nAgradeço desde já pela atenção.",
  },
  {
    name: "Sistema Web / E-commerce",
    description:
      "Plataforma sob medida com funcionalidades específicas. Para negócios que precisam de mais que um site informativo.",
    price: "6.997",
    popular: false,
    features: [
      "Arquitetura personalizada",
      "Páginas e funcionalidades ilimitadas",
      "Sistema de gestão completo",
      "Integrações com APIs e serviços externos",
      "Painel administrativo avançado",
      "Segurança e performance",
      "Deploy e configuração de servidor",
      "6 meses de manutenção inclusa",
    ],
    cta: "Falar sobre Projeto",
    whatsappMessage:
      "Olá, gostaria de solicitar uma proposta para o pacote *Sistema Web / E-commerce* (R$ 6.997).\n\nAgradeço desde já pela atenção.",
  },
];

function getWhatsAppLink(message: string) {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${PHONE_NUMBER}?text=${encodedMessage}`;
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 ${className}`}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function PlanCard({
  plan,
  index,
}: {
  plan: (typeof plans)[0];
  index: number;
}) {
  const whatsappLink = getWhatsAppLink(plan.whatsappMessage);

  return (
    <BlurFade delay={0.1 + index * 0.15} inView>
      <div
        className={`group relative flex flex-col rounded-3xl border transition-all duration-500 ${
          plan.popular
            ? "border-primary/30 bg-card shadow-2xl shadow-primary/10 scale-[1.02] md:scale-105 z-10"
            : "border-border/60 bg-card/80 backdrop-blur-sm hover:border-primary/20 hover:bg-card hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
        }`}
      >
        {/* BorderBeam for popular plan */}
        {plan.popular && (
          <BorderBeam
            size={300}
            duration={10}
            colorFrom="hsl(var(--primary))"
            colorTo="hsl(var(--primary) / 0.2)"
            borderWidth={1.5}
          />
        )}

        {/* Popular badge */}
        {plan.popular && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-1.5 text-xs font-bold text-primary-foreground shadow-lg shadow-primary/25">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="none"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              Mais Popular
            </span>
          </div>
        )}

        <div className="p-7 md:p-9 flex-1 flex flex-col">
          {/* Header */}
          <div>
            <h3 className="text-lg font-semibold text-foreground tracking-tight">
              {plan.name}
            </h3>
            <p className="mt-2.5 text-sm text-muted-foreground/80 leading-relaxed">
              {plan.description}
            </p>
          </div>

          {/* Price */}
          <div className="mt-8">
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm font-medium text-muted-foreground">R$</span>
              <span className="text-5xl md:text-6xl font-bold tracking-tighter text-foreground">
                {plan.price}
              </span>
            </div>
            <span className="mt-2 block text-xs text-muted-foreground/70">
              pagamento único • manutenção mensal opcional
            </span>
          </div>

          {/* Divider */}
          <div className="my-7 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          {/* Features */}
          <ul className="flex-1 flex flex-col gap-3.5">
            {plan.features.map((feature, i) => (
              <BlurFade key={feature} delay={0.3 + i * 0.05} inView>
                <li className="flex items-start gap-3.5">
                  <div
                    className={`mt-0.5 rounded-full p-0.5 ${
                      plan.popular
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-300"
                    }`}
                  >
                    <CheckIcon />
                  </div>
                  <span className="text-sm text-muted-foreground leading-snug">
                    {feature}
                  </span>
                </li>
              </BlurFade>
            ))}
          </ul>

          {/* CTA */}
          <div className="mt-9">
            {plan.popular ? (
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full"
              >
                <ShimmerButton
                  className="w-full h-13 text-sm font-semibold rounded-xl"
                  shimmerColor="hsl(var(--primary-foreground))"
                  background="hsl(var(--primary))"
                >
                  {plan.cta}
                </ShimmerButton>
              </a>
            ) : (
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full"
              >
                <button
                  type="button"
                  className="w-full rounded-xl border border-border bg-secondary/80 py-4 text-sm font-semibold text-foreground transition-all duration-300 hover:bg-muted hover:border-primary/30 hover:text-primary"
                >
                  {plan.cta}
                </button>
              </a>
            )}
          </div>
        </div>
      </div>
    </BlurFade>
  );
}

export function Pricing() {
  return (
    <section
      id="pricing"
      className="relative py-28 md:py-36 px-6 md:px-12 lg:px-20 overflow-hidden border-b"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/[0.03] blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/[0.02] blur-[100px]" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <BlurFade delay={0} inView>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-xs font-medium text-primary">Planos & Preços</span>
            </div>
          </BlurFade>

          <BlurFade delay={0.1} inView>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-balance">
              <TextAnimate animation="blurInUp" by="word" as="span" once>
                {"Sites bem feitos, "}
              </TextAnimate>
              <TextAnimate
                animation="blurInUp"
                by="word"
                delay={0.3}
                as="span"
                className="text-primary"
                once
              >
                sem complicação
              </TextAnimate>
            </h2>
          </BlurFade>

          <BlurFade delay={0.2} inView>
            <p className="mt-5 text-muted-foreground/80 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
              Desenvolvimento técnico de qualidade. Você pensa no seu negócio, eu cuido da parte digital.
            </p>
          </BlurFade>
        </div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {plans.map((plan, index) => (
            <PlanCard key={plan.name} plan={plan} index={index} />
          ))}
        </div>

        {/* Maintenance note */}
        <BlurFade delay={0.5} inView>
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-3 rounded-2xl border border-border/60 bg-card/50 backdrop-blur-sm px-6 py-4">
              <div className="rounded-full bg-primary/10 p-2">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Manutenção mensal:</span> A partir de R$ 197/mês para atualizações, backups, correções e pequenas alterações.
              </p>
            </div>
          </div>
        </BlurFade>

        {/* Footer note */}
        <BlurFade delay={0.6} inView>
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground/70">
              Tem um projeto específico?{" "}
              <a
                href={`https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(
                  "Olá, gostaria de conversar sobre um projeto.\n\nPoderia me orientar sobre as melhores soluções para a minha necessidade?\n\nAgradeço desde já pela atenção."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-medium hover:underline underline-offset-4 decoration-primary/30"
              >
                Vamos conversar
              </a>
            </p>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
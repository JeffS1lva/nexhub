"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { TextAnimate } from "@/components/ui/text-animate";

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
      "Entrega em 5 dias úteis",
      "1 mês de suporte técnico",
    ],
    cta: "Quero Landing Page",
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
      "Blog integrado (opcional)",
      "Integração com Analytics (visualização de dados)",
      "Entrega em 10-15 dias úteis",
      "3 meses de manutenção inclusa",
    ],
    cta: "Quero Site Completo",
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
      "Banco de dados otimizado",
      "Painel administrativo avançado",
      "Segurança e performance",
      "Deploy e configuração de servidor",
      "6 meses de manutenção inclusa",
    ],
    cta: "Falar sobre Projeto",
  },
];

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-primary shrink-0"
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
  return (
    <BlurFade delay={0.1 + index * 0.15} inView>
      <div
        className={`relative flex flex-col rounded-2xl border transition-all duration-500 ${
          plan.popular
            ? "border-primary/40 bg-card shadow-xl shadow-primary/5"
            : "border-border bg-card hover:border-primary/20"
        }`}
      >
        {/* BorderBeam for popular plan */}
        {plan.popular && (
          <BorderBeam
            size={250}
            duration={12}
            colorFrom="hsl(var(--primary))"
            colorTo="hsl(var(--primary) / 0.3)"
            borderWidth={1.5}
          />
        )}

        {/* Popular badge */}
        {plan.popular && (
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1 text-xs font-bold text-primary-foreground">
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

        <div className="p-6 md:p-8 flex-1 flex flex-col">
          {/* Header */}
          <div>
            <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              {plan.description}
            </p>
          </div>

          {/* Price */}
          <div className="mt-6 flex items-baseline gap-1">
            <span className="text-sm text-muted-foreground">R$</span>
            <span className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              {plan.price}
            </span>
          </div>
          <span className="mt-1 text-xs text-muted-foreground">
            pagamento único • manutenção mensal opcional
          </span>

          {/* Divider */}
          <div className="my-6 h-px bg-border" />

          {/* Features */}
          <ul className="flex-1 flex flex-col gap-3">
            {plan.features.map((feature, i) => (
              <BlurFade key={feature} delay={0.3 + i * 0.05} inView>
                <li className="flex items-start gap-3">
                  <CheckIcon />
                  <span className="text-sm text-muted-foreground">
                    {feature}
                  </span>
                </li>
              </BlurFade>
            ))}
          </ul>

          {/* CTA */}
          {plan.popular ? (
            <ShimmerButton
              className="mt-8 w-full h-12 text-sm font-semibold"
              shimmerColor="hsl(var(--primary-foreground))"
              background="hsl(var(--primary))"
            >
              {plan.cta}
            </ShimmerButton>
          ) : (
            <button
              type="button"
              className="mt-8 w-full rounded-full border border-border bg-secondary py-3.5 text-sm font-semibold text-foreground transition-all hover:bg-muted hover:border-primary/20"
            >
              {plan.cta}
            </button>
          )}
        </div>
      </div>
    </BlurFade>
  );
}

export function Pricing() {
  return (
    <section
      id="pricing"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20"
    >
      {/* Background */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full bg-primary/3 blur-3xl" />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <BlurFade delay={0} inView>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 mb-6">
              <span className="text-xs font-medium text-primary">Planos</span>
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
            <p className="mt-4 text-muted-foreground text-base md:text-lg leading-relaxed">
              Desenvolvimento técnico de qualidade. Você pensa no seu negócio, eu cuido da parte digital.
            </p>
          </BlurFade>
        </div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, index) => (
            <PlanCard key={plan.name} plan={plan} index={index} />
          ))}
        </div>

        {/* Maintenance note */}
        <BlurFade delay={0.5} inView>
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Manutenção mensal:</span> A partir de R$ 197/mês para atualizações, backups, correções e pequenas alterações.
            </p>
          </div>
        </BlurFade>

        {/* Footer note */}
        <BlurFade delay={0.6} inView>
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Tem um projeto específico?{" "}
              <a
                href="#contact"
                className="text-primary font-medium hover:underline"
              >
                Vamos conversar
              </a>
            </p>
          </div>
        </BlurFade>
      </div>

      {/* Contact / Footer section */}
      <footer
        id="contact"
        className="mt-24 md:mt-32 pt-16 border-t border-border"
      >
        <div className="max-w-4xl mx-auto text-center">
          <BlurFade delay={0} inView>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground text-balance">
              Vamos criar seu site?
            </h3>
          </BlurFade>

          <BlurFade delay={0.1} inView>
            <p className="mt-4 text-muted-foreground leading-relaxed max-w-xl mx-auto">
              Entre em contato e receba uma proposta detalhada em até 24 horas. Desenvolvimento direto ao ponto.
            </p>
          </BlurFade>

          <BlurFade delay={0.2} inView>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:contato@nexhub.com"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 hover:shadow-xl hover:shadow-primary/20"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                contato@nexhub.com
              </a>
            </div>
          </BlurFade>
        </div>

        {/* Bottom bar */}
        <BlurFade delay={0.3} inView>
          <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-md bg-primary flex items-center justify-center">
                <svg
                  width="12"
                  height="12"
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
              <span className="text-sm font-semibold text-foreground">
                NexHub
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {"2026 NexHub. Desenvolvimento & manutenção de sites."}
            </p>
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Termos
              </a>
              <a
                href="#"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacidade
              </a>
            </div>
          </div>
        </BlurFade>
      </footer>
    </section>
  );
}
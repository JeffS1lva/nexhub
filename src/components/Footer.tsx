"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { MessageCircle, Linkedin, ArrowUpRight, Mail } from "lucide-react";
import LogoNexionHub from "@/components/assets/LogoNexionHub.png"

const PHONE_NUMBER = "5511914675286";
const LINKEDIN_URL = "https://www.linkedin.com/in/jefferson-silva-developer/";

const CONTACT_WHATSAPP_MESSAGE =
  "Olá, gostaria de conversar sobre um projeto.\n\nPoderia me orientar sobre as melhores soluções para a minha necessidade?\n\nAgradeço desde já pela atenção.";

function getWhatsAppLink(message: string) {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${PHONE_NUMBER}?text=${encodedMessage}`;
}

export function Footer() {
  const contactWhatsAppLink = getWhatsAppLink(CONTACT_WHATSAPP_MESSAGE);

  return (
    <footer
      id="contact"
      className="relative mt-28 md:mt-20 overflow-hidden "
    >
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-primary/[0.03] blur-[120px] pointer-events-none" />

      {/* Main CTA Section */}
      <div className="relative max-w-5xl mx-auto px-6 md:px-12 lg:px-20">
        <BlurFade delay={0} inView>
          <div className="relative rounded-3xl border border-border/60 bg-card/60 backdrop-blur-xl p-10 md:p-16 text-center overflow-hidden">
            {/* Subtle grid pattern */}
            <div className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
                backgroundSize: '32px 32px'
              }}
            />

            {/* Corner accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                <span className="text-xs font-medium text-primary">
                  Disponível para projetos
                </span>
              </div>

              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance tracking-tight">
                Vamos criar{" "}
                <span className="text-primary">seu site?</span>
              </h3>

              <p className="mt-5 text-muted-foreground/80 leading-relaxed max-w-lg mx-auto text-base md:text-lg">
                Entre em contato e receba uma proposta detalhada em até{" "}
                <span className="text-foreground font-medium">24 horas</span>.
                Desenvolvimento direto ao ponto.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={contactWhatsAppLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 rounded-xl bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-0.5"
                >
                  <MessageCircle size={18} />
                  <span>WhatsApp</span>
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 rounded-xl border border-border bg-secondary/80 px-8 py-4 text-sm font-semibold text-foreground transition-all duration-300 hover:bg-card hover:border-primary/30 hover:-translate-y-0.5"
                >
                  <Linkedin size={18} />
                  <span>LinkedIn</span>
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 opacity-0 group-hover:opacity-100"
                  />
                </a>
              </div>

              {/* Quick info */}
              <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground/60">
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-primary/60" />
                  <span>Resposta em até 24h</span>
                </div>
                <div className="h-1 w-1 rounded-full bg-muted-foreground/30" />
                <div className="flex items-center gap-2">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary/60"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  <span>Propostas sem compromisso</span>
                </div>
              </div>
            </div>
          </div>
        </BlurFade>
      </div>

      {/* Bottom bar */}
      <div className="relative mt-20 border-t border-border/60">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20 py-8">
          <BlurFade delay={0.2} inView>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="flex flex-col">
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
                    <div className="flex flex-col items">
                      <span className="text-lg sm:text-xl font-bold tracking-tight text-white drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                        NexHub
                      </span>
                      <span className="text-[10px] text-muted-foreground/60 leading-none">
                        Desenvolvimento & manutenção
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Center text */}
              <p className="text-xs text-muted-foreground/50 text-center">
                © 2026 NexHub. Todos os direitos reservados.
              </p>

              {/* Links */}
              <div className="flex items-center gap-1">
                <a
                  href="#"
                  className="rounded-lg px-3 py-2 text-xs text-muted-foreground/60 hover:text-foreground hover:bg-secondary/80 transition-all duration-200"
                >
                  Termos
                </a>
                <a
                  href="#"
                  className="rounded-lg px-3 py-2 text-xs text-muted-foreground/60 hover:text-foreground hover:bg-secondary/80 transition-all duration-200"
                >
                  Privacidade
                </a>
              </div>
            </div>
          </BlurFade>
        </div>
      </div>
    </footer>
  );
}
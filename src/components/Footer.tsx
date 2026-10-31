import {
  ArrowUpRight,
  MapPin,
  Phone,
} from "lucide-react";
import { footerLinks } from "../data/site";
import { Logo } from "./Logo";
import { trackInitiateCheckout, trackWhatsAppLead } from "../utils/metaPixel";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black px-4 py-14 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl">

        <div className="grid gap-10 lg:grid-cols-[1fr_1fr_0.8fr] lg:items-start">

          <div className="justify-self-start">

            <Logo />

            <p className="mt-7 max-w-xs text-sm leading-7 text-white/45">
              Mais de <span className="text-white font-semibold">1.000 vidas transformadas.</span>
              <br />
              A próxima pode ser a sua.
            </p>

          </div>

          <div className="justify-self-center">

            <p className="mb-6 text-[11px] font-black uppercase tracking-[0.14em] text-[var(--green-logo)]">
              Onde Estamos
            </p>

            <div className="space-y-6">

              <div className="flex items-start gap-3">

                <MapPin className="mt-1 size-5 shrink-0 text-[var(--green-logo)]" />

                <div className="text-sm leading-7 text-white/60">

                  <p>Rua Evaristo Cavalli, 27</p>

                  <p>Louveira • SP</p>

                </div>

              </div>

              <div className="flex items-center gap-3">

                <Phone className="size-5 shrink-0 text-[var(--green-logo)]" />

                <p className="text-sm text-white/60">
                  (19) 99809-9158
                </p>

              </div>

            </div>

          </div>

          <div className="justify-self-end text-right">

            <p className="mb-6 text-[11px] font-black uppercase tracking-[0.14em] text-[var(--green-logo)]">
              Acesse
            </p>

            <nav className="flex flex-col items-end gap-5">

              {footerLinks.map((link) => (

              <a
                key={link.label}
                href={link.href}
                onClick={
                  link.label === "WhatsApp"
                    ? trackWhatsAppLead
                    : link.label === "Planos"
                      ? trackInitiateCheckout
                      : undefined
                }
                className="group inline-flex items-center gap-2 text-sm text-white/60 transition-all duration-300 hover:text-[var(--green-logo)]"
              >
                {link.label}
                <ArrowUpRight className="size-4 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>

              ))}

            </nav>

          </div>

        </div>

        <div className="mt-12 h-px w-full bg-white/10" />

        <div className="mt-6 flex flex-col gap-3 text-center text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">

          <p>
            © 2026 Box Louveira Cross Training
          </p>

          <p>
            Desenvolvido por{" "}
            <span className="font-semibold text-[var(--green-logo)] transition-colors duration-300 hover:text-white">
              Ana Júlia Morais
            </span>
          </p>

        </div>

      </div>
    </footer>
  );
}

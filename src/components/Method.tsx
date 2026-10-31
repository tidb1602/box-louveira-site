import { methodSteps } from "../data/site";
import { SectionHeader } from "./SectionHeader";

export function Method() {
  return (
    <section className="bg-[#050505] px-4 py-14 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="COMO FUNCIONA"
          title="DO PRIMEIRO DIA ATÉ VIRAR ROTINA"
          description="Ninguém te entrega um treino e vai embora. Veja o que acontece desde a primeira conversa."
        />
        <div className="relative grid gap-4 lg:grid-cols-3 xl:grid-cols-6">
          <div className="absolute left-0 top-8 hidden h-px w-full bg-gradient-to-r from-[var(--green-logo)]/40 via-white/10 to-[var(--green-logo)]/40 lg:block" />
          {methodSteps.map((step, index) => (
            <article
              key={step.title}
              className="relative rounded-md border border-white/10 bg-white/[0.025] p-5 transition duration-300 hover:-translate-y-1 hover:border-[var(--green-cta)]/35 hover:bg-white/[0.045]"
            >
              <span className="mb-5 grid size-9 place-items-center rounded-md border border-[var(--green-logo)]/35 bg-[#050505] text-sm font-black text-[var(--green-logo)] sm:mb-7">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="break-words text-sm font-black uppercase leading-tight text-white sm:text-base lg:text-base xl:text-[0.95rem]">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-white/56">
                {step.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

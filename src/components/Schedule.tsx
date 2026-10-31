import { MoveRight } from "lucide-react";
import { schedules } from "../data/site";
import { SectionHeader } from "./SectionHeader";
import { trackInitiateCheckout } from "../utils/metaPixel";

export function Schedule() {
  return (
    <section className="bg-[#080808] px-4 py-14 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-7xl">

        <SectionHeader
          eyebrow="Horários"
          title="Treine no seu horário."
          description="Escolha a modalidade ideal e encontre o horário que melhor se encaixa na sua rotina."
          align="center"
        />

        <div className="grid gap-6 lg:grid-cols-2">

          {schedules.map((schedule) => {

            const Icon = schedule.icon;

            return (

            <article
              key={schedule.title}
              className="flex h-full flex-col rounded-md border border-white/10 bg-white/[0.03] p-5 transition duration-300 hover:border-[var(--green-cta)]/35 hover:bg-white/[0.045] hover:-translate-y-1"
            >

                <div className="mb-6 flex flex-col items-center text-center">

                  <div className="mb-5 grid size-12 place-items-center rounded-md border border-[var(--green-logo)]/30 bg-[var(--green-logo)]/10">
                    <Icon className="size-5 text-[var(--green-logo)]" />
                  </div>

                  <div>

                    <h3 className="text-lg font-black uppercase sm:text-xl">
                      {schedule.title}
                    </h3>

                    <p className="mt-2 max-w-xs text-sm leading-6 text-white/60">
                      {schedule.description}
                    </p>

                    <p className="mt-3 text-xs font-black uppercase tracking-[0.18em] text-[var(--green-logo)]">
                      {schedule.times.length} horários disponíveis
                    </p>

                  </div>

                </div>

                <div className="mt-6 flex flex-wrap justify-center gap-2">

                {schedule.times.map((time) => (

                    <span
                    key={time}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white transition duration-300 hover:border-[var(--green-logo)] hover:bg-[var(--green-logo)]/10"
                    >
                    {time}
                    </span>

                ))}

                </div>

                <div className="flex-1" />

                <a
                  href={schedule.href}
                  onClick={trackInitiateCheckout}
                  className="cta-green-text mt-6 inline-flex w-full items-center justify-center gap-3 rounded-md bg-[var(--green-cta)] px-5 py-2.5 text-xs font-black uppercase tracking-[0.14em] !text-black shadow-[0_0_34px_var(--green-glow)] transition-all duration-300 hover:bg-white hover:!text-[#45D845]"
                >

                  {schedule.button}

                  <MoveRight className="size-5"/>

                </a>

              </article>

            );

          })}

        </div>

      </div>
    </section>
  );
}
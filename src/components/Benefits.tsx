import { motion } from "motion/react";
import { benefits } from "../data/site";
import { SectionHeader } from "./SectionHeader";

export function Benefits() {
  return (
    <section className="bg-[#080808] px-4 py-14 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="CROSS TRAINING EM LOUVEIRA · PRA GENTE NORMAL"
          title="VOCÊ NÃO PAROU POR PREGUIÇA. VOCÊ PAROU PORQUE TENTOU SOZINHO."
          description="Cross training em Louveira pra quem nunca treinou, pra quem parou no meio e pra quem acha que não dá conta. O treino se adapta a você — e tem uma turma te esperando."
          align="center"
        />        
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <motion.article
                key={benefit.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="rounded-md border border-white/10 bg-white/[0.025] p-6 transition duration-300 hover:-translate-y-1 hover:border-[var(--green-cta)]/45 hover:bg-[var(--green-cta)]/[0.045] sm:p-4"
              >
                <div className="mb-5 grid size-10 place-items-center rounded-md border border-[var(--green-logo)]/25 bg-[var(--green-logo)]/10 sm:mb-8 sm:size-12">
                  <Icon className="size-5 text-[var(--green-logo)]" />
                </div>
                <h3 className="text-base font-black uppercase leading-tight text-white sm:text-xl">
                  {benefit.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-white/65">
                  {benefit.text}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

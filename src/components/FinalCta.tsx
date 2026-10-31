import { MoveRight } from "lucide-react";
import { links } from "../data/site";
import { trackInitiateCheckout } from "../utils/metaPixel";

export function FinalCta() {
  return (
    <section
      id="cta-final"
      className="bg-[#050505] px-4 py-14 sm:px-8 sm:py-20 lg:px-10 lg:py-24"
    >
      <div className="mx-auto max-w-5xl text-center">
        <p className="mb-4 text-[10px] font-black uppercase tracking-[0.22em] text-[var(--green-logo)] sm:mb-5 sm:text-xs sm:tracking-[0.24em]">
          Próximo passo
        </p>
        <h2 className="text-[2.15rem] font-black uppercase leading-none text-white sm:text-6xl">

          <span className="block">
            SE VOCÊ QUER MUDAR,
          </span>

          <span className="mt-2 block">
            ENTRE NO AMBIENTE CERTO.
          </span>

        </h2>
        <a
          href={links.plans}
          onClick={trackInitiateCheckout}
          className="cta-green-text mt-9 inline-flex w-full items-center justify-center gap-3 rounded-md bg-[var(--green-cta)] px-8 py-5 text-sm font-black uppercase tracking-[0.14em] !text-black shadow-[0_0_34px_var(--green-glow)] transition-all duration-300 hover:bg-white hover:!text-[#45D845] sm:mt-10 sm:w-auto"
        >
          Conhecer os Planos
          <MoveRight className="size-5" />
        </a>
      </div>
    </section>
  );
}

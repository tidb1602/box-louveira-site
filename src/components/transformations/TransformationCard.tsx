interface Transformation {
  label: string;
  text: string;
  before: string;
  after: string;
}

interface Props {
  item: Transformation;
}

export function TransformationCard({ item }: Props) {
  return (
    <article
      className="
        group
        relative
        mx-auto
        flex
        w-full
        max-w-7xl
        flex-col
        items-center
        rounded-md
        border
        border-white/10
        bg-white/[0.025]
        px-10
        py-12
        shadow-[inset_0_1px_0_rgba(255,255,255,.025)]
        transition-all
        duration-1000
        ease-out
        hover:-translate-y-0.5  
        hover:border-[var(--green-logo)]/20
        hover:bg-[var(--green-logo)]/[0.02]
       "
    >

      <div className="flex items-center justify-center gap-6">

        <div
          className="
            relative
            overflow-hidden
            rounded-md
            border
            border-white/[0.03]
            bg-zinc-950
            shadow-[0_18px_40px_rgba(0,0,0,.22)]
            "
        >

          <div className="
            absolute
            left-5
            top-5
            z-20
            rounded-full
            border
            border-white/5
            bg-black/55
            px-3.5
            py-1.5
            backdrop-blur-md
            transition-colors
            duration-1000
            group-hover:bg-black/60
            "
          >
            <span className="text-[9px] font-black uppercase tracking-[0.34em] text-white">
              ANTES
            </span>
          </div>

          <img
            draggable={false}
            loading="lazy"
            src={item.before}
            alt={`${item.label} Antes`}
              className="
                h-[470px]
                w-[360px]
                object-cover
                grayscale
                transition-all
                duration-1000
                ease-out
                group-hover:scale-[1.003]
                group-hover:contrast-[1.02]
                "
          />

        </div>

        <div className="flex w-12 shrink-0 justify-center">

          <div className="relative flex items-center justify-center">

              <div className="absolute h-px w-12 bg-white/10" />

              <div
                className="
                  absolute
                  h-10
                  w-10
                  rounded-full
                  bg-[var(--green-logo)]/5
                  blur-lg
                  transition-all
                  duration-1000
                  group-hover:bg-[var(--green-logo)]/7
                  "
              />

              <div
                className="
                  relative
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[var(--green-logo)]/10
                  bg-[#090909]
                  transition-all
                  duration-700
                  group-hover:border-[var(--green-logo)]/15
                  "
              >

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-4 w-4 text-[var(--green-logo)]"
              >
                <path d="M5 12h14" />
                <path d="m13 6 6 6-6 6" />
              </svg>

            </div>
          </div>
        </div>  

        <div
          className="
            relative
            overflow-hidden
            rounded-md
            border
            border-[var(--green-logo)]/10
            bg-zinc-950
            shadow-[0_18px_40px_rgba(0,0,0,.22)]
            "
        >

          <div className="
            absolute 
            left-5 
            top-5 
            z-20 
            rounded-full 
            border 
            border-[var(--green-logo)]/10 
            bg-black/55 
            px-3.5 
            py-1.5 
            backdrop-blur-md
            transition-colors
            duration-1000
            group-hover:bg-black/60"
          >
            <span className="text-[9px] font-black uppercase tracking-[0.34em] text-[var(--green-logo)]">
              ✓ DEPOIS
            </span>
          </div>

          <img
            draggable={false}
            loading="lazy"
            src={item.after}
            alt={`${item.label} Depois`}
            className="
              h-[470px]
              w-[360px]
              object-cover
              -translate-y-1
              transition-transform
              duration-1000
              ease-out
              group-hover:scale-[1.003]
              "
            />

        </div>

      </div>

      <div className="mt-6 max-w-[850px] text-center">

        <p className="text-[11px] font-black uppercase tracking-[0.32em] text-[var(--green-logo)]">
          {item.label}
        </p>

        <h3 className="mt-2 text-2xl font-bold tracking-tight leading-tight text-white whitespace-pre-line">
          {item.text}
        </h3>

        <p className="mt-3 text-sm leading-7 text-zinc-500">
          Resultado conquistado através de disciplina, constância e acompanhamento da equipe Box Louveira.
        </p>

      </div>

    </article>
  );
}
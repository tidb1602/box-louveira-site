interface Transformation {
  label: string;
  text: string;
  before: string;
  after: string;
}

interface Props {
  item: Transformation;
}

export function TransformationCardMobile({ item }: Props) {
  return (
    <article
      className="
        group
        relative
        overflow-hidden
        rounded-2xl
        border
        border-[var(--green-logo)]/15
        bg-[var(--green-logo)]/[0.02]
        p-5
        shadow-[inset_0_1px_0_rgba(255,255,255,.025)]
        transition-all
        duration-700
      "
    >
    <div
      className="
        pointer-events-none
        absolute
        inset-0
        opacity-60
        transition-opacity
        duration-700
      "
    >
      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-64
          w-64
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[radial-gradient(circle,rgba(126,255,98,.08),transparent_70%)]
        "
      />
    </div>

    <div className="relative z-10 space-y-5">

      <div className="relative overflow-hidden rounded-xl border border-white/10">

        <div className="absolute left-4 top-4 z-10 rounded-full bg-black/60 px-3 py-1">
          <span className="text-[10px] font-black tracking-[0.3em] text-white">
            ANTES
          </span>
        </div>

        <img
          src={item.before}
          alt=""
          className="h-[330px] w-full object-cover grayscale"
        />

      </div>

      <div className="flex justify-center">

        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--green-logo)]/20 bg-[#090909]">

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-4 w-4 text-[var(--green-logo)]"
          >
            <path d="M12 5v14" />
            <path d="m6 13 6 6 6-6" />
          </svg>

        </div>

      </div>

      <div className="relative overflow-hidden rounded-xl border border-[var(--green-logo)]/10">

        <div className="absolute left-4 top-4 z-10 rounded-full bg-black/60 px-3 py-1">
          <span className="text-[10px] font-black tracking-[0.3em] text-[var(--green-logo)]">
            ✓ DEPOIS
          </span>
        </div>

        <img
          src={item.after}
          alt=""
          className="h-[330px] w-full object-cover"
        />

      </div>

      <div className="pt-2 text-center">

        <p className="text-[11px] font-black uppercase tracking-[0.32em] text-[var(--green-logo)]">
          {item.label}
        </p>

        <h3 className="mt-3 whitespace-pre-line text-[1.35rem] font-bold leading-snug text-white">
          {item.text}
        </h3>

        <p className="mt-4 text-[13px] leading-6 text-white/55">
          Resultado conquistado através de disciplina, constância e acompanhamento da equipe Box Louveira.
        </p>

      </div>

      </div>

    </article>
  );
}
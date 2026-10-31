export function EmotionalBlock() {
  return (
    <section className="relative grid min-h-[82svh] place-items-center overflow-hidden px-4 py-16 text-center sm:min-h-screen sm:px-8 sm:py-24 lg:px-10">
      <img
        src="/Emotional/image00015.jpeg"
        alt="Atleta em treino intenso"
        className="absolute inset-0 h-full w-full object-cover object-[72%_center] opacity-35 scale-105"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#050505_0%,rgba(5,5,5,0.72)_32%,rgba(5,5,5,0.82)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(69,216,69,0.12),transparent_42%)]" />
      <div className="relative mx-auto max-w-5xl">
        <p className="mb-5 text-[10px] font-black uppercase tracking-[0.22em] text-[var(--green-logo)] sm:mb-6 sm:text-xs sm:tracking-[0.24em]">
          Decisao diária
        </p>
        <h2 className="text-[2rem] font-black uppercase leading-none text-white sm:text-6xl lg:text-6.5xl">

          <span className="block">
            VOCê NÃO PRECISA ESTAR PRONTO.
          </span>

          <span className="mt-3 block">
            SÓ PRECISA COMEÇAR.
          </span>

        </h2>
      </div>
    </section>
  );
}

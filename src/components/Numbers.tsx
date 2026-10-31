import { numbers } from "../data/site";

export function Numbers() {
  return (
    <section className="border-y border-white/10 bg-[var(--green-cta)] px-4 py-12 text-black sm:px-8 sm:py-16 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
        {numbers.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="flex items-start gap-4 rounded-md bg-black/[0.06] p-4 sm:bg-transparent sm:p-0"
            >
              <Icon className="mt-1 size-9 shrink-0" strokeWidth={2.5} />
              <div>
                <p className="text-3xl font-black uppercase leading-none sm:text-4xl lg:text-5xl">
                  {item.value}
                </p>
                <p className="mt-3 text-sm font-black uppercase tracking-[0.14em] text-black/64">
                  {item.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

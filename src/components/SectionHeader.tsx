type SectionHeaderProps = {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeaderProps) {
  return (
    <div
      className={`mx-auto mb-8 max-w-3xl sm:mb-10 ${
        align === "center" ? "text-center" : ""
      }`}
    >
      <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--green-logo)] sm:mb-4 sm:text-xs sm:tracking-[0.24em]">
        {eyebrow}
      </p>
      <h2 className="text-balance text-[1.9rem] font-black uppercase leading-[1.2] text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-pretty text-sm leading-7 text-white/62 sm:mt-5 sm:text-lg sm:leading-8">
          {description}
        </p>
      ) : null}
    </div>
  );
}
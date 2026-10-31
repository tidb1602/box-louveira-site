export function Logo() {
  return (
    <a
      href="#top"
      aria-label="Box Louveira Cross Training"
      className="inline-flex items-center"
    >
      <img
        src="/brand/box-logo.png"
        alt="Box Louveira Cross Training"
        className="h-14 w-auto object-contain transition-all duration-300 sm:h-16 lg:h-[72px]"
        draggable={false}
      />
    </a>
  );
}
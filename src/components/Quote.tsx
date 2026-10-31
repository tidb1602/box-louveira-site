import { motion } from "motion/react";

interface QuoteProps {
  quote: string;
  author: string;
  align?: "left" | "right";
}

export function Quote({
  quote,
  author,
  align = "right",
}: QuoteProps) {
  return (
    <section className="px-4 py-10 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-5xl">

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ transformOrigin: "left" }}
          className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent"
        />

        <div className="relative pt-10 pb-8 text-center">

          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.35 }}
            className="absolute left-1/2 top-0 -translate-x-1/2 select-none font-serif text-7xl leading-none text-[var(--green-logo)]/20"
          >
            “
          </motion.span>

          <motion.blockquote
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.35,
              duration: 0.5,
              ease: "easeOut",
            }}
            className="relative mx-auto max-w-3xl text-center text-lg font-light leading-9 text-white md:text-2xl"
          >
            {quote}
          </motion.blockquote>

          <motion.footer
            initial={{ opacity: 0, x: align === "left" ? -15 : 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.55,
              duration: 0.4,
              ease: "easeOut",
            }}
            className={`mt-8 flex items-center ${
              align === "left" ? "justify-start" : "justify-end"
            }`}
          >
            {align === "right" && (
              <div className="mr-4 h-px w-12 bg-white/20" />
            )}

            <span className="text-sm font-semibold uppercase tracking-[0.35em] text-white/75">
              {author}
            </span>

            {align === "left" && (
              <div className="ml-4 h-px w-12 bg-white/20" />
            )}
          </motion.footer>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{
            delay: 0.7,
            duration: 0.6,
            ease: "easeOut",
          }}
          style={{ transformOrigin: "right" }}
          className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent"
        />
      </div>
    </section>
  );
}
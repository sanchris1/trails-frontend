// components/QuoteSection.tsx
export default function QuoteSection() {
  return (
    <section className="bg-[#E4EDE6] py-16 dark:bg-[#1F2E28] md:py-24">
      <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
        <div className="mb-6 text-4xl font-serif leading-none text-foreground/20 md:text-5xl">
          ”
        </div>

        <blockquote className="font-serif text-xl leading-relaxed text-foreground sm:text-2xl md:text-3xl md:leading-snug">
          “We don&apos;t just want you to visit Kenya. We want you to experience
          it, remember it, and carry its stories with you.”
        </blockquote>

        <cite className="mt-8 block text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase not-italic">
          — Trails & Memoirs
        </cite>
      </div>
    </section>
  );
}

// components/ShopHeader.tsx
export default function ShopHeader() {
  return (
    <section className="bg-background py-16 md:py-24 lg:py-28">
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        {/* Label with decorative lines */}
        <div className="mb-5 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-accent/60 sm:w-12" />
          <p className="text-xs font-medium tracking-[0.2em] text-accent uppercase">
            Trails & Memoirs Shop
          </p>
          <span className="h-px w-8 bg-accent/60 sm:w-12" />
        </div>

        {/* Headline */}
        <h1 className="font-serif text-4xl text-foreground sm:text-5xl md:text-6xl">
          Gear for the Journey
        </h1>

        {/* Description */}
        <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
          Carry a piece of the trail with you. Discover thoughtfully selected
          apparel, outdoor essentials, and merchandise inspired by authentic
          adventures across Kenya.
        </p>
      </div>
    </section>
  );
}

// components/WhyWeExist.tsx
export default function WhyWeExist() {
  const items = [
    {
      number: "01",
      title: "Explore",
      description:
        "Discover majestic mountains, ancient forests, and hidden gems off the beaten path.",
    },
    {
      number: "02",
      title: "Experience",
      description:
        "Join thoughtfully organized expeditions that challenge and inspire.",
    },
    {
      number: "03",
      title: "Remember",
      description:
        "Capture authentic stories and create memories that last a lifetime.",
    },
  ];

  return (
    <section className="bg-background py-16 md:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Label */}
        <p className="mb-5 text-center text-xs font-medium tracking-[0.2em] text-accent uppercase">
          Why We Exist
        </p>

        {/* Headline */}
        <h2 className="mx-auto max-w-3xl text-center font-serif text-3xl leading-tight text-foreground sm:text-4xl md:text-5xl">
          Helping You Experience Kenya
          <br className="hidden sm:block" /> Differently
        </h2>

        {/* Cards */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:mt-16 md:grid-cols-3 md:gap-5 lg:gap-6">
          {items.map((item, index) => (
            <div
              key={item.number}
              className={`
                rounded-2xl bg-card p-7 sm:p-8
                border border-border/60
                shadow-sm
                transition-all duration-300 hover:-translate-y-1 hover:shadow-md
                ${index === 1 ? "md:mt-10" : ""}
              `}
            >
              <span className="text-2xl font-light text-accent">
                {item.number}
              </span>
              <h3 className="mt-4 text-xl font-medium text-foreground">
                {item.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// components/WhyKenyaHero.tsx
import Image from "next/image";

interface WhyKenyaHeroProps {
  imageSrc?: string;
  imageAlt?: string;
}

export default function WhyKenyaHero({
  imageSrc = "/hero/trail-7.jpg", // replace with your actual image
  imageAlt = "Kenya highlands landscape",
}: WhyKenyaHeroProps) {
  const stats = [
    { value: "40+", label: "Adventure Experiences" },
    { value: "20+", label: "Destinations" },
    { value: "1000s", label: "Trail Memories" },
  ];

  return (
    <section className="relative h-[85vh] min-h-[580px] w-full overflow-hidden md:h-[90vh]">
      {/* Background Image */}
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Dark gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 text-center">
        {/* Label */}
        <p className="mb-4 text-xs font-medium tracking-[0.25em] text-white/80 uppercase sm:mb-5">
          Why Kenya
        </p>

        {/* Headline */}
        <h1 className="max-w-4xl font-serif text-4xl leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          A Country Made for
          <br />
          Adventure
        </h1>

        {/* Divider */}
        <div className="mt-8 h-px w-16 bg-white/40 sm:mt-10 sm:w-24" />

        {/* Stats */}
        <div className="mt-10 flex flex-col items-center gap-8 sm:mt-12 sm:flex-row sm:gap-14 md:gap-20">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-serif text-3xl text-white sm:text-4xl md:text-5xl">
                {stat.value}
              </div>
              <div className="mt-1.5 text-[11px] font-medium tracking-[0.15em] text-white/75 uppercase sm:text-xs">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

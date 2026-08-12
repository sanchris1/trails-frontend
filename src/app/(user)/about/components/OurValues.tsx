// components/OurValues.tsx
import { Compass, Leaf, Sparkles, Users } from "lucide-react";

export default function OurValues() {
  const values = [
    {
      icon: Compass,
      title: "Authentic Exploration",
      description: "We seek out genuine experiences over manufactured moments.",
    },
    {
      icon: Leaf,
      title: "Responsible Adventure",
      description:
        "Leaving only footprints, respecting local cultures and environments.",
    },
    {
      icon: Sparkles,
      title: "Meaningful Experiences",
      description:
        "Designing journeys that foster personal growth and lasting memories.",
    },
    {
      icon: Users,
      title: "Community & Connection",
      description:
        "Building a community of like-minded explorers who share a passion for Kenya.",
    },
  ];

  return (
    <section className="bg-background py-16 md:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          {/* Left side */}
          <div className="lg:col-span-4">
            <p className="mb-4 text-xs font-medium tracking-[0.2em] text-accent uppercase">
              What We Believe
            </p>
            <h2 className="font-serif text-4xl text-foreground md:text-5xl">
              Our Values
            </h2>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-muted-foreground">
              These principles guide every expedition we design and every story
              we share.
            </p>
          </div>

          {/* Right side - Values */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2">
              {values.map((value) => (
                <div key={value.title} className="group">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 transition-transform duration-300 group-hover:scale-105">
                    <value.icon
                      className="h-5 w-5 text-accent"
                      strokeWidth={1.6}
                    />
                  </div>

                  <h3 className="text-lg font-medium text-foreground">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

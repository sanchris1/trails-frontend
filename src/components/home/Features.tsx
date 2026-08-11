import { BadgeCheck, Map, CalendarCheck } from "lucide-react";

const features = [
  {
    id: "choices",
    icon: Map,
    title: "Lots of Choices",
    description:
      "We provide diverse choices of destinations and affordable travel packages for every kind of explorer.",
  },
  {
    id: "guide",
    icon: BadgeCheck,
    title: "Best Tour Guide",
    description:
      "We provide professional tour guides and experienced people who understand every destination.",
    featured: true,
  },
  {
    id: "booking",
    icon: CalendarCheck,
    title: "Easy Booking",
    description:
      "We make it simple for you to book your next adventure and travel to the place you want.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="w-full px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-4 lg:items-center lg:gap-8">
        {/* Section introduction */}
        <div className="lg:pr-4">
          <span className="text-sm font-semibold text-primary">
            What We Give
          </span>

          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            Best Features
            <br />
            For You
          </h2>

          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            We provide the best features for those who want to travel
            comfortably, confidently, and without unnecessary hassle.
          </p>
        </div>

        {/* Feature cards */}
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.id}
              className={`group rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 ${
                feature.featured
                  ? "border bg-background shadow-sm"
                  : "border border-transparent"
              }`}
            >
              {/* Icon */}
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                  feature.featured
                    ? "bg-primary text-primary-foreground"
                    : "bg-primary/10 text-primary"
                }`}
              >
                <Icon className="h-5 w-5" />
              </div>

              {/* Content */}
              <h3 className="mt-5 text-lg font-semibold">{feature.title}</h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturesSection;

import ExpeditionsHero from "./components/ExpeditionsHero";
import AdventuresExpeditionFilterSection from "../adventures/components/AdventuresExpeditionFilterSection";
import FeaturedExpedition from "./components/FeaturedExpedition";
import ExpeditionsList from "./components/ExpeditionList";
import { Props } from "../adventures/page";

const ExpeditionsPage = async ({ searchParams }: Props) => {
  const params = await searchParams;

  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (typeof value === "string" && value) {
      query.set(key, value);
    }
  });

  return (
    <div>
      <ExpeditionsHero />
      <AdventuresExpeditionFilterSection />
      <FeaturedExpedition />
      <ExpeditionsList query={query.toString()} />
    </div>
  );
};

export default ExpeditionsPage;

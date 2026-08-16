import AdventureHero from "./components/AdventureHero";
import AdventuresExpeditionFilterSection from "./components/AdventuresExpeditionFilterSection";
import AdventureResults from "./components/AdventuresSection";

type Props = {
  searchParams: Promise<Record<string, string | string[] | null | undefined>>;
};

const AdventuresPage = async ({ searchParams }: Props) => {
  const params = await searchParams;

  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (typeof value === "string" && value) {
      query.set(key, value);
    }
  });

  return (
    <div>
      <AdventureHero />
      <AdventuresExpeditionFilterSection />
      <AdventureResults query={query.toString()} />
    </div>
  );
};

export default AdventuresPage;

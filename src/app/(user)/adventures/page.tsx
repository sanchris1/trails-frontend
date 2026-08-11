import AdventureHero from "./components/AdventureHero";
import AdventuresExpeditionFilterSection from "./components/AdventuresExpeditionFilterSection";
import AdventureResults from "./components/AdventuresSection";

const AdventuresPage = () => {
  return (
    <div>
      <AdventureHero />
      <AdventuresExpeditionFilterSection />
      <AdventureResults />
    </div>
  );
};

export default AdventuresPage;

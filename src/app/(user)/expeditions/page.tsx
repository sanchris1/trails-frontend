import React from "react";
import ExpeditionsHero from "./components/ExpeditionsHero";
import AdventuresExpeditionFilterSection from "../adventures/components/AdventuresExpeditionFilterSection";
import FeaturedExpedition from "./components/FeaturedExpedition";
import ExpeditionsList from "./components/ExpeditionList";

const ExpeditionsPage = () => {
  return (
    <div>
      <ExpeditionsHero />
      <AdventuresExpeditionFilterSection />
      <FeaturedExpedition />
      <ExpeditionsList />
    </div>
  );
};

export default ExpeditionsPage;

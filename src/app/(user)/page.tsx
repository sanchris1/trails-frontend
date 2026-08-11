import AboutSection from "@/components/home/AboutSection";
import DiscountCTA from "@/components/home/DiscountCTA";
import ExploreDestination from "@/components/home/ExploreDestination";
import FeaturesSection from "@/components/home/Features";
import HeroSection from "@/components/home/HeroSection";
import React from "react";

const UserHomePage = () => {
  return (
    <div className="flex flex-col gap-12">
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <ExploreDestination />
      <DiscountCTA />
    </div>
  );
};

export default UserHomePage;

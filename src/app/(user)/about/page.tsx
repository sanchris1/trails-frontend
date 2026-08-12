import AboutHero from "./components/AboutHero";
import OurStory from "./components/OurStory";
import OurValues from "./components/OurValues";
import QuoteSection from "./components/QuoteSection";
import WhatYoullFindHere from "./components/WhatYoullFindHere";
import WhyKenyaHero from "./components/WhyKenyaHero";
import WhyWeExist from "./components/WhyWeExists";

const AboutPage = () => {
  return (
    <div>
      <AboutHero />
      <OurStory />
      <WhyWeExist />
      <OurValues />
      <WhyKenyaHero />
      <WhatYoullFindHere />
      <QuoteSection />
    </div>
  );
};

export default AboutPage;

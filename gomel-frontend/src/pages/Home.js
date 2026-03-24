import Hero from "../components/Hero";
import Stats from "../components/Stats";
import PopularCars from "../components/PopularCars";
import WhyChooseUs from "../components/WhyChooseUs";
import FeaturedLocations from "../components/FeaturedLocations";
import SpecialOffers from "../components/SpecialOffers";
import Testimonials from "../components/Testimonials";
import HostGuestSection from "../components/HostGuestSection";
import DiscoverSection from "../components/DiscoverSection";
import AppDownload from "../components/AppDownload";
import CarExperienceSection from "../components/CarExperienceSection";
import ContactInfoSection from "../components/ContactInfoSection";

import FAQ from "../components/FAQ";
import Featured from "../components/Featured";
import LinksSection from "../components/LinksSection";

function Home() {
  return (
    <main>

      <Hero />

      <section className="section">
        <CarExperienceSection />
      </section>

      <section className="section">
        <DiscoverSection />
      </section>

      <section className="section">
        <Stats />
      </section>

      <section className="section">
        <HostGuestSection />
      </section>

      <section className="section">
        <PopularCars />
      </section>

      <section className="section">
        <WhyChooseUs />
      </section>

      <section className="section">
        <FeaturedLocations />
      </section>

      <section className="section">
        <SpecialOffers />
      </section>

      <section className="section">
        <Testimonials />
      </section>

      <section className="section">
        <AppDownload />
      </section>

      <section className="section">
        <ContactInfoSection />
      </section>

      <section className="section">
        <FAQ />
      </section>

      <section className="section">
        <Featured />
      </section>

      <section className="section">
        <LinksSection />
      </section>

    </main>
  );
}

export default Home;
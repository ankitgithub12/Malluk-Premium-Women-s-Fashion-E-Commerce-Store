import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import FeaturedCollections from '../components/FeaturedCollections';
import NewArrivals from '../components/NewArrivals';
import BestSellers from '../components/BestSellers';
import PromotionalBanner from '../components/PromotionalBanner';
import WhyChooseMalluk from '../components/WhyChooseMalluk';
import Testimonials from '../components/Testimonials';
import InstagramGallery from '../components/InstagramGallery';
import Newsletter from '../components/Newsletter';

export default function Home() {
  // Ensure we scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-0"> {/* Start at top since navbar is transparent */}
      <Hero />
      <FeaturedCollections />
      <NewArrivals />
      <BestSellers />
      <PromotionalBanner />
      <WhyChooseMalluk />
      <Testimonials />
      <InstagramGallery />
      <Newsletter />
    </div>
  );
}

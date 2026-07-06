import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import InstagramEmbed from '../components/InstagramEmbed';
import aboutImage1 from '../assets/About Section Image/image 1.webp';
import aboutImage2 from '../assets/About Section Image/image 2.webp';

export default function AboutUs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-28 pb-24 bg-brand-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-xl mx-auto mb-20">
          <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-semibold block mb-3">
            Atelier Heritage
          </span>
          <h1 className="text-4xl font-light tracking-wide text-primary uppercase mb-4">
            The Malluk <span className="font-serif italic font-normal text-accent normal-case">Story</span>
          </h1>
          <div className="h-[1px] w-20 bg-accent/40 mx-auto mt-4" />
        </div>

        {/* Narrative Block 1 - Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center mb-24">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-semibold block">
              Origin & Heritage
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl text-primary font-light uppercase tracking-wide leading-tight">
              A Vision of <span className="font-serif italic text-accent font-normal normal-case">Pure Fluidity</span>
            </h2>
            <p className="text-xs text-brand-text/75 tracking-wider leading-relaxed font-body">
              Founded in 2026, Malluk emerged from a singular desire: to liberate women's fashion from structural stiffness and celebrate fluid grace. Drawing inspiration from classic Parisian haute couture, modern architectural minimalism, and the raw beauty of natural textiles, we set out to build a contemporary fashion house that prioritizes both absolute comfort and editorial-level chic.
            </p>
            <p className="text-xs text-brand-text/75 tracking-wider leading-relaxed font-body">
              We design for the modern, multi-faceted woman. Our silhouettes are constructed to transition effortlessly from relaxed lounging to formal evening affairs, capturing attention through subtle details rather than loud displays.
            </p>
          </div>
          <div className="lg:col-span-6 aspect-[4/3] overflow-hidden shadow-md border border-primary/5">
            <img
              src={aboutImage1}
              alt="Atelier sketches and pattern making"
              className="w-full h-full object-cover transform hover:scale-103 transition-transform duration-1000"
            />
          </div>
        </div>

        {/* Narrative Block 2 - Split Layout (reversed) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center mb-24 lg:flex-row-reverse">
          <div className="lg:col-span-6 lg:order-2 space-y-6">
            <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-semibold block">
              The Craftsmanship
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl text-primary font-light uppercase tracking-wide leading-tight">
              Noble Fibers, <br />
              <span className="font-serif italic text-accent font-normal normal-case">Timeless Integrity</span>
            </h2>
            <p className="text-xs text-brand-text/75 tracking-wider leading-relaxed font-body">
              We believe luxury lies in materiality. We utilize exclusively organic silks from specialized mulberry farms, high-weight satin that cascades beautifully over the skin, and sustainable Mongolian cashmere obtained through ethical combing cooperatives.
            </p>
            <p className="text-xs text-brand-text/75 tracking-wider leading-relaxed font-body">
              Our tailoring is crafted at family-owned workshops in Northern Italy, where artisanal heritage is preserved across generations. Every seam is checked by hand, and every champagne-gold button is individually fastened to guarantee archival longevity.
            </p>
          </div>
          <div className="lg:col-span-6 lg:order-1 aspect-[4/3] overflow-hidden shadow-md border border-primary/5">
            <img
              src={aboutImage2}
              alt="Italian linen tailoring"
              className="w-full h-full object-cover transform hover:scale-103 transition-transform duration-1000"
            />
          </div>
        </div>
 
        {/* Narrative Block 3 - Instagram Video Feature */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center mb-24">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-semibold block">
              Atelier in Motion
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl text-primary font-light uppercase tracking-wide leading-tight">
              Crafted With <br />
              <span className="font-serif italic text-accent font-normal normal-case">Care & Comfort</span>
            </h2>
            <p className="text-xs text-brand-text/75 tracking-wider leading-relaxed font-body">
              Every detail is meticulously crafted to ensure the finest finish. Watch our designs in motion and discover how we combine traditional Lucknowi embroidery and shisha thread work with breathable Mulmul cotton.
            </p>
            <p className="text-xs text-brand-text/75 tracking-wider leading-relaxed font-body">
              Follow our daily inspirations and announcements on Instagram at <a href="https://www.instagram.com/mallukbykanikaa" target="_blank" rel="noopener noreferrer" className="text-accent font-semibold hover:text-primary transition-colors underline">@mallukbykanikaa</a>.
            </p>
          </div>
          <div className="lg:col-span-6 flex justify-center items-center">
            <InstagramEmbed />
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-white p-10 sm:p-16 border border-primary/5 shadow-sm">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-semibold block mb-2">
              Our Pillars
            </span>
            <h2 className="text-2xl font-light tracking-wide text-primary uppercase">Atelier Values</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center font-body text-xs tracking-wider leading-relaxed">
            <div className="space-y-3">
              <h3 className="font-heading text-sm text-primary uppercase tracking-widest font-bold">1. Slow Luxury</h3>
              <p className="text-brand-text/60">We refuse mass production. We design in small seasonal batches to prevent overproduction and preserve artisanal integrity.</p>
            </div>
            <div className="space-y-3">
              <h3 className="font-heading text-sm text-primary uppercase tracking-widest font-bold">2. Absolute Transparency</h3>
              <p className="text-brand-text/60">From the Mongolian cooperatives that raise our goats to the Italian workshops that tailors our blazers, we disclose every layer of sourcing.</p>
            </div>
            <div className="space-y-3">
              <h3 className="font-heading text-sm text-primary uppercase tracking-widest font-bold">3. Material Focus</h3>
              <p className="text-brand-text/60">We use only high-weight, biodegradable, and organic fibers. We avoid synthetic blends, ensuring garments that are gentle on both skin and earth.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import aboutImage1 from '../assets/About Section Image/image 1.webp';
import aboutImage2 from '../assets/About Section Image/image 2.webp';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

export default function AboutUs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-44 sm:pt-48 pb-24 bg-brand-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-accent font-semibold block mb-4">
            ✦ Atelier Heritage ✦
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-wide text-primary uppercase mb-5">
            The Malluk <span className="font-serif italic font-normal text-accent normal-case">Story</span>
          </h1>
          <div className="section-ornament mt-5">
            <span className="diamond" />
          </div>
          <p className="text-xs text-brand-text/50 tracking-wider mt-5 leading-relaxed font-body max-w-md mx-auto">
            Discover the heritage, craftsmanship, and philosophy behind every Malluk creation.
          </p>
        </motion.div>

        {/* Narrative Block 1 - Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center mb-24">
          <motion.div
            className="lg:col-span-6 space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.span variants={itemVariants} className="text-[10px] uppercase tracking-[0.2em] text-accent font-semibold block">
              Origin & Heritage
            </motion.span>
            <motion.h2 variants={itemVariants} className="font-heading text-3xl sm:text-4xl text-primary font-light uppercase tracking-wide leading-tight">
              A Vision of <span className="font-serif italic text-accent font-normal normal-case">Pure Fluidity</span>
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xs text-brand-text/75 tracking-wider leading-relaxed font-body">
              Founded in 2026, Malluk emerged from a singular desire: to liberate women's fashion from structural stiffness and celebrate fluid grace. Drawing inspiration from classic Parisian haute couture, modern architectural minimalism, and the raw beauty of natural textiles, we set out to build a contemporary fashion house that prioritizes both absolute comfort and editorial-level chic.
            </motion.p>
            <motion.p variants={itemVariants} className="text-xs text-brand-text/75 tracking-wider leading-relaxed font-body">
              We design for the modern, multi-faceted woman. Our silhouettes are constructed to transition effortlessly from relaxed lounging to formal evening affairs, capturing attention through subtle details rather than loud displays.
            </motion.p>
          </motion.div>
          <motion.div
            className="lg:col-span-6 aspect-[4/3] overflow-hidden shadow-md border border-primary/5"
            initial={{ opacity: 0, scale: 0.93, x: 30 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src={aboutImage1}
              alt="Atelier sketches and pattern making"
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-[1.5s]"
            />
          </motion.div>
        </div>

        {/* Narrative Block 2 - Split Layout (reversed) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center mb-24">
          <motion.div
            className="lg:col-span-6 lg:order-2 space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.span variants={itemVariants} className="text-[10px] uppercase tracking-[0.2em] text-accent font-semibold block">
              The Craftsmanship
            </motion.span>
            <motion.h2 variants={itemVariants} className="font-heading text-3xl sm:text-4xl text-primary font-light uppercase tracking-wide leading-tight">
              Noble Fibers, <br />
              <span className="font-serif italic text-accent font-normal normal-case">Timeless Integrity</span>
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xs text-brand-text/75 tracking-wider leading-relaxed font-body">
              We believe luxury lies in materiality. We utilize exclusively organic silks from specialized mulberry farms, high-weight satin that cascades beautifully over the skin, and sustainable Mongolian cashmere obtained through ethical combing cooperatives.
            </motion.p>
            <motion.p variants={itemVariants} className="text-xs text-brand-text/75 tracking-wider leading-relaxed font-body">
              Our tailoring is crafted at family-owned workshops in Northern Italy, where artisanal heritage is preserved across generations. Every seam is checked by hand, and every champagne-gold button is individually fastened to guarantee archival longevity.
            </motion.p>
          </motion.div>
          <motion.div
            className="lg:col-span-6 lg:order-1 aspect-[4/3] overflow-hidden shadow-md border border-primary/5"
            initial={{ opacity: 0, scale: 0.93, x: -30 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src={aboutImage2}
              alt="Italian linen tailoring"
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-[1.5s]"
            />
          </motion.div>
        </div>
 
        {/* Narrative Block 3 - Instagram Video Feature */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center mb-24">
          <motion.div
            className="lg:col-span-6 space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.span variants={itemVariants} className="text-[10px] uppercase tracking-[0.2em] text-accent font-semibold block">
              Atelier in Motion
            </motion.span>
            <motion.h2 variants={itemVariants} className="font-heading text-3xl sm:text-4xl text-primary font-light uppercase tracking-wide leading-tight">
              Crafted With <br />
              <span className="font-serif italic text-accent font-normal normal-case">Care & Comfort</span>
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xs text-brand-text/75 tracking-wider leading-relaxed font-body">
              Every detail is meticulously crafted to ensure the finest finish. Watch our designs in motion and discover how we combine traditional Lucknowi embroidery and shisha thread work with breathable Mulmul cotton.
            </motion.p>
            <motion.p variants={itemVariants} className="text-xs text-brand-text/75 tracking-wider leading-relaxed font-body">
              Follow our daily inspirations and announcements on Instagram at <a href="https://www.instagram.com/mallukbykanikaa" target="_blank" rel="noopener noreferrer" className="text-accent font-semibold hover:text-primary transition-colors underline">@mallukbykanikaa</a>.
            </motion.p>
          </motion.div>
          <motion.div
            className="lg:col-span-6 flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="w-full max-w-[340px] aspect-[9/16] overflow-hidden shadow-xl border border-primary/5 bg-white rounded-md p-1 relative">
              <iframe
                src="https://www.youtube.com/embed/UsE7zNbUONA?autoplay=1&mute=1&loop=1&playlist=UsE7zNbUONA"
                title="Atelier in Motion"
                className="w-full h-full rounded-md border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
              {/* Decorative corner accents */}
              <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-accent/40" />
              <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-accent/40" />
              <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-accent/40" />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-accent/40" />
            </div>
          </motion.div>
        </div>

        {/* Values Section */}
        <motion.div
          className="bg-white p-10 sm:p-16 border border-primary/5 shadow-sm relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="absolute inset-0 shimmer-effect pointer-events-none opacity-50" />

          <div className="text-center max-w-xl mx-auto mb-12 relative z-10">
            <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-semibold block mb-2">
              Our Pillars
            </span>
            <h2 className="text-2xl font-light tracking-wide text-primary uppercase">Atelier Values</h2>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center font-body text-xs tracking-wider leading-relaxed relative z-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { num: '1', title: 'Slow Luxury', desc: 'We refuse mass production. We design in small seasonal batches to prevent overproduction and preserve artisanal integrity.' },
              { num: '2', title: 'Absolute Transparency', desc: 'From the Mongolian cooperatives that raise our goats to the Italian workshops that tailors our blazers, we disclose every layer of sourcing.' },
              { num: '3', title: 'Material Focus', desc: 'We use only high-weight, biodegradable, and organic fibers. We avoid synthetic blends, ensuring garments that are gentle on both skin and earth.' },
            ].map((val) => (
              <motion.div key={val.num} className="space-y-3 group" variants={itemVariants}>
                <h3 className="font-heading text-sm text-primary uppercase tracking-widest font-bold group-hover:text-accent transition-colors duration-300">
                  {val.num}. {val.title}
                </h3>
                <p className="text-brand-text/60">{val.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
}

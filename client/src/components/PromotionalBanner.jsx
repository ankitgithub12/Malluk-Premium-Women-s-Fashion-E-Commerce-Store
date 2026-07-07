import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import aboutStoryImage from '../assets/About Section Image/image 2.webp';

export default function PromotionalBanner() {
  return (
    <section className="relative overflow-hidden bg-surface py-20 lg:py-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[550px]">
          
          {/* Left: Editorial Message */}
          <div className="lg:col-span-6 flex flex-col space-y-6 lg:pr-8 py-10">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-[10px] uppercase tracking-[0.25em] text-accent font-semibold block"
            >
              The Atelier Story
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading text-3xl sm:text-4xl lg:text-5xl text-primary font-light uppercase tracking-wide leading-tight"
            >
              Exquisite <span className="font-serif italic text-accent font-normal normal-case">Materiality</span> & Crafted Heritage
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-xs text-brand-text/70 tracking-wider leading-relaxed font-body"
            >
              Every garment at Malluk begins at our design atelier, where sketches are translated into structural masterpieces. We source our organic mulberry silk from sustainable farming communities, and weave our virgin wool at historic Italian mills to offer exceptional hand-feel, structural longevity, and an elegant fluid silhouette.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="pt-4"
            >
              <Link
                to="/about"
                className="group inline-flex items-center gap-3 bg-primary text-white hover:bg-accent hover:text-primary transition-all duration-400 px-8 py-4 text-xs font-semibold uppercase tracking-widest btn-shimmer"
              >
                <span>Read Our Heritage</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </div>

          {/* Right: Immersive Portrait Style Image */}
          <div className="lg:col-span-6 w-full h-full relative flex items-center justify-center py-4">
            <motion.div
              className="w-full aspect-[4/5] max-w-[450px] relative overflow-hidden shadow-xl border border-primary/10"
              initial={{ opacity: 0, scale: 0.92, x: 30 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                src={aboutStoryImage}
                alt="Editorial Craftsmanship"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-[1.5s]"
              />
              
              {/* Gradient border glow */}
              <div className="absolute inset-0 border border-accent/0 group-hover:border-accent/20 transition-colors duration-500" />
              
              {/* Floating Accent card */}
              <motion.div
                className="absolute bottom-6 -left-6 bg-primary text-white p-6 max-w-[220px] shadow-lg hidden sm:block border-l-2 border-accent"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                <span className="text-[8px] tracking-[0.2em] uppercase text-accent font-semibold block mb-1">Sustainable Promise</span>
                <p className="text-[10px] tracking-wider leading-relaxed font-body text-white/80">
                  100% Certified Organic Silks, Biodegradable Flax Linen & Mongolian Cashmere.
                </p>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

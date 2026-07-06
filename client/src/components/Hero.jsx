import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-primary">
      {/* Background Image with Dark Vignette Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1600&auto=format&fit=crop&q=80"
          alt="Malluk Luxury Editorial"
          className="h-full w-full object-cover object-[center_35%] transform scale-102 filter brightness-[0.6] contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-primary/30" />
      </div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-2xl text-white">
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xs uppercase tracking-[0.25em] text-accent font-semibold block mb-4"
          >
            L'Atelier De Couture Parisienne
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="font-heading text-5xl sm:text-6xl md:text-7xl tracking-wide leading-[1.1] mb-6 font-light"
          >
            Fluidity, <br />
            <span className="font-serif italic text-accent font-normal">Grace & Luxury</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xs sm:text-sm tracking-widest leading-relaxed text-white/80 max-w-lg mb-10 font-body"
          >
            Unveil our new Autumn/Winter Edit. Handcrafted silk slip designs, bespoke wool tailoring, and sustainable cashmere spun for the contemporary lifestyle.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              to="/shop"
              className="bg-accent text-primary px-8 py-4 font-semibold tracking-widest text-xs uppercase hover:bg-white hover:text-primary transition-all duration-300 flex items-center justify-center gap-3 group border border-accent"
            >
              <span>Explore The Edit</span>
              <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              to="/collections"
              className="bg-transparent border border-white/30 text-white px-8 py-4 font-semibold tracking-widest text-xs uppercase hover:bg-white hover:text-primary hover:border-white transition-all duration-300 flex items-center justify-center"
            >
              View Lookbooks
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Slide Indicators / Bottom Info */}
      <div className="absolute bottom-10 left-0 w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-[9px] tracking-[0.3em] text-white/40 uppercase font-body">
          <span>EST. 2026</span>
          <div className="flex space-x-6">
            <span className="text-accent font-semibold">01 / AW EDIT</span>
            <span>02 / SILK ROAD</span>
            <span>03 / MONTE CARLO</span>
          </div>
        </div>
      </div>
    </div>
  );
}

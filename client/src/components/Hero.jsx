import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import heroBg from '../assets/New Arrivals Image/Meher Mocha Embroidered Suit Set 1.webp';

export default function Hero() {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 700], [0, 200]);
  const contentY = useTransform(scrollY, [0, 700], [0, -80]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  const headingLine1 = "Fluidity,";
  const headingLine2 = "Grace & Luxury";

  return (
    <div className="relative h-screen w-full overflow-hidden bg-primary">
      {/* Background Image with Ken Burns + Parallax */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <img
          src={heroBg}
          alt="Malluk Luxury Editorial"
          className="h-full w-full object-cover object-[center_35%] ken-burns filter brightness-[0.55] contrast-[1.05]"
          style={{ willChange: 'transform' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-transparent to-primary/30" />
      </motion.div>

      {/* Floating Gold Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-accent/30 rounded-full"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, i % 2 === 0 ? 15 : -15, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Content with Parallax */}
      <motion.div
        className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center"
        style={{ y: contentY, opacity }}
      >
        <div className="max-w-2xl text-white">
          <motion.span
            initial={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xs uppercase tracking-[0.25em] text-accent font-semibold block mb-4"
          >
            L'Atelier De Couture Parisienne
          </motion.span>

          {/* Heading with cascade text reveal */}
          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl tracking-wide leading-[1.1] mb-6 font-light overflow-hidden">
            <span className="block overflow-hidden">
              {headingLine1.split('').map((char, i) => (
                <motion.span
                  key={`l1-${i}`}
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.5 + i * 0.04,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block"
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </span>
            <span className="block overflow-hidden font-serif italic text-accent font-normal">
              {headingLine2.split('').map((char, i) => (
                <motion.span
                  key={`l2-${i}`}
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.9 + i * 0.03,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block"
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="text-xs sm:text-sm tracking-widest leading-relaxed text-white/80 max-w-lg mb-10 font-body"
          >
            Unveil our new Autumn/Winter Edit. Handcrafted silk slip designs, bespoke wool tailoring, and sustainable cashmere spun for the contemporary lifestyle.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.7 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              to="/shop"
              className="group bg-accent text-primary px-8 py-4 font-semibold tracking-widest text-xs uppercase hover:bg-white hover:text-primary transition-all duration-400 flex items-center justify-center gap-3 border border-accent btn-shimmer relative overflow-hidden"
            >
              <span className="relative z-10">Explore The Edit</span>
              <ArrowRight size={14} className="transform group-hover:translate-x-1.5 transition-transform duration-300 relative z-10" />
            </Link>
            
            <Link
              to="/collections"
              className="group bg-transparent border border-white/30 text-white px-8 py-4 font-semibold tracking-widest text-xs uppercase hover:bg-white hover:text-primary hover:border-white transition-all duration-400 flex items-center justify-center btn-glow"
            >
              View Lookbooks
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity }}
      >
        <span className="text-[8px] uppercase tracking-[0.3em] text-white/40 font-body">Scroll to Explore</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={16} className="text-accent/60" />
        </motion.div>
      </motion.div>

      {/* Bottom Info Bar */}
      <motion.div
        className="absolute bottom-10 left-0 w-full px-4 sm:px-6 lg:px-8"
        style={{ opacity }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center text-[9px] tracking-[0.3em] text-white/40 uppercase font-body">
          <span>EST. 2026</span>
          <div className="hidden sm:flex space-x-6">
            <span className="text-accent font-semibold">01 / AW EDIT</span>
            <span>02 / SILK ROAD</span>
            <span>03 / MONTE CARLO</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

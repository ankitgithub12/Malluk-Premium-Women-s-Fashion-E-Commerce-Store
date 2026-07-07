import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { collections } from '../data/products';
import { ArrowRight } from 'lucide-react';

export default function Collections() {
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
            ✦ Atelier Lookbooks ✦
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-wide text-primary uppercase mb-5">
            Curated <span className="font-serif italic font-normal text-accent normal-case">Lookbooks</span>
          </h1>
          <div className="section-ornament mt-5">
            <span className="diamond" />
          </div>
          <p className="text-xs text-brand-text/50 tracking-wider mt-5 leading-relaxed font-body max-w-md mx-auto">
            Exquisite capsule collections crafted from fine silks, cashmere, and tailored wool. Designed with timeless editorial appeal.
          </p>
        </motion.div>

        {/* Collections Stacked Layout */}
        <div className="space-y-24">
          {collections.map((coll, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={coll.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${
                  isEven ? '' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Visual Area */}
                <motion.div
                  className="w-full lg:w-1/2 aspect-[3/4] max-h-[600px] overflow-hidden relative shadow-lg border border-primary/5 bg-surface"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.6 }}
                >
                  <img
                    src={coll.image}
                    alt={coll.name}
                    className="w-full h-full object-cover object-[center_20%] transform hover:scale-105 transition-transform duration-[1.5s]"
                  />
                  <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors duration-500" />
                  
                  {/* Capsule badge */}
                  <motion.div
                    className="absolute top-6 left-6 bg-primary/90 backdrop-blur-sm text-white px-4 py-2"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <span className="text-[9px] uppercase tracking-[0.2em] text-accent font-semibold">
                      Capsule 0{index + 1}
                    </span>
                  </motion.div>
                </motion.div>

                {/* Narrative Area */}
                <motion.div
                  className="w-full lg:w-1/2 flex flex-col space-y-5"
                  initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                >
                  <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-semibold block">
                    Capsule 0{index + 1}
                  </span>
                  
                  <h2 className="font-heading text-3xl sm:text-4xl text-primary font-light uppercase tracking-wide">
                    {coll.name}
                  </h2>
                  
                  <p className="text-xs text-brand-text/75 tracking-wider leading-relaxed font-body">
                    {coll.description} Designed for an effortless drape, these garments translate premium materiality into lightweight structured silhouettes suited for transitions from evening soirees to daytime styling.
                  </p>

                  <div className="pt-4">
                    <Link
                      to={`/shop?collection=${coll.slug}`}
                      className="group inline-flex items-center gap-3 bg-primary text-white hover:bg-accent hover:text-primary transition-all duration-400 px-8 py-4 text-xs font-semibold uppercase tracking-widest btn-shimmer"
                    >
                      <span>Explore Collection Products</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
}

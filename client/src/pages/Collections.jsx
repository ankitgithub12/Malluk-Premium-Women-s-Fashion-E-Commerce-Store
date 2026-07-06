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
    <div className="pt-28 pb-24 bg-brand-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-xl mx-auto mb-20">
          <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-semibold block mb-3">
            Atelier Lookbooks
          </span>
          <h1 className="text-4xl font-light tracking-wide text-primary uppercase mb-4">
            Curated <span className="font-serif italic font-normal text-accent normal-case">Lookbooks</span>
          </h1>
          <div className="h-[1px] w-20 bg-accent/40 mx-auto mt-4" />
          <p className="text-xs text-brand-text/50 tracking-wider mt-4 leading-relaxed font-body">
            Exquisite capsule collections crafted from fine silks, cashmere, and tailored wool. Designed with timeless editorial appeal.
          </p>
        </div>

        {/* Collections Stacked Layout */}
        <div className="space-y-24">
          {collections.map((coll, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={coll.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${
                  isEven ? '' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Visual Area */}
                <div className="w-full lg:w-1/2 aspect-[16/11] sm:aspect-[16/10] overflow-hidden relative shadow-lg border border-primary/5">
                  <img
                    src={coll.image}
                    alt={coll.name}
                    className="w-full h-full object-cover transform hover:scale-103 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-primary/10" />
                </div>

                {/* Narrative Area */}
                <div className="w-full lg:w-1/2 flex flex-col space-y-5">
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
                      className="inline-flex items-center gap-3 bg-primary text-white hover:bg-accent hover:text-primary transition-all duration-300 px-8 py-4 text-xs font-semibold uppercase tracking-widest"
                    >
                      <span>Explore Collection Products</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
}

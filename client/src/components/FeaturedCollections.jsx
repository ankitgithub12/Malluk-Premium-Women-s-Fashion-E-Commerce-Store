import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { collections } from '../data/products';
import { ArrowRight } from 'lucide-react';

export default function FeaturedCollections() {
  return (
    <section className="py-24 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-semibold block mb-3">
            Seasonal Selections
          </span>
          <h2 className="text-3xl md:text-4xl font-light tracking-wide text-primary uppercase">
            Curated <span className="font-serif italic font-normal text-accent normal-case">Collections</span>
          </h2>
          <div className="h-[1px] w-20 bg-accent/40 mx-auto mt-4" />
          <p className="text-xs text-brand-text/50 tracking-wider mt-4 leading-relaxed font-body">
            Explore editorial-grade ensembles designed for exquisite tastes, handcrafted in noble materials.
          </p>
        </div>

        {/* Collection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {collections.map((coll, idx) => (
            <motion.div
              key={coll.id}
              className="relative overflow-hidden aspect-[4/5] sm:aspect-[16/10] md:aspect-[4/3] group shadow-sm"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
            >
              {/* Image with zoom effect */}
              <div className="absolute inset-0">
                <img
                  src={coll.image}
                  alt={coll.name}
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 filter brightness-[0.7] contrast-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Text / Actions Layer */}
              <div className="absolute inset-0 p-8 sm:p-12 flex flex-col justify-end text-white">
                <span className="text-[9px] uppercase tracking-[0.25em] text-accent font-semibold mb-2">
                  Atelier Lookbook
                </span>
                
                <h3 className="font-heading text-2xl sm:text-3xl tracking-wide uppercase font-light mb-3">
                  {coll.name}
                </h3>
                
                <p className="text-xs text-white/70 max-w-md tracking-wider leading-relaxed mb-6 font-body opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  {coll.description}
                </p>

                <div>
                  <Link
                    to={`/shop?collection=${coll.slug}`}
                    className="inline-flex items-center gap-2 text-xs uppercase font-semibold tracking-widest text-accent hover:text-white transition-colors duration-300"
                  >
                    <span>Discover Collection</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

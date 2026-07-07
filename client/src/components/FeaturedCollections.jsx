import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { collections } from '../data/products';
import { ArrowRight } from 'lucide-react';

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

export default function FeaturedCollections() {
  return (
    <section className="py-24 bg-brand-bg relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/3 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with reveal */}
        <motion.div
          className="text-center max-w-xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-semibold block mb-3">
            Seasonal Selections
          </span>
          <h2 className="text-3xl md:text-4xl font-light tracking-wide text-primary uppercase">
            Curated <span className="font-serif italic font-normal text-accent normal-case">Collections</span>
          </h2>
          <div className="section-ornament mt-4">
            <span className="diamond" />
          </div>
          <p className="text-xs text-brand-text/50 tracking-wider mt-4 leading-relaxed font-body">
            Explore editorial-grade ensembles designed for exquisite tastes, handcrafted in noble materials.
          </p>
        </motion.div>

        {/* Collection Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {collections.map((coll, idx) => (
            <motion.div
              key={coll.id}
              className="relative overflow-hidden aspect-[3/4] group premium-card bg-surface"
              variants={cardVariants}
            >
              {/* Image with zoom effect */}
              <div className="absolute inset-0">
                <img
                  src={coll.image}
                  alt={coll.name}
                  className="w-full h-full object-cover object-[center_20%] transition-transform duration-[1.5s] ease-out group-hover:scale-110 filter brightness-[0.75] contrast-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Shimmer overlay on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-r from-transparent via-white/5 to-transparent" />

              {/* Text / Actions Layer */}
              <div className="absolute inset-0 p-8 sm:p-12 flex flex-col justify-end text-white">
                <motion.span
                  className="text-[9px] uppercase tracking-[0.25em] text-accent font-semibold mb-2"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  Atelier Lookbook
                </motion.span>
                
                <h3 className="font-heading text-2xl sm:text-3xl tracking-wide uppercase font-light mb-3 group-hover:text-accent transition-colors duration-500">
                  {coll.name}
                </h3>
                
                <p className="text-xs text-white/70 max-w-md tracking-wider leading-relaxed mb-6 font-body opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  {coll.description}
                </p>

                <div>
                  <Link
                    to={`/shop?collection=${coll.slug}`}
                    className="inline-flex items-center gap-2 text-xs uppercase font-semibold tracking-widest text-accent hover:text-white transition-colors duration-300 group/link"
                  >
                    <span>Discover Collection</span>
                    <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { products } from '../data/products';
import ProductCard from './ProductCard';
import { ArrowRight } from 'lucide-react';

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
  }
};

export default function BestSellers() {
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);

  return (
    <section className="py-24 bg-brand-bg relative overflow-hidden">
      {/* Decorative element */}
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-accent/3 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          className="text-center max-w-xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-semibold block mb-3">
            Atelier Icons
          </span>
          <h2 className="text-3xl md:text-4xl font-light tracking-wide text-primary uppercase">
            Best <span className="font-serif italic font-normal text-accent normal-case">Sellers</span>
          </h2>
          <div className="section-ornament mt-4">
            <span className="diamond" />
          </div>
          <p className="text-xs text-brand-text/50 tracking-wider mt-4 leading-relaxed font-body">
            Time-tested silhouettes loved by the global Malluk clientele, tailored for effortless luxury.
          </p>
        </motion.div>

        {/* Product Grid with stagger */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {bestSellers.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

        {/* View All CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link
            to="/shop"
            className="inline-flex items-center gap-3 border border-primary/20 bg-white hover:border-accent hover:bg-primary hover:text-white px-10 py-4 text-xs font-semibold uppercase tracking-widest text-primary transition-all duration-400 btn-glow group"
          >
            <span>Explore Entire Shop</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}

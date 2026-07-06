import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from './ProductCard';
import { ArrowRight } from 'lucide-react';

export default function BestSellers() {
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);

  return (
    <section className="py-24 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-semibold block mb-3">
            Atelier Icons
          </span>
          <h2 className="text-3xl md:text-4xl font-light tracking-wide text-primary uppercase">
            Best <span className="font-serif italic font-normal text-accent normal-case">Sellers</span>
          </h2>
          <div className="h-[1px] w-20 bg-accent/40 mx-auto mt-4" />
          <p className="text-xs text-brand-text/50 tracking-wider mt-4 leading-relaxed font-body">
            Time-tested silhouettes loved by the global Malluk clientele, tailored for effortless luxury.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-16 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-3 border border-primary/20 bg-white hover:border-accent hover:bg-primary hover:text-white px-10 py-4 text-xs font-semibold uppercase tracking-widest text-primary transition-all duration-300"
          >
            <span>Explore Entire Shop</span>
            <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </section>
  );
}

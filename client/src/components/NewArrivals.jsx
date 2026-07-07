import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { products } from '../data/products';
import ProductCard from './ProductCard';

export default function NewArrivals() {
  const carouselRef = useRef(null);
  const newArrivals = products.filter(p => p.isNewArrival);

  const scroll = (direction) => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const scrollAmount = clientWidth * 0.75;
      const targetScroll = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      carouselRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-24 bg-white border-y border-surface relative overflow-hidden">
      {/* Decorative gradient blob */}
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Left/Right Arrows */}
        <motion.div
          className="flex justify-between items-end mb-12"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-semibold block mb-2">
              L'Atelier Arrivals
            </span>
            <h2 className="text-3xl font-light tracking-wide text-primary uppercase">
              New <span className="font-serif italic font-normal text-accent normal-case">Arrivals</span>
            </h2>
          </div>
          
          <div className="flex space-x-3">
            <motion.button
              onClick={() => scroll('left')}
              className="p-3 border border-surface rounded-full hover:border-accent hover:text-accent transition-all duration-300 bg-brand-bg text-primary"
              aria-label="Previous Slide"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft size={16} />
            </motion.button>
            <motion.button
              onClick={() => scroll('right')}
              className="p-3 border border-surface rounded-full hover:border-accent hover:text-accent transition-all duration-300 bg-brand-bg text-primary"
              aria-label="Next Slide"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight size={16} />
            </motion.button>
          </div>
        </motion.div>

        {/* Carousel Container */}
        <div 
          ref={carouselRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 no-scrollbar pb-6 scroll-smooth"
        >
          {newArrivals.map((product, idx) => (
            <motion.div
              key={product.id}
              className="w-[280px] sm:w-[320px] md:w-[350px] flex-shrink-0 snap-start"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

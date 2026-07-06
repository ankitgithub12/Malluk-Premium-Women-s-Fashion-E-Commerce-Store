import React, { useRef, useContext } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
    <section className="py-24 bg-white border-y border-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Left/Right Arrows */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-semibold block mb-2">
              L'Atelier Arrivals
            </span>
            <h2 className="text-3xl font-light tracking-wide text-primary uppercase">
              New <span className="font-serif italic font-normal text-accent normal-case">Arrivals</span>
            </h2>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={() => scroll('left')}
              className="p-3 border border-surface rounded-full hover:border-accent hover:text-accent transition-colors duration-300 bg-brand-bg text-primary"
              aria-label="Previous Slide"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 border border-surface rounded-full hover:border-accent hover:text-accent transition-colors duration-300 bg-brand-bg text-primary"
              aria-label="Next Slide"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div 
          ref={carouselRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 no-scrollbar pb-6 scroll-smooth"
        >
          {newArrivals.map((product) => (
            <div 
              key={product.id} 
              className="w-[280px] sm:w-[320px] md:w-[350px] flex-shrink-0 snap-start"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

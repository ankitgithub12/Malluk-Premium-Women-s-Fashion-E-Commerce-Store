import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { testimonials } from '../data/products';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[activeIndex];

  return (
    <section className="py-24 bg-brand-bg relative overflow-hidden">
      {/* Decorative quotes graphic in background */}
      <div className="absolute top-10 left-10 text-surface opacity-30 select-none hidden md:block">
        <Quote size={200} strokeWidth={0.5} />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Section Header */}
        <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-semibold block mb-3">
          Client Diaries
        </span>
        <h2 className="text-3xl font-light tracking-wide text-primary uppercase mb-12">
          Voices of <span className="font-serif italic font-normal text-accent normal-case">Elegance</span>
        </h2>

        {/* Carousel Testimonial Area */}
        <div className="min-h-[250px] flex flex-col justify-center items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center space-y-6"
            >
              {/* Rating stars */}
              <div className="flex text-accent space-x-1 justify-center">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="#C8A96A" strokeWidth={1} />
                ))}
              </div>

              {/* Quote text */}
              <p className="font-heading text-lg sm:text-xl md:text-2xl italic tracking-wide text-primary leading-relaxed max-w-2xl mx-auto">
                "{current.text}"
              </p>

              {/* Avatar and Name */}
              <div className="flex items-center space-x-3 pt-4">
                <img
                  src={current.avatar}
                  alt={current.name}
                  className="w-12 h-12 rounded-full object-cover border border-accent/20"
                />
                <div className="text-left">
                  <h4 className="font-heading text-sm uppercase tracking-widest text-primary font-semibold">
                    {current.name}
                  </h4>
                  <span className="text-[10px] tracking-widest text-brand-text/50 font-body block uppercase">
                    {current.location}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation triggers */}
        <div className="flex justify-center space-x-6 mt-10">
          <button
            onClick={handlePrev}
            className="p-2.5 border border-primary/10 rounded-full hover:border-accent hover:text-accent transition-colors duration-300 text-primary bg-white"
            aria-label="Previous Review"
          >
            <ChevronLeft size={14} />
          </button>

          <div className="flex items-center space-x-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeIndex === idx ? 'w-6 bg-accent' : 'w-1.5 bg-primary/20'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-2.5 border border-primary/10 rounded-full hover:border-accent hover:text-accent transition-colors duration-300 text-primary bg-white"
            aria-label="Next Review"
          >
            <ChevronRight size={14} />
          </button>
        </div>

      </div>
    </section>
  );
}

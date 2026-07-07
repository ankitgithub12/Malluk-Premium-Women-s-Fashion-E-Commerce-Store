import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { testimonials } from '../data/products';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-play
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

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
      <motion.div
        className="absolute top-10 left-10 text-surface opacity-20 select-none hidden md:block"
        animate={{ rotate: [0, 5, 0, -5, 0], y: [0, -10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      >
        <Quote size={200} strokeWidth={0.5} />
      </motion.div>

      <motion.div
        className="absolute bottom-10 right-10 text-surface opacity-10 select-none hidden md:block"
        animate={{ rotate: [0, -5, 0, 5, 0], y: [0, 10, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      >
        <Quote size={120} strokeWidth={0.5} />
      </motion.div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-semibold block mb-3">
            Client Diaries
          </span>
          <h2 className="text-3xl font-light tracking-wide text-primary uppercase mb-12">
            Voices of <span className="font-serif italic font-normal text-accent normal-case">Elegance</span>
          </h2>
        </motion.div>

        {/* Carousel Testimonial Area */}
        <div className="min-h-[280px] flex flex-col justify-center items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 25, scale: 0.97, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -25, scale: 0.97, filter: 'blur(4px)' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center space-y-6"
            >
              {/* Rating stars */}
              <div className="flex text-accent space-x-1 justify-center">
                {[...Array(current.rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 + i * 0.08, duration: 0.4, type: 'spring' }}
                  >
                    <Star size={16} fill="#C8A96A" strokeWidth={1} />
                  </motion.div>
                ))}
              </div>

              {/* Quote text */}
              <p className="font-heading text-lg sm:text-xl md:text-2xl italic tracking-wide text-primary leading-relaxed max-w-2xl mx-auto">
                "{current.text}"
              </p>

              {/* Avatar and Name */}
              <div className="flex items-center space-x-3 pt-4">
                <motion.img
                  src={current.avatar}
                  alt={current.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-accent/30"
                  whileHover={{ scale: 1.1 }}
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
          <motion.button
            onClick={handlePrev}
            className="p-2.5 border border-primary/10 rounded-full hover:border-accent hover:text-accent transition-colors duration-300 text-primary bg-white"
            aria-label="Previous Review"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft size={14} />
          </motion.button>

          <div className="flex items-center space-x-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`rounded-full transition-all duration-500 ${
                  activeIndex === idx ? 'w-8 h-1.5 bg-accent' : 'w-1.5 h-1.5 bg-primary/20 hover:bg-accent/50'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <motion.button
            onClick={handleNext}
            className="p-2.5 border border-primary/10 rounded-full hover:border-accent hover:text-accent transition-colors duration-300 text-primary bg-white"
            aria-label="Next Review"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight size={14} />
          </motion.button>
        </div>

      </div>
    </section>
  );
}

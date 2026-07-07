import React, { useState, useEffect } from 'react';
import { Plus, Minus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { faqData } from '../data/products';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleFAQ = (index) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <div className="pt-44 sm:pt-48 pb-24 bg-brand-bg min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-accent font-semibold block mb-4">
            ✦ Concierge Help ✦
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-wide text-primary uppercase mb-5">
            Frequently Asked <span className="font-serif italic font-normal text-accent normal-case">Questions</span>
          </h1>
          <div className="section-ornament mt-5">
            <span className="diamond" />
          </div>
          <p className="text-xs text-brand-text/50 tracking-wider mt-5 leading-relaxed font-body max-w-md mx-auto">
            Everything you need to know about ordering, delivery, and our atelier services.
          </p>
        </motion.div>

        {/* FAQs accordions */}
        <motion.div
          className="bg-white border border-primary/5 shadow-sm p-6 sm:p-10 divide-y divide-surface mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {faqData.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                className="py-5 first:pt-0 last:pb-0"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between text-left focus:outline-none group"
                >
                  <span className={`font-heading text-base md:text-lg tracking-wide font-semibold pr-4 transition-colors duration-300 ${isOpen ? 'text-accent' : 'text-primary group-hover:text-accent'}`}>
                    {faq.question}
                  </span>
                  <motion.span
                    className="p-1.5 bg-surface text-accent rounded-full flex-shrink-0"
                    animate={{ rotate: isOpen ? 180 : 0, backgroundColor: isOpen ? 'rgba(200,169,106,0.15)' : 'rgba(243,238,232,1)' }}
                    transition={{ duration: 0.3 }}
                  >
                    {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                  </motion.span>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 text-xs text-brand-text/75 tracking-wider leading-relaxed font-body pl-1 border-l-2 border-accent/30 ml-1 pl-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Still Need Assistance Area */}
        <motion.div
          className="text-center bg-primary text-white p-10 sm:p-12 border-l-2 border-accent relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Decorative shimmer */}
          <div className="absolute inset-0 shimmer-effect pointer-events-none" />

          <span className="text-[9px] uppercase tracking-[0.25em] text-accent font-semibold block mb-2 relative z-10">
            Further Assistance
          </span>
          
          <h3 className="font-heading text-xl md:text-2xl font-light uppercase tracking-wide mb-4 relative z-10">
            Still Have Questions?
          </h3>
          
          <p className="text-xs text-white/60 tracking-wider leading-relaxed font-body max-w-md mx-auto mb-8 relative z-10">
            Our luxury support styling team is here to assist you with customized styling consultations or returns collection.
          </p>

          <Link
            to="/contact"
            className="relative z-10 inline-flex items-center gap-3 bg-accent text-primary hover:bg-white hover:text-primary transition-all duration-400 px-8 py-4 text-xs font-semibold uppercase tracking-widest btn-shimmer group"
          >
            <span>Contact Styling Desk</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>

      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Plus, Minus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
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
    <div className="pt-28 pb-24 bg-brand-bg min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-semibold block mb-3">
            Concierge Help
          </span>
          <h1 className="text-4xl font-light tracking-wide text-primary uppercase mb-4">
            Frequently Asked <span className="font-serif italic font-normal text-accent normal-case">Questions</span>
          </h1>
          <div className="h-[1px] w-20 bg-accent/40 mx-auto mt-4" />
        </div>

        {/* FAQs accordions */}
        <div className="bg-white border border-primary/5 shadow-sm p-6 sm:p-10 divide-y divide-surface mb-12">
          {faqData.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="py-5 first:pt-0 last:pb-0">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="font-heading text-base md:text-lg text-primary tracking-wide font-semibold pr-4">
                    {faq.question}
                  </span>
                  <span className="p-1 bg-surface text-accent rounded-full transition-transform duration-300">
                    {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                  </span>
                </button>

                {isOpen && (
                  <div className="mt-4 text-xs text-brand-text/75 tracking-wider leading-relaxed font-body pl-1 animate-fade-up">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Need Assistance Area */}
        <div className="text-center bg-primary text-white p-10 sm:p-12 border-l-2 border-accent">
          <span className="text-[9px] uppercase tracking-[0.25em] text-accent font-semibold block mb-2">
            Further Assistance
          </span>
          
          <h3 className="font-heading text-xl md:text-2xl font-light uppercase tracking-wide mb-4">
            Still Have Questions?
          </h3>
          
          <p className="text-xs text-white/60 tracking-wider leading-relaxed font-body max-w-md mx-auto mb-8">
            Our luxury support styling team is here to assist you with customized styling consultations or returns collection.
          </p>

          <Link
            to="/contact"
            className="inline-flex items-center gap-3 bg-accent text-primary hover:bg-white hover:text-primary transition-all duration-300 px-8 py-4 text-xs font-semibold uppercase tracking-widest"
          >
            <span>Contact Styling Desk</span>
            <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </div>
  );
}

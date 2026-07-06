import React from 'react';
import { Compass, Sparkles, Shield, Gift } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WhyChooseMalluk() {
  const valueProps = [
    {
      icon: <Sparkles size={24} strokeWidth={1} />,
      title: "Bespoke Design",
      desc: "Every drape and stitch is modeled extensively at our Parisian atelier to optimize fluidity and grace."
    },
    {
      icon: <Compass size={24} strokeWidth={1} />,
      title: "Noble Materials",
      desc: "Sourced directly from certified organic farms, local combing cooperatives, and historic weavers in Italy."
    },
    {
      icon: <Shield size={24} strokeWidth={1} />,
      title: "Concierge Quality",
      desc: "Our garments undergo meticulous hand-finishing and inspection, packaged in customized gift boxes."
    },
    {
      icon: <Gift size={24} strokeWidth={1} />,
      title: "Conscious Luxury",
      desc: "We commit to zero carbon offset delivery, low-impact organic dyes, and humane livestock treatments."
    }
  ];

  return (
    <section className="py-24 bg-white border-b border-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-semibold block mb-3">
            Our Commitments
          </span>
          <h2 className="text-3xl font-light tracking-wide text-primary uppercase">
            Why Choose <span className="font-serif italic font-normal text-accent normal-case">Malluk</span>
          </h2>
          <div className="h-[1px] w-20 bg-accent/40 mx-auto mt-4" />
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          {valueProps.map((prop, idx) => (
            <motion.div
              key={idx}
              className="flex flex-col items-center space-y-4 p-4 hover:shadow-lg hover:shadow-surface/40 transition-all duration-300 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              {/* Icon Container */}
              <div className="p-5 bg-surface text-accent rounded-full border border-accent/15 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                {prop.icon}
              </div>

              {/* Title & Desc */}
              <h3 className="font-heading text-lg tracking-wide uppercase text-primary font-semibold">
                {prop.title}
              </h3>
              
              <p className="text-xs text-brand-text/60 tracking-wider leading-relaxed font-body max-w-[220px]">
                {prop.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

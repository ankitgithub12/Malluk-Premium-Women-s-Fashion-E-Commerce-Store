import React from 'react';
import { Compass, Sparkles, Shield, Gift } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
  }
};

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
    <section className="py-24 bg-white border-b border-surface relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/3 rounded-full blur-3xl -translate-y-1/2" />

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
            Our Commitments
          </span>
          <h2 className="text-3xl font-light tracking-wide text-primary uppercase">
            Why Choose <span className="font-serif italic font-normal text-accent normal-case">Malluk</span>
          </h2>
          <div className="section-ornament mt-4">
            <span className="diamond" />
          </div>
        </motion.div>

        {/* Values Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {valueProps.map((prop, idx) => (
            <motion.div
              key={idx}
              className="flex flex-col items-center space-y-4 p-6 group cursor-default relative"
              variants={cardVariants}
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {/* Hover background glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Icon Container */}
              <motion.div
                className="p-5 bg-surface text-accent rounded-full border border-accent/15 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-500 relative z-10"
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                {prop.icon}
              </motion.div>

              {/* Title & Desc */}
              <h3 className="font-heading text-lg tracking-wide uppercase text-primary font-semibold relative z-10">
                {prop.title}
              </h3>
              
              <p className="text-xs text-brand-text/60 tracking-wider leading-relaxed font-body max-w-[220px] relative z-10">
                {prop.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

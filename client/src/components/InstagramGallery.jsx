import React from 'react';
import { motion } from 'framer-motion';
import { instagramPosts } from '../data/products';
import { Heart } from 'lucide-react';

const InstagramIcon = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 20 },
  visible: {
    opacity: 1, scale: 1, y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

export default function InstagramGallery() {
  return (
    <section className="py-24 bg-white border-b border-surface relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          className="text-center max-w-xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-semibold block mb-3">
            Social Editorial
          </span>
          <h2 className="text-3xl font-light tracking-wide text-primary uppercase">
            Shop The <span className="font-serif italic font-normal text-accent normal-case">Gram</span>
          </h2>
          <div className="section-ornament mt-4">
            <span className="diamond" />
          </div>
          <p className="text-xs text-brand-text/50 tracking-wider mt-4 leading-relaxed font-body">
            Tag <span className="text-primary font-bold">#MallukAtelier</span> on Instagram to showcase your curated silhouettes.
          </p>
        </motion.div>

        {/* Gallery Grid with stagger */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {instagramPosts.map((post) => (
            <motion.a
              key={post.id}
              href={post.link || "https://www.instagram.com/mallukbykanikaa"}
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden aspect-square group"
              variants={itemVariants}
              whileHover={{ scale: 1.03, zIndex: 10 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {/* Post Image */}
              <img
                src={post.image}
                alt="Instagram post"
                className="w-full h-full object-cover transform transition-transform duration-[1s] group-hover:scale-110"
                loading="lazy"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-primary/75 opacity-0 group-hover:opacity-100 transition-all duration-400 flex flex-col justify-center items-center text-white gap-2 backdrop-blur-[2px]">
                <motion.div
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                >
                  <InstagramIcon size={22} className="text-accent" />
                </motion.div>
                <div className="flex items-center gap-1.5 text-[10px] font-semibold tracking-wider font-body">
                  <Heart size={10} fill="#C8A96A" strokeWidth={0} />
                  <span>{post.likes}</span>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

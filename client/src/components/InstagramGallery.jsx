import React from 'react';
import { instagramPosts } from '../data/products';
import { Heart } from 'lucide-react';

const InstagramIcon = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function InstagramGallery() {
  return (
    <section className="py-24 bg-white border-b border-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-semibold block mb-3">
            Social Editorial
          </span>
          <h2 className="text-3xl font-light tracking-wide text-primary uppercase">
            Shop The <span className="font-serif italic font-normal text-accent normal-case">Gram</span>
          </h2>
          <div className="h-[1px] w-20 bg-accent/40 mx-auto mt-4" />
          <p className="text-xs text-brand-text/50 tracking-wider mt-4 leading-relaxed font-body">
            Tag <span className="text-primary font-bold">#MallukAtelier</span> on Instagram to showcase your curated silhouettes.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {instagramPosts.map((post) => (
            <a
              key={post.id}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden aspect-square group shadow-sm"
            >
              {/* Post Image */}
              <img
                src={post.image}
                alt="Instagram post"
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-primary/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white gap-2">
                <InstagramIcon size={20} className="text-accent" />
                <div className="flex items-center gap-1.5 text-[10px] font-semibold tracking-wider font-body">
                  <Heart size={10} fill="#C8A96A" strokeWidth={0} />
                  <span>{post.likes}</span>
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}

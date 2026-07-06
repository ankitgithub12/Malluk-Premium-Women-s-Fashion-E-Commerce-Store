import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, Eye, ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { ShopContext } from '../context/ShopContext';

export default function ProductCard({ product }) {
  const { toggleWishlist, isInWishlist, addToCart, openQuickView } = useContext(ShopContext);
  const [isHovered, setIsHovered] = useState(false);
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  const favorited = isInWishlist(product.id);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, product.sizes[0], product.colors[0], 1);
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(product);
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleNextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImgIndex((prev) => (prev + 1) % product.images.length);
  };

  const handlePrevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImgIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const activeImage = product.images[activeImgIndex] || product.images[0];

  return (
    <motion.div 
      className="group relative flex flex-col bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 ease-out"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
    >
      {/* Product Image Area */}
      <div className="relative overflow-hidden aspect-[3/4] bg-surface">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={activeImage}
            alt={product.name}
            className="w-full h-full object-cover object-center transform transition-transform duration-1000 ease-out group-hover:scale-105"
            loading="lazy"
          />
        </Link>

        {/* Prev & Next Image Navigation */}
        {product.images.length > 1 && (
          <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex justify-between z-10 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <button
              onClick={handlePrevImage}
              className="p-1.5 rounded-full bg-white/90 text-primary border border-white/20 hover:bg-primary hover:text-accent transition-all duration-300 shadow-md pointer-events-auto"
              aria-label="Previous Image"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={handleNextImage}
              className="p-1.5 rounded-full bg-white/90 text-primary border border-white/20 hover:bg-primary hover:text-accent transition-all duration-300 shadow-md pointer-events-auto"
              aria-label="Next Image"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* Discount Badge */}
        {product.discount > 0 && (
          <span className="absolute top-4 left-4 bg-primary text-white text-[9px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-none border border-accent/20">
            {product.discount}% OFF
          </span>
        )}

        {/* Wishlist Button (Top Right) */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all duration-350 shadow-sm border
            ${favorited 
              ? 'bg-primary text-accent border-accent/50' 
              : 'bg-white/80 text-primary border-white/10 hover:bg-primary hover:text-white'
            }`}
          aria-label={favorited ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          <Heart size={16} fill={favorited ? "#C8A96A" : "none"} strokeWidth={1.5} />
        </button>

        {/* Quick Actions Panel (Slide Up from Bottom on Hover) */}
        <div className="absolute bottom-0 left-0 w-full p-4 flex flex-col gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out bg-gradient-to-t from-primary/80 via-primary/40 to-transparent">
          <button
            onClick={handleQuickView}
            className="w-full bg-white/95 text-primary text-xs uppercase font-medium tracking-widest py-3 px-4 hover:bg-accent hover:text-primary transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Eye size={14} />
            Quick View
          </button>
          
          <button
            onClick={handleQuickAdd}
            className="w-full bg-primary text-white text-xs uppercase font-medium tracking-widest py-3 px-4 hover:bg-accent hover:text-primary transition-all duration-300 flex items-center justify-center gap-2 border border-accent/10"
          >
            <ShoppingBag size={14} />
            Quick Add
          </button>
        </div>
      </div>

      {/* Info Area */}
      <div className="p-5 flex flex-col flex-1 bg-white">
        <span className="text-[10px] text-accent uppercase tracking-widest font-semibold mb-1">
          {product.category}
        </span>
        
        <h3 className="font-heading text-lg text-primary tracking-wide mb-2 hover:text-accent transition-colors duration-300 font-medium">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>

        {/* Rating & Price */}
        <div className="flex justify-between items-center mt-auto pt-2 border-t border-surface">
          <div className="flex items-center space-x-1">
            <div className="flex text-accent">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  fill={i < Math.floor(product.rating) ? "#C8A96A" : "none"}
                  strokeWidth={1.5}
                />
              ))}
            </div>
            <span className="text-[10px] tracking-wider text-brand-text/50">
              ({product.rating.toFixed(1)})
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {product.discount > 0 && (
              <span className="text-xs line-through text-brand-text/40">
                ₹{product.originalPrice}
              </span>
            )}
            <span className="text-sm font-semibold tracking-wide text-primary">
              ₹{product.price}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

import React, { useState, useContext, useEffect } from 'react';
import { X, Heart, Star, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShopContext } from '../context/ShopContext';

export default function QuickViewModal() {
  const { isQuickViewOpen, closeQuickView, quickViewProduct, addToCart, toggleWishlist, isInWishlist } = useContext(ShopContext);

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [errorMsg, setErrorMsg] = useState('');

  // Reset local state when product changes
  useEffect(() => {
    if (quickViewProduct) {
      setSelectedSize(quickViewProduct.sizes[0] || '');
      setSelectedColor(quickViewProduct.colors[0] || null);
      setActiveImageIndex(0);
      setQuantity(1);
      setErrorMsg('');
    }
  }, [quickViewProduct]);

  if (!isQuickViewOpen || !quickViewProduct) return null;

  const product = quickViewProduct;
  const isFavorite = isInWishlist(product.id);

  const handleWhatsAppOrder = () => {
    if (!selectedSize) {
      setErrorMsg('Please select a size');
      return;
    }
    if (!selectedColor) {
      setErrorMsg('Please select a color');
      return;
    }
    setErrorMsg('');
    const text = `Hello Malluk, I would like to order:\n- Product: ${product.name}\n- Size: ${selectedSize}\n- Color: ${selectedColor.name}\n- Price: ₹${product.price}\n- Quantity: ${quantity}`;
    const url = `https://wa.me/918264446457?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    closeQuickView();
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      setErrorMsg('Please select a size');
      return;
    }
    if (!selectedColor) {
      setErrorMsg('Please select a color');
      return;
    }
    setErrorMsg('');
    addToCart(product, selectedSize, selectedColor, quantity);
    closeQuickView();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeQuickView}
          className="fixed inset-0 bg-primary/60 backdrop-blur-md"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ cubicBezier: [0.16, 1, 0.3, 1], duration: 0.6 }}
          className="relative bg-brand-bg w-full max-w-4xl shadow-2xl border border-primary/10 overflow-hidden flex flex-col md:flex-row z-10 max-h-[90vh] md:max-h-none"
        >
          {/* Close button */}
          <button
            onClick={closeQuickView}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-primary hover:text-white transition-all duration-300"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          {/* Left: Product Images */}
          <div className="w-full md:w-1/2 flex flex-col bg-surface h-[300px] md:h-auto min-h-[300px]">
            <div className="relative flex-1 overflow-hidden">
              <img
                src={product.images[activeImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-all duration-750"
              />
              {product.discount > 0 && (
                <span className="absolute top-4 left-4 bg-primary text-white text-[9px] font-semibold uppercase tracking-widest px-2.5 py-1">
                  SAVE {product.discount}%
                </span>
              )}
            </div>

            {/* Thumbnail Navigation */}
            {product.images.length > 1 && (
              <div className="flex border-t border-primary/10 bg-white p-2 gap-2">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`relative w-16 h-20 overflow-hidden border ${
                      activeImageIndex === index ? 'border-accent' : 'border-transparent hover:border-accent/40'
                    } transition-colors`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[50vh] md:max-h-[600px]">
            <div>
              <span className="text-[10px] text-accent uppercase tracking-widest font-semibold mb-1 block">
                {product.category}
              </span>
              
              <h2 className="font-heading text-2xl md:text-3xl text-primary font-medium tracking-wide mb-3">
                {product.name}
              </h2>

              {/* Price and Ratings */}
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-surface">
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-semibold text-primary font-body">₹{product.price}</span>
                  {product.discount > 0 && (
                    <span className="text-sm line-through text-brand-text/40 font-body">₹{product.originalPrice}</span>
                  )}
                </div>

                <div className="flex items-center space-x-1">
                  <div className="flex text-accent">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        fill={i < Math.floor(product.rating) ? "#C8A96A" : "none"}
                        strokeWidth={1.5}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-brand-text/50 font-body">({product.rating})</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-brand-text/80 leading-relaxed font-body mb-3">
                {product.description}
              </p>

              {/* COD Terms Badge */}
              {product.codTerms && (
                <div className="inline-block bg-accent/10 border border-accent/20 px-3 py-1.5 text-[9px] text-primary font-semibold uppercase tracking-wider mb-6">
                  🛍️ {product.codTerms}
                </div>
              )}

              {/* Colors selection */}
              <div className="mb-6">
                <h4 className="text-[10px] uppercase tracking-widest font-semibold text-primary mb-3">
                  Color: <span className="text-brand-text/60 normal-case font-normal">{selectedColor?.name}</span>
                </h4>
                <div className="flex space-x-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all ${
                        selectedColor?.name === color.name ? 'border-accent scale-110 shadow-sm' : 'border-transparent hover:scale-105'
                      }`}
                      title={color.name}
                    >
                      <span className="w-5 h-5 rounded-full block border border-black/10" style={{ backgroundColor: color.hex }} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Sizes selection */}
              <div className="mb-6">
                <h4 className="text-[10px] uppercase tracking-widest font-semibold text-primary mb-3">
                  Size: <span className="text-brand-text/60 normal-case font-normal">{selectedSize}</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => {
                        setSelectedSize(size);
                        setErrorMsg('');
                      }}
                      className={`px-4 py-2 border text-xs tracking-wider font-body transition-all duration-300 ${
                        selectedSize === size
                          ? 'border-primary bg-primary text-white'
                          : 'border-surface hover:border-primary/50 text-primary'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <h4 className="text-[10px] uppercase tracking-widest font-semibold text-primary mb-3">Quantity</h4>
                <div className="inline-flex border border-surface bg-white">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-1 text-primary hover:bg-surface text-sm font-semibold"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 text-xs font-body flex items-center justify-center font-medium min-w-[40px]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-1 text-primary hover:bg-surface text-sm font-semibold"
                  >
                    +
                  </button>
                </div>
              </div>

              {errorMsg && (
                <p className="text-xs text-red-700 font-semibold mb-4 animate-pulse">{errorMsg}</p>
              )}
            </div>

            {/* Actions Panel */}
            <div className="flex flex-col gap-3 pt-4 border-t border-surface w-full">
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-primary text-white py-4 px-6 uppercase text-xs font-semibold tracking-widest hover:bg-accent hover:text-primary transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <ShoppingBag size={16} />
                  <span>Add to Bag</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-4 border transition-all duration-300 ${
                    isFavorite 
                      ? 'border-accent bg-primary text-accent' 
                      : 'border-surface hover:border-primary/50 hover:bg-surface text-primary'
                  }`}
                  aria-label="Toggle wishlist"
                >
                  <Heart size={16} fill={isFavorite ? "#C8A96A" : "none"} />
                </button>
              </div>

              <button
                onClick={handleWhatsAppOrder}
                className="w-full border border-primary text-primary py-4 px-6 uppercase text-xs font-semibold tracking-widest hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center gap-3"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                <span>Order on WhatsApp</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

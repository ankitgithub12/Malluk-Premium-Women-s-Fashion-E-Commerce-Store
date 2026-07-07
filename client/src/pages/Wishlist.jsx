import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { ShopContext } from '../context/ShopContext';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
};

export default function Wishlist() {
  const { wishlistItems, toggleWishlist, addToCart } = useContext(ShopContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleQuickAdd = (product) => {
    addToCart(product, product.sizes[0], product.colors[0], 1);
    toggleWishlist(product); // Remove from wishlist on quick add
  };

  return (
    <div className="pt-44 sm:pt-48 pb-24 bg-brand-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-accent font-semibold block mb-4">
            ✦ Saved Pieces ✦
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-wide text-primary uppercase mb-5">
            Your <span className="font-serif italic font-normal text-accent normal-case">Wishlist</span>
          </h1>
          <div className="section-ornament mt-5">
            <span className="diamond" />
          </div>
          <p className="text-xs text-brand-text/50 tracking-wider mt-5 leading-relaxed font-body max-w-md mx-auto">
            Your personally curated collection of coveted silhouettes, saved for the perfect moment.
          </p>
        </motion.div>

        {/* Content Panel */}
        {wishlistItems.length === 0 ? (
          <motion.div
            className="text-center py-20 bg-white border border-primary/5 p-8 max-w-lg mx-auto shadow-sm"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-flex p-4 bg-surface rounded-full text-accent mb-4"
              animate={{ y: [0, -8, 0], scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Heart size={36} strokeWidth={1} />
            </motion.div>
            <h3 className="font-heading text-xl uppercase tracking-widest text-primary font-semibold mb-2">Wishlist is empty</h3>
            <p className="text-xs text-brand-text/50 font-body leading-relaxed mb-8">
              Curate your desired apparel. Browse the atelier collection and save your favorite silhouettes here.
            </p>
            <Link
              to="/shop"
              className="bg-primary text-white text-xs uppercase tracking-widest px-8 py-3.5 hover:bg-accent hover:text-primary transition-all duration-400 font-semibold inline-block btn-shimmer"
            >
              Start Curating
            </Link>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {wishlistItems.map((product) => (
              <motion.div 
                key={product.id}
                className="group relative flex flex-col bg-white overflow-hidden premium-card border border-primary/5"
                variants={itemVariants}
                layout
              >
                {/* Visual Image */}
                <div className="relative overflow-hidden aspect-[3/4] bg-surface">
                  <Link to={`/product/${product.id}`} className="block w-full h-full">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover object-center transform transition-transform duration-[1.2s] group-hover:scale-110"
                    />
                  </Link>

                  {/* Shimmer overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-[1.5s] ease-out pointer-events-none" />

                  {/* Remove Button (Top Right) */}
                  <motion.button
                    onClick={() => toggleWishlist(product)}
                    className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 text-red-700 border border-white/10 hover:bg-red-700 hover:text-white transition-all shadow-sm"
                    aria-label="Remove item"
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.85 }}
                  >
                    <Trash2 size={14} />
                  </motion.button>

                  {/* Quick Add CTA */}
                  <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-primary/80 to-transparent">
                    <button
                      onClick={() => handleQuickAdd(product)}
                      className="w-full bg-white text-primary text-xs uppercase font-medium tracking-widest py-3 px-4 hover:bg-accent hover:text-primary transition-all duration-300 flex items-center justify-center gap-2 btn-shimmer"
                    >
                      <ShoppingBag size={14} />
                      Add to Bag
                    </button>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 flex flex-col flex-1 bg-white">
                  <span className="text-[9px] text-accent uppercase tracking-widest font-semibold mb-1">
                    {product.category}
                  </span>
                  
                  <h3 className="font-heading text-md text-primary tracking-wide mb-2 hover:text-accent transition-colors font-medium">
                    <Link to={`/product/${product.id}`}>{product.name}</Link>
                  </h3>

                  <div className="flex justify-between items-center mt-auto pt-2 border-t border-surface">
                    <span className="text-xs text-brand-text/50 font-body">Size: {product.sizes[0]}</span>
                    <span className="text-sm font-semibold tracking-wide text-primary font-body">
                      ₹{product.price}
                    </span>
                  </div>
                </div>

              </motion.div>
            ))}
          </motion.div>
        )}

      </div>
    </div>
  );
}

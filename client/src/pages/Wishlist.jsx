import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, Heart } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';

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
    <div className="pt-28 pb-24 bg-brand-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-semibold block mb-3">
            Saved Pieces
          </span>
          <h1 className="text-4xl font-light tracking-wide text-primary uppercase mb-4">
            Your <span className="font-serif italic font-normal text-accent normal-case">Wishlist</span>
          </h1>
          <div className="h-[1px] w-20 bg-accent/40 mx-auto mt-4" />
        </div>

        {/* Content Panel */}
        {wishlistItems.length === 0 ? (
          <div className="text-center py-20 bg-white border border-primary/5 p-8 max-w-lg mx-auto shadow-sm">
            <div className="inline-flex p-4 bg-surface rounded-full text-accent mb-4">
              <Heart size={36} strokeWidth={1} />
            </div>
            <h3 className="font-heading text-xl uppercase tracking-widest text-primary font-semibold mb-2">Wishlist is empty</h3>
            <p className="text-xs text-brand-text/50 font-body leading-relaxed mb-8">
              Curate your desired apparel. Browse the atelier collection and save your favorite silhouettes here.
            </p>
            <Link
              to="/shop"
              className="bg-primary text-white text-xs uppercase tracking-widest px-8 py-3.5 hover:bg-accent hover:text-primary transition-all duration-300 font-semibold inline-block"
            >
              Start Curating
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {wishlistItems.map((product) => (
              <div 
                key={product.id} 
                className="group relative flex flex-col bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-primary/5"
              >
                {/* Visual Image */}
                <div className="relative overflow-hidden aspect-[3/4] bg-surface">
                  <Link to={`/product/${product.id}`} className="block w-full h-full">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover object-center transform transition-transform duration-1000 group-hover:scale-105"
                    />
                  </Link>

                  {/* Remove Button (Top Right) */}
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 text-red-700 border border-white/10 hover:bg-red-700 hover:text-white transition-all shadow-sm"
                    aria-label="Remove item"
                  >
                    <Trash2 size={14} />
                  </button>

                  {/* Quick Add CTA */}
                  <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-primary/80 to-transparent">
                    <button
                      onClick={() => handleQuickAdd(product)}
                      className="w-full bg-white text-primary text-xs uppercase font-medium tracking-widest py-3 px-4 hover:bg-accent hover:text-primary transition-all duration-300 flex items-center justify-center gap-2"
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

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

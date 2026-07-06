import React, { useState, useEffect, useContext, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Heart, ShoppingBag, Plus, Minus, ArrowRight, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { products } from '../data/products';
import { ShopContext } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart, toggleWishlist, isInWishlist } = useContext(ShopContext);

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('overview');
  const [errorMsg, setErrorMsg] = useState('');

  // Find product
  const product = useMemo(() => {
    return products.find(p => p.id === id);
  }, [id]);

  // Set default values when product loaded or changed
  useEffect(() => {
    if (product) {
      window.scrollTo(0, 0);
      setActiveImgIndex(0);
      setSelectedSize(product.sizes[0] || '');
      setSelectedColor(product.colors[0] || null);
      setQuantity(1);
      setErrorMsg('');
    }
  }, [product, id]);

  if (!product) {
    return (
      <div className="pt-32 pb-24 bg-brand-bg text-center min-h-screen flex items-center justify-center">
        <div className="max-w-md p-6 bg-white border border-primary/5 shadow-md">
          <h2 className="font-heading text-2xl uppercase tracking-widest text-primary font-semibold mb-2">Item not found</h2>
          <p className="text-xs text-brand-text/50 font-body leading-relaxed mb-6">
            The garment you requested does not exist in our active collection.
          </p>
          <Link
            to="/shop"
            className="bg-primary text-white text-xs uppercase tracking-widest px-8 py-3.5 hover:bg-accent hover:text-primary transition-all duration-300 font-semibold inline-block"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const isFavorite = isInWishlist(product.id);

  // Get related products (same category, excluding current)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

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
  };

  return (
    <div className="pt-28 pb-24 bg-brand-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="text-[10px] uppercase tracking-widest text-brand-text/40 mb-8 font-body">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
          <span className="mx-2">/</span>
          <Link to={`/shop?category=${product.category}`} className="hover:text-primary transition-colors">{product.category}</Link>
          <span className="mx-2">/</span>
          <span className="text-primary font-semibold">{product.name}</span>
        </div>

        {/* Product Visual & Info Segment */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mb-24 bg-white p-6 sm:p-10 border border-primary/5 shadow-sm">
          
          {/* Left Side: Images Section */}
          <div className="w-full lg:w-1/2 flex flex-col md:flex-row gap-4 h-fit">
            {/* Thumbnails list (Desktop side, mobile horizontal) */}
            {product.images.length > 1 && (
              <div className="flex md:flex-col gap-3 order-2 md:order-1 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImgIndex(idx)}
                    className={`relative w-16 h-20 overflow-hidden border flex-shrink-0 transition-colors ${
                      activeImgIndex === idx ? 'border-accent' : 'border-surface hover:border-accent/40'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover object-center" />
                  </button>
                ))}
              </div>
            )}

            {/* Active Image Box */}
            <div className="flex-1 aspect-[3/4] bg-surface overflow-hidden relative order-1 md:order-2">
              <img
                src={product.images[activeImgIndex]}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-all duration-700 hover:scale-105"
              />
              {product.discount > 0 && (
                <span className="absolute top-4 left-4 bg-primary text-white text-[9px] font-semibold uppercase tracking-widest px-2.5 py-1">
                  SAVE {product.discount}%
                </span>
              )}
            </div>
          </div>

          {/* Right Side: Product Configuration & Details */}
          <div className="w-full lg:w-1/2 flex flex-col justify-between">
            
            {/* Brand/Category Tag */}
            <div>
              <span className="text-[10px] text-accent uppercase tracking-widest font-bold mb-1.5 block">
                {product.category}
              </span>
              
              <h1 className="font-heading text-3xl sm:text-4xl text-primary font-light tracking-wide mb-3 uppercase">
                {product.name}
              </h1>

              {/* Price and Ratings */}
              <div className="flex items-center justify-between pb-4 border-b border-surface mb-6">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-semibold text-primary font-body">₹{product.price}</span>
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

              {/* Brief Description */}
              <p className="text-xs text-brand-text/80 leading-relaxed font-body mb-4">
                {product.description}
              </p>

              {/* COD Terms Badge */}
              {product.codTerms && (
                <div className="inline-block bg-accent/10 border border-accent/20 px-3.5 py-2 text-[10px] text-primary font-semibold uppercase tracking-wider mb-8">
                  🛍️ {product.codTerms}
                </div>
              )}

              {/* Colors selection */}
              <div className="mb-6">
                <h4 className="text-[10px] uppercase tracking-widest font-semibold text-primary mb-3">
                  Color: <span className="text-brand-text/60 normal-case font-normal">{selectedColor?.name}</span>
                </h4>
                <div className="flex space-x-2.5">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`w-7.5 h-7.5 rounded-full border flex items-center justify-center transition-all ${
                        selectedColor?.name === color.name ? 'border-accent scale-110 shadow-sm' : 'border-transparent hover:scale-105'
                      }`}
                      title={color.name}
                    >
                      <span className="w-5.5 h-5.5 rounded-full block border border-black/10" style={{ backgroundColor: color.hex }} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Sizes selection */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-[10px] uppercase tracking-widest font-semibold text-primary">
                    Size: <span className="text-brand-text/60 normal-case font-normal">{selectedSize}</span>
                  </h4>
                  <Link to="/faq" className="text-[10px] uppercase tracking-widest text-accent hover:text-primary transition-colors font-semibold">
                    Size Guide
                  </Link>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => {
                        setSelectedSize(size);
                        setErrorMsg('');
                      }}
                      className={`px-5 py-2.5 border text-xs font-body tracking-wider transition-all duration-300 ${
                        selectedSize === size
                          ? 'border-primary bg-primary text-white font-semibold'
                          : 'border-surface hover:border-primary/50 text-primary'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <h4 className="text-[10px] uppercase tracking-widest font-semibold text-primary mb-3">Quantity</h4>
                <div className="inline-flex border border-surface bg-white">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-1.5 text-primary hover:bg-surface text-sm font-semibold"
                  >
                    -
                  </button>
                  <span className="px-5 py-1.5 text-xs font-body flex items-center justify-center font-medium min-w-[45px]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-1.5 text-primary hover:bg-surface text-sm font-semibold"
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
            <div className="space-y-4 pt-6 border-t border-surface">
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-primary text-white py-4.5 px-6 uppercase text-xs font-semibold tracking-widest hover:bg-accent hover:text-primary transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <ShoppingBag size={16} />
                  <span>Add to Bag</span>
                </button>

                <button
                  onClick={handleWhatsAppOrder}
                  className="flex-1 border border-primary text-primary py-4.5 px-6 uppercase text-xs font-semibold tracking-widest hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                  <span>Order on WhatsApp</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-4.5 border transition-all duration-300 ${
                    isFavorite 
                      ? 'border-accent bg-primary text-accent' 
                      : 'border-surface hover:border-primary/50 hover:bg-surface text-primary'
                  }`}
                  aria-label="Toggle wishlist"
                >
                  <Heart size={16} fill={isFavorite ? "#C8A96A" : "none"} />
                </button>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-2 text-center text-[10px] tracking-wide text-brand-text/50 uppercase font-body pt-3">
                <div className="flex flex-col items-center gap-1.5 p-2 bg-surface">
                  <Truck size={14} className="text-accent" />
                  <span>Complimentary Shipping</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 p-2 bg-surface">
                  <RefreshCw size={14} className="text-accent" />
                  <span>14-Day Exchanges</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 p-2 bg-surface">
                  <ShieldCheck size={14} className="text-accent" />
                  <span>Certified Sourcing</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Mid Page Segment: Tabs (Details / Care / Shipping) */}
        <div className="mb-24 bg-white border border-primary/5 shadow-sm overflow-hidden">
          {/* Tabs header */}
          <div className="flex border-b border-surface">
            {['overview', 'details & care', 'shipping & returns'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 text-center text-xs uppercase tracking-widest font-semibold border-b-2 transition-all ${
                  activeTab === tab
                    ? 'border-accent text-primary bg-brand-bg/25'
                    : 'border-transparent text-brand-text/55 hover:text-primary hover:bg-brand-bg/10'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab content panels */}
          <div className="p-8 sm:p-12 text-xs tracking-wider leading-relaxed text-brand-text/80 font-body">
            {activeTab === 'overview' && (
              <div className="space-y-4 max-w-3xl">
                <h3 className="font-heading text-lg text-primary uppercase mb-2">The Design Narrative</h3>
                <p>{product.description}</p>
                <p>Designed with generous workspace and movement margins, our silhouettes flatter and flow. An essential addition to the discerning dresser’s wardrobe.</p>
              </div>
            )}

            {activeTab === 'details & care' && (
              <div className="space-y-4 max-w-3xl">
                <h3 className="font-heading text-lg text-primary uppercase mb-3">Atelier Specifications</h3>
                <ul className="list-disc pl-4 space-y-2">
                  {product.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                  <li>Constructed with reinforced invisible seams.</li>
                  <li>Custom signature luxury packaging box and dust hanger included.</li>
                </ul>
              </div>
            )}

            {activeTab === 'shipping & returns' && (
              <div className="space-y-4 max-w-3xl">
                <h3 className="font-heading text-lg text-primary uppercase mb-2">Concierge Logistic Terms</h3>
                <p><strong>Shipping:</strong> We provide complimentary signature-required express delivery on all orders. Shipments leave our atelier within 24 hours. Global transits take 2-4 business days.</p>
                <p><strong>Returns:</strong> We accept complimentary, fully-insured returns inside 14 days of delivery. Security tag must remain attached for refund processing.</p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="text-center max-w-xl mx-auto mb-12">
              <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-semibold block mb-2">
                Atelier Pairings
              </span>
              <h2 className="text-3xl font-light tracking-wide text-primary uppercase">
                You May Also <span className="font-serif italic font-normal text-accent normal-case">Adore</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

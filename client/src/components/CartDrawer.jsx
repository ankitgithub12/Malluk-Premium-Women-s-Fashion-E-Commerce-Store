import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShopContext } from '../context/ShopContext';

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cartItems, updateCartQuantity, removeFromCart, cartTotal } = useContext(ShopContext);
  const [couponCode, setCouponCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'MALLUKGOLD') {
      setDiscountApplied(true);
      setCouponError('');
    } else {
      setCouponError('Invalid atelier code');
      setDiscountApplied(false);
    }
  };

  const handleWhatsAppCheckout = () => {
    let text = `Hello Malluk, I would like to order the following items from my shopping bag:\n\n`;
    cartItems.forEach((item) => {
      text += `- ${item.quantity}x ${item.product.name} (Size: ${item.selectedSize}, Color: ${item.selectedColor.name}) @ $${item.product.price} each\n`;
    });
    if (discountApplied) {
      text += `\nApplied Promo Code: MALLUKGOLD (10% off)`;
    }
    text += `\nEstimated Total: ₹${finalTotal.toFixed(2)}`;
    const url = `https://wa.me/918264446457?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setIsCartOpen(false);
  };

  const discountAmount = discountApplied ? cartTotal * 0.1 : 0;
  const finalTotal = cartTotal - discountAmount;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-primary/40 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="w-screen max-w-md bg-brand-bg shadow-2xl flex flex-col justify-between border-l border-primary/10"
            >
              {/* Header */}
              <div className="p-6 border-b border-primary/10 flex items-center justify-between bg-primary text-white">
                <div className="flex items-center gap-2">
                  <ShoppingBag size={18} className="text-accent" />
                  <h2 className="font-heading text-lg tracking-widest uppercase font-medium">Your Atelier Bag</h2>
                  <span className="text-xs bg-accent text-primary font-bold px-2 py-0.5 rounded-full">
                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                  </span>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 hover:text-accent transition-colors duration-300"
                  aria-label="Close cart"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                    <div className="p-4 bg-surface rounded-full text-primary/40">
                      <ShoppingBag size={48} strokeWidth={1} />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg text-primary uppercase tracking-widest font-semibold mb-1">Your bag is empty</h3>
                      <p className="text-xs text-brand-text/50 font-body max-w-[240px] mx-auto leading-relaxed">
                        Curate your style from our collection of premium silks and cashmere pieces.
                      </p>
                    </div>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="bg-primary text-white text-xs uppercase tracking-widest px-6 py-3 font-semibold hover:bg-accent hover:text-primary transition-all duration-300"
                    >
                      Shop New Arrivals
                    </button>
                  </div>
                ) : (
                  cartItems.map((item, index) => (
                    <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.name}-${index}`} className="flex gap-4 pb-6 border-b border-surface">
                      {/* Thumbnail */}
                      <div className="w-20 h-24 bg-surface flex-shrink-0 overflow-hidden border border-primary/10">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between">
                            <h3 className="font-heading text-sm text-primary font-semibold tracking-wide hover:text-accent transition-colors duration-300 line-clamp-1">
                              <Link to={`/product/${item.product.id}`} onClick={() => setIsCartOpen(false)}>
                                {item.product.name}
                              </Link>
                            </h3>
                            <button
                              onClick={() => removeFromCart(item.product.id, item.selectedSize, item.selectedColor.name)}
                              className="text-brand-text/40 hover:text-red-700 transition-colors"
                              aria-label="Remove item"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>

                          <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-wider text-brand-text/50 mt-1 font-body">
                            <span>Size: {item.selectedSize}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              Color: 
                              <span className="w-2.5 h-2.5 rounded-full inline-block border border-black/10" style={{ backgroundColor: item.selectedColor.hex }} />
                              {item.selectedColor.name}
                            </span>
                          </div>
                        </div>

                        {/* Adjust Quantity and Subtotal */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex border border-surface bg-white">
                            <button
                              onClick={() => updateCartQuantity(item.product.id, item.selectedSize, item.selectedColor.name, item.quantity - 1)}
                              className="px-2 py-0.5 text-primary hover:bg-surface text-xs"
                            >
                              <Minus size={10} />
                            </button>
                            <span className="px-3 text-[11px] font-body flex items-center justify-center font-medium min-w-[30px]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(item.product.id, item.selectedSize, item.selectedColor.name, item.quantity + 1)}
                              className="px-2 py-0.5 text-primary hover:bg-surface text-xs"
                            >
                              <Plus size={10} />
                            </button>
                          </div>

                          <span className="text-xs font-semibold text-primary font-body">
                            ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer Checkout Summary */}
              {cartItems.length > 0 && (
                <div className="p-6 border-t border-primary/10 bg-white space-y-4">
                  {/* Coupon Area */}
                  <form onSubmit={handleApplyCoupon} className="flex border-b border-surface pb-3">
                    <input
                      type="text"
                      placeholder="ENTER PROMO CODE (e.g. MALLUKGOLD)"
                      value={couponCode}
                      onChange={(e) => {
                        setCouponCode(e.target.value);
                        setCouponError('');
                      }}
                      className="bg-transparent border-none outline-none text-[10px] tracking-widest placeholder-brand-text/30 w-full uppercase py-1"
                    />
                    <button
                      type="submit"
                      className="text-[10px] font-semibold uppercase tracking-widest text-accent hover:text-primary transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                  
                  {couponError && <p className="text-[10px] text-red-700 font-medium">{couponError}</p>}
                  {discountApplied && (
                    <p className="text-[10px] text-emerald-800 font-semibold tracking-wider flex items-center gap-1 animate-fade-up">
                      <ShieldCheck size={12} />
                      10% Atelier Discount Applied
                    </p>
                  )}

                  <div className="space-y-1.5 text-xs text-brand-text/70 tracking-wide font-body">
                    <div className="flex justify-between">
                      <span>Bag Subtotal</span>
                      <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                    </div>
                    {discountApplied && (
                      <div className="flex justify-between text-emerald-800 font-semibold">
                        <span>Promo Discount (10%)</span>
                        <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Express Shipping</span>
                      <span className="text-accent uppercase font-semibold">Complimentary</span>
                    </div>
                    <div className="flex justify-between text-sm text-primary font-bold pt-3 border-t border-surface">
                      <span className="uppercase tracking-wider">Estimated Total</span>
                      <span>₹{finalTotal.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  {/* Checkout CTA */}
                  <div className="pt-2 flex flex-col gap-2.5">
                    <Link
                      to="/cart"
                      onClick={() => setIsCartOpen(false)}
                      className="w-full bg-primary text-white py-4 px-6 uppercase text-xs font-semibold tracking-widest hover:bg-accent hover:text-primary transition-all duration-300 flex items-center justify-center gap-3"
                    >
                      <span>Proceed to Checkout</span>
                      <ArrowRight size={14} />
                    </Link>

                    <button
                      onClick={handleWhatsAppCheckout}
                      className="w-full border border-primary text-primary py-4 px-6 uppercase text-xs font-semibold tracking-widest hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center gap-3 bg-white"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                      <span>Order via WhatsApp</span>
                    </button>

                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="w-full text-center text-[10px] uppercase font-bold tracking-widest text-brand-text/50 hover:text-primary transition-colors py-2"
                    >
                      Continue Shopping
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}

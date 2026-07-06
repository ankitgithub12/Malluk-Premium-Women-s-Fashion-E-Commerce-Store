import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, Plus, Minus, ArrowRight, ShieldCheck, ArrowLeft, CheckCircle } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';

export default function Cart() {
  const { cartItems, updateCartQuantity, removeFromCart, cartTotal, clearCart } = useContext(ShopContext);

  const [couponCode, setCouponCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'MALLUKGOLD') {
      setDiscountApplied(true);
      setCouponError('');
    } else {
      setCouponError('Invalid promo code');
      setDiscountApplied(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    // Simulate order placement
    setOrderPlaced(true);
    clearCart();
    window.scrollTo(0, 0);
  };

  const handleWhatsAppCheckout = () => {
    let text = `Hello Malluk, I would like to order the following items from my shopping bag:\n\n`;
    cartItems.forEach((item) => {
      text += `- ${item.quantity}x ${item.product.name} (Size: ${item.selectedSize}, Color: ${item.selectedColor.name}) @ ₹${item.product.price} each\n`;
    });
    if (discountApplied) {
      text += `\nApplied Promo Code: MALLUKGOLD (10% off)`;
    }
    text += `\nEstimated Total: ₹${finalTotal.toFixed(2)}`;
    const url = `https://wa.me/918264446457?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const discountAmount = discountApplied ? cartTotal * 0.1 : 0;
  const finalTotal = cartTotal - discountAmount;

  if (orderPlaced) {
    return (
      <div className="pt-32 pb-24 bg-brand-bg text-center min-h-screen flex items-center justify-center">
        <div className="max-w-lg p-10 bg-white border border-primary/5 shadow-xl space-y-6">
          <div className="inline-flex p-4 bg-emerald-50 text-emerald-800 rounded-full animate-bounce">
            <CheckCircle size={48} strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="font-heading text-3xl uppercase tracking-widest text-primary font-semibold mb-2">Order Confirmed</h2>
            <p className="text-xs text-accent uppercase tracking-widest font-semibold mb-4">Reservation ID: MLK-{Math.floor(100000 + Math.random() * 900000)}</p>
            <p className="text-xs text-brand-text/50 font-body leading-relaxed max-w-[340px] mx-auto">
              Your luxury packaging is being prepared at our Madison Avenue atelier. A confirmation email with express tracking details has been sent.
            </p>
          </div>
          <Link
            to="/shop"
            className="bg-primary text-white text-xs uppercase tracking-widest px-8 py-3.5 hover:bg-accent hover:text-primary transition-all duration-300 font-semibold inline-block"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 bg-brand-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-semibold block mb-3">
            Atelier Check
          </span>
          <h1 className="text-4xl font-light tracking-wide text-primary uppercase mb-4">
            Shopping <span className="font-serif italic font-normal text-accent normal-case">Bag</span>
          </h1>
          <div className="h-[1px] w-20 bg-accent/40 mx-auto mt-4" />
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 bg-white border border-primary/5 p-8 max-w-lg mx-auto shadow-sm">
            <div className="inline-flex p-4 bg-surface rounded-full text-primary/40 mb-4">
              <ShoppingBag size={40} strokeWidth={1} />
            </div>
            <h3 className="font-heading text-xl uppercase tracking-widest text-primary font-semibold mb-2">Your bag is empty</h3>
            <p className="text-xs text-brand-text/50 font-body leading-relaxed mb-8">
              Explore custom cashmere, silk slips, and virgin wool blazer cuts.
            </p>
            <Link
              to="/shop"
              className="bg-primary text-white text-xs uppercase tracking-widest px-8 py-3.5 hover:bg-accent hover:text-primary transition-all duration-300 font-semibold inline-block"
            >
              Shop Curated Apparel
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left: Items Column */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-10 border border-primary/5 shadow-sm space-y-6">
              
              {/* Checkout back button */}
              {isCheckingOut && (
                <button
                  onClick={() => setIsCheckingOut(false)}
                  className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-accent hover:text-primary transition-colors pb-4 border-b border-surface"
                >
                  <ArrowLeft size={14} />
                  Return to bag overview
                </button>
              )}

              {!isCheckingOut ? (
                // Bag Overview Screen
                <div className="space-y-6">
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex gap-6 pb-6 border-b border-surface last:border-b-0 last:pb-0">
                      {/* Image */}
                      <div className="w-24 h-32 bg-surface overflow-hidden border border-primary/10 flex-shrink-0">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="font-heading text-lg text-primary font-semibold tracking-wide hover:text-accent transition-colors duration-300">
                              <Link to={`/product/${item.product.id}`}>{item.product.name}</Link>
                            </h3>
                            
                            <button
                              onClick={() => removeFromCart(item.product.id, item.selectedSize, item.selectedColor.name)}
                              className="text-brand-text/40 hover:text-red-700 transition-colors p-1"
                              aria-label="Remove item"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>

                          <div className="flex flex-wrap gap-3 text-xs uppercase tracking-wider text-brand-text/50 mt-1 font-body">
                            <span>Size: {item.selectedSize}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1.5">
                              Color: 
                              <span className="w-3 h-3 rounded-full inline-block border border-black/10" style={{ backgroundColor: item.selectedColor.hex }} />
                              {item.selectedColor.name}
                            </span>
                          </div>
                        </div>

                        {/* Quantity trigger & Subtotal */}
                        <div className="flex items-center justify-between">
                          <div className="flex border border-surface bg-white">
                            <button
                              onClick={() => updateCartQuantity(item.product.id, item.selectedSize, item.selectedColor.name, item.quantity - 1)}
                              className="px-3 py-1 text-primary hover:bg-surface text-sm"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="px-5 text-xs font-body flex items-center justify-center font-medium min-w-[36px]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(item.product.id, item.selectedSize, item.selectedColor.name, item.quantity + 1)}
                              className="px-3 py-1 text-primary hover:bg-surface text-sm"
                            >
                              <Plus size={12} />
                            </button>
                          </div>

                           <span className="text-sm font-semibold text-primary font-body">
                            ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                // Checkout Form Screen
                <form onSubmit={handleCheckoutSubmit} className="space-y-6 font-body">
                  <h2 className="font-heading text-xl uppercase tracking-widest text-primary font-semibold mb-4">Concierge Checkout</h2>
                  
                  {/* Delivery Info */}
                  <div className="space-y-4">
                    <h3 className="text-[10px] uppercase tracking-widest font-bold text-accent mb-2">1. Delivery Address</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="name"
                        placeholder="FULL NAME..."
                        value={formData.name}
                        onChange={handleInputChange}
                        className="bg-brand-bg border border-surface text-xs tracking-wider px-4 py-3 outline-none w-full"
                        required
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="EMAIL ADDRESS..."
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-brand-bg border border-surface text-xs tracking-wider px-4 py-3 outline-none w-full"
                        required
                      />
                    </div>
                    <input
                      type="text"
                      name="address"
                      placeholder="STREET ADDRESS..."
                      value={formData.address}
                      onChange={handleInputChange}
                      className="bg-brand-bg border border-surface text-xs tracking-wider px-4 py-3 outline-none w-full"
                      required
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="city"
                        placeholder="CITY..."
                        value={formData.city}
                        onChange={handleInputChange}
                        className="bg-brand-bg border border-surface text-xs tracking-wider px-4 py-3 outline-none w-full"
                        required
                      />
                      <input
                        type="text"
                        name="zip"
                        placeholder="POSTCODE / ZIP..."
                        value={formData.zip}
                        onChange={handleInputChange}
                        className="bg-brand-bg border border-surface text-xs tracking-wider px-4 py-3 outline-none w-full"
                        required
                      />
                    </div>
                  </div>

                  {/* Payment Info */}
                  <div className="space-y-4 pt-4 border-t border-surface">
                    <h3 className="text-[10px] uppercase tracking-widest font-bold text-accent mb-2">2. Payment details</h3>
                    <input
                      type="text"
                      name="cardName"
                      placeholder="NAME ON CARD..."
                      value={formData.cardName}
                      onChange={handleInputChange}
                      className="bg-brand-bg border border-surface text-xs tracking-wider px-4 py-3 outline-none w-full"
                      required
                    />
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="CARD NUMBER (16-DIGIT)..."
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      maxLength="16"
                      className="bg-brand-bg border border-surface text-xs tracking-wider px-4 py-3 outline-none w-full"
                      required
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="cardExpiry"
                        placeholder="MM/YY..."
                        value={formData.cardExpiry}
                        onChange={handleInputChange}
                        maxLength="5"
                        className="bg-brand-bg border border-surface text-xs tracking-wider px-4 py-3 outline-none w-full"
                        required
                      />
                      <input
                        type="password"
                        name="cardCvv"
                        placeholder="CVV (3-DIGIT)..."
                        value={formData.cardCvv}
                        onChange={handleInputChange}
                        maxLength="3"
                        className="bg-brand-bg border border-surface text-xs tracking-wider px-4 py-3 outline-none w-full"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary text-white py-4.5 px-6 uppercase text-xs font-semibold tracking-widest hover:bg-accent hover:text-primary transition-all duration-300 flex items-center justify-center gap-3 mt-6"
                  >
                    <span>Authorize Payment & Place Order</span>
                    <ArrowRight size={14} />
                  </button>
                </form>
              )}
            </div>

            {/* Right: Order Summary Column */}
            <div className="lg:col-span-5 bg-white p-6 sm:p-8 border border-primary/5 shadow-sm space-y-6">
              <h2 className="font-heading text-xl uppercase tracking-widest text-primary font-semibold pb-4 border-b border-surface">
                Order Summary
              </h2>

              {/* Coupon Form */}
              {!isCheckingOut && (
                <form onSubmit={handleApplyCoupon} className="flex border-b border-surface pb-3">
                  <input
                    type="text"
                    placeholder="ENTER CODE (e.g. MALLUKGOLD)"
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
              )}

              {couponError && <p className="text-[10px] text-red-700 font-medium font-body">{couponError}</p>}
              {discountApplied && (
                <p className="text-[10px] text-emerald-800 font-semibold tracking-wider flex items-center gap-1 font-body animate-fade-up">
                  <ShieldCheck size={12} />
                  10% Atelier Discount Applied
                </p>
              )}

              <div className="space-y-3.5 text-xs text-brand-text/75 tracking-wide font-body">
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
                  <span>Express Courier Delivery</span>
                  <span className="text-accent uppercase font-semibold">Complimentary</span>
                </div>
                <div className="flex justify-between text-sm text-primary font-bold pt-4 border-t border-surface">
                  <span className="uppercase tracking-wider">Estimated Total</span>
                  <span>₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Action trigger */}
              {!isCheckingOut && (
                <div className="space-y-3 pt-2">
                  <button
                    onClick={() => setIsCheckingOut(true)}
                    className="w-full bg-primary text-white py-4 px-6 uppercase text-xs font-semibold tracking-widest hover:bg-accent hover:text-primary transition-all duration-300 flex items-center justify-center gap-3"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight size={14} />
                  </button>

                  <button
                    onClick={handleWhatsAppCheckout}
                    className="w-full border border-primary text-primary py-4 px-6 uppercase text-xs font-semibold tracking-widest hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center gap-3"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                    <span>Order via WhatsApp</span>
                  </button>
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

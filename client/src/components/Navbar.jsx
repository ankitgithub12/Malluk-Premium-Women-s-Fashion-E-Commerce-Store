import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Search, Heart, ShoppingBag, User, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShopContext } from '../context/ShopContext';
import logoImage from '../assets/logo.jpg';

export default function Navbar() {
  const { cartCount, wishlistItems, setIsCartOpen, isSearchOpen, setIsSearchOpen } = useContext(ShopContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus when path changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Collections', path: '/collections' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'FAQ', path: '/faq' }
  ];

  // Determine if navbar should be transparent
  const isHomepage = location.pathname === '/';

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-700 ease-out text-white ${
          isScrolled
            ? 'glass shadow-2xl shadow-primary/10'
            : isHomepage
              ? 'bg-transparent'
              : 'glass'
        }`}
      >
        {/* Announcement Bar - Scrolling Marquee */}
        <div className="bg-accent text-primary text-[11px] font-medium tracking-widest text-center py-2 px-4 uppercase select-none overflow-hidden">
          <div className="animate-marquee whitespace-nowrap inline-block">
            <span className="mx-8">✦ Complimentary Worldwide Concierge Delivery for Orders Over ₹25,000</span>
            <span className="mx-8">✦ Easy Returns Within 14 Days</span>
            <span className="mx-8">✦ Use Code MALLUKGOLD for 10% Off</span>
            <span className="mx-8">✦ Complimentary Worldwide Concierge Delivery for Orders Over ₹25,000</span>
            <span className="mx-8">✦ Easy Returns Within 14 Days</span>
            <span className="mx-8">✦ Use Code MALLUKGOLD for 10% Off</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo on Left */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center gap-3 group">
                <motion.img
                  src={logoImage}
                  alt="Malluk Logo"
                  className="h-12 w-12 object-cover border border-accent/20 rounded shadow-md group-hover:border-accent transition-all duration-500"
                  whileHover={{ scale: 1.08, rotate: 2 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                />
                <span className="font-heading text-2xl tracking-widest uppercase text-white font-medium">
                  Malluk
                </span>
              </Link>
            </div>

            {/* Navigation Centered (Desktop) */}
            <nav className="hidden lg:flex space-x-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.06 }}
                >
                  <NavLink
                    to={link.path}
                    className={({ isActive }) => `
                      font-body text-xs uppercase tracking-widest hover:text-accent transition-colors duration-300 relative py-2
                      ${isActive ? 'text-accent font-semibold after:scale-x-100' : 'text-white/80'}
                      after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[1px] after:bottom-0 after:left-0 after:bg-gradient-to-r after:from-transparent after:via-accent after:to-transparent after:transition-transform after:duration-400 hover:after:scale-x-100
                    `}
                  >
                    {link.name}
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            {/* Icons on Right */}
            <div className="hidden sm:flex items-center space-x-5">
              <motion.button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 hover:text-accent transition-colors duration-300"
                aria-label="Search Catalog"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
              >
                <Search size={20} strokeWidth={1.5} />
              </motion.button>

              <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  to="/wishlist" 
                  className="p-2 hover:text-accent transition-colors duration-300 relative block"
                  aria-label="View Wishlist"
                >
                  <Heart size={20} strokeWidth={1.5} />
                  {wishlistItems.length > 0 && (
                    <span className="absolute top-0 right-0 bg-accent text-primary text-[9px] font-bold rounded-full h-4 w-4 flex items-center justify-center border border-primary animate-pulse-ring">
                      {wishlistItems.length}
                    </span>
                  )}
                </Link>
              </motion.div>

              <motion.button
                onClick={() => setIsCartOpen(true)}
                className="p-2 hover:text-accent transition-colors duration-300 relative"
                aria-label="Open Shopping Cart"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingBag size={20} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-0 right-0 bg-accent text-primary text-[9px] font-bold rounded-full h-4 w-4 flex items-center justify-center border border-primary animate-pulse-ring"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </motion.button>

              <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.95 }}>
                <Link to="/about" className="p-2 hover:text-accent transition-colors duration-300 block" aria-label="Customer Profile">
                  <User size={20} strokeWidth={1.5} />
                </Link>
              </motion.div>
            </div>

            {/* Mobile Hamburger Trigger */}
            <div className="flex sm:hidden items-center space-x-3">
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="p-2 hover:text-accent transition-colors duration-300"
              >
                <Search size={20} strokeWidth={1.5} />
              </button>
              
              <button 
                onClick={() => setIsCartOpen(true)}
                className="p-2 hover:text-accent transition-colors duration-300 relative"
              >
                <ShoppingBag size={20} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 bg-accent text-primary text-[8px] font-bold rounded-full h-3.5 w-3.5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 hover:text-accent transition-colors duration-300"
                aria-label="Toggle Menu"
              >
                <motion.div
                  animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="glass-dark sm:hidden block overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-3">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.06 }}
                  >
                    <NavLink
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={({ isActive }) => `
                        block px-3 py-2 text-sm uppercase tracking-widest font-body transition-all duration-300
                        ${isActive ? 'text-accent border-l-2 border-accent pl-4' : 'text-white/80 hover:text-accent hover:pl-4'}
                      `}
                    >
                      {link.name}
                    </NavLink>
                  </motion.div>
                ))}
                
                <div className="pt-4 border-t border-white/10 flex justify-around">
                  <Link to="/wishlist" onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:text-accent relative flex items-center gap-2 py-2 transition-colors">
                    <Heart size={18} />
                    <span className="text-xs uppercase tracking-widest">Wishlist</span>
                    {wishlistItems.length > 0 && (
                      <span className="bg-accent text-primary text-[8px] font-bold px-1.5 py-0.5 rounded-full">
                        {wishlistItems.length}
                      </span>
                    )}
                  </Link>
                  <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:text-accent flex items-center gap-2 py-2 transition-colors">
                    <User size={18} />
                    <span className="text-xs uppercase tracking-widest">Profile</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Global Search Overlay Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 glass-dark z-50 flex flex-col justify-start"
          >
            <div className="max-w-4xl mx-auto w-full px-6 pt-24 pb-8 flex-1 flex flex-col justify-between">
              <div>
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="flex justify-between items-center border-b border-white/20 pb-4"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <motion.img 
                      src={logoImage} 
                      alt="Malluk Logo" 
                      className="h-10 w-10 object-cover border border-accent/20 rounded-full shadow-md"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    />
                    <input
                      type="text"
                      placeholder="SEARCH THE ATELIER..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-transparent text-white placeholder-white/40 text-xl md:text-3xl tracking-widest uppercase w-full border-none outline-none font-heading"
                      autoFocus
                    />
                  </div>
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="p-2 text-white hover:text-accent transition-colors duration-300"
                  >
                    <X size={28} />
                  </button>
                </motion.div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <h3 className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">Suggested Categories</h3>
                    <ul className="space-y-3">
                      {[
                        { label: 'Embroidered Suit Sets', cat: 'Embroidered Suit Sets' },
                        { label: 'Chikankari Suit Sets', cat: 'Chikankari Suit Sets' },
                        { label: 'Floral Suit Sets', cat: 'Floral Suit Sets' },
                        { label: 'Cotton Suit Sets', cat: 'Cotton Suit Sets' },
                      ].map((item, idx) => (
                        <motion.li
                          key={item.cat}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + idx * 0.08 }}
                        >
                          <Link to={`/shop?category=${item.cat}`} onClick={() => setIsSearchOpen(false)} className="group text-sm hover:text-accent transition-colors flex items-center justify-between">
                            <span>{item.label}</span>
                            <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                          </Link>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <h3 className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">Trending Searches</h3>
                    <div className="flex flex-wrap gap-2">
                      {['Meher Mocha', 'Noor Sky Blue', 'Zaria Ivory', 'Chikankari', 'Sage Green', 'Shisha Work'].map((term, idx) => (
                        <motion.button
                          key={term}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.4 + idx * 0.06 }}
                          onClick={() => setSearchQuery(term)}
                          className="px-4 py-2 border border-white/10 rounded-full text-xs hover:border-accent hover:text-accent hover:bg-accent/5 transition-all duration-300 uppercase tracking-wider"
                        >
                          {term}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>

              {searchQuery && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-10 text-center"
                >
                  <Link 
                    to={`/shop?search=${encodeURIComponent(searchQuery)}`}
                    onClick={() => setIsSearchOpen(false)}
                    className="inline-flex items-center gap-3 bg-accent text-primary px-8 py-3 rounded-none uppercase text-xs font-semibold tracking-widest hover:bg-white hover:text-primary transition-all duration-300 btn-shimmer"
                  >
                    <span>View Search Results for "{searchQuery}"</span>
                    <ArrowRight size={16} />
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

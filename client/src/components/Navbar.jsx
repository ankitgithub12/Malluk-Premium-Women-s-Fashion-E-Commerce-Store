import React, { useState, useEffect, useContext } from 'react';
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
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
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

  // Determine if navbar should be transparent (e.g. on Homepage before scrolling)
  const isHomepage = location.pathname === '/';
  const navbarBg = isScrolled 
    ? 'bg-primary border-b border-primary/20 shadow-lg text-white' 
    : isHomepage 
      ? 'bg-transparent text-white' 
      : 'bg-primary border-b border-primary/20 text-white';

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ease-in-out ${navbarBg}`}>
        {/* Announcement Bar */}
        <div className="bg-accent text-primary text-[11px] font-medium tracking-widest text-center py-2 px-4 uppercase select-none">
          Complimentary Worldwide Concierge Delivery for Orders Over ₹25,000 • Easy Returns
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo on Left */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center gap-2 group">
                <img 
                  src={logoImage} 
                  alt="Malluk Logo" 
                  className="h-12 w-12 object-cover border border-accent/20 rounded shadow-md group-hover:border-accent transition-all duration-500" 
                />
                <span className="font-heading text-2xl tracking-widest uppercase text-white font-medium">
                  Malluk
                </span>
              </Link>
            </div>

            {/* Navigation Centered (Desktop) */}
            <nav className="hidden lg:flex space-x-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) => `
                    font-body text-xs uppercase tracking-widest hover:text-accent transition-colors duration-300 relative py-2
                    ${isActive ? 'text-accent font-semibold after:scale-x-100' : 'text-white/80'}
                    after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[1px] after:bottom-0 after:left-0 after:bg-accent after:transition-transform after:duration-300 hover:after:scale-x-100
                  `}
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            {/* Icons on Right */}
            <div className="hidden sm:flex items-center space-x-5">
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="p-2 hover:text-accent transition-colors duration-300"
                aria-label="Search Catalog"
              >
                <Search size={20} strokeWidth={1.5} />
              </button>

              <Link 
                to="/wishlist" 
                className="p-2 hover:text-accent transition-colors duration-300 relative"
                aria-label="View Wishlist"
              >
                <Heart size={20} strokeWidth={1.5} />
                {wishlistItems.length > 0 && (
                  <span className="absolute top-0 right-0 bg-accent text-primary text-[9px] font-bold rounded-full h-4 w-4 flex items-center justify-center border border-primary animate-bounce">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              <button 
                onClick={() => setIsCartOpen(true)}
                className="p-2 hover:text-accent transition-colors duration-300 relative"
                aria-label="Open Shopping Cart"
              >
                <ShoppingBag size={20} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-accent text-primary text-[9px] font-bold rounded-full h-4 w-4 flex items-center justify-center border border-primary animate-pulse">
                    {cartCount}
                  </span>
                )}
              </button>

              <Link to="/about" className="p-2 hover:text-accent transition-colors duration-300" aria-label="Customer Profile">
                <User size={20} strokeWidth={1.5} />
              </Link>
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
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
              className="bg-primary/95 backdrop-blur-md border-b border-primary/20 sm:hidden block overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-3">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) => `
                      block px-3 py-2 text-sm uppercase tracking-widest font-body
                      ${isActive ? 'text-accent border-l-2 border-accent pl-4' : 'text-white/80'}
                    `}
                  >
                    {link.name}
                  </NavLink>
                ))}
                
                <div className="pt-4 border-t border-white/10 flex justify-around">
                  <Link to="/wishlist" onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:text-accent relative flex items-center gap-2 py-2">
                    <Heart size={18} />
                    <span className="text-xs uppercase tracking-widest">Wishlist</span>
                    {wishlistItems.length > 0 && (
                      <span className="bg-accent text-primary text-[8px] font-bold px-1.5 py-0.5 rounded-full">
                        {wishlistItems.length}
                      </span>
                    )}
                  </Link>
                  <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:text-accent flex items-center gap-2 py-2">
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
            className="fixed inset-0 bg-primary/95 backdrop-blur-lg z-50 flex flex-col justify-start"
          >
            <div className="max-w-4xl mx-auto w-full px-6 pt-24 pb-8 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center border-b border-white/20 pb-4">
                  <div className="flex items-center gap-4 flex-1">
                    <img 
                      src={logoImage} 
                      alt="Malluk Logo" 
                      className="h-10 w-10 object-cover border border-accent/20 rounded-full shadow-md"
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
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">Suggested Categories</h3>
                    <ul className="space-y-3">
                      <li>
                        <Link to="/shop?category=Dresses" onClick={() => setIsSearchOpen(false)} className="group text-sm hover:text-accent transition-colors flex items-center justify-between">
                          <span>Silk Evening Dresses</span>
                          <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      </li>
                      <li>
                        <Link to="/shop?category=Outerwear" onClick={() => setIsSearchOpen(false)} className="group text-sm hover:text-accent transition-colors flex items-center justify-between">
                          <span>Virgin Wool Coats & Blazers</span>
                          <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      </li>
                      <li>
                        <Link to="/shop?category=Matching%20Sets" onClick={() => setIsSearchOpen(false)} className="group text-sm hover:text-accent transition-colors flex items-center justify-between">
                          <span>Mongolian Cashmere Knits</span>
                          <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      </li>
                      <li>
                        <Link to="/shop?category=Accessories" onClick={() => setIsSearchOpen(false)} className="group text-sm hover:text-accent transition-colors flex items-center justify-between">
                          <span>Leather Accessories & Bags</span>
                          <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">Trending Searches</h3>
                    <div className="flex flex-wrap gap-2">
                      {['Aurelia Silk', 'Helena Blazer', 'Cashmere Set', 'Gold Chain Bag', 'Linen Vest'].map((term) => (
                        <button
                          key={term}
                          onClick={() => {
                            setSearchQuery(term);
                          }}
                          className="px-4 py-2 border border-white/10 rounded-full text-xs hover:border-accent hover:text-accent transition-all duration-300 uppercase tracking-wider"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {searchQuery && (
                <div className="mt-10 text-center">
                  <Link 
                    to={`/shop?search=${encodeURIComponent(searchQuery)}`}
                    onClick={() => setIsSearchOpen(false)}
                    className="inline-flex items-center gap-3 bg-accent text-primary px-8 py-3 rounded-none uppercase text-xs font-semibold tracking-widest hover:bg-white hover:text-primary transition-all duration-300"
                  >
                    <span>View Search Results for "{searchQuery}"</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

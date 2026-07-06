import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Context
import { ShopProvider } from './context/ShopContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import QuickViewModal from './components/QuickViewModal';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import Collections from './pages/Collections';
import ProductDetails from './pages/ProductDetails';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Page transition wrapper
const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
};

// Animated routes wrapper
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route 
          path="/" 
          element={
            <PageWrapper>
              <Home />
            </PageWrapper>
          } 
        />
        <Route 
          path="/shop" 
          element={
            <PageWrapper>
              <Shop />
            </PageWrapper>
          } 
        />
        <Route 
          path="/collections" 
          element={
            <PageWrapper>
              <Collections />
            </PageWrapper>
          } 
        />
        <Route 
          path="/product/:id" 
          element={
            <PageWrapper>
              <ProductDetails />
            </PageWrapper>
          } 
        />
        <Route 
          path="/wishlist" 
          element={
            <PageWrapper>
              <Wishlist />
            </PageWrapper>
          } 
        />
        <Route 
          path="/cart" 
          element={
            <PageWrapper>
              <Cart />
            </PageWrapper>
          } 
        />
        <Route 
          path="/about" 
          element={
            <PageWrapper>
              <AboutUs />
            </PageWrapper>
          } 
        />
        <Route 
          path="/contact" 
          element={
            <PageWrapper>
              <Contact />
            </PageWrapper>
          } 
        />
        <Route 
          path="/faq" 
          element={
            <PageWrapper>
              <FAQ />
            </PageWrapper>
          } 
        />
      </Routes>
    </AnimatePresence>
  );
}

// Global Luxury Loading Screen
function LuxuryLoadingScreen({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-primary flex flex-col items-center justify-center space-y-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center"
      >
        <span className="font-heading text-4xl sm:text-5xl tracking-[0.3em] uppercase text-accent font-light mb-2">
          Malluk
        </span>
        <span className="text-[9px] uppercase tracking-[0.25em] text-white/50 font-body">
          Haute Couture Atelier
        </span>
      </motion.div>
      <div className="loader-circle" />
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <ShopProvider>
      <Router>
        <ScrollToTop />
        
        <AnimatePresence>
          {loading ? (
            <LuxuryLoadingScreen onComplete={() => setLoading(false)} />
          ) : (
            <div className="flex flex-col min-h-screen bg-brand-bg text-brand-text font-body selection:bg-accent/30 selection:text-primary">
              <Navbar />
              <main className="flex-grow">
                <AnimatedRoutes />
              </main>
              <Footer />
              <CartDrawer />
              <QuickViewModal />
            </div>
          )}
        </AnimatePresence>
      </Router>
    </ShopProvider>
  );
}

export default App;

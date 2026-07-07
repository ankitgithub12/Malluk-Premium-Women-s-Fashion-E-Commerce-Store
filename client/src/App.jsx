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

// Enhanced page transition wrapper
const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
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

// Premium Luxury Loading Screen with letter-by-letter reveal + progress bar
function LuxuryLoadingScreen({ onComplete }) {
  const brandName = "MALLUK";
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    const timer = setTimeout(onComplete, 2800);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-primary flex flex-col items-center justify-center overflow-hidden"
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Floating Gold Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent/40 rounded-full"
            style={{
              left: `${15 + i * 10}%`,
              top: `${30 + (i % 3) * 15}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.7, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Logo Letters Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <div className="flex overflow-hidden mb-3">
          {brandName.split('').map((letter, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 40, rotateX: -60, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
              transition={{
                duration: 0.8,
                delay: 0.3 + index * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="font-heading text-5xl sm:text-6xl tracking-[0.4em] text-accent font-light inline-block"
              style={{ transformOrigin: 'bottom center' }}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-[9px] uppercase tracking-[0.35em] text-white/40 font-body"
        >
          Haute Couture Atelier
        </motion.span>
      </motion.div>

      {/* Progress Bar */}
      <motion.div
        initial={{ opacity: 0, width: 0 }}
        animate={{ opacity: 1, width: '180px' }}
        transition={{ duration: 0.5, delay: 1.5 }}
        className="mt-10 h-[1px] bg-white/10 relative overflow-hidden rounded-full"
      >
        <motion.div
          className="absolute left-0 top-0 h-full rounded-full"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, transparent, #C8A96A, #fff, #C8A96A, transparent)',
          }}
          transition={{ duration: 0.1 }}
        />
      </motion.div>

      {/* Decorative corner accents */}
      <div className="absolute top-8 left-8 w-12 h-12 border-t border-l border-accent/20" />
      <div className="absolute top-8 right-8 w-12 h-12 border-t border-r border-accent/20" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-b border-l border-accent/20" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-b border-r border-accent/20" />
    </motion.div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <ShopProvider>
      <Router>
        <ScrollToTop />
        
        <AnimatePresence mode="wait">
          {loading ? (
            <LuxuryLoadingScreen key="loader" onComplete={() => setLoading(false)} />
          ) : (
            <motion.div
              key="app"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col min-h-screen bg-brand-bg text-brand-text font-body selection:bg-accent/30 selection:text-primary"
            >
              <Navbar />
              <main className="flex-grow">
                <AnimatedRoutes />
              </main>
              <Footer />
              <CartDrawer />
              <QuickViewModal />
            </motion.div>
          )}
        </AnimatePresence>
      </Router>
    </ShopProvider>
  );
}

export default App;

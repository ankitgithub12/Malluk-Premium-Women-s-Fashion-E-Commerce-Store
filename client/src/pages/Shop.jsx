import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, ChevronDown, Check, X, Grid, List } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 25, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
};

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // States
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [priceRange, setPriceRange] = useState(80000); // Max price limit
  const [sortBy, setSortBy] = useState('featured');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Read URL query parameters on mount or change
  useEffect(() => {
    window.scrollTo(0, 0);

    const catParam = searchParams.get('category');
    const collParam = searchParams.get('collection');
    
    if (catParam) {
      setSelectedCategories([catParam]);
    } else {
      setSelectedCategories([]);
    }

    if (collParam) {
      // Map collection slug to corresponding products
      if (collParam === 'festive-embroidered') {
        setSelectedCategories(['Embroidered Suit Sets']);
      } else if (collParam === 'chikankari-lace') {
        setSelectedCategories(['Chikankari Suit Sets']);
      } else if (collParam === 'ivory-florals') {
        setSelectedCategories(['Floral Suit Sets']);
      } else if (collParam === 'premium-cottons') {
        setSelectedCategories(['Cotton Suit Sets']);
      }
    }
  }, [searchParams]);

  // Unique lists from mock data
  const allSizes = useMemo(() => {
    const sizes = new Set();
    products.forEach(p => p.sizes.forEach(s => sizes.add(s)));
    return Array.from(sizes).sort();
  }, []);

  const allColors = useMemo(() => {
    const colorMap = new Map();
    products.forEach(p => p.colors.forEach(c => colorMap.set(c.name, c.hex)));
    return Array.from(colorMap.entries()).map(([name, hex]) => ({ name, hex }));
  }, []);

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    const searchVal = searchParams.get('search')?.toLowerCase() || '';

    return products.filter((p) => {
      // Search check
      if (searchVal && !p.name.toLowerCase().includes(searchVal) && !p.description.toLowerCase().includes(searchVal)) {
        return false;
      }
      
      // Category check
      if (selectedCategories.length > 0 && !selectedCategories.includes(p.category)) {
        return false;
      }

      // Size check
      if (selectedSizes.length > 0 && !p.sizes.some(s => selectedSizes.includes(s))) {
        return false;
      }

      // Color check
      if (selectedColors.length > 0 && !p.colors.some(c => selectedColors.includes(c.name))) {
        return false;
      }

      // Price check
      if (p.price > priceRange) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      // Sorting
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // Default featured order
    });
  }, [selectedCategories, selectedSizes, selectedColors, priceRange, sortBy, searchParams]);

  const toggleCategory = (cat) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const toggleSize = (size) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (colorName) => {
    setSelectedColors(prev =>
      prev.includes(colorName) ? prev.filter(c => c !== colorName) : [...prev, colorName]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange(80000);
    setSearchParams({});
  };

  const hasActiveFilters = selectedCategories.length > 0 || selectedSizes.length > 0 || selectedColors.length > 0 || priceRange < 80000;

  return (
    <div className="pt-44 sm:pt-48 pb-24 bg-brand-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Banner / Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-accent font-semibold block mb-4">
            ✦ Atelier Shop ✦
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-wide text-primary uppercase mb-5">
            Curated <span className="font-serif italic font-normal text-accent normal-case">Apparel</span>
          </h1>
          <div className="section-ornament mt-5">
            <span className="diamond" />
          </div>
          <p className="text-xs text-brand-text/50 tracking-wider leading-relaxed font-body mt-5 max-w-md mx-auto">
            Indulge in our collection of fluid slip dresses, tailored outer coats, and premium knit sets designed for exquisite tastes.
          </p>
        </motion.div>

        {/* Toolbar (Filters & Sort Selection) */}
        <motion.div
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-5 border-y border-primary/10 mb-10 bg-white px-6 shadow-sm"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center gap-4">
            <motion.button
              onClick={() => setShowMobileFilters(true)}
              className="md:hidden flex items-center gap-2 border border-surface px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-primary hover:border-accent transition-colors"
              whileTap={{ scale: 0.97 }}
            >
              <SlidersHorizontal size={14} />
              Filters
            </motion.button>

            <span className="text-xs tracking-wider text-brand-text/50 font-body">
              Showing <span className="text-primary font-semibold">{filteredProducts.length}</span> premium pieces
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            {/* Active filters display */}
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="hidden sm:flex items-center gap-1.5 text-xs text-accent hover:text-primary font-semibold tracking-wider uppercase transition-colors"
              >
                Clear Filters
                <X size={12} />
              </button>
            )}

            {/* Sort Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-brand-text/50 font-body hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-surface bg-white text-xs tracking-wider uppercase px-4 py-2.5 focus:border-accent text-primary font-semibold cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Active filter chips */}
        <AnimatePresence>
          {hasActiveFilters && (
            <motion.div
              className="flex flex-wrap gap-2 mb-8"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              {selectedCategories.map(cat => (
                <motion.button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/5 border border-primary/10 text-xs tracking-wider text-primary font-medium hover:bg-primary hover:text-white transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  {cat}
                  <X size={10} />
                </motion.button>
              ))}
              {selectedSizes.map(size => (
                <motion.button
                  key={size}
                  onClick={() => toggleSize(size)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-accent/10 border border-accent/20 text-xs tracking-wider text-primary font-medium hover:bg-accent hover:text-primary transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  Size: {size}
                  <X size={10} />
                </motion.button>
              ))}
              {selectedColors.map(color => (
                <motion.button
                  key={color}
                  onClick={() => toggleColor(color)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-accent/10 border border-accent/20 text-xs tracking-wider text-primary font-medium hover:bg-accent hover:text-primary transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  {color}
                  <X size={10} />
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content Layout */}
        <div className="flex gap-10">
          
          {/* Left: Sidebar Filters (Desktop) */}
          <aside className="hidden md:block w-64 flex-shrink-0 bg-white p-6 border border-primary/5 shadow-sm space-y-8 h-fit sticky top-44">
            
            {/* Category Filter */}
            <div>
              <h3 className="text-xs uppercase tracking-widest font-bold text-primary mb-4 pb-2 border-b border-surface">
                Category
              </h3>
              <div className="space-y-2.5">
                {categories.map((cat) => {
                  const isChecked = selectedCategories.includes(cat.name);
                  return (
                    <button
                      key={cat.id}
                      onClick={() => toggleCategory(cat.name)}
                      className={`flex items-center justify-between w-full text-left text-xs tracking-wider font-body transition-all duration-300 hover:pl-1
                        ${isChecked ? 'text-accent font-semibold' : 'text-brand-text/85 hover:text-accent'}`}
                    >
                      <span>{cat.name}</span>
                      <span className="text-[10px] text-brand-text/40 font-body">({cat.itemCount})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Colors Filter */}
            <div>
              <h3 className="text-xs uppercase tracking-widest font-bold text-primary mb-4 pb-2 border-b border-surface">
                Colors
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {allColors.map((color) => {
                  const isSelected = selectedColors.includes(color.name);
                  return (
                    <button
                      key={color.name}
                      onClick={() => toggleColor(color.name)}
                      className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300 ${
                        isSelected ? 'border-accent scale-110 shadow-sm' : 'border-transparent hover:scale-110'
                      }`}
                      title={color.name}
                    >
                      <span className="w-4.5 h-4.5 rounded-full block border border-black/10" style={{ backgroundColor: color.hex }} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sizes Filter */}
            <div>
              <h3 className="text-xs uppercase tracking-widest font-bold text-primary mb-4 pb-2 border-b border-surface">
                Sizes
              </h3>
              <div className="flex flex-wrap gap-2">
                {allSizes.map((size) => {
                  const isSelected = selectedSizes.includes(size);
                  return (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`px-3 py-1.5 border text-[10px] tracking-widest transition-all duration-300 ${
                        isSelected
                          ? 'border-primary bg-primary text-white font-semibold'
                          : 'border-surface hover:border-primary/50 text-primary'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <h3 className="text-xs uppercase tracking-widest font-bold text-primary mb-4 pb-2 border-b border-surface">
                Max Price
              </h3>
              <div className="space-y-3 font-body">
                <input
                  type="range"
                  min="10000"
                  max="80000"
                  step="2000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-accent bg-surface h-1 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] tracking-wider text-brand-text/60">
                  <span>₹10,000</span>
                  <span className="font-semibold text-primary">₹{priceRange.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Clear Button inside Sidebar */}
            {hasActiveFilters && (
              <motion.button
                onClick={clearAllFilters}
                className="w-full bg-surface text-primary border border-surface py-3 text-xs uppercase tracking-widest font-semibold hover:border-accent hover:bg-primary hover:text-white transition-all duration-400"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Clear All
              </motion.button>
            )}
          </aside>

          {/* Right: Product Grid */}
          <main className="flex-1 min-w-0">
            {filteredProducts.length === 0 ? (
              <motion.div
                className="text-center py-20 bg-white border border-primary/5 p-8 max-w-lg mx-auto shadow-sm"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <h3 className="font-heading text-xl uppercase tracking-widest text-primary font-semibold mb-2">No items found</h3>
                <p className="text-xs text-brand-text/50 font-body leading-relaxed mb-6">
                  We couldn't find any garments matching your filter selection. Try clearing filters to browse our full catalog.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="bg-primary text-white text-xs uppercase tracking-widest px-8 py-3.5 hover:bg-accent hover:text-primary transition-all duration-400 font-semibold btn-shimmer"
                >
                  Show All Items
                </button>
              </motion.div>
            ) : (
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                key={`${selectedCategories.join(',')}-${sortBy}-${priceRange}`}
              >
                {filteredProducts.map((product) => (
                  <motion.div key={product.id} variants={itemVariants}>
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </main>

        </div>

      </div>

      {/* Mobile Filters Drawer Overlay */}
      <AnimatePresence>
        {showMobileFilters && (
          <div className="fixed inset-0 z-50 md:hidden">
            <motion.div
              className="absolute inset-0 bg-primary/40 backdrop-blur-sm"
              onClick={() => setShowMobileFilters(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="absolute inset-y-0 left-0 w-[85vw] max-w-sm bg-brand-bg shadow-2xl flex flex-col justify-between p-6 overflow-y-auto"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="space-y-8">
                <div className="flex justify-between items-center pb-4 border-b border-primary/10">
                  <h3 className="font-heading text-lg tracking-widest uppercase text-primary font-semibold">Filter Atelier</h3>
                  <button onClick={() => setShowMobileFilters(false)} className="p-1 hover:text-accent transition-colors">
                    <X size={20} />
                  </button>
                </div>

                {/* Categories */}
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest font-bold text-primary mb-3">Category</h4>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => {
                      const isChecked = selectedCategories.includes(cat.name);
                      return (
                        <button
                          key={cat.id}
                          onClick={() => toggleCategory(cat.name)}
                          className={`px-3 py-1.5 border text-xs font-body tracking-wider transition-all duration-300
                            ${isChecked ? 'border-primary bg-primary text-white font-semibold' : 'border-surface bg-white text-primary'}`}
                        >
                          {cat.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Colors */}
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest font-bold text-primary mb-3">Colors</h4>
                  <div className="flex flex-wrap gap-3">
                    {allColors.map((color) => {
                      const isSelected = selectedColors.includes(color.name);
                      return (
                        <button
                          key={color.name}
                          onClick={() => toggleColor(color.name)}
                          className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all ${
                            isSelected ? 'border-accent scale-110 shadow-sm' : 'border-transparent'
                          }`}
                        >
                          <span className="w-5 h-5 rounded-full block" style={{ backgroundColor: color.hex }} />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Sizes */}
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest font-bold text-primary mb-3">Sizes</h4>
                  <div className="flex flex-wrap gap-2">
                    {allSizes.map((size) => {
                      const isSelected = selectedSizes.includes(size);
                      return (
                        <button
                          key={size}
                          onClick={() => toggleSize(size)}
                          className={`px-3.5 py-2 border text-xs tracking-wider transition-all font-body ${
                            isSelected
                              ? 'border-primary bg-primary text-white'
                              : 'border-surface bg-white text-primary'
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Price limit */}
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest font-bold text-primary mb-3">Price Limit</h4>
                  <input
                    type="range"
                    min="10000"
                    max="80000"
                    step="2000"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full accent-accent bg-surface h-1"
                  />
                  <div className="flex justify-between text-xs font-body mt-2">
                    <span>₹10,000</span>
                    <span className="font-semibold text-primary">₹{priceRange.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-primary/10 mt-8 flex gap-3">
                <button
                  onClick={clearAllFilters}
                  className="flex-1 bg-surface text-primary border border-surface py-3.5 text-xs uppercase tracking-widest font-semibold"
                >
                  Reset
                </button>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="flex-1 bg-primary text-white py-3.5 text-xs uppercase tracking-widest font-semibold hover:bg-accent hover:text-primary transition-colors btn-shimmer"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

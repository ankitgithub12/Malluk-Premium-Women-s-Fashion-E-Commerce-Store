import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, ChevronDown, Check, X, Grid, List } from 'lucide-react';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';

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

  return (
    <div className="pt-28 pb-24 bg-brand-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Banner / Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-semibold block mb-3">
            Atelier Shop
          </span>
          <h1 className="text-4xl font-light tracking-wide text-primary uppercase mb-4">
            Curated <span className="font-serif italic font-normal text-accent normal-case">Apparel</span>
          </h1>
          <p className="text-xs text-brand-text/50 tracking-wider leading-relaxed font-body">
            Indulge in our collection of fluid slip dresses, tailored outer coats, and premium knit sets designed for exquisite tastes.
          </p>
        </div>

        {/* Toolbar (Filters & Sort Selection) */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 py-6 border-y border-primary/10 mb-10 bg-white px-6 shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowMobileFilters(true)}
              className="md:hidden flex items-center gap-2 border border-surface px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-primary"
            >
              <SlidersHorizontal size={14} />
              Filters
            </button>

            <span className="text-xs tracking-wider text-brand-text/50 font-body">
              Showing {filteredProducts.length} premium pieces
            </span>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            {/* Active filters display */}
            {(selectedCategories.length > 0 || selectedSizes.length > 0 || selectedColors.length > 0) && (
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
                className="border border-surface bg-white text-xs tracking-wider uppercase px-4 py-2.5 focus:border-accent text-primary font-semibold"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="flex gap-10">
          
          {/* Left: Sidebar Filters (Desktop) */}
          <aside className="hidden md:block w-64 flex-shrink-0 bg-white p-6 border border-primary/5 shadow-sm space-y-8 h-fit sticky top-28">
            
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
                      className={`flex items-center justify-between w-full text-left text-xs tracking-wider font-body hover:text-accent transition-colors
                        ${isChecked ? 'text-accent font-semibold' : 'text-brand-text/85'}`}
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
                      className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                        isSelected ? 'border-accent scale-110 shadow-sm' : 'border-transparent hover:scale-105'
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
                      className={`px-3 py-1.5 border text-[10px] tracking-widest transition-all ${
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
            {(selectedCategories.length > 0 || selectedSizes.length > 0 || selectedColors.length > 0 || priceRange < 80000) && (
              <button
                onClick={clearAllFilters}
                className="w-full bg-surface text-primary border border-surface py-3 text-xs uppercase tracking-widest font-semibold hover:border-accent hover:bg-primary hover:text-white transition-all duration-300"
              >
                Clear All
              </button>
            )}
          </aside>

          {/* Right: Product Grid */}
          <main className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white border border-primary/5 p-8 max-w-lg mx-auto">
                <h3 className="font-heading text-xl uppercase tracking-widest text-primary font-semibold mb-2">No items found</h3>
                <p className="text-xs text-brand-text/50 font-body leading-relaxed mb-6">
                  We couldn't find any garments matching your filter selection. Try clearing filters to browse our full catalog.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="bg-primary text-white text-xs uppercase tracking-widest px-8 py-3.5 hover:bg-accent hover:text-primary transition-all duration-300 font-semibold"
                >
                  Show All Items
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>

        </div>

      </div>

      {/* Mobile Filters Drawer Overlay */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-primary/40 backdrop-blur-sm" onClick={() => setShowMobileFilters(false)} />
          <div className="absolute inset-y-0 left-0 w-80 bg-brand-bg shadow-2xl flex flex-col justify-between p-6 overflow-y-auto">
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
                        className={`px-3 py-1.5 border text-xs font-body tracking-wider transition-all
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
                className="flex-1 bg-primary text-white py-3.5 text-xs uppercase tracking-widest font-semibold hover:bg-accent hover:text-primary transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { createContext, useState, useEffect } from 'react';

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('malluk_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlistItems, setWishlistItems] = useState(() => {
    const saved = localStorage.getItem('malluk_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Synchronize with localStorage
  useEffect(() => {
    localStorage.setItem('malluk_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('malluk_wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  // Cart operations
  const addToCart = (product, size, color, quantity = 1) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor.name === color.name
      );

      if (existingIndex > -1) {
        const newItems = [...prev];
        newItems[existingIndex].quantity += quantity;
        return newItems;
      }

      return [...prev, { product, selectedSize: size, selectedColor: color, quantity }];
    });
    setIsCartOpen(true); // Open drawer immediately on add to cart
  };

  const removeFromCart = (productId, size, colorName) => {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedSize === size &&
            item.selectedColor.name === colorName
          )
      )
    );
  };

  const updateCartQuantity = (productId, size, colorName, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId, size, colorName);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId &&
        item.selectedSize === size &&
        item.selectedColor.name === colorName
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Wishlist operations
  const toggleWishlist = (product) => {
    setWishlistItems((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  // Quick View operations
  const openQuickView = (product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  const closeQuickView = () => {
    setIsQuickViewOpen(false);
    setQuickViewProduct(null);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const cartTotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <ShopContext.Provider
      value={{
        cartItems,
        wishlistItems,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        isQuickViewOpen,
        setIsQuickViewOpen,
        quickViewProduct,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        openQuickView,
        closeQuickView,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

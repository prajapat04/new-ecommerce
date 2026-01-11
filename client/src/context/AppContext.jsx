// src/context/AppContext.jsx
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

// ----------------------------
// Axios global config
// ----------------------------
axios.defaults.baseURL = "https://new-ecommerce-backend-seven.vercel.app";
axios.defaults.withCredentials = true;

export const AppContext = createContext(null);

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();

  // ----------------------------
  // STATES
  // ----------------------------
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState({});
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // ----------------------------
  // USER FUNCTIONS
  // ----------------------------
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/is-auth");
      console.log("AUTH CHECK:", data);

      if (data.success) {
        setUser(data.user);
        setCartItems(data.user.cartItems || {});
      }
      // ❌ else me kuch mat karo, refresh fail = no logout
    } catch (error) {
      console.log("Auth check failed:", error.message);
      // ❌ YAHAN setUser(null) MAT KARO
    }
  };

  // ----------------------------
  // SELLER FUNCTIONS
  // ----------------------------
  const fetchSeller = async () => {
    try {
      const { data } = await axios.get("/api/seller/is-auth");
      setIsSeller(data.success ? true : false);
    } catch {
      setIsSeller(false);
    }
  };

  // ----------------------------
  // PRODUCT FUNCTIONS
  // ----------------------------
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/product/list");
      if (data.success) setProducts(data.products);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ----------------------------
  // CART FUNCTIONS
  // ----------------------------
  const addToCart = (itemId) => {
    const newCart = { ...cartItems };
    newCart[itemId] = newCart[itemId] ? newCart[itemId] + 1 : 1;
    setCartItems(newCart);
    toast.success("Added to cart");
  };

  const updateCartItem = (itemId, quantity) => {
    const newCart = structuredClone(cartItems);
    newCart[itemId] = quantity;
    setCartItems(newCart);
    toast.success("Cart updated");
  };

  const removeFromCart = (itemId) => {
    const newCart = { ...cartItems };
    if (newCart[itemId]) {
      newCart[itemId] -= 1;
      if (newCart[itemId] === 0) delete newCart[itemId];
      setCartItems(newCart);
      toast.success("Removed from cart");
    }
  };

  const cartCount = () => Object.values(cartItems).reduce((a, b) => a + b, 0);

  const totalCartAmount = () => {
    let total = 0;
    for (const id in cartItems) {
      const product = products.find((p) => p._id === id);
      if (product) total += cartItems[id] * product.offerPrice;
    }
    return Math.round(total * 100) / 100;
  };

  // ----------------------------
  // INITIAL DATA FETCH
  // ----------------------------
  useEffect(() => {
    fetchUser();
    fetchSeller();
    fetchProducts();
  }, []);

  // ----------------------------
  // SYNC CART WITH BACKEND
  // ----------------------------
  useEffect(() => {
    if (!user) return;

    const updateCart = async () => {
      try {
        await axios.post("/api/cart/update", { cartItems });
      } catch (error) {
        console.log("Cart sync failed:", error.message);
      }
    };

    updateCart();
  }, [cartItems, user]);

  // ----------------------------
  // CONTEXT PROVIDER
  // ----------------------------
  return (
    <AppContext.Provider
      value={{
        navigate,
        user,
        setUser,
        isSeller,
        setIsSeller,
        showUserLogin,
        setShowUserLogin,
        products,
        addToCart,
        updateCartItem,
        removeFromCart,
        cartItems,
        searchQuery,
        setSearchQuery,
        setCartItems,
        cartCount,
        totalCartAmount,
        axios,
        fetchProducts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;

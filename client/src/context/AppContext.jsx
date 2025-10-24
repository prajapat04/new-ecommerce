import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

// Ensure axios sends cookies & points to backend
axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext(null);

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();

  // User States
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState({});
  
  // Seller States
  const [isSeller, setIsSeller] = useState(false);

  //show login  
  const [showUserLogin, setShowUserLogin] = useState(false);
  

  // Products & Search
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");


  

  // ----------------------------
  // SELLER FUNCTIONS
  // ----------------------------
  const fetchSeller = async () => {
    try {
      const { data } = await axios.get('/api/seller/is-auth', { withCredentials: true });
      if(data.success){
        setIsSeller(true)
      }else{
        setIsSeller(false)
      }
    } catch (error) {
      setIsSeller(false)
    }
  };


    // ----------------------------
  // USER FUNCTIONS
  // ----------------------------
  const fetchUser = async ()=> {
    try {
      const { data } = await axios.get("/api/user/is-auth", { withCredentials: true });
      console.log(data);
      if (data.success) {
        setUser(data.user)
       setCartItems(data.user.cartItems)
      }
    } catch (error) {
      console.log(error.message)
          setUser(null);
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
      toast.error(error.message)
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

  const updateCartItem = (itemId, quantity)=>{
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData)
    toast.success("cart Updated")
  }

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

  
  // Fetch initial data
  useEffect(() => {
   setTimeout(() => fetchUser(), 1000);
    fetchSeller();
    fetchProducts();
  },[]);

  // Sync cart with backend whenever user changes it
  useEffect(() => {
    const updateCart = async () => {  
      try {
       const {data} = await axios.post("/api/cart/update",  {cartItems}, { withCredentials: true });
       if(!data.success){
        toast.error(data.message)
       }
      } catch (error) {
        toast.error(error.message);
      }
    }
    if(user){
      updateCart();
    }
  }, [cartItems]);


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
        fetchProducts
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;

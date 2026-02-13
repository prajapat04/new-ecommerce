import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useNavigate } from 'react-router-dom';
import { assets } from "../assets/assets";
import toast from "react-hot-toast";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const { user, setUser, setShowUserLogin, cartCount, searchQuery, setSearchQuery, axios } = useContext(AppContext);

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/user/logout", { withCredentials: true });

      if (data?.success) {
        toast.success(data.message || "Logged out successfully");
      } else {
        toast.error(data?.message || "Logout failed");
      }
    } catch (error) {
      if (error.response?.status === 401) {
        toast.success("Logged out successfully");
      } else {
        toast.error(error.response?.data?.message || error.message);
      }
    } finally {
      setUser(null);
      navigate("/");
    }
  };

  useEffect(() => {
    if (searchQuery && searchQuery.length > 0) navigate("/products");
  }, [searchQuery]);

  return (
    <nav className="flex items-center justify-between px-6 md:px-12 lg:px-20 py-5 bg-white/80 backdrop-blur-md sticky top-0 z-[100] border-b border-gray-100 transition-all duration-300">
      {/* Logo */}
      <Link to={"/"} className="relative z-50 flex items-center gap-2 group">
        <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-100 group-hover:rotate-6 transition-transform">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
        </div>
        <h1 className="text-xl md:text-2xl font-black tracking-tight text-gray-900 group-hover:text-orange-600 transition-colors">
          Grocery<span className="text-orange-600">App</span>
        </h1>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-8 lg:gap-12">
        <NavLink to="/" className={({ isActive }) => `text-sm font-bold transition-all hover:text-orange-600 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-orange-600 after:transition-all hover:after:w-full ${isActive ? 'text-orange-600 after:w-full' : 'text-gray-500'}`}>
          Home
        </NavLink>
        <NavLink to="/products" className={({ isActive }) => `text-sm font-bold transition-all hover:text-orange-600 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-orange-600 after:transition-all hover:after:w-full ${isActive ? 'text-orange-600 after:w-full' : 'text-gray-500'}`}>
          All Products
        </NavLink>

        {/* Search Bar - Modernized */}
        <div className="hidden lg:flex items-center bg-gray-50 border border-transparent focus-within:border-orange-200 focus-within:bg-white focus-within:shadow-sm px-4 py-2 rounded-2xl transition-all duration-300">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-48 xl:w-72 bg-transparent outline-none text-sm font-medium text-gray-700 placeholder:text-gray-400"
            type="text"
            placeholder="Search fresh groceries..."
          />
          <svg className="text-gray-400 pointer-events-none" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-4 lg:gap-6 relative z-50">
        {/* Cart */}
        <div onClick={() => { navigate("/cart"); window.scrollTo(0, 0); }} className="relative cursor-pointer group p-2 hover:bg-orange-50 rounded-xl transition-colors">
          <svg className="w-6 h-6 text-gray-700 group-hover:text-orange-600 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
          </svg>
          <span className="absolute top-1 right-1 text-[10px] font-black text-white bg-orange-600 w-5 h-5 flex items-center justify-center rounded-full border-2 border-white group-hover:scale-110 transition-transform">
            {cartCount ? cartCount() : 0}
          </span>
        </div>

        {/* User Auth */}
        <div className="hidden sm:block">
          {user ? (
            <div className="relative group">
              <div className="flex items-center gap-2 cursor-pointer p-1 pr-3 hover:bg-gray-50 rounded-2xl transition-colors border border-transparent hover:border-gray-100">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center overflow-hidden border border-indigo-100">
                  <img src={assets.profile_icon} alt="user" className="w-6 h-6 opacity-70" />
                </div>
                <span className="text-sm font-bold text-gray-700 hidden lg:block">{user.name?.split(' ')[0]}</span>
              </div>

              <div className="invisible group-hover:visible absolute top-full right-0 mt-2 bg-white shadow-2xl rounded-3xl border border-gray-100 py-3 w-48 z-[110] transform origin-top-right transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
                <div className="px-4 py-2 border-b border-gray-50 mb-1 pointer-events-none">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Account</p>
                </div>
                <button onClick={() => navigate("/my-orders")} className="w-full text-left px-4 py-2.5 text-sm font-bold text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition-colors block">
                  My Orders
                </button>
                <button onClick={logout} className="w-full text-left px-4 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 transition-colors block">
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowUserLogin(true)}
              className="px-8 py-3 bg-gray-900 hover:bg-indigo-600 transition-all text-white rounded-2xl text-sm font-black shadow-lg shadow-gray-100 active:scale-95"
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden w-11 h-11 flex items-center justify-center hover:bg-orange-50 hover:text-orange-600 rounded-xl transition-all">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            {open ? <path d="M18 6L6 18M6 6l12 12" /> : (
              <>
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer Backdrop */}
      <div className={`fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-40 transition-all duration-300 md:hidden ${open ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`} onClick={() => setOpen(false)}></div>

      {/* Mobile Drawer Content */}
      <div className={`fixed top-0 bottom-0 right-0 w-[320px] sm:w-[400px] h-screen bg-white z-[60] shadow-2xl p-8 flex flex-col transition-all duration-500 md:hidden overflow-y-auto overflow-x-hidden ${open ? 'translate-x-0 visible opacity-100' : 'translate-x-full invisible opacity-0'}`}>
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-2xl font-black text-gray-900">Menu</h2>
          <button onClick={() => setOpen(false)} className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 rounded-xl transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
        </div>

        <nav className="flex flex-col gap-6">
          <Link to="/" onClick={() => setOpen(false)} className="text-xl font-bold text-gray-800 hover:text-orange-600 transition-colors">Home</Link>
          <Link to="/products" onClick={() => setOpen(false)} className="text-xl font-bold text-gray-800 hover:text-orange-600 transition-colors">Products</Link>
          {user && <Link to="/my-orders" onClick={() => setOpen(false)} className="text-xl font-bold text-gray-800 hover:text-orange-600 transition-colors">My Orders</Link>}
        </nav>

        <div className="mt-auto pt-8 border-t border-gray-100">
          {user ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-orange-600 flex items-center justify-center text-white font-black text-xl">
                  {user.name?.[0]}
                </div>
                <div>
                  <p className="font-black text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-400 font-bold">{user.email}</p>
                </div>
              </div>
              <button onClick={() => { logout(); setOpen(false); }} className="w-full py-4 bg-red-50 text-red-600 rounded-2xl font-black transition-all active:scale-95">
                Logout
              </button>
            </div>
          ) : (
            <button onClick={() => { setShowUserLogin(true); setOpen(false); }} className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black shadow-xl shadow-gray-100 active:scale-95">
              Login / Sign Up
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar;

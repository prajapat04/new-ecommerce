import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const AddAddress = () => {
  const { axios, user, navigate } = useContext(AppContext);

  const [address, setAddress] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress, [name]: value,
    }))
  };

  const submitHandle = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post("/api/address/add", { address }, { withCredentials: true });
      if (data.success) {
        toast.success(data.message);
        navigate("/cart");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/cart");
    }
  }, [user, navigate])

  return (
    <div className="mt-8 md:mt-12 mb-20 max-w-6xl mx-auto px-4 md:px-6">
      <div className="flex flex-col lg:flex-row gap-12 items-center">
        {/* Left Side: Form */}
        <div className="flex-1 w-full animate-in fade-in slide-in-from-left-6 duration-700">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
              Add New <span className="text-orange-600">Address</span>
            </h1>
            <p className="text-gray-500 mt-2 text-sm md:text-base font-medium">Please provide your accurate delivery details.</p>
          </div>

          <form
            onSubmit={submitHandle}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 md:p-10 rounded-[40px] border border-gray-100 shadow-xl shadow-gray-50"
          >
            <div className="space-y-1.5 animate-in fade-in slide-in-from-bottom-2 duration-500" style={{ animationDelay: '100ms' }}>
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">First Name</label>
              <input
                type="text"
                name="firstName"
                value={address.firstName}
                onChange={handleChange}
                placeholder="John"
                className="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-orange-600 transition-all font-medium text-gray-800"
                required
              />
            </div>

            <div className="space-y-1.5 animate-in fade-in slide-in-from-bottom-2 duration-500" style={{ animationDelay: '200ms' }}>
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={address.lastName}
                onChange={handleChange}
                placeholder="Doe"
                className="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-orange-600 transition-all font-medium text-gray-800"
                required
              />
            </div>

            <div className="col-span-1 md:col-span-2 space-y-1.5 animate-in fade-in slide-in-from-bottom-2 duration-500" style={{ animationDelay: '300ms' }}>
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={address.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-orange-600 transition-all font-medium text-gray-800"
                required
              />
            </div>

            <div className="col-span-1 md:col-span-2 space-y-1.5 animate-in fade-in slide-in-from-bottom-2 duration-500" style={{ animationDelay: '400ms' }}>
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Street Address</label>
              <input
                type="text"
                name="street"
                value={address.street}
                onChange={handleChange}
                placeholder="123 Luxury Avenue"
                className="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-orange-600 transition-all font-medium text-gray-800"
                required
              />
            </div>

            <div className="space-y-1.5 animate-in fade-in slide-in-from-bottom-2 duration-500" style={{ animationDelay: '500ms' }}>
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">City</label>
              <input
                type="text"
                name="city"
                value={address.city}
                onChange={handleChange}
                placeholder="New York"
                className="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-orange-600 transition-all font-medium text-gray-800"
                required
              />
            </div>

            <div className="space-y-1.5 animate-in fade-in slide-in-from-bottom-2 duration-500" style={{ animationDelay: '600ms' }}>
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">State</label>
              <input
                type="text"
                name="state"
                value={address.state}
                onChange={handleChange}
                placeholder="NY"
                className="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-orange-600 transition-all font-medium text-gray-800"
                required
              />
            </div>

            <div className="space-y-1.5 animate-in fade-in slide-in-from-bottom-2 duration-500" style={{ animationDelay: '700ms' }}>
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Zip Code</label>
              <input
                type="number"
                name="zipCode"
                value={address.zipCode}
                onChange={handleChange}
                placeholder="10001"
                className="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-orange-600 transition-all font-medium text-gray-800"
                required
              />
            </div>

            <div className="space-y-1.5 animate-in fade-in slide-in-from-bottom-2 duration-500" style={{ animationDelay: '800ms' }}>
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Country</label>
              <input
                type="text"
                name="country"
                value={address.country}
                onChange={handleChange}
                placeholder="United States"
                className="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-orange-600 transition-all font-medium text-gray-800"
                required
              />
            </div>

            <div className="col-span-1 md:col-span-2 space-y-1.5 animate-in fade-in slide-in-from-bottom-2 duration-500" style={{ animationDelay: '900ms' }}>
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Phone Number</label>
              <input
                type="number"
                name="phone"
                value={address.phone}
                onChange={handleChange}
                placeholder="+1 234 567 890"
                className="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-orange-600 transition-all font-medium text-gray-800"
                required
              />
            </div>

            <div className="col-span-1 md:col-span-2 pt-4">
              <button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-2xl font-black text-lg shadow-lg shadow-orange-100 transition-all active:scale-95"
              >
                Save Delivery Address
              </button>
            </div>
          </form>
        </div>

        {/* Right Side: Visual */}
        <div className="flex-1 hidden md:flex items-center justify-center animate-in fade-in zoom-in duration-1000 delay-300">
          <div className="relative">
            <div className="absolute -inset-4 bg-orange-100/50 rounded-full blur-3xl opacity-60"></div>
            <img
              src={assets.add_address_image}
              alt="Address Illustration"
              className="relative w-full max-w-sm rounded-[40px] shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddAddress;
import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";

export const SellerLogin = () => {
  const { isSeller, navigate, axios, setIsSeller } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      const {data} = await axios.post('/api/seller/login', {email, password}, { withCredentials: true })
      if(data.success){
        setIsSeller(true)
        navigate('/seller')
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      
    }   
    };
    
    // Redirect if already logged in
    useEffect(() => {
      if (isSeller){ navigate("/seller") }
    }, [isSeller]);

    
  return (
    !isSeller && (
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black/50">
        <form
          onSubmit={submitHandler}
          className="flex flex-col gap-4 p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white"
        >
          <p className="text-2xl font-medium m-auto">
            <span className="text-indigo-500">Seller Login</span>
          </p>

          <div className="w-full">
            <p>Email</p>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
              required
            />
          </div>

          <div className="w-full">
            <p>Password</p>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white w-full py-2 rounded-md cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
    )
  );
};

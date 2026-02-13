import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { axios, user } = useContext(AppContext);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/user");
      if (data.success) {
        setMyOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered': return 'bg-green-100 text-green-700 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
      case 'processing': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-orange-100 text-orange-700 border-orange-200';
    }
  };

  return (
    <div className='mt-8 md:mt-12 pb-20 max-w-5xl mx-auto'>
      <div className="mb-10 px-2 animate-in fade-in slide-in-from-top-4 duration-500">
        <h1 className='text-3xl md:text-4xl font-extrabold text-gray-900'>My Orders</h1>
        <p className='text-gray-500 mt-2 text-sm md:text-base'>Track and manage your grocery deliveries.</p>
      </div>

      {myOrders.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-100 animate-in fade-in zoom-in duration-500">
          <p className="text-gray-400 text-lg">You haven't placed any orders yet.</p>
          <Link to="/products" className="inline-block mt-4 text-orange-600 font-bold hover:underline">Start Shopping →</Link>
        </div>
      ) : (
        <div className="space-y-8">
          {myOrders.map((order, orderIndex) => (
            <div
              key={order._id}
              className='bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow animate-in fade-in slide-in-from-bottom-4 duration-500'
              style={{ animationDelay: `${orderIndex * 100}ms` }}
            >
              {/* Order Header */}
              <div className='bg-gray-50/50 px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-100'>
                <div className="grid grid-cols-2 md:flex md:items-center gap-4 text-xs md:text-sm text-gray-500 font-medium">
                  <div>
                    <p className="uppercase tracking-wider text-[10px] text-gray-400">Order ID</p>
                    <p className="text-gray-700">#{order._id.slice(-8).toUpperCase()}</p>
                  </div>
                  <div>
                    <p className="uppercase tracking-wider text-[10px] text-gray-400">Date</p>
                    <p className="text-gray-700">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="hidden md:block w-px h-8 bg-gray-200 mx-2"></div>
                  <div>
                    <p className="uppercase tracking-wider text-[10px] text-gray-400">Total Amount</p>
                    <p className="text-orange-600 font-bold">${order.amount}</p>
                  </div>
                  <div>
                    <p className="uppercase tracking-wider text-[10px] text-gray-400">Payment</p>
                    <p className="text-gray-700">{order.paymentType}</p>
                  </div>
                </div>

                <span className={`px-4 py-1.5 rounded-full text-xs font-bold border ${getStatusColor(order.status)}`}>
                  {order.status || "Pending"}
                </span>
              </div>

              {/* Order Items */}
              <div className='divide-y divide-gray-50 px-6'>
                {order.items.map((item, itemIndex) => (
                  <div key={itemIndex} className='py-5 flex flex-col sm:flex-row items-center justify-between gap-6 hover:bg-orange-50/10 transition-colors'>
                    <div className='flex items-center gap-4 flex-1 w-full'>
                      <div className='w-20 h-20 bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center p-2 border border-gray-100'>
                        <img src={item.product.image[0]} alt={item.product.name} className='w-full h-full object-contain' />
                      </div>
                      <div>
                        <h3 className='text-gray-900 font-bold text-base md:text-lg'>{item.product.name}</h3>
                        <p className='text-gray-400 text-xs md:text-sm uppercase tracking-wider'>{item.product.category}</p>
                        <p className="text-gray-500 text-sm mt-1">Qty: <span className="font-bold text-gray-700">{item.quantity || 1}</span></p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-8 sm:gap-12">
                      <div className="text-right">
                        <p className="text-[10px] text-gray-400 uppercase font-bold">Price</p>
                        <p className='text-gray-700 font-semibold'>${item.product.offerPrice}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-gray-400 uppercase font-bold">Subtotal</p>
                        <p className='text-orange-600 font-bold text-lg'>${item.product.offerPrice * (item.quantity || 1)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Footer - Mobile Friendly */}
              {/* <div className="md:hidden bg-gray-50/30 px-6 py-4 border-t border-gray-100">
                <Link
                  to={`/order/${order._id}`}
                  className="block w-full text-center py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition"
                >
                  View Details
                </Link>
              </div> */}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

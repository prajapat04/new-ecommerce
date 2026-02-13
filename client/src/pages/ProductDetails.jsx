import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Link, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
const ProductDetails = () => {

  const { products, addToCart, navigate } = useContext(AppContext);
  const { id } = useParams();
  const [thumbnail, setThumbnail] = useState(null);
  const product = products.find((product) => product._id === id);

  useEffect(() => {
    setThumbnail(product?.image[0] ? product.image[0] : null);
  }, [product]);

  return product && (
    <div className="max-w-6xl mt-8 md:mt-16 w-full mx-auto">
      <p className="text-xs md:text-sm text-gray-500 overflow-x-auto whitespace-nowrap pb-2">
        <Link to={"/"} className="hover:text-orange-600 transition">Home</Link> /
        <Link to={`/products/${product.category.toLowerCase()}`} className="hover:text-orange-600 transition"> Products</Link> /
        <Link className="hover:text-orange-600 transition"> {product.category}</Link> /
        <span className="text-orange-600 font-medium"> {product.name}</span>
      </p>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 mt-6">
        {/* Left Side: Images */}
        <div className="flex flex-col-reverse md:flex-row gap-4 flex-1">
          <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto pb-2 md:pb-0 scrollbar-hide">
            {product.image.map((image, index) => (
              <div
                key={index}
                onClick={() => setThumbnail(image)}
                className={`border-2 rounded-xl overflow-hidden cursor-pointer min-w-[80px] md:min-w-0 transition-all ${thumbnail === image || (!thumbnail && index === 0) ? 'border-orange-600' : 'border-gray-100'}`}
              >
                <img src={image} alt={`Thumbnail ${index + 1}`} className="w-20 md:w-24 h-20 md:h-24 object-cover" />
              </div>
            ))}
          </div>

          <div className="flex-1 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 flex items-center justify-center p-4">
            <img
              src={thumbnail || product.image[0]}
              alt="Selected product"
              className="max-h-[300px] md:max-h-[500px] object-contain hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Right Side: Details */}
        <div className="flex-1">
          <p className="text-orange-600 text-xs font-bold uppercase tracking-widest">{product.category}</p>
          <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 mt-2">{product.name}</h1>

          <div className="flex items-center gap-2 mt-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <img key={i} src={i < 4 ? assets.star_icon : assets.star_dull_icon} alt="rating" className="w-4" />
              ))}
            </div>
            <p className="text-gray-500 text-sm font-medium">(4.0 Review)</p>
          </div>

          <div className="mt-8 p-6 bg-orange-50/50 rounded-2xl border border-orange-100/50">
            <div className="flex items-center gap-4">
              <span className="text-3xl font-black text-orange-600">${product.offerPrice}</span>
              <span className="text-lg text-gray-400 line-through">${product.price}</span>
              <span className="bg-orange-600 text-white text-xs font-bold py-1 px-2 rounded-lg">
                {Math.round(((product.price - product.offerPrice) / product.price) * 100)}% OFF
              </span>
            </div>
            <p className="text-gray-400 text-[10px] mt-1 font-medium italic">(inclusive of all taxes)</p>
          </div>

          <div className="mt-8">
            <p className="text-lg font-bold text-gray-900">Description</p>
            <ul className="mt-4 space-y-2">
              {product.description.map((desc, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-600 text-sm md:text-base">
                  <span className="text-orange-600 mt-1.5">•</span>
                  {desc}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row items-center mt-10 gap-4">
            <button
              onClick={() => addToCart(product._id)}
              className="w-full py-4 px-8 rounded-xl font-bold bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 transition active:scale-95 shadow-sm"
            >
              Add to Cart
            </button>
            <button
              onClick={() => {
                addToCart(product._id);
                navigate("/cart");
              }}
              className="w-full py-4 px-8 rounded-xl font-bold bg-orange-600 text-white hover:bg-orange-700 transition active:scale-95 shadow-lg shadow-orange-200"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
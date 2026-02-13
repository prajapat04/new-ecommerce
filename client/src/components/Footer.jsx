import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="w-full bg-white pt-24 pb-12 px-6 md:px-12 lg:px-20 border-t border-gray-100 overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-16 md:gap-24">
                {/* Brand Section */}
                <div className="max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <Link to="/" className="flex items-center gap-2 group mb-6">
                        <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-100">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                                <line x1="3" y1="6" x2="21" y2="6" />
                                <path d="M16 10a4 4 0 0 1-8 0" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-black tracking-tight text-gray-900">Grocery<span className="text-orange-600">App</span></h2>
                    </Link>
                    <p className="text-gray-500 font-medium leading-relaxed max-w-sm">
                        Bringing fresh, healthy, and premium groceries right to your doorstep. Your health is our priority, and quality is our promise.
                    </p>

                    <div className="flex items-center gap-4 mt-8">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 hover:bg-orange-600 hover:text-white transition-all cursor-pointer border border-transparent hover:shadow-lg hover:shadow-orange-100">
                                <span className="text-xs font-black">S{i}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Links Section */}
                <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-12 md:gap-16">
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-900 mb-6">Company</h3>
                        <ul className="space-y-4">
                            <li><Link to="/" className="text-gray-500 font-bold text-sm hover:text-orange-600 transition-colors">Home</Link></li>
                            <li><Link to="/products" className="text-gray-500 font-bold text-sm hover:text-orange-600 transition-colors">Our Products</Link></li>
                            <li><a href="#" className="text-gray-500 font-bold text-sm hover:text-orange-600 transition-colors">About Story</a></li>
                            <li><a href="#" className="text-gray-500 font-bold text-sm hover:text-orange-600 transition-colors">Careers</a></li>
                        </ul>
                    </div>

                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-900 mb-6">Support</h3>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-gray-500 font-bold text-sm hover:text-orange-600 transition-colors">Help Center</a></li>
                            <li><a href="#" className="text-gray-500 font-bold text-sm hover:text-orange-600 transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="text-gray-500 font-bold text-sm hover:text-orange-600 transition-colors">Return Policy</a></li>
                            <li><a href="#" className="text-gray-500 font-bold text-sm hover:text-orange-600 transition-colors">Newsletter</a></li>
                        </ul>
                    </div>

                    <div className="col-span-2 sm:col-span-1 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-900 mb-6">Contact</h3>
                        <div className="space-y-4">
                            <p className="text-gray-500 font-bold text-sm leading-6">
                                4826 Luxury Street, <br /> Fresh City, 90210
                            </p>
                            <p className="text-orange-600 font-black text-sm">
                                contact@groceryapp.com <br />
                                +1 (212) 456-7890
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-gray-50 flex flex-col md:flex-row items-center justify-between gap-6 px-4">
                <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest">
                    © 2024 GroceryApp. Crafted with ❤️ for Freshness.
                </p>
                <div className="flex items-center gap-8">
                    <a href="#" className="text-gray-400 font-bold text-[10px] uppercase tracking-widest hover:text-gray-900 transition-colors">Terms</a>
                    <a href="#" className="text-gray-400 font-bold text-[10px] uppercase tracking-widest hover:text-gray-900 transition-colors">Privacy</a>
                    <a href="#" className="text-gray-400 font-bold text-[10px] uppercase tracking-widest hover:text-gray-900 transition-colors">Cookies</a>
                </div>
            </div>
        </footer>
    );
};
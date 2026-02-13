const NewsLatter = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="relative overflow-hidden bg-gray-950 rounded-[40px] p-8 md:p-20 text-center">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-orange-600/20 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto">
                    <span className="bg-orange-600/10 text-orange-500 font-black text-[10px] uppercase tracking-[0.3em] px-4 py-1.5 rounded-full mb-6 border border-orange-600/20 shadow-lg shadow-orange-950/20">
                        Exclusive Access
                    </span>
                    <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4">
                        Never Miss a <span className="text-orange-600 italic">Fresh</span> Deal!
                    </h1>
                    <p className="text-gray-400 font-medium text-sm md:text-lg mb-10 leading-relaxed">
                        Join 10,000+ grocery lovers. Subscribe for exclusive discounts, seasonal arrivals, and organic tips.
                    </p>

                    <form className="w-full flex flex-col sm:flex-row items-center gap-3 p-2 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[30px] shadow-2xl transition-all focus-within:ring-2 focus-within:ring-orange-600/50">
                        <div className="flex-1 flex items-center gap-3 px-4 w-full">
                            <svg className="text-gray-500" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m22 2-7 20-4-9-9-4Z" />
                                <path d="M22 2 11 13" />
                            </svg>
                            <input
                                className="w-full bg-transparent outline-none text-white font-bold text-sm placeholder:text-gray-500 py-4"
                                type="email"
                                placeholder="Enter your premium email"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full sm:w-auto px-10 py-4 bg-orange-600 hover:bg-white hover:text-orange-600 text-white font-black rounded-[24px] shadow-xl shadow-orange-950/20 transition-all active:scale-95 cursor-pointer whitespace-nowrap"
                        >
                            Subscribe Now
                        </button>
                    </form>

                    <p className="mt-6 text-[10px] text-gray-600 font-bold uppercase tracking-widest">
                        Zero Spam. Pure Quality. Unsubscribe anytime.
                    </p>
                </div>
            </div>
        </div>
    )
}
export default NewsLatter;
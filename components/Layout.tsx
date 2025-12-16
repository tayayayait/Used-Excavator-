import React from 'react';
import { Menu, Search, User, HardHat } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();
    const isPDP = location.pathname.startsWith('/product/');

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-slate-900">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="bg-yellow-400 p-2 rounded-lg group-hover:bg-yellow-500 transition-colors">
                                <HardHat className="h-6 w-6 text-slate-900" />
                            </div>
                            <span className="text-xl font-bold tracking-tight">Heavy<span className="text-yellow-600">Market</span></span>
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-2 text-slate-600 hover:bg-gray-100 rounded-full md:hidden">
                            <Search className="h-5 w-5" />
                        </button>
                        <button className="hidden md:flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900">
                            <User className="h-5 w-5" />
                            <span>Sign In</span>
                        </button>
                        <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors hidden sm:block">
                            Sell Equipment
                        </button>
                        <button className="p-2 text-slate-900 md:hidden">
                            <Menu className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className={`flex-grow ${isPDP ? 'pb-24 md:pb-8' : 'pb-8'}`}>
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-slate-900 text-slate-400 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <HardHat className="h-6 w-6 text-yellow-400" />
                            <span className="text-xl font-bold text-white">HeavyMarket</span>
                        </div>
                        <p className="text-sm leading-relaxed max-w-sm">
                            The most trusted marketplace for buying and selling used heavy equipment. 
                            Transparency, structured data, and direct connection.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-white font-semibold mb-4">Marketplace</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-yellow-400 transition-colors">Excavators</a></li>
                            <li><a href="#" className="hover:text-yellow-400 transition-colors">Forklifts</a></li>
                            <li><a href="#" className="hover:text-yellow-400 transition-colors">Loaders</a></li>
                            <li><a href="#" className="hover:text-yellow-400 transition-colors">Attachments</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white font-semibold mb-4">Support</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-yellow-400 transition-colors">Help Center</a></li>
                            <li><a href="#" className="hover:text-yellow-400 transition-colors">Safety Tips</a></li>
                            <li><a href="#" className="hover:text-yellow-400 transition-colors">Contact Admin</a></li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800 text-xs text-center">
                    &copy; 2024 HeavyMarket Inc. All rights reserved.
                </div>
            </footer>
        </div>
    );
};
import React, { useState, useMemo } from 'react';
import { HashRouter, Routes, Route, useParams, Link } from 'react-router-dom';
import { Layout } from './components/Layout';
import { EquipmentCard } from './components/EquipmentCard';
import { FilterSidebar } from './components/FilterSidebar';
import { MOCK_EQUIPMENT, formatKoreanCurrency } from './constants';
import { Equipment, FilterState, EquipmentStatus } from './types';
import { Search, SlidersHorizontal, ChevronRight, Phone, Share2, ShieldCheck, MapPin, Calendar, Clock, Scale } from 'lucide-react';

/* --- List Page Component --- */
const ListingPage: React.FC = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filters, setFilters] = useState<FilterState>({
        searchTerm: '',
        type: 'All',
        manufacturer: 'All',
        minPrice: '',
        maxPrice: '',
        minYear: '',
        maxYear: '',
        weightClass: 'All'
    });

    // Filtering Logic
    const filteredEquipment = useMemo(() => {
        return MOCK_EQUIPMENT.filter(item => {
            if (filters.searchTerm && !item.title.toLowerCase().includes(filters.searchTerm.toLowerCase())) return false;
            if (filters.type !== 'All' && item.type !== filters.type) return false;
            if (filters.manufacturer !== 'All' && item.manufacturer !== filters.manufacturer) return false;
            if (filters.minPrice !== '' && item.price < filters.minPrice) return false;
            if (filters.maxPrice !== '' && item.price > filters.maxPrice) return false;
            return true;
        });
    }, [filters]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Search Bar & Filter Toggle */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input 
                        type="text" 
                        placeholder="Search model, brand, or keywords..."
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-shadow"
                        value={filters.searchTerm}
                        onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
                    />
                </div>
                <button 
                    onClick={() => setIsFilterOpen(true)}
                    className="lg:hidden flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-300 rounded-xl font-medium text-slate-900 shadow-sm hover:bg-gray-50"
                >
                    <SlidersHorizontal className="w-5 h-5" />
                    Filters
                </button>
            </div>

            <div className="flex gap-8 items-start">
                <FilterSidebar 
                    filters={filters} 
                    setFilters={setFilters} 
                    isOpen={isFilterOpen} 
                    onClose={() => setIsFilterOpen(false)}
                    matchCount={filteredEquipment.length}
                />

                <div className="flex-1">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-xl font-bold text-slate-900">
                            {filteredEquipment.length} Listings Found
                        </h2>
                        <div className="text-sm text-gray-500">
                            Sort by: <span className="font-medium text-slate-900 cursor-pointer">Relevance</span>
                        </div>
                    </div>

                    {filteredEquipment.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredEquipment.map(item => (
                                <EquipmentCard key={item.id} item={item} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                            <h3 className="text-lg font-medium text-gray-900">No equipment found</h3>
                            <p className="text-gray-500 mt-1">Try adjusting your filters or search term.</p>
                            <button 
                                onClick={() => setFilters({
                                    searchTerm: '', type: 'All', manufacturer: 'All', minPrice: '', maxPrice: '', minYear: '', maxYear: '', weightClass: 'All'
                                })}
                                className="mt-4 text-yellow-600 font-medium hover:underline"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

/* --- Detail Page Component --- */
const DetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const item = MOCK_EQUIPMENT.find(e => e.id === id);
    const [activeImage, setActiveImage] = useState(0);

    if (!item) {
        return <div className="p-8 text-center">Item not found</div>;
    }

    return (
        <div className="animate-in fade-in duration-500">
            {/* Breadcrumb */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Link to="/" className="hover:text-slate-900">Home</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-slate-900 font-medium truncate">{item.title}</span>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Images */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="aspect-[4/3] w-full bg-gray-100 rounded-2xl overflow-hidden relative">
                            <img 
                                src={item.images[activeImage]} 
                                alt={item.title} 
                                className="w-full h-full object-cover"
                            />
                            {item.status !== EquipmentStatus.Active && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                    <span className="bg-red-600 text-white px-6 py-2 rounded-full text-xl font-bold uppercase tracking-wider transform -rotate-12">
                                        {item.status}
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {item.images.map((img, idx) => (
                                <button 
                                    key={idx}
                                    onClick={() => setActiveImage(idx)}
                                    className={`aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-yellow-400 ring-2 ring-yellow-100' : 'border-transparent opacity-70 hover:opacity-100'}`}
                                >
                                    <img src={img} alt={`View ${idx}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>

                        {/* Description */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-200 mt-8 shadow-sm">
                            <h3 className="text-xl font-bold text-slate-900 mb-4">Seller's Note</h3>
                            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                {item.description}
                            </p>
                            <div className="mt-6 flex flex-wrap gap-2">
                                {item.tags.map(tag => (
                                    <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full font-medium">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Specs & Contact */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                            <h1 className="text-2xl font-bold text-slate-900 mb-2">{item.title}</h1>
                            <div className="text-3xl font-bold text-slate-900 mb-6 flex items-baseline gap-2">
                                {formatKoreanCurrency(item.price)} <span className="text-lg text-gray-500 font-normal">KRW</span>
                            </div>

                            <div className="space-y-4 border-t border-gray-100 pt-4">
                                <SpecRow icon={<Scale />} label="Weight" value={item.weightClass} />
                                <SpecRow icon={<Calendar />} label="Year" value={item.year.toString()} />
                                <SpecRow icon={<Clock />} label="Hours" value={`${item.hourMeter.toLocaleString()} hr`} />
                                <SpecRow icon={<MapPin />} label="Location" value={item.location} />
                                <SpecRow icon={<ShieldCheck />} label="Manufacturer" value={item.manufacturer} />
                            </div>

                            <div className="hidden lg:block mt-8 space-y-3">
                                <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold py-4 rounded-xl shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                                    <Phone className="w-5 h-5" />
                                    Show Number
                                </button>
                                <button className="w-full bg-white border border-slate-200 hover:bg-gray-50 text-slate-700 font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
                                    <Share2 className="w-5 h-5" />
                                    Share Listing
                                </button>
                            </div>
                        </div>

                        <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-lg">
                            <h3 className="font-bold text-lg mb-2">Seller Information</h3>
                            <p className="text-slate-400 text-sm mb-4">Member since 2020</p>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center text-xl font-bold">
                                    {item.sellerName.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-bold">{item.sellerName}</p>
                                    <p className="text-sm text-green-400 flex items-center gap-1">
                                        <ShieldCheck className="w-3 h-3" /> Verified Dealer
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Sticky Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 lg:hidden z-50 flex gap-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                <button className="flex-1 bg-white border border-gray-300 text-slate-700 font-bold py-3 rounded-xl flex items-center justify-center">
                    <Share2 className="w-5 h-5" />
                </button>
                <a href={`tel:${item.sellerContact}`} className="flex-[4] bg-yellow-400 text-slate-900 font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-sm">
                    <Phone className="w-5 h-5" />
                    Call Seller
                </a>
            </div>
        </div>
    );
};

const SpecRow: React.FC<{ icon: React.ReactNode, label: string, value: string }> = ({ icon, label, value }) => (
    <div className="flex items-center justify-between py-2">
        <div className="flex items-center gap-2 text-gray-500">
            {React.cloneElement(icon as React.ReactElement, { className: "w-5 h-5" })}
            <span className="text-sm font-medium">{label}</span>
        </div>
        <span className="font-bold text-slate-900">{value}</span>
    </div>
);


/* --- App Router --- */
const App: React.FC = () => {
    return (
        <HashRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<ListingPage />} />
                    <Route path="/product/:id" element={<DetailPage />} />
                </Routes>
            </Layout>
        </HashRouter>
    );
};

export default App;
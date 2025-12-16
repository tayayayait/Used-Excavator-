import React from 'react';
import { FilterState, MANUFACTURES, WEIGHT_CLASSES, TYPES } from '../types';
import { Filter, X } from 'lucide-react';

interface Props {
    filters: FilterState;
    setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
    isOpen: boolean;
    onClose: () => void;
    matchCount: number;
}

export const FilterSidebar: React.FC<Props> = ({ filters, setFilters, isOpen, onClose, matchCount }) => {
    const handleChange = (key: keyof FilterState, value: any) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar Container */}
            <aside className={`
                fixed lg:sticky lg:top-24 top-0 left-0 h-full lg:h-[calc(100vh-8rem)] 
                w-80 bg-white shadow-xl lg:shadow-none lg:border lg:border-gray-200 lg:rounded-xl 
                z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto
                ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="p-5 border-b border-gray-100 flex items-center justify-between lg:hidden">
                    <h2 className="font-bold text-lg flex items-center gap-2">
                        <Filter className="w-5 h-5" /> Filters
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-5 space-y-8">
                    {/* Type Filter */}
                    <div>
                        <label className="block text-sm font-bold text-slate-900 mb-3">Equipment Type</label>
                        <div className="space-y-2">
                            {TYPES.map(type => (
                                <label key={type} className="flex items-center gap-3 cursor-pointer group">
                                    <input 
                                        type="radio" 
                                        name="type" 
                                        className="w-4 h-4 text-yellow-500 focus:ring-yellow-500 border-gray-300"
                                        checked={filters.type === type}
                                        onChange={() => handleChange('type', type)}
                                    />
                                    <span className="text-sm text-gray-700 group-hover:text-slate-900">{type}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Manufacturer Filter */}
                    <div>
                        <label className="block text-sm font-bold text-slate-900 mb-3">Manufacturer</label>
                        <select 
                            className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none"
                            value={filters.manufacturer}
                            onChange={(e) => handleChange('manufacturer', e.target.value)}
                        >
                            {MANUFACTURES.map(m => (
                                <option key={m} value={m}>{m}</option>
                            ))}
                        </select>
                    </div>

                    {/* Price Range */}
                    <div>
                        <label className="block text-sm font-bold text-slate-900 mb-3">Price Range (KRW)</label>
                        <div className="grid grid-cols-2 gap-2">
                            <input 
                                type="number" 
                                placeholder="Min" 
                                className="p-2 border border-gray-300 rounded-lg text-sm w-full outline-none focus:border-yellow-400"
                                value={filters.minPrice}
                                onChange={(e) => handleChange('minPrice', e.target.value ? Number(e.target.value) : '')}
                            />
                            <input 
                                type="number" 
                                placeholder="Max" 
                                className="p-2 border border-gray-300 rounded-lg text-sm w-full outline-none focus:border-yellow-400"
                                value={filters.maxPrice}
                                onChange={(e) => handleChange('maxPrice', e.target.value ? Number(e.target.value) : '')}
                            />
                        </div>
                    </div>

                    {/* Action Buttons (Mobile) */}
                    <div className="lg:hidden pt-4">
                        <button 
                            onClick={onClose}
                            className="w-full bg-slate-900 text-white font-bold py-3 rounded-lg shadow-lg active:scale-95 transition-transform"
                        >
                            Show {matchCount} Results
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
};
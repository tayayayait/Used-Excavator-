import React from 'react';
import { Equipment, EquipmentStatus } from '../types';
import { formatKoreanCurrency } from '../constants';
import { MapPin, Clock, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
    item: Equipment;
}

export const EquipmentCard: React.FC<Props> = ({ item }) => {
    return (
        <Link to={`/product/${item.id}`} className="group block bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <img 
                    src={item.images[0]} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 flex gap-2">
                    {item.status !== EquipmentStatus.Active && (
                        <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wide
                            ${item.status === EquipmentStatus.Sold ? 'bg-red-500 text-white' : 'bg-orange-500 text-white'}
                        `}>
                            {item.status}
                        </span>
                    )}
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white text-xs font-medium">Click to view details</p>
                </div>
            </div>

            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-slate-900 line-clamp-1 group-hover:text-blue-700 transition-colors">
                        {item.title}
                    </h3>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                        {item.manufacturer}
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                        {item.weightClass}
                    </span>
                </div>
                
                <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{item.year}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>{item.hourMeter.toLocaleString()} hr</span>
                    </div>
                    <div className="flex items-center gap-1.5 col-span-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="truncate">{item.location}</span>
                    </div>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xl font-bold text-slate-900">
                        {formatKoreanCurrency(item.price)} <span className="text-sm font-normal text-gray-500">KRW</span>
                    </span>
                </div>
            </div>
        </Link>
    );
};
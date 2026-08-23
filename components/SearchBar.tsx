import React, { useState } from 'react';
import { SparklesIcon } from './icons/SearchIcons';
import { useTranslations } from '../contexts/LanguageContext';
import { PropertyType, ListingType } from '../types';
import type { SearchFilters } from '../types';
import { BuildingStorefrontIcon, MapPinIcon, TruckIcon } from '@heroicons/react/24/outline';
import { WellnessIcon } from './icons/CategoryIcons';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isSearchingAI: boolean;
  filters: SearchFilters;
  onFilterChange: (key: keyof SearchFilters, value: any) => void;
}

type SearchTab = 'buy_rent' | 'stays' | 'transport' | 'wellness';

const TabButton: React.FC<{
    label: string;
    icon: React.ElementType;
    isActive: boolean;
    onClick: () => void;
    color: string;
}> = ({ label, icon: Icon, isActive, onClick, color }) => (
    <button
        type="button"
        onClick={onClick}
        className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold rounded-xl transition-colors flex-shrink-0 ${
            isActive
                ? `bg-white ${color} shadow-sm`
                : 'text-slate-500 hover:text-slate-800 hover:bg-white/50'
        }`}
    >
        <Icon className="w-4 h-4" />
        <span className="uppercase tracking-[0.12em]">{label}</span>
    </button>
);


const SearchButton: React.FC<{ isSearchingAI: boolean }> = ({ isSearchingAI }) => (
    <button
        type="submit"
        disabled={isSearchingAI}
        className="bg-brand-primary text-white font-bold uppercase tracking-[0.12em] px-4 py-3 rounded-xl hover:bg-blue-700 transition-colors disabled:bg-slate-400 w-full h-full text-xs"
    >
        {isSearchingAI ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
        ) : "Search Properties"}
    </button>
);

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isSearchingAI, filters, onFilterChange }) => {
    const [activeTab, setActiveTab] = useState<SearchTab>('buy_rent');
    const { t } = useTranslations();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch('');
    };
    
    const setTabAndPropertyType = (tab: SearchTab, propType: PropertyType) => {
        setActiveTab(tab);
        onFilterChange('propertyType', propType);
    };

    const renderFilters = () => {
        switch (activeTab) {
            case 'stays':
                return (
                    <div className="grid grid-cols-2 lg:grid-cols-7 gap-2">
                        <input type="text" placeholder="Location: e.g. Cape Town" name="location" value={filters.location} onChange={(e) => onFilterChange('location', e.target.value)} className="input-field col-span-2 lg:col-span-2" />
                        <input type="date" name="checkIn" value={filters.checkIn || ''} onChange={(e) => onFilterChange('checkIn', e.target.value)} className="input-field" title="Check-in Date" />
                        <input type="date" name="checkOut" value={filters.checkOut || ''} onChange={(e) => onFilterChange('checkOut', e.target.value)} className="input-field" title="Check-out Date" />
                        <input type="number" placeholder="Guests" name="guests" min="1" value={filters.guests || ''} onChange={(e) => onFilterChange('guests', Number(e.target.value))} className="input-field" />
                        <input type="number" placeholder="Max Price" name="priceMax" value={filters.priceMax === 10000000 ? '' : filters.priceMax} onChange={(e) => onFilterChange('priceMax', e.target.value === '' ? 10000000 : Number(e.target.value))} className="input-field" />
                        <SearchButton isSearchingAI={isSearchingAI} />
                    </div>
                );
            case 'transport':
                 return (
                     <div className="grid grid-cols-2 lg:grid-cols-6 gap-2">
                        <input type="text" placeholder="Pick-up location" name="location" value={filters.location} onChange={(e) => onFilterChange('location', e.target.value)} className="input-field col-span-2 lg:col-span-2" />
                        <input type="date" name="checkIn" value={filters.checkIn || ''} onChange={(e) => onFilterChange('checkIn', e.target.value)} className="input-field" title="Pick-up Date" />
                        <select name="vehicleType" value={filters.vehicleType || ''} onChange={(e) => onFilterChange('vehicleType', e.target.value)} className="input-field">
                            <option value="">Any Vehicle</option>
                            <option>Sedan</option>
                            <option>SUV</option>
                            <option>Van</option>
                            <option>Luxury</option>
                        </select>
                        <input type="number" placeholder="Max Price" name="priceMax" value={filters.priceMax === 10000000 ? '' : filters.priceMax} onChange={(e) => onFilterChange('priceMax', e.target.value === '' ? 10000000 : Number(e.target.value))} className="input-field" />
                        <SearchButton isSearchingAI={isSearchingAI} />
                    </div>
                );
             case 'wellness':
                return (
                     <div className="grid grid-cols-2 lg:grid-cols-5 gap-2">
                        <input type="text" placeholder="Destination" name="location" value={filters.location} onChange={(e) => onFilterChange('location', e.target.value)} className="input-field col-span-2 lg:col-span-2" />
                        <input type="date" name="checkIn" value={filters.checkIn || ''} onChange={(e) => onFilterChange('checkIn', e.target.value)} className="input-field" title="Start Date" />
                        <input type="number" placeholder="Max Price" name="priceMax" value={filters.priceMax === 10000000 ? '' : filters.priceMax} onChange={(e) => onFilterChange('priceMax', e.target.value === '' ? 10000000 : Number(e.target.value))} className="input-field" />
                        <SearchButton isSearchingAI={isSearchingAI} />
                    </div>
                );
            case 'buy_rent':
            default:
                return (
                     <div className="grid grid-cols-2 lg:grid-cols-7 gap-2">
                        <input type="text" placeholder="Location" name="location" value={filters.location} onChange={(e) => onFilterChange('location', e.target.value)} className="input-field col-span-2 lg:col-span-2" />
                        <select name="listingType" value={filters.listingType} onChange={(e) => onFilterChange('listingType', e.target.value)} className="input-field">
                            <option value={ListingType.ALL}>Property type</option>
                            <option value={ListingType.SALE}>For Sale</option>
                            <option value={ListingType.RENT}>For Rent</option>
                        </select>
                        <div className="col-span-2 lg:col-span-2 flex flex-col justify-center px-3 input-field gap-1" style={{paddingTop: '0.35rem', paddingBottom: '0.35rem'}}>
                            <div className="flex justify-between items-center w-full">
                                <span className="text-xs font-bold text-slate-500 uppercase">Max Price</span>
                                <span className="text-sm font-bold text-brand-dark dark:text-white">R {filters.priceMax === 10000000 || !filters.priceMax ? 'Any' : (filters.priceMax).toLocaleString()}</span>
                            </div>
                            <input 
                                type="range" 
                                min="100000" 
                                max="10000000" 
                                step="100000"
                                value={filters.priceMax === 10000000 || !filters.priceMax ? 10000000 : filters.priceMax} 
                                onChange={(e) => onFilterChange('priceMax', Number(e.target.value))} 
                                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-primary" 
                            />
                        </div>
                        <div className="flex items-center gap-2 input-field">
                            <input type="number" name="bedrooms" min="0" value={filters.bedrooms || ''} onChange={(e) => onFilterChange('bedrooms', Number(e.target.value))} className="w-full bg-transparent focus:outline-none" placeholder="Beds"/>
                            <span className="text-slate-400 font-bold text-xs uppercase">Beds</span>
                        </div>
                        <SearchButton isSearchingAI={isSearchingAI} />
                    </div>
                );
        }
    };

    return (
        <div className="bg-white/90 backdrop-blur-xl p-2 rounded-2xl shadow-2xl shadow-slate-950/20 w-full">
            <div className="bg-transparent">
                <div className="overflow-x-auto no-scrollbar">
                    <div className="flex items-center gap-1 px-1 whitespace-nowrap">
                        <TabButton label="Buy & Rent" icon={BuildingStorefrontIcon} isActive={activeTab === 'buy_rent'} onClick={() => setTabAndPropertyType('buy_rent', PropertyType.ALL)} color="text-slate-900" />
                        <TabButton label="Stays" icon={MapPinIcon} isActive={activeTab === 'stays'} onClick={() => setTabAndPropertyType('stays', PropertyType.SHORT_TERM_RENTAL)} color="text-slate-900" />
                        <TabButton label="Transport" icon={TruckIcon} isActive={activeTab === 'transport'} onClick={() => setTabAndPropertyType('transport', PropertyType.TRANSPORT)} color="text-slate-900" />
                        <TabButton label="Wellness" icon={WellnessIcon} isActive={activeTab === 'wellness'} onClick={() => setTabAndPropertyType('wellness', PropertyType.WELLNESS)} color="text-slate-900" />
                    </div>
                </div>
                <div className="p-3 md:p-4 bg-slate-50/90 rounded-xl mt-2">
                    <form onSubmit={handleSearch}>
                        {renderFilters()}
                    </form>
                </div>
            </div>
             <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                .input-field { @apply w-full px-3 py-2.5 text-sm border-0 rounded-lg focus:ring-2 focus:ring-brand-primary/30 bg-white text-slate-800 placeholder:text-slate-400 font-medium transition-colors; }
             `}</style>
        </div>
    );
};

export default SearchBar;

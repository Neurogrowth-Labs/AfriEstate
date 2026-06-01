import React, { useState } from 'react';

interface RentACarListingFormProps {
    onSubmit: () => void;
}

const RentACarListingForm: React.FC<RentACarListingFormProps> = ({ onSubmit }) => {
    return (
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-12">
            <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">AfriEstate – Rent-A-Car Listing Form</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Professional Vehicle Rental Listing</p>
            </div>

            <section>
                <h3 className="text-lg font-bold border-b border-gray-200 dark:border-slate-700 pb-2 mb-6 text-brand-dark dark:text-gray-200">1. BUSINESS INFORMATION</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold mb-2">Business Name *</label>
                        <input type="text" required className="w-full p-3 bg-gray-50 dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2">Trading Name</label>
                        <input type="text" className="w-full p-3 bg-gray-50 dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2">Registration Number</label>
                        <input type="text" className="w-full p-3 bg-gray-50 dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2">VAT Number (Optional)</label>
                        <input type="text" className="w-full p-3 bg-gray-50 dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 outline-none" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold mb-2">Business Type *</label>
                        <div className="flex flex-wrap gap-4">
                            {['Car Rental Company', 'Individual Vehicle Owner', 'Fleet Operator', 'Chauffeur Service Provider', 'Corporate Mobility Provider'].map(type => (
                                <label key={type} className="flex items-center gap-2">
                                    <input type="radio" name="businessType" value={type} required /> {type}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <h3 className="text-lg font-bold border-b border-gray-200 dark:border-slate-700 pb-2 mb-6 text-brand-dark dark:text-gray-200">2. CONTACT INFORMATION</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold mb-2">Contact Person *</label>
                        <input type="text" required className="w-full p-3 bg-gray-50 dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2">Mobile Number *</label>
                        <input type="tel" required className="w-full p-3 bg-gray-50 dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2">WhatsApp Number *</label>
                        <input type="tel" required className="w-full p-3 bg-gray-50 dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2">Email Address *</label>
                        <input type="email" required className="w-full p-3 bg-gray-50 dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 outline-none" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold mb-2">Website</label>
                        <input type="url" className="w-full p-3 bg-gray-50 dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 outline-none" />
                    </div>
                </div>
            </section>

            <section>
                <h3 className="text-lg font-bold border-b border-gray-200 dark:border-slate-700 pb-2 mb-6 text-brand-dark dark:text-gray-200">3. LOCATION DETAILS</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold mb-2">Country *</label>
                        <input type="text" required className="w-full p-3 bg-gray-50 dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2">Province / State *</label>
                        <input type="text" required className="w-full p-3 bg-gray-50 dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2">City *</label>
                        <input type="text" required className="w-full p-3 bg-gray-50 dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2">Pickup Address *</label>
                        <input type="text" required className="w-full p-3 bg-gray-50 dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 outline-none" />
                    </div>
                </div>
            </section>

            <section>
                <h3 className="text-lg font-bold border-b border-gray-200 dark:border-slate-700 pb-2 mb-6 text-brand-dark dark:text-gray-200">4. VEHICLE INFORMATION</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold mb-2">Vehicle Title * (e.g., 2024 Toyota Corolla Auto for Rent)</label>
                        <input type="text" required className="w-full p-3 bg-gray-50 dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2">Vehicle Category *</label>
                        <select required className="w-full p-3 bg-gray-50 dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 outline-none">
                            <option value="">Select Category</option>
                            <option value="economy">Economy</option>
                            <option value="luxury">Luxury</option>
                            <option value="suv">SUV</option>
                            <option value="pickup">Pickup</option>
                            <option value="van">Van</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2">Vehicle Make & Model *</label>
                        <input type="text" required className="w-full p-3 bg-gray-50 dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2">Year *</label>
                        <input type="number" required className="w-full p-3 bg-gray-50 dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2">Transmission *</label>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2"><input type="radio" name="transmission" value="auto" required /> Automatic</label>
                            <label className="flex items-center gap-2"><input type="radio" name="transmission" value="manual" required /> Manual</label>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <h3 className="text-lg font-bold border-b border-gray-200 dark:border-slate-700 pb-2 mb-6 text-brand-dark dark:text-gray-200">5. RENTAL PRICING</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold mb-2">Daily Rate *</label>
                        <input type="number" required className="w-full p-3 bg-gray-50 dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2">Currency</label>
                        <select className="w-full p-3 bg-gray-50 dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 outline-none">
                            <option>ZAR</option>
                            <option>USD</option>
                            <option>EUR</option>
                            <option>GBP</option>
                        </select>
                    </div>
                </div>
            </section>

            <section>
                <h3 className="text-lg font-bold border-b border-gray-200 dark:border-slate-700 pb-2 mb-6 text-brand-dark dark:text-gray-200">11. VEHICLE DESCRIPTION</h3>
                <div>
                    <textarea required rows={4} placeholder="Tell customers about the vehicle, condition, comfort, fuel efficiency, etc." className="w-full p-3 bg-gray-50 dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 outline-none"></textarea>
                </div>
            </section>

            <section>
                <h3 className="text-lg font-bold border-b border-gray-200 dark:border-slate-700 pb-2 mb-6 text-brand-dark dark:text-gray-200">17. TERMS & CONDITIONS</h3>
                <div className="space-y-4">
                    <label className="flex items-center gap-3">
                        <input type="checkbox" required className="w-5 h-5 rounded border-gray-300 text-brand-primary" />
                        <span className="text-sm">I confirm that all information provided is accurate.</span>
                    </label>
                    <label className="flex items-center gap-3">
                        <input type="checkbox" required className="w-5 h-5 rounded border-gray-300 text-brand-primary" />
                        <span className="text-sm">I have legal authority to rent out this vehicle.</span>
                    </label>
                    <label className="flex items-center gap-3">
                        <input type="checkbox" required className="w-5 h-5 rounded border-gray-300 text-brand-primary" />
                        <span className="text-sm">I agree to AfriEstate Marketplace Terms & Conditions.</span>
                    </label>
                    <label className="flex items-center gap-3">
                        <input type="checkbox" required className="w-5 h-5 rounded border-gray-300 text-brand-primary" />
                        <span className="text-sm">I agree to AfriEstate Privacy Policy.</span>
                    </label>
                </div>
            </section>
        </form>
    );
};

export default RentACarListingForm;

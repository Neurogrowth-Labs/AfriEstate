import React, { useState } from 'react';

interface WellnessListingFormProps {
    onSubmit: () => void;
}

const WellnessListingForm: React.FC<WellnessListingFormProps> = ({ onSubmit }) => {
    return (
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-12">
            <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">AfriEstate Wellness Services Listing Form</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Connect with clients looking for wellness, beauty, fitness, and holistic health services.</p>
            </div>

            <section>
                <h3 className="text-lg font-bold border-b border-gray-200 dark:border-slate-700 pb-2 mb-6 text-brand-dark dark:text-gray-200">1. BUSINESS INFORMATION</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold mb-2">Business Name *</label>
                        <input type="text" required className="w-full p-3 bg-gray-50 dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2">Trading Name (if different)</label>
                        <input type="text" className="w-full p-3 bg-gray-50 dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2">Business Registration Number</label>
                        <input type="text" className="w-full p-3 bg-gray-50 dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2">Wellness Category *</label>
                        <select required className="w-full p-3 bg-gray-50 dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 outline-none">
                            <option value="">Select Category</option>
                            <option value="spa">Spa & Wellness Center</option>
                            <option value="massage">Massage Therapy</option>
                            <option value="beauty">Beauty Salon</option>
                            <option value="fitness">Fitness Trainer</option>
                            <option value="yoga">Yoga Instructor</option>
                            <option value="other">Other</option>
                        </select>
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
                        <label className="block text-sm font-semibold mb-2">City *</label>
                        <input type="text" required className="w-full p-3 bg-gray-50 dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 outline-none" />
                    </div>
                </div>
            </section>

            <section>
                <h3 className="text-lg font-bold border-b border-gray-200 dark:border-slate-700 pb-2 mb-6 text-brand-dark dark:text-gray-200">4. BUSINESS PROFILE</h3>
                <div>
                    <label className="block text-sm font-semibold mb-2">Business Description * (Describe your business, specialties, experience, and services offered.)</label>
                    <textarea required rows={5} className="w-full p-3 bg-gray-50 dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 outline-none"></textarea>
                </div>
            </section>

            <section>
                <h3 className="text-lg font-bold border-b border-gray-200 dark:border-slate-700 pb-2 mb-6 text-brand-dark dark:text-gray-200">15. DECLARATION</h3>
                <div className="space-y-4">
                    <label className="flex items-center gap-3">
                        <input type="checkbox" required className="w-5 h-5 rounded border-gray-300 text-brand-primary" />
                        <span className="text-sm">I confirm that all information provided is accurate.</span>
                    </label>
                    <label className="flex items-center gap-3">
                        <input type="checkbox" required className="w-5 h-5 rounded border-gray-300 text-brand-primary" />
                        <span className="text-sm">I agree to AfriEstate Terms & Conditions.</span>
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

export default WellnessListingForm;

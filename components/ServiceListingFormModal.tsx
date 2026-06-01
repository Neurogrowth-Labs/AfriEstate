import React, { useState } from 'react';
import { CloseIcon } from './icons/NavIcons';
import RentACarListingForm from './RentACarListingForm';
import WellnessListingForm from './WellnessListingForm';

interface ServiceListingFormModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ServiceListingFormModal: React.FC<ServiceListingFormModalProps> = ({ isOpen, onClose }) => {
    const [serviceType, setServiceType] = useState<'none' | 'car' | 'wellness'>('none');
    const [submitting, setSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = () => {
        setSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setSubmitting(false);
            alert('Listing Submitted Successfully for Review!');
            setServiceType('none');
            onClose();
        }, 1500);
    };

    const handleClose = () => {
        setServiceType('none');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 overflow-y-auto" onClick={handleClose}>
            <div className={`bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full relative max-h-[90vh] overflow-hidden flex flex-col my-8 transform transition-all ${serviceType === 'none' ? 'max-w-xl' : 'max-w-4xl'}`} onClick={e => e.stopPropagation()}>
                {/* Header */}
                <header className="p-6 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center bg-gray-50 dark:bg-slate-800/50">
                    <div>
                        <h2 className="text-xl md:text-2xl font-heading font-bold text-gray-900 dark:text-white">List a Service</h2>
                    </div>
                    <button onClick={handleClose} className="p-2 bg-white dark:bg-slate-700 rounded-full hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors shadow-sm">
                        <CloseIcon className="w-6 h-6 text-gray-500" />
                    </button>
                </header>

                {/* Form Body */}
                <div className="p-6 overflow-y-auto custom-scrollbar flex-grow">
                    {serviceType === 'none' ? (
                        <div className="text-center py-12 px-4">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">What type of service do you want to list?</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <button 
                                    onClick={() => setServiceType('car')}
                                    className="p-8 border-2 border-slate-200 dark:border-slate-700 rounded-xl hover:border-brand-primary dark:hover:border-brand-primary hover:bg-brand-light dark:hover:bg-brand-primary/10 transition-all font-semibold text-lg text-slate-800 dark:text-slate-200"
                                >
                                    🚗 Rent a Car Listing
                                </button>
                                <button 
                                    onClick={() => setServiceType('wellness')}
                                    className="p-8 border-2 border-slate-200 dark:border-slate-700 rounded-xl hover:border-brand-primary dark:hover:border-brand-primary hover:bg-brand-light dark:hover:bg-brand-primary/10 transition-all font-semibold text-lg text-slate-800 dark:text-slate-200"
                                >
                                    🌿 Wellness Service Listing
                                </button>
                            </div>
                        </div>
                    ) : serviceType === 'car' ? (
                        <RentACarListingForm onSubmit={handleSubmit} />
                    ) : (
                        <WellnessListingForm onSubmit={handleSubmit} />
                    )}
                </div>

                {/* Footer */}
                {serviceType !== 'none' && (
                    <div className="p-6 border-t border-gray-100 dark:border-slate-800 bg-gray-50 dark:bg-slate-800/50 flex gap-4 justify-end flex-shrink-0">
                        <button type="button" onClick={() => setServiceType('none')} className="px-6 py-3 font-semibold text-gray-500 hover:text-gray-700">Back</button>
                        <button type="button" onClick={handleSubmit} className="px-8 py-3 bg-brand-primary text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all w-full sm:w-auto">
                            {submitting ? 'Submitting...' : 'Submit For Review'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ServiceListingFormModal;

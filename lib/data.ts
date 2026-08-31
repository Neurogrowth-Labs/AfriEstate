
import { ALL_PROPERTIES as initialProperties, RealTimeNews_NOTIFICATIONS } from '../constants';
import type { Property, TourRequest, User, SearchFilters, Message, Review, CalendarEvent, AgentProfile, Lead, InvestorSettings, InvestmentRequest, PropertyAlert, UserDocument, Notification, KycVerification } from '../types';
import { ActivityType, ListingType, PropertyStatus } from '../types';
import { supabase } from './supabase';
import { isDemoMode, logger } from './logger';

// --- Helper for handling Supabase errors ---
const handleError = (error: any, message: string) => {
    if (error) {
        let errorMessage = 'Unknown error';
        if (typeof error === 'string') {
            errorMessage = error;
        } else if (error && typeof error === 'object') {
            errorMessage = error.message || error.details || error.hint || JSON.stringify(error);
        }

        // Demo mode can downgrade connectivity/schema errors for offline prototype work.
        const isNetworkError = errorMessage.includes('Failed to fetch') || 
                             errorMessage.includes('Network request failed') ||
                             errorMessage.includes('connection error');

        const isMissingTableError = errorMessage.includes("Could not find the table") || 
                                   (errorMessage.includes("relation") && errorMessage.includes("does not exist"));

        if ((isNetworkError || isMissingTableError) && isDemoMode) {
             logger.warn(`Demo fallback while ${message}: ${errorMessage}`);
             return true;
        }

        logger.error(`Error ${message}: ${errorMessage}`);
        return true;
    }
    return false;
};

// --- Agent Profile Management ---
export const getAgentProfile = async (username: string): Promise<AgentProfile> => {
    try {
        const { data, error } = await supabase
            .from('agent_profiles')
            .select('*')
            .eq('username', username)
            .single();

        if (error && error.code !== 'PGRST116') {
            handleError(error, 'fetching agent profile');
        }

        if (data) {
            return {
                ...data,
                profilePicture: data.profile_picture || data.profilePicture,
            };
        }
    } catch (e) {
        // Silent fail to default
    }

    return {
        username: username,
        bio: `Welcome to AfriEstate! Tell clients a bit about yourself.`,
        email: `${username.toLowerCase().replace(/\s+/g, '.')}@AfriEstate.co.za`,
        phone: 'Please add your phone number.',
        profilePicture: `https://i.pravatar.cc/150?u=${encodeURIComponent(username)}`,
        socials: { twitter: '', linkedin: '', facebook: '' }
    };
};

export const updateAgentProfile = async (username: string, updatedProfile: AgentProfile): Promise<AgentProfile> => {
    try {
        const { error } = await supabase
            .from('agent_profiles')
            .upsert({ 
                ...updatedProfile, 
                username,
                profile_picture: updatedProfile.profilePicture 
            })
            .eq('username', username);
        
        if (error) throw error;
        return updatedProfile;
    } catch (error) {
        handleError(error, 'updating agent profile');
        return updatedProfile; // Return optimistic update
    }
};

// --- Review Management ---
export const getReviews = async (): Promise<Review[]> => {
    try {
        const { data, error } = await supabase
            .from('reviews')
            .select('*')
            .order('timestamp', { ascending: false });
        
        if (error) {
            handleError(error, 'fetching reviews');
            return [];
        }
        return (data || []).map(r => ({
            ...r,
            agentName: r.agent_name || r.agentName,
            reviewerUsername: r.reviewer_username || r.reviewerUsername
        }));
    } catch (e) {
        return [];
    }
};

export const getReviewsForAgent = async (agentName: string): Promise<Review[]> => {
    try {
        const { data, error } = await supabase
            .from('reviews')
            .select('*')
            .eq('agent_name', agentName)
            .order('timestamp', { ascending: false });
        
        if (error) {
            return [];
        }
        return (data || []).map(r => ({
            ...r,
            agentName: r.agent_name || r.agentName,
            reviewerUsername: r.reviewer_username || r.reviewerUsername
        }));
    } catch (e) {
        return [];
    }
};

export const addReview = async (reviewData: Omit<Review, 'id' | 'timestamp'>): Promise<Review> => {
    const newReview: any = {
        agent_name: reviewData.agentName,
        reviewer_username: reviewData.reviewerUsername,
        rating: reviewData.rating,
        comment: reviewData.comment,
        timestamp: Date.now(),
    };
    try {
        const { data, error } = await supabase
            .from('reviews')
            .insert(newReview)
            .select()
            .single();
        
        if (error) throw error;
        return {
            ...data,
            agentName: data.agent_name,
            reviewerUsername: data.reviewer_username
        };
    } catch (error) {
        handleError(error, 'adding review');
        if (isDemoMode) return { ...reviewData, id: `rev_${Date.now()}`, timestamp: Date.now() } as Review;
        throw error;
    }
};

// --- Property Management ---
export const getProperties = async (excludeMock = false): Promise<Property[]> => {
    try {
        const { data, error } = await supabase
            .from('properties')
            .select('*');

        if (error) {
            handleError(error, 'fetching properties');
            return isDemoMode && !excludeMock ? initialProperties : [];
        }

        if (!data || data.length === 0) return isDemoMode && !excludeMock ? initialProperties : [];

        const mappedData = data.map(p => ({
            ...p,
            dateListed: p.dateListed ?? p.date_listed ?? (p.created_at ? new Date(p.created_at).getTime() : Date.now()),
            listingType: p.listingType ?? p.listing_type,
            propertyType: p.propertyType ?? p.property_type,
            purchasePrice: p.purchasePrice ?? p.purchase_price,
            neighborhoodInfo: p.neighborhoodInfo ?? p.neighborhood_info,
            virtualTourUrl: p.virtualTourUrl ?? p.virtual_tour_url,
            vrTourUrl: p.vrTourUrl ?? p.vr_tour_url,
            smartContractReady: p.smartContractReady ?? p.smart_contract_ready,
            priceHistory: p.priceHistory ?? p.price_history,
            occupancyRate: p.occupancyRate ?? p.occupancy_rate,
            marketROI: p.marketROI ?? p.market_roi,
            perNightPrice: p.perNightPrice ?? p.per_night_price,
            packageIncludes: p.packageIncludes ?? p.package_includes,
            vehicleType: p.vehicleType ?? p.vehicle_type,
            // Handle JSON fields if they come back as strings (rare with supabase-js but possible with some configs)
            address: typeof p.address === 'string' ? JSON.parse(p.address) : p.address,
            details: typeof p.details === 'string' ? JSON.parse(p.details) : p.details,
            amenities: typeof p.amenities === 'string' ? JSON.parse(p.amenities) : p.amenities,
            images: typeof p.images === 'string' ? JSON.parse(p.images) : p.images,
            agent: typeof p.agent === 'string' ? JSON.parse(p.agent) : p.agent,
            financials: typeof p.financials === 'string' ? JSON.parse(p.financials) : p.financials,
        }));

        return mappedData.sort((a, b) => b.dateListed - a.dateListed);

    } catch (criticalErr: any) {
        if (criticalErr.message && (criticalErr.message.includes('Failed to fetch') || criticalErr.message.includes('Network request failed'))) {
            logger.warn('Backend unreachable while fetching properties.', criticalErr);
        } else {
            logger.error("Failed to fetch properties from Supabase.", criticalErr);
        }
        return isDemoMode && !excludeMock ? initialProperties : [];
    }
};

export const saveProperties = async (properties: Property[]): Promise<void> => {
    try {
        const dbProperties = properties.map(p => ({
            id: p.id,
            title: p.title,
            listing_type: p.listingType,
            property_type: p.propertyType,
            address: p.address,
            coordinates: p.coordinates,
            price: p.price,
            details: p.details,
            description: p.description,
            neighborhood_info: p.neighborhoodInfo || null,
            amenities: p.amenities || [],
            images: p.images || [],
            virtual_tour_url: p.virtualTourUrl || null,
            vr_tour_url: p.vrTourUrl || null,
            agent_name: p.agent?.name || 'simao',
            featured: p.featured || false,
            verified: p.verified || false,
            smart_contract_ready: p.smartContractReady || false,
            views: p.views || 0,
            status: p.status,
            date_listed: p.dateListed,
            saves: p.saves || 0,
            purchase_price: p.purchasePrice || null,
            price_history: p.priceHistory || [],
            occupancy_rate: p.occupancyRate || null,
            market_roi: p.marketROI || null,
            financials: p.financials || [],
            guests: p.guests || null,
            vehicle_type: p.vehicleType || null,
            package_includes: p.packageIncludes || [],
            per_night_price: p.perNightPrice || false
        }));

        const { error } = await supabase.from('properties').upsert(dbProperties);
        if (error) throw error;
    } catch (error) {
        handleError(error, 'upserting properties');
    }
};

export const incrementPropertyView = async (propertyId: string): Promise<void> => {
    try {
        const { error } = await supabase.rpc('increment_views', { prop_id: propertyId });
        if (error) {
             const { data } = await supabase.from('properties').select('views').eq('id', propertyId).single();
             if (data) {
                 await supabase.from('properties').update({ views: (data.views || 0) + 1 }).eq('id', propertyId);
             }
        }
    } catch (e) {
        // Ignore
    }
};

// --- User Management ---
export const getUsers = async (): Promise<User[]> => {
    try {
        const { data, error } = await supabase.from('profiles').select('*');
        if (error) return [];
        return data || [];
    } catch (e) { return []; }
};


export const upsertProfileFromAuth = async (user: User): Promise<void> => {
    const payload = {
        id: user.id,
        username: user.username,
        full_name: user.fullName,
        email: user.email,
        role: user.role,
        is_verified: user.role === 'user',
        phone: user.phone || null,
        office_address: user.officeAddress || null,
        company_name: user.companyName || null,
        profile_picture: user.profilePicture || null,
        kyc_status: user.kycStatus || (user.role === 'user' ? 'Approved' : 'Pending Review'),
    };
    const { error } = await supabase.from('profiles').upsert(payload, { onConflict: 'username' });
    if (error) {
        handleError(error, 'upserting auth profile');
        throw error;
    }
};

export const addUser = async (user: User): Promise<{ success: boolean, message: string }> => {
    try {
        const { error } = await supabase.from('profiles').insert({
            username: user.username,
            full_name: user.fullName,
            email: user.email,
            role: user.role,
            is_verified: user.role === 'user',
            phone: user.phone,
            office_address: user.officeAddress,
            company_name: user.companyName,
            // Add other fields mapping as needed
        });
        if (error) {
             return { success: false, message: error.message };
        }
        return { success: true, message: "User created successfully." };
    } catch (e) {
        handleError(e, 'creating profile');
        return { success: false, message: "Failed to create profile." };
    }
};

export const authenticateUser = async (_email: string, _password: string): Promise<{ user: User | null; error?: string }> => {
    return { user: null, error: 'Password authentication is disabled. Use Supabase Auth.' };
};

// --- Saved Properties Management (Per User) ---
export const getSavedPropertiesForUser = async (username: string): Promise<Set<string>> => {
    try {
        const { data, error } = await supabase
            .from('saved_properties')
            .select('property_id')
            .eq('username', username);
        
        if (error) {
             handleError(error, 'fetching saved properties');
             return new Set();
        }
        return new Set(data.map(item => item.property_id));
    } catch (e) { return new Set(); }
};

export const savePropertiesForUser = async (username: string, propertyIds: string[]): Promise<void> => {
    try {
        await supabase.from('saved_properties').delete().eq('username', username);
        if (propertyIds.length > 0) {
            await supabase.from('saved_properties').insert(propertyIds.map(id => ({ username, property_id: id })));
        }
    } catch (e) { handleError(e, 'saving properties'); }
};

// --- Saved Searches Management ---
export const getSavedSearchesForUser = async (username: string): Promise<SearchFilters[]> => {
    try {
        const { data, error } = await supabase
            .from('saved_searches')
            .select('filters')
            .eq('username', username);
        
        if (error) return [];
        return data.map(item => typeof item.filters === 'string' ? JSON.parse(item.filters) : item.filters);
    } catch (e) { return []; }
};

export const saveSearchesForUser = async (username: string, searches: SearchFilters[]): Promise<void> => {
    try {
        await supabase.from('saved_searches').delete().eq('username', username);
        if (searches.length > 0) {
            await supabase.from('saved_searches').insert(searches.map(s => ({ username, filters: s })));
        }
    } catch (e) { handleError(e, 'saving searches'); }
};

// --- Tour Request Management ---
export const getTourRequests = async (username: string): Promise<TourRequest[]> => {
    try {
        const { data, error } = await supabase
            .from('tour_requests')
            .select('*')
            .eq('client_username', username);
        
        if (error) return [];
        return data.map(r => ({
            ...r,
            propertyId: r.property_id || r.propertyId,
            propertyTitle: r.property_title || r.propertyTitle,
            username: r.client_username,
            date: r.tour_date,
            time: r.tour_time,
        })) || [];
    } catch (e) { return []; }
};

export const getInquiriesForSeller = async (username: string): Promise<TourRequest[]> => {
    const properties = await getProperties();
    const sellerPropertyIds = properties.filter(p => p.agent.name === username).map(p => p.id);
    if (sellerPropertyIds.length === 0) return [];

    try {
        const { data, error } = await supabase
            .from('tour_requests')
            .select('*')
            .in('property_id', sellerPropertyIds);
        
        if (error) return [];
        return data.map(r => ({
             ...r,
             propertyId: r.property_id || r.propertyId,
             propertyTitle: r.property_title || r.propertyTitle
        })) || [];
    } catch (e) { return []; }
};

export const addTourRequest = async (username: string, propertyId: string, propertyTitle: string, date: string, time: string): Promise<TourRequest> => {
    const newRequest: any = {
        property_id: propertyId,
        property_title: propertyTitle,
        client_username: username,
        client_name: username,
        client_email: username,
        tour_date: date,
        tour_time: time,
        status: 'pending',
    };
    
    try {
        const { data, error } = await supabase.from('tour_requests').insert(newRequest).select().single();
        if (error) throw error;
        return {
            ...data,
            propertyId: data.property_id,
            propertyTitle: data.property_title
        };
    } catch (error) {
        handleError(error, 'adding tour request');
        if (isDemoMode) return { ...newRequest, propertyId, propertyTitle, id: `tr_${Date.now()}` };
        throw error;
    }
};

// --- Messages ---
export const getMessagesForUser = async (username: string): Promise<Message[]> => {
    try {
        const { data, error } = await supabase
            .from('messages')
            .select('*')
            .or(`sender.eq.${username},receiver.eq.${username}`)
            .order('timestamp', { ascending: true });
        
        if (error) return [];
        return data.map(m => ({
            ...m,
            propertyId: m.property_id || m.propertyId,
            propertyTitle: m.property_title || m.propertyTitle,
            senderUsername: m.sender || m.senderUsername,
            receiverUsername: m.receiver || m.receiverUsername,
            text: m.message || m.text,
        })) || [];
    } catch (e) { return []; }
};

export const sendMessage = async (msgData: Omit<Message, 'id' | 'timestamp'>): Promise<Message> => {
    const newMessage: any = {
        property_id: msgData.propertyId,
        property_title: msgData.propertyTitle,
        sender: msgData.senderUsername,
        receiver: msgData.receiverUsername,
        message: msgData.text,
        timestamp: Date.now(),
    };
    try {
        const { data, error } = await supabase.from('messages').insert(newMessage).select().single();
        if(error) throw error;
        return {
            ...data,
            propertyId: data.property_id,
            propertyTitle: data.property_title,
            senderUsername: data.sender,
            receiverUsername: data.receiver,
            text: data.message,
        };
    } catch (error) {
        handleError(error, 'sending message');
        if (isDemoMode) return { ...msgData, timestamp: Date.now(), id: `msg_${Date.now()}` };
        throw error;
    }
};

// --- Calendar ---
export const getEvents = async (username: string): Promise<CalendarEvent[]> => {
    try {
        const { data, error } = await supabase.from('calendar_events').select('*').eq('username', username);
        if (error) return [];
        return data.map(e => ({
            ...e,
            startTime: e.start_time || e.startTime,
            endTime: e.end_time || e.endTime
        })) || [];
    } catch (e) { return []; }
};

export const addEvent = async (username: string, eventData: Omit<CalendarEvent, 'id'>): Promise<CalendarEvent> => {
    const payload = {
        username,
        title: eventData.title,
        date: eventData.date,
        start_time: eventData.startTime,
        end_time: eventData.endTime,
        description: eventData.notes || null
    };
    try {
        const { data, error } = await supabase.from('calendar_events').insert(payload).select().single();
        if (error) throw error;
        return {
             ...data,
             startTime: data.start_time,
             endTime: data.end_time
        };
    } catch (e) {
        return { ...eventData, id: `evt_${Date.now()}` } as CalendarEvent;
    }
};

export const updateEvent = async (username: string, event: CalendarEvent): Promise<CalendarEvent> => {
    const payload = {
        username,
        title: event.title,
        date: event.date,
        start_time: event.startTime,
        end_time: event.endTime,
        description: event.notes || null
    };
    try {
        const { data, error } = await supabase.from('calendar_events').update(payload).eq('id', event.id).select().single();
        if (error) throw error;
        return {
             ...data,
             startTime: data.start_time,
             endTime: data.end_time
        };
    } catch (e) { return event; }
};

export const deleteEvent = async (username: string, eventId: string): Promise<void> => {
    try {
        await supabase.from('calendar_events').delete().eq('id', eventId);
    } catch (e) {}
};

// --- Notifications ---
export const getNotifications = async (user: User): Promise<Notification[]> => {
    try {
        const { data, error } = await supabase.from('notifications').select('*').eq('username', user.username);
        if (error) {
             return [];
        }
        return data.map(n => ({
            ...n,
            isRead: n.is_read,
            propertyId: n.property_id
        })) || [];
    } catch (e) {
        return [];
    }
};

export const markNotificationsAsRead = async (username: string, ids: string[]): Promise<Set<string>> => {
    try {
        await supabase.from('notifications').update({ is_read: true }).in('id', ids);
        const { data } = await supabase.from('notifications').select('id').eq('username', username).eq('is_read', true);
        return new Set(data?.map(n => n.id) || []);
    } catch (e) { return new Set(ids); } // Optimistic
};

export const getReadNotificationIds = async (username: string): Promise<Set<string>> => {
    try {
        const { data } = await supabase.from('notifications').select('id').eq('username', username).eq('is_read', true);
        return new Set(data?.map(n => n.id) || []);
    } catch (e) { return new Set(); }
};

// --- Leads ---
export const getLeadsForAgent = async (agentUsername: string): Promise<Lead[]> => {
    const [properties, messages, inquiries] = await Promise.all([
        getProperties(true),
        getMessagesForUser(agentUsername),
        getInquiriesForSeller(agentUsername),
    ]);
    const agentPropertyIds = new Set(properties.filter(p => p.agent.name === agentUsername).map(p => p.id));
    const leads = new Map<string, Lead>();

    const ensureLead = (username: string): Lead => {
        if (!leads.has(username)) {
            leads.set(username, {
                id: username,
                username,
                email: username.includes('@') ? username : '',
                phone: '',
                score: 0,
                lastContact: 0,
                activity: [],
            });
        }
        return leads.get(username)!;
    };

    messages
        .filter(message => message.receiverUsername === agentUsername && (!message.propertyId || agentPropertyIds.has(message.propertyId)))
        .forEach(message => {
            const lead = ensureLead(message.senderUsername);
            lead.score += 10;
            lead.lastContact = Math.max(lead.lastContact, message.timestamp);
            lead.activity.push({
                type: ActivityType.MESSAGE_SENT,
                timestamp: message.timestamp,
                propertyTitle: message.propertyTitle,
                detail: message.text,
            });
        });

    inquiries.forEach(inquiry => {
        const lead = ensureLead(inquiry.username);
        lead.score += 20;
        lead.lastContact = Math.max(lead.lastContact, inquiry.timestamp);
        lead.activity.push({
            type: ActivityType.TOUR_REQUESTED,
            timestamp: inquiry.timestamp,
            propertyTitle: inquiry.propertyTitle,
            detail: `${inquiry.date} ${inquiry.time}`.trim(),
        });
    });

    return Array.from(leads.values()).sort((a, b) => b.lastContact - a.lastContact);
};

export { createKycVerification, getKycVerificationForUser, isKycApproved } from './kyc';
export type { KycVerification };

// --- Investor Settings ---
export const getInvestorSettings = async (username: string): Promise<InvestorSettings> => {
    try {
        const { data } = await supabase.from('investor_settings').select('settings').eq('username', username).single();
        return data?.settings || null;
    } catch (e) { return null as any; }
};

export const saveInvestorSettings = async (username: string, settings: InvestorSettings): Promise<void> => {
    try {
        await supabase.from('investor_settings').upsert({ username, settings });
    } catch (e) {}
};

// --- Investment Requests ---
export const getInvestmentRequests = async (username: string): Promise<InvestmentRequest[]> => {
    try {
        const { data, error } = await supabase.from('investment_requests')
            .select('*')
            .or(`investor_username.eq.${username},assigned_agent_username.eq.${username}`)
            .order('timestamp', { ascending: false });
        if (error) throw error;
        return (data || []).map(r => ({
            ...r,
            investorUsername: r.investor_username,
            requestDetails: r.request_details
        })) || [];
    } catch (e) { return []; }
};

export const addInvestmentRequest = async (username: string, requestDetails: string): Promise<InvestmentRequest> => {
    const optimistic = {
        investor_username: username,
        request_details: requestDetails,
        timestamp: Date.now(),
        status: 'Open'
    };
    try {
        const { data } = await supabase.from('investment_requests').insert(optimistic).select().single();
        return {
            ...data,
            investorUsername: data.investor_username,
            requestDetails: data.request_details
        };
    } catch(e) {
        handleError(e, 'adding investment request');
        if (isDemoMode) return { ...optimistic, id: `ir_${Date.now()}` } as any;
        throw e;
    }
};

export const getInvestorReturns = () => {
    return [
        { id: 'div1', propertyId: '12', propertyTitle: 'Luxury Hotel Development', date: '2023-10-01', amount: 12500, type: 'Dividend' },
        { id: 'div2', propertyId: '13', propertyTitle: 'Downtown Office Block', date: '2023-10-01', amount: 8200, type: 'Dividend' },
    ];
};

export const getInvestorDocuments = () => {
    return [
        { id: 'doc1', name: 'Contract - Hotel Development.pdf', type: 'Contract', date: '2022-01-15', url: '#' },
        { id: 'doc2', name: 'Q3 2023 Portfolio Statement.pdf', type: 'Statement', date: '2023-10-05', url: '#' },
    ];
};

export const getUserDocuments = async (username: string): Promise<UserDocument[]> => {
    try {
        const { data } = await supabase.from('user_documents').select('*').eq('username', username);
        return data.map(d => ({
            ...d,
            uploadDate: d.upload_date
        })) || [];
    } catch (e) { return []; }
};

export const addUserDocument = async (username: string, file: File): Promise<UserDocument> => {
    const newDoc = {
        name: file.name,
        type: file.type.includes('pdf') ? 'pdf' : 'doc',
        upload_date: Date.now(),
        url: '#',
        username,
    };
    try {
        const { data, error } = await supabase.from('user_documents').insert(newDoc).select().single();
        if (error) throw error;
        return { ...data, uploadDate: data.upload_date };
    } catch (error) {
        handleError(error, 'adding document');
        if (isDemoMode) return { ...newDoc, id: `doc_${Date.now()}`, uploadDate: newDoc.upload_date } as any;
        throw error;
    }
};

export const deleteUserDocument = async (username: string, docId: string): Promise<void> => {
    try {
        await supabase.from('user_documents').delete().eq('id', docId);
    } catch (e) {}
};

export const getPropertyAlerts = async (username: string): Promise<PropertyAlert[]> => {
    try {
        const { data } = await supabase.from('property_alerts').select('*').eq('username', username);
        return data.map(a => ({
            ...a,
            criteria: typeof a.criteria === 'string' ? JSON.parse(a.criteria) : a.criteria
        })) || [];
    } catch (e) { return []; }
};

export const addPropertyAlert = async (username: string, alertData: Omit<PropertyAlert, 'id'>): Promise<PropertyAlert> => {
    const optimistic = { ...alertData, username };
    try {
        const { data } = await supabase.from('property_alerts').insert(optimistic).select().single();
        return {
             ...data,
             criteria: typeof data.criteria === 'string' ? JSON.parse(data.criteria) : data.criteria
        };
    } catch (e) {
        handleError(e, 'adding property alert');
        if (isDemoMode) return { ...optimistic, id: `alert_${Date.now()}` } as any;
        throw e;
    }
};

export const deletePropertyAlert = async (username: string, alertId: string): Promise<void> => {
    try {
        await supabase.from('property_alerts').delete().eq('id', alertId);
    } catch (e) {}
};

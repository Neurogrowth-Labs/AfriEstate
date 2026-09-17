import React, { useMemo, useState } from 'react';
import { Property } from '../../types';
import type { TransportListing } from '../../lib/serviceListings';

const carRentals = [
  {
    name: "Avis Angola (Airport Branch)",
    phone: "+244 222 321 551",
    landline: "+244 222 321 551",
    contactPerson: "Branch Manager",
    address: "Aeroporto Internacional 4 de Fevereiro (Quatro de Fevereiro Airport), Av. Revolução de Outubro, Luanda, Angola",
    description: "International car rental brand operating at Luanda's main international airport. Open daily 06:30–20:30. Accepts Avis Charge Cards, Amex, Diners Club, Mastercard and Visa. Offers CDW and Theft Protection. Caters to business and leisure travellers arriving in Angola.",
    website: "https://www.avis.com/en/locations/af/ao/luanda",
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800'
  },
  {
    name: "Avis Angola (Downtown Branch)",
    phone: "+244 222 323 182",
    landline: "+244 222 323 182",
    contactPerson: "Branch Manager",
    address: "Av. Che Guevara Nr 250, Maculusso, Luanda, Angola",
    description: "City-centre branch of the global Avis Rent a Car brand in Luanda. Open Mon–Fri 08:00–18:00, Sat 08:00–12:00. Offers a full range of rental cars with optional coverages. Conveniently located 0.58 km from the city centre.",
    website: "https://www.avis.com/en/locations/af/ao/luanda",
    image: 'https://images.unsplash.com/photo-1562225219-c636f1c4df82?auto=format&fit=crop&q=80&w=800'
  },
  {
    name: "Europcar Angola (Airport)",
    phone: "+244 222 783 861",
    landline: "+244 222 783 861",
    contactPerson: "Customer Services",
    address: "Aeroporto Internacional 4 de Fevereiro, Luanda, Angola",
    description: "Global car rental brand with the largest presence in Angola. Located at Luanda International Airport arrivals. Offers compact to family-size vehicles with competitive rates. Part of the Europcar international network operating in 150+ countries. Open 06:00–22:00 daily.",
    website: "https://www.europcar.com/en-us/places/car-rental-angola",
    image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80&w=800'
  },
  {
    name: "Europcar Angola (Bairro Mártires)",
    phone: "+244 222 783 487",
    landline: "+244 222 783 487",
    contactPerson: "Customer Services",
    address: "Rua 7, Bairro dos Mártires do Kifangondo, Luanda, Angola",
    description: "City branch of Europcar offering car and van hire in central Luanda. Wide range of vehicles from economy models to spacious SUVs. Suitable for business and leisure clients. Offers flexible daily and weekly rental options.",
    website: "https://www.europcar.com/en-us/places/car-rental-angola",
    image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=800'
  },
  {
    name: "Europcar Angola (Avenida Mucufi)",
    phone: "+244 222 772 933",
    landline: "+244 222 772 933",
    contactPerson: "Customer Services",
    address: "Avenida Mucufi Boulevard, Luanda, Angola",
    description: "Additional Europcar city branch serving Luanda's business district. Access to the full Europcar fleet including economy cars, sedans and minivans. 24/7 reservations available online. SADC-wide network coverage.",
    website: "https://www.europcar.com/en-us/places/car-rental-angola",
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=800'
  },
  {
    name: "Europcar Angola (Meet & Greet / Largo 17 de Setembro)",
    phone: "+244 914 613 614",
    landline: "N/A",
    contactPerson: "Meet & Greet Coordinator",
    address: "Largo 17 de Setembro Nr 4, Luanda, Angola / Rua da Missão, Hotel Trópico, Luanda",
    description: "Europcar meet-and-greet station offering vehicle delivery and collection services in central Luanda. Ideal for hotel-based clients and corporate travellers. Also located at Hotel Trópico on Rua da Missão.",
    website: "https://www.europcar.com/en-us/places/car-rental-angola",
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=800'
  },
  {
    name: "Hertz Angola",
    phone: "+244 914 622 668",
    landline: "N/A",
    contactPerson: "Branch Manager",
    address: "Rua da Missão 20, Luanda, Angola",
    description: "Global Hertz car rental brand with a presence in Luanda. Offers premium and economy vehicles for daily, weekly and long-term hire. Well-known for quality maintained vehicles and straightforward booking process. Serves both leisure and corporate clients.",
    website: "https://www.hertz.com/us/en/location/angola/luanda",
    image: 'https://images.unsplash.com/photo-1586191552066-d52cd8bd002e?auto=format&fit=crop&q=80&w=800'
  },
  {
    name: "SIXT Angola (Airport)",
    phone: "+244 933 728 002",
    landline: "N/A",
    contactPerson: "Branch Manager",
    address: "International Arrivals Lounge, Aeroporto Internacional 4 de Fevereiro, Luanda, Angola",
    description: "SIXT Rent a Car with a 24-hour pick-up location at Luanda Airport arrivals hall. Family-managed global brand since 1912. Fleet includes SUVs, minivans, sedans, station wagons and convertibles. Minimum rental age 18. International Driving Permit required.",
    website: "https://www.sixt.com/car-rental/angola/luanda/",
    image: 'https://images.unsplash.com/photo-1616431940984-7a3c7dd59b58?auto=format&fit=crop&q=80&w=800'
  },
  {
    name: "SIXT Angola (City)",
    phone: "+244 933 728 002",
    landline: "N/A",
    contactPerson: "Branch Manager",
    address: "Hotel de Convencoes CCB4 GU02, Luanda, Angola",
    description: "SIXT city branch in Luanda located at Hotel de Convenções. 24-hour vehicle pick-up available. Offers the same diverse fleet as the airport branch. Convenient for hotel-based guests and travellers not using the airport.",
    website: "https://www.sixt.com/car-rental/angola/luanda/",
    image: 'https://images.unsplash.com/photo-1549318182-ed32ffed7b45?auto=format&fit=crop&q=80&w=800'
  },
  {
    name: "Budget Angola",
    phone: "N/A",
    landline: "N/A",
    contactPerson: "Reservations Desk",
    address: "Quatro de Fevereiro Airport & Luanda City, Angola",
    description: "Budget Car Rental with operations in Luanda, Angola. Offers competitive daily and weekly car hire rates at the airport and city locations. Popular among budget-conscious business and leisure travellers. Online bookings available through Budget's global portal.",
    website: "https://www.budget.com/en/locations/ao/luanda",
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=800'
  },
  {
    name: "Chana Rent-A-Car",
    phone: "N/A",
    landline: "N/A",
    contactPerson: "Paulo Vaal Neto (Director-Geral); Fátima Jeremias (Gestora)",
    address: "Estrada Principal do Lar do Patriota, Luanda; also Lobito Branch – Benguela Province, Angola",
    description: "Proudly Angolan car rental company operating since 2012 under the Grupo Chana (Organizações Chana), founded in 1992. Fleet of ~200 vehicles including small, medium and large vehicles. Offers rental with and without driver for weddings, corporate missions, events and general transport. Also present in Benguela Province (Lobito) and at Luanda Airport.",
    website: "https://chanarentacar.ao/",
    image: 'https://images.unsplash.com/photo-1518987114704-51a84f3ccfa4?auto=format&fit=crop&q=80&w=800'
  },
  {
    name: "Daimic Rent (Sede – Viana)",
    phone: "+244 936 514 976",
    landline: "+244 941 131 127",
    contactPerson: "Customer Service Team",
    address: "Avenida Deolinda Rodrigues, KM 13, Viana (Estrada de Catete), Luanda, Angola",
    description: "Vehicle rental division of the Daimic Motors Group (part of Grupo Imporáfrica, founded 1989). Offers a wide range of rental vehicles for personal and corporate clients from multiple branches across Luanda. Monthly renting (renting) options available. Official Changan and Citroen representative.",
    website: "https://www.daimic.com/alugar",
    image: 'https://images.unsplash.com/photo-1502877338535-775f0054817a?auto=format&fit=crop&q=80&w=800'
  },
  {
    name: "Daimic Rent (Talatona)",
    phone: "+244 972 626 993",
    landline: "+244 972 626 948",
    contactPerson: "Commercial Department",
    address: "Edifício One Metropolis, Loja Nº 1, Talatona, Luanda, Angola",
    description: "Talatona branch of Daimic Rent offering vehicle rental for corporate and individual clients. Ideally positioned near Luanda's business hub. Full range of cars available from compact to SUV. Backed by Daimic's nationwide service network.",
    website: "https://www.daimic.com/alugar",
    image: 'https://images.unsplash.com/photo-1591768793355-74d04bb6608f?auto=format&fit=crop&q=80&w=800'
  },
  {
    name: "Daimic Rent (Morro Bento)",
    phone: "+244 972 626 994",
    landline: "+244 972 626 949",
    contactPerson: "Commercial Department",
    address: "Av. 21 de Janeiro, Morro Bento (Alongside Hotel AGATHA), Luanda, Angola",
    description: "Morro Bento branch of Daimic Rent serving one of Luanda's prime residential and business areas. Vehicles available for short and long-term hire. Certified clean vehicles with rigorous hygiene standards.",
    website: "https://www.daimic.com/alugar",
    image: 'https://plus.unsplash.com/premium_photo-1661962386187-b99bcf41865c?auto=format&fit=crop&q=80&w=800'
  },
  {
    name: "Daimic Rent (Via Expressa – Patriota)",
    phone: "+244 972 419 913",
    landline: "N/A",
    contactPerson: "Commercial Department",
    address: "Via Expressa – Patriota, Before the Boa Vida Urbanisation (direction Kilamba), Luanda, Angola",
    description: "Patriota corridor branch of Daimic Rent serving the rapidly growing suburban belt south-east of Luanda. Caters to residents of Kilamba and surrounding areas. Full range of rental vehicles available.",
    website: "https://www.daimic.com/alugar",
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800'
  },
  {
    name: "Daimic Rent (Lubango – via EMPOWER)",
    phone: "N/A",
    landline: "N/A",
    contactPerson: "Authorised Representative",
    address: "Rua Patrice Lumumba, Next to Prédio dos Médicos, Lubango, Huíla Province, Angola",
    description: "Authorised Daimic Rent representative in Lubango, serving Angola's second-largest inland city. Provides vehicle rental solutions to corporate and individual clients in the Huíla province.",
    website: "https://www.daimic.com/alugar",
    image: 'https://images.unsplash.com/photo-1562225219-c636f1c4df82?auto=format&fit=crop&q=80&w=800'
  },
  {
    name: "Avis Rent a Car",
    phone: "0861 021 111",
    landline: "+27 11 923 3500",
    contactPerson: "Customer Service Team",
    address: "3 Brabazon Road",
    description: "Croydon",
    website: "Isando",
    image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80&w=800'
  },
  {
    name: "Europcar South Africa",
    phone: "+27 11 723 8000",
    landline: "+27 11 454 1236 (Fax)",
    contactPerson: "Customer Services",
    address: "146 Kelvin Drive",
    description: "Woodmead",
    website: "Sandton",
    image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=800'
  },
  {
    name: "Hertz South Africa",
    phone: "+27 21 935 4800",
    landline: "+27 21 935 4800",
    contactPerson: "Customer Relations",
    address: "PO Box 145",
    description: "Cape Town International Airport",
    website: "Cape Town 7525",
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=800'
  },
  {
    name: "First Car Rental",
    phone: "0861 178 227",
    landline: "+27 11 230 9999",
    contactPerson: "Call Centre",
    address: "1st Floor Prism Building",
    description: "Rudd Road",
    website: "Illovo",
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=800'
  },
  {
    name: "Tempest Car Hire",
    phone: "0861 836 737",
    landline: "+27 11 573 0000",
    contactPerson: "Customer Care",
    address: "16 Ernest Oppenheimer Avenue",
    description: "Bruma",
    website: "Johannesburg",
    image: 'https://images.unsplash.com/photo-1586191552066-d52cd8bd002e?auto=format&fit=crop&q=80&w=800'
  },
  {
    name: "Spartan Truck Hire",
    phone: "0861 772 7826",
    landline: "0861 772 7826",
    contactPerson: "Arnold Friedman (CEO)",
    address: "Kempton Park",
    description: "Gauteng (Head Office)",
    website: "South Africa's leading truck rental and leasing provider with 40+ years' experience and a fleet of over 4,500 vehicles. Services include short to medium-term truck hire, full maintenance leasing and dedicated transport contracts. Branches in Johannesburg, Pretoria, Durban and Cape Town.",
    image: 'https://images.unsplash.com/photo-1616431940984-7a3c7dd59b58?auto=format&fit=crop&q=80&w=800'
  },
  {
    name: "Imperial Truck Rental",
    phone: "+27 11 977 7339",
    landline: "+27 11 977 7100",
    contactPerson: "Surette Vorster",
    address: "160 Kelvin Road (Cnr Kelvin & Derrick Road), Spartan, Kempton Park 1619",
    description: "Flexible and dependable truck rental solutions across South Africa. Anticipates and responds to clients' evolving transport needs. Multiple branches nationwide including Cape Town and Pretoria. Part of DP World logistics group. Trusted by universities and major corporates.",
    website: "https://www.imperialtruckrental.co.za",
    image: 'https://images.unsplash.com/photo-1549318182-ed32ffed7b45?auto=format&fit=crop&q=80&w=800'
  },
  {
    name: "Elite Truck Hire",
    phone: "+27 11 397 3800",
    landline: "+27 11 397 3800",
    contactPerson: "Fleet Sales Team",
    address: "Gauteng (Head Office — branches nationwide)",
    description: "Trusted Level 2 BBBEE truck hire company with decades of industry experience. Offers daily, weekly and monthly rentals as well as full-maintenance leasing. Fleet includes bakkies, vans, panel vans, curtain sides, refrigerated trucks and tail-lift trucks.",
    website: "https://elitetruck.co.za",
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=800'
  },
  {
    name: "Kenings Van and Truck Hire",
    phone: "021 555 9561",
    landline: "021 555 9561",
    contactPerson: "Enquiries Team",
    address: "Cape Town (Head Office with nationwide branches)",
    description: "Affordable van, bakkie and truck hire across South Africa. Caters to logistics & distribution, business operations, personal moves, and film & production. Well-maintained vehicles with flexible rental periods. Branches located countrywide for easy collection and return.",
    website: "https://kenings.co.za",
    image: 'https://images.unsplash.com/photo-1518987114704-51a84f3ccfa4?auto=format&fit=crop&q=80&w=800'
  },
  {
    name: "GO Rentals (IT & Equipment)",
    phone: "0861 467 368",
    landline: "+27 11 513 9200",
    contactPerson: "Customer Service",
    address: "Sandton",
    description: "Johannesburg (Head Office); Cape Town: 10 Blaauwberg Business Park",
    website: "Potsdam Road",
    image: 'https://images.unsplash.com/photo-1502877338535-775f0054817a?auto=format&fit=crop&q=80&w=800'
  },
  {
    name: "Budget Car Rental South Africa",
    phone: "0800 016 622",
    landline: "+27 11 398 0123",
    contactPerson: "Reservations Team",
    address: "Isando",
    description: "Johannesburg",
    website: "Gauteng (Head Office)",
    image: 'https://images.unsplash.com/photo-1591768793355-74d04bb6608f?auto=format&fit=crop&q=80&w=800'
  },
  {
    name: "BLUU Car Rental",
    phone: "0800 259 888",
    landline: "0800 259 888",
    contactPerson: "Customer Support",
    address: "Nationwide (South Africa)",
    description: "Affordable car hire in South Africa with nationwide coverage. Competitive rates for business trips, holidays and airport transfers. Offers a range of vehicle categories with easy online booking and excellent customer service.",
    website: "https://www.bluucarrental.com",
    image: 'https://plus.unsplash.com/premium_photo-1661962386187-b99bcf41865c?auto=format&fit=crop&q=80&w=800'
  },
  {
    name: "Truck Hire South Africa (TruckHire.co.za)",
    phone: "+27 11 568 6200",
    landline: "+27 11 568 6200",
    contactPerson: "Enquiries Desk",
    address: "Johannesburg",
    description: "Gauteng",
    website: "Network-based truck hire broker connecting clients with a wide variety of vehicle rental companies across South Africa. Provides moving vans, panel vans, dropsides, refrigerated trucks, rollback trucks, crane trucks, lowbeds and bakkies. Handles both local and cross-border transport.",
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800'
  },
  {
    name: "Value Logistics",
    phone: "+27 11 842 2000",
    landline: "+27 11 842 2000",
    contactPerson: "Fleet Solutions Team",
    address: "Johannesburg",
    description: "Gauteng",
    website: "Integrated supply chain and transport solutions provider. Offers scalable fleet rental solutions and dedicated transport contracts across South Africa for businesses needing access to vehicles without capital investment. Serves retail, FMCG and distribution sectors.",
    image: 'https://images.unsplash.com/photo-1562225219-c636f1c4df82?auto=format&fit=crop&q=80&w=800'
  }
];

const featuredVehicles = [
  {
    make: 'Mercedes-Benz',
    model: 'GLE 300d',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800',
    rating: '5.0',
    reviews: '1,245',
    specs: ['Automatic', '5 Seats', 'Diesel', 'Unlimited Mileage', 'Airport Pickup'],
    price: 'R1,950',
    category: 'Luxury'
  },
  {
    make: 'BMW',
    model: 'X5 xDrive30d',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=800',
    rating: '4.9',
    reviews: '982',
    specs: ['Automatic', '5 Seats', 'Diesel', 'Unlimited Mileage', 'Airport Pickup'],
    price: 'R1,850',
    category: 'SUV'
  },
  {
    make: 'Audi',
    model: 'Q8 55 TFSI',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&q=80&w=800',
    rating: '4.9',
    reviews: '850',
    specs: ['Automatic', '5 Seats', 'Petrol', 'Unlimited Mileage', 'City Delivery'],
    price: 'R2,100',
    category: 'Luxury'
  }
];

type BookingVehicle = {
  id: string;
  make: string;
  model: string;
  image: string;
  price: string;
  specs: string[];
  category: string;
};

const parseRate = (price: string) => Number(price.replace(/[^0-9.]/g, '')) || 0;
const formatZar = (amount: number) => `R${Math.round(amount).toLocaleString('en-ZA')}`;

const CarBookingFlow: React.FC<{ vehicles: BookingVehicle[]; initialVehicle: BookingVehicle | null; onClose: () => void }> = ({ vehicles, initialVehicle, onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedVehicle, setSelectedVehicle] = useState<BookingVehicle | null>(initialVehicle);
  const [booking, setBooking] = useState({ pickup: 'Cape Town Airport', returnLocation: 'Cape Town Airport', pickupDate: '2026-06-15', pickupTime: '10:00', returnDate: '2026-06-20', returnTime: '10:00' });
  const [extras, setExtras] = useState({ additionalDriver: false, childSeat: false, gps: false, protection: true, delivery: false });
  const [customer, setCustomer] = useState({ fullName: '', mobile: '', email: '', idNumber: '', licence: '' });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [confirmation, setConfirmation] = useState('');

  const days = Math.max(1, Math.ceil((new Date(`${booking.returnDate}T${booking.returnTime}`).getTime() - new Date(`${booking.pickupDate}T${booking.pickupTime}`).getTime()) / 86_400_000));
  const vehicleTotal = selectedVehicle ? parseRate(selectedVehicle.price) * days : 0;
  const extrasTotal = (extras.additionalDriver ? 180 * days : 0) + (extras.childSeat ? 85 * days : 0) + (extras.gps ? 75 * days : 0) + (extras.protection ? 220 * days : 0);
  const deliveryFee = extras.delivery ? 350 : 0;
  const deposit = selectedVehicle ? Math.max(1500, Math.round(parseRate(selectedVehicle.price) * 1.5)) : 0;
  const total = vehicleTotal + extrasTotal + deliveryFee;
  const updateBooking = (key: keyof typeof booking, value: string) => setBooking(current => ({ ...current, [key]: value }));
  const updateCustomer = (key: keyof typeof customer, value: string) => setCustomer(current => ({ ...current, [key]: value }));
  const canContinue = booking.pickup && booking.returnLocation && booking.pickupDate && booking.returnDate && new Date(`${booking.returnDate}T${booking.returnTime}`) > new Date(`${booking.pickupDate}T${booking.pickupTime}`);
  const inputClass = 'mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-[#1D1D1D] outline-none focus:border-[#0F2D25] focus:ring-1 focus:ring-[#0F2D25]';

  const next = () => setStep(current => Math.min(7, current + 1));
  const selectVehicle = (vehicle: BookingVehicle) => { setSelectedVehicle(vehicle); setStep(3); };

  return <div className="fixed inset-0 z-[200] overflow-y-auto bg-[#0F2D25]/70 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="car-booking-title">
    <div className="mx-auto my-4 w-full max-w-5xl overflow-hidden rounded-2xl bg-[#FAF8F5] shadow-2xl">
      <header className="flex items-start justify-between border-b border-gray-200 bg-white px-5 py-4 md:px-8">
        <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8A6C32]">Secure car rental</p><h2 id="car-booking-title" className="font-playfair text-2xl font-bold text-[#0F2D25]">Book your car</h2></div>
        <button onClick={onClose} aria-label="Close booking" className="rounded-full p-2 text-xl text-gray-500 hover:bg-gray-100">×</button>
      </header>
      <div className="border-b border-gray-200 bg-white px-5 py-3 md:px-8"><ol className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold text-gray-500">{['Dates', 'Car', 'Customize', 'Details', 'Review', 'Payment', 'Confirmed'].map((label, index) => <li key={label} className={step === index + 1 ? 'text-[#0F2D25]' : step > index + 1 ? 'text-[#1FA971]' : ''}>{step > index + 1 ? '✓ ' : `${index + 1}. `}{label}</li>)}</ol></div>
      <main className="p-5 md:p-8">
        {step === 1 && <section><h3 className="font-playfair text-3xl font-bold">Start your booking</h3><p className="mt-1 text-gray-600">Choose where and when you need your car.</p><div className="mt-6 grid gap-4 md:grid-cols-2"><label>Pick-up location<input value={booking.pickup} onChange={e => updateBooking('pickup', e.target.value)} className={inputClass} required /></label><label>Return location<input value={booking.returnLocation} onChange={e => updateBooking('returnLocation', e.target.value)} className={inputClass} required /></label><label>Pick-up date<input type="date" value={booking.pickupDate} onChange={e => updateBooking('pickupDate', e.target.value)} className={inputClass} required /></label><label>Pick-up time<input type="time" value={booking.pickupTime} onChange={e => updateBooking('pickupTime', e.target.value)} className={inputClass} required /></label><label>Return date<input type="date" value={booking.returnDate} onChange={e => updateBooking('returnDate', e.target.value)} className={inputClass} required /></label><label>Return time<input type="time" value={booking.returnTime} onChange={e => updateBooking('returnTime', e.target.value)} className={inputClass} required /></label></div><button disabled={!canContinue} onClick={next} className="mt-7 rounded-lg bg-[#0F2D25] px-6 py-3 font-bold text-[#C9A35D] disabled:cursor-not-allowed disabled:opacity-50">Search Cars</button>{!canContinue && <p className="mt-2 text-sm text-red-600">Return date and time must be after pick-up.</p>}</section>}
        {step === 2 && <section><h3 className="font-playfair text-3xl font-bold">Choose your car</h3><p className="mt-1 text-gray-600">{days} rental day{days === 1 ? '' : 's'} · {booking.pickup} to {booking.returnLocation}</p><div className="mt-6 grid gap-5 md:grid-cols-2">{vehicles.map(vehicle => { const rate = parseRate(vehicle.price); const automatic = vehicle.specs.find(spec => /automatic|manual/i.test(spec)) || 'Automatic'; const seats = vehicle.specs.find(spec => /seat/i.test(spec)) || '5 Seats'; return <article key={vehicle.id} className="overflow-hidden rounded-xl border border-gray-200 bg-white"><img src={vehicle.image} alt={`${vehicle.make} ${vehicle.model}`} className="h-44 w-full object-cover" referrerPolicy="no-referrer" /><div className="p-4"><h4 className="font-playfair text-xl font-bold">{vehicle.make} {vehicle.model}</h4><p className="mt-2 text-sm text-gray-600">{automatic} · {seats} · 2 luggage</p><div className="mt-4 grid grid-cols-2 gap-2 text-sm"><span>Daily rate <strong className="block text-[#0F2D25]">{vehicle.price}</strong></span><span>Total rental <strong className="block text-[#0F2D25]">{formatZar(rate * days)}</strong></span><span>Refundable deposit <strong className="block text-[#0F2D25]">{formatZar(Math.max(1500, Math.round(rate * 1.5)))}</strong></span></div><button onClick={() => selectVehicle(vehicle)} className="mt-4 w-full rounded-lg bg-[#0F2D25] py-2.5 font-bold text-[#C9A35D]">Select Car</button></div></article>; })}</div></section>}
        {step === 3 && <section><h3 className="font-playfair text-3xl font-bold">Customize your rental</h3><p className="mt-1 text-gray-600">Add only what you need. You can review all charges before paying.</p><div className="mt-6 space-y-3">{([{ key: 'additionalDriver', label: `Additional driver · ${formatZar(180)}/day` }, { key: 'childSeat', label: `Child seat · ${formatZar(85)}/day` }, { key: 'gps', label: `GPS / Wi-Fi · ${formatZar(75)}/day` }, { key: 'protection', label: `Premium insurance & protection · ${formatZar(220)}/day` }, { key: 'delivery', label: `Delivery / alternative pick-up · ${formatZar(350)} once` }] as const).map(option => <label key={option.key} className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-white p-4"><span className="font-medium">{option.label}</span><input type="checkbox" checked={extras[option.key]} onChange={e => setExtras(current => ({ ...current, [option.key]: e.target.checked }))} className="h-5 w-5 accent-[#0F2D25]" /></label>)}</div><div className="mt-7 flex gap-3"><button onClick={() => setStep(2)} className="rounded-lg border border-gray-300 px-5 py-3 font-semibold">Back</button><button onClick={next} className="rounded-lg bg-[#0F2D25] px-6 py-3 font-bold text-[#C9A35D]">Continue</button></div></section>}
        {step === 4 && <section><h3 className="font-playfair text-3xl font-bold">Customer details</h3><p className="mt-1 text-gray-600">Your documents are required to validate the driver before collection.</p><div className="mt-6 grid gap-4 md:grid-cols-2">{([{ key: 'fullName', label: 'Full name', type: 'text' }, { key: 'mobile', label: 'Mobile / WhatsApp', type: 'tel' }, { key: 'email', label: 'Email address', type: 'email' }, { key: 'idNumber', label: 'ID or passport number', type: 'text' }, { key: 'licence', label: "Driver's licence number", type: 'text' }] as const).map(field => <label key={field.key}>{field.label}<input required type={field.type} value={customer[field.key]} onChange={e => updateCustomer(field.key, e.target.value)} className={inputClass} /></label>)}</div><div className="mt-7 flex gap-3"><button onClick={() => setStep(3)} className="rounded-lg border border-gray-300 px-5 py-3 font-semibold">Back</button><button disabled={Object.values(customer).some(value => !value.trim())} onClick={next} className="rounded-lg bg-[#0F2D25] px-6 py-3 font-bold text-[#C9A35D] disabled:opacity-50">Review booking</button></div></section>}
        {step === 5 && <section><h3 className="font-playfair text-3xl font-bold">Review & confirm</h3><div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]"><div className="rounded-xl border border-gray-200 bg-white p-5"><h4 className="font-bold">{selectedVehicle?.make} {selectedVehicle?.model}</h4><p className="mt-1 text-sm text-gray-600">{booking.pickupDate} {booking.pickupTime} → {booking.returnDate} {booking.returnTime}</p><p className="text-sm text-gray-600">Pick-up: {booking.pickup}{extras.delivery ? ' · Delivery selected' : ''}</p><p className="mt-4 border-t pt-4 text-sm">Driver: {customer.fullName} · {customer.mobile}</p></div><aside className="rounded-xl bg-[#0F2D25] p-5 text-white"><h4 className="font-bold text-[#C9A35D]">Price breakdown</h4><dl className="mt-4 space-y-3 text-sm"><div className="flex justify-between"><dt>Vehicle rental</dt><dd>{formatZar(vehicleTotal)}</dd></div><div className="flex justify-between"><dt>Extras</dt><dd>{formatZar(extrasTotal)}</dd></div><div className="flex justify-between"><dt>Delivery fee</dt><dd>{formatZar(deliveryFee)}</dd></div><div className="flex justify-between"><dt>Refundable deposit</dt><dd>{formatZar(deposit)}</dd></div><div className="flex justify-between border-t border-white/20 pt-3 text-base font-bold"><dt>Total</dt><dd>{formatZar(total)}</dd></div></dl></aside></div><div className="mt-7 flex gap-3"><button onClick={() => setStep(4)} className="rounded-lg border border-gray-300 px-5 py-3 font-semibold">Back</button><button onClick={next} className="rounded-lg bg-[#0F2D25] px-6 py-3 font-bold text-[#C9A35D]">Confirm & Pay</button></div></section>}
        {step === 6 && <section><h3 className="font-playfair text-3xl font-bold">Payment</h3><p className="mt-1 text-gray-600">Choose a supported payment method. Amount due now: <strong>{formatZar(total)}</strong>.</p><div className="mt-6 grid gap-3 md:grid-cols-3">{['card', 'eft', 'other'].map(method => <button key={method} onClick={() => setPaymentMethod(method)} className={`rounded-xl border p-5 text-left font-bold capitalize ${paymentMethod === method ? 'border-[#0F2D25] bg-[#0F2D25] text-[#C9A35D]' : 'border-gray-200 bg-white'}`}>{method === 'eft' ? 'EFT / bank transfer' : method === 'card' ? 'Card' : 'Other supported method'}</button>)}</div><p className="mt-5 rounded-lg bg-amber-50 p-4 text-sm text-amber-900">Payment is represented in this booking flow. Connect a PCI-compliant payment provider before processing real card or EFT payments.</p><div className="mt-7 flex gap-3"><button onClick={() => setStep(5)} className="rounded-lg border border-gray-300 px-5 py-3 font-semibold">Back</button><button onClick={() => { setConfirmation(`AE-${Date.now().toString(36).toUpperCase()}`); next(); }} className="rounded-lg bg-[#0F2D25] px-6 py-3 font-bold text-[#C9A35D]">Pay {formatZar(total)}</button></div></section>}
        {step === 7 && <section className="text-center"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#1FA971]/15 text-3xl text-[#1FA971]">✓</div><h3 className="mt-4 font-playfair text-3xl font-bold">Booking confirmed</h3><p className="mt-2 text-gray-600">Your booking reference is <strong>{confirmation}</strong>.</p><div className="mx-auto mt-6 max-w-lg rounded-xl border border-gray-200 bg-white p-5 text-left"><dl className="space-y-3 text-sm"><div className="flex justify-between gap-4"><dt>Vehicle</dt><dd>{selectedVehicle?.make} {selectedVehicle?.model}</dd></div><div className="flex justify-between gap-4"><dt>Dates & times</dt><dd className="text-right">{booking.pickupDate} {booking.pickupTime}<br />{booking.returnDate} {booking.returnTime}</dd></div><div className="flex justify-between gap-4"><dt>Pick-up location</dt><dd className="text-right">{booking.pickup}</dd></div><div className="flex justify-between"><dt>Amount paid</dt><dd>{formatZar(total)}</dd></div><div className="flex justify-between"><dt>Refundable deposit</dt><dd>{formatZar(deposit)}</dd></div><div className="flex justify-between"><dt>Customer support</dt><dd>support@afriestate.com</dd></div></dl></div><button onClick={onClose} className="mt-7 rounded-lg bg-[#0F2D25] px-6 py-3 font-bold text-[#C9A35D]">Manage My Booking</button></section>}
      </main>
    </div>
  </div>;
};

const RentACarPage: React.FC<{ properties?: Property[]; transportListings?: TransportListing[] }> = ({ properties = [], transportListings = [] }) => {
  const [activeCategory, setActiveCategory] = useState('Luxury');

  const [bookingVehicle, setBookingVehicle] = useState<any | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const startBooking = (vehicle?: any) => {
    setBookingVehicle(vehicle || null);
    setIsBookingOpen(true);
  };

  const displayVehicles = transportListings.length > 0 ? transportListings.map(listing => ({
      make: listing.title.split(' ')[0] || listing.businessName,
      model: listing.title.split(' ').slice(1).join(' ') || 'Vehicle',
      image: listing.images[0] || 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800',
      rating: 4.8, reviews: 'New', specs: [listing.category, listing.pickupAddress], price: `${listing.currency} ${listing.dailyRate.toLocaleString()}`, category: listing.category,
  })) : properties.length > 0 ? properties.map(p => ({
      make: p.title.split(' ')[0] || 'Transport',
      model: p.title.split(' ').slice(1).join(' ') || 'Vehicle',
      image: p.images?.[0] || 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800',
      rating: p.agent?.rating || 4.8,
      reviews: p.agent?.reviewCount || 100,
      specs: p.amenities.length > 0 ? p.amenities : ['Automatic', '5 Seats', 'Unlimited Mileage'],
      price: `R${p.price}`,
      category: p.vehicleType || 'SUV'
  })) : [
  {
    make: 'Mercedes-Benz',
    model: 'GLE 300d',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800',
    rating: '5.0',
    reviews: '1,245',
    specs: ['Automatic', '5 Seats', 'Diesel', 'Unlimited Mileage', 'Airport Pickup'],
    price: 'R1,950',
    category: 'Luxury'
  },
  {
    make: 'BMW',
    model: 'X5 xDrive30d',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=800',
    rating: '4.9',
    reviews: '982',
    specs: ['Automatic', '5 Seats', 'Diesel', 'Unlimited Mileage', 'Airport Pickup'],
    price: 'R1,850',
    category: 'SUV'
  },
  {
    make: 'Audi',
    model: 'Q8 55 TFSI',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&q=80&w=800',
    rating: '4.9',
    reviews: '850',
    specs: ['Automatic', '5 Seats', 'Petrol', 'Unlimited Mileage', 'City Delivery'],
    price: 'R2,100',
    category: 'Luxury'
  }
];


  const bookingVehicles = useMemo(() => displayVehicles.map((vehicle, index) => ({ ...vehicle, id: `${vehicle.make}-${vehicle.model}-${index}` })), [displayVehicles]);

  return (
    <div className="bg-[#FAF8F5] text-[#1D1D1D] font-sans antialiased">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');
          .font-playfair { font-family: 'Playfair Display', serif; }
          .font-inter { font-family: 'Inter', sans-serif; }
          
          /* Custom Scrollbar for horizontal lists */
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
          }
        `}
      </style>


      {/* Hero Section */}
      <section className="relative bg-[#0F2D25] text-white pt-20 pb-32 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="font-playfair text-5xl md:text-7xl font-bold leading-tight mb-6">
            Drive Your Journey <br/><span className="text-[#C9A35D] italic">With Confidence</span>
          </h1>
          <p className="text-lg md:text-xl font-light text-gray-300 max-w-2xl mx-auto mb-12">
            Choose from thousands of verified vehicles across South Africa. Luxury, economy, SUVs, long-term rentals, and chauffeur services—all in one premium platform.
          </p>

          {/* Smart Booking Widget */}
          <div className="bg-white rounded-xl shadow-2xl p-4 md:p-6 text-[#1D1D1D] mx-auto w-full max-w-4xl flex flex-col lg:flex-row items-center gap-4 text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 w-full">
              <div className="flex flex-col">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Pickup Location</label>
                <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
                  <span>📍</span>
                  <input type="text" defaultValue="Cape Town Airport" className="w-full bg-transparent border-none p-0 focus:ring-0 text-sm font-medium"/>
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Return Location</label>
                <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
                  <span>📍</span>
                  <input type="text" defaultValue="Johannesburg" className="w-full bg-transparent border-none p-0 focus:ring-0 text-sm font-medium"/>
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Pickup Date</label>
                <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
                  <span>📅</span>
                  <input type="text" defaultValue="15 Jun 2026" className="w-full bg-transparent border-none p-0 focus:ring-0 text-sm font-medium"/>
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Return Date</label>
                <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
                  <span>📅</span>
                  <input type="text" defaultValue="20 Jun 2026" className="w-full bg-transparent border-none p-0 focus:ring-0 text-sm font-medium"/>
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Driver Age</label>
                <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
                  <span>👤</span>
                  <select className="w-full bg-transparent border-none p-0 focus:ring-0 text-sm font-medium">
                    <option>30+</option>
                    <option>25-29</option>
                    <option>18-24</option>
                  </select>
                </div>
              </div>
            </div>
            <button onClick={() => startBooking()} className="bg-[#0F2D25] text-[#C9A35D] font-semibold px-8 py-4 rounded-lg w-full lg:w-auto mt-4 lg:mt-0 whitespace-nowrap hover:bg-opacity-90 transition-all flex items-center justify-center gap-2">
              <span>🔍</span> Search Cars
            </button>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm md:text-base font-medium text-gray-300">
            <span className="flex items-center gap-1 text-[#C9A35D]">★★★★★ <span className="text-white ml-1">4.9/5 Rating</span></span>
            <span className="flex items-center gap-2"><span className="text-[#1FA971]">✔</span> Fully Insured</span>
            <span className="flex items-center gap-2"><span className="text-[#1FA971]">✔</span> 24/7 Roadside</span>
            <span className="flex items-center gap-2"><span className="text-[#1FA971]">✔</span> No Hidden Fees</span>
            <span className="flex items-center gap-2"><span className="text-[#1FA971]">✔</span> Instant Booking</span>
          </div>
        </div>
      </section>

      {/* Vehicle Categories & Featured */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12">
          <div>
            <h2 className="font-playfair text-4xl font-bold mb-4">Featured Collections</h2>
            <p className="text-gray-500 max-w-xl">Curated vehicles tailored perfectly to your lifestyle. From commanding SUVs to elegant luxury sedans.</p>
          </div>
          <div className="mt-6 md:mt-0 flex gap-4">
            {['Luxury', 'SUV', 'Economy'].map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${activeCategory === cat ? 'bg-[#0F2D25] text-[#C9A35D]' : 'bg-white border border-gray-200 text-gray-600 hover:border-[#0F2D25]'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayVehicles.map((vehicle, idx) => (
            <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all group">
              <div className="h-64 overflow-hidden relative">
                <img src={vehicle.image} alt={vehicle.model} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"  referrerPolicy="no-referrer" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-[#0F2D25]">
                  {vehicle.category}
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">{vehicle.make}</p>
                    <h3 className="font-playfair text-2xl font-bold">{vehicle.model}</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-[#0F2D25]">{vehicle.price}<span className="text-sm text-gray-500 font-normal">/day</span></p>
                  </div>
                </div>
                <div className="flex items-center gap-1 mb-6 text-sm">
                  <span className="text-[#C9A35D]">★★★★★</span>
                  <span className="font-semibold">{vehicle.rating}</span>
                  <span className="text-gray-400">({vehicle.reviews} Reviews)</span>
                </div>
                <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm text-gray-600 mb-8">
                  {vehicle.specs.map(spec => (
                    <div key={spec} className="flex items-center gap-2">
                       <span className="w-1.5 h-1.5 rounded-full bg-[#C9A35D]"></span>{spec}
                    </div>
                  ))}
                </div>
                <button onClick={() => startBooking(vehicle)} className="w-full bg-white border-2 border-[#0F2D25] text-[#0F2D25] font-semibold py-3 rounded-lg hover:bg-[#0F2D25] hover:text-[#C9A35D] transition-colors">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AI Recommendation Engine */}
      <section className="bg-[#0F2D25] py-20 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute -right-40 -top-40 w-96 h-96 bg-[#C9A35D] rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 relative z-10">
          <div className="flex-1 text-white">
            <h2 className="font-playfair text-4xl mb-6">AI Vehicle Recommendation</h2>
            <p className="text-gray-300 text-lg mb-8 font-light">Not sure what you need? Tell our Smart Assistant where you are traveling and we'll suggest the perfect vehicle, estimated fuel costs, and route insights.</p>
            
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 mb-6">
              <p className="text-[#C9A35D] text-sm font-semibold mb-2">SMART ASSISTANT</p>
              <h3 className="text-2xl font-medium mb-4">"Where are you traveling?"</h3>
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="px-4 py-2 bg-white/5 rounded-full text-sm border border-white/10 cursor-pointer hover:bg-white/20 transition-colors">Family holiday</span>
                <span className="px-4 py-2 bg-white/5 rounded-full text-sm border border-white/10 cursor-pointer hover:bg-white/20 transition-colors">Business trip</span>
                <span className="px-4 py-2 bg-white/5 rounded-full text-sm border border-white/10 cursor-pointer hover:bg-white/20 transition-colors">Wedding</span>
                <span className="px-4 py-2 bg-white/5 rounded-full text-sm border border-white/10 cursor-pointer hover:bg-white/20 transition-colors">Long road trip</span>
              </div>
              <div className="relative">
                <input type="text" placeholder="e.g. 3-day road trip along the Garden Route..." className="w-full bg-white/10 border border-white/20 rounded-lg p-4 text-white placeholder-gray-400 focus:ring-1 focus:ring-[#C9A35D] focus:border-[#C9A35D] outline-none" />
                <button className="absolute right-2 top-2 bottom-2 bg-[#C9A35D] text-[#0F2D25] px-4 rounded-md font-semibold hover:bg-white transition-colors">Ask AI</button>
              </div>
            </div>
          </div>
          <div className="flex-1 w-full relative">
             <div className="bg-white rounded-2xl p-6 shadow-2xl relative z-10 animate-fade-in-up">
                <div className="flex justify-between items-start border-b border-gray-100 pb-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-1">AI Recommendation</p>
                    <h4 className="font-playfair text-xl font-bold">Range Rover Velar</h4>
                  </div>
                  <span className="text-[#1FA971] bg-[#1FA971]/10 px-3 py-1 rounded-full text-sm font-semibold font-mono">98% Match</span>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">📍</div>
                    <div>
                      <p className="font-semibold text-sm">Perfect for your route</p>
                      <p className="text-xs text-gray-500">Air suspension handles the coastal mountain passes smoothly.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-500 shrink-0">⛽</div>
                    <div>
                      <p className="font-semibold text-sm">Est. Fuel Cost: R1,200</p>
                      <p className="text-xs text-gray-500">Based on 450km round trip using current diesel prices.</p>
                    </div>
                  </div>
                </div>
             </div>
             {/* Decorative background cards */}
             <div className="absolute top-10 -right-8 w-full h-full bg-white/5 border border-white/10 rounded-2xl -z-10 rotate-3"></div>
             <div className="absolute top-20 -right-16 w-full h-full bg-white/5 border border-white/10 rounded-2xl -z-20 rotate-6"></div>
          </div>
        </div>
      </section>

      {/* Why Choose Us & Map Concept */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl font-bold mb-4">The RentFlow Standard</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">Experience car rental without the friction. We've redesigned the entire process from the ground up to ensure total transparency and premium service.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-24">
          <div>
            <div className="w-12 h-12 bg-[#0F2D25] text-[#C9A35D] rounded-xl flex items-center justify-center text-xl mb-6 shadow-lg">✨</div>
            <h3 className="text-xl font-bold mb-3">Premium Fleet</h3>
            <p className="text-gray-600 leading-relaxed">Access thousands of quality vehicles, rigorously inspected and maintained to the highest standards.</p>
          </div>
          <div>
            <div className="w-12 h-12 bg-[#0F2D25] text-[#C9A35D] rounded-xl flex items-center justify-center text-xl mb-6 shadow-lg">💎</div>
            <h3 className="text-xl font-bold mb-3">Transparent Pricing</h3>
            <p className="text-gray-600 leading-relaxed">What you see is what you pay. Absolutely no hidden charges or unexpected fees at the counter.</p>
          </div>
          <div>
            <div className="w-12 h-12 bg-[#0F2D25] text-[#C9A35D] rounded-xl flex items-center justify-center text-xl mb-6 shadow-lg">⚡</div>
            <h3 className="text-xl font-bold mb-3">Instant Booking</h3>
            <p className="text-gray-600 leading-relaxed">Verify your identity once and book any vehicle within seconds using our streamlined digital process.</p>
          </div>
          <div>
            <div className="w-12 h-12 bg-[#0F2D25] text-[#C9A35D] rounded-xl flex items-center justify-center text-xl mb-6 shadow-lg">🗺️</div>
            <h3 className="text-xl font-bold mb-3">Nationwide Coverage</h3>
            <p className="text-gray-600 leading-relaxed">Available across South Africa with live inventory tracking and dynamic pricing heatmaps.</p>
          </div>
          <div>
            <div className="w-12 h-12 bg-[#0F2D25] text-[#C9A35D] rounded-xl flex items-center justify-center text-xl mb-6 shadow-lg">🛡️</div>
            <h3 className="text-xl font-bold mb-3">24/7 Support</h3>
            <p className="text-gray-600 leading-relaxed">Always available. Enjoy peace of mind with 24/7 roadside assistance included on premium bookings.</p>
          </div>
          <div>
            <div className="w-12 h-12 bg-[#0F2D25] text-[#C9A35D] rounded-xl flex items-center justify-center text-xl mb-6 shadow-lg">🔄</div>
            <h3 className="text-xl font-bold mb-3">Flexible Rentals</h3>
            <p className="text-gray-600 leading-relaxed">From daily errands to weekly road trips and multi-month corporate subscriptions.</p>
          </div>
        </div>

        {/* Interactive Map Concept Box */}
        <div className="w-full bg-[#0F2D25] rounded-3xl overflow-hidden relative min-h-[400px] flex items-center shadow-2xl">
           <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000" className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay grayscale" alt="Map"  referrerPolicy="no-referrer" />
           <div className="relative z-10 p-10 md:p-16 max-w-2xl bg-gradient-to-r from-[#0F2D25] to-transparent h-full flex flex-col justify-center">
             <span className="text-[#C9A35D] font-bold tracking-widest text-sm uppercase mb-4 block">Interactive Mapping</span>
             <h3 className="font-playfair text-4xl text-white font-bold mb-6">Find Your Vehicle Anywhere</h3>
             <p className="text-gray-300 text-lg mb-8">View vehicle availability by city, live inventory tracking, nearest pickup hubs, and real-time pricing heatmaps directly on our interactive map.</p>
             <button className="bg-white text-[#0F2D25] font-semibold px-8 py-3 rounded-lg w-max hover:bg-[#C9A35D] hover:text-white transition-colors">Explore Map</button>
           </div>
        </div>
      </section>

      {/* Meet Our Trusted Partners (from original data) */}
      <section className="py-20 px-6 md:px-12 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl font-bold mb-4">Our Verified Partners</h2>
            <p className="text-gray-500">We partner with the most trusted names in mobility across Southern Africa.</p>
          </div>
          
          <div className="flex overflow-x-auto gap-6 pb-8 hide-scrollbar snap-x">
             {carRentals.map((partner, i) => (
                <div key={i} className="min-w-[300px] md:min-w-[350px] bg-[#FAF8F5] border border-gray-100 rounded-2xl p-6 snap-center hover:shadow-lg transition-all text-left">
                   <h4 className="font-bold text-lg mb-2">{partner.name}</h4>
                   <p className="text-sm text-gray-500 mb-4 line-clamp-2">{partner.description}</p>
                   <div className="text-sm border-t border-gray-200 pt-4 space-y-2">
                     <p className="flex items-center gap-2"><span className="text-gray-400">📞</span> {partner.phone}</p>
                     <p className="flex items-center gap-2 truncate"><span className="text-gray-400">📍</span> {partner.address}</p>
                   </div>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* Corporate Rentals & Reviews Split */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
         <div>
            <span className="text-[#C9A35D] font-bold tracking-widest text-sm uppercase mb-4 block">Corporate Solutions</span>
            <h2 className="font-playfair text-4xl font-bold mb-6">Enterprise Fleet Management</h2>
            <p className="text-gray-600 text-lg mb-8">Streamline your company's mobility. Whether you need executive transport, monthly vehicle subscriptions, or comprehensive employee mobility programs, RentFlow delivers.</p>
            <ul className="space-y-4 mb-10">
              <li className="flex items-center gap-3 font-medium"><span className="text-[#1FA971]">✔</span> Centralized billing & reporting</li>
              <li className="flex items-center gap-3 font-medium"><span className="text-[#1FA971]">✔</span> Dedicated account management</li>
              <li className="flex items-center gap-3 font-medium"><span className="text-[#1FA971]">✔</span> Priority vehicle allocation</li>
            </ul>
            <button className="bg-[#0F2D25] text-white font-semibold px-8 py-3 rounded-lg hover:bg-opacity-90 transition-all shadow-xl">
              Request Enterprise Pricing
            </button>
         </div>

         <div className="space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 relative">
              <div className="text-[#C9A35D] text-4xl absolute -top-4 -left-2 opacity-50 font-serif">"</div>
              <div className="flex gap-1 text-[#C9A35D] mb-4">★★★★★</div>
              <p className="text-lg font-medium text-[#0F2D25] mb-6 relative z-10 leading-relaxed">The booking experience was completely seamless and the vehicle was immaculate. The digital contract save me 30 minutes at the counter.</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div>
                  <p className="font-bold text-sm">Sarah M.</p>
                  <p className="text-xs text-gray-500">Business Traveler</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 relative ml-0 md:ml-12">
              <div className="text-[#C9A35D] text-4xl absolute -top-4 -left-2 opacity-50 font-serif">"</div>
              <div className="flex gap-1 text-[#C9A35D] mb-4">★★★★★</div>
              <p className="text-lg font-medium text-[#0F2D25] mb-6 relative z-10 leading-relaxed">Best car rental platform in South Africa. The AI recommended a vehicle that was perfectly sized for our family's luggage.</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div>
                  <p className="font-bold text-sm">David K.</p>
                  <p className="text-xs text-gray-500">Family Holiday</p>
                </div>
              </div>
            </div>
         </div>
      </section>

      {/* Mobile App & Become a Partner */}
      <section className="bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row shadow-2xl rounded-3xl overflow-hidden translate-y-12 bg-[#0F2D25] text-white my-12 mx-6 md:mx-12">
          
          <div className="flex-1 p-12 md:p-16 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-center">
            <h3 className="font-playfair text-4xl font-bold mb-4">Rent Anywhere 📱</h3>
            <p className="text-gray-400 mb-8 max-w-sm">Book, unlock, extend, and manage rentals directly from your phone with the RentFlow App.</p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-black border border-gray-800 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-gray-900 transition-colors">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.26-.86 3.77-.73 1.25.1 2.3.69 2.94 1.63-2.61 1.55-2.16 5.16.51 6.22-.59 1.54-1.41 3.2-2.3 4.05zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
                <div className="text-left"><span className="text-xs block leading-none">Download on the</span><span className="font-bold block leading-none mt-1">App Store</span></div>
              </button>
              <button className="bg-black border border-gray-800 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-gray-900 transition-colors">
                <svg className="w-6 h-6 text-[#1FA971]" viewBox="0 0 24 24" fill="currentColor"><path d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15l13.62 9.01-13.62 9.19C3.34 21.61 3 21.09 3 20.5zm2.81-15.06v13.12L15.31 12 5.81 5.44z"/></svg>
                <div className="text-left"><span className="text-xs block leading-none">GET IT ON</span><span className="font-bold block leading-none mt-1">Google Play</span></div>
              </button>
            </div>
          </div>

          <div className="flex-1 p-12 md:p-16 flex flex-col justify-center bg-gradient-to-br from-[#0F2D25] to-[#163a31]">
            <span className="bg-[#C9A35D] text-[#0F2D25] text-xs font-bold px-3 py-1 rounded-full w-max mb-6">BECOME A PARTNER</span>
            <h3 className="font-playfair text-4xl font-bold mb-4 text-white">Earn From Your Fleet</h3>
            <p className="text-gray-300 mb-8 max-w-sm">List your vehicles and reach thousands of customers. Benefit from automated bookings, secure payments, and strict driver verification.</p>
            <button className="bg-white text-[#0F2D25] font-bold px-8 py-4 rounded-xl w-max hover:bg-gray-100 transition-colors shadow-xl">
              List Your Vehicle
            </button>
          </div>
          
        </div>
      </section>


      {isBookingOpen && <CarBookingFlow vehicles={bookingVehicles} initialVehicle={bookingVehicle} onClose={() => setIsBookingOpen(false)} />}
    </div>
  );
};

export default RentACarPage;

import React, { useState } from 'react';
import { 
  Plane, Shield, Award, ArrowRight, Calendar, DollarSign, Lock, 
  ChevronRight, CheckCircle2, Sparkles, Layers, Terminal, Server,
  AlertCircle, Check, Phone, Thermometer, Compass, Fuel, Gauge,
  Clock, MapPin, Users, X, Sliders, FileText
} from 'lucide-react';
import { AdminPortalModal } from './AdminPortalModal.tsx';

interface Aircraft {
  tail: string;
  model: string;
  category: string;
  range: string;
  speed: string;
  passengers: number;
  hourlyRate: number;
  homeBase: string;
  description: string;
  amenities: string[];
  img: string;
  gallery: string[];
}

const FLEET: Aircraft[] = [
  {
    tail: "N880GF",
    model: "Gulfstream G650ER Flagship",
    category: "Ultra-Long Range",
    range: "7,500 NM (Intercontinental)",
    speed: "Mach 0.925 (610 mph)",
    passengers: 16,
    hourlyRate: 11500,
    homeBase: "KTEB (Teterboro / NYC)",
    description: "The pinnacle of private sovereign travel. 4 distinct living zones, dedicated private stateroom with ensuite shower, and Ka-band ultra-high-speed satellite uplink.",
    amenities: ["Ensuite Master Shower", "Ka-Band Satellite WiFi", "100% Fresh Air Circulation", "Full Aft Galley with Convection Oven"],
    img: "https://images.unsplash.com/photo-1540962351504-03099e0a754b",
    gallery: [
      "https://images.unsplash.com/photo-1540962351504-03099e0a754b",
      "https://images.unsplash.com/photo-1583416750470-965b2707b355"
    ]
  },
  {
    tail: "N750CS",
    model: "Bombardier Global 7500",
    category: "Ultra-Long Range",
    range: "7,700 NM (Nonstop Lon-Tokyo)",
    speed: "Mach 0.90 (594 mph)",
    passengers: 14,
    hourlyRate: 12200,
    homeBase: "KVNY (Van Nuys / LA)",
    description: "Industry-leading range and smoothest ride in business aviation. Patented Nuage ergonomic seating, zero gravity positioning, and dedicated master suite.",
    amenities: ["Master Bedroom Suite", "Club Suite & Dining Conference", "Pũr Air System (HEPA Filter)", "Crew Rest Compartment"],
    img: "https://images.unsplash.com/photo-1519074069444-1ba4ea16e6f6",
    gallery: [
      "https://images.unsplash.com/photo-1519074069444-1ba4ea16e6f6",
      "https://images.unsplash.com/photo-1569154941061-e231b4725ef1"
    ]
  },
  {
    tail: "N350CL",
    model: "Bombardier Challenger 350",
    category: "Super-Midsize",
    range: "3,200 NM (Coast-to-Coast)",
    speed: "Mach 0.82 (541 mph)",
    passengers: 9,
    hourlyRate: 6800,
    homeBase: "KMIA (Miami Executive)",
    description: "The best-selling super-midsize business jet in the world. Flat floor cabin, quietest acoustic signature in its class, and seamless domestic transcontinental capability.",
    amenities: ["Flat Floor Stand-Up Cabin", "In-Flight Luggage Access", "Gogo AVANCE L5 High-Speed WiFi", "Fold-Out Executive Workstations"],
    img: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1",
    gallery: [
      "https://images.unsplash.com/photo-1569154941061-e231b4725ef1"
    ]
  },
  {
    tail: "N525CJ",
    model: "Cessna Citation CJ4 Gen2",
    category: "Light Jet",
    range: "2,165 NM (Regional Point-to-Point)",
    speed: "Mach 0.77 (519 mph)",
    passengers: 7,
    hourlyRate: 4200,
    homeBase: "KASE (Aspen Pitkin)",
    description: "Agile, luxury point-to-point regional charter engineered for high-altitude mountain runways and short field departures.",
    amenities: ["Deep Cushion Leather Club", "Wireless Cabin Management", "High-Elevation Runways Approved", "Refreshment Center"],
    img: "https://images.unsplash.com/photo-1583416750470-965b2707b355",
    gallery: [
      "https://images.unsplash.com/photo-1583416750470-965b2707b355"
    ]
  }
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedAircraft, setSelectedAircraft] = useState<Aircraft | null>(null);
  const [isManifestOpen, setIsManifestOpen] = useState(false);
  const [paxCount, setPaxCount] = useState(4);
  const [flightDate, setFlightDate] = useState('2026-10-15');
  const [routing, setRouting] = useState('KTEB → KMIA');
  const [booked, setBooked] = useState(false);

  const [isAdminOpen, setIsAdminOpen] = useState(
    typeof window !== 'undefined' && (
      window.location.search.includes('admin') || 
      window.location.pathname.endsWith('/admin') ||
      window.location.hash === '#admin'
    )
  );

  const filtered = FLEET.filter(a => 
    selectedCategory === 'ALL' || a.category === selectedCategory
  );

  const handleOpenManifest = (aircraft: Aircraft) => {
    setSelectedAircraft(aircraft);
    setIsManifestOpen(true);
    setBooked(false);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-zinc-100 flex flex-col font-sans selection:bg-amber-400 selection:text-black">
      {/* Top Telemetry Header */}
      <header className="border-b border-zinc-800 bg-[#0C0D10]/95 backdrop-blur-md px-6 py-4 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-30 font-mono text-sm">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
          <span className="font-serif tracking-widest text-white flex items-center gap-2 text-base font-bold">
            <Plane size={18} className="text-amber-400" /> AURA AERO // PRIVATE CHARTER TAIL SHOWCASE
          </span>
          <span className="text-zinc-600">|</span>
          <span className="text-zinc-400 font-semibold uppercase text-xs">ARCHETYPE B: ASYMMETRIC EDITORIAL</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-zinc-300">
            <Shield size={14} className="text-amber-400" />
            <span>ARG/US PLATINUM & WYVERN WINGMAN RATED</span>
          </div>
          <button 
            onClick={() => setIsAdminOpen(true)}
            className="px-3.5 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/40 rounded-lg text-xs font-mono font-bold transition-all"
          >
            [ DISPATCH RADAR PASS ]
          </button>
        </div>
      </header>

      {/* Editorial Hero Statement */}
      <section className="px-6 py-12 max-w-7xl mx-auto w-full">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400 bg-amber-950/40 border border-amber-500/30 px-3 py-1 rounded-full">
            VIP Aviation Atelier & Fleet Dispatch
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white font-serif leading-[1.1]">
            Sovereign Aviation. <br />
            <span className="text-zinc-400 italic font-light">Zero Compromise on Range or Security.</span>
          </h1>
          <p className="text-base sm:text-lg text-zinc-300 font-sans leading-relaxed">
            Curated access to verified Part 135 tail numbers. Fully managed private manifests, point-to-point intercontinental routings, and bespoke inflight culinary service.
          </p>
        </div>

        {/* Dynamic Category Filter Pills */}
        <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-zinc-800/80 font-mono text-xs">
          {['ALL', 'Ultra-Long Range', 'Super-Midsize', 'Light Jet'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full border transition-all ${
                selectedCategory === cat 
                  ? 'bg-amber-400 text-black border-amber-400 font-bold' 
                  : 'bg-zinc-900/60 border-zinc-800 text-zinc-300 hover:border-zinc-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Asymmetric Editorial Fleet Grid */}
      <section className="px-6 pb-20 max-w-7xl mx-auto w-full flex-1">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {filtered.map((aircraft, index) => {
            // Asymmetric layout span
            const isLarge = index % 3 === 0;
            const spanClass = isLarge ? 'md:col-span-8' : 'md:col-span-4';

            return (
              <div 
                key={aircraft.tail}
                className={`${spanClass} bg-[#111217] border border-zinc-800 rounded-2xl overflow-hidden group hover:border-amber-400/50 transition-all flex flex-col justify-between`}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img 
                    src={aircraft.img} 
                    alt={aircraft.model} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95 group-hover:brightness-100"
                  />
                  <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full font-mono text-xs font-bold text-amber-400 border border-white/10">
                    {aircraft.tail}
                  </div>
                  <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full font-mono text-xs font-bold text-zinc-200 border border-white/10">
                    {aircraft.homeBase}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <span className="text-xs font-mono uppercase text-amber-400 tracking-wider font-semibold">
                      {aircraft.category}
                    </span>
                    <h3 className="text-2xl font-black text-white font-serif mt-1">
                      {aircraft.model}
                    </h3>
                  </div>

                  <p className="text-sm text-zinc-300 font-sans leading-relaxed">
                    {aircraft.description}
                  </p>

                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-zinc-800/80 font-mono text-xs">
                    <div>
                      <span className="text-zinc-500 block text-[11px]">MAX RANGE</span>
                      <span className="text-white font-bold">{aircraft.range.split(' ')[0]} NM</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block text-[11px]">CRUISE SPEED</span>
                      <span className="text-white font-bold">{aircraft.speed.split(' ')[0]}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block text-[11px]">CAPACITY</span>
                      <span className="text-white font-bold">{aircraft.passengers} Pax</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <div>
                      <span className="text-xs font-mono text-zinc-400 block">EST. CHARTER RATE</span>
                      <span className="text-2xl font-black text-amber-400 font-mono">
                        ${aircraft.hourlyRate.toLocaleString()} <span className="text-xs text-zinc-400 font-normal">/ hour</span>
                      </span>
                    </div>

                    <button
                      onClick={() => handleOpenManifest(aircraft)}
                      className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-black font-mono font-black text-xs rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-amber-400/20 cursor-pointer min-h-[44px]"
                    >
                      <span>BOOK MANIFEST</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Slide-over Passenger Manifest & Flight Commission Sheet */}
      {isManifestOpen && selectedAircraft && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-[#0F1015] border-l border-zinc-800 p-8 overflow-y-auto flex flex-col justify-between font-sans shadow-2xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <Plane size={20} className="text-amber-400" />
                  <span className="font-mono text-sm font-bold text-white uppercase tracking-wider">Flight Commission Sheet</span>
                </div>
                <button 
                  onClick={() => setIsManifestOpen(false)}
                  className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800"
                >
                  <X size={20} />
                </button>
              </div>

              <div>
                <img 
                  src={selectedAircraft.img} 
                  alt={selectedAircraft.model} 
                  className="w-full h-44 object-cover rounded-xl border border-zinc-800"
                />
                <div className="mt-3 flex justify-between items-center text-xs font-mono text-amber-400">
                  <span>TAIL: {selectedAircraft.tail}</span>
                  <span>BASE: {selectedAircraft.homeBase}</span>
                </div>
                <h2 className="text-2xl font-black text-white font-serif mt-1">{selectedAircraft.model}</h2>
              </div>

              {/* Inflight Amenities */}
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold">Standard Inflight Inclusions</span>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  {selectedAircraft.amenities.map(amenity => (
                    <div key={amenity} className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-300 flex items-center gap-1.5">
                      <Check size={14} className="text-amber-400 shrink-0" />
                      <span className="truncate">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Commission Form Inputs */}
              <div className="space-y-4 pt-2 font-mono text-xs">
                <div className="space-y-1.5">
                  <label className="text-zinc-400 uppercase font-bold">City-Pair Routing (ICAO / IATA)</label>
                  <input 
                    type="text"
                    value={routing}
                    onChange={e => setRouting(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-3 text-white font-mono text-sm focus:border-amber-400 outline-none min-h-[44px]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-zinc-400 uppercase font-bold">Target Departure Date</label>
                    <input 
                      type="date"
                      value={flightDate}
                      onChange={e => setFlightDate(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-3 text-white font-mono text-sm focus:border-amber-400 outline-none min-h-[44px]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-zinc-400 uppercase font-bold">Passenger Count</label>
                    <input 
                      type="number"
                      min="1"
                      max={selectedAircraft.passengers}
                      value={paxCount}
                      onChange={e => setPaxCount(Number(e.target.value))}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-3 text-white font-mono text-sm focus:border-amber-400 outline-none min-h-[44px]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Booking Action */}
            <div className="pt-6 border-t border-zinc-800 space-y-3 font-mono">
              {booked ? (
                <div className="p-4 bg-emerald-500/20 border border-emerald-500 text-emerald-400 rounded-xl text-center text-xs font-bold space-y-1">
                  <div>✓ CHARTER MANIFEST DISPATCHED</div>
                  <div className="text-[11px] text-zinc-300">Operations desk verifying runway slot and FBO gate pass.</div>
                </div>
              ) : (
                <button
                  onClick={() => setBooked(true)}
                  className="w-full py-4 bg-amber-400 hover:bg-amber-300 text-black font-black text-sm rounded-xl transition-all shadow-xl shadow-amber-400/20 cursor-pointer min-h-[44px]"
                >
                  DISPATCH ESCROW & SECURE TAIL NUMBER
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <AdminPortalModal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </div>
  );
}

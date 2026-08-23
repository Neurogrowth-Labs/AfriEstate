
import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import type { SearchFilters } from '../types';

const FadeInSection: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              setVisible(true);
          }
      });
    });
    
    if (domRef.current) {
        observer.observe(domRef.current);
    }
    return () => {
        if (domRef.current) observer.unobserve(domRef.current);
    }
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

interface HeroProps {
    onSearch: (query: string) => void;
    isSearchingAI: boolean;
    filters: SearchFilters;
    onFilterChange: (key: keyof SearchFilters, value: any) => void;
}

const Hero: React.FC<HeroProps> = (props) => {
  return (
    <section className="relative min-h-[540px] h-[62vh] flex items-center justify-center text-center overflow-hidden font-sans">
      <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2500&q=80" 
            alt="Luxury Property Background" 
            className="w-full h-full object-cover transform scale-105 animate-slow-zoom"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-slate-950/65"></div>
          <div className="absolute inset-0 bg-brand-primary/15 mix-blend-multiply"></div>
      </div>
      
      <div className="relative z-10 px-5 w-full max-w-6xl mx-auto pt-20">
        <FadeInSection>
            <span className="inline-block py-1 px-3 rounded-full bg-white/15 text-white backdrop-blur-sm text-xs font-semibold tracking-[0.16em] uppercase mb-4">
                Bloomberg meets African luxury real estate
            </span>
            <h1 
              className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 tracking-tight text-white font-heading drop-shadow-2xl"
            >
              African property intelligence, built for private-market decisions.
            </h1>
        </FadeInSection>
        
        <FadeInSection delay={200}>
            <p 
              className="text-base md:text-lg mb-7 max-w-2xl mx-auto font-medium leading-relaxed text-white/90 drop-shadow-lg"
            >
              Discover premium listings, investment analytics, and market intelligence across Africa in one institutional-grade marketplace.
            </p>
        </FadeInSection>

        <FadeInSection delay={400}>
            <div className="max-w-5xl mx-auto">
              <SearchBar {...props} />
            </div>
            
            <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-4">
                <div className="text-white text-xs opacity-80 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse"></span>
                    Popular: Cape Town · Johannesburg · Lagos · Nairobi · Accra · Luanda
                </div>
            </div>
        </FadeInSection>
      </div>

      <style>{`
        @keyframes slowZoom {
            from { transform: scale(1.0); }
            to { transform: scale(1.1); }
        }
        .animate-slow-zoom {
            animation: slowZoom 20s ease-in-out infinite alternate;
        }
      `}</style>
    </section>
  );
};

export default Hero;

import React, { useEffect, useState } from 'react';
import HeroSection from '../components/home/HeroSection';
import ProgrammeCard from '../components/ui/ProgrammeCard';
import ParoisseCard from '../components/ui/ParoisseCard';
import MobileAppSection from '../components/home/MobileAppSection';
import { usePublicApi, type Paroisse, type Programme } from '../hooks/usePublicApi';
import { useGeolocation } from '../hooks/useGeolocation';
import { MapPin } from 'lucide-react';
import { motion } from 'motion/react';

export default function Home() {
  const { getParoisses, getProgrammes } = usePublicApi();
  const { location, loading: geoLoading, getLocation } = useGeolocation();

  const [paroisses, setParoisses] = useState<Paroisse[]>([]);
  const [programmes, setProgrammes] = useState<Programme[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [pData, prData] = await Promise.all([
        getParoisses(location || undefined),
        getProgrammes(location || undefined, 20),
      ]);
      setParoisses(pData);
      setProgrammes(prData);
    } catch (err) {
      console.error('Fetch error', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [location]);

  return (
    <div className="flex-grow">
      <HeroSection />

      {/* Geolocation Banner */}
      {!location && (
        <div className="bg-[#F2EDE3] border-b border-[#DDD5C0]">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div
              className="flex items-center gap-3 text-[#6B6454] text-[15px]"
              style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
            >
              <MapPin className="w-4 h-4 text-[#C9A84C]" />
              <span>Activez votre localisation pour voir les paroisses proches de vous.</span>
            </div>
            <button
              onClick={getLocation}
              disabled={geoLoading}
              className="text-[14px] px-5 py-2 border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#1A1A2E] transition-all"
              style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontWeight: 600 }}
            >
              Activer la localisation
            </button>
          </div>
        </div>
      )}

      {/* Programmes Section */}
      <section className="py-16 px-6 lg:px-10 bg-[#FAF8F3]">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-[1px] w-8 bg-[#C9A84C]" />
                <span
                  className="text-[#C9A84C] text-[11px] tracking-[0.2em] uppercase"
                  style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontWeight: 600 }}
                >
                  Aujourd'hui à proximité
                </span>
              </div>
              <h2
                className="text-[#1A1A2E]"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: '1.9rem',
                  fontWeight: 700,
                  lineHeight: 1.2,
                }}
              >
                Messes & Programmes du jour
              </h2>
              <p
                className="text-[#6B6454] mt-2 text-[15px]"
                style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
              >
                {location ? 'Basé sur votre position · rayon 20km' : 'Veuillez activer la localisation'}
              </p>
            </div>
            <span
              className="text-[14px] text-[#6B6454] italic"
              style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
            >
              Dimanche 22 octobre 2023
            </span>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-48 bg-[#F2EDE3] animate-pulse" style={{ borderRadius: '2px' }} />
              ))}
            </div>
          ) : programmes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {programmes.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <ProgrammeCard programme={p} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div
              className="py-14 text-center border border-dashed border-[#DDD5C0] text-[#6B6454] italic text-lg"
              style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
            >
              Aucun programme trouvé dans un rayon de 20km.
            </div>
          )}
        </div>
      </section>

      {/* Ornamental divider */}
      <div className="max-w-3xl mx-auto px-6">
        <div className="flex items-center gap-5">
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#DDD5C0]" />
          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 opacity-30">
            <rect x="11" y="2" width="2" height="20" rx="1" fill="#C9A84C"/>
            <rect x="3" y="9" width="18" height="2" rx="1" fill="#C9A84C"/>
            <circle cx="12" cy="10" r="2.5" fill="#FAF8F3" stroke="#C9A84C" strokeWidth="1.5"/>
          </svg>
          <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#DDD5C0]" />
        </div>
      </div>

      {/* Featured Paroisses */}
      <section className="py-16 px-6 lg:px-10 bg-[#F2EDE3]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-[1px] w-12 bg-[#C9A84C] opacity-60" />
              <span
                className="text-[#C9A84C] text-[11px] tracking-[0.2em] uppercase"
                style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontWeight: 600 }}
              >
                Communautés
              </span>
              <div className="h-[1px] w-12 bg-[#C9A84C] opacity-60" />
            </div>
            <h2
              className="text-[#1A1A2E]"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '1.9rem',
                fontWeight: 700,
              }}
            >
              Paroisses {location && 'les plus proches'}
            </h2>
            <p
              className="text-[#6B6454] mt-2 text-[16px]"
              style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
            >
              Découvrez nos communautés et rejoignez-les.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {paroisses.slice(0, 4).map((paroisse, i) => (
              <motion.div
                key={paroisse.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <ParoisseCard paroisse={paroisse} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <MobileAppSection />
    </div>
  );
}

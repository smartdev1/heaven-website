import React, { useEffect, useState } from 'react';
import HeroSection from '../components/home/HeroSection';
import ProgrammeCard from '../components/ui/ProgrammeCard';
import ParoisseCard from '../components/ui/ParoisseCard';
import MobileAppSection from '../components/home/MobileAppSection';
import { usePublicApi, type Paroisse, type Programme } from '../hooks/usePublicApi';
import { useGeolocation } from '../hooks/useGeolocation';
import { Calendar, Crosshair, Map, MapPin } from 'lucide-react';
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
        getProgrammes(location || undefined, 20) // Radius 20km
      ]);
      setParoisses(pData);
      setProgrammes(prData);
    } catch (err) {
      console.error("Fetch error", err);
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
          <section className="bg-amber-50 border-b border-amber-100 py-4">
            <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-3 text-amber-700 text-sm font-medium">
                <MapPin className="w-5 h-5" />
                <span>Localisation désactivée ? Sélectionnez manuellement votre ville pour voir les résultats proches.</span>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={getLocation}
                  disabled={geoLoading}
                  className="px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg"
                >
                  Réessayer
                </button>
              </div>
            </div>
          </section>
        )}

      {/* Programs Section */}
      <section className="py-8 px-6 lg:px-10 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-xl font-bold text-text-main">Aujourd'hui à proximité (20km)</h2>
            <p className="text-text-muted text-[13px]">{location ? "Basé sur votre position actuelle" : "Veuillez activer la localisation pour plus de précision"}</p>
          </div>
          <span className="text-[13px] font-medium text-text-muted">Dimanche, 22 Octobre 2023</span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-48 bg-slate-100 animate-pulse rounded-xl" />
            ))}
          </div>
        ) : programmes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {programmes.map((p) => (
              <motion.div key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <ProgrammeCard programme={p} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center bg-white border border-dashed border-border rounded-xl">
             <p className="text-text-muted italic">Aucun programme trouvé dans un rayon de 20km.</p>
          </div>
        )}
      </section>

      {/* Featured Paroisses */}
      <section className="py-16 px-6 lg:px-10 bg-bg-light border-y border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-text-main mb-2">Paroisses {location && "les plus proches"}</h2>
            <p className="text-text-muted text-sm">Découvrez nos communautés dynamiques.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {paroisses.slice(0, 4).map((paroisse) => (
              <div key={paroisse.id}>
                <ParoisseCard paroisse={paroisse} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile App Section */}
      <MobileAppSection />
    </div>
  );
}

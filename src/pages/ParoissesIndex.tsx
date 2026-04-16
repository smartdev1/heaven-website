import React, { useEffect, useState } from 'react';
import { usePublicApi, type Paroisse } from '../hooks/usePublicApi';
import { useGeolocation } from '../hooks/useGeolocation';
import ParoisseCard from '../components/ui/ParoisseCard';
import { Search, MapPin, SlidersHorizontal } from 'lucide-react';
import { motion } from 'motion/react';

export default function ParoissesIndex() {
  const { getParoisses } = usePublicApi();
  const { location } = useGeolocation();
  const [paroisses, setParoisses] = useState<Paroisse[]>([]);
  const [filtered, setFiltered] = useState<Paroisse[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const data = await getParoisses(location || undefined);
      setParoisses(data);
      setFiltered(data);
      setLoading(false);
    };
    fetch();
  }, [location]);

  useEffect(() => {
    const res = paroisses.filter(p => 
      p.name.toLowerCase().includes(search.toLowerCase()) || 
      p.city.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(res);
  }, [search, paroisses]);

  return (
    <div className="bg-bg-light min-h-screen">
      <div className="bg-white border-b border-border py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <h1 className="text-3xl font-extrabold text-primary mb-4 tracking-tight">Toutes les Paroisses</h1>
          <p className="text-text-muted max-w-2xl mb-8">Recherchez par nom, ville ou laissez-nous utiliser votre position pour trouver l'église la plus proche.</p>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input 
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Ex: Notre-Dame, Paris, 6è..."
                className="w-full pl-11 pr-4 py-3 bg-bg-light border border-border rounded-xl text-sm focus:border-primary-light outline-none transition-all"
              />
            </div>
            <button className="flex items-center gap-2 px-6 py-3 border border-border rounded-xl text-sm font-bold text-text-main hover:bg-bg-light transition-all">
              <SlidersHorizontal className="w-4 h-4" />
              Plus de filtres
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => <div key={i} className="h-64 bg-white animate-pulse rounded-xl" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map(p => (
              <motion.div key={p.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                <ParoisseCard paroisse={p} />
                {p.distance && (
                  <div className="mt-2 text-[11px] font-bold text-primary-light flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    À {p.distance.toFixed(1)} km de vous
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="py-20 text-center text-text-muted italic">
            Aucun résultat correspondant à votre recherche.
          </div>
        )}
      </div>
    </div>
  );
}

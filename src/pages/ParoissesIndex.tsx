import React, { useEffect, useState } from 'react';
import { usePublicApi, type Paroisse } from '../hooks/usePublicApi';
import { useGeolocation } from '../hooks/useGeolocation';
import ParoisseCard from '../components/ui/ParoisseCard';
import { Search, SlidersHorizontal, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

export default function ParoissesIndex() {
  const { getParoisses } = usePublicApi();
  const { location } = useGeolocation();
  const [paroisses, setParoisses] = useState<Paroisse[]>([]);
  const [filtered, setFiltered] = useState<Paroisse[]>([]);
  const [search, setSearch] = useState('');
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
    const res = paroisses.filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.city.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(res);
  }, [search, paroisses]);

  return (
    <div className="bg-[#FAF8F3] min-h-screen">
      {/* Page header */}
      <div className="bg-[#1A1A2E] relative overflow-hidden">
        {/* Vitrail pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23C9A84C' stroke-width='0.6' opacity='0.08'%3E%3Cpolygon points='40,4 76,24 76,56 40,76 4,56 4,24'/%3E%3Cpolygon points='40,16 64,30 64,50 40,64 16,50 16,30'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-16">
          {/* Label */}
          <div className="flex items-center gap-3 mb-4">
            <div className="h-[1px] w-8 bg-[#C9A84C] opacity-70" />
            <span
              className="text-[#C9A84C] text-[11px] tracking-[0.2em] uppercase"
              style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontWeight: 600 }}
            >
              Annuaire
            </span>
          </div>

          <h1
            className="text-white mb-3"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(2rem, 4vw, 2.8rem)',
              fontWeight: 700,
              lineHeight: 1.15,
            }}
          >
            Toutes les Paroisses
          </h1>
          <p
            className="text-[#B8B0A0] mb-10 max-w-xl text-[16px]"
            style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontWeight: 300 }}
          >
            Recherchez par nom, ville ou laissez-nous utiliser votre position
            pour trouver l'église la plus proche.
          </p>

          {/* Search bar */}
          <div className="flex flex-col md:flex-row gap-3 max-w-2xl">
            <div
              className="flex-grow flex items-center gap-3 px-5 bg-white/5 border border-[#C9A84C]/30 backdrop-blur-sm"
              style={{ borderRadius: '1px' }}
            >
              <Search className="w-4 h-4 text-[#C9A84C] opacity-60 shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Ex: Notre-Dame, Paris, 6è..."
                className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-[#6B6454] py-3.5 text-[15px]"
                style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
              />
            </div>
            <button
              className="flex items-center justify-center gap-2 px-5 py-3.5 border border-[#C9A84C]/40 text-[#C9A84C] text-[14px] hover:border-[#C9A84C] hover:bg-[#C9A84C]/5 transition-all"
              style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontWeight: 600 }}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filtres
            </button>
          </div>
        </div>
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#FAF8F3] to-transparent" />
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
        {/* Count */}
        {!loading && (
          <p
            className="text-[#6B6454] text-[14px] mb-8 italic"
            style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
          >
            {filtered.length} paroisse{filtered.length !== 1 ? 's' : ''} trouvée{filtered.length !== 1 ? 's' : ''}
          </p>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-64 bg-[#F2EDE3] animate-pulse" style={{ borderRadius: '2px' }} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <ParoisseCard paroisse={p} />
                {p.distance && (
                  <div
                    className="mt-2 flex items-center gap-1.5 text-[12px] text-[#C9A84C]"
                    style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontWeight: 600 }}
                  >
                    <MapPin className="w-3 h-3" />À {p.distance.toFixed(1)} km
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div
            className="py-20 text-center text-[#6B6454] italic text-lg border border-dashed border-[#DDD5C0]"
            style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
          >
            Aucun résultat pour cette recherche.
          </div>
        )}
      </div>
    </div>
  );
}

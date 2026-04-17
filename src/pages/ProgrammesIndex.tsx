import React, { useEffect, useState } from 'react';
import { usePublicApi, type Programme, type Paroisse } from '../hooks/usePublicApi';
import { useGeolocation } from '../hooks/useGeolocation';
import ProgrammeCard from '../components/ui/ProgrammeCard';
import { MapPin } from 'lucide-react';
import { motion } from 'motion/react';

export default function ProgrammesIndex() {
  const { getProgrammes, getParoisses } = usePublicApi();
  const { location } = useGeolocation();

  const [programmes, setProgrammes] = useState<Programme[]>([]);
  const [paroisses, setParoisses] = useState<Paroisse[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState('2023-10-22');
  const [selectedParoisse, setSelectedParoisse] = useState('all');
  const [activeTab, setActiveTab] = useState('Tous');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const [progData, parisData] = await Promise.all([
        getProgrammes(location || undefined, 20, selectedDate, selectedParoisse),
        getParoisses(),
      ]);
      setProgrammes(progData);
      setParoisses(parisData);
      setLoading(false);
    };
    fetch();
  }, [location, selectedDate, selectedParoisse]);

  const tabs = ['Tous', 'Messe', 'Événement', 'Annonce'];

  return (
    <div className="bg-[#FAF8F3] min-h-screen">
      {/* Header */}
      <div className="bg-[#1A1A2E] relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23C9A84C' stroke-width='0.6' opacity='0.08'%3E%3Cpolygon points='40,4 76,24 76,56 40,76 4,56 4,24'/%3E%3Cpolygon points='40,16 64,30 64,50 40,64 16,50 16,30'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-14">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-[1px] w-8 bg-[#C9A84C] opacity-70" />
                <span
                  className="text-[#C9A84C] text-[11px] tracking-[0.2em] uppercase"
                  style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontWeight: 600 }}
                >
                  Agenda
                </span>
              </div>
              <h1
                className="text-white mb-2"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                  fontWeight: 700,
                  lineHeight: 1.15,
                }}
              >
                Programmes & Messes
              </h1>
              <p
                className="text-[#B8B0A0] text-[16px] max-w-xl"
                style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontWeight: 300 }}
              >
                L'agenda complet de vos paroisses. Filtrez par date ou paroisse.
              </p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-end gap-5">
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-[10px] tracking-[0.15em] uppercase text-[#6B6454]"
                  style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontWeight: 600 }}
                >
                  Paroisse
                </label>
                <select
                  value={selectedParoisse}
                  onChange={(e) => setSelectedParoisse(e.target.value)}
                  className="px-4 py-2.5 border border-[#C9A84C]/30 bg-white/5 text-white text-[14px] focus:ring-0 outline-none min-w-[180px] appearance-none cursor-pointer hover:border-[#C9A84C]/60 transition-colors"
                  style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
                >
                  <option value="all" className="bg-[#1A1A2E]">Toutes les paroisses</option>
                  {paroisses.map((p) => (
                    <option key={p.id} value={p.id} className="bg-[#1A1A2E]">
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-[10px] tracking-[0.15em] uppercase text-[#6B6454]"
                  style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontWeight: 600 }}
                >
                  Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-4 py-2.5 border border-[#C9A84C]/30 bg-white/5 text-white text-[14px] focus:ring-0 outline-none hover:border-[#C9A84C]/60 transition-colors"
                  style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#FAF8F3] to-transparent" />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
        {/* Tab + view controls */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
          {/* Tabs */}
          <div className="flex items-center gap-1 bg-[#F2EDE3] p-1" style={{ borderRadius: '2px' }}>
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-4 py-2 text-[13px] transition-all"
                style={{
                  fontFamily: "'Crimson Pro', Georgia, serif",
                  fontWeight: activeTab === tab ? 600 : 400,
                  color: activeTab === tab ? '#1A1A2E' : '#6B6454',
                  background: activeTab === tab ? '#FEFCF7' : 'transparent',
                  borderRadius: '1px',
                  boxShadow: activeTab === tab ? '0 1px 6px rgba(26,26,46,0.08)' : 'none',
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* View mode */}
          <div className="flex items-center gap-1 border border-[#DDD5C0] bg-[#FEFCF7] p-1" style={{ borderRadius: '2px' }}>
            {(['list', 'map'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className="px-4 py-1.5 text-[13px] transition-all capitalize"
                style={{
                  fontFamily: "'Crimson Pro', Georgia, serif",
                  fontWeight: viewMode === mode ? 600 : 400,
                  color: viewMode === mode ? '#FEFCF7' : '#6B6454',
                  background: viewMode === mode ? '#1A1A2E' : 'transparent',
                  borderRadius: '1px',
                }}
              >
                {mode === 'list' ? 'Liste' : 'Carte'}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-48 bg-[#F2EDE3] animate-pulse" style={{ borderRadius: '2px' }} />
            ))}
          </div>
        ) : viewMode === 'list' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {programmes
              .filter((p) => activeTab === 'Tous' || p.type.toLowerCase() === activeTab.toLowerCase())
              .map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <ProgrammeCard programme={p} />
                </motion.div>
              ))}
          </div>
        ) : (
          /* Map View */
          <div
            className="border border-[#DDD5C0] h-[600px] relative overflow-hidden"
            style={{ background: '#1A1A2E' }}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23C9A84C' stroke-width='0.6' opacity='0.08'%3E%3Cpolygon points='40,4 76,24 76,56 40,76 4,56 4,24'/%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
            <div className="absolute inset-0 p-10">
              <div className="relative w-full h-full">
                {paroisses.map((p, idx) => (
                  <motion.div
                    key={p.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    style={{
                      position: 'absolute',
                      left: `${(p.lng - 2.1) * 400 + 40}%`,
                      top: `${(48.9 - p.lat) * 600 + 20}%`,
                    }}
                    className="group"
                  >
                    <div className="relative cursor-pointer">
                      <div
                        className="w-9 h-9 flex items-center justify-center group-hover:scale-110 transition-all"
                        style={{ background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.5)' }}
                      >
                        <MapPin className="w-4 h-4 text-[#C9A84C]" />
                      </div>
                      <div
                        className="absolute top-11 left-1/2 -translate-x-1/2 px-3 py-1.5 text-[11px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-[#C9A84C]/30"
                        style={{
                          background: 'rgba(10,10,20,0.9)',
                          color: '#FEFCF7',
                          fontFamily: "'Crimson Pro', Georgia, serif",
                        }}
                      >
                        {p.name}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div
              className="absolute bottom-5 right-5 p-5 border border-[#C9A84C]/20"
              style={{ background: 'rgba(10,10,20,0.85)', backdropFilter: 'blur(8px)', maxWidth: '240px' }}
            >
              <h4
                className="font-semibold text-white mb-1"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '0.95rem' }}
              >
                Carte des paroisses
              </h4>
              <p
                className="text-[12px] text-[#B8B0A0] italic"
                style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
              >
                Visualisation des églises actives sur Heaven.
              </p>
            </div>
          </div>
        )}

        {!loading && programmes.length === 0 && viewMode === 'list' && (
          <div
            className="py-20 text-center text-[#6B6454] italic text-lg border border-dashed border-[#DDD5C0]"
            style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
          >
            Aucun programme pour cette sélection.
          </div>
        )}
      </div>
    </div>
  );
}

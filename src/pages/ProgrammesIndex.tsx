import React, { useEffect, useState } from 'react';
import { usePublicApi, type Programme, type Paroisse } from '../hooks/usePublicApi';
import { useGeolocation } from '../hooks/useGeolocation';
import ProgrammeCard from '../components/ui/ProgrammeCard';
import { Calendar, Search, Filter, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

export default function ProgrammesIndex() {
  const { getProgrammes, getParoisses } = usePublicApi();
  const { location } = useGeolocation();
  
  const [programmes, setProgrammes] = useState<Programme[]>([]);
  const [paroisses, setParoisses] = useState<Paroisse[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("2023-10-22"); 
  const [selectedParoisse, setSelectedParoisse] = useState('all');
  const [activeTab, setActiveTab] = useState('Tous');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const [progData, parisData] = await Promise.all([
        getProgrammes(location || undefined, 20, selectedDate, selectedParoisse),
        getParoisses()
      ]);
      setProgrammes(progData);
      setParoisses(parisData);
      setLoading(false);
    };
    fetch();
  }, [location, selectedDate, selectedParoisse]);

  return (
    <div className="bg-bg-light min-h-screen">
       <div className="bg-white border-b border-border py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <h1 className="text-3xl font-extrabold text-primary mb-2 tracking-tight">Programmes & Messes</h1>
              <p className="text-text-muted max-w-2xl">L'agenda complet de vos paroisses. Filtrez par date ou par paroisse spécifique.</p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
               <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider px-1">Paroisse</label>
                <select 
                  value={selectedParoisse}
                  onChange={(e) => setSelectedParoisse(e.target.value)}
                  className="px-4 py-2 border border-border rounded-lg text-sm font-bold text-text-main focus:ring-primary-light outline-none bg-white min-w-[180px]"
                >
                  <option value="all">Toutes les paroisses</option>
                  {paroisses.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
               </div>
               <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider px-1">Date</label>
                <input 
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-4 py-2 border border-border rounded-lg text-sm font-bold text-text-main focus:ring-primary-light outline-none"
                />
               </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
        <div className="flex justify-between items-center mb-8 gap-4 overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex items-center gap-4">
            {['Tous', 'Messe', 'Événement', 'Annonce'].map((tab) => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all border ${activeTab === tab ? 'bg-primary-light text-white border-primary-light shadow-md' : 'bg-white text-text-muted border-border hover:border-primary-light'}`}>
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center bg-white border border-border rounded-xl p-1 shadow-sm shrink-0">
            <button 
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === 'list' ? 'bg-primary text-white shadow-sm' : 'text-text-muted hover:bg-slate-50'}`}
            >
              Liste
            </button>
            <button 
              onClick={() => setViewMode('map')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === 'map' ? 'bg-primary text-white shadow-sm' : 'text-text-muted hover:bg-slate-50'}`}
            >
              Carte
            </button>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-48 bg-white animate-pulse rounded-xl" />)}
          </div>
        ) : viewMode === 'list' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programmes
              .filter(p => activeTab === 'Tous' || p.type.toLowerCase() === activeTab.toLowerCase())
              .map(p => (
                <div key={p.id}>
                  <ProgrammeCard programme={p} />
                </div>
              ))}
          </div>
        ) : (
          /* Map View Placeholder */
          <div className="bg-white border border-border rounded-3xl h-[600px] relative overflow-hidden shadow-sm">
            {/* Simple Map Grid Background */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #2563EB 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            
            <div className="absolute inset-0 p-10">
              <div className="relative w-full h-full">
                {paroisses.map((p, idx) => (
                  <motion.div 
                    key={p.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    style={{ 
                      position: 'absolute', 
                      left: `${(p.lng - 2.1) * 400 + 40}%`, 
                      top: `${(48.9 - p.lat) * 600 + 20}%` 
                    }}
                    className="group"
                  >
                    <div className="relative cursor-pointer">
                      <div className="w-10 h-10 bg-primary border-4 border-white rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-primary-light transition-all">
                        <MapPin className="w-5 h-5 text-white" />
                      </div>
                      <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-white px-3 py-1 border border-border rounded-lg shadow-lg text-[11px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                        {p.name}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md border border-border p-4 rounded-2xl shadow-xl max-w-xs">
              <h4 className="font-bold text-text-main text-sm mb-1">Carte des paroisses</h4>
              <p className="text-xs text-text-muted italic">Visualisation géographique simplifiée des églises actives sur Heaven.</p>
            </div>
          </div>
        )}

        {!loading && programmes.length === 0 && viewMode === 'list' && (
          <div className="py-20 text-center text-text-muted italic bg-white border border-dashed border-border rounded-xl">
            Aucun programme prévu pour cette sélection.
          </div>
        )}
      </div>
    </div>
  );
}

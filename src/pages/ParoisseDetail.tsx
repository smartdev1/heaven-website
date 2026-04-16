import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePublicApi, type Paroisse, type Programme } from '../hooks/usePublicApi';
import { MapPin, Calendar, Clock, ArrowLeft, Landmark, Share2 } from 'lucide-react';
import { motion } from 'motion/react';
import ProgrammeCard from '../components/ui/ProgrammeCard';

export default function ParoisseDetail() {
  const { slug } = useParams();
  const { getParoisseBySlug, getProgrammesByParoisse } = usePublicApi();
  
  const [paroisse, setParoisse] = useState<Paroisse | null>(null);
  const [programmes, setProgrammes] = useState<Programme[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      if (!slug) return;
      const p = await getParoisseBySlug(slug);
      if (p) {
        setParoisse(p);
        const progs = await getProgrammesByParoisse(p.id);
        setProgrammes(progs);
      }
      setLoading(false);
    };
    fetch();
  }, [slug]);

  if (loading) return <div className="p-20 text-center">Chargement...</div>;
  if (!paroisse) return <div className="p-20 text-center">Paroisse non trouvée.</div>;

  return (
    <div className="bg-bg-light min-h-screen pb-20">
      {/* Hero Banner */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img 
          src={paroisse.image} 
          alt={paroisse.name}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
        <div className="absolute top-6 left-6 lg:left-10">
          <Link to="/paroisses" className="flex items-center gap-2 text-white font-bold bg-black/20 backdrop-blur-md px-4 py-2 rounded-lg hover:bg-black/40 transition-all">
            <ArrowLeft className="w-5 h-5" />
            Retour
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 -mt-16 relative z-10">
        <div className="bg-white rounded-[24px] shadow-xl p-8 border border-border">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div>
              <div className="flex items-center gap-2 text-accent font-bold mb-2">
                <Landmark className="w-6 h-6" />
                <span>Paroisse Catholique</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-text-main tracking-tight mb-2">
                {paroisse.name}
              </h1>
              <div className="flex items-center gap-1.5 text-text-muted">
                <MapPin className="w-5 h-5" />
                <span className="text-lg">{paroisse.city} {paroisse.district ? `• ${paroisse.district}` : ''}</span>
              </div>
            </div>
            <div className="flex gap-4">
               <button className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-all shadow-md">
                S'abonner aux alertes
              </button>
              <button className="p-3 border border-border rounded-xl text-text-muted hover:text-primary transition-all">
                <Share2 className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Weekly Programs */}
        <section className="mt-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-text-main flex items-center gap-3">
              <Calendar className="w-7 h-7 text-primary-light" />
              Programme de la semaine
            </h2>
            <div className="text-sm font-bold text-text-muted bg-white px-4 py-2 rounded-full border border-border">
              Du 22 Oct. au 28 Oct.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programmes.length > 0 ? (
              programmes.map((p) => (
                <div key={p.id}>
                  <ProgrammeCard programme={p} />
                </div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center bg-white border border-dashed border-border rounded-2xl text-text-muted italic text-lg">
                Aucun programme renseigné pour cette semaine.
              </div>
            )}
          </div>
        </section>

        {/* Info Blocks */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-border shadow-sm">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Clock className="w-6 h-6 text-accent" />
              Secrétariat
            </h3>
            <ul className="space-y-3 text-text-main">
              <li className="flex justify-between border-b border-slate-50 pb-2">
                <span className="text-text-muted">Lun - Ven</span>
                <span className="font-bold">09:00 - 12:00</span>
              </li>
              <li className="flex justify-between border-b border-slate-50 pb-2">
                <span className="text-text-muted">Samedi</span>
                <span className="font-bold">10:00 - 12:00</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-border shadow-sm flex flex-col justify-center text-center">
            <h3 className="text-xl font-bold mb-4">Contact direct</h3>
            <p className="text-text-muted mb-6">Besoin d'un renseignement pour un baptême ou mariage ?</p>
            <button className="w-full py-4 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition-all">
              Contacter la paroisse
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

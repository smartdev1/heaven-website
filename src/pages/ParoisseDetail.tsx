import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePublicApi, type Paroisse, type Programme } from '../hooks/usePublicApi';
import { MapPin, Calendar, Clock, ArrowLeft, Share2 } from 'lucide-react';
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

  if (loading)
    return (
      <div
        className="p-20 text-center text-[#6B6454] italic"
        style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
      >
        Chargement…
      </div>
    );
  if (!paroisse)
    return (
      <div
        className="p-20 text-center text-[#6B6454] italic"
        style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
      >
        Paroisse non trouvée.
      </div>
    );

  return (
    <div className="bg-[#FAF8F3] min-h-screen pb-24">
      {/* Hero */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img
          src={paroisse.image}
          alt={paroisse.name}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E] via-[#1A1A2E]/40 to-transparent" />

        <div className="absolute top-6 left-6 lg:left-10">
          <Link
            to="/paroisses"
            className="flex items-center gap-2 text-[#FEFCF7] text-[14px] hover:text-[#C9A84C] transition-colors"
            style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux paroisses
          </Link>
        </div>

        {/* Gold line at bottom of hero */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Info card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-[#FEFCF7] border border-[#DDD5C0] -mt-12 relative z-10 p-7 md:p-10 mb-14"
          style={{ boxShadow: '0 4px 30px rgba(26,26,46,0.1)' }}
        >
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div>
              {/* Label */}
              <div className="flex items-center gap-2 mb-3">
                <div className="h-[1px] w-6 bg-[#C9A84C]" />
                <span
                  className="text-[#C9A84C] text-[11px] tracking-[0.2em] uppercase"
                  style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontWeight: 600 }}
                >
                  Paroisse Catholique
                </span>
              </div>

              <h1
                className="text-[#1A1A2E] mb-3"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
                  fontWeight: 700,
                  lineHeight: 1.15,
                }}
              >
                {paroisse.name}
              </h1>

              <div
                className="flex items-center gap-1.5 text-[#6B6454] text-[16px]"
                style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
              >
                <MapPin className="w-4 h-4 text-[#C9A84C]" />
                {paroisse.city}
                {paroisse.district ? ` · ${paroisse.district}` : ''}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                className="px-6 py-3 text-[#1A1A2E] font-semibold text-[15px] hover:opacity-90 transition-all"
                style={{
                  background: 'linear-gradient(135deg, #C9A84C, #E8C97A)',
                  fontFamily: "'Crimson Pro', Georgia, serif",
                  letterSpacing: '0.03em',
                }}
              >
                S'abonner aux alertes
              </button>
              <button className="p-3 border border-[#DDD5C0] text-[#6B6454] hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Weekly Programs */}
        <section className="mb-14">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-[1px] w-6 bg-[#C9A84C]" />
                <span
                  className="text-[#C9A84C] text-[11px] tracking-[0.2em] uppercase"
                  style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontWeight: 600 }}
                >
                  Cette semaine
                </span>
              </div>
              <h2
                className="text-[#1A1A2E]"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: '1.6rem',
                  fontWeight: 700,
                }}
              >
                Programme de la semaine
              </h2>
            </div>
            <span
              className="text-[13px] text-[#6B6454] italic border border-[#DDD5C0] px-4 py-2"
              style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
            >
              Du 22 Oct. au 28 Oct.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {programmes.length > 0 ? (
              programmes.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <ProgrammeCard programme={p} />
                </motion.div>
              ))
            ) : (
              <div
                className="col-span-full py-16 text-center border border-dashed border-[#DDD5C0] text-[#6B6454] italic text-lg"
                style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
              >
                Aucun programme renseigné pour cette semaine.
              </div>
            )}
          </div>
        </section>

        {/* Info blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#FEFCF7] border border-[#DDD5C0] p-8">
            <div className="flex items-center gap-3 mb-5">
              <Clock className="w-5 h-5 text-[#C9A84C]" />
              <h3
                className="text-[#1A1A2E]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.2rem', fontWeight: 600 }}
              >
                Secrétariat
              </h3>
            </div>
            <ul className="space-y-3">
              {[
                { day: 'Lun — Ven', hours: '09:00 — 12:00' },
                { day: 'Samedi', hours: '10:00 — 12:00' },
              ].map(({ day, hours }) => (
                <li
                  key={day}
                  className="flex justify-between border-b border-[#F2EDE3] pb-3"
                  style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
                >
                  <span className="text-[#6B6454]">{day}</span>
                  <span className="text-[#1C1C1C] font-semibold">{hours}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#FEFCF7] border border-[#DDD5C0] p-8 flex flex-col justify-center text-center">
            <h3
              className="text-[#1A1A2E] mb-3"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.2rem', fontWeight: 600 }}
            >
              Contact direct
            </h3>
            <p
              className="text-[#6B6454] text-[15px] mb-7"
              style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontWeight: 300 }}
            >
              Besoin d'un renseignement pour un baptême ou mariage ?
            </p>
            <button
              className="w-full py-3.5 border border-[#C9A84C] text-[#C9A84C] font-semibold text-[15px] hover:bg-[#C9A84C] hover:text-[#1A1A2E] transition-all"
              style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
            >
              Contacter la paroisse
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Search, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #0E0E1E 0%, #1A1A2E 55%, #1E2B4A 100%)' }}>
      {/* Vitrail geometric pattern overlay */}
      <div
        className="absolute inset-0 opacity-100 vitrail-pattern"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23C9A84C' stroke-width='0.6' opacity='0.12'%3E%3Cpolygon points='40,4 76,24 76,56 40,76 4,56 4,24'/%3E%3Cpolygon points='40,16 64,30 64,50 40,64 16,50 16,30'/%3E%3Cline x1='40' y1='4' x2='40' y2='16'/%3E%3Cline x1='76' y1='24' x2='64' y2='30'/%3E%3Cline x1='76' y1='56' x2='64' y2='50'/%3E%3Cline x1='40' y1='76' x2='40' y2='64'/%3E%3Cline x1='4' y1='56' x2='16' y2='50'/%3E%3Cline x1='4' y1='24' x2='16' y2='30'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Church image with dark overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1438032005730-c779502df39b?q=80&w=2071&auto=format&fit=crop"
          alt="Church architecture"
          className="w-full h-full object-cover opacity-15"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E1E] via-transparent to-transparent" />
      </div>

      {/* Gold radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-10"
        style={{ background: 'radial-gradient(ellipse, #C9A84C 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-28 md:py-36">
        <div className="max-w-3xl">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="h-[1px] w-10 bg-[#C9A84C] opacity-70" />
            <span
              className="text-[#C9A84C] text-[11px] tracking-[0.25em] uppercase opacity-90"
              style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
            >
              Plateforme catholique
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-white mb-6"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
              lineHeight: 1.15,
              fontWeight: 700,
            }}
          >
            Trouvez votre <em className="text-[#C9A84C] not-italic">communauté</em>
            <br />paroissiale
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[#B8B0A0] text-xl mb-10 max-w-xl"
            style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontWeight: 300 }}
          >
            Consultez les horaires de messes, événements et annonces
            des paroisses près de chez vous.
          </motion.p>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex max-w-[560px] overflow-hidden border border-[#C9A84C]/30 bg-white/5 backdrop-blur-sm"
            style={{ borderRadius: '2px' }}
          >
            <div className="flex-1 flex items-center px-5 gap-3">
              <Search className="w-4 h-4 text-[#C9A84C] opacity-70 shrink-0" />
              <input
                type="text"
                placeholder="Rechercher une ville ou une paroisse..."
                className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-[#6B6454] text-[16px] py-4"
                style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
                defaultValue="Paroisse Saint Joseph, Abidjan"
              />
            </div>
            <button
              className="px-7 py-4 font-semibold text-[#1A1A2E] text-[15px] transition-all hover:opacity-90"
              style={{
                background: 'linear-gradient(135deg, #C9A84C, #E8C97A)',
                fontFamily: "'Crimson Pro', Georgia, serif",
                letterSpacing: '0.04em',
              }}
            >
              Trouver
            </button>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-6 mt-8"
          >
            {['Cathédrale Notre Dame', 'Sanctuaire Marial', 'Sacré-Cœur'].map((name) => (
              <button
                key={name}
                className="flex items-center gap-1.5 text-[#B8B0A0] hover:text-[#C9A84C] text-[14px] transition-colors"
                style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
              >
                <MapPin className="w-3 h-3 opacity-60" />
                {name}
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#FAF8F3] to-transparent" />
    </section>
  );
}

import React from 'react';
import { Smartphone, Download, CheckCircle2, Star } from 'lucide-react';
import { motion } from 'motion/react';

export default function MobileAppSection() {
  const features = [
    'Alertes push personnalisées',
    'Mode hors-ligne disponible',
    'Agenda communautaire partagé',
    'Intentions de messe',
  ];

  return (
    <section className="py-24 px-6 lg:px-10 bg-[#1A1A2E] overflow-hidden relative">
      {/* Vitrail pattern overlay */}
      <div
        className="absolute inset-0 opacity-100"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23C9A84C' stroke-width='0.6' opacity='0.07'%3E%3Cpolygon points='40,4 76,24 76,56 40,76 4,56 4,24'/%3E%3Cpolygon points='40,16 64,30 64,50 40,64 16,50 16,30'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Gold radial glow */}
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(201,168,76,0.06) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div>
            {/* Rating */}
            <div className="flex items-center gap-2 mb-7">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#C9A84C] text-[#C9A84C]" />
                ))}
              </div>
              <span
                className="text-[#B8B0A0] text-[13px]"
                style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
              >
                Note 4.9/5 · +2 400 avis
              </span>
            </div>

            {/* Label */}
            <div className="flex items-center gap-3 mb-5">
              <div className="h-[1px] w-8 bg-[#C9A84C] opacity-60" />
              <span
                className="text-[#C9A84C] text-[11px] tracking-[0.2em] uppercase"
                style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontWeight: 600 }}
              >
                Application mobile
              </span>
            </div>

            <h2
              className="text-white mb-5"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              Votre paroisse,{' '}
              <em className="text-[#C9A84C] not-italic">partout avec vous.</em>
            </h2>

            <p
              className="text-[#B8B0A0] text-[16px] mb-9 max-w-md leading-relaxed"
              style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontWeight: 300 }}
            >
              Recevez les alertes de messes en temps réel, suivez vos paroisses
              favorites et ne manquez plus aucun événement communautaire.
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <div className="w-5 h-5 flex items-center justify-center rounded-none" style={{ border: '1px solid rgba(201,168,76,0.4)' }}>
                    <CheckCircle2 className="w-3 h-3 text-[#C9A84C]" />
                  </div>
                  <span
                    className="text-[#B8B0A0] text-[14px]"
                    style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
                  >
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <button
                className="flex items-center gap-3 px-7 py-3.5 text-[#1A1A2E] font-semibold text-[15px] hover:opacity-90 transition-all"
                style={{
                  background: 'linear-gradient(135deg, #C9A84C, #E8C97A)',
                  fontFamily: "'Crimson Pro', Georgia, serif",
                  letterSpacing: '0.03em',
                }}
              >
                <Download className="w-4 h-4" />
                App Store
              </button>
              <button
                className="flex items-center gap-3 px-7 py-3.5 border border-[#C9A84C]/50 text-[#C9A84C] font-semibold text-[15px] hover:border-[#C9A84C] hover:bg-[#C9A84C]/5 transition-all"
                style={{ fontFamily: "'Crimson Pro', Georgia, serif", letterSpacing: '0.03em' }}
              >
                <Smartphone className="w-4 h-4" />
                Google Play
              </button>
            </div>
          </div>

          {/* Right: Phone mockup */}
          <div className="flex justify-center lg:justify-end">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative"
            >
              {/* Phone */}
              <div
                className="relative w-[240px] h-[480px] bg-[#0E0E1E] border-[6px] border-[#2A2A3E] shadow-2xl overflow-hidden"
                style={{ borderRadius: '36px' }}
              >
                {/* Notch */}
                <div className="absolute top-0 inset-x-0 h-6 bg-[#0E0E1E] flex justify-center items-end pb-1 z-10">
                  <div className="w-16 h-3 bg-[#0E0E1E] rounded-b-xl" />
                </div>

                {/* Screen content */}
                <div className="pt-8 px-4">
                  {/* App header */}
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <div className="h-2 w-20 bg-[#2A2A3E] rounded mb-1" />
                      <div className="h-3 w-28 bg-[#C9A84C]/30 rounded" />
                    </div>
                    <div className="w-7 h-7 rounded-full bg-[#C9A84C]/20 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-[#C9A84C]/60" />
                    </div>
                  </div>

                  {/* Hero card */}
                  <div
                    className="w-full h-28 mb-4 relative overflow-hidden flex items-end p-3"
                    style={{
                      background: 'linear-gradient(135deg, #1A1A2E, #2A3A60)',
                      border: '1px solid rgba(201,168,76,0.2)',
                    }}
                  >
                    <div>
                      <div className="h-2 w-16 bg-[#C9A84C]/40 rounded mb-1.5" />
                      <div className="h-3 w-32 bg-white/20 rounded" />
                    </div>
                  </div>

                  {/* List items */}
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-3 py-2.5 border-b border-[#2A2A3E]">
                      <div className="w-8 h-8 bg-[#C9A84C]/15 flex items-center justify-center flex-shrink-0">
                        <div className="w-3 h-3 bg-[#C9A84C]/40 rounded-sm" />
                      </div>
                      <div className="flex-1">
                        <div className="h-2 w-24 bg-[#2A2A3E] rounded mb-1" />
                        <div className="h-2 w-16 bg-[#2A2A3E]/60 rounded" />
                      </div>
                      <div className="h-2 w-8 bg-[#C9A84C]/30 rounded" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating notification */}
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                viewport={{ once: true }}
                className="absolute top-24 -left-16 w-52 bg-[#FEFCF7] p-3.5 shadow-xl border border-[#DDD5C0]"
                style={{ borderRadius: '2px' }}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#C9A84C]" />
                  <span
                    className="text-[10px] text-[#6B6454] tracking-widest uppercase"
                    style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontWeight: 600 }}
                  >
                    Rappel
                  </span>
                </div>
                <p
                  className="text-[12px] text-[#1C1C1C] leading-snug"
                  style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
                >
                  Messe à 18h30 ce soir à Notre-Dame. 🕊️
                </p>
              </motion.div>

              {/* Gold glow behind phone */}
              <div
                className="absolute inset-0 -z-10 blur-3xl opacity-15"
                style={{ background: 'radial-gradient(ellipse, #C9A84C 0%, transparent 70%)' }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { Smartphone, Download, CheckCircle2, Star } from 'lucide-react';
import { motion } from 'motion/react';

export default function MobileAppSection() {
  return (
    <section className="py-24 px-6 lg:px-10 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="bg-bg-light rounded-[32px] p-8 md:p-16 border border-border relative overflow-hidden flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Background Decorative element */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-light/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />
          
          {/* Left Content */}
          <div className="flex-1 relative z-10 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-border rounded-full text-[11px] font-bold text-primary mb-6 shadow-sm">
              <Star className="w-3 h-3 fill-accent text-accent" />
              <span>Note moyenne 4.9/5 sur les stores</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-extrabold text-text-main mb-6 tracking-tight leading-tight">
              Votre paroisse, <br className="hidden md:block" />
              <span className="text-primary-light">partout avec vous.</span>
            </h2>
            
            <p className="text-text-muted text-lg mb-10 max-w-xl mx-auto lg:mx-0">
              Téléchargez l'application mobile pour recevoir les alertes de messes en temps réel, 
              suivre vos paroisses favorites et ne plus jamais manquer un événement communautaire.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              <div className="flex items-center gap-3 text-text-main font-medium">
                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
                <span>Alertes push personnalisées</span>
              </div>
              <div className="flex items-center gap-3 text-text-main font-medium">
                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
                <span>Mode hors-ligne disponible</span>
              </div>
              <div className="flex items-center gap-3 text-text-main font-medium">
                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
                <span>Agenda communautaire partagé</span>
              </div>
              <div className="flex items-center gap-3 text-text-main font-medium">
                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
                <span>Gestion des intentions de messe</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="flex items-center justify-center gap-3 px-8 py-4 bg-primary text-white font-bold rounded-2xl hover:opacity-95 transition-all shadow-lg hover:-translate-y-1">
                <Download className="w-5 h-5" />
                App Store
              </button>
              <button className="flex items-center justify-center gap-3 px-8 py-4 bg-white border-2 border-primary text-primary font-bold rounded-2xl hover:bg-slate-50 transition-all shadow-md hover:-translate-y-1">
                <Smartphone className="w-5 h-5" />
                Google Play
              </button>
            </div>
          </div>

          {/* Right Content - Phone Mockup (Visual) */}
          <div className="flex-1 relative w-full lg:w-auto h-[400px] md:h-[500px] lg:h-[600px] flex justify-center">
             <motion.div 
               initial={{ y: 50, opacity: 0 }}
               whileInView={{ y: 0, opacity: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, ease: "easeOut" }}
               className="relative w-[240px] md:w-[280px] h-[480px] md:h-[560px] bg-white rounded-[40px] border-[8px] border-slate-900 shadow-2xl relative overflow-hidden"
             >
                <div className="absolute top-0 inset-x-0 h-6 bg-slate-900 flex justify-center items-center">
                  <div className="w-20 h-4 bg-slate-900 rounded-b-xl" />
                </div>
                <div className="pt-10 px-4">
                  <div className="w-8 h-8 bg-accent rounded-full mb-6" />
                  <div className="space-y-4">
                    <div className="h-4 w-3/4 bg-slate-100 rounded-md" />
                    <div className="h-24 w-full bg-primary-light/20 rounded-xl" />
                    <div className="h-4 w-1/2 bg-slate-100 rounded-md" />
                    <div className="grid grid-cols-2 gap-3">
                       <div className="h-20 bg-slate-50 rounded-xl" />
                       <div className="h-20 bg-slate-50 rounded-xl" />
                    </div>
                  </div>
                </div>
                {/* Floating Notification */}
                <motion.div 
                  initial={{ x: 20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="absolute top-32 -left-10 md:-left-20 w-48 md:w-56 bg-white p-3 rounded-xl shadow-2xl border border-border"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-primary-light rounded-full" />
                    <span className="text-[10px] font-bold text-text-muted uppercase">Notification</span>
                  </div>
                  <p className="text-[11px] font-bold text-text-main line-clamp-2">
                    Messe à 18h30 ce soir à Notre-Dame. Soyez à l'heure ! 🕊️
                  </p>
                </motion.div>
             </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

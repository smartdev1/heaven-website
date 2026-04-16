import React from 'react';
import { Search, MapPin, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

export default function HeroSection() {
  return (
    <section className="relative py-24 px-6 lg:px-10 overflow-hidden bg-primary">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1438032005730-c779502df39b?q=80&w=2071&auto=format&fit=crop"
          alt="Church architecture"
          className="w-full h-full object-cover opacity-40"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col justify-center min-h-[300px]">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
            Trouvez votre communauté
          </h1>
          <p className="max-w-2xl text-base text-white/90 mb-6">
            Consultez les horaires de messes et événements paroissiaux près de chez vous.
          </p>
        </motion.div>

        {/* Search Bar Container */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-xl p-2 shadow-lg max-w-[600px] flex gap-2"
        >
          <div className="flex-1 flex items-center px-4 gap-2">
            <Search className="w-4 h-4 text-text-muted" />
            <input 
              type="text" 
              placeholder="Rechercher une ville ou une paroisse..." 
              className="w-full bg-transparent border-none focus:ring-0 text-text-main text-sm"
              defaultValue="Paris, 75005"
            />
          </div>
          <button className="bg-accent text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:opacity-90 transition-all shadow-sm">
            Trouver
          </button>
        </motion.div>
      </div>
    </section>
  );
}

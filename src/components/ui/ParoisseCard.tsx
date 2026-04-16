import React from 'react';
import { Landmark, MapPin, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import type { Paroisse } from '../../hooks/usePublicApi';

interface ParoisseCardProps {
  paroisse: Paroisse;
}

export default function ParoisseCard({ paroisse }: ParoisseCardProps) {
  return (
    <Link to={`/paroisses/${paroisse.slug}`}>
      <motion.div 
        className="bg-white rounded-xl border border-border overflow-hidden card-shadow group cursor-pointer h-full flex flex-col hover:border-primary-light transition-all"
      >
      <div className="relative h-40 overflow-hidden">
        <img 
          src={paroisse.image} 
          alt={paroisse.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
      </div>
      <div className="p-4 bg-white group-hover:bg-slate-50 transition-colors flex flex-col flex-grow">
        <h3 className="font-bold text-text-main line-clamp-1 mb-1">{paroisse.name}</h3>
        <div className="flex items-center gap-1.5 text-text-muted text-[13px] mt-auto">
          <MapPin className="w-3.5 h-3.5" />
          <span>{paroisse.city} {paroisse.district ? `• ${paroisse.district}` : ''}</span>
        </div>
      </div>
    </motion.div>
    </Link>
  );
}

import React from 'react';
import { Calendar, Clock, MapPin, Share2, Info, Landmark } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import type { Programme } from '../../hooks/usePublicApi';

interface ProgrammeCardProps {
  programme: Programme;
}

export default function ProgrammeCard({ programme }: ProgrammeCardProps) {
  const typeStyles = {
    messe: 'bg-[rgba(37,99,235,0.1)] text-primary-light border-transparent',
    evenement: 'bg-[rgba(245,158,11,0.1)] text-accent border-transparent',
    annonce: 'bg-slate-100 text-slate-600 border-transparent',
  };

  return (
    <motion.article 
      whileHover={{ borderColor: 'var(--color-primary-light)' }}
      className="bg-white rounded-xl border border-border p-5 transition-colors card-shadow h-full flex flex-col"
    >
      <div className="mb-3">
        <span className={cn(
          "px-2 py-1 rounded text-[11px] font-bold uppercase tracking-wider",
          typeStyles[programme.type]
        )}>
          {programme.type === 'messe' ? 'Messe Dominicale' : programme.type === 'evenement' ? 'Conférence' : 'Annonce'}
        </span>
      </div>

      <div className="text-sm font-bold text-primary-light mb-1">
        {programme.time} - {/* Simple end time logic for display */}
        {parseInt(programme.time.split(':')[0]) + 1}:00
      </div>

      <h3 className="text-base font-bold text-text-main mb-3">
        {programme.title}
      </h3>

      <div className="mt-auto flex items-center gap-1.5 text-[13px] text-text-muted">
        <div className="w-1.5 h-1.5 bg-border rounded-full" />
        {programme.paroisseName}
      </div>
    </motion.article>
  );
}

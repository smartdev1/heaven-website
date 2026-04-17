import React from 'react';
import { Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import type { Programme } from '../../hooks/usePublicApi';

interface ProgrammeCardProps {
  programme: Programme;
}

const typeConfig = {
  messe: {
    label: 'Messe',
    color: '#2A4A7F',
    bg: 'rgba(42,74,127,0.07)',
    dot: '#2A4A7F',
  },
  evenement: {
    label: 'Événement',
    color: '#C9A84C',
    bg: 'rgba(201,168,76,0.08)',
    dot: '#C9A84C',
  },
  annonce: {
    label: 'Annonce',
    color: '#6B6454',
    bg: 'rgba(107,100,84,0.07)',
    dot: '#6B6454',
  },
};

export default function ProgrammeCard({ programme }: ProgrammeCardProps) {
  const config = typeConfig[programme.type];
  const endHour = parseInt(programme.time.split(':')[0]) + 1;

  return (
    <motion.article
      whileHover={{ y: -2, boxShadow: '0 8px 40px rgba(26,26,46,0.1), 0 2px 8px rgba(201,168,76,0.1)' }}
      transition={{ duration: 0.2 }}
      className="bg-[#FEFCF7] border border-[#DDD5C0] h-full flex flex-col relative overflow-hidden"
      style={{ borderRadius: '2px' }}
    >
      {/* Left accent border */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ background: config.color, opacity: 0.6 }} />

      <div className="p-5 pl-7 flex flex-col flex-grow">
        {/* Type badge */}
        <div className="flex items-center justify-between mb-4">
          <span
            className="text-[11px] tracking-[0.18em] uppercase px-2.5 py-1"
            style={{
              color: config.color,
              background: config.bg,
              fontFamily: "'Crimson Pro', Georgia, serif",
              fontWeight: 600,
              letterSpacing: '0.15em',
            }}
          >
            {config.label}
          </span>
        </div>

        {/* Time */}
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-3.5 h-3.5" style={{ color: config.color, opacity: 0.7 }} />
          <span
            className="text-[14px]"
            style={{ color: config.color, fontFamily: "'Crimson Pro', Georgia, serif", fontWeight: 600 }}
          >
            {programme.time} — {endHour}:00
          </span>
        </div>

        {/* Title */}
        <h3
          className="text-[#1C1C1C] mb-3 leading-snug"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: '1.05rem',
            fontWeight: 600,
          }}
        >
          {programme.title}
        </h3>

        {/* Ornament line */}
        <div className="my-3 h-[1px] bg-gradient-to-r from-[#DDD5C0] to-transparent" />

        {/* Parish */}
        <div
          className="mt-auto flex items-center gap-2 text-[#6B6454] text-[13px]"
          style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
        >
          <div className="w-1 h-1 rounded-full" style={{ background: config.dot }} />
          {programme.paroisseName}
        </div>
      </div>
    </motion.article>
  );
}

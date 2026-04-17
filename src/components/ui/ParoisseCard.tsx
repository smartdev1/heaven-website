import React from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
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
        whileHover={{ y: -3 }}
        transition={{ duration: 0.2 }}
        className="bg-[#FEFCF7] border border-[#DDD5C0] overflow-hidden group cursor-pointer h-full flex flex-col"
        style={{
          borderRadius: '2px',
          boxShadow: '0 2px 16px rgba(26,26,46,0.06)',
        }}
      >
        {/* Image */}
        <div className="relative h-44 overflow-hidden">
          <img
            src={paroisse.image}
            alt={paroisse.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E]/70 via-[#1A1A2E]/20 to-transparent" />

          {/* District badge */}
          {paroisse.district && (
            <div
              className="absolute top-3 right-3 px-2.5 py-1 text-[10px] text-[#C9A84C] border border-[#C9A84C]/50"
              style={{
                background: 'rgba(10,10,20,0.7)',
                backdropFilter: 'blur(4px)',
                fontFamily: "'Crimson Pro', Georgia, serif",
                fontWeight: 600,
                letterSpacing: '0.1em',
              }}
            >
              {paroisse.district}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-grow">
          <h3
            className="text-[#1C1C1C] mb-2 leading-snug line-clamp-2"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: '1rem',
              fontWeight: 600,
            }}
          >
            {paroisse.name}
          </h3>

          <div className="mt-auto flex items-center justify-between">
            <div
              className="flex items-center gap-1.5 text-[#6B6454] text-[13px]"
              style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
            >
              <MapPin className="w-3 h-3 text-[#C9A84C]" />
              {paroisse.city}
            </div>
            <ArrowRight
              className="w-4 h-4 text-[#DDD5C0] group-hover:text-[#C9A84C] group-hover:translate-x-1 transition-all duration-200"
            />
          </div>
        </div>

        {/* Bottom gold accent line on hover */}
        <div
          className="h-[2px] w-0 group-hover:w-full transition-all duration-500"
          style={{ background: 'linear-gradient(to right, #C9A84C, #E8C97A)' }}
        />
      </motion.div>
    </Link>
  );
}

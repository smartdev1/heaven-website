import React, { useState, useEffect } from 'react';
import { Menu, X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';
import { Link, useLocation } from 'react-router-dom';

export default function PublicHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navLinks = [
    { name: 'Accueil', href: '/' },
    { name: 'Paroisses', href: '/paroisses' },
    { name: 'Programmes', href: '/programmes' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-500',
        scrolled
          ? 'bg-[#FAF8F3]/95 backdrop-blur-md border-b border-[#DDD5C0] shadow-[0_2px_20px_rgba(26,26,46,0.06)]'
          : 'bg-[#FAF8F3] border-b border-[#DDD5C0]'
      )}
    >
      {/* Top ornament bar */}
      <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent opacity-60" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex justify-between items-center h-[68px]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            {/* Cross / ornament mark */}
            <div className="relative w-8 h-8 flex items-center justify-center">
              <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
                <rect x="14" y="3" width="4" height="26" rx="1" fill="#C9A84C" opacity="0.9"/>
                <rect x="5" y="11" width="22" height="4" rx="1" fill="#C9A84C" opacity="0.9"/>
                <circle cx="16" cy="13" r="3" fill="#1A1A2E"/>
              </svg>
            </div>
            <div className="flex flex-col leading-none">
              <span
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                className="text-[22px] font-bold tracking-tight text-[#1A1A2E] group-hover:text-[#C9A84C] transition-colors"
              >
                Heaven
              </span>
              <span className="text-[9px] tracking-[0.2em] uppercase text-[#6B6454]">
                Paroisses & Programmes
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  'text-[15px] transition-all duration-200 relative group',
                  isActive(link.href)
                    ? 'text-[#C9A84C]'
                    : 'text-[#1C1C1C] hover:text-[#C9A84C]'
                )}
                style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontWeight: isActive(link.href) ? 600 : 400 }}
              >
                {link.name}
                <span
                  className={cn(
                    'absolute -bottom-1 left-0 h-[1px] bg-[#C9A84C] transition-all duration-300',
                    isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
                  )}
                />
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link
              to="/programmes"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2 border border-[#C9A84C] text-[#C9A84C] text-[14px] rounded-none hover:bg-[#C9A84C] hover:text-[#1A1A2E] transition-all duration-200"
              style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontWeight: 600, letterSpacing: '0.05em' }}
            >
              Trouver une messe
            </Link>

            <div className="md:hidden flex items-center gap-3">
              <button className="text-[#6B6454] hover:text-[#C9A84C] transition-colors">
                <Search className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-[#1A1A2E] hover:text-[#C9A84C] transition-colors"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full bg-[#FAF8F3] border-b border-[#DDD5C0] shadow-lg md:hidden"
          >
            <div className="px-6 py-6 space-y-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    to={link.href}
                    className={cn(
                      'block py-3 text-lg border-b border-[#DDD5C0]/50',
                      isActive(link.href) ? 'text-[#C9A84C]' : 'text-[#1C1C1C]'
                    )}
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-4">
                <Link
                  to="/programmes"
                  className="block w-full text-center py-3 border border-[#C9A84C] text-[#C9A84C] font-semibold"
                  style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
                  onClick={() => setIsOpen(false)}
                >
                  Trouver une messe
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

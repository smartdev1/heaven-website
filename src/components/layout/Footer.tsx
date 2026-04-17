import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#1A1A2E] mt-auto">
      {/* Gold ornament top */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent opacity-50" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6 opacity-70">
              <rect x="14" y="3" width="4" height="26" rx="1" fill="#C9A84C"/>
              <rect x="5" y="11" width="22" height="4" rx="1" fill="#C9A84C"/>
            </svg>
            <span
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-[#FEFCF7] text-lg font-semibold"
            >
              Heaven
            </span>
          </div>

          {/* Links */}
          <div className="flex gap-8">
            {['Mentions légales', 'Confidentialité', 'Contact'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-[#6B6454] hover:text-[#C9A84C] transition-colors text-[14px]"
                style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
              >
                {item}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div
            className="text-[#6B6454] text-[13px]"
            style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
          >
            © 2024 Heaven. Plateforme d'information paroissiale.
          </div>
        </div>
      </div>
    </footer>
  );
}

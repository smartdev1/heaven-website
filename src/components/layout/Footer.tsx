import React from 'react';
import { Landmark, Github, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full py-5 px-6 lg:px-10 border-t border-border bg-white mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[12px] text-text-muted">
        <div>© 2023 Heaven. Plateforme d'information communautaire.</div>
        <div className="flex gap-6 font-medium">
          <a href="#" className="hover:text-primary-light transition-colors">Mentions légales</a>
          <a href="#" className="hover:text-primary-light transition-colors">Confidentialité</a>
          <a href="#" className="hover:text-primary-light transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}

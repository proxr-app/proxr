import React from 'react';
import logo from '../../assets/logo.png';

export default function Footer() {
  return (
    <footer className="w-full border-t border-border-custom bg-black py-8 px-4 lg:px-8 font-mono mt-auto select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Brand Logo & Tagline */}
        <div className="flex items-center gap-4">
          <img src={logo} alt="proxr" className="h-4 w-auto opacity-70 hover:opacity-100 transition-opacity duration-300" />
          <span className="text-[10px] text-muted border-l border-border-custom pl-4 lowercase hidden sm:inline">
            peer-to-peer compute
          </span>
        </div>

        {/* Center: Live network status badge */}
        <div className="flex items-center gap-2 text-[10px] text-muted lowercase bg-surface border border-border-custom px-3 py-1 rounded-full">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-custom animate-pulse"></span>
          network status: operational
        </div>

        {/* Right: X, GitHub Links & Copyright */}
        <div className="flex items-center gap-6 text-xs text-muted">
          <div className="flex items-center gap-3">
            <a
              href="https://x.com/proxrapp"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors lowercase border border-border-custom hover:border-white/20 px-2 py-0.5 rounded text-[11px]"
            >
              x
            </a>
            <a
              href="https://github.com/proxr-app/proxr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors lowercase border border-border-custom hover:border-white/20 px-2 py-0.5 rounded text-[11px]"
            >
              github
            </a>
          </div>
          <span className="text-[10px] lowercase">
            &copy; 2026 proxr
          </span>
        </div>
      </div>
    </footer>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full border-t border-outline-variant/20 px-4 md:px-space-xl py-space-2xl max-w-[1600px] mx-auto bg-surface-container-lowest mt-space-3xl">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-space-lg mb-space-xl">
        {/* Brand Identity Column */}
        <div className="space-y-space-xs max-w-md">
          <div className="flex items-center gap-space-xs">
            <div className="w-8 h-8 rounded-lg bg-surface-container-high border border-primary/40 flex items-center justify-center shadow-[0_0_8px_rgba(208,188,255,0.3)] shrink-0">
              <svg className="w-5 h-5 text-primary drop-shadow-[0_0_6px_rgba(208,188,255,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h16v16H4z" className="opacity-30" stroke="currentColor" strokeDasharray="2 2"></path>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 9l9-6 9 6v10a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" stroke="currentColor"></path>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 13.5h3m-1.5-1.5v3" stroke="#4cd7f6" strokeWidth="2"></path>
                <circle cx="15" cy="13" r="1" fill="#d0bcff"></circle>
                <circle cx="17" cy="15" r="1" fill="#4cd7f6"></circle>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-2a3 3 0 016 0v2" stroke="currentColor"></path>
              </svg>
            </div>
            <span className="font-headline-sm text-headline-sm font-bold text-primary">
              GAMING YARD
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-outline">
            Next-generation operating hub for competitive benchmarks, authorized game builds, low-latency client telemetry, and esports gear certification.
          </p>
        </div>

        {/* Links Grid */}
        <div className="flex flex-wrap gap-x-space-lg gap-y-space-xs items-center">
          <a
            href="https://t.me/gamingyard"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[#229ED9] hover:text-white font-body-sm text-body-sm transition-colors font-medium"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.52 2.77-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
            </svg>
            <span>Official Telegram</span>
          </a>
          <Link to="/auth" className="text-secondary hover:text-white font-body-sm text-body-sm transition-colors font-medium">
            Sign In / Register
          </Link>
          <Link to="/library" className="text-primary hover:text-secondary font-body-sm text-body-sm transition-colors font-medium">
            Official Games Library
          </Link>
          <a className="text-outline hover:text-on-surface font-body-sm text-body-sm transition-colors hover:text-secondary" href="#">
            Privacy Policy
          </a>
          <a className="text-outline hover:text-on-surface font-body-sm text-body-sm transition-colors hover:text-secondary" href="#">
            Terms of Service
          </a>
          <a className="text-outline hover:text-on-surface font-body-sm text-body-sm transition-colors hover:text-secondary" href="#">
            Lua Script Telemetry
          </a>
          <a className="text-outline hover:text-on-surface font-body-sm text-body-sm transition-colors hover:text-secondary" href="#">
            Developer API
          </a>
          <a className="text-outline hover:text-on-surface font-body-sm text-body-sm transition-colors hover:text-secondary" href="#">
            Community Discord
          </a>
        </div>
      </div>

      {/* Copyright & Network Signature Row */}
      <div className="pt-space-md border-t border-outline-variant/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-outline font-body-sm text-body-sm">
        <div>
          © 2024 Gaming Yard Inc. 100% Safe • Games bypassed through Lua files.
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]"></span>
            <span className="text-xs text-on-surface">Global Nodes: 100% Operational (14ms)</span>
          </div>
          <div className="text-xs text-outline font-mono">v2.14.0-release</div>
        </div>
      </div>
    </footer>
  );
}

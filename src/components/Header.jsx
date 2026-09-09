import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { userProfile } from '../data/gamesData';

export default function Header({ searchQuery, setSearchQuery }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (anchor) => {
    if (location.pathname !== '/') {
      navigate('/' + anchor);
    } else if (anchor) {
      const el = document.querySelector(anchor);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isLibraryActive = location.pathname === '/library';
  const isHomeActive = location.pathname === '/';
  const isAuthActive = location.pathname === '/auth' || location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className="w-full relative z-50">
      {/* Top Announcement Trust Bar */}
      <div className="w-full bg-surface-container-lowest border-b border-outline-variant/30 py-1.5 px-4 md:px-space-xl">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between text-on-surface-variant font-label-caps text-label-caps tracking-wider text-[10px] md:text-[11px]">
          <div className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-secondary animate-ping"></span>
            <span className="text-secondary font-semibold">100% SAFE</span>
            <span className="text-outline">/</span>
            <span className="hidden sm:inline">GAMES BYPASSED THROUGH LUA FILES &amp; INTEGRITY AUDITED</span>
            <span className="sm:hidden">LUA INTEGRITY AUDITED</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-outline">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Global Nodes Active: 14ms
            </span>
            <span>ZERO PIRACY STRICT CODE-SANDBOX</span>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 md:px-space-xl py-space-sm w-full max-w-[1600px] mx-auto bg-surface/85 backdrop-blur-md border-b border-outline-variant/30 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.7)]">
        {/* Brand Logo Group */}
        <div className="flex items-center gap-4 lg:gap-space-lg">
          <Link to="/" className="flex items-center gap-space-xs group">
            <div className="w-10 h-10 rounded-lg bg-surface-container-high border border-primary/40 flex items-center justify-center shadow-[0_0_12px_rgba(208,188,255,0.35)] group-hover:border-primary group-hover:shadow-[0_0_20px_rgba(208,188,255,0.6)] transition-all duration-300">
              <svg className="w-6 h-6 text-primary drop-shadow-[0_0_8px_rgba(208,188,255,0.6)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h16v16H4z" className="opacity-30" stroke="currentColor" strokeDasharray="2 2"></path>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 9l9-6 9 6v10a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" stroke="currentColor"></path>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 13.5h3m-1.5-1.5v3" stroke="#4cd7f6" strokeWidth="2"></path>
                <circle cx="15" cy="13" r="1" fill="#d0bcff"></circle>
                <circle cx="17" cy="15" r="1" fill="#4cd7f6"></circle>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-2a3 3 0 016 0v2" stroke="currentColor"></path>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-headline-md text-headline-md font-bold tracking-wider text-primary drop-shadow-[0_0_12px_rgba(208,188,255,0.4)] leading-none">
                GAMING YARD
              </span>
              <span className="font-label-caps text-[9px] tracking-widest text-secondary mt-1 hidden sm:block">
                LUA MOD CORE OS
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-space-lg ml-space-md border-l border-outline-variant/30 pl-space-md">
            <Link
              to="/"
              className={`font-title-md text-title-md transition-all duration-200 active:scale-95 ${isHomeActive
                  ? "text-secondary border-b-2 border-secondary pb-1"
                  : "text-on-surface-variant hover:text-primary"
                }`}
            >
              Home
            </Link>
            <button
              onClick={() => handleNavClick('#trending')}
              className="text-on-surface-variant hover:text-primary font-title-md text-title-md transition-colors text-left cursor-pointer"
            >
              Trending
            </button>
            <button
              onClick={() => handleNavClick('#news')}
              className="text-on-surface-variant hover:text-primary font-title-md text-title-md transition-colors text-left cursor-pointer"
            >
              News
            </button>
            <Link
              to="/library"
              className={`font-title-md text-title-md transition-all duration-200 active:scale-95 ${isLibraryActive
                  ? "text-secondary border-b-2 border-secondary pb-1 font-semibold"
                  : "text-on-surface-variant hover:text-primary"
                }`}
            >
              Games Library
            </Link>
            <Link
              to="/auth"
              className={`font-title-md text-title-md transition-all duration-200 active:scale-95 ${isAuthActive
                  ? "text-secondary border-b-2 border-secondary pb-1 font-semibold"
                  : "text-on-surface-variant hover:text-primary"
                }`}
            >
              Sign In
            </Link>
          </nav>
        </div>

        {/* Trailing Actions: Quick Search Bar & Profile HUD */}
        <div className="flex items-center gap-space-md">
          {/* Direct Telegram Quick Connect Button */}
          <a
            href="https://t.me/gamingyard"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#229ED9]/15 hover:bg-[#229ED9]/25 border border-[#229ED9]/40 text-[#229ED9] hover:text-white transition-all duration-200 telegram-glow group cursor-pointer"
            title="Join Official Telegram Channel"
          >
            <svg className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.52 2.77-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
            </svg>
            <span className="text-xs font-semibold tracking-wide hidden sm:inline">Join Telegram</span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
            </span>
          </a>

          {/* Quick Search Bar with ⌘K */}
          <div className="relative hidden sm:flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-outline text-body-md pointer-events-none">
              search
            </span>
            <input
              type="text"
              value={searchQuery || ''}
              onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && location.pathname !== '/library') {
                  navigate('/library');
                }
              }}
              placeholder="Search games, telemetry, mods..."
              className="w-56 lg:w-80 bg-surface-container-lowest border border-outline-variant/50 focus:border-secondary focus:ring-1 focus:ring-secondary/40 rounded-lg pl-9 pr-12 py-1.5 text-on-surface font-body-sm text-body-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] placeholder:text-outline transition-all duration-200 outline-none"
            />
            <kbd className="absolute right-2.5 px-1.5 py-0.5 rounded bg-surface-container-high border border-outline-variant/40 text-outline font-label-caps text-label-caps uppercase text-[10px]">
              ⌘K
            </kbd>
          </div>

          {/* Profile Container with Interactive HUD Popover */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-space-xs p-1 pr-2.5 rounded-lg bg-surface-container-low border border-outline-variant/40 hover:border-secondary/60 transition-all duration-200 group cursor-pointer"
            >
              <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-primary/50 shadow-[0_0_8px_rgba(208,188,255,0.3)]">
                <img
                  src={userProfile.avatar}
                  alt="User avatar for Vedant Level 12"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-400 border border-surface-container-lowest rounded-full"></span>
              </div>
              <div className="text-left hidden lg:block">
                <div className="flex items-center gap-1">
                  <span className="font-title-md text-body-sm font-semibold text-on-surface group-hover:text-primary transition-colors">
                    {userProfile.name}
                  </span>
                  <span className="px-1 py-0.2 bg-primary-container/30 border border-primary/40 rounded text-primary font-label-caps text-[9px]">
                    LVL 12
                  </span>
                </div>
              </div>
              <span
                className={`material-symbols-outlined text-outline text-body-sm transition-transform duration-200 group-hover:text-on-surface ${isProfileOpen ? 'rotate-180' : ''
                  }`}
              >
                expand_more
              </span>
            </button>

            {/* Profile Popover HUD Panel */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded-xl bg-surface-container-lowest/95 backdrop-blur-xl border border-outline-variant/60 shadow-[0_12px_40px_rgba(0,0,0,0.85),0_0_24px_rgba(208,188,255,0.12)] p-space-md transition-all duration-300 z-50 animate-in fade-in zoom-in-95">
                {/* User Bio */}
                <div className="flex items-center gap-space-sm pb-space-sm border-b border-outline-variant/30">
                  <div className="w-12 h-12 rounded-lg border border-primary/60 p-0.5 relative shadow-[0_0_12px_rgba(208,188,255,0.4)]">
                    <img
                      src={userProfile.bioAvatar}
                      alt="User avatar"
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-headline-sm text-title-md text-on-surface truncate">
                        {userProfile.name}
                      </h4>
                      <span className="px-1.5 py-0.5 rounded bg-secondary/15 border border-secondary/40 text-secondary font-label-caps text-[10px]">
                        {userProfile.badge}
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-outline truncate">
                      {userProfile.email}
                    </p>
                  </div>
                </div>

                {/* XP Telemetry Level Meter */}
                <div className="py-space-sm border-b border-outline-variant/30 space-y-1.5">
                  <div className="flex justify-between items-center text-body-sm">
                    <span className="font-label-caps text-label-caps text-outline tracking-wider uppercase">
                      Level 12 Mastery
                    </span>
                    <span className="font-stat-counter text-body-sm font-semibold text-secondary">
                      {userProfile.xpProgress}% XP
                    </span>
                  </div>
                  {/* Segmented Progress Bar */}
                  <div className="w-full h-2 rounded bg-surface-container-high overflow-hidden flex gap-0.5 p-0.5 border border-outline-variant/40">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-secondary rounded-sm relative shadow-[0_0_10px_rgba(76,215,246,0.6)]"
                      style={{ width: `${userProfile.xpProgress}%` }}
                    >
                      <div className="absolute right-0 top-0 bottom-0 w-1 bg-white shadow-[0_0_6px_#fff]"></div>
                    </div>
                  </div>
                  <div className="flex justify-between text-[11px] text-outline">
                    <span>{userProfile.currentXP}</span>
                    <span>{userProfile.nextLevelXP}</span>
                  </div>
                </div>

                {/* Quick Gamer Stats Bento */}
                <div className="grid grid-cols-3 gap-1.5 py-space-sm border-b border-outline-variant/30 text-center">
                  <div className="p-2 rounded bg-surface-container-low/70 border border-outline-variant/20 hover:border-primary/40 transition-colors">
                    <div className="text-rose-400 font-headline-sm text-title-md flex items-center justify-center gap-1">
                      <span className="material-symbols-outlined fill-icon text-body-md text-rose-400">
                        favorite
                      </span>
                      {userProfile.favoritesCount}
                    </div>
                    <div className="font-label-caps text-[10px] text-outline">Favorites</div>
                  </div>
                  <div className="p-2 rounded bg-surface-container-low/70 border border-outline-variant/20 hover:border-secondary/40 transition-colors">
                    <div className="text-secondary font-headline-sm text-title-md flex items-center justify-center gap-1">
                      <span className="material-symbols-outlined fill-icon text-body-md text-secondary">
                        sports_esports
                      </span>
                      {userProfile.gamesCount}
                    </div>
                    <div className="font-label-caps text-[10px] text-outline">Games</div>
                  </div>
                  <div className="p-2 rounded bg-surface-container-low/70 border border-outline-variant/20 hover:border-tertiary/40 transition-colors">
                    <div className="text-tertiary font-headline-sm text-title-md flex items-center justify-center gap-1">
                      <span className="material-symbols-outlined fill-icon text-body-md text-tertiary">
                        trophy
                      </span>
                      {userProfile.trophiesCount}
                    </div>
                    <div className="font-label-caps text-[10px] text-outline">Trophies</div>
                  </div>
                </div>

                {/* Popover CTAs */}
                <div className="pt-space-sm flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      navigate('/library');
                    }}
                    className="w-full py-2 px-space-md rounded bg-primary text-on-primary font-headline-sm text-body-sm font-semibold hover:shadow-[0_0_16px_rgba(208,188,255,0.5)] transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-body-md">sports_esports</span>
                    My Games Library
                  </button>
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      setIsSupabaseModalOpen(true);
                    }}
                    className="w-full py-2 px-space-md rounded bg-[#3ECF8E]/10 border border-[#3ECF8E]/30 hover:border-[#3ECF8E]/60 text-[#3ECF8E] font-body-sm text-body-sm transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4 text-[#3ECF8E]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M21.362 9.354H12V.396a.396.396 0 0 0-.716-.233L.863 13.914a.396.396 0 0 0 .317.632H12v8.958a.396.396 0 0 0 .716.233l10.421-13.751a.396.396 0 0 0-.317-.632z" />
                    </svg>
                    Supabase Cloud Database
                  </button>
                  <button
                    onClick={() => setIsProfileOpen(false)}
                    className="w-full py-2 px-space-md rounded bg-surface-container border border-outline-variant/40 hover:border-outline text-on-surface-variant hover:text-on-surface font-body-sm text-body-sm transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-body-md">lock</span>
                    Sign In / Switch Account
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}

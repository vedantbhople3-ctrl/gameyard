import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gamesData } from '../data/gamesData';

export default function LibraryPage({ globalSearchQuery }) {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All Games');
  const [searchQuery, setSearchQuery] = useState(globalSearchQuery || '');
  const [platformFilter, setPlatformFilter] = useState('all');
  const [packageFilter, setPackageFilter] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState('grid');
  const [favorites, setFavorites] = useState(['cyberpunk-2077', 'forza-horizon-5']);

  const categories = [
    { label: 'All Games (342)', value: 'All Games' },
    { label: 'Action & Adventure (84)', value: 'Action & Adventure' },
    { label: 'RPG & Open World (62)', value: 'RPG & Open World' },
    { label: 'Racing & Sim (31)', value: 'Racing & Sim' },
    { label: 'FPS & Tactical (48)', value: 'FPS & Tactical' },
    { label: 'Horror & Survival (26)', value: 'Horror & Survival' },
    { label: 'Strategy & RTS (35)', value: 'Strategy & RTS' },
    { label: 'Sports (18)', value: 'Sports' },
    { label: 'Indie & Mods (38)', value: 'Indie & Mods' }
  ];

  const toggleFav = (id, e) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  // Spotlights on library page
  const spotlightGames = [
    gamesData.find(g => g.id === 'cyberpunk-2077') || gamesData[1],
    gamesData.find(g => g.id === 'forza-horizon-5') || gamesData[0],
    gamesData.find(g => g.id === 'elden-ring') || gamesData[2]
  ];

  // Filtering logic
  const filteredGames = gamesData.filter(game => {
    const matchesSearch =
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.genres.some(g => g.toLowerCase().includes(searchQuery.toLowerCase())) ||
      game.metadata.developer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.metadata.publisher.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeCategory === 'All Games' ||
      game.category === activeCategory ||
      game.genres.some(g => activeCategory.toLowerCase().includes(g.toLowerCase()));

    const matchesPlatform =
      platformFilter === 'all' ||
      (platformFilter === 'win' && game.platform.toLowerCase().includes('pc')) ||
      (platformFilter === 'xbox' && game.platform.toLowerCase().includes('xbox')) ||
      (platformFilter === 'deck' && game.platformsList.some(p => p.toLowerCase().includes('deck')));

    const matchesPackage =
      packageFilter === 'all' || game.packageType === packageFilter;

    return matchesSearch && matchesCategory && matchesPlatform && matchesPackage;
  });

  // Sorting
  const sortedGames = [...filteredGames].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'recent') return b.id.localeCompare(a.id);
    if (sortBy === 'size') {
      const sizeA = parseInt(a.storage) || 0;
      const sizeB = parseInt(b.storage) || 0;
      return sizeA - sizeB;
    }
    return 0; // default popularity
  });

  return (
    <div className="flex-1 w-full max-w-[1600px] mx-auto px-4 md:px-space-xl py-space-lg space-y-space-xl">
      {/* Hero Header & Telemetry Stats Section */}
      <section className="space-y-space-md border-b border-outline-variant/20 pb-space-lg">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-sm">terminal</span>
              <span className="font-label-caps text-label-caps text-secondary uppercase">
                CATALOG TELEMETRY &amp; DATABASE
              </span>
            </div>
            <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight font-extrabold">
              GAMES LIBRARY
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
              Browse, filter, and inspect all 342 verified titles in the Gaming Yard catalog. Bypassed through Lua files &amp; 100% safe.
            </p>
          </div>

          {/* Telemetry Stats Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-surface-container-low/80 backdrop-blur-md p-3 rounded-lg border border-outline-variant/30">
            <div className="px-4 py-2 bg-surface-container/60 rounded border border-white/[0.04]">
              <span className="font-label-caps text-[10px] text-outline block">TOTAL TITLES</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="font-stat-counter text-stat-counter text-primary">342</span>
                <span className="font-label-caps text-[10px] text-secondary">GAMES</span>
              </div>
            </div>
            <div className="px-4 py-2 bg-surface-container/60 rounded border border-white/[0.04]">
              <span className="font-label-caps text-[10px] text-outline block">CATEGORIES</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="font-stat-counter text-stat-counter text-on-surface">18</span>
                <span className="font-label-caps text-[10px] text-outline">GENRES</span>
              </div>
            </div>
            <div className="px-4 py-2 bg-surface-container/60 rounded border border-white/[0.04]">
              <span className="font-label-caps text-[10px] text-outline block">WEEKLY UPDATES</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="font-stat-counter text-stat-counter text-secondary">+24</span>
                <span className="font-label-caps text-[10px] text-secondary">NEW</span>
              </div>
            </div>
            <div className="px-4 py-2 bg-surface-container/60 rounded border border-white/[0.04]">
              <span className="font-label-caps text-[10px] text-outline block">INTEGRITY CHECK</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="font-stat-counter text-stat-counter text-emerald-400">100%</span>
                <span className="font-label-caps text-[10px] text-emerald-400">LUA OK</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Row Spotlight / Featured Showcase */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary-container"></span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface tracking-normal font-bold">
              Spotlight Releases
            </h2>
            <span className="font-label-caps text-label-caps text-outline bg-surface-container px-2 py-0.5 rounded border border-outline-variant/30 text-[10px]">
              LUA ARCHITECTURE SHOWCASE
            </span>
          </div>
          <div className="flex items-center gap-1 text-on-surface-variant font-label-caps text-[11px]">
            <span>VERIFIED PERFORMANCE</span>
            <span className="material-symbols-outlined text-secondary text-sm">verified_user</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Spotlight 1: Cyberpunk 2077 */}
          {spotlightGames[0] && (
            <div className="group relative rounded-xl overflow-hidden bg-surface-container-low border border-outline-variant/40 hover:border-primary transition-all duration-300 shadow-[0_8px_24px_-4px_rgba(0,0,0,0.6)] hover:shadow-[0_0_20px_rgba(139,92,246,0.25)] flex flex-col justify-between">
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={spotlightGames[0].coverImage}
                  alt={spotlightGames[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-surface-container-low/40 to-transparent"></div>
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="font-label-caps text-[10px] bg-primary-container text-white px-2 py-1 rounded shadow-md flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">local_fire_department</span> Trending #1
                  </span>
                  <span className="font-label-caps text-[10px] bg-surface-container-lowest/80 text-secondary border border-secondary/40 px-2 py-1 rounded backdrop-blur-sm">
                    {spotlightGames[0].luaStatus}
                  </span>
                </div>
                <div className="absolute top-3 right-3 bg-surface-container-lowest/80 text-tertiary font-stat-counter text-body-sm px-2 py-0.5 rounded border border-outline-variant/40 flex items-center gap-1">
                  <span className="material-symbols-outlined text-tertiary text-xs">star</span> {spotlightGames[0].rating}
                </div>
              </div>
              <div className="p-4 pt-1 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between text-outline font-label-caps text-[11px] mb-1">
                    <span>{spotlightGames[0].genres.join(' / ')}</span>
                    <span>{spotlightGames[0].storage} Storage</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors font-bold">
                    {spotlightGames[0].fullTitle}
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 line-clamp-2">
                    {spotlightGames[0].libraryDescription}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-outline-variant/20 flex items-center justify-between">
                  <span className="font-label-caps text-[10px] text-secondary flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> 100% Lua Verified
                  </span>
                  <button
                    onClick={() => navigate(`/game/${spotlightGames[0].id}`)}
                    className="font-label-caps text-[11px] text-white bg-primary-container hover:bg-primary px-3 py-1.5 rounded transition-colors flex items-center gap-1 cursor-pointer font-semibold"
                  >
                    Explore Game Details <span className="material-symbols-outlined text-xs">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Spotlight 2: Forza Horizon 5 */}
          {spotlightGames[1] && (
            <div className="group relative rounded-xl overflow-hidden bg-surface-container-low border border-outline-variant/40 hover:border-secondary transition-all duration-300 shadow-[0_8px_24px_-4px_rgba(0,0,0,0.6)] hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] flex flex-col justify-between">
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={spotlightGames[1].coverImage}
                  alt={spotlightGames[1].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-surface-container-low/40 to-transparent"></div>
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="font-label-caps text-[10px] bg-secondary-container text-on-secondary-container font-bold px-2 py-1 rounded shadow-md flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">bolt</span> New Lua Bypass
                  </span>
                  <span className="font-label-caps text-[10px] bg-surface-container-lowest/80 text-primary border border-primary/40 px-2 py-1 rounded backdrop-blur-sm">
                    Demo Playable
                  </span>
                </div>
                <div className="absolute top-3 right-3 bg-surface-container-lowest/80 text-tertiary font-stat-counter text-body-sm px-2 py-0.5 rounded border border-outline-variant/40 flex items-center gap-1">
                  <span className="material-symbols-outlined text-tertiary text-xs">star</span> {spotlightGames[1].rating}
                </div>
              </div>
              <div className="p-4 pt-1 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between text-outline font-label-caps text-[11px] mb-1">
                    <span>{spotlightGames[1].genres.join(' / ')}</span>
                    <span>{spotlightGames[1].storage} Storage</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-secondary transition-colors font-bold">
                    {spotlightGames[1].fullTitle}
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 line-clamp-2">
                    {spotlightGames[1].libraryDescription}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-outline-variant/20 flex items-center justify-between">
                  <span className="font-label-caps text-[10px] text-secondary flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> 100% Lua Verified
                  </span>
                  <button
                    onClick={() => navigate(`/game/${spotlightGames[1].id}`)}
                    className="font-label-caps text-[11px] text-on-secondary bg-secondary-container hover:bg-secondary px-3 py-1.5 rounded transition-colors flex items-center gap-1 font-semibold cursor-pointer"
                  >
                    Explore Game Details <span className="material-symbols-outlined text-xs">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Spotlight 3: Elden Ring */}
          {spotlightGames[2] && (
            <div className="group relative rounded-xl overflow-hidden bg-surface-container-low border border-outline-variant/40 hover:border-primary transition-all duration-300 shadow-[0_8px_24px_-4px_rgba(0,0,0,0.6)] hover:shadow-[0_0_20px_rgba(139,92,246,0.25)] flex flex-col justify-between">
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={spotlightGames[2].coverImage}
                  alt={spotlightGames[2].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-surface-container-low/40 to-transparent"></div>
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="font-label-caps text-[10px] bg-tertiary-container text-white px-2 py-1 rounded shadow-md flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">award_star</span> Community Favorite
                  </span>
                  <span className="font-label-caps text-[10px] bg-surface-container-lowest/80 text-secondary border border-secondary/40 px-2 py-1 rounded backdrop-blur-sm">
                    {spotlightGames[2].luaStatus}
                  </span>
                </div>
                <div className="absolute top-3 right-3 bg-surface-container-lowest/80 text-tertiary font-stat-counter text-body-sm px-2 py-0.5 rounded border border-outline-variant/40 flex items-center gap-1">
                  <span className="material-symbols-outlined text-tertiary text-xs">star</span> {spotlightGames[2].rating}
                </div>
              </div>
              <div className="p-4 pt-1 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between text-outline font-label-caps text-[11px] mb-1">
                    <span>{spotlightGames[2].genres.join(' / ')}</span>
                    <span>{spotlightGames[2].storage} Storage</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors font-bold">
                    {spotlightGames[2].fullTitle}
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 line-clamp-2">
                    {spotlightGames[2].libraryDescription}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-outline-variant/20 flex items-center justify-between">
                  <span className="font-label-caps text-[10px] text-secondary flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> 100% Lua Verified
                  </span>
                  <button
                    onClick={() => navigate(`/game/${spotlightGames[2].id}`)}
                    className="font-label-caps text-[11px] text-white bg-primary-container hover:bg-primary px-3 py-1.5 rounded transition-colors flex items-center gap-1 cursor-pointer font-semibold"
                  >
                    Explore Game Details <span className="material-symbols-outlined text-xs">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Comprehensive Filter & Search Toolbar Console */}
      <section className="space-y-4 bg-surface-container-low/70 backdrop-blur-md p-4 lg:p-6 rounded-xl border border-outline-variant/30">
        {/* Search Input Bar */}
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-secondary text-xl">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, publisher, engine, or tag (e.g. 'Unreal Engine 5', 'Rockstar', 'Lua Hotfix')..."
            className="w-full pl-12 pr-4 py-3 bg-surface-container-lowest border border-outline-variant/50 rounded-lg text-on-surface placeholder:text-outline font-body-md text-body-md focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 shadow-[inset_0_2px_6px_rgba(0,0,0,0.6)] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          )}
        </div>

        {/* Genre Quick-Filter Tabs (Horizontal Scrollable) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar text-nowrap">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`font-label-caps text-[11px] px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                activeCategory === cat.value
                  ? "bg-primary text-on-primary shadow-[0_0_12px_rgba(208,188,255,0.3)] font-semibold"
                  : "bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high border border-outline-variant/30"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Secondary Filter Controls Bar */}
        <div className="pt-3 border-t border-outline-variant/20 flex flex-wrap items-center justify-between gap-4">
          {/* Left group: Selects */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Platform Filter */}
            <div className="flex items-center gap-1.5 bg-surface-container-lowest border border-outline-variant/40 rounded px-2.5 py-1 text-on-surface font-body-sm text-body-sm">
              <span className="material-symbols-outlined text-outline text-base">desktop_windows</span>
              <label className="text-outline text-xs">Platform:</label>
              <select
                value={platformFilter}
                onChange={(e) => setPlatformFilter(e.target.value)}
                className="bg-transparent border-none text-on-surface font-body-sm text-body-sm focus:ring-0 p-0 pr-6 cursor-pointer"
              >
                <option className="bg-surface-container" value="all">All Platforms</option>
                <option className="bg-surface-container" value="win">PC Windows (DirectX 12)</option>
                <option className="bg-surface-container" value="deck">Steam Deck (Proton Lua)</option>
                <option className="bg-surface-container" value="xbox">Xbox App / GamePass</option>
              </select>
            </div>

            {/* File Package Type Filter */}
            <div className="flex items-center gap-1.5 bg-surface-container-lowest border border-outline-variant/40 rounded px-2.5 py-1 text-on-surface font-body-sm text-body-sm">
              <span className="material-symbols-outlined text-secondary text-base">code</span>
              <label className="text-outline text-xs">Package:</label>
              <select
                value={packageFilter}
                onChange={(e) => setPackageFilter(e.target.value)}
                className="bg-transparent border-none text-on-surface font-body-sm text-body-sm focus:ring-0 p-0 pr-6 cursor-pointer"
              >
                <option className="bg-surface-container" value="all">Lua Script Bypassed</option>
                <option className="bg-surface-container" value="full">Full Release + Lua</option>
                <option className="bg-surface-container" value="demo">Demo / Benchmark</option>
              </select>
            </div>

            {/* Sort Filter */}
            <div className="flex items-center gap-1.5 bg-surface-container-lowest border border-outline-variant/40 rounded px-2.5 py-1 text-on-surface font-body-sm text-body-sm">
              <span className="material-symbols-outlined text-outline text-base">sort</span>
              <label className="text-outline text-xs">Sort:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-none text-on-surface font-body-sm text-body-sm focus:ring-0 p-0 pr-6 cursor-pointer"
              >
                <option className="bg-surface-container" value="popular">Most Popular</option>
                <option className="bg-surface-container" value="rating">Highest Rated</option>
                <option className="bg-surface-container" value="recent">Recently Added</option>
                <option className="bg-surface-container" value="size">Size: Low to High</option>
              </select>
            </div>
          </div>

          {/* Right group: View Switch & Fast Results Telemetry */}
          <div className="flex items-center gap-4">
            <div className="font-label-caps text-label-caps text-outline">
              SHOWING <span className="text-secondary font-bold">{sortedGames.length} OF 342</span> ENTRIES
            </div>
            <div className="flex items-center bg-surface-container-lowest border border-outline-variant/40 rounded p-0.5">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1 rounded ${viewMode === 'grid' ? 'bg-surface-container-high text-secondary' : 'text-outline hover:text-on-surface'}`}
                title="Grid View"
              >
                <span className="material-symbols-outlined text-base">grid_view</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1 rounded ${viewMode === 'list' ? 'bg-surface-container-high text-secondary' : 'text-outline hover:text-on-surface'}`}
                title="List View"
              >
                <span className="material-symbols-outlined text-base">view_list</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Games Grid (16 Verified AAA & Standout Titles) */}
      <section className="space-y-6">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedGames.map((game) => (
              <div
                key={game.id}
                onClick={() => navigate(`/game/${game.id}`)}
                className="bg-surface-container-low border border-outline-variant/30 rounded-xl overflow-hidden hover:border-secondary transition-all duration-200 group flex flex-col justify-between shadow-[0_8px_20px_-4px_rgba(0,0,0,0.5)] cursor-pointer"
              >
                <div>
                  <div className="relative h-44 w-full overflow-hidden">
                    <img
                      src={game.coverImage}
                      alt={game.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low to-transparent"></div>
                    <div className="absolute top-2.5 left-2.5">
                      <span className="font-label-caps text-[10px] bg-surface-container-lowest/90 text-secondary border border-secondary/40 px-2 py-0.5 rounded backdrop-blur-sm">
                        {game.luaStatus}
                      </span>
                    </div>
                    <button
                      onClick={(e) => toggleFav(game.id, e)}
                      className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-surface-container-lowest/80 text-outline hover:text-rose-400 hover:scale-110 flex items-center justify-center transition-all cursor-pointer"
                    >
                      <span className={`material-symbols-outlined text-sm ${favorites.includes(game.id) ? 'fill-icon text-rose-400' : ''}`}>
                        favorite
                      </span>
                    </button>
                    <div className="absolute bottom-2 left-2.5 flex items-center gap-2">
                      <span className="font-label-caps text-[10px] bg-surface-variant/90 text-on-surface px-1.5 py-0.5 rounded">
                        {game.storage}
                      </span>
                      <span className="font-label-caps text-[10px] bg-secondary-container/20 text-secondary border border-secondary/30 px-1.5 py-0.5 rounded">
                        {game.safeBadge}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-label-caps text-[11px] text-outline">
                        {game.genres.slice(0, 2).join(' / ')}
                      </span>
                      <div className="flex items-center text-tertiary text-xs gap-0.5">
                        <span className="material-symbols-outlined text-xs">star</span> {game.rating}
                      </div>
                    </div>
                    <h4 className="font-headline-sm text-body-lg font-bold text-on-surface group-hover:text-secondary transition-colors">
                      {game.title}
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                      {game.libraryDescription || game.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <button
                    onClick={() => navigate(`/game/${game.id}`)}
                    className="w-full block text-center py-2 rounded bg-surface-container-high hover:bg-secondary-container hover:text-on-secondary-container text-on-surface font-label-caps text-[11px] border border-outline-variant/40 transition-colors font-semibold cursor-pointer"
                  >
                    Explore Game Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List View Mode */
          <div className="space-y-3">
            {sortedGames.map((game) => (
              <div
                key={game.id}
                onClick={() => navigate(`/game/${game.id}`)}
                className="bg-surface-container-low border border-outline-variant/30 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-secondary transition-all cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={game.coverImage}
                    alt={game.title}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-headline-sm text-title-md font-bold text-on-surface hover:text-secondary">
                        {game.title}
                      </h4>
                      <span className="px-2 py-0.5 rounded bg-secondary/15 text-secondary text-[10px] font-label-caps">
                        {game.luaStatus}
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-outline mt-1 line-clamp-1">
                      {game.shortDescription}
                    </p>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-outline">
                      <span>{game.genres.join(', ')}</span>
                      <span>•</span>
                      <span>{game.storage}</span>
                      <span>•</span>
                      <span className="text-amber-400 flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-xs">star</span> {game.rating}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => toggleFav(game.id, e)}
                    className="p-2 rounded bg-surface-container hover:bg-surface-container-high text-outline"
                  >
                    <span className={`material-symbols-outlined text-body-md ${favorites.includes(game.id) ? 'fill-icon text-rose-400' : ''}`}>
                      favorite
                    </span>
                  </button>
                  <button
                    onClick={() => navigate(`/game/${game.id}`)}
                    className="px-4 py-2 rounded bg-primary text-on-primary font-headline-sm text-body-sm font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    Details <span className="material-symbols-outlined text-xs">arrow_forward</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Pagination & Catalog Index Footer */}
      <section className="border-t border-outline-variant/20 pt-space-md flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-on-surface-variant font-body-sm text-body-sm">
          <span>
            Showing <strong className="text-secondary">{sortedGames.length}</strong> of <strong className="text-on-surface">342</strong> verified games
          </span>
          <span className="text-outline">|</span>
          <div className="flex items-center gap-1.5">
            <label className="text-outline text-xs">Per page:</label>
            <select className="bg-surface-container-lowest border border-outline-variant/40 rounded px-2 py-0.5 text-on-surface text-xs focus:ring-0">
              <option value="16">16</option>
              <option value="32">32</option>
              <option value="64">64</option>
            </select>
          </div>
        </div>

        {/* Pagination Buttons */}
        <div className="flex items-center gap-1.5 font-label-caps text-label-caps">
          <button className="px-3 py-1.5 rounded bg-surface-container border border-outline-variant/30 text-outline hover:text-on-surface hover:bg-surface-container-high transition-colors">
            ← PREV
          </button>
          <button className="px-3 py-1.5 rounded bg-primary text-on-primary font-bold shadow-[0_0_10px_rgba(208,188,255,0.3)]">
            1
          </button>
          <button className="px-3 py-1.5 rounded bg-surface-container border border-outline-variant/30 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors">
            2
          </button>
          <button className="px-3 py-1.5 rounded bg-surface-container border border-outline-variant/30 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors">
            3
          </button>
          <span className="px-2 text-outline">...</span>
          <button className="px-3 py-1.5 rounded bg-surface-container border border-outline-variant/30 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors">
            22
          </button>
          <button className="px-3 py-1.5 rounded bg-surface-container-high border border-outline-variant/40 text-secondary hover:bg-secondary-container hover:text-on-secondary-container transition-colors">
            NEXT →
          </button>
        </div>
      </section>
    </div>
  );
}

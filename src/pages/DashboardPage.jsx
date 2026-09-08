import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gamesData, newsArticles } from '../data/gamesData';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const [selectedGenre, setSelectedGenre] = useState('All Games');
  const [searchFilter, setSearchFilter] = useState('');
  const [sortBy, setSortBy] = useState('Popularity');
  const [favorites, setFavorites] = useState(['cyberpunk-2077', 'baldurs-gate-3']);

  // Hero games list
  const heroGames = [
    gamesData.find(g => g.id === 'cyberpunk-2077') || gamesData[1],
    gamesData.find(g => g.id === 'red-dead-redemption-2') || gamesData[3],
    gamesData.find(g => g.id === 'elden-ring') || gamesData[2],
    gamesData.find(g => g.id === 'forza-horizon-5') || gamesData[0]
  ];

  const currentHero = heroGames[activeHeroIndex] || heroGames[0];

  const toggleFav = (id, e) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  // Trending section (4 titles from Stitch design)
  const trendingGames = [
    gamesData.find(g => g.id === 'grand-theft-auto-v') || gamesData[4],
    gamesData.find(g => g.id === 'red-dead-redemption-2') || gamesData[3],
    gamesData.find(g => g.id === 'elden-ring') || gamesData[2],
    gamesData.find(g => g.id === 'forza-horizon-5') || gamesData[0]
  ];

  // Explore games section (first 8 games from Stitch design)
  const exploreGamesList = [
    gamesData.find(g => g.id === 'forza-horizon-5') || gamesData[0],
    gamesData.find(g => g.id === 'cyberpunk-2077') || gamesData[1],
    gamesData.find(g => g.id === 'starfield') || gamesData[5],
    gamesData.find(g => g.id === 'apex-legends') || gamesData[8],
    gamesData.find(g => g.id === 'baldurs-gate-3') || gamesData[6],
    gamesData.find(g => g.id === 'resident-evil-4') || gamesData[7],
    gamesData.find(g => g.id === 'doom-eternal') || gamesData[8],
    gamesData.find(g => g.id === 'halo-infinite') || gamesData[11]
  ];

  const genres = ['All Games', 'Action', 'RPG', 'Racing', 'FPS', 'Adventure', 'Strategy'];

  const filteredExploreGames = exploreGamesList.filter(game => {
    if (!game) return false;
    const matchesSearch = game.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
                          game.genres.some(g => g.toLowerCase().includes(searchFilter.toLowerCase()));
    if (selectedGenre === 'All Games') return matchesSearch;
    return matchesSearch && game.genres.some(g => g.toLowerCase().includes(selectedGenre.toLowerCase()));
  });

  return (
    <div className="relative z-10 max-w-[1600px] mx-auto px-4 md:px-space-xl space-y-space-3xl pb-space-3xl">
      {/* ========================================================================= */}
      {/* SECTION 1: HERO / FEATURED SPOTLIGHT */}
      {/* ========================================================================= */}
      <section className="relative rounded-2xl overflow-hidden border border-outline-variant/40 shadow-[0_12px_40px_rgba(0,0,0,0.85)] mt-space-md group">
        {/* High Performance Hero Backdrop */}
        <div className="relative w-full h-[540px] lg:h-[640px] overflow-hidden">
          <img
            src={currentHero.heroImage}
            alt={currentHero.title}
            className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-1000 ease-out"
          />
          {/* Multi-layered Gradients & HUD Grid Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40 z-10"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(6,182,212,0.15),transparent_60%)] z-10 pointer-events-none"></div>
        </div>

        {/* Hero Content Anchor */}
        <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 md:p-space-2xl pointer-events-none">
          {/* Top Status Tags */}
          <div className="flex items-center gap-space-xs pointer-events-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-secondary/15 border border-secondary/50 text-secondary font-label-caps text-label-caps tracking-wider backdrop-blur-md shadow-[0_0_12px_rgba(6,182,212,0.3)]">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-ping"></span>
              FEATURED SPOTLIGHT
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded bg-surface-container-highest/60 border border-outline-variant/40 text-on-surface-variant font-label-caps text-label-caps backdrop-blur-md">
              <span className="material-symbols-outlined text-xs text-primary">verified</span>
              {currentHero.awards}
            </span>
          </div>

          {/* Center / Bottom Headline & Telemetry */}
          <div className="max-w-3xl space-y-space-md pointer-events-auto">
            <div className="space-y-space-xs">
              <p className="text-secondary font-label-caps text-label-caps tracking-widest uppercase">
                {currentHero.tagline}
              </p>
              <h1 className="font-display-hero text-headline-xl sm:text-display-hero text-on-surface font-extrabold tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)] leading-tight">
                {currentHero.fullTitle}
              </h1>
            </div>

            {/* Metadata Badges Strip */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-on-surface-variant font-body-sm text-body-sm">
              <div className="flex items-center gap-1 px-2 py-1 rounded bg-surface-container-high/80 border border-outline-variant/40 text-tertiary">
                <span className="material-symbols-outlined fill-icon text-body-md text-amber-400">star</span>
                <span className="font-semibold text-on-surface">{currentHero.rating}</span>
                <span className="text-outline text-xs">({currentHero.reviewsCount})</span>
              </div>
              {currentHero.genres.map((g, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded bg-surface-container-low/70 border border-outline-variant/30 text-on-surface">
                  {g}
                </span>
              ))}
              <span className="px-2.5 py-1 rounded bg-primary/10 border border-primary/40 text-primary font-medium flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">bolt</span>
                {currentHero.verifiedStatus}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-space-md pt-space-xs">
              <button
                onClick={() => navigate(`/game/${currentHero.id}`)}
                className="px-space-xl py-3 rounded bg-primary text-on-primary font-headline-sm text-title-md font-semibold tracking-wide shadow-[0_0_20px_rgba(208,188,255,0.45)] hover:shadow-[0_0_30px_rgba(208,188,255,0.7)] hover:bg-primary-fixed transition-all duration-200 active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-headline-sm">sports_esports</span>
                View Game Details
              </button>
              <button
                onClick={(e) => toggleFav(currentHero.id, e)}
                className="px-space-lg py-3 rounded bg-surface-container-low/70 hover:bg-surface-container border border-outline-variant/60 hover:border-secondary/60 text-on-surface font-title-md text-title-md backdrop-blur-md transition-all duration-200 active:scale-95 flex items-center gap-2 group/fav cursor-pointer"
              >
                <span className={`material-symbols-outlined text-rose-400 ${favorites.includes(currentHero.id) ? 'fill-icon' : ''}`}>
                  favorite
                </span>
                {favorites.includes(currentHero.id) ? 'Favorited' : 'Favorite'}
              </button>
            </div>
          </div>

          {/* Bottom Row: Telemetry Switcher Indicators */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-space-md border-t border-outline-variant/20 pointer-events-auto">
            <div className="flex items-center gap-space-sm text-body-sm text-outline">
              <span className="material-symbols-outlined text-secondary text-body-md animate-spin" style={{ animationDuration: '8s' }}>
                sync
              </span>
              <span>DLSS 3.5 &amp; Frame Generation Certified</span>
            </div>
            {/* Mini Hero Switcher Indicators */}
            <div className="flex items-center gap-2 bg-surface-container-lowest/80 backdrop-blur-md p-1.5 rounded-lg border border-outline-variant/40">
              {heroGames.map((game, idx) => {
                const isActive = idx === activeHeroIndex;
                return (
                  <button
                    key={game.id}
                    onClick={() => setActiveHeroIndex(idx)}
                    className={`px-3 py-1 rounded font-label-caps text-[11px] transition-all cursor-pointer ${
                      isActive
                        ? 'bg-secondary/20 border border-secondary text-secondary shadow-[0_0_10px_rgba(76,215,246,0.3)] flex items-center gap-1.5'
                        : 'hover:bg-surface-container-high text-outline hover:text-on-surface'
                    }`}
                  >
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>}
                    {game.title}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: TRENDING NOW (🔥) */}
      {/* ========================================================================= */}
      <section className="space-y-space-lg" id="trending">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-outline-variant/30 pb-space-sm">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-tertiary font-headline-lg text-headline-lg">🔥</span>
              <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight">
                TRENDING NOW
              </h2>
            </div>
            <p className="font-body-md text-body-md text-outline">
              Most played and discussed titles this week across global telemetry networks
            </p>
          </div>
          <Link
            to="/library"
            className="inline-flex items-center gap-1 text-secondary hover:text-secondary-fixed font-title-md text-title-md group transition-colors"
          >
            <span>View All</span>
            <span className="material-symbols-outlined text-body-md group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </Link>
        </div>

        {/* 4 High-Impact Trending Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-lg">
          {trendingGames.map((game) => (
            <div
              key={game.id}
              onClick={() => navigate(`/game/${game.id}`)}
              className="group relative rounded-xl bg-surface-container-low border border-outline-variant/40 overflow-hidden hover:border-primary/80 hover:shadow-[0_8px_30px_rgba(208,188,255,0.25)] transition-all duration-300 flex flex-col cursor-pointer"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={game.coverImage}
                  alt={game.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-black/40"></div>
                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 font-label-caps text-label-caps flex items-center gap-1 backdrop-blur-md text-[10px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  {game.verifiedStatus || "Online Active"}
                </span>
                <button
                  onClick={(e) => toggleFav(game.id, e)}
                  className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-surface-container-lowest/70 border border-outline-variant/40 flex items-center justify-center text-outline hover:text-rose-400 transition-colors backdrop-blur-sm active:scale-90"
                  title="Favorite"
                >
                  <span className={`material-symbols-outlined text-body-md ${favorites.includes(game.id) ? 'fill-icon text-rose-400' : ''}`}>
                    favorite
                  </span>
                </button>
                <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400 font-stat-counter text-body-sm">
                    <span className="material-symbols-outlined fill-icon text-body-sm text-amber-400">star</span>
                    <span className="font-semibold text-on-surface">{game.rating}</span>
                  </div>
                  <span className="font-label-caps text-label-caps text-on-surface-variant bg-surface-container-highest/80 px-2 py-0.5 rounded border border-outline-variant/30 text-[10px]">
                    {game.genres.slice(0, 2).join(' / ')}
                  </span>
                </div>
              </div>
              <div className="p-space-md flex-1 flex flex-col justify-between space-y-space-sm">
                <div>
                  <h3 className="font-headline-sm text-title-md font-bold text-on-surface group-hover:text-primary transition-colors">
                    {game.title}
                  </h3>
                  <p className="font-body-sm text-body-sm text-outline mt-1 line-clamp-2">
                    {game.shortDescription}
                  </p>
                </div>
                <div className="pt-2 border-t border-outline-variant/20 flex items-center justify-between">
                  <span className="text-xs text-secondary font-semibold font-label-caps uppercase tracking-wider">
                    {game.reviewsCount}
                  </span>
                  <button
                    className="p-1.5 rounded bg-surface-container hover:bg-primary hover:text-on-primary text-outline transition-colors"
                    title="Quick View"
                  >
                    <span className="material-symbols-outlined text-body-md">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: LATEST GAMING NEWS (📰) */}
      {/* ========================================================================= */}
      <section className="space-y-space-lg" id="news">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-outline-variant/30 pb-space-sm">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-secondary font-headline-lg text-headline-lg">📰</span>
              <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight">
                LATEST GAMING NEWS
              </h2>
            </div>
            <p className="font-body-md text-body-md text-outline">
              Verified telemetry dispatches, leak investigations, and developer engine spotlights
            </p>
          </div>
          <a
            href="#news"
            className="inline-flex items-center gap-1 text-primary hover:text-primary-fixed font-title-md text-title-md group transition-colors"
          >
            <span>View All Stories</span>
            <span className="material-symbols-outlined text-body-md group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </a>
        </div>

        {/* 3 Rich News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
          {newsArticles.map((article) => (
            <article
              key={article.id}
              className="group rounded-xl bg-surface-container-low/80 border border-outline-variant/40 overflow-hidden hover:border-primary/70 hover:shadow-[0_8px_24px_rgba(0,0,0,0.7)] transition-all duration-300 flex flex-col cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent"></div>
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-0.5 rounded bg-primary-container/40 border border-primary/50 text-primary font-label-caps text-label-caps backdrop-blur-md text-[10px]">
                    {article.category}
                  </span>
                </div>
              </div>
              <div className="p-space-md flex-1 flex flex-col justify-between space-y-space-sm">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-outline font-body-sm text-body-sm">
                    <span className="flex items-center gap-1 text-secondary">
                      <span className="material-symbols-outlined text-xs">schedule</span>
                      {article.time}
                    </span>
                    <span>•</span>
                    <span>{article.source}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-outline">
                      <span className="material-symbols-outlined text-xs">visibility</span>
                      {article.reads}
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="font-body-md text-body-md text-outline line-clamp-3">
                    {article.summary}
                  </p>
                </div>
                <div className="pt-3 border-t border-outline-variant/20 flex items-center justify-between text-body-sm">
                  <span className="text-primary font-title-md text-body-md group-hover:underline">
                    Read Full Article
                  </span>
                  <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">
                    chevron_right
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: GAMES LIBRARY & EXPLORER (🎮) */}
      {/* ========================================================================= */}
      <section className="space-y-space-lg" id="library">
        {/* Section Title & Filter Console */}
        <div className="space-y-space-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-outline-variant/30 pb-space-sm">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-primary font-headline-lg text-headline-lg">🎮</span>
                <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight">
                  EXPLORE GAMES
                </h2>
              </div>
              <p className="font-body-md text-body-md text-outline">
                Master directory of certified builds, cloud benchmarks, and telemetry specs
              </p>
            </div>
            {/* Search Input Bar in Filter Area */}
            <div className="relative w-full md:w-96">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-body-md">
                search
              </span>
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Search games by title, genre, publisher..."
                className="w-full bg-surface-container-lowest border border-outline-variant/50 focus:border-secondary focus:ring-1 focus:ring-secondary/40 rounded-lg pl-10 pr-4 py-2 text-on-surface font-body-sm text-body-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] placeholder:text-outline transition-all outline-none"
              />
            </div>
          </div>

          {/* Filter Pills & Sort Selector Bento Bar */}
          <div className="flex flex-wrap items-center justify-between gap-space-sm bg-surface-container-low/70 p-2.5 rounded-xl border border-outline-variant/40 backdrop-blur-md">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5" id="genre-pills">
              {genres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => setSelectedGenre(genre)}
                  className={`px-3.5 py-1.5 rounded-lg font-headline-sm text-body-sm transition-all cursor-pointer ${
                    selectedGenre === genre
                      ? "bg-primary text-on-primary font-semibold shadow-[0_0_12px_rgba(208,188,255,0.4)]"
                      : "bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface border border-outline-variant/20"
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="font-label-caps text-label-caps text-outline uppercase hidden sm:inline">
                Sort by:
              </span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-surface-container-highest/80 border border-outline-variant/40 rounded-lg py-1.5 pl-3 pr-8 text-on-surface font-body-sm text-body-sm focus:border-secondary focus:ring-0 outline-none cursor-pointer"
                >
                  <option>Popularity ▼</option>
                  <option>Highest Rated</option>
                  <option>Release Date (Newest)</option>
                  <option>Title (A-Z)</option>
                </select>
                <span className="material-symbols-outlined absolute right-2 top-2 text-outline text-body-md pointer-events-none">
                  unfold_more
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Grid of 8 Game Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-lg">
          {filteredExploreGames.map((game) => (
            <div
              key={game.id}
              className="group rounded-xl bg-surface-container-low border border-outline-variant/40 overflow-hidden hover:border-secondary/80 hover:shadow-[0_8px_30px_rgba(76,215,246,0.2)] transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={game.coverImage}
                  alt={game.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-black/30"></div>
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded bg-secondary/20 border border-secondary/40 text-secondary font-label-caps text-[10px] uppercase backdrop-blur-md">
                    {game.genreBadge || game.genres[0]}
                  </span>
                </div>
                <div className="absolute top-2.5 right-2.5 flex items-center gap-1">
                  <span className="px-1.5 py-0.5 rounded bg-surface-container-lowest/80 text-outline text-[10px] font-label-caps">
                    {game.platform}
                  </span>
                </div>
              </div>

              <div className="p-space-md flex-1 flex flex-col justify-between space-y-space-sm">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-headline-sm text-title-md font-bold text-on-surface group-hover:text-secondary transition-colors">
                      {game.title}
                    </h3>
                    <div className="flex items-center gap-1 text-amber-400 font-stat-counter text-body-sm">
                      <span className="material-symbols-outlined fill-icon text-body-sm text-amber-400">star</span>
                      <span className="font-semibold text-on-surface">{game.rating}</span>
                    </div>
                  </div>
                  <p className="font-body-sm text-body-sm text-outline mt-1 line-clamp-2">
                    {game.shortDescription}
                  </p>
                </div>

                {/* Bottom Action Row */}
                <div className="pt-3 border-t border-outline-variant/20 flex items-center gap-2">
                  <button
                    onClick={(e) => toggleFav(game.id, e)}
                    className="p-2 rounded bg-surface-container hover:bg-surface-container-high text-outline hover:text-rose-400 transition-colors active:scale-95 cursor-pointer"
                    title="Favorite"
                  >
                    <span className={`material-symbols-outlined text-body-md ${favorites.includes(game.id) ? 'fill-icon text-rose-400' : ''}`}>
                      favorite
                    </span>
                  </button>
                  <button
                    onClick={() => navigate(`/game/${game.id}`)}
                    className="flex-1 py-2 px-3 rounded bg-secondary/15 hover:bg-secondary text-secondary hover:text-on-secondary border border-secondary/40 hover:border-secondary font-headline-sm text-body-sm font-semibold transition-all duration-200 active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Explore Details</span>
                    <span className="material-symbols-outlined text-body-sm">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination & Load More Telemetry Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-space-md rounded-xl bg-surface-container-low border border-outline-variant/30">
          <span className="font-body-sm text-body-sm text-outline">
            Showing <strong className="text-on-surface">{filteredExploreGames.length} of 342</strong> verified games in telemetry index
          </span>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 rounded bg-surface-container hover:bg-surface-container-high text-on-surface font-title-md text-body-sm border border-outline-variant/40 transition-colors">
              Previous
            </button>
            <button className="px-3 py-1.5 rounded bg-primary text-on-primary font-headline-sm text-body-sm font-bold">1</button>
            <button className="px-3 py-1.5 rounded hover:bg-surface-container text-outline hover:text-on-surface font-headline-sm text-body-sm transition-colors">2</button>
            <button className="px-3 py-1.5 rounded hover:bg-surface-container text-outline hover:text-on-surface font-headline-sm text-body-sm transition-colors">3</button>
            <Link
              to="/library"
              className="px-4 py-2 rounded bg-surface-container hover:bg-surface-container-high text-on-surface font-title-md text-body-sm border border-outline-variant/40 transition-colors inline-block"
            >
              Open Full Library →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

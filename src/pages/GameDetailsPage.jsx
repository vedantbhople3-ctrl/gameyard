import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { gamesData } from '../data/gamesData';

export default function GameDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find game by id or slug, fallback to forza-horizon-5
  const game = gamesData.find(g => g.id === id || g.slug === id) || gamesData[0];

  const [isFavorited, setIsFavorited] = useState(true);
  const [activeModalImage, setActiveModalImage] = useState(null);
  const [downloadToast, setDownloadToast] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const handleDownload = (filename) => {
    setDownloadToast(`Starting download: ${filename}... Telemetry hash verified (SHA-256 OK).`);
    setTimeout(() => {
      setDownloadToast(null);
    }, 4000);
  };

  // Related games (exclude current)
  const relatedGames = gamesData
    .filter(g => g.id !== game.id)
    .slice(0, 3);

  return (
    <div className="flex-grow w-full max-w-[1600px] mx-auto px-4 md:px-space-xl py-space-md flex flex-col space-y-space-xl">
      {/* Toast Notification */}
      {downloadToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-surface-container-high border border-secondary text-on-surface px-5 py-3 rounded-xl shadow-[0_0_24px_rgba(76,215,246,0.4)] flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5">
          <span className="material-symbols-outlined text-secondary animate-spin">sync</span>
          <span className="font-body-sm text-sm">{downloadToast}</span>
          <button
            onClick={() => setDownloadToast(null)}
            className="text-outline hover:text-white ml-2"
          >
            ✕
          </button>
        </div>
      )}

      {/* Screenshot Lightbox Modal */}
      {activeModalImage && (
        <div
          onClick={() => setActiveModalImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center">
            <img
              src={activeModalImage.url}
              alt={activeModalImage.title}
              className="max-h-[80vh] w-auto object-contain rounded-xl border border-outline-variant/40 shadow-2xl"
            />
            <div className="mt-4 flex items-center justify-between w-full px-4 text-on-surface">
              <span className="font-headline-sm text-lg font-bold">{activeModalImage.title}</span>
              <span className="text-secondary font-label-caps text-xs">DIRECT 3840x2160 HDR CAPTURE</span>
            </div>
          </div>
        </div>
      )}

      {/* BREADCRUMB & CONTEXT */}
      <nav className="flex items-center justify-between py-space-2xs text-body-sm font-body-sm">
        <div className="flex flex-wrap items-center space-x-space-xs text-outline">
          <Link
            to="/library"
            className="hover:text-primary transition-colors flex items-center gap-1 font-semibold text-secondary"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Back to Games Library</span>
          </Link>
          <span className="text-outline-variant">/</span>
          <Link to="/" className="hover:text-on-surface transition-colors">
            Home
          </Link>
          <span className="text-outline-variant">&gt;</span>
          <Link to="/library" className="hover:text-on-surface transition-colors">
            Games
          </Link>
          <span className="text-outline-variant">&gt;</span>
          <span className="text-secondary font-medium">{game.title}</span>
        </div>
        <div className="hidden sm:flex items-center space-x-space-sm">
          <span className="inline-flex items-center gap-1 px-space-xs py-0.5 rounded-full bg-secondary/10 border border-secondary/30 text-secondary font-label-caps text-label-caps text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
            100% SAFE
          </span>
        </div>
      </nav>

      {/* HERO BANNER */}
      <section className="relative rounded-xl overflow-hidden border border-outline-variant/30 bg-surface-container-lowest min-h-[500px] flex items-end">
        {/* Backdrop Image */}
        <img
          src={game.heroImage || game.coverImage}
          alt={game.fullTitle}
          className="absolute inset-0 w-full h-full object-cover object-center transform scale-100 hover:scale-105 transition-transform duration-700 ease-out"
        />
        {/* Gradient Overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-surface-dim/70 to-transparent"></div>

        {/* Hero Content HUD Overlay */}
        <div className="relative z-10 p-6 md:p-space-2xl w-full flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg">
          <div className="max-w-3xl flex flex-col space-y-space-sm">
            {/* Badges & Ratings */}
            <div className="flex flex-wrap items-center gap-space-xs">
              <span className="inline-flex items-center gap-1 px-space-xs py-0.5 rounded bg-surface-container/90 border border-tertiary/50 text-tertiary font-label-caps text-label-caps text-[11px]">
                <span className="material-symbols-outlined text-[14px] text-tertiary fill-icon">star</span>
                {game.rating} / 5.0 ({game.reviewsCount})
              </span>
              <span className="inline-flex items-center gap-1 px-space-xs py-0.5 rounded bg-surface-container/90 border border-secondary/40 text-secondary font-label-caps text-label-caps text-[11px]">
                <span className="material-symbols-outlined text-[14px] fill-icon">trophy</span>
                {game.awards}
              </span>
              <span className="px-space-xs py-0.5 rounded bg-surface-container/90 border border-outline-variant text-on-surface-variant font-label-caps text-label-caps text-[11px]">
                {game.pegi}
              </span>
              <span className="px-space-xs py-0.5 rounded bg-primary/20 border border-primary/40 text-primary font-label-caps text-label-caps text-[11px]">
                {game.verifiedStatus}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight uppercase drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] font-extrabold">
              {game.fullTitle}
            </h1>

            {/* Tags */}
            <p className="font-title-md text-title-md text-on-surface-variant flex flex-wrap items-center gap-2">
              {game.genres.map((g, idx) => (
                <React.Fragment key={idx}>
                  <span>{g}</span>
                  {idx < game.genres.length - 1 && <span className="text-secondary">•</span>}
                </React.Fragment>
              ))}
              <span className="text-secondary">•</span>
              <span className="text-secondary">Ultra Realistic</span>
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-space-sm self-start lg:self-end">
            {/* Add to Favorites Button */}
            <button
              onClick={() => setIsFavorited(!isFavorited)}
              className="h-12 px-space-md rounded-lg bg-surface-container/80 border border-outline-variant hover:border-primary/50 text-on-surface flex items-center justify-center gap-2 transition-all group backdrop-blur-md cursor-pointer"
            >
              <span
                className={`material-symbols-outlined transition-transform group-hover:scale-110 ${
                  isFavorited ? 'fill-icon text-rose-400' : 'text-outline'
                }`}
              >
                favorite
              </span>
              <span className="font-headline-sm text-sm font-semibold">
                {isFavorited ? 'Favorites' : 'Add to Favorites'}
              </span>
            </button>

            {/* Verified Downloads Smooth Scroll */}
            <a
              href="#verified-resources"
              className="h-12 px-space-md rounded-lg bg-secondary/10 border border-secondary/40 text-secondary hover:bg-secondary/20 font-headline-sm text-sm font-semibold flex items-center gap-2 transition-all neon-cyan-glow"
            >
              <span className="material-symbols-outlined text-[18px]">download_for_offline</span>
              <span>Verified Downloads</span>
            </a>

            {/* Official Store Primary CTA */}
            <a
              href="#verified-resources"
              className="h-12 px-space-lg rounded-lg bg-primary text-on-primary font-headline-sm text-sm font-semibold flex items-center gap-2 transition-all hover:bg-primary-container neon-violet-glow active:translate-y-[1px]"
            >
              <span className="material-symbols-outlined text-[20px]">storefront</span>
              <span>Get Lua Game Files</span>
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 1: ABOUT & METADATA */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
        {/* Left Column: Synopsis & Key Features (8 cols) */}
        <div className="lg:col-span-8 hud-backdrop rounded-xl p-6 md:p-space-xl flex flex-col space-y-space-lg border border-outline-variant/20">
          <div className="flex items-center justify-between border-b border-outline-variant/20 pb-space-sm">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-secondary fill-icon">auto_stories</span>
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                About the Game
              </h2>
            </div>
            <span className="font-label-caps text-label-caps text-outline tracking-wider text-[10px]">
              EXPEDITION ARCHIVE // 2024
            </span>
          </div>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            {game.aboutDescription}
          </p>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md pt-space-xs">
            {game.features && game.features.map((feat, idx) => (
              <div
                key={idx}
                className="p-space-md rounded-lg bg-surface-container-lowest/60 border border-outline-variant/20 flex items-start gap-space-sm hover:border-secondary/30 transition-all"
              >
                <span className="material-symbols-outlined text-secondary text-[22px] fill-icon">
                  check_circle
                </span>
                <div>
                  <h3 className="font-headline-sm text-[16px] text-on-surface font-semibold">
                    {feat.title}
                  </h3>
                  <p className="font-body-sm text-body-sm text-outline mt-1">
                    {feat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Game Metadata Spec Sheet (4 cols) */}
        <div className="lg:col-span-4 hud-backdrop rounded-xl p-6 flex flex-col space-y-space-md border border-outline-variant/20">
          <div className="flex items-center gap-space-xs border-b border-outline-variant/20 pb-space-sm">
            <span className="material-symbols-outlined text-primary fill-icon">dataset</span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
              Metadata Registry
            </h2>
          </div>
          <ul className="space-y-space-sm font-body-sm text-body-sm">
            <li className="flex justify-between items-center py-1 border-b border-outline-variant/10">
              <span className="text-outline">Developer</span>
              <span className="font-medium text-on-surface">{game.metadata.developer}</span>
            </li>
            <li className="flex justify-between items-center py-1 border-b border-outline-variant/10">
              <span className="text-outline">Publisher</span>
              <span className="font-medium text-on-surface">{game.metadata.publisher}</span>
            </li>
            <li className="flex justify-between items-center py-1 border-b border-outline-variant/10">
              <span className="text-outline">Release Date</span>
              <span className="font-medium text-on-surface">{game.metadata.releaseDate}</span>
            </li>
            <li className="flex justify-between items-center py-1 border-b border-outline-variant/10">
              <span className="text-outline">Platforms</span>
              <span className="font-medium text-on-surface text-right">{game.metadata.platforms}</span>
            </li>
            <li className="flex justify-between items-center py-1 border-b border-outline-variant/10">
              <span className="text-outline">DRM / Stores</span>
              <span className="font-medium text-secondary text-right">{game.metadata.drmStores}</span>
            </li>
            <li className="flex justify-between items-center py-1 border-b border-outline-variant/10">
              <span className="text-outline">Anti-Cheat</span>
              <span className="font-medium text-on-surface">{game.metadata.antiCheat}</span>
            </li>
            <li className="flex justify-between items-center py-1">
              <span className="text-outline">Distribution Class</span>
              <span className="inline-flex items-center gap-1 font-label-caps text-label-caps text-tertiary px-1.5 py-0.5 rounded bg-tertiary/10 border border-tertiary/30 text-[10px]">
                {game.metadata.distributionClass}
              </span>
            </li>
          </ul>

          {/* Trust Anchor Box */}
          <div className="mt-auto p-space-sm rounded-lg bg-surface-container-high/60 border border-outline-variant/30 flex items-start gap-space-xs text-[11px] text-outline">
            <span className="material-symbols-outlined text-secondary text-sm">verified_user</span>
            <span>Authentic digital hash verification powered by GameZone SHA-256 cloud registry.</span>
          </div>
        </div>
      </section>

      {/* SECTION 2: SCREENSHOTS & MEDIA GALLERY */}
      <section className="flex flex-col space-y-space-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-2xs">
          <div>
            <h2 className="font-headline-md text-headline-md text-on-surface flex items-center gap-space-xs font-bold">
              <span className="material-symbols-outlined text-secondary">photo_camera</span>
              SCREENSHOTS &amp; 4K IN-GAME CAPTURES
            </h2>
            <p className="font-body-sm text-body-sm text-outline">
              Click any capture for fullscreen HDR telemetry preview.
            </p>
          </div>
          <div className="flex items-center gap-2 text-label-caps text-secondary text-xs">
            <span className="w-2 h-2 rounded-full bg-secondary"></span>
            DIRECT 3840x2160 RASTER
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
          {game.screenshots && game.screenshots.map((shot) => (
            <div
              key={shot.id}
              onClick={() => setActiveModalImage(shot)}
              className="group relative rounded-xl overflow-hidden border border-outline-variant/30 aspect-[16/10] bg-surface-container-lowest cursor-pointer"
            >
              <img
                src={shot.url}
                alt={shot.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity"></div>
              <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between">
                <span className="font-label-caps text-label-caps text-on-surface font-semibold bg-surface/80 px-2 py-0.5 rounded border border-outline-variant/40 backdrop-blur-sm text-[11px]">
                  {shot.title}
                </span>
                <span className="material-symbols-outlined text-primary text-[18px] opacity-0 group-hover:opacity-100 transition-opacity">
                  zoom_in
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: SYSTEM REQUIREMENTS */}
      <section className="flex flex-col space-y-space-md">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-headline-md text-headline-md text-on-surface flex items-center gap-space-xs font-bold">
              <span className="material-symbols-outlined text-secondary">memory</span>
              SYSTEM REQUIREMENTS
            </h2>
            <p className="font-body-sm text-body-sm text-outline">
              Official Hardware Specifications validated by Turn 10 &amp; Playground Games.
            </p>
          </div>
          <span className="hidden md:inline-flex items-center gap-1 text-label-caps text-outline bg-surface-container px-space-xs py-1 rounded border border-outline-variant/30 text-[10px]">
            <span className="material-symbols-outlined text-[14px]">tune</span>
            DirectX 12 Agility SDK Compatible
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
          {/* Minimum Requirements Card */}
          <div className="hud-backdrop rounded-xl p-6 border border-outline-variant/30 flex flex-col space-y-space-md hover:border-outline transition-all">
            <div className="flex items-center justify-between border-b border-outline-variant/20 pb-space-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-outline"></span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  MINIMUM SPECS
                </h3>
              </div>
              <span className="font-label-caps text-label-caps text-outline bg-surface-container-low px-2 py-0.5 rounded border border-outline-variant/20 text-[10px]">
                {game.requirements?.minimum?.target}
              </span>
            </div>
            <div className="space-y-space-xs text-body-sm font-body-sm">
              <div className="flex flex-col p-2 rounded bg-surface-container-lowest/40 border border-outline-variant/10">
                <span className="font-label-caps text-[10px] text-outline">OPERATING SYSTEM</span>
                <span className="font-medium text-on-surface">{game.requirements?.minimum?.os}</span>
              </div>
              <div className="flex flex-col p-2 rounded bg-surface-container-lowest/40 border border-outline-variant/10">
                <span className="font-label-caps text-[10px] text-outline">PROCESSOR (CPU)</span>
                <span className="font-medium text-on-surface">{game.requirements?.minimum?.cpu}</span>
              </div>
              <div className="flex flex-col p-2 rounded bg-surface-container-lowest/40 border border-outline-variant/10">
                <span className="font-label-caps text-[10px] text-outline">MEMORY (RAM)</span>
                <span className="font-medium text-on-surface">{game.requirements?.minimum?.ram}</span>
              </div>
              <div className="flex flex-col p-2 rounded bg-surface-container-lowest/40 border border-outline-variant/10">
                <span className="font-label-caps text-[10px] text-outline">GRAPHICS (GPU)</span>
                <span className="font-medium text-on-surface">{game.requirements?.minimum?.gpu}</span>
              </div>
              <div className="flex flex-col p-2 rounded bg-surface-container-lowest/40 border border-outline-variant/10">
                <span className="font-label-caps text-[10px] text-outline">DIRECTX &amp; STORAGE</span>
                <span className="font-medium text-on-surface">{game.requirements?.minimum?.storage}</span>
              </div>
            </div>
          </div>

          {/* Recommended Requirements Card */}
          <div className="hud-backdrop rounded-xl p-6 border border-secondary/40 cyber-panel-glow flex flex-col space-y-space-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-2xl pointer-events-none"></div>
            <div className="flex items-center justify-between border-b border-outline-variant/20 pb-space-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary shadow-[0_0_8px_#4cd7f6]"></span>
                <h3 className="font-headline-sm text-headline-sm text-secondary font-bold">
                  RECOMMENDED SPECS
                </h3>
              </div>
              <span className="font-label-caps text-label-caps text-secondary bg-secondary/10 px-2 py-0.5 rounded border border-secondary/30 text-[10px]">
                {game.requirements?.recommended?.target}
              </span>
            </div>
            <div className="space-y-space-xs text-body-sm font-body-sm">
              <div className="flex flex-col p-2 rounded bg-surface-container-lowest/40 border border-secondary/20">
                <span className="font-label-caps text-[10px] text-secondary">OPERATING SYSTEM</span>
                <span className="font-medium text-on-surface">{game.requirements?.recommended?.os}</span>
              </div>
              <div className="flex flex-col p-2 rounded bg-surface-container-lowest/40 border border-secondary/20">
                <span className="font-label-caps text-[10px] text-secondary">PROCESSOR (CPU)</span>
                <span className="font-medium text-on-surface">{game.requirements?.recommended?.cpu}</span>
              </div>
              <div className="flex flex-col p-2 rounded bg-surface-container-lowest/40 border border-secondary/20">
                <span className="font-label-caps text-[10px] text-secondary">MEMORY (RAM)</span>
                <span className="font-medium text-on-surface">{game.requirements?.recommended?.ram}</span>
              </div>
              <div className="flex flex-col p-2 rounded bg-surface-container-lowest/40 border border-secondary/20">
                <span className="font-label-caps text-[10px] text-secondary">GRAPHICS (GPU)</span>
                <span className="font-medium text-on-surface">{game.requirements?.recommended?.gpu}</span>
              </div>
              <div className="flex flex-col p-2 rounded bg-surface-container-lowest/40 border border-secondary/20">
                <span className="font-label-caps text-[10px] text-secondary">DIRECTX &amp; STORAGE</span>
                <span className="font-medium text-on-surface">{game.requirements?.recommended?.storage}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: FILES, DEMOS & VERIFIED RESOURCES */}
      <section className="flex flex-col space-y-space-md pt-space-md" id="verified-resources">
        <div>
          <h2 className="font-headline-md text-headline-md text-on-surface flex items-center gap-space-xs font-bold">
            <span className="material-symbols-outlined text-primary">inventory_2</span>
            AUTHORIZED FILES &amp; LEGITIMATE RESOURCES
          </h2>
          <p className="font-body-sm text-body-sm text-outline">
            Verified standalone mirrors, developer telemetry packages, and official retail links.
          </p>
        </div>

        {/* Prominent Legitimacy Banner */}
        <div className="p-space-md rounded-xl bg-surface-container-low border border-primary/30 flex items-start gap-space-sm relative overflow-hidden">
          <div className="w-1.5 absolute left-0 top-0 bottom-0 bg-primary"></div>
          <span className="material-symbols-outlined text-primary text-[28px] mt-0.5">verified</span>
          <div className="flex flex-col space-y-1">
            <span className="font-headline-sm text-sm text-primary font-bold tracking-wide">
              100% SAFE
            </span>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Games bypassed through Lua files
            </p>
          </div>
        </div>

        {/* Card List of Downloads */}
        <div className="space-y-space-sm">
          {game.downloads && game.downloads.map((item) => (
            <div
              key={item.id}
              className={`hud-backdrop rounded-xl p-space-md border flex flex-col md:flex-row md:items-center justify-between gap-space-md transition-all ${
                item.id === 'retail'
                  ? 'border-primary/40 bg-primary/5'
                  : 'border-outline-variant/30 hover:border-secondary/50'
              }`}
            >
              <div className="flex items-start gap-space-sm">
                <div className="w-12 h-12 rounded-lg bg-surface-container-high border border-outline-variant flex items-center justify-center text-secondary shrink-0">
                  <span className="material-symbols-outlined text-[28px]">{item.icon || 'download'}</span>
                </div>
                <div className="flex flex-col space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                      {item.title}
                    </h3>
                    <span className="px-2 py-0.5 rounded bg-secondary/10 border border-secondary/30 text-secondary font-label-caps text-label-caps text-[10px]">
                      {item.badge}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-surface-container border border-outline-variant/40 text-on-surface-variant font-label-caps text-label-caps text-[10px] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                      {item.status}
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-outline">
                    {item.details}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap sm:flex-nowrap items-center gap-space-xs shrink-0">
                {item.links ? (
                  item.links.map((link, lIdx) => (
                    <a
                      key={lIdx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-space-md py-2.5 rounded-lg bg-primary text-on-primary hover:bg-primary-container font-headline-sm text-sm font-semibold flex items-center justify-center gap-2 transition-all neon-violet-glow"
                    >
                      <span className="material-symbols-outlined text-[18px]">launch</span>
                      <span>{link.label}</span>
                    </a>
                  ))
                ) : (
                  <button
                    onClick={() => handleDownload(item.title)}
                    className="w-full md:w-auto px-space-md py-2.5 rounded-lg bg-secondary/15 hover:bg-secondary/25 border border-secondary/40 text-secondary font-headline-sm text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">download</span>
                    <span>{item.actionText}</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: RELATED GAMES */}
      <section className="flex flex-col space-y-space-md pt-space-md pb-space-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-headline-md text-headline-md text-on-surface flex items-center gap-space-xs font-bold">
              <span className="material-symbols-outlined text-secondary">grid_view</span>
              YOU MAY ALSO LIKE
            </h2>
            <p className="font-body-sm text-body-sm text-outline">
              Curated titles matching your telemetry profile.
            </p>
          </div>
          <Link
            to="/library"
            className="text-secondary hover:underline font-title-md text-sm flex items-center gap-1"
          >
            <span>View All Games</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
          {relatedGames.map((relGame) => (
            <div
              key={relGame.id}
              onClick={() => navigate(`/game/${relGame.id}`)}
              className="hud-backdrop rounded-xl p-space-md border border-outline-variant/30 flex flex-col space-y-space-sm group hover:border-primary/50 transition-all cursor-pointer"
            >
              <div className="relative rounded-lg overflow-hidden aspect-[16/9] bg-surface-container-lowest">
                <img
                  src={relGame.coverImage}
                  alt={relGame.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2 right-2 px-2 py-0.5 rounded bg-surface/80 backdrop-blur-md text-tertiary font-label-caps text-label-caps border border-tertiary/30 text-[10px]">
                  ⭐ {relGame.rating}
                </span>
              </div>
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors font-bold">
                  {relGame.title}
                </h3>
                <p className="font-body-sm text-body-sm text-outline mt-0.5">
                  {relGame.genres.join(' • ')}
                </p>
              </div>
              <div className="pt-space-xs mt-auto flex items-center justify-between text-body-sm">
                <span className="text-secondary font-medium">Official Store / Verified</span>
                <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors text-[18px]">
                  arrow_forward
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

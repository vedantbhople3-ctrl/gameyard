import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function AuthPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine initial mode from pathname or search param
  const isInitialSignUp = location.pathname === '/signup' || new URLSearchParams(location.search).get('mode') === 'signup';
  const [mode, setMode] = useState(isInitialSignUp ? 'signup' : 'login');
  
  // Form State
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [syncTelegram, setSyncTelegram] = useState(true);
  const [rememberOrTerms, setRememberOrTerms] = useState(true);
  
  // Interactive UI states
  const [isLoading, setIsLoading] = useState(false);
  const [showTelegramModal, setShowTelegramModal] = useState(false);
  const [telegramCode, setTelegramCode] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  // Sync mode with route if changed
  useEffect(() => {
    if (location.pathname === '/signup') {
      setMode('signup');
    } else if (location.pathname === '/login') {
      setMode('login');
    }
  }, [location.pathname]);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ msg, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || (mode === 'signup' && !username)) {
      showToast('Please fill in all required credentials.', 'error');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showToast(
        mode === 'login'
          ? `Welcome back, ${email.split('@')[0]}! Telemetry connected.`
          : `Account ${username} created successfully! Welcome to Gaming Yard.`,
        'success'
      );
      setTimeout(() => {
        navigate('/');
      }, 1200);
    }, 900);
  };

  const handleTelegramInstantAuth = () => {
    setShowTelegramModal(true);
  };

  const handleVerifyTelegramCode = () => {
    if (!telegramCode || telegramCode.length < 4) {
      showToast('Please enter the 6-digit Telegram authentication pin.', 'error');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowTelegramModal(false);
      showToast('Telegram 2FA Identity verified! Session authenticated.', 'success');
      setTimeout(() => {
        navigate('/');
      }, 1000);
    }, 800);
  };

  return (
    <div className="min-h-[calc(100vh-140px)] w-full flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className={`fixed top-20 right-6 z-50 px-4 py-3 rounded-xl border shadow-2xl flex items-center gap-3 backdrop-blur-md transition-all animate-in fade-in slide-in-from-top-4 ${
          toastMessage.type === 'error'
            ? 'bg-rose-950/90 border-rose-500/50 text-rose-200'
            : 'bg-surface-container-high/95 border-secondary/50 text-secondary shadow-[0_0_20px_rgba(34,211,238,0.3)]'
        }`}>
          <span className="material-symbols-outlined text-sm">
            {toastMessage.type === 'error' ? 'error' : 'verified_user'}
          </span>
          <span className="text-xs font-mono font-medium">{toastMessage.msg}</span>
        </div>
      )}

      {/* Main Content Grid */}
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10">
        
        {/* Left Hero Banner / Telemetry Info (5 Cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-surface-container to-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
          <div className="absolute -right-16 -top-16 w-56 h-56 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -left-16 -bottom-16 w-56 h-56 bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>

          <div>
            {/* System Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high border border-outline-variant/40 text-[11px] font-mono text-purple-300 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              AUTH TELEMETRY ACTIVE
            </div>

            <h2 className="text-2xl sm:text-3xl font-headline-xl text-white tracking-tight mb-3 font-bold">
              Access The Underground <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Lua Files & Mods</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-body-sm leading-relaxed mb-6">
              Sync your save games, unlock 100% safe Lua script bypasses, download verified game packages, and chat directly with mod creators.
            </p>

            {/* Telegram Feature Highlight Box */}
            <div className="p-4 rounded-2xl bg-[#229ED9]/10 border border-[#229ED9]/30 mb-6 transition-all hover:border-[#229ED9]/50">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-[#229ED9]/20 text-[#229ED9] shrink-0">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.52 2.77-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-white font-title-md">Telegram Channel & Bot</h4>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded border border-emerald-500/30">ONLINE</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 font-body-sm">
                    Get real-time Lua updates, 2FA instant login codes, and direct support via Telegram.
                  </p>
                  <a
                    href="https://t.me/gamingyard"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#229ED9] hover:text-cyan-300 hover:underline mt-2 font-medium"
                  >
                    <span>Connect on Telegram</span>
                    <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Features List */}
            <ul className="space-y-3 text-xs text-slate-300 font-body-sm">
              <li className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-secondary text-sm shrink-0">check_circle</span>
                <span>Instant single-click Telegram 2-factor login</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-secondary text-sm shrink-0">check_circle</span>
                <span>Unlimited downloads of verified safe Lua scripts</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-secondary text-sm shrink-0">check_circle</span>
                <span>Encrypted member cloud sync & auto-updater</span>
              </li>
            </ul>
          </div>

          {/* Security Badge Footer in left col */}
          <div className="mt-8 pt-6 border-t border-outline-variant/30 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>SHA-256 ENCRYPTED</span>
            <span className="text-secondary font-semibold">v2.14 LUA ENGINE</span>
          </div>
        </div>

        {/* Right Auth Form Card (7 Cols) */}
        <div className="lg:col-span-7 bg-surface-container border border-outline-variant/40 rounded-3xl p-6 sm:p-10 shadow-2xl neon-border-glow flex flex-col justify-center">
          
          {/* Tab Switcher: Login vs Sign Up */}
          <div className="flex items-center justify-between bg-surface-dim p-1.5 rounded-2xl border border-outline-variant/30 mb-8">
            <button
              type="button"
              onClick={() => setMode('login')}
              className={`w-1/2 py-2.5 rounded-xl font-medium text-sm transition-all ${
                mode === 'login'
                  ? 'text-white bg-surface-container-high shadow-md border border-primary/40 text-primary'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setMode('signup')}
              className={`w-1/2 py-2.5 rounded-xl font-medium text-sm transition-all ${
                mode === 'signup'
                  ? 'text-white bg-surface-container-high shadow-md border border-primary/40 text-primary'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Telegram Instant OAuth Action Button */}
          <div className="mb-6">
            <button
              type="button"
              onClick={handleTelegramInstantAuth}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-[#229ED9] hover:bg-[#1f8fc4] text-white font-medium text-sm transition-all duration-200 telegram-glow active:scale-[0.99] cursor-pointer"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.52 2.77-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
              </svg>
              <span>
                {mode === 'login'
                  ? 'Continue with Telegram (Instant Verification)'
                  : 'Register with Telegram Handle'}
              </span>
            </button>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1 bg-outline-variant/40"></div>
            <span className="text-[11px] uppercase tracking-widest font-mono text-slate-500">
              Or with email credentials
            </span>
            <div className="h-px flex-1 bg-outline-variant/40"></div>
          </div>

          {/* Form Container */}
          <form onSubmit={handleFormSubmit} className="space-y-4">
            {/* Username Field (Sign Up only) */}
            {mode === 'signup' && (
              <div className="space-y-1.5 animate-in fade-in duration-200">
                <label className="block text-xs font-mono uppercase text-slate-300 tracking-wider">
                  Gamer Handle / Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="e.g. CyberViper"
                    required
                    className="w-full bg-surface-dim border border-outline-variant/50 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all pr-24"
                  />
                  <span className="absolute right-3.5 top-3 text-slate-500 font-mono text-xs">
                    TAG#0001
                  </span>
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase text-slate-300 tracking-wider">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="gamer@domain.com"
                required
                className="w-full bg-surface-dim border border-outline-variant/50 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-mono uppercase text-slate-300 tracking-wider">
                  Password
                </label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => showToast('Password reset link dispatched to your email address.', 'success')}
                    className="text-xs text-primary hover:text-purple-300 transition-colors cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full bg-surface-dim border border-outline-variant/50 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-white transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Telegram Handle Integration Field */}
            <div className="p-3 bg-surface-dim rounded-xl border border-outline-variant/30 flex items-start gap-3">
              <input
                type="checkbox"
                id="sync-telegram"
                checked={syncTelegram}
                onChange={(e) => setSyncTelegram(e.target.checked)}
                className="mt-1 rounded bg-surface border-outline-variant text-primary focus:ring-0 cursor-pointer"
              />
              <label htmlFor="sync-telegram" className="text-xs text-slate-300 leading-snug cursor-pointer">
                <span className="font-semibold text-white">Enable Telegram Alerts & Lua Push: </span>
                Receive instant alerts when new bypassed game files, patches, or verification tokens drop on Telegram.
              </label>
            </div>

            {/* Remember Me / Terms Check */}
            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberOrTerms}
                  onChange={(e) => setRememberOrTerms(e.target.checked)}
                  className="rounded bg-surface border-outline-variant text-primary focus:ring-0 cursor-pointer"
                />
                <span>
                  {mode === 'login'
                    ? 'Keep me authenticated for 30 days'
                    : 'I agree to the Lua Terms of Service and Mod Guidelines'}
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-purple-600 hover:from-purple-400 hover:to-purple-700 text-white font-semibold text-sm shadow-[0_0_20px_rgba(192,132,252,0.3)] hover:shadow-[0_0_25px_rgba(192,132,252,0.5)] transition-all duration-200 mt-4 active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  <span>Verifying Node Integrity...</span>
                </>
              ) : (
                <span>
                  {mode === 'login' ? 'Sign In to Gaming Yard' : 'Create Gaming Yard Account'}
                </span>
              )}
            </button>
          </form>

          {/* Social Proof Footer */}
          <p className="text-center text-xs text-slate-400 mt-6 font-body-sm">
            <span>{mode === 'login' ? "Don't have an account yet?" : 'Already have an account?'}</span>
            <button
              type="button"
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              className="text-secondary font-semibold hover:underline ml-1.5 cursor-pointer"
            >
              {mode === 'login' ? 'Create an Account' : 'Sign In instead'}
            </button>
          </p>
        </div>
      </div>

      {/* Telegram 2FA Instant Modal */}
      {showTelegramModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-md bg-surface-container-high border border-[#229ED9]/50 rounded-2xl p-6 shadow-2xl telegram-glow relative">
            <button
              onClick={() => setShowTelegramModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#229ED9]/20 text-[#229ED9] flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.52 2.77-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-title-md">Telegram Instant OAuth</h3>
                <p className="text-xs text-[#229ED9] font-mono">NODE AUTH // @gamingyard_bot</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 mb-4 leading-relaxed font-body-sm">
              Open the verified Gaming Yard Telegram bot to receive your instant single-use 6-digit authentication token, or click below to launch the bot:
            </p>

            <a
              href="https://t.me/gamingyard_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 mb-4 rounded-xl bg-[#229ED9]/20 hover:bg-[#229ED9]/30 border border-[#229ED9]/50 text-[#229ED9] font-medium text-xs transition-colors"
            >
              <span>Open @gamingyard_bot</span>
              <span className="material-symbols-outlined text-xs">open_in_new</span>
            </a>

            <div className="space-y-1.5 mb-5">
              <label className="block text-[11px] font-mono uppercase text-slate-300 tracking-wider">
                Enter 6-Digit Telegram Pin
              </label>
              <input
                type="text"
                maxLength={6}
                value={telegramCode}
                onChange={(e) => setTelegramCode(e.target.value)}
                placeholder="e.g. 784920"
                className="w-full bg-surface-dim border border-[#229ED9]/50 rounded-xl px-4 py-2.5 text-center text-lg font-mono tracking-widest text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-[#229ED9]"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowTelegramModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-surface-container border border-outline-variant/50 text-slate-400 hover:text-white text-xs font-medium cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleVerifyTelegramCode}
                className="flex-1 py-2.5 rounded-xl bg-[#229ED9] hover:bg-[#1f8fc4] text-white text-xs font-semibold shadow-[0_0_15px_rgba(34,158,217,0.4)] cursor-pointer"
              >
                Verify & Login
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

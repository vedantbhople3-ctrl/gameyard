import React, { useState, useEffect } from 'react';
import {
  supabaseUrl,
  supabaseAnonKey,
  isSupabaseConfigured,
  testSupabaseConnection,
  updateSupabaseAnonKey
} from '../lib/supabaseClient';

export default function SupabaseStatusModal({ isOpen, onClose }) {
  const [status, setStatus] = useState({ loading: false, connected: false, message: '', latencyMs: null });
  const [inputKey, setInputKey] = useState(supabaseAnonKey || '');
  const [copySuccess, setCopySuccess] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      checkStatus();
    }
  }, [isOpen]);

  const checkStatus = async () => {
    setStatus({ loading: true, connected: false, message: 'Checking connection...', latencyMs: null });
    const result = await testSupabaseConnection();
    setStatus({ loading: false, ...result });
  };

  const handleSaveKey = () => {
    try {
      updateSupabaseAnonKey(inputKey);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
      checkStatus();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(supabaseUrl);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl bg-surface-container-lowest border border-outline-variant/60 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(76,215,246,0.15)] p-6 text-on-surface animate-in fade-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-outline-variant/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#3ECF8E]/10 border border-[#3ECF8E]/40 flex items-center justify-center shadow-[0_0_15px_rgba(62,207,142,0.3)]">
              {/* Supabase Logo Icon */}
              <svg className="w-6 h-6 text-[#3ECF8E]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21.362 9.354H12V.396a.396.396 0 0 0-.716-.233L.863 13.914a.396.396 0 0 0 .317.632H12v8.958a.396.396 0 0 0 .716.233l10.421-13.751a.396.396 0 0 0-.317-.632z" />
              </svg>
            </div>
            <div>
              <h3 className="font-headline-sm text-lg font-bold flex items-center gap-2">
                Supabase Connection
                <span className="text-xs px-2 py-0.5 rounded bg-surface-container border border-outline-variant/40 font-mono text-secondary">
                  qkfdskufngkpdczxtalu
                </span>
              </h3>
              <p className="text-xs text-outline font-body-sm">
                Project backend &amp; database configuration
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-surface-container hover:bg-surface-container-high border border-outline-variant/40 flex items-center justify-center text-outline hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Connection Status Badge */}
        <div className="mt-5 p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span
              className={`w-3 h-3 rounded-full ${
                status.loading
                  ? 'bg-amber-400 animate-pulse'
                  : status.connected
                  ? 'bg-emerald-400 shadow-[0_0_10px_#34d399]'
                  : 'bg-rose-400 shadow-[0_0_10px_#f87171]'
              }`}
            ></span>
            <div>
              <div className="text-sm font-semibold flex items-center gap-2">
                {status.loading
                  ? 'Verifying Connection...'
                  : status.connected
                  ? 'Connected & Active'
                  : isSupabaseConfigured()
                  ? 'Connection Issue'
                  : 'Anon Key Needed'}
                {status.latencyMs !== null && (
                  <span className="text-[10px] px-1.5 py-0.2 bg-surface-container-high rounded text-secondary font-mono">
                    {status.latencyMs}ms
                  </span>
                )}
              </div>
              <p className="text-xs text-outline mt-0.5">{status.message}</p>
            </div>
          </div>
          <button
            onClick={checkStatus}
            disabled={status.loading}
            className="px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest border border-outline-variant/40 text-xs font-medium text-secondary flex items-center gap-1.5 transition-all disabled:opacity-50"
          >
            <span className={`material-symbols-outlined text-[14px] ${status.loading ? 'animate-spin' : ''}`}>
              refresh
            </span>
            Re-test
          </button>
        </div>

        {/* Details & Inputs */}
        <div className="mt-5 space-y-4 text-xs font-body-sm">
          {/* Project URL */}
          <div>
            <label className="block text-outline font-label-caps uppercase tracking-wider mb-1">
              Project API URL
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={supabaseUrl}
                className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-lg px-3 py-2 text-on-surface font-mono text-xs select-all outline-none"
              />
              <button
                onClick={handleCopyUrl}
                className="px-3 py-2 rounded-lg bg-surface-container border border-outline-variant/40 hover:border-secondary/60 text-secondary text-xs whitespace-nowrap transition-colors flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[14px]">
                  {copySuccess ? 'check' : 'content_copy'}
                </span>
                {copySuccess ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>

          {/* Project Anon Key */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-outline font-label-caps uppercase tracking-wider">
                Public Anon Key
              </label>
              <a
                href="https://supabase.com/dashboard/project/qkfdskufngkpdczxtalu/settings/api"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-secondary hover:underline flex items-center gap-0.5"
              >
                <span>Find in Supabase Dashboard</span>
                <span className="material-symbols-outlined text-[12px]">open_in_new</span>
              </a>
            </div>
            <textarea
              rows={3}
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              placeholder="Paste your Supabase anon public API key (eyJhbGciOi...)"
              className="w-full bg-surface-container-lowest border border-outline-variant/50 focus:border-secondary focus:ring-1 focus:ring-secondary/40 rounded-lg p-2.5 text-on-surface font-mono text-xs outline-none resize-none transition-all placeholder:text-outline/50"
            />
          </div>

          {/* Action Bar */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] text-outline">
              You can also paste it into the <code className="text-primary bg-surface-container px-1 py-0.5 rounded">.env</code> file as <code className="text-secondary">VITE_SUPABASE_ANON_KEY</code>.
            </span>
            <button
              onClick={handleSaveKey}
              className="px-4 py-2 rounded-lg bg-[#3ECF8E] hover:bg-[#34b27b] text-black font-semibold text-xs shadow-[0_0_16px_rgba(62,207,142,0.4)] hover:shadow-[0_0_24px_rgba(62,207,142,0.6)] transition-all flex items-center gap-1.5 whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-[16px]">
                {saveSuccess ? 'check' : 'save'}
              </span>
              {saveSuccess ? 'Saved!' : 'Save & Connect'}
            </button>
          </div>
        </div>

        {/* Footer info link */}
        <div className="mt-5 pt-3 border-t border-outline-variant/20 flex items-center justify-between text-[11px] text-outline">
          <span>Project ID: <span className="text-on-surface font-mono">qkfdskufngkpdczxtalu</span></span>
          <a
            href="https://supabase.com/dashboard/project/qkfdskufngkpdczxtalu"
            target="_blank"
            rel="noreferrer"
            className="text-primary hover:text-secondary flex items-center gap-1 transition-colors"
          >
            <span>Open Project Dashboard</span>
            <span className="material-symbols-outlined text-[12px]">launch</span>
          </a>
        </div>
      </div>
    </div>
  );
}

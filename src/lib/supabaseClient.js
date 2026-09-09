import { createClient } from '@supabase/supabase-js';

// Default project configuration for project qkfdskufngkpdczxtalu
export const DEFAULT_SUPABASE_URL = 'https://qkfdskufngkpdczxtalu.supabase.co';

const envUrl = import.meta.env.VITE_SUPABASE_URL;
const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Get URL from env or fallback to project default
export const supabaseUrl = (envUrl && !envUrl.includes('placeholder')) 
  ? envUrl.trim() 
  : DEFAULT_SUPABASE_URL;

// Retrieve anon key from Vite env or runtime localStorage override
function getActiveAnonKey() {
  const localKey = typeof window !== 'undefined' ? localStorage.getItem('gameyard_supabase_anon_key') : null;
  if (localKey && localKey.trim().length > 10) {
    return localKey.trim();
  }
  if (envKey && envKey !== 'your_supabase_anon_key_here' && envKey.trim().length > 10) {
    return envKey.trim();
  }
  return '';
}

export let supabaseAnonKey = getActiveAnonKey();

// Helper to determine if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return Boolean(supabaseUrl && supabaseAnonKey && supabaseAnonKey !== 'your_supabase_anon_key_here');
};

// Create client instance safely
export let supabase = createClient(
  supabaseUrl,
  supabaseAnonKey || 'placeholder-anon-key-awaiting-configuration',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    }
  }
);

/**
 * Updates the Supabase anon key at runtime, persists to localStorage, and recreates client.
 */
export const updateSupabaseAnonKey = (newKey) => {
  if (!newKey || newKey.trim().length < 10) {
    throw new Error('Please provide a valid Supabase Anon key.');
  }
  const cleanKey = newKey.trim();
  if (typeof window !== 'undefined') {
    localStorage.setItem('gameyard_supabase_anon_key', cleanKey);
  }
  supabaseAnonKey = cleanKey;
  supabase = createClient(supabaseUrl, cleanKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    }
  });
  return supabase;
};

/**
 * Test connectivity to the Supabase backend.
 */
export const testSupabaseConnection = async () => {
  if (!isSupabaseConfigured()) {
    return {
      connected: false,
      message: 'Anon key is missing. Add VITE_SUPABASE_ANON_KEY to your .env file or enter it in the connection modal.',
      latencyMs: null
    };
  }

  const startTime = performance.now();
  try {
    const { error } = await supabase.auth.getSession();
    const latencyMs = Math.round(performance.now() - startTime);

    if (error && error.status !== 401 && error.status !== 400) {
      return {
        connected: false,
        message: error.message || 'Failed to communicate with Supabase',
        latencyMs
      };
    }

    return {
      connected: true,
      message: 'Connected to Supabase successfully!',
      latencyMs
    };
  } catch (err) {
    const latencyMs = Math.round(performance.now() - startTime);
    return {
      connected: false,
      message: err.message || 'Network error connecting to Supabase',
      latencyMs
    };
  }
};

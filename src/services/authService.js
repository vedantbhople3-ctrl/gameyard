import { supabase } from '../lib/supabaseClient';

/**
 * Authentication Service for GameYard
 * Handles user sign-up, sign-in, session state, and profile management in Supabase.
 */

// Sign up a new user with email and password
export async function signUpUser(email, password, username = '') {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: username || email.split('@')[0],
        },
      },
    });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error signing up user:', error.message);
    return { data: null, error };
  }
}

// Sign in existing user with email and password
export async function signInUser(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error signing in:', error.message);
    return { data: null, error };
  }
}

// Sign out currently authenticated user
export async function signOutUser() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { success: true, error: null };
  } catch (error) {
    console.error('Error signing out:', error.message);
    return { success: false, error };
  }
}

// Get the currently authenticated user
export async function getCurrentUser() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return { user, error: null };
  } catch (error) {
    return { user: null, error };
  }
}

// Listen for auth state changes (login, logout, session refresh)
export function onAuthStateChange(callback) {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(event, session);
  });
}

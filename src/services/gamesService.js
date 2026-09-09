import { supabase } from '../lib/supabaseClient';
import { gamesData as localFallbackGames } from '../data/gamesData';

/**
 * Games & Telemetry Backend Service for GameYard
 * Handles database operations for games, system specs, screenshots, and asset storage.
 */

// Fetch all games from Supabase, with automatic fallback to local data if table is unpopulated
export async function getGames() {
  try {
    const { data, error } = await supabase
      .from('games')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      // Graceful fallback to static data if table doesn't have rows yet
      return { games: localFallbackGames, isFromDatabase: false };
    }

    return { games: data, isFromDatabase: true };
  } catch (err) {
    console.warn('Using local games fallback:', err);
    return { games: localFallbackGames, isFromDatabase: false };
  }
}

// Fetch single game by ID or slug
export async function getGameById(idOrSlug) {
  try {
    const { data, error } = await supabase
      .from('games')
      .select('*')
      .or(`id.eq.${idOrSlug},slug.eq.${idOrSlug}`)
      .single();

    if (error || !data) {
      const localMatch = localFallbackGames.find(g => g.id === idOrSlug || g.slug === idOrSlug);
      return { game: localMatch || null, isFromDatabase: false };
    }

    return { game: data, isFromDatabase: true };
  } catch (err) {
    const localMatch = localFallbackGames.find(g => g.id === idOrSlug || g.slug === idOrSlug);
    return { game: localMatch || null, isFromDatabase: false };
  }
}

// Insert or update game info, specs, and details
export async function saveGame(gameRecord) {
  try {
    const { data, error } = await supabase
      .from('games')
      .upsert(gameRecord, { onConflict: 'slug' })
      .select();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error saving game record:', error.message);
    return { data: null, error };
  }
}

// Upload game image or screenshot to Supabase Storage bucket
export async function uploadGameAsset(file, bucketName = 'game-assets', filePath = null) {
  try {
    const fileName = filePath || `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (error) throw error;

    // Get public URL for the uploaded asset
    const { data: publicUrlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(fileName);

    return { url: publicUrlData.publicUrl, path: fileName, error: null };
  } catch (error) {
    console.error('Error uploading game asset:', error.message);
    return { url: null, error };
  }
}

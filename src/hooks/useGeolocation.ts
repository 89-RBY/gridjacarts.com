'use client';

import { useState, useEffect } from 'react';

interface GeolocationResult {
  country: string | null;
  locale: 'ro' | 'it' | 'en';
  loading: boolean;
  error: string | null;
}

const CACHE_KEY = 'user_geolocation';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

interface CachedData {
  country: string;
  locale: 'ro' | 'it' | 'en';
  timestamp: number;
}

/**
 * Hook to detect user's country and determine appropriate locale
 * Uses geojs.io API with localStorage caching for 24 hours
 *
 * Country to Locale Mapping:
 * - RO (Romania) → ro
 * - IT (Italy) → it
 * - All others → en (international)
 */
export function useGeolocation(): GeolocationResult {
  const [country, setCountry] = useState<string | null>(null);
  const [locale, setLocale] = useState<'ro' | 'it' | 'en'>('en');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    detectLocation();
  }, []);

  const detectLocation = async () => {
    try {
      // Check cache first
      const cached = getFromCache();
      if (cached) {
        console.log('✅ Using cached geolocation:', cached.country);
        setCountry(cached.country);
        setLocale(cached.locale);
        setLoading(false);
        return;
      }

      // Fetch from geojs.io
      console.log('🌍 Fetching geolocation from geojs.io...');
      const response = await fetch('https://get.geojs.io/v1/ip/country.json', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Geolocation API request failed');
      }

      const data = await response.json();
      const detectedCountry = data.country; // Returns ISO country code (e.g., 'RO', 'IT', 'US')

      console.log('✅ Detected country:', detectedCountry);

      // Map country to locale
      const detectedLocale = mapCountryToLocale(detectedCountry);

      // Save to cache
      saveToCache(detectedCountry, detectedLocale);

      setCountry(detectedCountry);
      setLocale(detectedLocale);
      setLoading(false);
    } catch (err) {
      console.error('❌ Geolocation error:', err);

      // Fallback: try to use browser language
      const browserLang = getBrowserLanguage();
      console.log('⚠️ Falling back to browser language:', browserLang);

      setCountry(null);
      setLocale(browserLang);
      setError('Could not detect location, using browser language');
      setLoading(false);
    }
  };

  return { country, locale, loading, error };
}

/**
 * Map ISO country code to our supported locales
 */
function mapCountryToLocale(countryCode: string): 'ro' | 'it' | 'en' {
  const code = countryCode.toUpperCase();

  if (code === 'RO') return 'ro';
  if (code === 'IT') return 'it';
  return 'en'; // Default to international for all other countries
}

/**
 * Get browser language as fallback
 */
function getBrowserLanguage(): 'ro' | 'it' | 'en' {
  if (typeof window === 'undefined') return 'en';

  const lang = navigator.language.toLowerCase();

  if (lang.startsWith('ro')) return 'ro';
  if (lang.startsWith('it')) return 'it';
  return 'en';
}

/**
 * Get cached geolocation data if valid
 */
function getFromCache(): CachedData | null {
  if (typeof window === 'undefined') return null;

  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const data: CachedData = JSON.parse(cached);
    const now = Date.now();

    // Check if cache is still valid (within 24 hours)
    if (now - data.timestamp < CACHE_DURATION) {
      return data;
    }

    // Cache expired, remove it
    localStorage.removeItem(CACHE_KEY);
    return null;
  } catch (error) {
    console.error('Error reading cache:', error);
    return null;
  }
}

/**
 * Save geolocation to cache
 */
function saveToCache(country: string, locale: 'ro' | 'it' | 'en'): void {
  if (typeof window === 'undefined') return;

  try {
    const data: CachedData = {
      country,
      locale,
      timestamp: Date.now(),
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    console.log('💾 Geolocation cached for 24h');
  } catch (error) {
    console.error('Error saving cache:', error);
  }
}

/**
 * Clear geolocation cache (useful for testing or manual override)
 */
export function clearGeolocationCache(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(CACHE_KEY);
  console.log('🗑️ Geolocation cache cleared');
}

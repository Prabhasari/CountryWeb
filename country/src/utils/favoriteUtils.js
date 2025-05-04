const FAVORITES_KEY = "favoriteCountries";

export function getFavoriteCountries() {
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function toggleFavoriteCountry(code) {
  const current = getFavoriteCountries();
  let updated;

  if (current.includes(code)) {
    updated = current.filter(c => c !== code);
  } else {
    updated = [...current, code];
  }

  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  return updated;
}

export function isFavorite(code) {
  return getFavoriteCountries().includes(code);
}

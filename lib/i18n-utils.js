// lib/i18n-utils.js
export function labelForCategory(t, rawName) {
  // Fallback auf Original, falls keine Übersetzung existiert
  return t(`categories.${rawName}`, { defaultValue: rawName });
}

// lib/use-i18n.js
import { useTranslation } from "next-i18next";

export function useI18n(ns = "common") {
  const { t, i18n } = useTranslation(ns);
  const translate = t; // nur Alias für Lesbarkeit
  const lang = i18n.resolvedLanguage || i18n.language || "en";
  return { translate, t, i18n, lang };
}

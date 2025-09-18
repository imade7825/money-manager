import { useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

const PERSISTED_LANGUAGE_KEY = "app.lang";

export default function LanguageSwitcher() {
  const router = useRouter();
  const { t: translate, i18n: i18nInstance } = useTranslation("common");

  const applyLanguageChange = useCallback(
    async (newLanguage) => {
      const currentResolved =
        i18nInstance?.resolvedLanguage || i18nInstance?.language;

      //nichts tun wenn bereits aktiv
      if (newLanguage === currentResolved || newLanguage === router.locale) {
        if (typeof window !== "undefined") {
          localStorage.setItem(PERSISTED_LANGUAGE_KEY, newLanguage);
        }
        return;
      }
      // 1) i18next umschalten
      await i18nInstance?.changeLanguage?.(newLanguage);

      // 2) für zukünftige Sessions speichern
      if (typeof window !== "undefined") {
        localStorage.setItem(PERSISTED_LANGUAGE_KEY, newLanguage);
      }

      // 3) Next.js Locale für Routing/SSR aktualisieren
      router.replace(router.asPath, undefined, {
        locale: newLanguage,
        scroll: false,
      });
    },
    [i18nInstance, router]
  );

  // Beim Mount gespeicherte Sprache wiederherstellen
  useEffect(() => {
    const savedLanguage =
      typeof window !== "undefined"
        ? localStorage.getItem(PERSISTED_LANGUAGE_KEY)
        : null;

    if (savedLanguage && savedLanguage !== (i18nInstance?.language?? router.locale)) {
      applyLanguageChange(savedLanguage);
    }
  }, [applyLanguageChange, i18nInstance?.language, router.locale]);

  const currentUiLanguage = i18nInstance.language?.startsWith("de")
    ? "de"
    : "en";

  const handleLanguageSelectChange = (changeEvent) => {
    const selectedLanguage = changeEvent.target.value;
    applyLanguageChange(selectedLanguage);
  };

  return (
    <label className="inline-flex items-center gap-2 px-2 py-1 rounded-lg bg-slate-100">
      <span className="text-sm">{translate("intl.language")}</span>
      <select
        className="rounded-md border px-2 py-1 text-sm"
        value={currentUiLanguage}
        onChange={handleLanguageSelectChange}
        aria-label={translate("intl.language")}
      >
        <option value="en">{translate("intl.en")}</option>
        <option value="de">{translate("intl.de")}</option>
      </select>
    </label>
  );
}

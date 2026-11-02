import { translations } from './translations';
import { useAppStore } from '../store/useAppStore';

export function useT() {
  const language = useAppStore((state) => state.settings.language);
  const dict = translations[language] || translations.en;

  // Helper to interpolate variables like "{count} changes"
  const t = (template: string, vars?: Record<string, string | number>) => {
    if (!vars) return template;
    return Object.entries(vars).reduce(
      (acc, [key, val]) => acc.replace(new RegExp(`\\{${key}\\}`, 'g'), String(val)),
      template
    );
  };

  return { dict, t, currentLanguage: language };
}

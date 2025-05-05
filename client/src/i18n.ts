import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      sidebar: {
        dashboard: 'Dashboard',
        search: 'Search',
        analytics: 'Analytics',
        settings: 'Settings',
        help: 'Help',
      },
      header: {
        search: 'Search training modules...',
        voiceSearch: 'Voice Search',
        language: 'Language',
      },
    },
  },
  es: {
    translation: {
      sidebar: {
        dashboard: 'Panel de Control',
        search: 'Buscar',
        analytics: 'Análisis',
        settings: 'Configuración',
        help: 'Ayuda',
      },
      header: {
        search: 'Buscar módulos de formación...',
        voiceSearch: 'Búsqueda por Voz',
        language: 'Idioma',
      },
    },
  },
  fr: {
    translation: {
      sidebar: {
        dashboard: 'Tableau de Bord',
        search: 'Rechercher',
        analytics: 'Analytique',
        settings: 'Paramètres',
        help: 'Aide',
      },
      header: {
        search: 'Rechercher des modules de formation...',
        voiceSearch: 'Recherche Vocale',
        language: 'Langue',
      },
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n; 
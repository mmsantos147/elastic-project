import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "../locales/en.json";
import pt from "../locales/pt-br.json";
import es from "../locales/es.json";
import fr from "../locales/fr.json";
import de from "../locales/de.json";
import it from "../locales/it.json";
import ja from "../locales/ja.json";
import zh from "../locales/zh.json";
import ru from "../locales/ru.json";
import ar from "../locales/ar.json";
import ko from "../locales/ko.json";
import hi from "../locales/hi.json";
import tr from "../locales/tr.json";
import nl from "../locales/nl.json";
import sv from "../locales/sv.json";
import pl from "../locales/pl.json";
import uk from "../locales/uk.json";
import he from "../locales/he.json";
import vi from "../locales/vi.json";
import th from "../locales/th.json";
import Cookies from "js-cookie";


const savedLanguage = Cookies.get("language") || "pt";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    pt: { translation: pt },
    es: { translation: es },
    fr: { translation: fr },
    de: { translation: de },
    it: { translation: it },
    ja: { translation: ja },
    zh: { translation: zh },
    ru: { translation: ru },
    ar: { translation: ar },
    ko: { translation: ko },
    hi: { translation: hi },
    tr: { translation: tr },
    nl: { translation: nl },
    sv: { translation: sv },
    pl: { translation: pl },
    uk: { translation: uk },
    he: { translation: he },
    vi: { translation: vi },
    th: { translation: th },
  },
  lng: savedLanguage, 
  fallbackLng: "pt", 
  interpolation: {
    escapeValue: false, 
  },
});

export default i18n;

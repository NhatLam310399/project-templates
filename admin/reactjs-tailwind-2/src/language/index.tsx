import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import localesVI from "assets/locales/vi";
import localesEN from "assets/locales/en";

const languages = [
    {
        name: "vi",
        icon: <></>,
        fullName: "Vietnamese",
    },
    {
        name: "en",
        icon: <></>,
        fullName: "English",
    },
];

i18n.use(LanguageDetector).init({
    debug: true,
    lng: "vi",
    resources: {
        vi: {
            common: localesVI,
        },
        en: {
            common: localesEN,
        },
    },
    preload: languages.map(item => item.name),
    fallbackLng: "vi",
    load: "currentOnly",
    ns: ["common"],

    defaultNS: "common",

    react: {
        useSuspense: false,
        wait: true,
        bindI18n: "languageChanged loaded",
    },
});

const t = i18n.t.bind(i18n);

export { t, languages };
export default i18n;

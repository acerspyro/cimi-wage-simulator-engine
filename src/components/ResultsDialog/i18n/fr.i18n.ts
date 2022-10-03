import { en } from "./en.i18n";

export const fr = {
  datatype: {
    discrimination: {
      headerLabels: [
        "5 ans avant la pandémie\u2026",
        "Depuis le début de la pandémie\u2026",
      ],
      scoreLabel: (value: string) =>
        `Vous étiez <span>${value}\u00a0%</span> susceptible de déclarer avoir été victime de discrimination ou d'être traité injustement.`,
    },
    wages: {
      and: "et",
      gap: "un écart de",
      expected: {
        wage: "Votre salaire escompté est entre",
        error:
          "La taille de l’échantillon est trop petite pour simuler votre salaire escompté.",
      },
      canadianBornCounterpart: {
        wage: "Le salaire de votre homologue né au Canada est entre",
        error:
          "La taille de l’échantillon est trop petite pour simuler le salaire de votre homologue né au Canada.",
      },
      establishedImmigrantCounterpart: {
        wage: "Le salaire de votre homologue immigrant est entre",
        error:
          "La taille de l’échantillon est trop petite pour simuler le salaire de votre homologue immigrant.",
      },
      recentImmigrantCounterpart: {
        wage: "Le salaire de votre homologue immigrant est entre",
        error:
          "La taille de l’échantillon est trop petite pour simuler le salaire de votre homologue immigrant.",
      },
    },
  },
  closePopup: "Close",
} as typeof en;

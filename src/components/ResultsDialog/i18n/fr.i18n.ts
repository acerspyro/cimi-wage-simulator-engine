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
      headerLabel: "Votre salaire annuel escompté est\u2026",
      scoreLabel: (lowValue: string, highValue: string) =>
        `Cependant, votre salaire annuel pourrait se situer entre <span>${lowValue}</span> et <span>${highValue}</span>.`,
      sampleSizeTooSmall:
        "La taille de l’échantillon est trop petite pour simuler les salaires.",
    },
  },
  closePopup: "Close",
} as typeof en;

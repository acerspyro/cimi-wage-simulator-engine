import { en } from "./en.i18n";

export const fr = {
  datatype: {
    discriminationByDemographic: {
      headerLabels: [
        "5 ans avant la pandémie\u2026",
        "Depuis le début de la pandémie\u2026",
      ],
      scoreLabel: (value: string) =>
        `Vous étiez <span>${value}\u00a0%</span> susceptible de déclarer avoir été victime de discrimination ou d'être traité injustement.`,
    },
    wagesByDemographic: {
      headerLabel: "Votre salaire annuel escompté est\u2026",
      exactScoreLabel: (value: string) => `$${value}`,
      scoreLabel: (lowValue: string, highValue: string) =>
        `Cependant, votre salaire annuel pourrait se situer entre <span>${lowValue}\u00a0$</span> et <span>${highValue}\u00a0$</span>.`,
    },
  },
  closePopup: "Close",
} as typeof en;

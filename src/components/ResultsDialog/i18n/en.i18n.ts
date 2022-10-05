export const en = {
  datatype: {
    discrimination: {
      headerLabels: [
        "5 years before the pandemic\u2026",
        "Since the pandemic started\u2026",
      ],
      scoreLabel: (value: string) =>
        `You have a <span>${value}%</span> chance of having experienced discrimination or being treated unfairly.`,
    },
    wages: {
      and: "and",
      gap: "a gap of",
      expected: {
        wage: "Your expected wage is between",
        error: "The sample size is too small to simulate your expected wage.",
      },
      canadianBornCounterpart: {
        wage: "Your canadian-born counterpart's wage is between",
        error:
          "The sample size is too small to simulate your canadian-born counterpart's wage.",
      },
      establishedImmigrantCounterpart: {
        wage: "The expected wage of an established immigrant is between",
        error:
          "The sample size is too small to simulate the expected wage of an established immigrant.",
      },
      recentImmigrantCounterpart: {
        wage: "The expected wage of a recent immigrant is between",
        error:
          "The sample size is too small to simulate the expected wage of a recent immigrant.",
      },
    },
  },
  closePopup: "Close",
};

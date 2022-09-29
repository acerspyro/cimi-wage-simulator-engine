export const en = {
  datatype: {
    discrimination: {
      headerLabels: [
        "5 years before the pandemic\u2026",
        "Since the pandemic started\u2026",
      ],
      scoreLabel: (value: string) =>
        `You were <span>${value}%</span> likely to report experiencing discrimination or being treated unfairly.`,
    },
    wages: {
      headerLabel: "Your expected yearly wage is\u2026",
      scoreLabel: (lowValue: string, highValue: string) =>
        `However, your yearly wage could be between <span>${lowValue}</span> and <span>${highValue}</span>.`,
      sampleSizeTooSmall: "The sample size is too small to simulate wages.",
    },
  },
  closePopup: "Close",
};

import Locations from "@datasets/i18n/locations.i18n.fr.json";
import { en } from "./en.i18n";

const YN = {
  yes: "Oui [FR]",
  no: "Non [FR]",
};

export const fr = {
  question: {
    bornInCanada: "Were you born in Canada? [FR]",
    permanentResident: "How long have you been a permanent resident? [FR]",
    arrivalAge: "How old were you when you landed in Canada? [FR]",
    cma: "What city (CMA) do you currently reside in? [FR]",
    ethnicGroup: "Which ethnic group do you belong to? [FR]",
    birthSex: "What is your sex at birth? [FR]",
    spokenLanguage:
      "Which official languages can you conduct a conversation in? [FR]",
    education:
      "What is the highest level of education that you have completed? [FR]",
    age: "How old are you? [FR]",
    changedNeighbourhood:
      "Have you changed neighbourhoods in the past 5 years? [FR]",
    occupation: "What is your occupation? [FR]",
    employment: "What is your current work situation?",
  },
  choice: {
    bornInCanada: YN,
    permanentResident: {
      lte5Years: "≤ 5 ans [FR]",
      over5years: "> 5 ans [FR]",
    },
    arrivalAge: {
      child: "< 12 ans [FR]",
      adult: "≥ 12 ans [FR]",
    },
    cma: Locations.city,
    ethnicGroup: {
      white: "White [FR]",
      racialized: "Racialized (Black, Chinese, Arab, etc.) [FR]",
      indigenous: "Indigenous [FR]",
    },
    birthSex: {
      male: "Male [FR]",
      female: "Female [FR]",
    },
    spokenLanguage: {
      fr: "French [FR]",
      en: "English [FR]",
      enfr: "Both French and English [FR]",
      none: "Neither French nor English [FR]",
    },
    education: {
      noDegree: "No degree [FR]",
      secondary: "Secondary / High school diploma or equivalent [FR]",
      trades: "Apprenticeship / Trades certificate or diploma [FR]",
      college:
        "College, CEGEP or other non-university certificate or diploma [FR]",
      uniBelowBachelors:
        "University certificate or diploma, below bachelor's level [FR]",
      bachelors: "Bachelor's degree [FR]",
      uniAboveBachelors:
        "University certificate or diploma above bachelor's level [FR]",
      medicine:
        "Degree in medicine, dentistry, veterinary medicine or optometry [FR]",
      masters: "Master's degree [FR]",
      doctorate: "Earned doctorate [FR]",
    },
    age: {
      "18to19": "18 à 19 [FR]",
      "20to24": "20 à 24 [FR]",
      "25to29": "25 à 29 [FR]",
      "30to34": "30 à 34 [FR]",
      "35to39": "35 à 39 [FR]",
      "40to44": "40 à 44 [FR]",
      "45to49": "45 à 49 [FR]",
      "50to54": "50 à 54 [FR]",
      "55to59": "55 à 59 [FR]",
      "60to64": "60 à 64 [FR]",
    },
    changedNeighbourhood: YN,
    occupation: {
      management: "management [FR]",
      business: "business [FR]",
      appliedSciences: "appliedSciences [FR]",
      health: "health [FR]",
      social: "social [FR]",
      expression: "expression [FR]",
      service: "service [FR]",
      trades: "trades [FR]",
      resources: "resources [FR]",
      manufacturing: "manufacturing [FR]",
    },
    employment: {
      fullTime: "Full-time employee [FR]",
      partTime: "Part-time employee [FR]",
    },
  },
  seeResults: "Voir résultats",
} as typeof en;

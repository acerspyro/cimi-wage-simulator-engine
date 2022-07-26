import Locations from "../../../i18n/locations.i18n.en.json";

const YN = {
  yes: "Yes",
  no: "No",
};

export const en = {
  question: {
    bornInCanada: "Were you born in Canada?",
    permanentResident: "How long have you been a permanent resident?",
    arrivalAge: "How old were you when you landed in Canada? [EN]",
    cma: "What city (CMA) do you currently reside in?",
    ethnicGroup: "Which ethnic group do you belong to?",
    birthSex: "What is your sex at birth?",
    spokenLanguage:
      "Which official languages can you conduct a conversation in?",
    education:
      "What is the highest level of education that you have completed?",
    age: "How old are you?",
    changedNeighbourhood:
      "Have you changed neighbourhoods in the past 5 years?",
    occupation: "What is your occupation?",
    employment: "What is your current work situation?",
  },
  choice: {
    bornInCanada: YN,
    permanentResident: {
      lte5Years: "≤ 5 years",
      over5years: "> 5 years",
    },
    arrivalAge: {
      child: "< 12 years old",
      adult: "≥ 12 years old",
    },
    cma: Locations.city,
    ethnicGroup: {
      white: "White",
      racialized: "Racialized (Black, Chinese, Arab, etc.)",
      indigenous: "Indigenous",
    },
    birthSex: {
      male: "Male",
      female: "Female",
    },
    spokenLanguage: {
      fr: "French",
      en: "English",
      enfr: "Both French and English",
      none: "Neither French nor English",
    },
    education: {
      noDegree: "No degree",
      secondary: "Secondary / High school diploma or equivalent",
      trades: "Apprenticeship / Trades certificate or diploma",
      college: "College, CEGEP or other non-university certificate or diploma",
      uniBelowBachelors:
        "University certificate or diploma, below bachelor's level",
      bachelors: "Bachelor's degree",
      uniAboveBachelors:
        "University certificate or diploma above bachelor's level",
      medicine:
        "Degree in medicine, dentistry, veterinary medicine or optometry",
      masters: "Master's degree",
      doctorate: "Earned doctorate",
    },
    age: {
      "18to19": "18 to 19",
      "20to24": "20 to 24",
      "25to29": "25 to 29",
      "30to34": "30 to 34",
      "35to39": "35 to 39",
      "40to44": "40 to 44",
      "45to49": "45 to 49",
      "50to54": "50 to 54",
      "55to59": "55 to 59",
      "60to64": "60 to 64",
    },
    changedNeighbourhood: YN,
    occupation: {
      management: "management",
      business: "business",
      appliedSciences: "appliedSciences",
      health: "health",
      social: "social",
      expression: "expression",
      service: "service",
      trades: "trades",
      resources: "resources",
      manufacturing: "manufacturing",
    },
    employment: {
      fullTime: "Full-time employee",
      partTime: "Part-time employee",
    },
  },
  seeResults: "See results",
};

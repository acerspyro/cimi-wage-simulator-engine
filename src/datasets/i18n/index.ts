import { LanguageCode } from "../models/language.model";
import * as DiscriminationQuestionsEN from "./discrimination/questions.i18n.en.json";
import * as DiscriminationQuestionsFR from "./discrimination/questions.i18n.fr.json";
import * as DiscriminationInformationEN from "./discrimination/information.i18n.en.json";
import * as DiscriminationInformationFR from "./discrimination/information.i18n.fr.json";
import * as WagesQuestionsEN from "./wages/questions.i18n.en.json";
import * as WagesQuestionsFR from "./wages/questions.i18n.fr.json";
import * as WagesInformationEN from "./wages/information.i18n.en.json";
import * as WagesInformationFR from "./wages/information.i18n.fr.json";

const i18nLabels = [
  ["discrimination", "questions", LanguageCode.EN, DiscriminationQuestionsEN],
  [
    "discrimination",
    "information",
    LanguageCode.EN,
    DiscriminationInformationEN,
  ],
  ["discrimination", "questions", LanguageCode.FR, DiscriminationQuestionsFR],
  [
    "discrimination",
    "information",
    LanguageCode.FR,
    DiscriminationInformationFR,
  ],
  ["wages", "questions", LanguageCode.EN, WagesQuestionsEN],
  ["wages", "information", LanguageCode.EN, WagesInformationEN],
  ["wages", "questions", LanguageCode.FR, WagesQuestionsFR],
  ["wages", "information", LanguageCode.FR, WagesInformationFR],
];

export function getI18nLabels(
  datasetId: string,
  stringType: string,
  language: LanguageCode
): unknown {
  const results = i18nLabels.find(
    (labelset) =>
      labelset[0] === datasetId &&
      labelset[1] === stringType &&
      labelset[2] === language
  );

  if (!results) {
    throw new Error(
      `Invalid dataset. Given: ${datasetId}, ${stringType}, ${language}`
    );
  }

  return (<[string, string, LanguageCode, unknown]>results)[3];
}

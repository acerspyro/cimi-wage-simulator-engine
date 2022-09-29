import { getI18nLabels } from "@/datasets/i18n";
import { I18nStrings } from "@/datasets/models/i18nStrings.model";
import { LanguageCode } from "@/datasets/models/language.model";
import _ from "lodash";

type RecursiveRecord = { [key: string]: RecursiveRecord } | string;

export class LocaleUtils<T> {
  constructor(private readonly en: T, private readonly fr: T) {}

  public getLabels(element: HTMLElement = document.documentElement): T {
    return this[LocaleUtils.getComponentClosestLanguage(element)];
  }

  static getValidLanguage(language: string) {
    return Object.values(LanguageCode).includes(language as LanguageCode)
      ? (language as LanguageCode)
      : LanguageCode.EN;
  }

  static getComponentClosestLanguage(
    element: HTMLElement = document.documentElement
  ): LanguageCode {
    const urlParams = new URLSearchParams(window.location.search);

    const closestElement = element.closest("[lang]") as HTMLElement;
    const langParam = urlParams.get("lang");

    return langParam
      ? LocaleUtils.getValidLanguage(langParam)
      : LocaleUtils.getValidLanguage(closestElement.lang);
  }

  static i18n(labels: RecursiveRecord, key: string) {
    const result = _.get(labels, key, key);

    if (typeof result === "object") {
      return result["$"];
    } else if (!result) {
      console.warn(`Label not found for key "${key}".`);
    }

    return result;
  }

  static geti18nStringsForDataset(
    datasetId: string,
    stringType: string
  ): [I18nStrings, I18nStrings] {
    return [
      getI18nLabels(datasetId, stringType, LanguageCode.EN) as I18nStrings,
      getI18nLabels(datasetId, stringType, LanguageCode.FR) as I18nStrings,
    ];
  }
}

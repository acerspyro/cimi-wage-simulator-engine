export class LocaleUtils<T> {
  constructor(private readonly en: T, private readonly fr: T) {}

  public getLabels(element: HTMLElement = document.documentElement): T {
    return LocaleUtils.getComponentClosestLanguage(element) === "fr"
      ? this.fr
      : this.en;
  }

  static getComponentClosestLanguage(
    element: HTMLElement = document.documentElement
  ): string {
    const urlParams = new URLSearchParams(window.location.search);

    const closestElement = element.closest("[lang]") as HTMLElement;
    const langParam = urlParams.get("lang");

    if (langParam) {
      return langParam === "fr" ? "fr" : "en";
    }

    return closestElement ? closestElement.lang : "en";
  }
}

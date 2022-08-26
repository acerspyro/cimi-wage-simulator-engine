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
    let closestElement = element.closest("[lang]") as HTMLElement;
    return closestElement ? closestElement.lang : "en";
  }
}

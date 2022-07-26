export class LocaleUtils<T> {
  constructor(private readonly en: T, private readonly fr: T) {}

  public getLabels(element: HTMLElement = document.documentElement): T {
    return this.getComponentClosestLanguage(element) === 'fr' ? this.fr : this.en;
  }

  private getComponentClosestLanguage(element: HTMLElement): string {
    let closestElement = element.closest('[lang]') as HTMLElement;
    return closestElement ? closestElement.lang : 'en';
  }
}

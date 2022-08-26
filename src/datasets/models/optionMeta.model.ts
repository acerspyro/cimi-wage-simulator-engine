export class OptionMeta extends Array<number> {
  constructor(
    private readonly _idKey: string,
    private readonly _labelKey: string,
    value?: Array<number>
  ) {
    if (value) {
      super(...value);
    } else {
      super();
    }
  }

  public get idKey() {
    return this._idKey;
  }

  public get labelKey() {
    return this._labelKey;
  }
}

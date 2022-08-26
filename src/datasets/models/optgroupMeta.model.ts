import { OptionMeta } from "./optionMeta.model";

export class OptgroupMeta<LabelType = string> extends Map<string, OptionMeta> {
  constructor(
    private readonly _idKey: string,
    private readonly _labelKey: LabelType,
    children?: Map<string, OptionMeta> | Record<string, OptionMeta>
  ) {
    if (children) {
      super(Object.entries(children));
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

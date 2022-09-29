import { ElementState } from "./logic.model";
import { OptgroupMeta } from "./optgroupMeta.model";
import { OptionMeta } from "./optionMeta.model";

export class SelectMeta<LabelType = string> extends Map<
  string,
  OptgroupMeta | OptionMeta
> {
  public selection: string = "";
  public weight: Array<number> = [];
  public elementState = ElementState.ENABLED;

  constructor(
    private readonly _idKey: string,
    private readonly _labelKey: LabelType,
    children?:
      | Map<string, OptgroupMeta | OptionMeta>
      | Record<string, OptgroupMeta | OptionMeta>
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

  /** @unused */
  public getSelectionObject() {
    try {
      return this.getFromPath(this.selection);
    } catch {
      return null;
    }
  }

  public getFromPath(path: string): this | OptgroupMeta | OptionMeta {
    const splitPath = path.split(/[\.\[\]]+/).filter((s) => s !== "");

    let currentItem: this | OptgroupMeta | OptionMeta = this;

    splitPath.forEach((fragment, fragmentIndex) => {
      if (!(currentItem instanceof OptionMeta)) {
        // OptionMeta won't be walked
        if (currentItem.has(fragment)) {
          currentItem = currentItem.get(fragment)!;
        } else {
          throw new Error(
            `Path fragment not found: '${fragment}' @ index ${fragmentIndex} in path '${path}'`
          );
        }
      }
    });

    return currentItem;
  }
}

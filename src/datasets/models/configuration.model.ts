import { ElementState, JSONLogic } from "./logic.model";

type Configuration = {
  /** Name of the form */
  formId: string;

  /** Position of the CMA question on the form */
  cmaPosition: number;

  /** Conditional fields for the form */
  conditions: {
    logic: Record<string, Partial<Record<ElementState, JSONLogic>>>;
    default: Record<string, ElementState>;
  };

  /** Number of weights per entry */
  weightCount: number;
};

export namespace Datatype {
  export type Generic = Array<number> | { [key: string]: Generic };
  export type Source = {
    [key: string]: {
      cma: Array<number>;
      [key: string]: Generic;
    };
  };
  export type Pivoted = {
    cma: Record<string, Array<number>>;
    [key: string]: Generic;
  };
}

export namespace Dataset {
  export type Generic<T = Datatype.Generic> = {
    configuration: Configuration;
    data: T;
  };
  // Ordered by CMA
  export type Source = Generic<Datatype.Source> & { kind: "SOURCE" };
  export type Pivoted = Generic<Datatype.Pivoted> & { kind: "PIVOTED" };
}

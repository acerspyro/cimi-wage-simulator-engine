export enum ElementState {
  HIDDEN = "HIDDEN",
  DISABLED = "DISABLED",
  ENABLED = "ENABLED",
}

/**
 * IBM Db2 operators
 */
export enum Oper {
  AND = "$and",
  OR = "$or",
  NOT = "$not",
  NOR = "$nor",
}

export type JSONLogic =
  | { [key in Oper]?: Array<JSONLogic> }
  | { [key: string]: string }
  | Array<JSONLogic>;

import rawData from "../../generator/output/discrimination.json";
import { Dataset } from "./models/configuration.model";
import { ElementState as ElementState } from "./models/logic.model";

export default {
  kind: "SOURCE",
  configuration: {
    id: "discrimination",
    weightCount: 2,
    cmaPosition: 4,
    conditions: {
      logic: {
        permanentResident: {
          [ElementState.ENABLED]: { bornInCanada: "no" },
        },
        arrivalAge: {
          [ElementState.ENABLED]: {
            bornInCanada: "no",
            permanentResident: "established",
          },
        },
      },
      default: {
        permanentResident: ElementState.DISABLED,
        arrivalAge: ElementState.DISABLED,
      },
    },
  },
  data: rawData,
} as Dataset.Source;

import rawData from "../../config/wages-by-demographic.json";
import { Dataset } from "./models/configuration.model";
import { ElementState } from "./models/logic.model";

export default {
  kind: "SOURCE",
  configuration: {
    formId: "wagesByDemographic",
    weightCount: 3,
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

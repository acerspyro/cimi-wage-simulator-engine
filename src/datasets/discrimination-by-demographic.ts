import { ConditionAction, FormConfiguration, WeightTree } from '@models/datasets/form';
import rawData from '$/weights/output/discrimination-by-demographic.json';

export const dataWeights: WeightTree = rawData;

export const formConfiguration: FormConfiguration = {
  formId: 'discriminationByDemographic',
  weightCount: 2,
  pivotQuestion: {
    key: 'cma',
    position: 4,
  },
  logic: {
    conditions: {
      permanentResident: {
        [ConditionAction.ENABLE]: ['bornInCanada.no'],
      },
      arrivalAge: {
        [ConditionAction.ENABLE]: ['bornInCanada.no', '&&', 'permanentResident.established'],
      },
    },
    defaults: {
      permanentResident: ConditionAction.DISABLE,
      arrivalAge: ConditionAction.DISABLE,
    },
  },
};

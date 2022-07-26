import { ConditionAction, FormConfiguration, WeightTree } from '@models/datasets/form';
import rawData from '$/weights/output/wages-by-demographic.json';

export const dataWeights: WeightTree = rawData;

export const formConfiguration: FormConfiguration = {
  formId: 'wagesByDemographic',
  weightCount: 3,
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

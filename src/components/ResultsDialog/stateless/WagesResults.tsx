import {
  Dataset,
  ElementState,
  FormMeta,
  OptionMeta,
  SelectMeta,
} from "@/datasets/models";
import { LocaleUtils } from "@/utils/locale-utils";
import currency from "currency.js";
import { Block, Card, Content } from "react-bulma-components";
import { en } from "../i18n/en.i18n";

/**
 * @todo clean up
 */

interface IProp {
  configuration: Dataset.Pivoted["configuration"];
  formMeta: FormMeta;
  labels: typeof en.datatype.wages;
}

const MIN_SAMPLE_SIZE = 20000.0;
const MAX_SAMPLE_SIZE = 200000.0;

const CURRENCY_OPTS = {
  fr: {
    decimal: ",",
    separator: "\u00a0",
    pattern: "#\u00a0!",
    negativePattern: "-#\u00a0!",
    precision: 0,
  },
  en: {
    decimal: ".",
    separator: ",",
    pattern: "!#",
    negativePattern: "-!#",
    precision: 0,
  },
} as Record<string, currency.Options>;

enum QuestionKey {
  BornInCanada = "bornInCanada",
  PermanentResident = "permanentResident",
  ArrivalAge = "arrivalAge",
}

enum AnswerKey {
  Yes = "yes",
  No = "no",
  Recent = "recent",
  Established = "established",
  Child = "child",
  Adult = "adult",
}

enum ResultKey {
  CanadianBorn = "canadianBorn",
  RecentImmigrant = "recentImmigrant",
  ChildEstablishedImmigrant = "childEstablishedImmigrant",
  AdultEstablishedImmigrant = "adultEstablishedImmigrant",
}

enum WeightKey {
  Exact = 0,
  Lower = 1,
  Upper = 2,
}

type TResults = {
  [key in ResultKey]: number[];
};

const weightFetchMatrix = {
  [ResultKey.CanadianBorn]: {
    [QuestionKey.BornInCanada]: AnswerKey.Yes,
    [QuestionKey.PermanentResident]: null,
    [QuestionKey.ArrivalAge]: null,
  },
  [ResultKey.RecentImmigrant]: {
    [QuestionKey.BornInCanada]: AnswerKey.No,
    [QuestionKey.PermanentResident]: AnswerKey.Recent,
    [QuestionKey.ArrivalAge]: null,
  },
  [ResultKey.ChildEstablishedImmigrant]: {
    [QuestionKey.BornInCanada]: AnswerKey.No,
    [QuestionKey.PermanentResident]: AnswerKey.Established,
    [QuestionKey.ArrivalAge]: AnswerKey.Child, // Could also be adult, result would vary. Please ask client
  },
  [ResultKey.AdultEstablishedImmigrant]: {
    [QuestionKey.BornInCanada]: AnswerKey.No,
    [QuestionKey.PermanentResident]: AnswerKey.Established,
    [QuestionKey.ArrivalAge]: AnswerKey.Adult,
  },
};

function getCompiledWeights(formMeta: FormMeta) {
  const results: TResults = {
    canadianBorn: [],
    recentImmigrant: [],
    childEstablishedImmigrant: [],
    adultEstablishedImmigrant: [],
  };

  const compileData = (weightKey: WeightKey, resultKey: ResultKey) =>
    Array.from(formMeta.values()).reduce((previous, selectMeta: SelectMeta) => {
      const getWeight = (answerKey: AnswerKey, index: number) =>
        (selectMeta.get(answerKey) as OptionMeta)[index];

      const isQuestionKey = Object.values(QuestionKey).includes(
        selectMeta.idKey as QuestionKey
      );

      if (isQuestionKey) {
        const answerKey =
          weightFetchMatrix[resultKey][selectMeta.idKey as QuestionKey];

        return answerKey === null
          ? previous
          : previous + getWeight(answerKey, weightKey);
      } else {
        return selectMeta.elementState === ElementState.ENABLED &&
          selectMeta.weight.length
          ? previous + selectMeta.weight[weightKey]
          : previous;
      }
    }, 0);

  Object.values(WeightKey)
    .filter((key) => !isNaN(Number(key)))
    .forEach((weightKey) => {
      Object.values(ResultKey).forEach((resultKey) => {
        results[resultKey][weightKey as WeightKey] = compileData(
          weightKey as WeightKey,
          resultKey
        );
      });
    });

  return results;
}

function checkBounds(results: TResults, resultKey: ResultKey) {
  return (
    Math.min(
      results[resultKey][WeightKey.Lower],
      results[resultKey][WeightKey.Upper]
    ) >= MIN_SAMPLE_SIZE &&
    Math.max(
      results[resultKey][WeightKey.Lower],
      results[resultKey][WeightKey.Upper]
    )
  );
}

/**
 * I presume we want to use Math.abs() here to avoid negative values...
 * @param labels
 * @param weightToCurrencyAmount
 * @param formMeta
 * @param results
 * @returns
 */

function displayBornInCanada(
  labels: IProp["labels"],
  weightToCurrencyAmount: (weight: number) => string,
  formMeta: FormMeta,
  results: TResults
) {
  const childEstablishedImmigrantGap = Math.abs(
    results.canadianBorn[WeightKey.Exact] -
      results.childEstablishedImmigrant[WeightKey.Exact]
  );
  const recentImmigrantGap = Math.abs(
    results.canadianBorn[WeightKey.Exact] -
      results.recentImmigrant[WeightKey.Exact]
  );

  return (
    <Card.Content>
      {checkBounds(results, ResultKey.CanadianBorn) ? (
        <div>
          <h2>{labels.expected.wage}&hellip;</h2>
          <Content className="your-wage">
            <span>
              {weightToCurrencyAmount(results.canadianBorn[WeightKey.Lower])}
            </span>
            &ensp;{labels.and}&ensp;
            <span>
              {weightToCurrencyAmount(results.canadianBorn[WeightKey.Upper])}
            </span>
          </Content>
        </div>
      ) : (
        <Content className="result-error">{labels.expected.error}</Content>
      )}
      <hr />
      {checkBounds(results, ResultKey.ChildEstablishedImmigrant) ? (
        <Content>
          {labels.establishedImmigrantCounterpart.wage}&nbsp;
          {weightToCurrencyAmount(
            results.childEstablishedImmigrant[WeightKey.Lower]
          )}
          &nbsp;{labels.and}&nbsp;
          {weightToCurrencyAmount(
            results.childEstablishedImmigrant[WeightKey.Upper]
          )}
          ,&nbsp;{labels.gap}&nbsp;
          <strong>
            {weightToCurrencyAmount(childEstablishedImmigrantGap)}
          </strong>
          .
        </Content>
      ) : (
        <Content className="result-error">
          {labels.establishedImmigrantCounterpart.error}
        </Content>
      )}
      {checkBounds(results, ResultKey.RecentImmigrant) ? (
        <Content>
          {labels.recentImmigrantCounterpart.wage}&nbsp;
          {weightToCurrencyAmount(results.recentImmigrant[WeightKey.Lower])}
          &nbsp;{labels.and}&nbsp;
          {weightToCurrencyAmount(results.recentImmigrant[WeightKey.Upper])}
          ,&nbsp;{labels.gap}&nbsp;
          <strong>{weightToCurrencyAmount(recentImmigrantGap)}</strong>.
        </Content>
      ) : (
        <Content className="result-error">
          {labels.recentImmigrantCounterpart.error}
        </Content>
      )}
    </Card.Content>
  );
}

function displayImmigratedToCanada(
  labels: IProp["labels"],
  weightToCurrencyAmount: (weight: number) => string,
  formMeta: FormMeta,
  results: TResults
) {
  const isEstablishedImmigrant =
    formMeta.get(QuestionKey.PermanentResident)!.selection ===
    AnswerKey.Established;
  const isChildImmigrant =
    formMeta.get(QuestionKey.ArrivalAge)!.selection === AnswerKey.Child;

  // ew, gross
  const resultKey = isEstablishedImmigrant
    ? isChildImmigrant
      ? ResultKey.ChildEstablishedImmigrant
      : ResultKey.AdultEstablishedImmigrant
    : ResultKey.RecentImmigrant;
  const wageGap = Math.abs(
    results.canadianBorn[WeightKey.Exact] - results[resultKey][WeightKey.Exact]
  );

  return (
    <Card.Content>
      {checkBounds(results, resultKey) ? (
        <div>
          <h2>{labels.expected.wage}&hellip;</h2>
          <Content className="your-wage">
            <span>
              {weightToCurrencyAmount(results[resultKey][WeightKey.Lower])}
            </span>
            &ensp;{labels.and}&ensp;
            <span>
              {weightToCurrencyAmount(results[resultKey][WeightKey.Upper])}
            </span>
          </Content>{" "}
        </div>
      ) : (
        <Content className="result-error">{labels.expected.error}</Content>
      )}
      <hr />
      {checkBounds(results, resultKey) ? (
        <Content>
          {labels.canadianBornCounterpart.wage}&nbsp;
          {weightToCurrencyAmount(results.canadianBorn[WeightKey.Lower])}
          &nbsp;{labels.and}&nbsp;
          {weightToCurrencyAmount(results.canadianBorn[WeightKey.Upper])}
          ,&nbsp;{labels.gap}&nbsp;
          <strong>{weightToCurrencyAmount(wageGap)}</strong>.
        </Content>
      ) : (
        <Content className="result-error">
          {labels.canadianBornCounterpart.error}
        </Content>
      )}
    </Card.Content>
  );
}

export function WagesResults({ configuration, formMeta, labels }: IProp) {
  const locale = LocaleUtils.getComponentClosestLanguage();

  const weightToCurrencyAmount = (weight: number) =>
    currency(weight, CURRENCY_OPTS[locale]).format();

  const bornInCanadaValue = formMeta.get(QuestionKey.BornInCanada)!
    .selection as AnswerKey;

  const results = getCompiledWeights(formMeta);

  return (
    <div>
      <Block>
        <Card className="wages-results">
          {bornInCanadaValue === AnswerKey.Yes
            ? displayBornInCanada(
                labels,
                weightToCurrencyAmount,
                formMeta,
                results
              )
            : displayImmigratedToCanada(
                labels,
                weightToCurrencyAmount,
                formMeta,
                results
              )}
        </Card>
      </Block>
    </div>
  );
}

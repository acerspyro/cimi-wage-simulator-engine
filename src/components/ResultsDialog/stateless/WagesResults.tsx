import { LocaleUtils } from "@/utils/locale-utils";
import currency from "currency.js";
import { Card, Content } from "react-bulma-components";
import { en } from "../i18n/en.i18n";

interface IProp {
  calculatedWeights: Array<number>;
  labels: typeof en.datatype.wages;
}

const MIN_SAMPLE_SIZE = 20000.0;
const MAX_SAMPLE_SIZE = 200000.0;

const CURRENCY_OPTS = {
  fr: {
    decimal: ",",
    separator: " ",
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

export function WagesResults({ calculatedWeights, labels }: IProp) {
  const locale = LocaleUtils.getComponentClosestLanguage();

  const weightToCurrencyAmount = (weight: number) =>
    currency(weight, CURRENCY_OPTS[locale]).format();

  return (
    <div>
      <Card className="wages-by-demographic-results">
        <Card.Content>
          <h2>{labels.headerLabel}</h2>
          <div className="exact-wage">
            {weightToCurrencyAmount(calculatedWeights[0])}
          </div>
          <Content
            dangerouslySetInnerHTML={{
              __html: labels.scoreLabel(
                weightToCurrencyAmount(calculatedWeights[1]),
                weightToCurrencyAmount(calculatedWeights[2])
              ),
            }}
          />
        </Card.Content>
      </Card>
    </div>
  );
}

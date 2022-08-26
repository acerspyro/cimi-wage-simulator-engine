import { LocaleUtils } from "@/utils/locale-utils";
import currency from "currency.js";
import { Card, Content } from "react-bulma-components";
import { en } from "../i18n/en.i18n";

interface IProp {
  calculatedWeights: Array<number>;
  labels: typeof en.datatype.wagesByDemographic;
}

function weightToCurrencyAmount(weight: number, locale: string) {
  return currency(weight, {
    decimal: locale === "fr" ? "," : ".",
    separator: locale === "fr" ? "." : ",",
    pattern: locale === "fr" ? "#\u00a0!" : "!#",
  }).format();
}

export function WagesByDemographicResults({
  calculatedWeights,
  labels,
}: IProp) {
  const locale = LocaleUtils.getComponentClosestLanguage();

  const weightToCurrencyAmount = (weight: number) => {
    return currency(weight, {
      decimal: locale === "fr" ? "," : ".",
      separator: locale === "fr" ? "." : ",",
    }).format();
  };

  return (
    <div>
      <Card className="wages-by-demographic-results">
        <Card.Content>
          <h2>{labels.headerLabel}</h2>
          <div className="exact-wage">
            {labels.exactScoreLabel(
              weightToCurrencyAmount(calculatedWeights[0])
            )}
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

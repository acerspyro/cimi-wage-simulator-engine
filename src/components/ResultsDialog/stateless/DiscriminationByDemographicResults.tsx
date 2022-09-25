import { Card, Content } from "react-bulma-components";
import { en } from "../i18n/en.i18n";

interface IProp {
  calculatedWeights: Array<number>;
  labels: typeof en.datatype.discriminationByDemographic;
}

export function DiscriminationByDemographicResults({
  calculatedWeights,
  labels,
}: IProp) {
  const score = (weight: number) =>
    ((1 / (1 + Math.exp(-weight))) * 100).toFixed(1);

  return (
    <div>
      {calculatedWeights.map((weight, weightIndex) => (
        <Card
          className="discrimination-by-demographic-results"
          key={weightIndex}
        >
          <Card.Content>
            <h2>{labels.headerLabels[weightIndex]}</h2>
            <Content
              dangerouslySetInnerHTML={{
                __html: labels.scoreLabel(score(weight)),
              }}
            />
          </Card.Content>
        </Card>
      ))}
    </div>
  );
}

import { Dataset, ElementState, FormMeta, SelectMeta } from "@/datasets/models";
import { Card, Content } from "react-bulma-components";
import { en } from "../i18n/en.i18n";

interface IProp {
  configuration: Dataset.Pivoted["configuration"];
  formMeta: FormMeta;
  labels: typeof en.datatype.discrimination;
}

const USED_DATA_POINTS = [0];

function getCompiledWeights(formMeta: FormMeta) {
  const score = (weight: number) =>
    ((1 / (1 + Math.exp(-weight))) * 100).toFixed(1);

  const compileData = (index: number) =>
    Array.from(formMeta.values()).reduce(
      (previous, selectMeta: SelectMeta) =>
        selectMeta.elementState === ElementState.ENABLED &&
        selectMeta.weight.length
          ? previous + selectMeta.weight[index]
          : previous,
      0
    );

  return USED_DATA_POINTS.map((dataPoint) => score(compileData(dataPoint)));
}

export function DiscriminationResults({
  configuration,
  formMeta,
  labels,
}: IProp) {
  return (
    <div>
      {getCompiledWeights(formMeta).map((weight, weightIndex) => (
        <Card className="discrimination-results" key={weightIndex}>
          <Card.Content>
            <h2>{labels.headerLabels[weightIndex]}</h2>
            <Content
              dangerouslySetInnerHTML={{
                __html: labels.scoreLabel(weight),
              }}
            />
          </Card.Content>
        </Card>
      ))}
    </div>
  );
}

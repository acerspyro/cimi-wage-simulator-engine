import { en } from "@/components/SimulationForm/i18n/en.i18n";
import { Container, Content, Notification } from "react-bulma-components";

interface IProp {
  labels: typeof en;
  datasetId: keyof typeof en.datasets;
}

export function NoticeDisplay({ labels, datasetId: dataset }: IProp) {
  const datasetLabels = labels.datasets[dataset];

  return (
    <Container>
      {/** @todo limit width and centre container for conciseness */}
      <Content>
        <p className="py-5">{datasetLabels.description}</p>
        <Notification color="primary">
          <strong>{datasetLabels.notice.title}</strong>
          <ul>
            {datasetLabels.notice.points.map((point, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: point }}></li>
            ))}
          </ul>
        </Notification>
      </Content>
    </Container>
  );
}

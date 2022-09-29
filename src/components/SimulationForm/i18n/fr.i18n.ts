import { en } from "./en.i18n";

export const fr = {
  datasets: {
    wages: {
      description:
        "Cette simulation vous donne une estimation de votre salaire annuel basé sur votre information démographique dans la ville/RMR de votre choix. Une fois que vous avez entré vos informations démographiques ci-dessous, votre revenu salarial anticipé sera généré selon les données du Recensement 2016.",
      notice: {
        title: "Veuillez noter que cette simulation:",
        points: [
          "ne représente pas les salaires réels.",
          "ne s'applique qu'aux adultes âgés de 18 à 64 ans qui ont actuellement un emploi, qui travaillent pour une rémunération (salaire, traitement, pourboires ou commission) et qui gagnent un salaire annuel de 1 à 200 000 $.",
        ],
      },
      formHint:
        "Pour obtenir une estimation de votre salaire, veuillez répondre aux questions suivantes:",
    },
    discrimination: {
      description:
        "Cette simulation vous donne une estimation de probabilité d’avoir été victime de discrimination ou autre traitement injuste dans la ville/RMR de votre choix. Une fois que vous avez entré vos informations démographiques ci-dessous, la probabilité sera générée selon les données de l’Enquête sociale générale - Identité sociale 2020.",
      notice: {
        title: "Veuillez noter que cette simulation:",
        points: [
          "est à titre informatif seulement.",
          "est basé sur ceux qui <u>rapportent</u> avoir été victime de discrimination ou traitment injuste. Pas toutes les personnes victimes de discrimination le rapportent.",
          "ne s’applique qu’aux adultes âgés de 18 et plus.",
        ],
      },
      formHint:
        "Pour obtenir une probabilité, veuillez répondre aux questions suivantes:",
    },
  },
  seeResults: "Voir les résultats",
} as typeof en;

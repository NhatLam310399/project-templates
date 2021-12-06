import { IJobLevel, IJobType, IWorkLocation } from "..";

export interface ICategoryMyJob {
  name: string;
  components?: JSX.Element;
}
export interface ICardJobProps {
  id?: string;
  date?: Date;
}

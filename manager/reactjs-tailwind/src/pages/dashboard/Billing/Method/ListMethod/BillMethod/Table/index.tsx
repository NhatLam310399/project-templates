import { IBillMethod } from "../index";
import { Tables } from "./styles";

interface ITableProps {
  title: string;
  desc: string;
  value: IBillMethod[];
  render: (list: IBillMethod[]) => JSX.Element[];
}

const Table: React.FC<ITableProps> = ({ title, desc, render, value }) => {
  return (
    <Tables.Wrapper>
      <Tables.Title>{title}</Tables.Title>
      <Tables.Desc>{desc}</Tables.Desc>
      <Tables.Body>{render(value)}</Tables.Body>
    </Tables.Wrapper>
  );
};

export default Table;

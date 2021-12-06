import { useState } from "react";
import { Formik } from "formik";

import Tables from "./Tables";
import Empty from "./Empty";
import {
  SubTitle,
  Description,
  Content,
  Form,
  Statistic,
  ItemRender,
  HeadingTable,
} from "./styles";
import { filterTimes } from "common/constants/data";

import { Container, Wrapper } from "designs/PageLayout";
import { Title } from "designs/Title";
import SVG from "designs/SVG";
import Select, { ISelectData } from "designs/Select";

interface IStatisticsProps {}
interface IStatistic {
  field: string;
  value: number | 0;
  type: "total" | "cancel" | "paid" | "success";
}
const Statistics: React.FC<IStatisticsProps> = props => {
  const [filter, setFilter] = useState<ISelectData>(filterTimes[4]);
  const statisticList: IStatistic[] = [
    {
      field: "Total Order Sum",
      value: 20,
      type: "total",
    },
    {
      field: "Cancel",
      value: 20,
      type: "cancel",
    },
    {
      field: "Paid",
      value: 20,
      type: "paid",
    },
    {
      field: "Success",
      value: 20,
      type: "success",
    },
  ];
  const handleSubmit = () => {};
  const handleRenderOption = (option: ISelectData, active: boolean) => {
    return <ItemRender active={active}>{option?.name}</ItemRender>;
  };
  return (
    <Wrapper>
      <Container>
        <Title>Statistics</Title>
        <SubTitle>
          <SVG name="statistics/chart" className="w-2.5 h-2.5" />
          Personal orders (USD)
        </SubTitle>
        <Description>
          All stats are displayed according to the time in Los Angeles, CA{" "}
        </Description>
        <Content>
          <Formik initialValues={() => null} onSubmit={handleSubmit}>
            <Form>
              <Select
                onSelect={option => setFilter(option)}
                options={filterTimes}
                renderOption={handleRenderOption}
                name="time"
                optionSelected={filter!}
              />
            </Form>
          </Formik>
          <Statistic.Wrapper>
            {statisticList.map(statistic => (
              <Statistic.Container>
                <Statistic.Field>{statistic.field}</Statistic.Field>
                <Statistic.Value type={statistic.type}>
                  {statistic?.value}
                </Statistic.Value>
              </Statistic.Container>
            ))}
          </Statistic.Wrapper>
          <HeadingTable.Container>
            <HeadingTable.Empty />
            <HeadingTable.Title>Best sellers</HeadingTable.Title>
            <HeadingTable.Line />
          </HeadingTable.Container>
          <Tables filter={filter._id} />
        </Content>
        {/* <Empty /> */}
      </Container>
    </Wrapper>
  );
};

export default Statistics;

import { Formik } from "formik";
import { StatisticsContainer, Title, Grid, Item, Other, Table } from "./styles";
import ChartOverall from "./ChartOverall";
import ChartCommission from "./ChartCommission";
import { Wrapper, Container } from "designs/PageLayout";
import SVG from "designs/SVG";
import Select from "designs/Select";

import { randomId } from "common/functions";

interface IStatisticsProps {}

const Statistics: React.FC<IStatisticsProps> = props => {
  return (
    <Wrapper>
      <Container>
        <StatisticsContainer>
          <Title>Affiliate : Statistics</Title>
          <ChartOverall />
          <ChartCommission />
          <Grid.Wrapper>
            <Grid.Row>
              <Grid.Col>
                <Item.Wrapper>
                  <Item.Title>Geolocation</Item.Title>
                  <Item.Body>
                    <SVG name="affiliate/file" />
                    <Item.SubTitle>No data available</Item.SubTitle>
                    <Item.Desc>Please comeback later</Item.Desc>
                  </Item.Body>
                </Item.Wrapper>
              </Grid.Col>
              <Grid.Col>
                <Item.Wrapper>
                  <Item.Title>Store integrations</Item.Title>
                  <Item.Body>
                    <SVG name="affiliate/file" />
                    <Item.SubTitle>No data available</Item.SubTitle>
                    <Item.Desc>Please comeback later</Item.Desc>
                  </Item.Body>
                </Item.Wrapper>
              </Grid.Col>
            </Grid.Row>
          </Grid.Wrapper>
          <Other.Wrapper>
            <Other.Heading>
              <Other.Title>Referring links</Other.Title>
              <div className="w-full">
                <Formik
                  initialValues={{
                    select: "1",
                  }}
                  onSubmit={() => console.log("submit")}
                >
                  <Select
                    className="w-full"
                    name="select"
                    options={[
                      {
                        _id: "1",
                        name: "URL overview",
                      },
                      {
                        _id: "2",
                        name: "URL overview",
                      },
                    ]}
                    optionSelected={{
                      _id: "1",
                      name: "URL overview",
                    }}
                    onSelect={options => console.log(options)}
                  />
                </Formik>
              </div>
            </Other.Heading>
            <Table.Wrapper>
              <Table.Heading>
                <p>Link</p>
                <p>Clicks</p>
                <p>Sign-ups</p>
              </Table.Heading>
              <Table.Body>
                <Item.Body pb0>
                  <SVG name="affiliate/file" />
                  <Item.SubTitle>No data available</Item.SubTitle>
                  <Item.Desc>Please comeback later</Item.Desc>
                </Item.Body>
              </Table.Body>
            </Table.Wrapper>
          </Other.Wrapper>
        </StatisticsContainer>
      </Container>
    </Wrapper>
  );
};

export default Statistics;

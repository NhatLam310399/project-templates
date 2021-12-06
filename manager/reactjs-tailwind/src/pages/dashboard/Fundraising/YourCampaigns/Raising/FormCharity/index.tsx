import { FormCharityContainer, Title, Desc, SearcContainer } from "./styles";
import SearchBoxTable from "components/SearchBoxTable";
import Button from "designs/Button";
interface IFormCharityProps {}

const FormCharity: React.FC<IFormCharityProps> = props => {
  return (
    <FormCharityContainer>
      <Title>What is a Verified Charity?</Title>
      <Desc>
        Your fundraising page will display a 'Verified Charity' logo, giving
        supporters reassurance that funds raised will be sent directly to the
        charity. Contact us if you need help.
      </Desc>
      <SearcContainer>
        <SearchBoxTable
          onFetchData={() => console.log("Fetch data")}
          placeholder="Name with start"
        />
        <Button>Search</Button>
      </SearcContainer>
    </FormCharityContainer>
  );
};

export default FormCharity;

import { useState } from "react";
import { number } from "yup";
import { boolean } from "yup/lib/locale";
import { ProductImportContainer, Heading, Tables, Orther } from "./styles";
import Button from "designs/Button";
import Table from "designs/Table";

interface IProductImportProps {
  errors: boolean;
}

const ProductImport: React.FC<IProductImportProps> = ({ errors }) => {
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const handleOnClick = () => {
    if (total === 0) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setTotal(16.2);
      }, 2000);
    } else {
      // Next STEP

      alert("Next step");
    }
  };
  return (
    <ProductImportContainer>
      <Heading.Wrapper>
        <Heading.Content>
          <Heading.Title>Ready for import</Heading.Title>
          {!errors ? <Heading.CircleSuccess>1</Heading.CircleSuccess> : null}
        </Heading.Content>
        {total !== 0 ? (
          <p>
            Total : <Heading.Total> $16.92</Heading.Total>
          </p>
        ) : null}
      </Heading.Wrapper>
      <Tables.Wrapper>
        <Tables.Container>
          <Tables.Thead>
            <Tables.Tr>
              <Tables.Th>FROM</Tables.Th>
              <Tables.Th>ITEMS</Tables.Th>
              <Tables.Th>STATUS</Tables.Th>
            </Tables.Tr>
          </Tables.Thead>
          <Tables.Tbody>
            <Tables.Tr>
              <Tables.Td>Dat</Tables.Td>
              <Tables.Td>1</Tables.Td>
              <Tables.Td>Ready for import</Tables.Td>
            </Tables.Tr>
          </Tables.Tbody>
        </Tables.Container>
      </Tables.Wrapper>
      <Orther.Wrapper>
        <Button
          size="lg"
          disabled={errors}
          onClick={handleOnClick}
          loading={loading}
        >
          Caculate shipping price
        </Button>
      </Orther.Wrapper>
    </ProductImportContainer>
  );
};

export default ProductImport;

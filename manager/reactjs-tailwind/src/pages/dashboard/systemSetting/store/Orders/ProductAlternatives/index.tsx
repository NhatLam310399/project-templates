import { useEffect, useState, MouseEvent } from "react";

import {
  ProductAlternativesContainer,
  Button,
  Description,
  WrapperCheckbox,
} from "./styles";
import Tab from "designs/Tabs";
import Checkbox from "designs/Checkbox";

interface IProductAlternativesProps {
  store: IStore;
}
interface IStore {
  _id?: string;
  name?: string;
  image?: string;
  brand?: string;
  import?: boolean;
  automatic?: boolean;
  useProduct?: boolean;
}
const ProductAlternatives: React.FC<IProductAlternativesProps> = ({
  store,
}) => {
  return (
    <ProductAlternativesContainer>
      <Tab
        titles={["Product Alternatives"]}
        content={[<FormUpdate store={store} />]}
      />
    </ProductAlternativesContainer>
  );
};

export default ProductAlternatives;

interface IFormUpdateProps {
  store: IStore;
}
const FormUpdate: React.FC<IFormUpdateProps> = ({ store }) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (Object?.keys(store).length > 0) {
      setChecked(store?.useProduct || false);
    }
  }, [store]);

  const handleChangeUseProduct = (isChecked: boolean) => {
    setChecked(isChecked);
  };
  const handleSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    console.log("checked", checked);
    //submit
    event.preventDefault();
  };
  return (
    <>
      <WrapperCheckbox>
        <Checkbox
          primary
          initialCheck={checked}
          label="Use product alternatives for my orders"
          onChange={handleChangeUseProduct}
        />
        <Description>
          Keep your orders rolling with Product ALternatives. When a product
          you’re selling goes out of stock, we’ll check for the most comparable
          replacement. If it’s available, we’kk use it to fullfill your order.
          Product alternatives that cost more than the original are changed the
          same, and we’ll pay you the difference for the alternatives that cost
          less. Remember to inform customers that you might use alternatives.
        </Description>
      </WrapperCheckbox>

      <Button type="submit" onClick={handleSubmit} size="lg">
        Save
      </Button>
    </>
  );
};

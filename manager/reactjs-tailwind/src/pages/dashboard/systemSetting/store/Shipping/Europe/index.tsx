import { useEffect, useState, MouseEvent } from "react";

import {
  EuropeContainer,
  Button,
  Title,
  WrapperCheckbox,
  HighLightText,
  Text,
  Container,
  GroupCheckbox,
  Label,
} from "./styles";
import Checkbox from "designs/Checkbox";

interface IEuropeProps {
  store: IStore;
}
interface IStore {
  _id?: string;
  name?: string;
  europe?: {
    flatRate?: boolean;
    express?: boolean;
  };
}
const Europe: React.FC<IEuropeProps> = ({ store }) => {
  const [storeChecked, setStoreChecked] = useState<IStore>({});
  const { express = false, flatRate = false } = storeChecked?.europe || {};
  useEffect(() => {
    if (Object?.keys(store).length > 0) {
      const { europe } = store || {};
      setStoreChecked({
        europe: {
          express: europe?.express || false,
          flatRate: europe?.flatRate || false,
        },
      });
    }
  }, [store]);

  const handleCheckFlatRateShipping = (isCheck: boolean) => {
    setStoreChecked({
      ...storeChecked,
      europe: {
        ...storeChecked?.europe,
        flatRate: isCheck,
      },
    });
  };

  const handleCheckExpressShipping = (isCheck: boolean) => {
    setStoreChecked({
      ...storeChecked,
      europe: {
        ...storeChecked?.europe,
        express: isCheck,
      },
    });
  };
  const handleSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    console.log("store europe", storeChecked);
    //submit
    event.preventDefault();
  };
  return (
    <EuropeContainer>
      <GroupCheckbox>
        <Title>International shipping</Title>
        <WrapperCheckbox>
          <Checkbox
            primary
            initialCheck={flatRate}
            label="Flat Rate (Standard)"
            onChange={handleCheckFlatRateShipping}
          />
          <Label>(5-20 business days after fullfilment)</Label>
        </WrapperCheckbox>
        <WrapperCheckbox>
          <Checkbox
            primary
            initialCheck={express}
            label="Express"
            onChange={handleCheckExpressShipping}
          />
          <Label> (1-3 business days after fullfillment)</Label>
        </WrapperCheckbox>
      </GroupCheckbox>

      <Container>
        <Text>
          Express shipments to Europe require a contact{" "}
          <HighLightText primary={false}> phone number</HighLightText>. Make
          sure your{" "}
          <HighLightText primary>
            customers can add their phone number
          </HighLightText>{" "}
          when they checkout on your store.
        </Text>
      </Container>
      <Button type="submit" onClick={handleSubmit} size="lg">
        Save
      </Button>
    </EuropeContainer>
  );
};

export default Europe;

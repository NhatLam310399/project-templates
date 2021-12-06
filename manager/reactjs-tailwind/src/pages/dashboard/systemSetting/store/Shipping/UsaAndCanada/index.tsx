import { Formik } from "formik";
import { useEffect, useState, MouseEvent } from "react";

import {
  UsaAndCanadaContainer,
  Button,
  Title,
  WrapperCheckbox,
  HighLightText,
  Text,
  Container,
  GroupCheckbox,
  Label,
} from "./styles";
import Tab from "designs/Tabs";
import Checkbox from "designs/Checkbox";
import { StatusText } from "designs/ProgressBoard/styles";

interface IUsaAndCanadaProps {
  store: IStore;
}
interface IStore {
  _id?: string;
  name?: string;
  usaAndCanada?: {
    stores?: {
      flatRate?: boolean;
      express?: boolean;
      overnight?: boolean;
    };
    shipping?: {
      flatRate?: boolean;
      standard?: boolean;
      express?: boolean;
    };
  };
}
const UsaAndCanada: React.FC<IUsaAndCanadaProps> = ({ store }) => {
  const [storeChecked, setStoreChecked] = useState<IStore>({});
  const { shipping, stores } = storeChecked.usaAndCanada || {};
  useEffect(() => {
    if (Object?.keys(store).length > 0) {
      const { shipping, stores } = store?.usaAndCanada || {};
      setStoreChecked({
        usaAndCanada: {
          stores: {
            flatRate: stores?.flatRate || false,
            express: stores?.express || false,
            overnight: stores?.overnight || false,
          },
          shipping: {
            flatRate: shipping?.flatRate || false,
            express: shipping?.express || false,
            standard: shipping?.standard || false,
          },
        },
      });
    }
  }, [store]);
  const handleCheckFlatRateStore = (isCheck: boolean) => {
    setStoreChecked({
      ...storeChecked,
      usaAndCanada: {
        ...storeChecked?.usaAndCanada,
        stores: {
          ...storeChecked?.usaAndCanada?.stores,
          flatRate: isCheck,
        },
      },
    });
  };
  const handleCheckExpressStore = (isCheck: boolean) => {
    setStoreChecked({
      ...storeChecked,
      usaAndCanada: {
        ...storeChecked?.usaAndCanada,
        stores: {
          ...storeChecked?.usaAndCanada?.stores,
          express: isCheck,
        },
      },
    });
  };
  const handleCheckOvernightStore = (isCheck: boolean) => {
    setStoreChecked({
      ...storeChecked,
      usaAndCanada: {
        ...storeChecked?.usaAndCanada,
        stores: {
          ...storeChecked?.usaAndCanada?.stores,
          overnight: isCheck,
        },
      },
    });
  };
  const handleCheckFlatRateShipping = (isCheck: boolean) => {
    setStoreChecked({
      ...storeChecked,
      usaAndCanada: {
        ...storeChecked?.usaAndCanada,
        shipping: {
          ...storeChecked?.usaAndCanada?.shipping,
          flatRate: isCheck,
        },
      },
    });
  };
  const handleCheckStandardDDPShipping = (isCheck: boolean) => {
    setStoreChecked({
      ...storeChecked,
      usaAndCanada: {
        ...storeChecked?.usaAndCanada,
        shipping: {
          ...storeChecked?.usaAndCanada?.shipping,
          standard: isCheck,
        },
      },
    });
  };
  const handleCheckExpressShipping = (isCheck: boolean) => {
    setStoreChecked({
      ...storeChecked,
      usaAndCanada: {
        ...storeChecked?.usaAndCanada,
        shipping: {
          ...storeChecked?.usaAndCanada?.shipping,
          express: isCheck,
        },
      },
    });
  };
  const handleSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    console.log("storeChecked", storeChecked);
    //submit
    event.preventDefault();
  };
  return (
    <UsaAndCanadaContainer>
      <GroupCheckbox>
        <Title>Choose store</Title>
        <WrapperCheckbox>
          <Checkbox
            primary
            initialCheck={stores?.flatRate || false}
            label="Flat Rate (Standard)"
            onChange={handleCheckFlatRateStore}
          />
          <Label>(3-4 business days after fullfilment)</Label>
        </WrapperCheckbox>
        <WrapperCheckbox>
          <Checkbox
            primary
            initialCheck={stores?.express || false}
            label="Express"
            onChange={handleCheckExpressStore}
          />
          <Label> (1-3 business days after fullfillment)</Label>
        </WrapperCheckbox>
        <WrapperCheckbox>
          <Checkbox
            primary
            initialCheck={stores?.overnight || false}
            label="Overnight "
            onChange={handleCheckOvernightStore}
          />
          <Label>(1 business days after fullfillment)</Label>
        </WrapperCheckbox>
      </GroupCheckbox>

      <GroupCheckbox>
        <Title>International shipping</Title>
        <WrapperCheckbox>
          <Checkbox
            primary
            initialCheck={shipping?.flatRate || false}
            label="Flat Rate (Standard)"
            onChange={handleCheckFlatRateShipping}
          />
          <Label> (5-20 business days after fullfilment)</Label>
        </WrapperCheckbox>
        <WrapperCheckbox>
          <Checkbox
            primary
            initialCheck={shipping?.standard || false}
            label="Standard DDP "
            onChange={handleCheckStandardDDPShipping}
          />
          <Label>(3-5 business days after fullfillment) Canada only</Label>
        </WrapperCheckbox>
        <WrapperCheckbox>
          <Checkbox
            primary
            initialCheck={shipping?.express || false}
            label="Express "
            onChange={handleCheckExpressShipping}
          />
          <Label>(1-3 business days after fullfillment)</Label>
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
    </UsaAndCanadaContainer>
  );
};

export default UsaAndCanada;

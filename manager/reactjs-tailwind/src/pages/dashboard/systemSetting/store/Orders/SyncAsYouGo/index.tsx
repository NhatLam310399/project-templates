import { useEffect, useState, MouseEvent } from "react";

import {
  SyncAsYouGoContainer,
  Button,
  WrapperCheckbox,
  HighLightText,
  Description,
} from "./styles";
import Tab from "designs/Tabs";
import Checkbox from "designs/Checkbox";

interface ISyncAsYouGoProps {
  store: IStore;
}
interface IStore {
  _id?: string;
  name?: string;
  image?: string;
  brand?: string;
  import?: boolean;
  automatic?: boolean;
}
const SyncAsYouGo: React.FC<ISyncAsYouGoProps> = ({ store }) => {
  return (
    <SyncAsYouGoContainer>
      <Tab
        titles={["Sync as you go"]}
        content={[<FormUpdate store={store} />]}
        icon="settings/info-circle"
      />
    </SyncAsYouGoContainer>
  );
};

export default SyncAsYouGo;

interface IFormUpdateProps {
  store: IStore;
}
const FormUpdate: React.FC<IFormUpdateProps> = ({ store }) => {
  const [storeChecked, setStoreChecked] = useState<IStore>({});

  useEffect(() => {
    if (Object?.keys(store).length > 0) {
      // setInitialsState({});
    }
  }, [store]);
  const handleChangeImport = (isChecked: boolean) => {
    setStoreChecked({ ...storeChecked, import: isChecked });
  };
  const handleChangeAutomatic = (isChecked: boolean) => {
    setStoreChecked({ ...storeChecked, automatic: isChecked });
  };
  const handleSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    console.log("storeChecked", storeChecked);
    //submit
    event.preventDefault();
  };
  return (
    <>
      <WrapperCheckbox>
        <Checkbox
          primary
          initialCheck={storeChecked?.import || false}
          label="Import unsynced orders"
          onChange={handleChangeImport}
        />
        <Description>
          If <HighLightText primary={false}>checked</HighLightText>, and you’ve
          selected automatic order fullfillment, then orders with unsynced items
          will be imported and
          <HighLightText primary={false}> saved as drafts </HighLightText>
          for you to manually confirm.
          <br /> If unchecked orders containing only unsynced items will not be
          imported.
        </Description>
      </WrapperCheckbox>
      <WrapperCheckbox>
        <Checkbox
          primary
          initialCheck={storeChecked?.automatic || false}
          label="Automatic stock update"
          onChange={handleChangeAutomatic}
        />
        <Description>
          If a synced product is discontinued or out of stock
          <HighLightText primary={false}> with our suppliers </HighLightText>
          for over 24 hours in your{" "}
          <HighLightText primary>store’s selling region</HighLightText> , we’ll
          update its status to “out of stock”. The product will not be available
          for purchase in your store until it’s back in stock.
          <br /> If you’ve set up product alternatives, the product status will
          be updated only when both the original and its{" "}
          <HighLightText primary>alternative</HighLightText> , is out of stock.
        </Description>
      </WrapperCheckbox>
      <Button type="submit" onClick={handleSubmit} size="lg">
        Save
      </Button>
    </>
  );
};

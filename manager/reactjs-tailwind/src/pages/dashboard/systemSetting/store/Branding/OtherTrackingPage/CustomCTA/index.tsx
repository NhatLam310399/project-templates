import { useEffect, useState } from "react";
import {
  CustomCTAContainer,
  Label,
  Text,
  AddButton,
  Characters,
  WrapperInputAdd,
} from "./styles";
import Input from "designs/Input";
import SVG from "designs/SVG";
interface ICustomCTAProps {
  textButtons: string[];
}
const CustomCTA: React.FC<ICustomCTAProps> = ({ textButtons = [] }) => {
  const [listButtonText, setListButtonText] = useState<string[]>([]);

  useEffect(() => {
    if (textButtons?.length > 0) {
      setListButtonText(textButtons);
    }
  }, [textButtons]);
  const handleAddButton = () => {
    if (listButtonText?.length === 3) return;
    setListButtonText([...listButtonText, ""]);
  };
  return (
    <CustomCTAContainer>
      <Label>Link</Label>
      <Text>
        Link the page you want your customer to visit (your store’s homepage,
        customer service. etc.)
      </Text>
      <Input
        name="linkPage"
        label=""
        className="mb-2.5"
        placeholder="Enter your link"
      />
      <Label>Button text</Label>
      <Text>
        What the button will say (Click here, Go to store, Contact me, etc.)
      </Text>

      {listButtonText?.length > 0 &&
        listButtonText?.map((button, index) => {
          return (
            <WrapperInputAdd>
              <Input
                name={`textButtons[${index}]`}
                className="mb-1"
                label=""
                placeholder="Enter button text"
              />
              <Characters>0/15 characters</Characters>
            </WrapperInputAdd>
          );
        })}

      <AddButton onClick={handleAddButton}>
        <SVG name="settings/add-circle" width="22px" height="22px" />
        Add another CTA button
      </AddButton>
    </CustomCTAContainer>
  );
};
export default CustomCTA;

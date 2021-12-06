import { Tab } from "@headlessui/react";
import Design from "./Design";
import Product from "./Product";
import {
  ControllerContainer,
  TabItem,
  TabIcon,
  TabPanelContainer,
} from "./styles";

interface IControllerProps {}

const Controller: React.FC<IControllerProps> = props => {
  return (
    <ControllerContainer>
      <Tab.Group>
        <Tab.List className="flex flex-row w-full h-7">
          <Tab className="w-1/2">
            {({ selected }) => (
              <TabItem selected={selected}>
                <TabIcon name="product-template/tab/product.png" />
                Product
              </TabItem>
            )}
          </Tab>
          <Tab className="w-1/2">
            {({ selected }) => (
              <TabItem selected={selected}>
                <TabIcon name="product-template/tab/design.png" />
                Design
              </TabItem>
            )}
          </Tab>
        </Tab.List>
        <TabPanelContainer>
          <Tab.Panels>
            <Tab.Panel>
              <Product />
            </Tab.Panel>
            <Tab.Panel>
              <Design />
            </Tab.Panel>
          </Tab.Panels>
        </TabPanelContainer>
      </Tab.Group>
    </ControllerContainer>
  );
};

export default Controller;

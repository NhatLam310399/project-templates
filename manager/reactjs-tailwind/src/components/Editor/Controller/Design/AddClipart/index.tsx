import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Tab } from "@headlessui/react";

import { QuickDesignContainer, TabItem, TabPanelsContainer } from "./styles";
import TabPanel from "./TabPanel";
import { BackToMenu } from "layouts/Editor/TabComponents";
import SearchBoxTable from "components/SearchBoxTable";
import { getAllCategory, getAllClipArt } from "redux/actions/clipArt";
import { CATEGORY_CLIP_ART } from "common/constants/typeByCodes";
import { IGetAllCategory } from "typings";

interface IClipartProps {}

const AddClipart: React.FC<IClipartProps> = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    getAllCategoryAPI("");
    dispatch(getAllClipArt({}));
  }, []);

  const getAllCategoryAPI = (name: string) => {
    const payload: IGetAllCategory = {
      filterCategory: {
        code: CATEGORY_CLIP_ART,
        name,
      },
    };
    dispatch(getAllCategory(payload));
  };
  return (
    <QuickDesignContainer>
      <BackToMenu />
      <SearchBoxTable onFetchData={getAllCategoryAPI} />

      <Tab.Group>
        <Tab.List className="flex flex-row w-full h-7">
          <Tab>
            {({ selected }) => (
              <TabItem selected={selected}>Basic Clipart</TabItem>
            )}
          </Tab>
          <Tab>
            {({ selected }) => (
              <TabItem selected={selected}>Pro Clipart</TabItem>
            )}
          </Tab>
        </Tab.List>
        <TabPanelsContainer>
          <Tab.Panels>
            <Tab.Panel>
              <TabPanel tab="BASIC_CLIPART" />
            </Tab.Panel>
            <Tab.Panel>
              <TabPanel tab="PRO_CLIPART" />
            </Tab.Panel>
          </Tab.Panels>
        </TabPanelsContainer>
      </Tab.Group>
    </QuickDesignContainer>
  );
};

export default AddClipart;

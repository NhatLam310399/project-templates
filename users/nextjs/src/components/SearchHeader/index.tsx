// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { getProvinces } from "@redux/actions/location";

// import Select from "@designs/Select";
// import SearchInput from "@components/SearchInput";
// import Button from "@designs/Button";
// import { getAllRecruitmentAPI } from "@containers/Job/helpers";
// import * as Styled from "./styles";
// import { IFilterRecruitment, IProvince, IRootState } from "@common/typings";
// import { useTranslation } from "react-i18next";

// interface SearchSelectProps {
//   onChangeFilter: (filter: IFilterRecruitment) => void;
// }

// const SearchSelect: React.FC<SearchSelectProps> = (props) => {
//   const { t } = useTranslation(["common"]);
//   const { onChangeFilter } = props;
//   const dispatch = useDispatch();
//   const { provinces } = useSelector((state: IRootState) => state.location);

//   useEffect(() => {
//     dispatch(getProvinces());
//   }, []);

//   const [nameKeyword, setNameKeyword] = useState<string>("");
//   const [provinceSelect, setProvinceSelect] = useState<IProvince>();
//   const [openDropdown, setOpenDropdown] = useState<boolean>(false);
//   const handleFilter = () => {
//     const filter: IFilterRecruitment = {
//       name: nameKeyword,
//       province: provinceSelect?._id,
//     };
//     onChangeFilter(filter);
//   };

//   const fetchData = async (keyword: string = "") => {
//     setNameKeyword(keyword);
//     const filter: IFilterRecruitment = {
//       name: keyword,
//     };
//     const results = await getAllRecruitmentAPI(filter);

//     return results;
//   };

//   return (
//     <Styled.SearchSelect>
//       <Styled.Container>
//         <Styled.Row className="mb-2">
//           <Styled.FilterSearch>
//             <SearchInput
//               onSubmit={handleFilter}
//               onFetchData={fetchData}
//               placeholder={t("search-placeholder")}
//               renderDropdownItem={() => <div></div>}
//             />
//           </Styled.FilterSearch>
//           <Styled.FilterSelect>
//             <Select
//               list={provinces}
//               onSelected={(province: IProvince) => {
//                 setProvinceSelect(province);
//               }}
//               className="bg-white rounded-md text-primary"
//               classNameSelect="shadow leading-8 p-1.5 pr-5"
//               classNameOption="bg-white"
//               label="Khu vực"
//             />
//           </Styled.FilterSelect>
//           <Styled.FilterButton>
//             <Button
//               type="button"
//               onClick={handleFilter}
//               className="flex items-center justify-center w-full h-5 px-2 py-1 font-medium leading-none text-16 laptop:px-5"
//             >
//               {t("search")}
//             </Button>
//           </Styled.FilterButton>
//         </Styled.Row>
//         <Styled.Row>
//           {listTag.map((tag, index) => (
//             <Styled.Tag key={String(index)}>tag</Styled.Tag>
//           ))}
//         </Styled.Row>
//       </Styled.Container>
//     </Styled.SearchSelect>
//   );
// };

// export default SearchSelect;

// const listTag = ["Ngành nghề", "Cấp bậc", "Mức lương"];

// const listJob = [{ name: "Job 1" }, { name: "Job 2" }, { name: "Job 3" }];

interface ISearchSelectProps {}

const SearchSelect: React.FC<ISearchSelectProps> = (props) => {
  return <div></div>;
};

export default SearchSelect;

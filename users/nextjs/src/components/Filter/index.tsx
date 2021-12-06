import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import {
  ICategoryLevel2,
  IFindJobRoute,
  IJobLevel,
  IJobType,
  ILevelPrice,
  IRootState,
} from "@common/typings";
import { useRedirect } from "@common/hooks/useRedirect";
import { formatParams, unShiftArray } from "@common/functions";
import { getAllCategoryLv2API } from "@containers/Job/helper";
import { PATH } from "@routes";

import { BoxOptionsContainer, ListBoxMenu, ListBoxItem } from "./styles";

import AutoComplete from "@designs/AutoComplete";
import { SVG } from "@designs/SVG";
import Select from "./components/Select";

type IFullQueries = IFindJobRoute.FullQueries;

const PATH_SELF = PATH.JOB;

const Filter: React.FC = (props) => {
  const { t } = useTranslation(["job"]);
  const redirect = useRedirect();
  const dispatch = useDispatch();
  const fullQuery = useRouter().query || {};
  const query = removeParams(fullQuery);

  const { career, level, salary, type } = fullQuery as IFullQueries;

  const queryCareer = formatParams(decodeURIComponent(career || ""));
  const queryLevel = formatParams(decodeURIComponent(level || ""));
  const querySalary = formatParams(decodeURIComponent(salary || ""));
  const queryType = formatParams(decodeURIComponent(type || ""));

  const { allJobLevel, allLevelPrice, allJobType } = useSelector(
    (state: IRootState) => state.job,
  );
  const {
    categoryLevel2: { results: allCareer = [], totalCount = 0 },
  } = useSelector((state: IRootState) => state.category);

  const [listCareer, setListCareer] = useState<ICategoryLevel2[]>([]);
  const [listJobLevel, setListJobLevel] = useState<IJobLevel[]>([]);
  const [listLevelPrice, setListLevelPrice] = useState<ILevelPrice[]>([]);
  const [listJobType, setListJobType] = useState<IJobType[]>([]);

  const [careerSelected, setCareerSelected] = useState<ICategoryLevel2>();
  const [jobLevelSelected, setJobLevelSelected] = useState<IJobLevel>();
  const [levelPriceSelected, setLevelPriceSelected] = useState<ILevelPrice>();
  const [jobTypeSelected, setJobTypeSelected] = useState<IJobType>();

  const [page, setPage] = useState(0);
  const [careers, setCareers] = useState<ICategoryLevel2[]>([]);

  useEffect(() => {
    if (page !== 0) {
      dispatch(getAllCategoryLv2API(page));
    }
  }, [page]);
  useEffect(() => {
    if (allCareer?.length > 0) {
      if (careers?.length < totalCount) {
        const newPage = page + 1;
        setPage(newPage);
        setCareers((state) => [...careers, ...allCareer]);
      }
    }
  }, [allCareer]);
  useEffect(() => {
    addOptionToCareers();
    addOptionToJobLevels();
    addOptionToLevelPrices();
    addOptionToJobTypes();
  }, [careers, allJobLevel, allLevelPrice, allJobType]);

  useEffect(() => {
    setCareerInitial();
    setLevelInitial();
    setSalaryInitial();
    setTypeInitial();
  }, [listCareer, listJobLevel, listLevelPrice, listJobType, fullQuery]);

  const handleSelectedCareer = (option: ICategoryLevel2) => {
    setCareerSelected(option);
    redirect(PATH_SELF, fullQuery, {
      ...query,
      career: encodeURIComponent(option?.slug),
    });
  };

  const handleSelectedJobLevel = (option: IJobLevel) => {
    setJobLevelSelected(option);
    redirect(PATH_SELF, fullQuery, {
      ...query,
      level: encodeURIComponent(option?.slug),
    });
  };

  const handleSelectedLevelPrice = (option: ILevelPrice) => {
    setLevelPriceSelected(option);
    redirect(PATH_SELF, fullQuery, {
      ...query,
      salary: encodeURIComponent(option?.customSlug),
    });
  };

  const handleSelectedJobType = (option: IJobType) => {
    setJobTypeSelected(option);
    redirect(PATH_SELF, fullQuery, {
      ...query,
      type: encodeURIComponent(option?.slug),
    });
  };

  const setCareerInitial = () => {
    if (queryCareer) {
      const careerSelected = listCareer?.find(
        (item) => item?.slug === queryCareer,
      );
      setCareerSelected(careerSelected);
    } else {
      setCareerSelected(listCareer[0]);
    }
  };

  const setLevelInitial = () => {
    if (queryLevel) {
      const levelSelected = listJobLevel?.find(
        (item) => item?.slug === queryLevel,
      );
      setJobLevelSelected(levelSelected);
    } else {
      setJobLevelSelected(listJobLevel[0]);
    }
  };

  const setSalaryInitial = () => {
    if (querySalary) {
      const salarySelected = listLevelPrice?.find(
        (item) => item?.customSlug === querySalary,
      );
      setLevelPriceSelected(salarySelected);
    } else {
      setLevelPriceSelected(listLevelPrice[0]);
    }
  };

  const setTypeInitial = () => {
    if (queryType) {
      const typeSelected = listJobType?.find(
        (item) => item?.slug === queryType,
      );
      setJobTypeSelected(typeSelected);
    } else {
      setJobTypeSelected(listJobType[0]);
    }
  };

  const addOptionToCareers = () => {
    let draftArray = [...careers];
    unShiftArray(t("filter.all-career"), draftArray);
    setListCareer(draftArray);
  };

  const addOptionToJobLevels = () => {
    let draftArray = [...allJobLevel];
    unShiftArray(t("filter.all-level"), draftArray);
    setListJobLevel(draftArray);
  };

  const addOptionToLevelPrices = () => {
    let draftArray = [...allLevelPrice];
    unShiftArray(t("filter.all-level-price"), draftArray);
    setListLevelPrice(draftArray);
  };

  const addOptionToJobTypes = () => {
    let draftArray = [...allJobType];
    unShiftArray(t("filter.all-type"), draftArray);
    setListJobType(draftArray);
  };

  return (
    <BoxOptionsContainer className="container">
      <AutoComplete
        className="w-full"
        MenuButton={
          <ListBoxMenu className="justify-between">
            {careerSelected?.name}
            <SVG name="common/arrow-down" width="16" height="16" />
          </ListBoxMenu>
        }
        fieldToSearch={["name", "nameEn"]}
        onChange={handleSelectedCareer}
        optionSelected={careerSelected}
        options={listCareer}
        renderItem={(option: ICategoryLevel2) => (
          <ListBoxItem>{option?.name}</ListBoxItem>
        )}
      />
      <Select
        optionSelected={jobLevelSelected}
        onSelect={(option: IJobLevel) => handleSelectedJobLevel(option)}
        options={listJobLevel}
      />
      <Select
        optionSelected={levelPriceSelected}
        onSelect={(option: ILevelPrice) => handleSelectedLevelPrice(option)}
        options={listLevelPrice}
      />
      <Select
        optionSelected={jobTypeSelected}
        onSelect={(option: IJobType) => handleSelectedJobType(option)}
        options={listJobType}
      />
    </BoxOptionsContainer>
  );
};

export default Filter;

const removeParams = (_query: IFullQueries) => {
  const newQuery = { ..._query };
  return newQuery || {};
};

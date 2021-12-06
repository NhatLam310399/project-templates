import { Tab } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import JobApplied from "./components/JobApplied";
import JobSaved from "./components/JobSaved";
import RelatedJob from "@components/RelatedJob";

import { getUserCookies } from "@common/utils/auth";
import {
  ICategoryMyJob,
  IGetBestRecruitment,
  IGetUser,
  IRecruitment,
  IRootState,
} from "@common/typings";

import { Container, TabItem, Title, WrapperBG } from "./style";

import { getUserProfile } from "@redux/actions/user";
import {
  getAllRecruitment,
  getBestRecruitment,
} from "@redux/actions/recruitment";
import { resetAction } from "@redux/actions/common";

const MyJob: React.FC<{}> = () => {
  const { t } = useTranslation(["job-management"]);
  const dispatch = useDispatch();

  const {
    bestRecruitment: { results: bestRecruitment = [] },
    allRecruitment: { results = [], loading = true },
  } = useSelector((state: IRootState) => state.recruitment);
  const { user } = useSelector((state: IRootState) => state.user);

  const { actionSuccess } = useSelector((state: IRootState) => state.actions);

  const { appliedRecruitment, savedRecruitment } = user;

  useEffect(() => {
    getUserProfileAPI();
    getBestRecruitmentAPI();
    geAllRecruitmentAPI();
  }, []);

  useEffect(() => {
    if (actionSuccess) {
      dispatch(resetAction());
      getUserProfileAPI();
    }
  }, [actionSuccess]);

  const getUserProfileAPI = () => {
    const payload: IGetUser = {
      id: getUserCookies()?.userInfo?._id,
    };
    dispatch(getUserProfile(payload));
  };

  const geAllRecruitmentAPI = () => {
    dispatch(getAllRecruitment({}));
  };

  const getBestRecruitmentAPI = () => {
    const payload: IGetBestRecruitment = {
      size: 6,
    };
    dispatch(getBestRecruitment(payload));
  };

  const categories = [
    {
      name: t("saved-jobs"),
      components: <JobSaved savedRecruitment={savedRecruitment} />,
    },
    {
      name: t("applied-job"),
      components: <JobApplied appliedRecruitment={appliedRecruitment} />,
    },
  ];

  return (
    <Container>
      <WrapperBG>
        <Title>{t("my-job")}</Title>
        <Tab.Group>
          <Tab.List className="flex items-center w-full text-black">
            {categories?.map((category: ICategoryMyJob, index) => (
              <Tab as={Fragment} key={index}>
                {({ selected }) => (
                  <TabItem selected={selected}>
                    <div>{category.name}</div>
                  </TabItem>
                )}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            {categories?.map((category: ICategoryMyJob, index) => (
              <Tab.Panel key={index}>{category.components}</Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </WrapperBG>

      <RelatedJob bestRecruitment={bestRecruitment} title={t("favorite-job")} />
    </Container>
  );
};

export default MyJob;

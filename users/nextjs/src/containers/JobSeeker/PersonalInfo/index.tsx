import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "next-i18next";
import { isEmpty } from "lodash";
import { IRootState } from "@redux/reducers";
import { getRecordByUserId } from "@redux/actions/record";
import { getUserProfile } from "@redux/actions/user";
import { getRatingByUserId } from "@redux/actions/rating";
import { getEvaluateByUserId } from "@redux/actions/evaluate";
import { IGetRecordByUserId, IGetUser, IEvaluate } from "@common/typings";
import { refreshToken } from "@redux/actions/auth";
import { resetAction } from "@redux/actions/common";

import About from "./components/About";
import CurriculumVitae from "./components/CurriculumVitae";
import DesiredJob from "./components/DesiredJob";
import Education from "./components/Education";
import Experience from "./components/Experience";
import GeneralInfo from "./components/GeneralInfo";
import Overview from "./components/Overview";
import Single from "./components/Single";
import {
  checkProfileUserService,
  checkRecordUserService,
  addLocalStorage,
} from "./helper";
import { Container } from "./styles";
import RecommendedDialog from "@components/NotifyDialog";

interface IPersonalInfoProps {}

const PersonalInfo: React.FC<IPersonalInfoProps> = (props) => {
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state: IRootState) => state.auth);
  const { record } = useSelector((state: IRootState) => state.record);
  const { user } = useSelector((state: IRootState) => state.user);
  const { rating } = useSelector((state: IRootState) => state.rating);
  const { evaluateList } = useSelector((state: IRootState) => state.evaluate);
  const { actionSuccess } = useSelector((state: IRootState) => state.actions);
  const { t } = useTranslation(["job-management"]);
  const [isOpen, setIsOpen] = useState(false);
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    if (actionSuccess) {
      dispatch(refreshToken());
      dispatch(resetAction());
      setFirstRender(false);
    }
  }, [actionSuccess]);

  useEffect(() => {
    if (!isEmpty(currentUser)) {
      const getDataWithUserIdPayload: IGetRecordByUserId = {
        userId: currentUser.userInfo._id,
      };

      const getUserPayload: IGetUser = {
        id: currentUser.userInfo._id,
      };
      dispatch(getUserProfile(getUserPayload));
      dispatch(getRecordByUserId(getDataWithUserIdPayload));
      dispatch(getRatingByUserId(getDataWithUserIdPayload));
      dispatch(getEvaluateByUserId(getDataWithUserIdPayload));
      checkFullProfileAndRecord();
    }
  }, [currentUser]);

  const averageScore = evaluateList
    ?.map((evaluate: IEvaluate) => evaluate.avgPoint)
    .reduce((previousValue: number, currentValue: number) => {
      return (previousValue + currentValue) / evaluateList.length;
    }, 0);
  const handleClose = () => {
    isOpen && setIsOpen(false);
  };
  const checkFullProfileAndRecord = async () => {
    const recordResult = await checkRecordUserService();
    const profileResult = await checkProfileUserService();
    if (recordResult && profileResult) {
      addLocalStorage(1);
    } else {
      addLocalStorage(0);
      firstRender && setIsOpen(true);
    }
  };
  return (
    <Container>
      <Overview
        accumulatedScore={currentUser?.userInfo?.point}
        userId={currentUser?.userInfo?._id}
        avatarURL={user?.urlAvt?.default || "/img/skeleton/avatar.jpg"}
        averageScore={averageScore?.toPrecision(3)}
        memberType={!!rating ? rating.rate : t("personal-info.new-member")}
      />

      <GeneralInfo
        code={user?.code}
        userId={user?._id}
        description={user?.history}
        displayName={user?.displayName}
        position={user?.title}
      />

      <CurriculumVitae
        fileNameCV={record?.fileNameCV}
        urlCV={record?.urlCV}
        recordId={record?._id}
        userId={currentUser?.userInfo?._id}
      />

      <Single
        phoneNumber={user?.phoneNumber || ""}
        userId={user?._id}
        email={user?.email || currentUser?.userInfo?.email}
        idCard={user?.identityCard || ""}
        dateOfBirth={user?.birthday}
        province={user?.province}
        district={user?.district}
        ward={user?.ward}
        address={user?.street}
        gender={user?.gender}
      />

      <About
        content={record?.description}
        recordId={record?._id}
        userId={currentUser?.userInfo?._id}
      />

      <Experience
        experienceList={record?.workExperience}
        recordId={record?._id}
        userId={currentUser?.userInfo?._id}
      />

      <Education
        educationList={record?.education}
        recordId={record?._id}
        userId={currentUser?.userInfo?._id}
      />

      <DesiredJob
        careers={record?.career}
        level={record?.jobLevelWanted}
        salary={record?.salaryWanted?.toString()}
        workLocation={record?.workPlace}
        benefitsWanted={record?.benefitsWanted}
        recordId={record?._id}
        userId={currentUser?.userInfo?._id}
      />
      <RecommendedDialog
        title={t("alert-title")}
        message={t("alert-content")}
        onConfirm={handleClose}
        isOpen={isOpen}
      />
    </Container>
  );
};

export default PersonalInfo;

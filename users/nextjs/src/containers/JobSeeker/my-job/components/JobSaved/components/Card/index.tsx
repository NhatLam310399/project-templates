import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { isEmpty } from "lodash";

import {
  IRecruitment,
  IRootState,
  ISetAppliedRecruitment,
} from "@common/typings";
import { renderLocation } from "@common/functions";

import {
  removeSavedRecruitment,
  setAppliedRecruitment,
} from "@redux/actions/recruitment";
import Link from "@designs/Link";
import { resetAction } from "@redux/actions/common";
import { refreshToken } from "@redux/actions/auth";
import { PATH } from "@routes/index";

import {
  ButtonDelete,
  ButtonApplied,
  CardContainer,
  Content,
  LeftCard,
  RightCard,
  Text,
  Title,
} from "./style";
interface ICardJobSaved {
  recruitment: IRecruitment;
}
const CardJobSaved: React.FC<ICardJobSaved> = ({ recruitment }) => {
  const { t } = useTranslation(["common"]);
  const dispatch = useDispatch();

  const { user } = useSelector((state: IRootState) => state.user);
  const { currentUser } = useSelector((state: IRootState) => state.auth);
  const { actionSuccess } = useSelector((state: IRootState) => state.actions);

  const [isApplied, setIsApplied] = useState<boolean>();

  const { level, location, createdAt, name, _id, slug } = recruitment;
  const userInfo = currentUser?.userInfo;
  const locationArray = location?.map((item) => item.province?.name);
  const locationString = renderLocation(locationArray);

  useEffect(() => {
    if (!isEmpty(user)) {
      checkApplied();
    }
  }, [user]);

  useEffect(() => {
    if (actionSuccess) {
      dispatch(resetAction());
      dispatch(refreshToken());
      checkApplied();
    }
  }, [actionSuccess]);

  const setAppliedRecruitmentAPI = (userId: string, recruitmentId: string) => {
    const payload: ISetAppliedRecruitment = {
      userId: userId,
      recruitmentId: recruitmentId,
    };
    dispatch(setAppliedRecruitment(payload));
  };

  const handleDelete = () => {
    dispatch(
      removeSavedRecruitment({
        userId: userInfo?._id,
        recruitmentId: _id,
      }),
    );
  };

  const handleApply = () => {
    setAppliedRecruitmentAPI(userInfo?._id, _id);
  };

  const checkApplied = () => {
    const listAppliedId = user?.appliedRecruitment?.map(
      (item) => item?.recruitment?._id,
    );
    if (listAppliedId?.includes(_id)) {
      setIsApplied(true);
    }
  };

  return (
    <CardContainer>
      <LeftCard>
        <Link routeName={PATH.JOB_DETAIL} params={{ slug }}>
          <Title>{name}</Title>
        </Link>
        <Content>
          <Text>{level?.name}</Text>
          <Text>{locationString}</Text>
          <Text>{dayjs(createdAt).format("DD/MM/YYYY")}</Text>
        </Content>
      </LeftCard>
      <RightCard>
        <ButtonApplied
          onClick={handleApply}
          style={{
            opacity: isApplied ? 0.5 : 1,
            pointerEvents: isApplied ? "none" : "initial",
          }}
        >
          {isApplied ? t("applied") : t("apply")}
        </ButtonApplied>
        <ButtonDelete onClick={handleDelete}>{t("delete")}</ButtonDelete>
      </RightCard>
    </CardContainer>
  );
};

export default CardJobSaved;

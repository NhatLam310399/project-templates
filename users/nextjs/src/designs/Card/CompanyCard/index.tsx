import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { isEmpty } from "lodash";
import Dialog from "@components/Dialog";
import { renderCareer } from "@common/functions";
import {
  ICompany,
  IGetAllRequestReview,
  IRequestReview,
  IRootState,
  RequestReviewStatus,
} from "@common/typings";

import {
  Button,
  ButtonWrapper,
  ButtonDialog,
  ButtonDialogWrapper,
  Career,
  CompanyCardContainer,
  CompanyCardWrapper,
  Content,
  DialogContainer,
  DialogContent,
  DialogTitle,
  Img,
  Link,
  Location,
  Logo,
  Title,
} from "./styles";
import { PATH } from "@routes";
import { useDispatch, useSelector } from "react-redux";
import {
  createRequestReview,
  getAllRequestReview,
} from "@redux/actions/requestReview";
import { refreshToken } from "@redux/actions/auth";
import { resetAction } from "@redux/actions/common";
import { useRedirect } from "@common/hooks/useRedirect";

interface ICompanyCardProps {
  company: ICompany;
  request?: boolean;
  companyLocation?: String;
}

const skeletonImage = "/img/skeleton/default-small.jpg";

const CompanyCard: React.FC<ICompanyCardProps> = ({
  company,
  request = true,
  companyLocation = "",
}) => {
  const { t } = useTranslation(["company"]);
  const dispatch = useDispatch();
  const redirect = useRedirect();
  const [open, setOpen] = useState<boolean>(false);
  const [isRequest, setIsRequest] = useState<boolean>(false);

  const { currentUser } = useSelector((state: IRootState) => state.auth);
  const { actionSuccess } = useSelector((state: IRootState) => state.actions);
  const {
    requestReviewList: { results: requestReviewList = [] },
  } = useSelector((state: IRootState) => state.requestReview);

  const userInfo = currentUser?.userInfo || {};

  const { logo, name, career, province } = company;

  const careerArray = career?.map((item) => item?.name);
  const careerString = renderCareer(careerArray);

  const locationArray = province?.map((item) => item?.name);
  const locationString = renderCareer(locationArray);

  useEffect(() => {
    if (!isEmpty(currentUser)) {
      getRequestedAPI();
    }
  }, [currentUser]);

  useEffect(() => {
    if (requestReviewList?.length > 0) {
      checkRequested();
    }
  }, [requestReviewList]);

  useEffect(() => {
    if (actionSuccess) {
      dispatch(resetAction());
      dispatch(refreshToken());
      setIsRequest(true);
      checkRequested();
    }
  }, [actionSuccess]);
  const handleRequest = () => {
    if (isEmpty(currentUser)) {
      redirect(PATH.LOGIN);
    } else {
      if (company?._id) {
        dispatch(
          createRequestReview({
            createRequestReviewInput: {
              candidate: userInfo?._id,
              employer: company?.user?._id,
              status: "waiting_for_review",
            },
          }),
        );
      }
    }
    setOpen(false);
  };

  const getRequestedAPI = () => {
    const payload: IGetAllRequestReview = {
      filterRequestReview: {
        candidate: userInfo?._id,
        employer: company?.user?._id,
      },
    };
    dispatch(getAllRequestReview(payload));
  };

  const checkRequested = () => {
    const listRequestId = requestReviewList?.map(
      (item) => item?.candidate?._id,
    );
    const listCompanyRequestId = requestReviewList?.map(
      (item) => item?.employer?.company?._id,
    );
    if (
      listRequestId.includes(userInfo?._id) &&
      listCompanyRequestId.includes(company?._id)
    ) {
      setIsRequest(true);
    }
  };

  return (
    <CompanyCardWrapper className="container">
      <CompanyCardContainer>
        <Logo>
          <Img
            src={logo?.small || logo?.default || logo?.medium || skeletonImage}
            alt={name}
            loading="lazy"
          />
        </Logo>
        <Content>
          <Title>{name}</Title>
          {companyLocation && <Location>{companyLocation}</Location>}
          {!companyLocation && province?.length > 0 && (
            <Location>{locationString}</Location>
          )}
          {career?.length > 0 && <Career>{careerString}</Career>}
        </Content>
        {request && (
          <ButtonWrapper>
            <Button
              onClick={() => setOpen(true)}
              style={{
                opacity: isRequest ? 0.5 : 1,
                pointerEvents: isRequest ? "none" : "initial",
              }}
            >
              {isEmpty(currentUser)
                ? t("required-rating-title")
                : isRequest
                ? t("requested")
                : t("required-rating-title")}
            </Button>
            <Dialog
              isOpen={open}
              onClose={() => setOpen(false)}
              className="z-50 rounded-none w-max"
            >
              <DialogContainer>
                <DialogTitle>{t("required-rating-title")}</DialogTitle>
                <DialogContent>
                  {!isEmpty(currentUser)
                    ? t("required-rating-content").replace(
                        "$companyName",
                        String(name),
                      )
                    : t("no-login")}
                </DialogContent>
                <ButtonDialogWrapper>
                  <ButtonDialog onClick={() => setOpen(false)}>
                    {t("cancel")}
                  </ButtonDialog>
                  {Object.keys(userInfo).length > 0 ? (
                    <ButtonDialog isAccept onClick={handleRequest}>
                      {t("accept")}
                    </ButtonDialog>
                  ) : (
                    <Link routeName={PATH.LOGIN}>{t("accept")}</Link>
                  )}
                </ButtonDialogWrapper>
              </DialogContainer>
            </Dialog>
          </ButtonWrapper>
        )}
      </CompanyCardContainer>
    </CompanyCardWrapper>
  );
};

export default CompanyCard;

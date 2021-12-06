import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { renderLocation } from "@common/functions";
import {
  ICompany,
  IGetUser,
  IRootState,
  ISetSubscribeCompany,
} from "@common/typings";
import { getUserCookies } from "@common/utils/auth";

import { getUserProfile } from "@redux/actions/user";
import { setSubscribeCompany } from "@redux/actions/company";
import { refreshToken } from "@redux/actions/auth";
import { resetAction } from "@redux/actions/common";
import { PATH } from "@routes";

import { SVG } from "@designs/SVG";
import {
  Career,
  Container,
  Content,
  Heart,
  HeartCount,
  Img,
  InfoWrapper,
  Link,
  Location,
  Logo,
  Title,
  TextWrapper,
} from "./styles";

interface ICompanyItemProps {
  company: ICompany;
  className?: string;
}

const skeletonImage = "/img/skeleton/default-small.jpg";

const CompanyItem: React.FC<ICompanyItemProps> = (props) => {
  const { company, className = "" } = props;
  const { logo, name, career, subscribe, slug, province, _id } = company;
  const dispatch = useDispatch();

  const { user } = useSelector((state: IRootState) => state.user);
  const { currentUser } = useSelector((state: IRootState) => state.auth);
  const { actionSuccess } = useSelector((state: IRootState) => state.actions);

  const [isSubscribe, setIsSubscribe] = useState<boolean>(false);
  const [countHeart, setCountHeart] = useState<number>(subscribe);

  const userInfo = currentUser?.userInfo || {};

  const careerArray = career?.map((item) => item?.name);
  const careerString = renderLocation(careerArray);

  const locationArray = province?.map((item) => item?.name);
  const locationString = renderLocation(locationArray);

  useEffect(() => {
    getUserProfileAPI();
  }, []);

  useEffect(() => {
    checkSubscribed();
  }, [user]);

  useEffect(() => {
    if (actionSuccess) {
      dispatch(resetAction());
      getUserProfileAPI();
      checkSubscribed();
    }
  }, [actionSuccess]);

  const handleSubscribe = () => {
    if (isEmpty(userInfo)) return;
    setSubscribeCompanyAPI(user?._id, _id);
    setCountHeart(subscribe + 1);
  };

  const setSubscribeCompanyAPI = (userId: string, companyId: string) => {
    const payload: ISetSubscribeCompany = {
      userId: userId,
      companyId: companyId,
    };
    dispatch(setSubscribeCompany(payload));
  };

  const getUserProfileAPI = () => {
    const payload: IGetUser = {
      id: getUserCookies()?.userInfo?._id,
    };
    dispatch(getUserProfile(payload));
  };

  const checkSubscribed = () => {
    const listSubscribedId = user?.subscribedCompany?.map((item) => item?._id);
    if (listSubscribedId?.includes(_id)) {
      setIsSubscribe(true);
    }
  };

  return (
    <Container className={className}>
      <Logo>
        <Img
          src={logo?.small || logo?.default || logo?.medium || skeletonImage}
          alt={name}
          loading="lazy"
        />
      </Logo>
      <Content>
        <Link routeName={PATH.COMPANY_DETAIL} params={{ slug: slug }}>
          <Title>{name}</Title>
        </Link>
        <InfoWrapper>
          <TextWrapper>
            {career?.length > 0 && <Career>{careerString}</Career>}
            {province?.length > 0 && <Location>{locationString}</Location>}
          </TextWrapper>
          <Heart>
            {Object.keys(userInfo).length > 0 ? (
              <SVG
                name="company/heart"
                width="24"
                height="24"
                className="mx-auto"
                onClick={handleSubscribe}
                style={{
                  opacity: isSubscribe ? 0.25 : 1,
                  pointerEvents: isSubscribe ? "none" : "initial",
                  cursor: isSubscribe ? "not-allowed" : "pointer",
                }}
              />
            ) : (
              <Link routeName={PATH.LOGIN}>
                <SVG
                  name="company/heart"
                  width="24"
                  height="24"
                  className="mx-auto"
                  onClick={handleSubscribe}
                  style={{
                    opacity: isSubscribe ? 0.5 : 1,
                    pointerEvents: isSubscribe ? "none" : "initial",
                    cursor: isSubscribe ? "not-allowed" : "pointer",
                  }}
                />
              </Link>
            )}
            <HeartCount>{countHeart}</HeartCount>
          </Heart>
        </InfoWrapper>
      </Content>
    </Container>
  );
};

export default CompanyItem;

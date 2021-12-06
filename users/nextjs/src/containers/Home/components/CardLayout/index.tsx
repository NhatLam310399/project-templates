import { Settings } from "react-slick";
import { useDispatch } from "react-redux";
import { isEmpty } from "lodash";

import { IRecruitment, IWorkLocation } from "@common/typings";
import SlickSlider from "@designs/SlickSlider";
import { PATH } from "@routes";
import { setSeenRecruitment } from "@redux/actions/recruitment";
import useAuth from "@common/hooks/useAuth";

import { Card, CardLayoutContainer, Link, Title, LinkWrapper } from "./styles";

interface ICardLayoutProps {
  title: string;
  data?: IRecruitment[];
  loading?: boolean;
}

const CardLayout: React.FC<ICardLayoutProps> = (props) => {
  const { title, data, loading } = props;
  const dispatch = useDispatch();
  const renderLocation = (location: IWorkLocation[]) => {
    const listProvince = location?.map((location) => location?.province?.name);
    return listProvince.join(" | ");
  };
  const custom: Settings = {
    dots: true,
    infinite: true,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    slidesPerRow: 2,
    rows: 2,
    appendDots: (dots) => <ul>{dots}</ul>,
    customPaging: (i) => <div className="ft-slick__dots--custom"></div>,
    responsive: [
      {
        breakpoint: 769,
        settings: {
          slidesPerRow: 1,
          rows: 2,
        },
      },
    ],
  };

  const { accountInfo } = useAuth();
  const userId = accountInfo?.userInfo?._id;

  const handleClickJob = (recruitmentId: string) => {
    if (userId === "" || !userId) return;
    dispatch(
      setSeenRecruitment({
        userId: userId,
        recruitmentId: recruitmentId,
      }),
    );
  };

  return (
    !loading &&
    data?.length > 0 && (
      <CardLayoutContainer className="container">
        <Title>{title}</Title>
        <SlickSlider custom={custom} className="slider-layout">
          {data?.map((item, index) => {
            return (
              <Card.Container key={`card-item-${index}`}>
                <LinkWrapper onClick={() => handleClickJob(item?._id)}>
                  <Link
                    routeName={PATH.JOB_DETAIL}
                    params={{ slug: item?.slug }}
                  >
                    <Card.ContainerLogo>
                      <Card.Logo>
                        <Card.Img
                          src={
                            item?.companyLogo?.small ||
                            item?.companyLogo?.default ||
                            "/img/skeleton/default-small.jpg"
                          }
                        />
                      </Card.Logo>
                    </Card.ContainerLogo>
                    <Card.Text>
                      <Card.Name>{item?.name}</Card.Name>
                      <Card.Company>{item?.companyName}</Card.Company>
                      <Card.Province>
                        {renderLocation(item?.location)}
                      </Card.Province>
                    </Card.Text>
                  </Link>
                </LinkWrapper>
              </Card.Container>
            );
          })}
        </SlickSlider>
      </CardLayoutContainer>
    )
  );
};

export default CardLayout;

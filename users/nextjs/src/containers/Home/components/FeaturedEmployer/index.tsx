import { useTranslation } from "next-i18next";
import { Settings } from "react-slick";
import SlickSlider from "@designs/SlickSlider";

import { ICompany, IRootState } from "@common/typings";
import { PATH } from "@routes";

import {
  FeaturedEmployerContainer,
  Title,
  ItemWrapper,
  Item,
  ItemContent,
  ImageWrapper,
  Image,
  InfoWrapper,
  Name,
  Location,
  ImageContainer,
  ButtonContainer,
  Button,
} from "./styles";
import { useSelector } from "react-redux";

interface IFeaturedEmployerProps {}

const skeletonImage = "/img/skeleton/default-small.jpg";

const FeaturedEmployer: React.FC<IFeaturedEmployerProps> = (props) => {
  const {
    allCompany: { results: listCompany = [], loading: loadingCompany = true },
  } = useSelector((state: IRootState) => state.company);

  const { t } = useTranslation(["home"]);

  const custom: Settings = {
    infinite: true,
    slidesToShow: listCompany.length < 3 ? listCompany.length : 3,
    autoplay: true,
    centerMode: true,
    rows: 1,
    lazyLoad: "ondemand",
    speed: 500,
    responsive: [
      {
        breakpoint: 1366,
        settings: {
          slidesToShow: 2,
          className: "center",
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          className: "center",
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          centerMode: false,
        },
      },
    ],
  };

  return (
    !loadingCompany &&
    listCompany.length > 0 && (
      <FeaturedEmployerContainer>
        <Title>{t("employer.featured-employer")}</Title>
        <SlickSlider custom={custom}>
          {listCompany?.map((item, index) => (
            <ItemWrapper key="slider-layout">
              <Item className="group">
                <ItemContent>
                  <ImageContainer>
                    <ImageWrapper>
                      <Image
                        src={
                          item?.logo?.small ||
                          item?.logo?.default ||
                          skeletonImage
                        }
                        alt={item?.name}
                      />
                    </ImageWrapper>
                  </ImageContainer>
                  <InfoWrapper>
                    <Name title={item?.name} className="paragraph-with-2-line">
                      {item?.name}
                    </Name>
                    <Location
                      title={item?.location}
                      className="paragraph-with-1-line"
                    >
                      {item?.location}
                    </Location>
                  </InfoWrapper>
                </ItemContent>
                <ButtonContainer>
                  <Button
                    routeName={PATH.COMPANY_DETAIL}
                    params={{ slug: item?.slug }}
                  >
                    {t("employer.apply")}
                  </Button>
                </ButtonContainer>
              </Item>
            </ItemWrapper>
          ))}
        </SlickSlider>
      </FeaturedEmployerContainer>
    )
  );
};

export default FeaturedEmployer;

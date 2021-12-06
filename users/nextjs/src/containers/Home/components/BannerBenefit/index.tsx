import ListContent from "./components/ListContent";
import { Container, Content, Image, Wrapper } from "./style";

interface IPropsBenefit {}

const dataBenefitBanner = [
  {
    title: "Khám phá nghề nghiệp mơ ước",
    content:
      "Khám phá nghề nghiệp mơ ước và ứng tuyển hàng ngàn việc làm nổi bật nhất hiện nay!",
  },
  {
    title: "Phát triển kỹ năng chuyên môn",
    content: "Nắm bắt cơ hội phát triển kỹ năng chuyên môn của bạn",
  },
  {
    title: "Kết nối với nhiều công ty",
    content:
      "Đừng bỏ lỡ cơ hội kết nối với các công ty và nắm bắt cơ hội việc làm mới nhất",
  },
];

const BannerBenefit: React.FC<IPropsBenefit> = () => {
  return (
    <Wrapper>
      <Container className="container">
        <Image
          src={"./img/home/banner-benefit.png"}
          alt="User banner benefit"
        />
        <Content>
          <ListContent data={dataBenefitBanner} />
        </Content>
      </Container>
    </Wrapper>
  );
};

export default BannerBenefit;

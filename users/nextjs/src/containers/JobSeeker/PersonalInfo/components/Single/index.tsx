import { useTranslation } from "next-i18next";
import moment from "moment";

import {
  IDistrict,
  IGenderType,
  IProvince,
  IStreet,
  IWard,
} from "@common/typings";
import { SVG } from "@designs/SVG";

import EditSingleDialog from "./components/EditSingleDialog";
import {
  Container,
  Item,
  ItemWrapper,
  Label,
  Text,
  Title,
  TitleWrapper,
} from "./styles";

export interface ISingleProps {
  phoneNumber: string;
  email: string;
  idCard?: string;
  dateOfBirth: Date;
  province: IProvince;
  district: IDistrict;
  ward: IWard;
  address?: IStreet | null;
  gender: IGenderType;
  userId: string;
}

const Single: React.FC<ISingleProps> = (props) => {
  const {
    phoneNumber,
    email,
    idCard,
    dateOfBirth,
    province,
    district,
    ward,
    userId,
    address,
    gender,
  } = props;
  const { t } = useTranslation(["job-management", "common"]);

  const handleRenderGender = () => {
    if (gender === "male") {
      return t("common:gender.male");
    }
    if (gender === "female") {
      return t("common:gender.female");
    }
  };

  return (
    <Container>
      <TitleWrapper>
        <Title>{t("personal-info.single.persona-info")}</Title>
        <EditSingleDialog
          ButtonMenu={<SVG name="job-management/edit" />}
          {...props}
        />
      </TitleWrapper>

      <ItemWrapper>
        <Item>
          <Label>{t("personal-info.single.phone-number")} :</Label>
          <Text>{phoneNumber}</Text>
        </Item>

        <Item>
          <Label>{t("personal-info.single.email")} :</Label>
          <Text>{email}</Text>
        </Item>

        <Item>
          <Label>{t("personal-info.single.id-card")} :</Label>
          <Text>{idCard}</Text>
        </Item>

        <Item>
          <Label>{t("personal-info.single.date-of-birth")} : </Label>
          <Text>
            {!!dateOfBirth && moment(dateOfBirth).format("DD/MM/YYYY")}
          </Text>
        </Item>

        <Item>
          <Label>{t("personal-info.single.province")} : </Label>
          <Text>{province?.name}</Text>
        </Item>

        <Item>
          <Label>{t("personal-info.single.district")} : </Label>
          <Text>{district?.name}</Text>
        </Item>

        <Item>
          <Label>{t("personal-info.single.wards")} : </Label>
          <Text>{ward?.name}</Text>
        </Item>

        <Item>
          <Label>{t("personal-info.single.address")} : </Label>
          <Text>{address?.name}</Text>
        </Item>

        <Item>
          <Label>{t("personal-info.single.gender")} : </Label>
          <Text>{handleRenderGender()}</Text>
        </Item>
      </ItemWrapper>
    </Container>
  );
};

export default Single;

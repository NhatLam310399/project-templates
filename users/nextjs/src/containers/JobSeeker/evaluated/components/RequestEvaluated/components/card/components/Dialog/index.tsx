import { IAnswer } from "@common/typings";
import Dialog from "@components/Dialog";
import { useTranslation } from "react-i18next";
import {
  AvgPoint,
  AvgPointNumber,
  DialogWrapper,
  ItemPoint,
  NamePoint,
  Point,
  PointWrapper,
  Title,
} from "./style";

interface IEvaluateDialog {
  isOpen: boolean;
  onClose: () => void;
  listAnswer?: IAnswer[];
  avgPoint?: number;
}
const EvaluateDialog: React.FC<IEvaluateDialog> = ({
  isOpen,
  onClose,
  listAnswer,
  avgPoint,
}) => {
  const { t } = useTranslation(["job-management"]);
  return (
    <Dialog isOpen={isOpen} onClose={onClose} className="z-50 rounded-none">
      <DialogWrapper>
        <Title>{t("evaluate-candidate")}</Title>
        <AvgPoint>
          {t("average-point")} : <AvgPointNumber>{avgPoint}</AvgPointNumber>
        </AvgPoint>
        <PointWrapper>
          {listAnswer?.map((item, index) => (
            <ItemPoint key={index}>
              <NamePoint>{t(`${item?.answer?.name}`)}</NamePoint>
              <Point>{item?.answer?.point}</Point>
            </ItemPoint>
          ))}
        </PointWrapper>
      </DialogWrapper>
    </Dialog>
  );
};

export default EvaluateDialog;

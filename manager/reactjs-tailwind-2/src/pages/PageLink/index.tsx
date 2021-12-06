import { useQuery } from "common/hooks/useQuery";
import { useEffect } from "react";

type IType =
  | "industryDocDetailStack"
  | "productDetail"
  | "booking"
  | "companyDetail"
  | "projectDetail";
const PageLink: React.FC = props => {
  const query = useQuery();
  const type: IType = query.get("type") as IType;
  const id = query.get("id");

  useEffect(() => {
    if (type === "booking") {
      window.location.href = `ktv://app/${type}/place/${id}`;
    } else {
      window.location.href = `ktv://app/${type}/${id}`;
    }
  }, [type, id]);
  return <></>;
};

export default PageLink;

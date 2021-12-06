import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  ListHelpCenterTypeContainer,
  CategoryItem,
  ListCategory,
} from "./styles";

import Image from "designs/Image";
import Button from "designs/Button";
import { getAllHelpCenterLevel1, addLink } from "redux/actions/help";
import { IGetHelpCenterLevel1, IHelpCenterLevel1, IRootState } from "typings";
import { PATH } from "common/constants/routes";

interface IListHelpCenterTypeProps {}

const ListHelpCenterType: React.FC<IListHelpCenterTypeProps> = props => {
  const history = useHistory(); //useRedirect error
  const listHelpCenterLevel1 = useSelector(
    (state: IRootState) => state.help.listHelpCenterLevel1,
  );

  const disptach = useDispatch();
  useEffect(() => {
    disptach(getAllHelpCenterLevel1<IGetHelpCenterLevel1>({}));
  }, []);

  const onClickHelpCenter = (value: IHelpCenterLevel1) => {
    disptach(
      addLink([
        {
          title: value.nameCategoryLevel1,
          link: PATH.HELP_CENTER_DETAIL.replace(":id", `${value._id}`),
        },
      ]),
    );
    history.push(PATH.HELP_CENTER_DETAIL.replace(":id", `${value._id}`));
  };
  return (
    <ListHelpCenterTypeContainer>
      <ListCategory>
        {listHelpCenterLevel1
          ? listHelpCenterLevel1.map(value => (
              <CategoryItem.Container>
                <Image
                  src={value.image.default || "SVG/returns"}
                  width="140"
                  height="140"
                />
                <CategoryItem.Name>
                  {value.nameCategoryLevel1}
                </CategoryItem.Name>
                <Button
                  type="button"
                  size="lg"
                  onClick={e => onClickHelpCenter(value)}
                >{`See all articles`}</Button>
              </CategoryItem.Container>
            ))
          : null}
      </ListCategory>
    </ListHelpCenterTypeContainer>
  );
};

export default ListHelpCenterType;

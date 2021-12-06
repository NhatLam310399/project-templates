import { SellerContainer, SellerGrid } from "./styles";
import Product from "designs/cards/ProductBasic";
import { IRootState, IProductSchema } from "typings";
import { useRedirect } from "hooks/useRedirect";
import { useDispatch, useSelector } from "react-redux";
import { setProductSchema } from "redux/actions/productTemplate";
import { productDesignTempMock } from "common/constants/editor/mockData";
import { PATH } from "common/constants/routes";
interface ISellerProps {}

const Seller: React.FC<ISellerProps> = props => {
  const dispatch = useDispatch();
  const redirect = useRedirect();
  const {
    productSchemas: { results = [] },
  } = useSelector((state: IRootState) => state.product);
  const handleClickProduct = (product: IProductSchema) => {
    dispatch(setProductSchema(productDesignTempMock));
    redirect(PATH.PRODUCT_TEMPLATE_DETAIL);
  };
  return (
    <SellerContainer>
      <SellerGrid>
        {results?.map((product, index) => (
          <Product onClick={handleClickProduct} product={product} />
        ))}
      </SellerGrid>
    </SellerContainer>
  );
};

export default Seller;

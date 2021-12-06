import { productDesignTempMock } from "common/constants/editor/mockData";
import ProductSchemaCard from "designs/cards/ProductSchema";
import SVG from "designs/SVG";
import { useLoading } from "hooks/useLoading";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductSchemasSuccess } from "redux/actions/product";
import { setProductSchema } from "redux/actions/productTemplate";
import { IProductSchema, IRootState } from "typings";
import { AllProductSchemasContainer, ListItems } from "./styles";

interface IAllProductSchemasProps {
  onNextStep: () => void;
}

const AllProductSchemas: React.FC<IAllProductSchemasProps> = ({
  onNextStep,
}) => {
  const dispatch = useDispatch();
  const {
    productSchemas: { results = [] },
  } = useSelector((state: IRootState) => state.product);
  const { selected } = useSelector((state: IRootState) => state.category);

  const { isLoading, startLoading, stopLoading } = useLoading();

  useEffect(() => {
    // All this is fake data
    const LOADING_PRODUCT_SCHEMAS = "LOADING_PRODUCT_SCHEMAS";
    startLoading(LOADING_PRODUCT_SCHEMAS);
    setTimeout(() => {
      dispatch(
        getAllProductSchemasSuccess({
          results: [productDesignTempMock],
          totalCount: 1,
        }),
      );
      stopLoading(LOADING_PRODUCT_SCHEMAS);
    }, 1000);
  }, [selected]);

  const handleSelectProduct = (product: IProductSchema) => {
    dispatch(setProductSchema(product));
    onNextStep();
  };

  return (
    <AllProductSchemasContainer>
      <ListItems>
        {results.map(productSchema => (
          <ProductSchemaCard
            productSchema={productSchema}
            onClick={() => handleSelectProduct(productSchema)}
          />
        ))}
      </ListItems>
    </AllProductSchemasContainer>
  );
};

export default AllProductSchemas;

const EmptyProduct: React.FC = () => {
  return (
    <SVG
      className="absolute transform -translate-x-1/2 pointer-events-none select-none left-1/2"
      name="product-template/empty-product"
      width="500px"
      height="500px"
    />
  );
};

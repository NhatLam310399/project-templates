import { graphQLCommon } from "common/utils/api";
import { gql } from "apollo-boost";
import {
  IById,
  ICreateProduct,
  IGetAllProduct,
  IUpdateProduct,
} from "common/typings";

const GET_ALL_PRODUCT = gql`
  query ($filterProduct: FilterProduct, $page: Int, $size: Int) {
    getAllProduct(filterProduct: $filterProduct, page: $page, size: $size) {
      totalCount
      results {
        _id
        image {
          default
          small
          medium
        }
        video
        type {
          _id
          name
        }
        highlight
        user {
          _id
          displayName
          username
          email
          phoneNumber
        }
        company {
          _id
          name
          phoneNumber
          email
        }
        name
        price
        description
        regulations
        province {
          _id
          code
          name
        }
        company {
          _id
          name
        }
        district {
          _id
          code
          name
        }
        ward {
          _id
          code
          name
        }
        keywords
        createdAt
      }
    }
  }
`;

export const getAllProduct = async (variables: IGetAllProduct) => {
  const response = await graphQLCommon(GET_ALL_PRODUCT, variables);
  return response;
};

const CREATE_PRODUCT = gql`
  mutation ($productCreateInput: ProductCreateInput) {
    createProduct(productCreateInput: $productCreateInput) {
      _id
      name
    }
  }
`;

export const createProduct = async (variables: ICreateProduct) => {
  const response = await graphQLCommon(CREATE_PRODUCT, variables);
  return response;
};

const UPDATE_PRODUCT = gql`
  mutation ($id: String, $productUpdateInput: ProductUpdateInput) {
    updateProduct(id: $id, productUpdateInput: $productUpdateInput) {
      _id
      name
    }
  }
`;

export const updateProduct = async (variables: IUpdateProduct) => {
  const response = await graphQLCommon(UPDATE_PRODUCT, variables);
  return response;
};

const DELETE_PRODUCT = gql`
  mutation ($id: String!) {
    deleteProduct(id: $id)
  }
`;

export const deleteProduct = async (variables: IById) => {
  const result = await graphQLCommon(DELETE_PRODUCT, variables);
  return result;
};

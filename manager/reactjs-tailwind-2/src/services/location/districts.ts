import { gql } from "apollo-boost";
import { graphQLCommon } from "common/utils/api";
import { IGetDistricts, IUpdateDistrict } from "common/typings";

const GET_DISTRICTS = gql`
  query ($page: Int = 0, $size: Int, $province_code: String) {
    getDistrictsByProvince(
      province_code: $province_code
      page: $page
      size: $size
    ) {
      totalCount
      districts {
        _id
        name
        code
        unit
        province_name
        province_code
      }
    }
  }
`;
export const getDistricts = async (variables: IGetDistricts) => {
  const result = await graphQLCommon(GET_DISTRICTS, variables);
  return result;
};

const UPDATE_DISTRICT = gql`
  mutation ($id: String!, $input: DistrictInput!) {
    updateDistrict(id: $id, districtInput: $input) {
      name
    }
  }
`;
export const updateDistrict = async (variables: IUpdateDistrict) => {
  const result = await graphQLCommon(UPDATE_DISTRICT, variables);
  return result;
};

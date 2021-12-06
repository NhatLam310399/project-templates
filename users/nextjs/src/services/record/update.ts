import { gql } from "apollo-boost";

import { graphQLCommon } from "@common/utils/api";
import { IRecordUpdateInput } from "@common/typings";

const UPDATE_RECORD = gql`
  mutation UpdateRecordMutation(
    $id: String!
    $recordUpdateInput: RecordUpdateInput!
  ) {
    updateRecord(id: $id, recordUpdateInput: $recordUpdateInput) {
      _id
    }
  }
`;

export const updateRecord = async (variables: IRecordUpdateInput) => {
  const response = await graphQLCommon(UPDATE_RECORD, variables);
  return response;
};

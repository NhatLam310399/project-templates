import { gql } from "apollo-boost";

import { graphQLCommon } from "@common/utils/api";
import { IRecordCreateInput } from "@common/typings";

const CREATE_RECORD = gql`
  mutation CreateRecordMutation($recordCreateInput: RecordCreateInput!) {
    createRecord(recordCreateInput: $recordCreateInput) {
      _id
    }
  }
`;

export const createRecord = async (variables: IRecordCreateInput) => {
  const response = await graphQLCommon(CREATE_RECORD, variables);
  return response;
};

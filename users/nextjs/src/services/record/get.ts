import { graphQLCommon } from "@common/utils/api";
import { gql } from "apollo-boost";
import {
  IGetAllRecord,
  IGetRecordById,
  IGetRecordByUserId,
} from "@common/typings";

const GET_ALL_RECORD = gql`
  query($filterRecord: FilterRecord, $page: Int, $size: Int) {
    getAllRecord(filterRecord: $filterRecord, page: $page, size: $size) {
      totalCount
      results {
        _id
        user {
          firstName
          lastName
          urlAvt {
            default
            medium
            small
          }
        }
        candidateCode
        workSaved {
          name
        }
        point
        evaluator {
          firstName
          lastName
        }
      }
    }
  }
`;

export const getAllRecord = async (variables: IGetAllRecord) => {
  const response = await graphQLCommon(GET_ALL_RECORD, variables);
  return response;
};

const GET_RECORD_BY_ID = gql`
  query($id: String!) {
    getRecordById(id: $id) {
      _id
      user {
        _id
        displayName
        firstName
        lastName
        urlAvt {
          medium
          default
          small
        }
      }
      jobType
      generalInformation
      workExperience {
        companyName
        jobName
        timeStart
        timeEnd
        experience
        description
      }
      education {
        schoolName
        major
        timeStart
        timeEnd
        degree
        description
      }
      workPlace {
        _id
        name
        nameEn
        code
        countryCode
      }
      career {
        _id
        icon {
          default
          medium
          small
        }
        name
        categoryLevel1 {
          name
        }
        description
      }
      jobLevelWanted
      salaryWanted
      benefitsWanted {
        icon {
          default
          small
          medium
        }
        name
        description
        keywords
      }
      employerSeenRecord {
        employer {
          _id
          username
          displayName
        }
        date
        views
      }
      description
      urlCV
      fileNameCV
      slug
      keywords
      createdAt
      updatedAt
    }
  }
`;
export const getRecordById = async (variables: IGetRecordById) => {
  const response = await graphQLCommon(GET_RECORD_BY_ID, variables);
  return response;
};

const GET_RECORD_BY_USER_ID = gql`
  query($userId: String!) {
    getRecordByUser(userId: $userId) {
      _id
      user {
        displayName
        firstName
        lastName
        urlAvt {
          medium
          default
          small
        }
      }
      jobType
      generalInformation
      workExperience {
        companyName
        jobName
        timeStart
        timeEnd
        experience
        description
      }
      education {
        schoolName
        major
        timeStart
        timeEnd
        degree
        description
      }
      workPlace {
        _id
        name
        nameEn
        code
        countryCode
      }
      career {
        _id
        icon {
          default
          medium
          small
        }
        name
        categoryLevel1 {
          name
        }
        description
      }
      jobLevelWanted
      salaryWanted
      benefitsWanted {
        _id
        icon {
          default
          small
          medium
        }
        name
        description
        keywords
      }
      employerSeenRecord {
        employer {
          _id
          username
          displayName
          company {
            _id
          }
        }
        date
        views
      }
      description
      urlCV
      fileNameCV
      slug
      keywords
      createdAt
      updatedAt
    }
  }
`;

export const getRecordByUserId = async (variables: IGetRecordByUserId) => {
  const response = await graphQLCommon(GET_RECORD_BY_USER_ID, variables);
  return response;
};
const CHECK_RECORD_USER_EXIST = gql`
query
  {
    checkRecordUserExist
  }
`;

export const checkRecordUserExist = async () => {
  const response = await graphQLCommon(CHECK_RECORD_USER_EXIST, null);
  return response;
};

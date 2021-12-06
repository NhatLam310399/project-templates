import styled from "styled-components";
import tw from "twin.macro";

export const FileUploadedContainer = styled.div`
  ${tw`pb-5  `}
`;

export const Title = styled.div`
  ${tw`pb-1 text-lg font-medium`}
`;

export const FileBoxWrapper = styled.div`
  ${tw`flex`}
`;
export const FileBox = styled.div`
  ${tw`py-2  px-1 gap-1 border-2 border-primary-1 border-solid flex items-start justify-center`}
`;
export const FileName = styled.div`
  ${tw`overflow-hidden `}
`;

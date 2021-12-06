import styled from "styled-components";
import tw from "twin.macro";

export const FileUploadedContainer = styled.div`
  ${tw`  `}
`;

export const Heading = {
  Wrapper: styled.div`
    ${tw`pb-2`}
  `,
  Title: styled.p`
    ${tw`font-medium text-lg text-neutral-1`}
  `,
  Decs: styled.span`
    ${tw`font-normal text-lg text-primary-1`}
    &:hover {
      ${tw`underline`}
    }
  `,
};

export const ValidatFile = styled.div`
  ${tw`mb-3`}
`;
export const ValidateDetected = {
  Title: styled.p`
    ${tw`font-medium pb-2 text-lg text-neutral-1`}
  `,
  Desc: styled.span`
    ${tw`font-medium text-lg text-primary-2`}
  `,
};

export const Progress = styled.div<{ errors: boolean }>`
  ${tw`w-full h-[24px] mb-1 rounded-sm relative`}

  ${({ errors }) => (errors ? tw`bg-sematic-1` : tw` bg-sematic-3`)}
  &::after {
    content: "";
    ${({ errors }) =>
      errors ? tw`absolute w-full h-[1px] bg-[#eeeeee] left-0 top-5` : tw``}
  }
`;

export const ValidateSuccess = styled.p`
  ${tw`font-medium text-lg text-sematic-3`}
`;

export const ValidateErorr = {
  wrapper: styled.div`
    ${tw`py-5  border-b-2 border-solid border-[#eeeeee]`}
  `,
};

export const Content = styled.div`
  ${tw`flex cursor-pointer gap-2 items-start pb-2 flex-wrap laptop:flex-nowrap`}
`;

export const ColLeft = {
  Container: styled.div`
    ${tw`flex gap-2 flex-shrink-0 items-center`}
  `,
  Title: styled.p`
    ${tw`font-medium text-neutral-1 text-xl`}
  `,
};

export const ColRight = {
  Container: styled.div`
    ${tw`flex gap-2`}
  `,
  IssueNumber: styled.div`
    ${tw`flex flex-shrink-0 justify-center items-center h-3 w-3 bg-sematic-1 rounded-full text-primary-3 font-normal text-lg`}
  `,
  Desc: styled.p`
    ${tw`font-medium text-sematic-1 text-xl`}
  `,
};

export const Collapses = {
  Container: styled.div`
    ${tw`flex items-center gap-2`}
  `,
  Close: styled.div`
    ${tw`flex justify-center items-center h-3 w-3 bg-sematic-1 rounded-full text-primary-3 font-normal text-lg`}
  `,
  Desc: styled.p`
    ${tw`font-normal text-lg text-neutral-2`}
  `,
};

export const Orther = {
  Container: styled.div`
    ${tw`pt-2 flex items-center gap-2  flex-wrap`}
  `,
  Desc: styled.p`
    ${tw`font-medium text-lg text-primary-1 cursor-pointer`}
  `,
};

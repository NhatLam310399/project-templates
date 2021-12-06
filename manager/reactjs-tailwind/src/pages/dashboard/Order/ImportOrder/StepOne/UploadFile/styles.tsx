import styled from "styled-components";
import tw from "twin.macro";

export const UploadFileContainer = styled.div`
  ${tw` flex items-center px-2 justify-center mb-9 h-10 border-2 border-dotted border-[#e5e5e5] `}
  ${tw`laptop:px-0`}
  &:hover {
    ${tw`shadow-md`}
  }
`;
export const WrapperUpload = styled.div`
  ${tw`flex gap-2  items-center justify-center`}
`;

export const Add = styled.div`
  ${tw` flex items-center justify-center rounded-full h-4 w-4  text-primary-3 font-medium`}
`;

export const Content = styled.div`
  ${tw`flex flex-col gap-0.5`}
`;

export const Title = styled.p`
  ${tw`text-neutral-1 font-medium text-xl`}
`;

export const Description = styled.p`
  ${tw`text-neutral-1 font-normal text-md`}
`;

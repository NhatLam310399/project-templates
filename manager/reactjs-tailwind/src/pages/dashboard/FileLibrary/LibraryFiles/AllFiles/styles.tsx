import styled from "styled-components";
import tw from "twin.macro";
import _Button from "designs/Button";
export const AllFilesContainer = styled.div`
  ${tw`w-full mt-2.5`}
`;
export const Title = styled.h3`
  ${tw`pb-1 text-xl font-medium border-b text-neutral-1 border-neutral-4`}
`;
export const FileList = styled.div`
  ${tw`grid w-full grid-cols-4 gap-2 mt-2 laptop:grid-cols-12 phone:grid-cols-9 `}
`;
export const ShowMore = styled.button`
  ${tw`flex mt-2.5 items-center justify-center w-full text-lg font-medium text-primary-1 gap-1`}
`;
export const Text = styled.p`
  ${tw``}
`;
export const Icon = styled.div`
  ${tw`w-2.5 h-2.5`}
`;
export const SkeletonContainer = styled.div`
  ${tw` text-center flex flex-col py-3 items-center`}
`;

export const SkeletonMessage = styled.p`
  ${tw` text-lg font-normal  `}
`;
export const WrapperCheckBox = styled.div`
  ${tw`flex phone:h-4 mt-2.5 phone:flex-row flex-col items-start  phone:items-center gap-1.5`}
`;

export const Button = styled(_Button)`
  ${tw``}
`;
export const ButtonWrapper = styled.div<{ active: boolean }>`
  ${tw`flex gap-1 duration-300`}
  ${({ active }) => (active ? tw`opacity-100` : tw`opacity-0`)}
`;

export const PaginationWrapper = styled.div`
  ${tw`hidden items-center mt-2 phone:flex justify-center`}
`;
export const PaginationMobile = styled.div`
  ${tw`flex items-center mt-2 phone:hidden justify-center`}
`;

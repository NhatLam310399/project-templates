import styled from "styled-components";
import tw from "twin.macro";
import { Form as _Form } from "formik";
import _Button from "designs/Button";

export const FileLibraryContainer = styled.div`
  ${tw`w-full`}
`;
export const Header = styled.div`
  ${tw`flex justify-between gap-2`}
`;
export const HeaderFilter = styled.div`
  ${tw`flex items-center w-full gap-2`}
`;
export const HeaderUpload = styled.div`
  ${tw`flex justify-end w-full gap-2 phone:w-1/2`}
`;
export const Upload = styled(_Button)`
  ${tw`w-15`}
`;
export const UploadIcon = styled(_Button)`
  ${tw`w-5 p-1`}
`;
export const Form = styled(_Form)`
  ${tw`w-full max-w-[330px] `}
`;
export const DropdownItem = styled.p`
  ${tw`p-1 text-lg font-normal text-neutral-1`}
`;
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
export const PaginationWrapper = styled.div`
  ${tw`hidden items-center mt-2 phone:flex justify-center`}
`;
export const PaginationMobile = styled.div`
  ${tw`flex items-center mt-2 phone:hidden justify-center`}
`;

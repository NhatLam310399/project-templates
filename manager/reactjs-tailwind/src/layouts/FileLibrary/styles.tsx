import styled from "styled-components";
import tw from "twin.macro";
import { Form as _Form } from "formik";
import _Button from "designs/Button";

export const FileLibraryContainer = styled.div`
  ${tw`w-full my-4`}
`;
export const Header = styled.div`
  ${tw`flex laptop:flex-row flex-col laptop:justify-between gap-2 mb-2.5`}
`;
export const HeaderFilter = styled.div`
  ${tw`flex phone:flex-row flex-col items-center w-full gap-2`}
`;
export const HeaderUpload = styled.div`
  ${tw`flex justify-start items-center laptop:justify-end w-full gap-2 laptop:w-1/2`}
`;

export const UploadIcon = styled(_Button)`
  ${tw`w-5 p-1 h-full`}
`;
export const Form = styled(_Form)`
  ${tw`w-full phone:w-1/2 laptop:max-w-[330px] `}
`;
export const DropdownItem = styled.p`
  ${tw`p-1 text-lg font-normal text-neutral-1`}
`;
export const Content = styled.div`
  ${tw``}
`;

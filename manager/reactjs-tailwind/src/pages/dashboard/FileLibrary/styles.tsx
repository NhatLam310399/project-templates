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
export const Icon = styled.div`
  ${tw`w-2 h-2 min-w-max`}
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

import styled from "styled-components";
import tw from "twin.macro";
import { Form as _Form } from "formik";
import _Button from "designs/Button";
import _BaseButton from "designs/BaseButton";

export const EmptyContainer = styled.div`
  ${tw`w-full mt-2.5`}
`;
export const Content = styled.div`
  ${tw`grid grid-cols-12 w-full phone:gap-0 gap-y-2`}
`;

export const ContentImage = styled.div`
  ${tw`flex col-span-12 phone:col-span-5 laptop:col-span-4 flex-col items-center justify-start gap-2`}
`;
export const ImageWrapper = styled.div`
  ${tw`laptop:w-32 laptop:h-32 phone:w-25 phone:h-25`}
`;

export const Text = styled.p`
  ${tw`text-lg font-normal text-center text-neutral-2`}
`;
export const UploadContainer = styled.div`
  ${tw`flex justify-center gap-2`}
`;
export const Upload = styled(_Button)`
  ${tw``}
`;

export const UploadIcon = styled(_Button)`
  ${tw`w-5 p-1`}
`;
export const HighlightText = styled.span`
  ${tw`font-medium`}
`;
export const Link = styled.a`
  ${tw`text-lg font-normal text-primary-1`}
`;
export const Note = styled.div`
  ${tw`flex my-2.5 font-normal bg-neutral-5 text-neutral-1 w-full text-left px-2 py-1.5`}
  ${Text} {
    ${tw`text-left`}
  }
`;
export const LineCenter = styled.div`
  ${tw`col-span-12 phone:col-span-2 laptop:col-span-4 flex flex-row phone:flex-col items-center justify-start  max-h-[430px]`}
`;
export const Line = styled.div`
  ${tw`relative phone:w-[1px] phone:h-full h-[1px] w-full bg-neutral-3`}
`;
export const Circle = styled.div`
  ${tw`w-4 h-4 p-1 text-xl font-medium flex  items-center justify-center border rounded-full bg-neutral-5 border-neutral-3 text-neutral-3`}
`;
export const LineText = styled.p`
  ${tw``}
`;

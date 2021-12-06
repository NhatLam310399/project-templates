import styled from "styled-components";
import tw from "twin.macro";
import { Form as _Form } from "formik";
import _Button from "designs/Button";
import _BaseButton from "designs/BaseButton";

export const TopDialog = styled.div`
  ${tw`flex items-center justify-between px-3 py-2`}
`;
export const Title = styled.h3`
  ${tw`font-bold text-xxl text-neutral-1`}
`;
export const Close = styled(_BaseButton)`
  ${tw`w-3.5 h-3.5`}
`;
export const ContentWrapper = styled.div`
  ${tw`px-3 py-1 border-t border-b border-neutral-4`}
  .carousel {
    .arrow-next-pre {
      ${tw`w-auto`}
    }
  }
  .carousel .thumbs {
    ${tw`phone:flex phone:justify-center phone:gap-2`}
    .thumb.selected, .thumb:hover {
      ${tw`border-2 border-primary-1`}
    }
  }
`;

export const DetailFileWrapper = styled.div`
  ${tw`p-2`}
`;
export const Name = styled.input`
  ${tw`font-bold outline-none text-xxl text-neutral-1 focus:ring-0 focus:outline-none`}
`;
export const FileName = styled.div`
  ${tw`flex items-center gap-1`}
`;
export const SizeAndTime = styled.div`
  ${tw`text-xl font-normal text-neutral-2`}
`;

export const Button = styled(_Button)`
  ${tw`w-auto `}
`;
export const Download = styled.a`
  ${tw``}
`;
export const Text = styled.p`
  ${tw`text-lg font-normal text-neutral-2`}
`;
export const Label = styled.label`
  ${tw`font-normal text-md text-neutral-2`}
`;
export const CheckboxWrapper = styled.div`
  ${tw`flex items-start w-full mt-2`}
`;
export const ImagePreview = styled.div`
  ${tw`flex justify-center w-full h-35`}
`;
export const Image = styled.img`
  ${tw`object-cover w-full max-w-27`}
`;

export const ButtonWrapper = styled.div`
  ${tw`flex justify-end w-full gap-2 px-3 py-2 border-t border-neutral-4`}
`;
export const ThumbsWrapper = styled.div`
  ${tw`flex items-center min-w-[70px] justify-center phone:h-8`}
`;

export const Thumbs = styled.img`
  ${tw`object-cover w-full max-w-7 phone:max-w-full `}
`;
export const Arrow = styled.button`
  ${tw`absolute z-20 flex items-center justify-center w-4 h-4 border-2 rounded-full border-neutral-2 top-1/2`}
`;

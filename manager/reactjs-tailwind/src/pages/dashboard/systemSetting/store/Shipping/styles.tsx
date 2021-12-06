import styled from "styled-components";
import tw from "twin.macro";
import { Form as _Form } from "formik";
import _Button from "designs/Button";

export const ShippingContainer = styled.div`
  ${tw`w-full my-2.5`}
`;
export const Form = styled(_Form)`
  ${tw`col-span-1 max-w-45 phone:col-span-6`}
  .group {
    ${tw`pl-0 `}
  }
  .placeholder {
    ${tw`pl-1.5`}
  }
`;
export const Option = styled.div`
  ${tw`flex items-center gap-1`}
`;
export const Logo = styled.div`
  ${tw`px-1 py-[16px] bg-neutral-4`}
`;
export const Img = styled.img`
  ${tw`object-cover w-full`}
`;
export const Name = styled.p`
  ${tw`font-normal text-md text-neutral-1`}
`;
export const SubTitle = styled.p`
  ${tw`text-xl mt-2.5 font-medium text-neutral-1`}
`;
export const Description = styled.p`
  ${tw`font-normal phone:text-left text-justify  text-lg text-neutral-2 mt-2.5`}
`;

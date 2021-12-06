import { ToastContainer } from "react-toastify";
import styled from "styled-components";
import tw from "twin.macro";
import { SVG } from "@designs/SVG";

export const StyledToastContainer = styled(ToastContainer).attrs({
  toastClassName: "toast-notify",
  bodyClassName: "toast-body",
})`
  ${tw`w-50 laptop:w-65 h-10`}

  svg {
    display: block;
  }

  .toast-notify {
    ${tw`p-0 w-full h-full`}
  }

  .toast-body {
    ${tw`flex items-center p-0 m-0`}
  }

  .Toastify__close-button {
    ${tw`mr-3 my-auto`}
    svg {
      ${tw`min-w-2 h-2`}
    }
  }

  .Toastify__toast--success {
    ${tw`bg-successful`}
  }
  .Toastify__toast--error {
    ${tw`bg-error`}
  }
`;

export const IconWrapper = styled.div`
  ${tw`h-full bg-black bg-opacity-20 px-1 flex items-center justify-center`}
`;

export const Icon = styled(SVG)`
  ${tw`min-w-2 h-2`}
`;

export const Content = styled.div`
  ${tw`py-1.5 pl-3 pr-2`}
`;

export const Title = styled.p`
  ${tw`text-14 laptop:text-16 font-bold mb-0.2 phone:mb-1 leading-6`}
`;

export const Message = styled.p`
  ${tw`text-13 laptop:text-13 font-normal`}
`;

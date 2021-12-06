import styled from "styled-components";
import tw from "twin.macro";

import { Form as _Form } from "formik";

export const FormContainer = styled.div`
  ${tw`pt-4`}
`;

export const Forms = styled(_Form)`
  ${tw``}
`;

export const WrapperInput = styled.div<{ col?: boolean }>`
  ${tw`pb-2 w-full`}
  ${({ col }) =>
    col
      ? tw`flex gap-2 phone:justify-between phone:flex-row flex-col justify-start`
      : null}
`;

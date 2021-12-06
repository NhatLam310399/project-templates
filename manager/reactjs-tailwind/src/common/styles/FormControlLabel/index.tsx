import styled from "styled-components";
import tw from "twin.macro";

interface IFormLabelProps {
  isError: boolean;
  required: boolean | undefined;
  htmlFor?: string;
}

const FormControlLabel: React.FC<IFormLabelProps> = ({
  children,
  isError,
  required,
  htmlFor,
}) => {
  if (!children) return null;

  return (
    <FormLabelContainer htmlFor={htmlFor} isError={isError}>
      {children}
      {required && <RequireLabel>*</RequireLabel>}
    </FormLabelContainer>
  );
};

export default FormControlLabel;

const FormLabelContainer = styled.label<{ isError: boolean }>`
  ${tw` font-semibold text-lg mb-0.5 flex flex-row`}
  ${({ isError }) => (isError ? tw`text-sematic-1` : tw`text-neutral-1`)}
`;

const RequireLabel = styled.p`
  ${tw`font-semibold text-sematic-1`}
`;

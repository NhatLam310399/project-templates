import styled from "styled-components";
import tw from "twin.macro";

export const Container = styled.div`
  ${tw``}
`;

export const UploadWrapper = styled.div`
  ${tw` p-1.5 cursor-pointer `}
`;

export const Input = styled.input`
  ${tw`absolute opacity-0 -z-1`}
`;

export const AvatarWrapper = styled.div`
  ${tw`relative`}
`;

export const Button = styled.button`
  ${tw`absolute pointer-events-none bottom-0 right-0 rounded-full`}
`;

export const Label = styled.label`
  ${tw``}
`;

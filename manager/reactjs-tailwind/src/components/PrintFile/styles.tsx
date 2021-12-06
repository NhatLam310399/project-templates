import tw from "twin.macro";
import styled from "styled-components";

export const PrintFileContainer = styled.div`
  ${tw`p-1 rounded-lg w-15 shadow-as-border`}
`;

export const Name = styled.p`
  ${tw`font-semibold text-md`}
`;
export const PreviewImage = styled.div`
  ${tw`w-full`}
`;
export const Image = styled.img`
  ${tw`w-full h-auto mt-1`}
`;

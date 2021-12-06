import styled from "styled-components";
import tw from "twin.macro";

export const TopBarContainer = styled.header`
  ${tw`flex justify-between items-center h-8 px-10 border-b border-solid text-neutral-2 border-neutral-4`}
`;

export const Box = styled.div`
  ${tw` flex flex-row items-center gap-1 phone:gap-2.5 `}
`;

export const Logo = styled.div`
  ${tw`relative flex items-center gap-3 `}
  &::after {
    content: "";
    height: 30px;
    width: 1.5px;
    position: absolute;
    background-color: #000;
    top: 50%;
    right: 90px;
    z-index: 10;
    transform: translateY(-50%);
  }
`;
export const Img = styled.img`
  ${tw`w-15 h-4 `}
`;

export const Title = styled.p`
  ${tw`font-medium text-lg text-neutral-1`}
`;

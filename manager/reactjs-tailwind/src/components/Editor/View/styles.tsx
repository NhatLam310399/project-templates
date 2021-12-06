import styled, { css } from "styled-components";
import tw from "twin.macro";

export const ViewContainer = styled.div`
  ${tw`relative min-w-[800px] flex flex-col items-center w-full h-auto `}
`;

export const CanvasContainer = styled.div`
  ${tw`relative `}
`;

export const Canvas = styled.canvas`
  ${tw`w-80 h-80`}
`;

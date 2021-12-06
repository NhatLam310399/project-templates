import styled from "styled-components";
import tw from "twin.macro";
import { ISkeletonProps } from ".";

export const SkeletonContainer = styled.div`
  ${tw`flex flex-col gap-1 animate-pulse `}
`;

export const SkeletonItem = styled.span<ISkeletonProps>`
  ${tw`inline-block bg-no-repeat `}
  ${({ width }) => (width !== null ? `width: ${width}` : tw`w-full`)}
  ${({ height }) => (height !== null ? `height: ${height}` : tw`h-full`)}
  ${({ circle }) => (circle ? tw`rounded-full` : tw`rounded-md`)}
`;

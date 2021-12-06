import styled from "styled-components";
import tw from "twin.macro";
export const FoldersContainer = styled.div`
  ${tw`w-full mt-2.5`}
`;
export const Title = styled.h3`
  ${tw`text-xl font-medium text-neutral-1`}
`;
export const FolderList = styled.div`
  ${tw`grid w-full grid-cols-12 gap-2 mt-1`}
`;

export const ShowMore = styled.button`
  ${tw`flex mt-2.5 items-center justify-center w-full text-lg font-medium text-primary-1 gap-1`}
`;
export const Text = styled.p`
  ${tw``}
`;
export const Icon = styled.div`
  ${tw`w-2.5 h-2.5`}
`;

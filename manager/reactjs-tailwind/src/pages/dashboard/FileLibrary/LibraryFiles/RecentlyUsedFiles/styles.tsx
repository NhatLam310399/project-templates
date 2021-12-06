import styled from "styled-components";
import tw from "twin.macro";
export const RecentlyUsedFilesContainer = styled.div`
  ${tw`w-full`}
`;
export const Title = styled.h3`
  ${tw`text-xl font-medium text-neutral-1`}
`;
export const FileList = styled.div`
  ${tw`grid w-full grid-cols-12 gap-2 mt-1 `}
`;

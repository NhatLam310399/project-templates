import styled from "styled-components";
import tw from "twin.macro";
export const FolderContainer = styled.button`
  ${tw`w-full duration-300 hover:bg-neutral-5`}
`;
export const FolderWrapper = styled.div`
  ${tw` w-full flex items-center justify-center gap-1 p-1 rounded-lg min-h-[93px] border border-dashed border-neutral-3`}
`;
export const Icon = styled.div`
  ${tw`w-2.5 h-2.5`}
`;
export const Text = styled.p`
  ${tw`text-lg font-normal text-neutral-1`}
`;

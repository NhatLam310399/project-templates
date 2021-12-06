import styled from "styled-components";
import tw from "twin.macro";

export const Container = styled.div`
  ${tw`py-4`}
`;
export const EmptyJob = styled.div`
  ${tw`flex flex-col items-center`}
`;
export const Text = styled.p`
  ${tw`mt-2 font-normal text-16`}
`;
export const ListCard = styled.div`
  ${tw`grid max-h-[72vh] grid-cols-1 gap-2 overflow-y-auto`}
`;

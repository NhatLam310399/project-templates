import styled from "styled-components";
import tw from "twin.macro";
export const FileContainer = styled.button`
  ${tw`w-full duration-300 rounded-lg bg-neutral-5 hover:bg-neutral-4`}
`;
export const File = styled.div`
  ${tw`grid w-full col-span-6  phone:col-span-3 grid-cols-12 gap-1 p-1  min-h-[84px] `}
`;
export const ImageWrapper = styled.div`
  ${tw`col-span-3 laptop:col-span-4 max-w-6.5 rounded-lg`}
`;
export const FileName = styled.div`
  ${tw`flex items-center h-full col-span-9 laptop:col-span-8`}
`;

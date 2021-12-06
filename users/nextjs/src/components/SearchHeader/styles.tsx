import styled from "styled-components";
import tw from "twin.macro";

export const SearchSelect = styled.div`
  ${tw`mb-2 py-3 bg-primary text-white`}
`;

export const Container = styled.div`
  ${tw`container mx-auto`}
`;

export const Row = styled.div`
  ${tw`flex flex-wrap gap-2`}
`;
export const FilterSearch = styled.div`
  ${tw`laptop:flex-1 w-full`}
`;
export const FilterSelect = styled.div`
  ${tw`w-full laptop:w-1/4`}
`;

export const FilterButton = styled.div`
  ${tw` flex-shrink-0 flex-grow-0 w-full laptop:max-w-[180px]`}
`;

export const Tag = styled.button`
  ${tw`block py-1 px-2 leading-none rounded border border-white border-solid hover:text-secondary`}
`;

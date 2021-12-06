import tw from "twin.macro";
import styled from "styled-components";

export const Container = styled.div`
  ${tw`phone:p-4 phone:mb-4 p-2 mb-2 bg-white`}
`;

export const Title = styled.h1`
  ${tw`mr-auto font-bold text-black phone:text-26 text-24 leading-tight`}
`;

export const TitleWrapper = styled.div`
  ${tw`flex flex-row items-center mb-4`}
`;

export const ItemWrapper = styled.div`
  ${tw`mb-1`}
`;

export const Item = styled.div`
  ${tw`flex phone:flex-row flex-col laptop:grid laptop:grid-cols-12 py-1 border-b border-solid border-grey `}
`;

export const Text = styled.p`
  ${tw`mr-1 font-medium text-black break-words laptop:col-span-9 phone:text-16 text-14`}
`;

export const Label = styled(Text)`
  ${tw`font-normal phone:w-21 laptop:w-auto laptop:col-span-3`}
`;

export const Span = styled.span`
  ${tw``}
`;

export const Benefits = styled.div``;

export const BenefitWrapper = styled.div`
  ${tw`flex flex-row flex-wrap gap-2 mt-2`}
`;

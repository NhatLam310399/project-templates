import tw from "twin.macro";
import styled from "styled-components";

export const Container = styled.div<{ enabled: boolean }>`
  ${tw`h-10.5 w-17 border border-solid flex flex-col justify-center items-center px-1 cursor-pointer select-none`}
  ${(props) => (props.enabled ? tw`border-secondary` : tw`border-grey`)}
`;

export const Text = styled.p`
  ${tw`mt-0.5 font-normal text-center text-black phone:text-16 text-14`}
`;

export const BenefitWrapper = styled.div`
  ${tw`flex flex-row flex-wrap gap-2 mt-2`}
`;

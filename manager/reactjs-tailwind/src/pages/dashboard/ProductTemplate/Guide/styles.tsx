import styled from "styled-components";
import tw from "twin.macro";
import Image from "designs/Image";

export const GuideContainer = styled.div`
  ${tw`py-2 rounded-lg bg-neutral-5 mt-2.5 `}
`;

export const Title = styled.h2`
  ${tw`font-bold text-center text-xxl mb-2.5`}
`;

export const StepsContainer = styled.div`
  ${tw`w-full overflow-x-auto `}
`;

export const ListSteps = styled.ul`
  ${tw`grid w-full grid-cols-3 gap-2 pb-1 `}
`;

export const Step = {
  Container: styled.li`
    ${tw`flex flex-col items-center w-full text-center `}
  `,
  Index: styled.div`
    ${tw`w-3.5 flex items-center justify-center rounded-full bg-primary-1 text-primary-3 font-bold text-xl h-3.5 mb-2`}
  `,
  Image: styled(Image)`
    ${tw`w-9.5 h-auto mb-2`}
  `,
  Name: styled.h4`
    ${tw`text-xl mb-0.5 font-medium`}
  `,
  Message: styled.p`
    ${tw`text-lg text-neutral-2`}
  `,
};

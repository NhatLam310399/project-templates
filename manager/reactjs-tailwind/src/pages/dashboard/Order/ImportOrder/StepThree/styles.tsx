import styled from "styled-components";
import tw from "twin.macro";

export const StepThreeContainer = styled.div`
  ${tw`pt-5`}
`;

export const Progress = styled.div`
  ${tw`w-full relative h-[10px] bg-sematic-3 rounded-md`}
  &::after {
    content: "";
    animation: progressBar 1s ease-in-out infinite;
    ${tw`absolute left-0 h-1 w-15 rounded-md bg-[#557549]`}
  }
  @keyframes progressBar {
    0% {
      left: 0;
    }
    100% {
      left: calc(100% - 150px);
    }
  }
`;

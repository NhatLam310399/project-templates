import styled from "styled-components";
import tw from "twin.macro";
import { Tab } from "@headlessui/react";
import Image from "designs/Image";

export const ControllerContainer = styled.section`
  ${tw`w-full h-full hidden phone:block max-w-[33.3333%] `}
`;

export const TabItem = styled.div<{ selected: boolean }>`
  ${tw`flex flex-row items-center justify-center w-full h-full gap-1 text-xl font-medium border-t-4 border-solid `}
  ${({ selected }) =>
    selected
      ? tw`opacity-100 border-primary-1`
      : tw`border-neutral-4 filter grayscale opacity-60`}
    img {
    ${tw`filter grayscale`}
  }
`;

export const TabIcon = styled(Image)`
  ${tw`w-4 h-4 `}
`;

export const TabPanelContainer = styled.nav`
  ${tw`w-full mt-4 `}
`;

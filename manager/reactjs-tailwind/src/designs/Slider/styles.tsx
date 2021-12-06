import styled, { css } from "styled-components";
import tw from "twin.macro";

export const SliderContainer = styled.div`
  ${tw``}
`;

export const RangeSlider = styled.input`
  & {
    ${tw`w-full `}
    margin: 18px 0;
    -webkit-appearance: none;
  }

  &:focus {
    outline: none;
  }

  /* Chrome & Safari */
  &::-webkit-slider-runnable-track {
    ${tw`rounded-md w-full h-[2px] cursor-pointer bg-neutral-2`}
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    ${tw`w-2 h-2 -mt-1 border-2 border-solid rounded-full cursor-pointer bg-primary-3 hover:bg-neutral-4 border-neutral-2`}
    &:active {
      transform: scale(0.9);
    }
  }

  /* Firefox */
  &::-moz-range-track {
    ${tw`bg-neutral-2 w-full h-[2px] cursor-pointer rounded-md`}
  }

  &::-moz-range-thumb {
    -webkit-appearance: none;
    ${tw`w-1 h-2 rounded-full cursor-pointer bg-neutral-2`}
    margin-top: -7px;
  }

  /* IE */
  &::-ms-track {
    ${tw`bg-neutral-2 rounded-md w-full h-[2px] cursor-pointer`}
  }

  &::-ms-thumb {
    -webkit-appearance: none;
    ${tw`w-1 h-2 rounded-full cursor-pointer bg-neutral-2`}
    margin-top: -7px;
  }
`;

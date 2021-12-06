import styled from "styled-components";
import tw from "twin.macro";
import _Slider from "react-slick";

export const Wrapper = styled.div`
  ${tw`w-full`}

  /* Custom Slick Dots */
  .slick-track {
    ${tw`flex gap-2`}
  }
  @media screen and (max-width: 600px) {
    .slick-track {
      ${tw`flex gap-0`}
    }
  }
  .slick-dots {
    bottom: -35px;
  }

  .ft-slick__dots--custom {
    height: 12px;
    width: 12px;
    ${tw`bg-grey`}
    border-radius: 100%;
    position: relative;
    transition: 0.2s ease-in-out;
    &:hover {
      ${tw`bg-primary`}
    }
  }

  .slick-dots li {
    width: 12px;
    height: 12px;
    border-radius: 100%;
    margin: 0 20px;
    transition: width 0.3s ease-in-out;
  }

  .slick-dots .slick-active {
    width: 12px;
    height: 12px;
    transition: width 0.3s ease-in-out;
  }
  .slick-dots .slick-active .ft-slick__dots--custom {
    width: 12px;
    height: 12px;
    ${tw`bg-primary`}
  }
`;

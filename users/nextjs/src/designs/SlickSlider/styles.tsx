import styled from "styled-components";
import tw from "twin.macro";
import _Slider from "react-slick";

export const Wrapper = styled.div`
  ${tw`w-full`}

  /* Custom Slick Dots */
  .slick-slider {
    .slick-next {
      right: 0;
    }
    @media screen and (max-width: 600px) {
      .slick-dots li {
        margin: 0 10px;
      }
    }
  }

  .slick-dots {
    bottom: auto;
    margin-top: 40px;
  }
  .ft-slick__dots--custom {
    height: 15px;
    width: 15px;
    background-color: #e0e0e0;
    border-radius: 100%;
    position: relative;
    transition: 0.2s ease-in-out;
    &:hover {
      background: #351568;
    }
  }

  .slick-dots li {
    width: 15px;
    height: 15px;
    border-radius: 100%;
    margin: 0 20px;
    transition: width 0.3s ease-in-out;
  }

  .slick-dots .slick-active {
    width: 15px;
    height: 15px;
    transition: width 0.3s ease-in-out;
  }
  .slick-dots .slick-active .ft-slick__dots--custom {
    width: 15px;
    height: 15px;
    background-color: #351568;
  }
`;

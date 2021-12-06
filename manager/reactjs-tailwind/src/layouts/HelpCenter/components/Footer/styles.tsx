import styled from "styled-components";
import { Link } from "react-router-dom";
import tw from "twin.macro";
import { Container, Wrapper } from "designs/PageLayout";
import Image from "designs/Image";

export const FooterWrapper = styled(Wrapper)`
  ${tw`relative self-end mb-0 mt-auto w-full border-t border-solid border-neutral-4 `}
`;

export const FooterContainer = styled(Container)`
  ${tw``}
`;

export const Top = styled.div`
  ${tw` flex w-full laptop:flex-row flex-col justify-between items-center gap-1 `}
`;

export const Logo = styled(Image)`
  ${tw` h-3.5 `}
`;

export const ListNavigation = styled.ul`
  ${tw` text-md  flex flex-row flex-wrap gap-x-2 gap-y-0.5 justify-center phone:justify-start `}
`;

export const Bottom = styled.div`
  ${tw` flex gap-1 flex-col items-center justify-between py-2  phone:flex-row `}
`;

export const Copyright = styled.div`
  ${tw`font-normal text-center  text-md phone:text-left`}
`;

export const SocialMediaContainer = styled.ul`
  ${tw` flex flex-row gap-1.5 `}
`;

export const SocialMediaItem = styled(Link)`
  ${tw``}
`;

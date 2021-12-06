import styled, { css } from "styled-components";
import tw from "twin.macro";
import Button from "designs/Button";
import { ReactComponent as _TrashIcon } from "assets/svg/editor/trash.svg";
import { IPrintStatus } from "common/functions";

export const ObjectContainer = styled.div<{ active: boolean }>`
  ${tw` relative z-[101] cursor-pointer p-0.5 bg-primary-3 border-b border-solid border-neutral-4`}

  &.object-dragging {
    ${tw`shadow-lg cursor-move`}
  }

  ${({ active }) =>
    active &&
    css`
      & {
        ${tw`pl-1`}
      }
      &::before {
        content: "";
        ${tw`absolute top-0 left-0 h-full w-[3px] bg-sematic-1`}
      }
    `}
`;

export const Main = styled.div`
  ${tw` mb-1 grid gap-1 select-none max-w-full`}
  grid-template-columns: 100px 1fr 30px;
`;

export const Preview = styled.div`
  ${tw`w-10 h-10 flex justify-center items-center `}
`;

export const Image = styled.img`
  ${tw`w-full h-full object-scale-down `}
`;

export const Content = styled.div`
  ${tw` w-full flex flex-col gap-0.5 `}
`;

export const Name = styled.p`
  ${tw`text-lg font-semibold max-w-23 truncate w-full `}
`;

export const Text = styled.p`
  ${tw`text-md font-normal `}
`;

export const Actions = styled.div`
  ${tw``}
`;

export const DuplicateButton = styled(Button)`
  ${tw` text-neutral-1 w-full border-neutral-3 hover:bg-neutral-5 `}
`;

export const TrashIcon = styled(_TrashIcon)`
  ${tw` hover:text-neutral-1 text-neutral-3`}
`;

export const PrintStatus = styled.p<{ status: IPrintStatus }>`
  ${tw` font-semibold inline`}
  ${({ status }) =>
    status === "Good"
      ? tw`text-sematic-3`
      : status === "Average"
      ? tw`text-sematic-2`
      : tw`text-sematic-1`}
`;

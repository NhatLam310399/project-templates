import { MouseEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SortableElement } from "react-sortable-hoc";
import {
  ObjectContainer,
  Preview,
  Content,
  Name,
  Text,
  Actions,
  Image,
  Main,
  DuplicateButton,
  TrashIcon,
  PrintStatus,
} from "./styles";
import {
  duplicateCurrentActiveObject,
  removeObjectHasId,
  setActiveObjectHasId,
} from "redux/actions/editor";
import TransparentBG from "assets/images/editor/transparent-pattern.png";
import { IRootState } from "typings";
import SVG from "designs/SVG";
import IconButton from "designs/IconButton";
import {
  getPrintQuality,
  getScaleWidthHeightFromObject,
  renderURLFromSVGString,
} from "common/functions";
import { useRender } from "hooks/useRender";
import { useCanvasEvent } from "hooks/useCanvasEvent";

const ObjectItem = SortableElement(({ object }: { object: fabric.Object }) => {
  const { currentActiveObjectId } = useSelector(
    (state: IRootState) => state.editor,
  );
  const { typeObject, previewImage, name, id } = object;
  const { width, height } = getScaleWidthHeightFromObject(object);
  const dispatch = useDispatch();
  const { rerender } = useRender();
  const nameDisplay = typeObject === "TEXT" ? (object as any).text : name;
  const isActive = id === currentActiveObjectId;
  const previewImageDisplay =
    typeObject === "VECTOR"
      ? renderURLFromSVGString(previewImage || "")
      : previewImage;

  const printQuality = getPrintQuality(object);

  useCanvasEvent("mouse:up", () => {
    rerender();
  });

  const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(removeObjectHasId(id));
  };

  const handleDuplicate = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(duplicateCurrentActiveObject());
  };

  const handleClick = (e: MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    dispatch(setActiveObjectHasId(id));
  };

  return (
    <ObjectContainer
      active={isActive}
      key={id}
      onClick={handleClick}
      className="group"
    >
      <Main>
        <Preview
          style={{
            backgroundImage: `url(${TransparentBG})`,
          }}
        >
          <Image src={previewImageDisplay} />
        </Preview>
        <Content>
          <Name>{nameDisplay}</Name>
          <Text>
            <strong>Width:</strong> {width} <strong>Height:</strong> {height}
          </Text>
          <Text>
            <strong>Print quality:</strong>{" "}
            <PrintStatus status={printQuality.status}>
              {printQuality.toString()}
            </PrintStatus>
          </Text>
        </Content>
        <Actions>
          <IconButton onClick={handleDelete}>
            <TrashIcon className="hover:" />
          </IconButton>
        </Actions>
      </Main>
      {isActive && (
        <DuplicateButton
          onClick={handleDuplicate}
          variant="secondary"
          icon={<SVG name="editor/copy" />}
        >
          Duplicate
        </DuplicateButton>
      )}
    </ObjectContainer>
  );
});

export default ObjectItem;

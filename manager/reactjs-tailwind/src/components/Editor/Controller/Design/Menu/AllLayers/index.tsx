import { useDispatch, useSelector } from "react-redux";
import { SortableContainer, SortEnd } from "react-sortable-hoc";
import { AllLayerContainer, ListObjects } from "./styles";
import ObjectItem from "./ObjectItem";
import { sortObjects } from "redux/actions/editor";
import { arrayMove } from "common/functions";
import { IRootState } from "redux/reducers";

interface ILayer {}

const AllLayers: React.FC<ILayer> = props => {
  const dispatch = useDispatch();
  const { canvas } = useSelector((state: IRootState) => state.editor);
  const listObjects =
    canvas
      ?.getObjects()
      ?.filter(
        object =>
          ![
            "BACKGROUND",
            "UPPER_BACKGROUND",
            "CLIP_PATH",
            "CLIP_PATH_BORDER",
          ].includes(object.typeObject),
      ) || [];

  const reversed = Array.from(listObjects).reverse();

  const handleSortEnd = ({ oldIndex, newIndex }: SortEnd) => {
    const movedObjects = arrayMove(reversed, oldIndex, newIndex);

    const listZIndexes = movedObjects.map(object => object.zIndex);
    const sortedListZIndexes = listZIndexes.sort((a, b) => b - a);

    movedObjects.forEach(
      (object, index) => (object.zIndex = sortedListZIndexes[index]),
    );

    dispatch(sortObjects());
  };

  return (
    <AllLayerContainer>
      <ListObjects>
        <RenderListItems
          helperClass="object-dragging"
          distance={1}
          onSortEnd={handleSortEnd}
          objects={reversed || []}
        />
      </ListObjects>
    </AllLayerContainer>
  );
};

export default AllLayers;

const RenderListItems = SortableContainer(
  ({ objects }: { objects: fabric.Object[] }) => {
    return (
      <ul>
        {objects?.map((object, index) => {
          if (object?.type === "UPPER_BACKGROUND") return null;
          return <ObjectItem key={object.id} index={index} object={object} />;
        })}
      </ul>
    );
  },
);

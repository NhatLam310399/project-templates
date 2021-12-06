import { SkeletonContainer, SkeletonItem } from "./styles";

export interface ISkeletonProps {
  count?: number;
  width?: string | number;
  wrapper?: React.FC;
  height?: string | number;
  circle?: boolean;
  className?: string;
}

const Skeleton: React.FC<ISkeletonProps> = props => {
  const { count = 1, wrapper: Wrapper = null } = props;
  const elements = [];

  for (let i = 0; i < count; i++) {
    elements.push(<SkeletonItem {...props} />);
  }

  return (
    <SkeletonContainer>
      {Wrapper
        ? elements.map((element, i) => (
            <Wrapper key={i}>
              {element}
              &zwnj;
            </Wrapper>
          ))
        : elements}
    </SkeletonContainer>
  );
};

export default Skeleton;

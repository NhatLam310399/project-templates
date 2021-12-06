import { EmptyContainer, Title, Desc, Link } from "./styles";

interface IEmptyProps {
  titleSearchText: string;
  setIsSearch: (value: boolean) => void;
}

const Empty: React.FC<IEmptyProps> = ({ titleSearchText, setIsSearch }) => {
  const onHandleClick = () => {
    setIsSearch(false);
  };
  return (
    <EmptyContainer>
      <Title>No result for "{titleSearchText}"</Title>
      <Desc>
        Try searching another keyword.{" "}
        <Link onClick={onHandleClick}>Browser Help Center</Link>
      </Desc>
    </EmptyContainer>
  );
};

export default Empty;

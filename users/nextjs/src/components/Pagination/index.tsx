import ReactPaginate from "react-paginate";
import { LabelWrapper, Icon } from "./styles";

interface IPaginationProps {
  // count from 0
  page?: number;
  sizePerPage: number;
  totalSize: number;
  displayRanges?: number;
  marginPage?: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination: React.FC<IPaginationProps> = (props) => {
  const {
    page: initPage,
    sizePerPage = 1,
    totalSize = 0,
    displayRanges = 5,
    marginPage = 1,
    onPageChange,
    className = "",
  } = props;

  const handlePageChange = ({ selected }) => {
    onPageChange && onPageChange(selected);
  };
  const pageCount = Math.ceil(totalSize / sizePerPage);
  return (
    <ReactPaginate
      forcePage={initPage}
      pageCount={pageCount}
      pageRangeDisplayed={displayRanges}
      marginPagesDisplayed={marginPage}
      onPageChange={handlePageChange}
      containerClassName={`flex items-center text-14 phone:text-16 text-black ${className}`}
      previousLabel={
        <LabelWrapper>
          <Icon name="common/table-prev" width={24} height={24} />
        </LabelWrapper>
      }
      nextLabel={
        <LabelWrapper>
          <Icon name="common/table-next" width={24} height={24} />
        </LabelWrapper>
      }
      previousLinkClassName="outline-none focus:outline-none"
      nextLinkClassName="outline-none focus:outline-none"
      pageLinkClassName="flex items-center justify-center cursor-default w-3 h-3 phone:w-4 phone:h-4 rounded-full focus:outline-none text-16 font-normal"
      activeLinkClassName="bg-white text-secondary font-normal outline-none focus:outline-none"
    />
  );
};

export default Pagination;

import ReactPaginate from "react-paginate";

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

const Pagination: React.FC<IPaginationProps> = props => {
  const {
    page: initPage,
    sizePerPage = 1,
    totalSize = 0,
    displayRanges = 5,
    marginPage = 1,
    onPageChange,
    className = "",
  } = props;
  const handlePageChange = (selectedItem: any) => {
    const { selected } = selectedItem || {};
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
      containerClassName={`flex items-center gap-0.5 text-md phone:text-lg text-neutral-3 ${className}`}
      previousLabel={""}
      nextLabel={""}
      previousLinkClassName="outline-none focus:outline-none select-none cursor-pointer"
      nextLinkClassName="outline-none focus:outline-none select-none cursor-pointer"
      pageLinkClassName="flex items-center justify-center w-3 h-3 font-medium phone:w-4 phone:h-4 border  rounded-md focus:outline-none select-none cursor-pointer"
      activeLinkClassName=" border border-primary-1 text-primary-1 outline-none focus:outline-none select-none cursor-pointer"
    />
  );
};

export default Pagination;

import EmptyDataImage from "assets/images/empty-data.png";

const EmptyData = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <img src={EmptyDataImage} alt="empty data" className="w-full max-w-lg" />
    </div>
  );
};

export default EmptyData;

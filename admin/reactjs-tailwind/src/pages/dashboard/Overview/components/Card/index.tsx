interface ICardProps {
  Icon: React.ReactNode;
  title: string;
  totalCount?: number;
}

const Card: React.FC<ICardProps> = props => {
  const { Icon, title, totalCount } = props;

  return (
    <div className="w-full bg-tertiary mb-1 phone:mb-0 flex flex-row items-center text-secondary px-1 py-2.5 rounded-lg">
      <div className=" w-1/4 flex items-center justify-center">{Icon}</div>
      <div className="w-3/4 flex flex-col text-lg font-bold">
        <h2 className="mb-1 text-black">{title}</h2>
        <h2 className="text-primary">{totalCount}</h2>
      </div>
    </div>
  );
};

export default Card;

import SVG from "designs/SVG";
interface ICardProps {
    title: string;
    totalCount: number;
}

const Card: React.FC<ICardProps> = props => {
    const { title, totalCount } = props;

    return (
        <div className="phone:py-3.5 phone:px-2.5 px-1 py-1 grid grid-cols-4 gap-1 border border-gray h-10 phone:h-auto">
            <div className="flex items-center justify-center col-span-1">
                <SVG
                    name="overview/chart"
                    width="68"
                    height="68"
                    className=""
                />
            </div>
            <div className="flex flex-col items-start justify-center col-span-3">
                <p className="text-lg font-medium text-body ">{title}</p>
                <h2 className="font-bold text-primary text-xxl">
                    {totalCount}
                </h2>
            </div>
        </div>
    );
};

export default Card;

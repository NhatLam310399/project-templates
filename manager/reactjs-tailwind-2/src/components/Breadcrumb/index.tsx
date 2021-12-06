import { Fragment } from "react";
import ArrowIcon from "designs/icons/Arrow";
import CSS from "csstype";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { IRootState } from "redux/reducers";

interface IBreadcrumbProps {
  className?: string;
  additionalInfo?: string;
  style?: CSS.Properties;
}

const Breadcrumb: React.FC<IBreadcrumbProps> = props => {
  const { className = "", additionalInfo = "" } = props;
  const { breadcrumb } = useSelector((state: IRootState) => state._config);

  return (
    <div className={`w-full ${className}`}>
      <div>
        <div className="flex flex-row items-center">
          {breadcrumb.map((item, index) => (
            <Fragment key={String(index)}>
              <div
                className={`text-sm phone:text-md font-normal ${
                  index === breadcrumb.length - 1 ? "text-black" : "text-grey"
                }`}
              >
                {item.path ? (
                  <Link to={item.path}>{item.name}</Link>
                ) : (
                  <span>{item.name}</span>
                )}
              </div>
              {index !== breadcrumb.length - 1 && (
                <ArrowIcon className="w-1 mx-0.5" direction="RIGHT" />
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;

import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import SVG from "designs/SVG";
import { useSelector } from "react-redux";
import { IRootState } from "common/typings";

const Breadcrumb: React.FC = props => {
  const { breadcrumb: items } = useSelector(
    (state: IRootState) => state._config,
  );

  return (
    <div className="w-full phone:block">
      <div>
        <div className="flex flex-row">
          {items.map((item, index) => (
            <Fragment key={String(index)}>
              <div
                className={`text-md font-normal ${
                  index === items.length - 1 ? "text-black" : "text-gray"
                }`}
              >
                <Link to={item?.href || "#"}>{item.name}</Link>
              </div>
              {index !== items.length - 1 && (
                <SVG name="common/right-arrow" className="px-1" />
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;

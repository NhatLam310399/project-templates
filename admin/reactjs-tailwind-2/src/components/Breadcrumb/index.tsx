import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import SVG from "designs/SVG";
import { useSelector } from "react-redux";
import { IRootState } from "common/formatTypes";

const Breadcrumb: React.FC = props => {
    const { breadcrumb: items } = useSelector(
        (state: IRootState) => state._config,
    );

    return (
        <div className="hidden w-full phone:block">
            <div>
                <div className="flex flex-row">
                    <p className="font-normal truncate font-sfpro text-md text-body">
                        TuyenDung
                    </p>
                    <SVG name="common/right-arrow" className="px-1" />
                    {items.map((item, index) => {
                        const activeLink = index === items.length - 1;
                        return (
                            <Fragment key={String(index)}>
                                <div
                                    className={`font-sfpro text-md font-normal truncate ${
                                        activeLink ? "text-black" : "text-body"
                                    }`}
                                >
                                    {activeLink ? (
                                        <p>{item.name}</p>
                                    ) : (
                                        <Link
                                            to={item?.href || "#"}
                                            className="hover:text-primary"
                                        >
                                            {item.name}
                                        </Link>
                                    )}
                                </div>
                                {!activeLink && (
                                    <SVG
                                        name="common/right-arrow"
                                        className="px-1"
                                    />
                                )}
                            </Fragment>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Breadcrumb;

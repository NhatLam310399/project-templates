/* eslint-disable prefer-const */
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core";
import AwesomeDebouncePromise from "awesome-debounce-promise";

import SVG from "designs/SVG";
import useConstant from "use-constant";

const DELAY = 300;

interface ISearchBoxTableProps {
    className?: string;
    placeholder?: string;
    onFetchData: (text: string) => void;
}

const SearchTable: React.FC<ISearchBoxTableProps> = ({
    className = "",
    placeholder = "Tìm kiếm",
    onFetchData,
}) => {
    const classes = useStyles();

    const [text, setText] = useState<string>("");

    const searchAPIDebounced = AwesomeDebouncePromise(onFetchData, DELAY);

    const handleTextChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const newText = e.target.value;
        searchAPIDebounced(newText);
        setText(newText);
    };

    return (
        <div className={`search-form w-full phone:w-auto ${className}`}>
            <div className="relative w-full laptop:w-25 max-w-full">
                <input
                    name="search"
                    type="text"
                    placeholder={placeholder}
                    value={text}
                    onChange={handleTextChange}
                    autoComplete="off"
                    className={`block w-full max-w-full pl-4 py-1.5 pr-1 text-sm leading-none font-sfpro text-body ${classes.input}`}
                />
                <span className="absolute top-1/2 transform -translate-y-1/2 pl-1.5 block leading-none group">
                    <SVG name="common/search" className="w-2" />
                </span>
            </div>
        </div>
    );
};

export default SearchTable;

const useStyles = makeStyles(theme => ({
    input: {
        border: "1px solid rgba(0,0,0,0.23)",
        "&:hover, &:focus": {
            borderColor: "rgba(0,0,0,0.87)",
        },
    },
}));

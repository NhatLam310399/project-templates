import React, { ChangeEvent, useState } from "react";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import useConstant from "use-constant";

import SVG from "designs/SVG";

const DELAY = 500;

interface ISearchBoxProps {
  className?: string;
  placeholder?: string;
  width?: number;
  onFetchData: (text: string) => void;
}

const SearchBoxTable: React.FC<ISearchBoxProps> = ({
  className = "",
  placeholder = "Tìm kiếm",
  width,
  onFetchData,
}) => {
  const [text, setText] = useState<string>("");

  const searchAPIDebounced = AwesomeDebouncePromise(onFetchData, DELAY);
  const handleTextChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    searchAPIDebounced(newText);
    setText(newText);
  };

  return (
    <div className={`search-form ${className}`}>
      <div className={`relative max-w-full ${width ? `w-${width}` : ""}`}>
        <input
          name="search"
          type="text"
          autoComplete="off"
          placeholder={placeholder}
          value={text}
          onChange={handleTextChange}
          className="block w-full pl-5 py-1.5 pr-1.5 text-lg leading-none font-medium rounded border border-solid border-primary placeholder-primary"
        />
        <button
          type="button"
          className="absolute top-1/2 transform -translate-y-1/2 pl-1.5 block leading-none group"
        >
          <SVG name="common/search" className="w-2" />
        </button>
      </div>
    </div>
  );
};

export default SearchBoxTable;

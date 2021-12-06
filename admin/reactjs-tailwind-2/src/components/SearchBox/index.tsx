/* eslint-disable prefer-const */
import SVG from "designs/SVG";
import React, { useEffect, useRef, useState } from "react";

type IOptions = Record<any, any>[];
const DELAY = 500;
interface ISearchBoxProps {
    className?: string;
    placeholder?: string;
    onFetchApi?: (keyword: string) => Promise<IOptions>;
    onSubmitButton?: (keyword: string) => void;
    onClickItem?: <T>(record: T) => void;
    formatItem?: (record: Record<any, any>) => React.ReactNode;
    delay?: number;
}

const SearchBox: React.FC<ISearchBoxProps> = ({
    className = "",
    placeholder = "Tìm kiếm",
    formatItem,
    onFetchApi: fetchApiCallback,
    onSubmitButton: submitCallback,
    onClickItem: clickItemCallback,
    delay = DELAY,
}) => {
    const [text, setText] = useState<string>("");
    const [options, setOptions] = useState<IOptions>([]);
    const [openDropdown, setOpenDropdown] = useState<boolean>(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const isOpenRef = useRef<boolean>(false);

    useEffect(() => {
        const handleClickOutside = (event: Event) => {
            const dialogElement = document.querySelector(".MuiDialog-root");
            if (
                openDropdown &&
                searchRef.current &&
                !searchRef.current.contains(event.target as Node)
            ) {
                if (!dialogElement) {
                    setOpenDropdown(false);
                }
            }
        };
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, [openDropdown]);

    const timeoutCallback = async () => {
        const optionList = await fetchApiCallback?.(text);
        if (optionList) {
            setOptions(optionList);
            setOpenDropdown(true);
        } else {
            setOptions([]);
            setOpenDropdown(false);
        }
    };

    useEffect(() => {
        const { current: isOpen } = isOpenRef;
        if (isOpen) {
            let timeOut: number | undefined;
            if (timeOut) {
                clearTimeout(timeOut);
            }
            timeOut = window.setTimeout(timeoutCallback, delay);

            return () => {
                clearTimeout(timeOut);
            };
        }
        return undefined;
    }, [text]);

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    const handleFocus = () => {
        if (!isOpenRef.current) isOpenRef.current = true;
        if (text && options.length > 0) {
            setOpenDropdown(true);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            submitCallback?.(text);
            setOpenDropdown(false);
        }
    };

    const handleSearchClick = () => {
        submitCallback?.(text);
        setOpenDropdown(false);
    };

    function handleItemClick<T>(record: T) {
        clickItemCallback?.(record);
        setOpenDropdown(false);
    }

    return (
        <div className={`search-form w-full laptop:w-25 ${className}`}>
            <div
                className="relative w-full max-w-full "
                onFocus={handleFocus}
                ref={searchRef}
            >
                <input
                    name="search"
                    type="text"
                    placeholder={placeholder}
                    value={text}
                    onChange={handleTextChange}
                    onKeyDown={handleKeyDown}
                    className="block w-full max-w-full pl-4 py-1.5 pr-1.5 text-sm leading-none font-normal border-solid border border-gray"
                />
                <button
                    type="button"
                    className="absolute block pl-1.2 leading-none transform -translate-y-1/2 top-1/2 group"
                    onClick={handleSearchClick}
                >
                    <SVG name="common/search" className="w-2" />
                </button>
                {openDropdown && (
                    <ul className="absolute z-10 w-full mt-1 overflow-y-auto bg-white rounded shadow-sm top-full min-w-15 max-h-30">
                        {options?.map((option, index) => {
                            return (
                                <li className="" key={String(index)}>
                                    {formatItem ? (
                                        formatItem(option)
                                    ) : (
                                        <button
                                            className="block w-full px-2 py-1 text-sm leading-none text-left hover:text-primary"
                                            type="button"
                                            onClick={() => {
                                                handleItemClick(option);
                                            }}
                                        >
                                            {option?.name || option?.title}
                                        </button>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default SearchBox;

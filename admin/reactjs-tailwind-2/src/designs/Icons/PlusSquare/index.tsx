import React from "react";

interface IPlusSquare {
    className?: string;
}

const PlusSquare: React.FC<IPlusSquare> = props => {
    const { className } = props;
    return (
        <div className="flex justify-center items-center w-5 h-5 rounded bg-white hover:bg-gray shadow-plus">
            <svg
                className={`${className}`}
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M9 7V0H7V7H0V9H7V16H9V9H16V7H9Z"
                    fill="url(#paint0_linear)"
                />
                <defs>
                    <linearGradient
                        id="paint0_linear"
                        x1="8"
                        y1="0"
                        x2="8"
                        y2="16"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#2F0743" />
                        <stop offset="1" stopColor="#41295A" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
};

export default PlusSquare;

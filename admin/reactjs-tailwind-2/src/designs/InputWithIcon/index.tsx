/* eslint-disable jsx-a11y/label-has-associated-control */
import { FormHelperText } from "@material-ui/core";
import { randomId } from "common/functions";
import React, { ChangeEvent, useState } from "react";

interface IInputWithIconProps {
    type?: "text" | "number";
    className?: string;
    initialValue?: string;
    valueRef?: React.MutableRefObject<string>;
    Icon: React.ReactNode;
    placeholder?: string | undefined;
    error?: string;
    maxLength?: number;
    onChange?: (value: string) => void;
    onPressEnter?: (value: string) => void;
    label: string;
    required?: boolean;
    pattern?: string;
    minLength?: number;
}

const InputWithIcon: React.FC<IInputWithIconProps> = props => {
    const {
        type = "text",
        className = "",
        initialValue = "",
        Icon,
        valueRef,
        placeholder = "",
        maxLength,
        onChange,
        error,
        onPressEnter,
        label,
        required,
        pattern = "",
        minLength,
    } = props;
    const [text, setText] = useState(initialValue);
    const [id, setId] = useState(randomId());

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        let newValue = event.target.value;
        if (event.target.value.length > event.target.maxLength) {
            newValue = event.target.value.slice(0, event.target.maxLength);
        }
        setText(newValue);
        if (valueRef) valueRef.current = newValue;
        onChange && onChange(newValue);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onPressEnter && onPressEnter(text);
        }
    };

    return (
        <>
            <div className="flex flex-col justify-center">
                <label
                    htmlFor={id}
                    className="mb-0.5 font-bold text-md phone:text-lg"
                >
                    {label}
                    {required && <span className="text-error">*</span>}
                </label>
                <label
                    htmlFor={id}
                    className="flex flex-row border border-gray mb-0.5 "
                >
                    {Icon ? (
                        <div className="icon-wrapper w-5.5 text-primary font-bold flex items-center justify-center text-md">
                            {Icon}
                        </div>
                    ) : (
                        ""
                    )}
                    <input
                        id={id}
                        className={`w-full h-full px-1 py-1.5 text-md font-medium font-sfpro ${className}`}
                        placeholder={placeholder}
                        type={type}
                        value={text}
                        maxLength={maxLength}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        pattern={pattern}
                        minLength={minLength}
                    />
                </label>
            </div>
            {error && (
                <FormHelperText
                    error
                    variant="outlined"
                    style={{ fontSize: "16px" }}
                >
                    {error}
                </FormHelperText>
            )}
        </>
    );
};

export default InputWithIcon;

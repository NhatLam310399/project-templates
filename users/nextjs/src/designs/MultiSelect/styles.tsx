import styled from "styled-components";
import tw from "twin.macro";

export const Container = styled.div`
  ${tw``}
`;

export const SelectWrapper = styled.div`
  ${tw``}
`;

export const Label = styled.p`
  ${tw`font-normal text-16 mb-0.5`}
`;

export const Required = styled.span`
  ${tw`text-16 font-medium text-error ml-0.5`}
`;

export const Error = styled.p`
  ${tw`flex items-center mt-1 font-normal text-14 text-error`}
`;

export const LimitSelected = styled.div`
  ${tw`text-primary py-1 text-center select-none`}
`;

export const customStyles = {
  container: (base: any) => ({
    ...base,
  }),
  valueContainer: (base: any) => ({
    ...base,
    padding: "10px",
  }),
  control: (base: any, state: any) => ({
    ...base,
    borderRadius: "0",
    border: state.selectProps.error ? "1px solid #C72C41" : "1px solid #E0E0E0",
  }),
  multiValue: (base: any) => ({
    ...base,
    backgroundColor: "#351568",
    color: "white",
    borderRadius: "4px",
  }),
  multiValueLabel: (base: any) => ({
    ...base,
    color: "white",
  }),
  menu: (base: any) => ({
    ...base,
    borderRadius: "0",
    padding: "0",
  }),
  menuList: (provided: any) => ({
    ...provided,
    maxHeight: "300px",
    scroll: "auto",
    borderRadius: "0",
    fontSize: "14px",
    // display: "grid",
    // gridTemplateColumns: "33% 33% 33%",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  singleValue: (base: any) => ({
    ...base,
    fontSize: "14px",
  }),
  placeholder: (provided: any) => ({
    ...provided,
    fontSize: "14px",
    color: "#8A8A8A",
    fontWeight: 400,
  }),
};

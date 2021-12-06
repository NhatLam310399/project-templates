import Select from "designs/Select";
import SelectMonthYear from "designs/SelectMonthYear";

interface ISelectDateProps {
  typeOfDateOptions: any[];
}

const SelectDate: React.FC<ISelectDateProps> = ({ typeOfDateOptions }) => {
  return (
    <SelectDateWrapper>
      <SelectMonthYear />
      <SelectTypeOfDate options={typeOfDateOptions} />
    </SelectDateWrapper>
  );
};
export default SelectDate;

interface ISelectTypeOfDateProps {
  options: any[];
}
const SelectTypeOfDate: React.FC<ISelectTypeOfDateProps> = ({ options }) => {
  const handleSelect = (option: any) => {};
  return (
    <div className="h-7 absolute right-0 top-0 w-15 flex items-center">
      <Select
        options={options}
        value={options[0].name}
        label="Chọn theo"
        onSelectOption={handleSelect}
      />
    </div>
  );
};

export interface ISelectDateWrapperProps {
  children: React.ReactNode[] | React.ReactNode | string;
}
const SelectDateWrapper: React.FC<ISelectDateWrapperProps> = ({ children }) => {
  return <div className="h-7 relative">{children}</div>;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/destructuring-assignment */
import { components } from "react-select";
import Checkbox from "@material-ui/core/Checkbox";
import { useStyle } from "./styles";

const OptionCheckBox = (props: any) => {
    const classes = useStyle();
    return (
        <div>
            <components.Option {...props}>
                <div className="grid grid-cols-12">
                    <label className="col-span-11">{props.label}</label>
                    <Checkbox
                        className={classes.root}
                        disabled={false}
                        checked={props.isSelected}
                        onChange={() => null}
                        color="default"
                        size="medium"
                    />
                </div>
            </components.Option>
        </div>
    );
};

export default OptionCheckBox;

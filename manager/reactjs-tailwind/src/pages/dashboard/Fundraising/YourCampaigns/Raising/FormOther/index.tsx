import { Formik } from "formik";
import { FormOtherContainer, Desc } from "./styles";
import Input from "designs/Input";

interface IFormOtherProps {}

const FormOther: React.FC<IFormOtherProps> = props => {
  return (
    <FormOtherContainer>
      <Formik
        initialValues={{
          title: "",
        }}
        onSubmit={() => console.log("Submit")}
      >
        <div className="w-full flex gap-2 phone:flex-row flex-col">
          <div>
            <Input
              name="title"
              placeholder="Ex: Hiking gear for my trip"
              label="All funds raised will be paid directly to"
            />
            <Desc>
              Enter the full name of the person, group or organization to whom
              we should address the check (it can't be you).
            </Desc>
          </div>

          <div>
            <Input
              name="trip "
              placeholder="Ex: Hiking gear for my trip"
              label="for"
            />
            <Desc>
              Tell supporters who or what the funds raised will go toward. This
              will be displayed on your fundraising page.
            </Desc>
          </div>
        </div>
      </Formik>
    </FormOtherContainer>
  );
};

export default FormOther;

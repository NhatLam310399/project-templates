import { Formik } from "formik";
import { FormContainer } from "./styles";
import Input from "designs/Input";
interface IFormProps {}

const Form: React.FC<IFormProps> = props => {
  return (
    <FormContainer>
      <Formik
        initialValues={{
          title: "",
        }}
        onSubmit={() => console.log("Submit")}
      >
        <div className="grid desktop:grid-cols-2 gap-2 grid-cols-1">
          <Input label="Fundraiser Title" name="title" />
          <Input label="Fundraiser Title" name="title" />
          <Input
            label="Add Important Information About This Fundraiser "
            name="title"
          />
          <Input label="Tell your story" name="title" />
        </div>
      </Formik>
    </FormContainer>
  );
};

export default Form;

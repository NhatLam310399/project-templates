import { Formik } from "formik";
import { FormMeContainer, Title, Desc } from "./styles";
import Input from "designs/Input";
interface IFormMeProps {}

const FormMe: React.FC<IFormMeProps> = props => {
  return (
    <FormMeContainer>
      <Title>
        All funds raised will go to htram1211@gmail.com, the organizer, for
      </Title>
      <Formik
        initialValues={{
          title: "",
        }}
        onSubmit={() => console.log("Submit")}
      >
        <div className="phone:w-1/2 w-full">
          <Input
            name="title"
            placeholder="Ex: Hiking gear for my trip"
            label=""
          />
        </div>
      </Formik>
      <Desc>
        Tell supporters who or what the funds raised will go toward. This will
        be displayed on your fundraising page. Paypal is the only disbursement
        option for this selection.
      </Desc>
    </FormMeContainer>
  );
};

export default FormMe;

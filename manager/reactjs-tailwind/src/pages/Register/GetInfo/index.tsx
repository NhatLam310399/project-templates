import React, { useEffect, useState, useMemo } from "react";
import "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { Title, SubTitle, Form, Back } from "./styles";
import { ICreateUser, IRootState } from "typings";
import { login } from "redux/actions/auth";
import Button from "designs/Button";
import { randomId } from "common/functions";
import { useRedirect } from "hooks/useRedirect";
import Select from "designs/Select";
import { PATH } from "common/constants/routes";
import { createUser } from "redux/actions/user";
import { resetAction } from "redux/actions/common";
import { addData, nextStep } from "redux/actions/register";
import useLogin from "hooks/useLogin";
type IRole = {
  _id: string;
  name: string;
};

interface IFormValue {
  purpose: string;
}

const validationSchema = yup
  .object()
  .shape<{ [key in keyof IFormValue]: any }>({
    purpose: yup.string().required("This field is required!"),
  });

const GetInfo: React.FC = () => {
  const redirect = useRedirect();
  const dispatch = useDispatch();
  const { login } = useLogin();
  const { currentUser } = useSelector((state: IRootState) => state.auth);
  const { actionSuccess, isLoading } = useSelector(
    (state: IRootState) => state.common,
  );
  const { registerData } = useSelector((state: IRootState) => state.register);
  const [initialValues] = useState<IFormValue>({
    purpose: "",
  });
  const [purposeSelected, setPurposeSelected] = useState<IRole>();

  useEffect(() => {
    if (actionSuccess) {
      dispatch(resetAction());
      dispatch(addData({}));
      login({
        user: {
          username: registerData?.email!,
          password: registerData?.password!,
        },
      });
    }
  }, [actionSuccess]);

  const handleSubmit = (
    values: IFormValue,
    helper: FormikHelpers<IFormValue>,
  ) => {
    const { fullName, email, password, agreePolicy, subscribe } =
      registerData || {};
    const payload: ICreateUser = {
      createUserInput: {
        fullName,
        email,
        password,
        // permission: "SELLER",
        description: values.purpose,
      },
    };
    dispatch(createUser(payload));
  };
  const handleBack = () => {
    dispatch(nextStep(1));
  };
  return (
    <>
      <Title>Tell us more about you</Title>
      <SubTitle>
        Answer a few quick questions to improve your Kingify experience
      </SubTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <Select
            label="What do you want at Kingify?"
            name="purpose"
            formTarget="name"
            onSelect={option => setPurposeSelected(option)}
            optionSelected={purposeSelected}
            placeholder="I want to be..."
            options={listPurpose}
            optionTarget="name"
          />
          <Button type="submit" size="lg" loading={isLoading}>
            Finish
          </Button>
          <Back type="button" size="lg" onClick={handleBack}>
            Back to register
          </Back>
        </Form>
      </Formik>
    </>
  );
};

export default GetInfo;
const listPurpose: IRole[] = [
  {
    _id: randomId(),
    name: "Launch my first e-commerce venture",
  },
  {
    _id: randomId(),
    name: "Grow my online business (I'm scaling my online business)",
  },
  {
    _id: randomId(),
    name: "Make money by selling merch to my followers",
  },
  {
    _id: randomId(),
    name: "Get bespoke goods made for myself, my team or an event",
  },
  {
    _id: randomId(),
    name: "Join affiliate program",
  },
  {
    _id: randomId(),
    name: "Join referral program",
  },
];

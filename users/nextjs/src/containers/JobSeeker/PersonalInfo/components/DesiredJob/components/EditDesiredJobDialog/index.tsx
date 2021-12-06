import { Formik, FormikValues } from "formik";
import { useTranslation } from "next-i18next";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import Dialog from "@components/Dialog";
import EditDesiredJobForm from "./components/Form";

import {
  IRootState,
  IBenefit,
  IJobLevel,
  IRecordUpdateInput,
  IRecordCreateInput,
  ICategoryLevel2,
  IProvince,
} from "@common/typings";
import { setLoading } from "@redux/actions/common";
import {
  getAllCategoryLevel1,
  getAllCategoryLevel2,
} from "@redux/actions/category";
import {
  updateRecord,
  getRecordByUserId,
  createRecord,
} from "@redux/actions/record";

import { Container, DialogButton, Title, Wrapper } from "./styles";

export interface IBenefitWithEnable extends IBenefit {
  enabled?: boolean;
}

interface IEditDesiredJobProps {
  ButtonMenu?: React.ReactElement;
  className?: string;
  benefitList?: IBenefitWithEnable[];
  allJobLevel?: IJobLevel[];
  benefitsWanted?: IBenefit[];
  recordId?: string;
  userId?: string;
  salary?: string;
  careers?: ICategoryLevel2[];
  level?: string;
  workLocation?: IProvince;
}

const EditDesiredJob: React.FC<IEditDesiredJobProps> = (props) => {
  const { t } = useTranslation(["job-management", "common"]);
  const {
    ButtonMenu,
    className,
    benefitList,
    benefitsWanted,
    recordId,
    userId,
    allJobLevel,
    careers,
    level,
    salary = "0",
    workLocation,
  } = props;
  const dispatch = useDispatch();
  const { provinces } = useSelector((state: IRootState) => state.location);
  const {
    categoryLevel2: { results: categoryLevel2 = [], totalCount = 0 },
    categoryLevel1: { results: categoryLevel1 = [] },
  } = useSelector((state: IRootState) => state.category);
  const { isLoading } = useSelector((state: IRootState) => state.actions);

  const [open, setOpen] = useState(false);
  const [benefits, setBenefits] = useState(benefitList);
  const [allCareers, setAllCareers] = useState<ICategoryLevel2[]>([]);
  const [page, setPage] = useState(0);

  const defaultWorkLocationValue = () => {
    return (
      !!workLocation?.name && {
        name: workLocation.name,
        _id: workLocation._id,
        code: workLocation.code,
      }
    );
  };

  const defaultJobDesiredValue = () => {
    return (
      !!careers &&
      careers.map((career) => ({
        name: career.name,
        _id: career._id,
      }))
    );
  };

  const defaultLevelValue = () => {
    return (
      !!level && {
        name: level,
        _id: level,
      }
    );
  };

  const initialValues = {
    workLocation: defaultWorkLocationValue(),
    jobDesired: defaultJobDesiredValue(),
    levelDesired: defaultLevelValue(),
    salaryDesired: !!salary ? Number(salary) : "",
  };

  const validationSchema = Yup.object({
    workLocation: Yup.object()
      .required(t("personal-info.desired-job.work-location-validation"))
      .nullable(),
    levelDesired: Yup.object()
      .required(t("personal-info.desired-job.desired-level-validation"))
      .nullable(),
    salaryDesired: Yup.number().required(
      t("personal-info.desired-job.salary-validation"),
    ),
  });

  useEffect(() => {
    if (allCareers?.length < totalCount) {
      const newPage = page + 1;
      setPage(newPage);
      getAllCategoryLv2API(newPage);
    }
  }, [allCareers]);

  useEffect(() => {
    if (categoryLevel2?.length > 0) {
      setAllCareers([...allCareers, ...categoryLevel2]);
    }
  }, [categoryLevel2]);
  useEffect(() => {
    dispatch(getAllCategoryLevel1({}));
    getAllCategoryLv2API(0);
  }, []);

  useEffect(() => {
    setBenefits(benefitList);
  }, [benefitList]);

  useEffect(() => {
    if (!!benefits && benefits.length > 0 && !!benefitsWanted && !!open) {
      setBenefits((state) => {
        let newState = [...state];
        benefitsWanted?.forEach((benefitWanted: IBenefit) => {
          const index = state.findIndex(
            (benefit) => benefit._id === benefitWanted._id,
          );
          newState[index] = {
            _id: state[index]?._id,
            description: state[index]?.description,
            enabled: true,
            icon: state[index]?.icon,
            name: state[index]?.name,
          };
        });
        return newState;
      });
    }
  }, [open, benefitsWanted]);

  const getAllCategoryLv2API = (page: number) => {
    dispatch(
      getAllCategoryLevel2({
        page,
        size: 50,
      }),
    );
  };
  const onSelected = (type: string, formik: any) => (value: any) => {
    return formik.setFieldValue(type, value);
  };

  const handleSubmit = (values: FormikValues) => {
    const benefitsWanted = benefits
      .filter((benefit: IBenefitWithEnable) => benefit.enabled === true)
      .map((benefit: IBenefitWithEnable) => benefit._id);

    const career = values.jobDesired.map((item) => item._id);

    if (!recordId && !!userId) {
      const payload: IRecordCreateInput = {
        recordCreateInput: {
          user: userId,
          benefitsWanted,
          career,
          workPlace: values.workLocation?._id,
          salaryWanted: values.salaryDesired,
          jobLevelWanted: values.levelDesired?.name,
        },
      };
      dispatch(createRecord(payload));
    }

    if (!!recordId && !!userId) {
      const payload: IRecordUpdateInput = {
        id: recordId,
        recordUpdateInput: {
          benefitsWanted,
          career,
          workPlace: values.workLocation?._id,
          salaryWanted: values.salaryDesired,
          jobLevelWanted: values.levelDesired?.name,
        },
      };
      dispatch(updateRecord(payload));
    }
    setOpen(false);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleSelectBenefits = (id: string) => {
    setBenefits((state) => {
      const index = state.findIndex((benefit) => benefit._id === id);
      let newState = [...state];
      const enabledList = newState.filter(
        (benefit) => benefit.enabled === true,
      );
      if (enabledList.length < 5 || newState[index].enabled === true) {
        newState[index] = {
          _id: newState[index]._id,
          description: newState[index].description,
          enabled: !newState[index].enabled,
          icon: newState[index].icon,
          name: newState[index].name,
        };
      }
      return newState;
    });
  };
  return (
    <Container className={className}>
      <DialogButton onClick={handleOpenDialog}>{ButtonMenu}</DialogButton>
      <Dialog
        isOpen={open}
        onClose={handleCloseDialog}
        className="z-50 rounded-none w-max"
      >
        <Wrapper>
          <Title>{t("personal-info.desired-job.edit-desired-job")}</Title>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {(formik) => (
              <EditDesiredJobForm
                allJobLevel={allJobLevel}
                benefits={benefits}
                categoryLevel1={categoryLevel1}
                categoryLevel2={allCareers}
                formik={formik}
                handleCloseDialog={handleCloseDialog}
                handleSelectBenefits={handleSelectBenefits}
                initialValues={initialValues}
                isLoading={isLoading}
                onSelected={onSelected}
                provinces={provinces}
              />
            )}
          </Formik>
        </Wrapper>
      </Dialog>
    </Container>
  );
};

export default EditDesiredJob;

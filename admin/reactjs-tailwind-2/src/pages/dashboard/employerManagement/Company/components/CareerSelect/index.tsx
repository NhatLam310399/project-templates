import React, { useEffect, useState } from "react";
import {
    IRootState,
    ICompany,
    IGetAllCategoryLevel1,
    IGetCategoryLv2,
    ICategoryLv2,
    ICategoryLevel1,
} from "common/formatTypes";
import { t } from "language";
import { useDispatch, useSelector } from "react-redux";
import {
    getAllCategoryLevel1,
    getAllCategoryLevel2,
} from "redux/actions/newsConfig";
import MultiSelect, { ISelectValue } from "designs/MultiSelect";
import { getCompanyById } from "redux/actions/company";

interface IBenefitSelectProps {
    className?: string;
    onChangeCareer?: (option: string[]) => void;
    company?: ICompany | null;
}

const CareerSelect: React.FC<IBenefitSelectProps> = props => {
    const { company, className = "", onChangeCareer } = props;

    const {
        allCategoryLevel1: {
            results: allCategoryLevel1,
            totalCount: totalCountLevel1,
        },
    } = useSelector((state: IRootState) => state.newsConfig);
    const {
        categoryLv2: {
            results: allCategoryLevel2,
            totalCount: totalCountLevel2,
        },
    } = useSelector((state: IRootState) => state.newsConfig);
    const { company: companyCareer = {} } = useSelector(
        (state: IRootState) => state.company,
    );

    const [data, setData] = useState<any>([]);
    const [pageNumberLevel1, setPageNumberLevel1] = useState<number>(0);
    const [pageNumberLevel2, setPageNumberLevel2] = useState<number>(0);
    const [listCategoryLevel1, setListCategoryLevel1] = useState<
        ICategoryLevel1[]
    >([]);
    const [listCategoryLevel2, setListCategoryLevel2] = useState<
        ICategoryLv2[]
    >([]);
    const dispatch = useDispatch();

    useEffect(() => {
        if (company) {
            dispatch(getCompanyById({ id: company?._id! }));
        }
    }, [company]);

    useEffect(() => {
        createListCategoryLevel1();
    }, [allCategoryLevel1]);

    useEffect(() => {
        createListCategoryLevel2();
    }, [allCategoryLevel2]);

    useEffect(() => {
        getAllCategoryLevel1API();
    }, [pageNumberLevel1]);

    useEffect(() => {
        getAllCategoryLevel2API();
    }, [pageNumberLevel2]);

    useEffect(() => {
        renderData(listCategoryLevel1, listCategoryLevel2);
    }, [allCategoryLevel1, allCategoryLevel2]);

    const renderData = (
        listCategorylv1: ICategoryLevel1[],
        listCategorylv2: ICategoryLv2[],
    ) => {
        let draftData = [];

        for (const category1 of listCategorylv1) {
            draftData.push({
                label: category1.name,
                options: [] as any,
            });
        }
        for (let i = 0; i < draftData.length; i++) {
            for (const category1 of listCategorylv1) {
                let draftGroup = [];
                for (const category2 of listCategorylv2) {
                    if (category2?.categoryLevel1?.name === category1.name) {
                        draftGroup.push({
                            label: category2.name,
                            value: category2._id,
                        });
                    }
                    if (category1.name === draftData[i].label) {
                        draftData[i].options = draftGroup;
                    }
                }
            }
        }

        setData(draftData);
    };

    const getAllCategoryLevel1API = (text: string = "") => {
        const payload: IGetAllCategoryLevel1 = {
            filterCategoryLevel1: {
                name: text,
            },
            page: pageNumberLevel1,
        };
        dispatch(getAllCategoryLevel1(payload));
    };

    const getAllCategoryLevel2API = (text: string = "") => {
        const payload: IGetCategoryLv2 = {
            filterCategoryLevel2: {
                name: text,
            },
            page: pageNumberLevel2,
        };
        dispatch(getAllCategoryLevel2(payload));
    };

    const createListCategoryLevel1 = () => {
        // Add data
        const draftData: ICategoryLevel1[] = listCategoryLevel1;
        draftData.push(...allCategoryLevel1);
        setListCategoryLevel1(draftData);

        //Decrease page number
        if (listCategoryLevel1.length < totalCountLevel1) {
            setPageNumberLevel1(pageNumberLevel1 + 1);
        }
    };

    const createListCategoryLevel2 = () => {
        // Add data
        const draftData: ICategoryLv2[] = listCategoryLevel2;
        draftData.push(...allCategoryLevel2);
        setListCategoryLevel2(draftData);

        //Decrease page number
        if (listCategoryLevel2.length < totalCountLevel2) {
            setPageNumberLevel2(pageNumberLevel2 + 1);
        }
    };

    const handleCareerSelected = (options: ISelectValue[]) => {
        const listId = options.map(item => item.value!);
        onChangeCareer?.(listId);
    };

    return (
        <div className={`${className}`}>
            <MultiSelect
                label={t("manageEmployer.company.career")}
                value={companyCareer?.career}
                options={data}
                required={false}
                onChange={handleCareerSelected}
                maximumItems={3}
                errorMessage={t("common.validate-required")}
            />
        </div>
    );
};

export default CareerSelect;

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import RelatedJobCard from "@designs/Card/RelatedJobCard";
import {
  Link,
  ListCardContainer,
  RelateJobContainer,
  Title,
  LinkWrapper,
} from "./styles";
import { useDispatch, useSelector } from "react-redux";

import { IGetAllRecruitment, IRecruitment, IRootState } from "@common/typings";
import { getAllRecruitment } from "@redux/actions/recruitment";
import useAuth from "@common/hooks/useAuth";
import { setSeenRecruitment } from "@redux/actions/recruitment";

import { PATH } from "@routes";

interface RelatedJobProps {
  recruitment?: IRecruitment;
  bestRecruitment?: IRecruitment[];
  title?: string;
}

const RelatedJob: React.FC<RelatedJobProps> = ({
  recruitment,
  title,
  bestRecruitment,
}) => {
  const dispatch = useDispatch();
  const { accountInfo } = useAuth();
  const userId = accountInfo?.userInfo?._id;
  const [newBestRecruitment, setNewBestRecruitment] = useState<IRecruitment[]>(
    [],
  );

  const {
    allRecruitment: { results: allRecruitment },
  } = useSelector((state: IRootState) => state.recruitment);

  useEffect(() => {
    sliceBestRecruitment();
  }, [bestRecruitment]);

  useEffect(() => {
    if (recruitment) {
      getRelatedRecruitmentAPI(recruitment.company?.code);
    }
  }, [recruitment]);

  const getRelatedRecruitmentAPI = (code: string) => {
    const payload: IGetAllRecruitment = {
      filterRecruitment: {
        companyCode: code || "",
      },
      page: 0,
      size: 6,
    };
    dispatch(getAllRecruitment(payload));
  };

  const sliceBestRecruitment = () => {
    let newArray = [];
    if (bestRecruitment?.length >= 6) {
      newArray = bestRecruitment?.slice(0, 6);
    } else {
      newArray = bestRecruitment;
    }
    setNewBestRecruitment(newArray);
  };

  const handleClickJob = (recruitmentId: string) => {
    dispatch(
      setSeenRecruitment({
        userId: userId,
        recruitmentId: recruitmentId,
      }),
    );
  };

  return (
    <RelateJobContainer>
      <Title>{title}</Title>
      <ListCardContainer>
        {bestRecruitment
          ? newBestRecruitment?.map((job, index) => (
              <LinkWrapper onClick={() => handleClickJob(job?._id)}>
                <Link
                  key={index}
                  routeName={PATH.JOB_DETAIL}
                  params={{ slug: job?.slug }}
                >
                  <RelatedJobCard job={job} />
                </Link>
              </LinkWrapper>
            ))
          : allRecruitment &&
            allRecruitment?.map((job, index) => (
              <LinkWrapper onClick={() => handleClickJob(job?._id)}>
                <Link
                  key={index}
                  routeName={PATH.JOB_DETAIL}
                  params={{ slug: job?.slug }}
                >
                  <RelatedJobCard job={job} />
                </Link>
              </LinkWrapper>
            ))}
      </ListCardContainer>
    </RelateJobContainer>
  );
};

export default RelatedJob;

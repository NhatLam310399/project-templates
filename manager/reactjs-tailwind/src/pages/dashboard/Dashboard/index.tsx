import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import useAuth from "hooks/useAuth";
import { DashboardContainer } from "./styles";
import Filled from "./Filled";
import StepProcess from "./StepProcess";
import { Wrapper } from "designs/PageLayout";
import { Title } from "designs/Title";
import { getAllChallengeType } from "redux/actions/challenge";
const Dashboard: React.FC = () => {
  const [processComplete, setProcessComplete] = useState(true);
  const dispatch = useDispatch();
  const {
    accountInfo: { userInfo },
  } = useAuth();
  useEffect(() => {
    dispatch(getAllChallengeType({}));
  }, []);
  return (
    <Wrapper>
      <DashboardContainer>
        <Title>Welcome, {userInfo?.fullName || userInfo?.username}</Title>
        {processComplete ? <Filled /> : <StepProcess />}
      </DashboardContainer>
    </Wrapper>
  );
};

export default Dashboard;

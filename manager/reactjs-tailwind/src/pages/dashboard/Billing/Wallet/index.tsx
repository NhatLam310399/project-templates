import { ReactNode, lazy } from "react";
import { useSelector } from "react-redux";
import { WalletContainer } from "./styles";
import { IRootState } from "typings";

interface IWalletProps {}

const ListWallet = lazy(() => import("./ListWallet"));
const AddWallet = lazy(() => import("./AddWallet"));

type IStep = {
  [key: number]: {
    step: number;
    name: string;
    Component: ReactNode;
  };
};

const steps: IStep = {
  1: {
    step: 1,
    name: "List wallet",
    Component: <ListWallet />,
  },
  2: {
    step: 2,
    name: "Kingify USD Wallet",
    Component: <AddWallet />,
  },
};
const Wallet: React.FC<IWalletProps> = props => {
  const stepIndex = useSelector(
    (state: IRootState) => state.billingWallet.stepIndex,
  );
  return <WalletContainer>{steps[stepIndex].Component}</WalletContainer>;
};

export default Wallet;

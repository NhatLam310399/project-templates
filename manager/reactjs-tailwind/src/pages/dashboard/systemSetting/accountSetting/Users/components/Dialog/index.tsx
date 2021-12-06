import { useEffect, useState } from "react";
import { Formik } from "formik";

import {
  DialogContainer,
  Key,
  Text,
  ContainerTitle,
  Close,
  Button,
  Content,
  Form,
  Option,
  TextOption,
  Logo,
} from "./styles";
import Dialog from "components/Dialog";

import Input from "designs/Input";
import Select from "designs/Select";
import MultipleCheckBoxSelect from "designs/MultipleCheckBoxSelect";
import { Title } from "designs/Title";
import SVG from "designs/SVG";
import CheckBox from "designs/Checkbox";

interface IDialogInviteProps {
  isOpen: boolean;
  onClose: () => void;
}
interface IFormValue {
  email: string;
  role?: string;
  stores?: string;
}
interface IStore {
  _id?: string;
  name?: string;
  image?: string;
}
interface IRole {
  _id?: string;
  name?: string;
}
const DialogInvite: React.FC<IDialogInviteProps> = ({
  isOpen = false,
  onClose,
}) => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [initialValues] = useState<IFormValue>({
    email: "",
  });
  const [role, setRole] = useState<IRole>({});
  const [store, setStore] = useState<IStore[]>([]);

  useEffect(() => {
    setIsOpenDialog(isOpen);
    if (isOpen) {
      //call api
    }
  }, [isOpen]);

  const handleOnClose = () => {
    setStore([]);
    setRole({});
    onClose && onClose();
  };
  const handleSubmit = (values: IFormValue) => {
    const listStore = values?.stores?.split("|");
    //test get values success
    //submit
    handleOnClose();
  };
  const handleSelectRole = (option: IRole) => {
    setRole(option);
  };
  const handleSelectStore = (option: IStore[]) => {
    setStore(option);
  };
  const renderOption = (option: IStore, active: boolean) => {
    const handleChecked = (checked: boolean) => {
      if (checked) {
        setStore([...store, option]);
      } else {
        const newListOptionsSelected = store.filter(
          item => item?._id !== option?._id,
        );
        setStore(newListOptionsSelected);
      }
    };
    return (
      <Option>
        <CheckBox initialCheck={active} onChange={handleChecked} />
        <Logo src={option?.image} />
        <TextOption>{option?.name}</TextOption>
      </Option>
    );
  };
  return (
    <Dialog open={isOpenDialog} onClose={handleOnClose}>
      <DialogContainer>
        <ContainerTitle>
          <Title>Invite user</Title>
          <Close onClick={handleOnClose}>
            <SVG name="dialog/close" width="32px" height="32px" />
          </Close>
        </ContainerTitle>
        <Content>
          <Text>
            Enter the email of the person you want to invite to join your
            Kingyfy account. Before you send the invite, please get to know the
            permissions that each role has:
          </Text>
          <Text>
            <Key>Admin:</Key>Full access to all stores. Dashboard sections, and
            adding/modify/removing other roles, except Admin/Owner.
          </Text>
          <Text>
            <Key>Manager:</Key> Limitted access to Settings. No access to
            Billing and Statistics. Can view other Manager accounts, but can’t
            add/modify/remove other Manager roles.
          </Text>
          <Text>
            <Key>Designer:</Key> Full access to Product templates and File
            library. Limited access to Store.
          </Text>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form method="post">
              <Input
                placeholder="Enter your email"
                name="email"
                value={initialValues?.email || ""}
                label=""
                className="col-span-1 phone:col-span-12"
              />
              <Select
                name="role"
                onSelect={handleSelectRole}
                optionSelected={role}
                placeholder="Choose role"
                optionTarget="name"
                options={listRole}
                className="col-span-1 phone:col-span-6"
              />
              <MultipleCheckBoxSelect
                name="stores"
                label=""
                onSelect={handleSelectStore}
                onRenderOption={renderOption}
                listOptionsSelected={store}
                optionTarget="name"
                placeholder="Choose stores"
                options={listStores}
                className="col-span-1 phone:col-span-6"
              />
              <Button size="lg" type="submit">
                Send invite
              </Button>
            </Form>
          </Formik>
        </Content>
      </DialogContainer>
    </Dialog>
  );
};

export default DialogInvite;
const listRole: IRole[] = [
  {
    _id: "1",
    name: "Manager",
  },
  {
    _id: "2",
    name: "Admin",
  },
  {
    _id: "3",
    name: "Admin/Manager",
  },
];

const listStores: IStore[] = [
  {
    _id: "all",
    name: "All stores",
    image: "/",
  },
  {
    _id: "2",
    name: "Kingify store",
    image: "/",
  },
  {
    _id: "3",
    name: "VieMartLLC",
    image: "/",
  },
];

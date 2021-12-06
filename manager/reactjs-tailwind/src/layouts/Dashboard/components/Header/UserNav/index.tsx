import { useState } from "react";
import { UserNavContainer, Name, MenuButton, DropdownItem } from "./styles";
import Dropdown from "designs/Dropdown";
import useAuth from "hooks/useAuth";
import UserIcon from "icons/User";

interface IUserNavProps {}

const UserNav: React.FC<IUserNavProps> = props => {
  const { logout } = useAuth();
  const { accountInfo } = useAuth();
  const { userInfo } = accountInfo || {};
  const [menuItems] = useState([
    {
      name: "Go to homepage",
      link: "#",
    },
    {
      name: "Log out",
      link: "#",
    },
  ]);
  const handleLoginOut = () => {
    logout();
  };
  return (
    <UserNavContainer>
      <Dropdown
        dropdownContainerClassName=" right-0 "
        MenuButton={
          <MenuButton>
            <UserIcon />
            <Name>{userInfo?.fullName || userInfo?.username}</Name>
          </MenuButton>
        }
        options={menuItems}
        renderItem={(option, active) => (
          <DropdownItem
            active={active}
            onClick={handleLoginOut}
            to={option.link}
          >
            {option.name}
          </DropdownItem>
        )}
      />
    </UserNavContainer>
  );
};

export default UserNav;

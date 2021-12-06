import { useDispatch } from "react-redux";
import { BackToMenuContainer } from "./styles";
import { IIconSVGProps } from "typings";
import { changeControllerTab } from "redux/actions/editorController";

interface IBackToMenuProps {}

export const BackToMenu: React.FC<IBackToMenuProps> = props => {
  const dispatch = useDispatch();

  return (
    <BackToMenuContainer onClick={() => dispatch(changeControllerTab("MENU"))}>
      <LeftArrowIcon />
      See all design layers
    </BackToMenuContainer>
  );
};

const LeftArrowIcon: React.FC<IIconSVGProps> = props => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.9097 6.71047C14.5197 6.32047 13.8897 6.32047 13.4997 6.71047L8.90969 11.3005C8.51969 11.6905 8.51969 12.3205 8.90969 12.7105L13.4997 17.3005C13.8897 17.6905 14.5197 17.6905 14.9097 17.3005C15.2997 16.9105 15.2997 16.2805 14.9097 15.8905L11.0297 12.0005L14.9097 8.12047C15.2897 7.73047 15.2897 7.09047 14.9097 6.71047Z"
      fill="#1B1B1B"
    />
  </svg>
);

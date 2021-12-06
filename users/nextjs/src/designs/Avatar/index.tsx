import { Container } from "./styles";

interface IAvatarProps {
  href: string;
  className?: string;
}

const Avatar: React.FC<IAvatarProps> = (props) => {
  const { href = "", className = "" } = props;
  return (
    <Container>
      <img
        className={`inline object-cover rounded-full ${className}`}
        src={href}
        alt="avatar"
      />
    </Container>
  );
};

export default Avatar;

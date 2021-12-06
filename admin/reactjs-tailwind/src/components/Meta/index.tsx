import { Helmet } from "react-helmet";

const NAME_PROJECT = "KTV APP Admin | Hệ thống quản lý";

const Meta: React.FC<{ title: string }> = props => {
  const { title } = props;

  const renderTitle = () => {
    let splitTitle = [title, NAME_PROJECT];
    // Remove all undefine or null out of array
    splitTitle = splitTitle.filter(item => !!item);
    return splitTitle.join(" | ");
  };

  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{renderTitle()}</title>
      <meta name="description" content="KTV APP Admin | Hệ thống quản lý" />
    </Helmet>
  );
};

export default Meta;

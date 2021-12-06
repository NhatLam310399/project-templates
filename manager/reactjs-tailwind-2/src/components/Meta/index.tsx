import { Helmet } from "react-helmet";

const NAME_PROJECT = "KTV APP | Phần mềm booking online";

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
      <meta
        name="description"
        content="GIẢI PHÁP CHUYỂN ĐỐI SỐ 4.0 DÀNH CHO CÁC CƠ SỞ KINH DOANH KARAOKE"
      />
    </Helmet>
  );
};

export default Meta;

import { Helmet } from "react-helmet";

const NAME_PROJECT = "Tuyển Dụng Việt Nam | Hệ thống quản lý";

const Meta: React.FC<{ title: string }> = props => {
    const { title } = props;

    const renderTitle = () => {
        let splitTitle = [title, NAME_PROJECT];
        // Remove all undefine or null out of array
        splitTitle = splitTitle.filter(item => !!item);
        return splitTitle.join(" | ");
    };

    const titleDisplay = renderTitle();

    return (
        <Helmet>
            <meta charSet="utf-8" />
            <title>{titleDisplay}</title>
            <title>{titleDisplay} </title>
            <meta property="og:title" content={titleDisplay} />
            <meta name="description" content={titleDisplay} />
            <meta property="og:description" content={titleDisplay} />
            <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
    );
};

export default Meta;

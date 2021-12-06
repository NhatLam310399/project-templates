import { useTranslation } from "next-i18next";

import Search from "@components/SearchWithProvince";

import { PATH } from "@routes";
import { ILayoutJobManagement } from "@common/typings";
import { SVG } from "@designs/SVG";

import {
  Container,
  Content,
  HeaderTab,
  Link,
  TabItem,
  TabList,
  Wrap,
} from "./style";

const TabLayout: React.FC<ILayoutJobManagement> = ({ active, children }) => {
  const { t } = useTranslation(["job-management"]);
  const categories = [
    {
      name: t("personal-info.title"),
      icon: "information/user-edit",
      active: "PERSONAL_INFO",
      link: PATH.JOB_MANAGEMENT_PERSONAL_INFO,
    },
    {
      name: t("request-evaluated"),
      icon: "information/task-square",
      active: "EVALUATED",
      link: PATH.JOB_MANAGEMENT_EVALUATED,
    },
    {
      name: t("my-job"),
      icon: "information/briefcase",
      active: "MY_JOB",
      link: PATH.JOB_MANAGEMENT_MYJOB,
    },
    {
      name: t("employer-view-profile"),
      icon: "information/employer-icon-svg",
      active: "EMPLOYER_VIEW_PROFILE",
      link: PATH.JOB_MANAGEMENT_EMPLOYER_VIEW_PROFILE,
    },
    {
      name: t("change-password"),
      active: "CHANGE_PASSWORD",
      icon: "information/edit-2",
      link: PATH.JOB_MANAGEMENT_CHANGE_PASSWORD,
    },
  ];
  return (
    <Container>
      <HeaderTab>
        <Wrap>
          <Search />
          <TabList className="container">
            {categories.map((category, key) => (
              <TabItem key={key} active={category.active == active}>
                <SVG name={category.icon} width={24} height={24} />
                <Link routeName={category.link} disableShadow={false}>
                  {category.name}
                </Link>
              </TabItem>
            ))}
          </TabList>
        </Wrap>
      </HeaderTab>
      <Content className="container">{children}</Content>
    </Container>
  );
};

export default TabLayout;

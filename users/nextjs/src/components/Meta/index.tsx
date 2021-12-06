import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { DefaultSeo } from "next-seo";
import { ISEO } from "@common/typings";
import { mergeParams } from "@common/functions";
import { IRootState } from "@redux/reducers";
import { ROOT_URL } from "@constants/app";
import { paths } from "@routes";
import { LinkTag } from "./interfaces";

const Meta = ({
  title,
  routeName,
  seoInfo,
  description,
}: {
  title: string;
  routeName: string;
  seoInfo?: ISEO;
  description?: string;
}) => {
  const query = useRouter().query;
  const { seoData, contentWebsite } = useSelector(
    (state: IRootState) => state.contentWebsite,
  );

  const { seoTitle: seoTitleServer, seoDescription, seoKeyword, seoSiteMap } =
    seoData || {};
  const additionalLinkTags: LinkTag[] = [
    {
      rel: "icon",
      sizes: "32x32",
      href: `${ROOT_URL}/favicon/favicon-32x32.png`,
    },
    {
      rel: "apple-touch-icon",
      sizes: "32x32",
      href: `${ROOT_URL}/favicon/favicon-32x32.png`,
    },
    {
      rel: "apple-touch-icon",
      sizes: "16x16",
      href: `${ROOT_URL}/favicon/favicon-16x16.png`,
    },
    {
      rel: "apple-touch-icon",
      sizes: "32x32",
      href: `${ROOT_URL}/favicon/favicon-32x32.png`,
    },
    {
      rel: "apple-touch-icon",
      sizes: "96x96",
      href: `${ROOT_URL}/favicon/favicon-96x96.png`,
    },
  ];

  const renderTitleDisplay = () => {
    let splitTitle = [title, seoTitleServer, seoInfo?.seoTitle];

    // Remove all undefine or null out of array
    splitTitle = splitTitle.filter((item) => !!item);
    return splitTitle.join(" | ");
  };

  const currentRoute = paths.find((item) => item?.name === routeName);
  const url = mergeParams(`${ROOT_URL}${currentRoute.locale.vi}`, query);

  const titleDisplay = renderTitleDisplay();

  return (
    <DefaultSeo
      title={titleDisplay}
      defaultTitle="Tuyển dụng Việt Nam"
      description={description || seoDescription}
      canonical={ROOT_URL}
      facebook={{
        appId: process.env.FACEBOOK_APP_ID,
      }}
      openGraph={{
        title: titleDisplay,
        type: "website",
        url,
        images: [
          {
            url:
              contentWebsite?.colorLogo?.default ||
              `${ROOT_URL}/favicon/favicon-96x96.png`,
            alt: title,
          },
        ],
        description: description || seoDescription,
        site_name: "TuyenDung",
        locale: "vi_VN",
      }}
      additionalLinkTags={additionalLinkTags}
      additionalMetaTags={[
        {
          name: "keywords",
          content: seoInfo ? seoInfo.seoKeyword : seoKeyword,
        },
        {
          name: "autho    r",
          content: seoInfo ? seoInfo.author : "Usum Software",
        },
        {
          name: "publisher",
          content: "Usum Software",
        },
        {
          name: "copyright",
          content: seoInfo ? seoInfo.author : "Usum Software",
        },
      ]}
    />
  );
};

export default Meta;

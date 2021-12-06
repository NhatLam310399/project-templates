import { useTranslation } from "next-i18next";
import { paths } from "@routes/index";
import path from "path";
import { KeyboardEvent, MouseEvent } from "react";
import { useRouter } from "next/router";
import { ILinkProps } from "./interface";

const Link: React.FC<ILinkProps> = (props) => {
  const { i18n } = useTranslation();
  const router = useRouter();
  const currentLanguage = i18n.language;
  const {
    routeName,
    disableShadow = false,
    locale = currentLanguage,
    children,
    className = "",
    query = {},
    params = {},
  } = props;

  const currentPath = paths.find((item) => item.name === routeName);

  if (!currentPath) {
    console.error(
      `[Link Error] Don't find any route which has name is "${routeName}"`,
    );
  }
  let href = path.join(`/${currentPath?.locale?.[locale]}`);

  if (Object.keys(params).length) {
    for (const key in params) {
      const value = params[key];
      href = href.replace(`/:${key}`, `/${value}`);
    }
  }

  // incase we replace all params but it still has /:abc in url,
  // replace it by -.

  href = href.replace(/(\/:)\w+/g, "/-");

  if (Object.keys(query).length) {
    const queryString = renderQueryStringFromObject(query);
    href += `?${queryString}`;
  }

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!disableShadow) {
      e.preventDefault();
      router.push(href);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLAnchorElement>) => {
    if (e.key === "13") {
      e.preventDefault();
      router.push(href);
    }
  };
  return (
    <a
      href={href}
      className={`block cursor-pointer ${className}`}
      onClick={handleClick}
      onKeyPress={handleKeyPress}
    >
      {children}
    </a>
  );
};

export default Link;

const renderQueryStringFromObject = (query: object) => {
  return new URLSearchParams(query as any)?.toString();
};

export interface ILinkProps {
  /**
   * this is "name" of route which you want to direct
   * take all name route from @routes/index.js
   */
  routeName: string;
  /**
   * Query is a variable which you wanna assign for your url
   * @example { slug: "hello", page: 5} --> /home?slug=hello&page=5
   */
  params?: object;
  /**
   * shadow will make page don't have to refresh when change page
   * @note shadow should be disable when you want link to dynamic route
   */
  query?: object;
  /**
   * params is passed to dynamic route.
   * @example { slug: "home-in-city" } --> /product/home-in-city
   */
  disableShadow?: boolean;
  locale?: ILanguage;
  className?: string;
}

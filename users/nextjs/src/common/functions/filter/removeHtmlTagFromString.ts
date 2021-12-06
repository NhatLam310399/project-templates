export const removeHtmlTagFromString = (html: string) => {
  if (!html) return "";
  try {
    let justText = html.replace(/<\/?[^>]+(>|$)/g, "");
    return justText || "";
  } catch (error) {
    console.error(error);
    return "";
  }
};

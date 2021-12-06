import { IOption } from "@components/Filter/components/Select";

export const unShiftArray = (name: string, array: IOption[]) => {
  const draftOption: IOption = {
    name,
    slug: "-",
    customSlug: "-",
  };
  array.unshift(draftOption);
  return array;
};

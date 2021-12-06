/* eslint-disable no-underscore-dangle */
interface IObject {
  [key: string]: any;
}

export const removeTypenameObj = (object: IObject) => {
  //   const newObject = Object.entries(object).reduce(
  //     (cloneObject, [key, value]) => {
  //       if (key === "__typename") return { ...cloneObject };
  //       return { ...cloneObject, [key]: value };
  //     },
  //     {},
  //   );
  const newObject = { ...object };
  delete newObject.__typename;
  return newObject;
};

import cars from "./images/premium/cars";
import { ICustomSizeImages } from "typings";

export type IDesign = {
  name: string;
  image: ICustomSizeImages;
};

export type IDesignsCategory = {
  name: string;
  items: IDesign[];
};

export const catergoryFake: IDesignsCategory[] = [
  {
    name: "Super Vehicles",
    items: [
      {
        name: "Strix Division Fortress VTOL, Rene Mitchell - Lambert",
        image: {
          base64Image: cars.car1,
        },
      },
      {
        name: "Hover Cop Car - DECIMATED",
        image: {
          base64Image: cars.car2,
        },
      },
      {
        name: "Ilya Zakharovskiy's submission on NVIDIA Metropia 2042 - Vehicles of the Future",
        image: {
          base64Image: cars.car3,
        },
      },
      {
        name: "Science Fiction World",
        image: {
          base64Image: cars.car4,
        },
      },
      {
        name: "Valhallan Nebula",
        image: {
          base64Image: cars.car5,
        },
      },
      {
        name: "虹 野 う い ろ う",
        image: {
          base64Image: cars.car6,
        },
      },
    ],
  },
];

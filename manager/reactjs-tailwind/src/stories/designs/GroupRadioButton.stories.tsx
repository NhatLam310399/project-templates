import React, { useState } from "react";
import { randomId } from "common/functions";
import GroupRadioButton, { IOptions } from "designs/GroupRadioButton";

const cats: IOptions[] = [
  {
    _id: randomId(),
    label: "Abyssinian Cat",
    description: (
      <p>
        It's so <b>cute</b>
      </p>
    ),
  },
  {
    _id: randomId(),
    label: "American Bobtail Cat Breed",
    description: (
      <p>
        It's so <b>cute</b>
      </p>
    ),
  },
  {
    _id: randomId(),
    label: "American Curl Cat",
    description: (
      <p>
        It's so <b>cute</b>
      </p>
    ),
  },
  {
    _id: randomId(),
    label: "American Shorthair Cat",
  },
  {
    _id: randomId(),
    label: "American Wirehair Cat Breed",
  },
  {
    _id: randomId(),
    label: "Balinese-Javanese Cat",
  },
];

export const RadioButton: React.FC<{}> = props => {
  const [listCatsSelected, setListCatsSelected] = useState<IOptions>({});
  return (
    <div className="m-5 max-w-phone">
      <GroupRadioButton
        label="Cat Breeds"
        optionSelected={listCatsSelected}
        options={cats}
        onChange={options => setListCatsSelected(options as any)}
      />
      <div style={{ marginTop: 100 }}>
        {JSON.stringify({ listCatsSelected })}
      </div>
      <div style={{ marginTop: 100 }}>
        Submitted: {JSON.stringify({ listCatsSelected })}
      </div>
    </div>
  );
};

export default {
  title: "designs/GroupRadioButton",
  component: RadioButton,
};

import { ComponentMeta } from "@storybook/react";
import NestedMenu from "components/NestedMenu";

export default {
  title: "Components/Nested Menu",
  component: NestedMenu,
} as ComponentMeta<typeof NestedMenu>;

export const NestedMenuPreview: React.FC = () => {
  return (
    <div className="max-w-phone">
      <NestedMenu
        smooth
        estimateHeight={700}
        data={"Animals"}
        renderItem={(item, isOpen, level, hasChild) => (
          <div
            className={`p-1 rounded-sm mb-1 flex flex-row items-center cursor-pointer select-none relative `}
            style={{
              marginLeft: `${level * 20}px`,
              background: `hsl(180, 50%, ${100 * (0.9 - level * 0.1)}%)`,
            }}
          >
            {item} - [{level}]
            <div className="absolute right-1">
              {isOpen ? "-" : hasChild ? "+" : ""}
            </div>
          </div>
        )}
        checkOpen={() => false}
        items={[
          {
            data: "Cats",
            items: [
              {
                data: "Aegean",
              },
              {
                data: "Colorpoint Shorthair	",
              },
              {
                data: "Devon Rex",
                items: [
                  {
                    data: "Type - 1",
                    items: [
                      {
                        data: "Type - 1 -1",
                      },
                    ],
                  },
                  {
                    data: "Type - 2",
                  },
                  {
                    data: "Type - 3",
                  },
                ],
              },
            ],
          },
        ]}
      />
    </div>
  );
};

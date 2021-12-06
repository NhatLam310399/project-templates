import { ComponentStory, ComponentMeta } from "@storybook/react";
import Button, { IButtonSize, IButtonVariant } from "designs/Button";

export default {
  title: "Designs/Button",
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = args => {
  return <Button {...args}>Submit</Button>;
};

export const ButtonsGallery: React.FC = () => {
  return (
    <div className="flex flex-col w-full gap-5 ">
      {(
        [
          "primary",
          "secondary",
          "link",
          "black-secondary",
          "third",
        ] as IButtonVariant[]
      ).map(variant => (
        <div key={variant}>
          <h3 className="mb-2 font-bold text-xxl ">{variant} buttons</h3>
          <div className="flex flex-col gap-3">
            {(["lg", "md", "sm"] as IButtonSize[]).map(size => (
              <div className="flex flex-row gap-1" key={variant + size}>
                <Button variant={variant} size={size}>
                  {variant} button
                </Button>
                <Button variant={variant} size={size} loading>
                  Loading {variant}
                </Button>
                <Button icon={<UserIcon />} variant={variant} size={size}>
                  Loading {variant}
                </Button>
                <Button disabled variant={variant} size={size}>
                  Disabled {variant}
                </Button>
                <Button
                  disabled
                  icon={<UserIcon />}
                  variant={variant}
                  size={size}
                >
                  Disabled {variant}
                </Button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export const ButtonPreview = Template.bind({});
ButtonPreview.args = {
  className: "w-15",
  variant: "primary",
};

const UserIcon: React.FC = () => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 9.99996C12.3012 9.99996 14.1667 8.13448 14.1667 5.83329C14.1667 3.53211 12.3012 1.66663 10 1.66663C7.69885 1.66663 5.83337 3.53211 5.83337 5.83329C5.83337 8.13448 7.69885 9.99996 10 9.99996Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M17.1583 18.3333C17.1583 15.1083 13.95 12.5 10 12.5C6.05001 12.5 2.84167 15.1083 2.84167 18.3333"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

import type { Meta, StoryObj } from "@storybook/react";
import { Heading } from "./heading";

const meta: Meta<typeof Heading> = {
  title: "Components/Heading",
  component: Heading,
};

export default meta;

type Story = StoryObj<typeof Heading>;

export const Default: Story = {};

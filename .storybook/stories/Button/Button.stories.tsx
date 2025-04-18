import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Button from "../../../src/components/Button";

const meta = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    onPress: { action: "pressed" },
    backgroundColor: { control: "color" },
    textColor: { control: "color" },
    size: { control: "number" },
    bold: { control: "boolean" },
    medium: { control: "boolean" },
    small: { control: "boolean" },
    border: { control: "boolean" },
    disabled: { control: "boolean" },
    isLoading: { control: "boolean" },
  },
  decorators: [(Story) => <Story />],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: "Primary Button",
    backgroundColor: "#007AFF",
    textColor: "#FFFFFF",
  },
};

export const Secondary: Story = {
  args: {
    title: "Secondary Button",
    border: true,
    backgroundColor: "transparent",
    textColor: "#007AFF",
  },
};

export const Small: Story = {
  args: {
    title: "Small Button",
    small: true,
    backgroundColor: "#007AFF",
    textColor: "#FFFFFF",
  },
};

export const Disabled: Story = {
  args: {
    title: "Disabled Button",
    disabled: true,
    backgroundColor: "#007AFF",
    textColor: "#FFFFFF",
  },
};

export const Loading: Story = {
  args: {
    title: "Loading Button",
    isLoading: true,
    backgroundColor: "#007AFF",
    textColor: "#FFFFFF",
  },
};

export const CustomStyle: Story = {
  args: {
    title: "Custom Style",
    backgroundColor: "#FF3B30",
    textColor: "#FFFFFF",
    style: { paddingHorizontal: 32 },
    textStyle: { fontSize: 18 },
  },
};

import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Button from "../../../src/components/Button";
import View from "../../../src/components/View";
export default {
  title: "Button",
  component: Button,
};

export const Default = () => (
  <View style={{ padding: 20 }}>
    <Button title="Hello Web!" />
  </View>
);

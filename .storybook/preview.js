import { AppRegistry } from "react-native";

import StorybookUIRoot from "./storybook";
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};

AppRegistry.registerComponent("ComponentSapo", () => StorybookUIRoot);

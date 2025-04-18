// module.exports = {
//   stories: ["../.storybook/stories/**/*.stories.?(ts|tsx|js|jsx)"],
//   addons: [
//     "@storybook/addon-ondevice-actions",
//     "@storybook/addon-ondevice-controls",
//   ],
// };

module.exports = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-essentials"],
  framework: "@storybook/react",
  core: {
    builder: "webpack5",
  },
};

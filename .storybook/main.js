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
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  webpackFinal: async (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "react-native$": "react-native-web",
    };
    config.resolve.extensions.push(".web.js", ".web.ts", ".web.tsx");
    return config;
  },
};

const path = require("path");

module.exports = {
  stories: ["../src/components/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
  addons: [
    {
      name: "@storybook/addon-postcss",
      options: {
        postcssLoaderOptions: {
          implementation: require("postcss"),
        },
      },
    },
    {
      name: "storybook-addon-turbo-build",
      options: {
        // Please refer below tables for available options
        optimizationLevel: 3,
      },
    },
    "storybook-addon-performance/register",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
  ],
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  webpackFinal: async (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        extensions: [".ts", ".tsx", ".js", ...config.resolve.extensions],
        alias: {
          ...config.resolve.alias,
          "@/ui": path.resolve(__dirname, "../../ui/src"),
          "@/web": path.resolve(__dirname, "../../web/src"),
        },
      },
    };
  },
};

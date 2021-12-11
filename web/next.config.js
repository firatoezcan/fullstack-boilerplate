const withPlugins = require("next-compose-plugins");
const withTM = require("next-transpile-modules")(["@stack/ui"]);
const withSourceMaps = require("@zeit/next-source-maps")();
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const i18nConfig = require("./next-i18next.config.js");
const typescriptIsTransformer = require("typescript-is/lib/transform-inline/transformer").default;

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...i18nConfig,
  webpack(config, options) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "~": __dirname, // Dirname muss so gehandled werden weil wir n Zwischencompile Step haben mit typescript-is
    };
    config.module.rules.push({
      test: /\.ts$/,
      exclude: /node_modules/,
      loader: "ts-loader",
      options: {
        getCustomTransformers: (program) => {
          console.log("Hallo");
          return {
            before: [typescriptIsTransformer(program)],
          };
        },
      },
    });
    return config;
  },
};

const config = withPlugins([withBundleAnalyzer, withSourceMaps, withTM(nextConfig)]);
module.exports = config;

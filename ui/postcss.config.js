const plugins = [
  [require("tailwindcss"), { config: "../ui/tailwind.config.js" }],
  [
    require("postcss-preset-env"),
    {
      stage: 1,
      features: {
        "focus-within-pseudo-class": false,
      },
    },
  ],
];

module.exports = {
  plugins,
};

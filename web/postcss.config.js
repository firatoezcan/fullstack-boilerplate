const plugins = [
  ["tailwindcss", { config: "../ui/tailwind.config.js" }],
  [
    "postcss-preset-env",
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

/** @typedef { import('tailwindcss/defaultConfig') } DefaultConfig */
/** @typedef { import('tailwindcss/defaultTheme') } DefaultTheme */

/** @type { DefaultConfig & { theme: { extend: DefaultTheme } } } */
module.exports = {
  corePlugins: {
    preflight: true,
  },
  mode: "jit",
  purge: ["../ui/src/components/**/*.tsx", "../web/src/components/**/*.tsx", "../web/pages/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {},
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};

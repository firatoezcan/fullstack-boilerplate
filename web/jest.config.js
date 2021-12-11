module.exports = {
  globals: {
    "ts-jest": {
      diagnostics: true,
      tsconfig: "<rootDir>/tsconfig.json",
    },
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "@/ui(.*)$": "<rootDir>/../ui/src$1",
    "@/web(.*)$": "<rootDir>/../web/src$1",
    "@/wagtail-adapter(.*)$": "<rootDir>/../wagtail-adapter/src$1",
  },
};

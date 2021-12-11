import { DependencyContextType, DependencyProvider } from "../src/context/Dependency";
import * as React from "react";
import { de } from "date-fns/locale";

import { withPerformance } from "storybook-addon-performance";
import "../styles/index.css";

const Link: DependencyContextType["Link"] = (props) => {
  const { href, className, children } = props;
  if (typeof href !== "string") {
    throw new Error("Doesnt work with Storybook right now");
  }
  const args = { href, className, children };
  return <a {...args} onClick={() => console.log(props)} />;
};

const strings = {};

const t = (key: string) => {
  return strings[key];
};

const withTheme = (StoryFn, context) => {
  return (
    <DependencyProvider Link={Link} t={t} dateLocale={de}>
      <StoryFn />
    </DependencyProvider>
  );
};

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [withTheme, withPerformance];

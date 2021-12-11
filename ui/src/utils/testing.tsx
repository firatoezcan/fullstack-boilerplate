import { render, RenderOptions } from "@testing-library/react";
import { de } from "date-fns/locale";
import React from "react";

import { DependencyContextType, DependencyProvider } from "../context/Dependency";

window.scrollTo = jest.fn();
interface ProviderOptions {}

const Link: DependencyContextType["Link"] = (props) => {
  const { href, className, children } = props;
  if (typeof href !== "string") {
    throw new Error("Doesnt work with Jest right now");
  }
  const args = { href, className, children };
  return <a {...args} onClick={jest.fn()} />;
};

const TestProviders: React.FC<ProviderOptions> = (props) => {
  const { children } = props;

  return (
    <DependencyProvider Link={Link} t={(key) => key} dateLocale={de}>
      {children}
    </DependencyProvider>
  );
};

export const customRender = (ui: React.ReactElement, options?: {}, testingLibraryProps?: Omit<RenderOptions, "queries">) => {
  const renderReturnValue = render(ui, { wrapper: (props: any) => <TestProviders {...props} {...options} />, ...testingLibraryProps });
  return { ...renderReturnValue };
};

// re-export everything
export * from "@testing-library/react";
// override render method
export { customRender as render };

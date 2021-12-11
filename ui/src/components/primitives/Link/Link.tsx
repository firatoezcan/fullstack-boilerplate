import React, { FC } from "react";

import { LinkProps, useDependency } from "@/ui/context/Dependency";

export const Link: FC<LinkProps> = (props) => {
  const { Link: InjectedLink } = useDependency();
  return <InjectedLink {...props} />;
};

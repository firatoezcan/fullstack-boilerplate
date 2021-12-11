import clsx from "clsx";
import React, { FC } from "react";

export const TailwindContainer: FC<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = ({ className, ...divProps }) => {
  return (
    <div className={clsx("container px-5 mx-auto", className)} {...divProps} />
  );
};

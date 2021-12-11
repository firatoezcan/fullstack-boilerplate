import clsx from "clsx";
import React, { FC } from "react";

export const TailwindGrid: FC<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = ({ className, ...divProps }) => {
  return <div className={clsx("grid grid-cols-12 gap-0 gap-y-10 sm:gap-10", className)} {...divProps} />;
};

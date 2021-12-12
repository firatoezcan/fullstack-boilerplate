import { ExclamationCircleIcon } from "@heroicons/react/solid";
import clsx from "clsx";
import React, { FC } from "react";

export type TextareaProps = React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> & {
  label: string;
  helpText?: string;
  error?: string;
  hint?: string;
  labelHidden?: boolean;
  leadingIcon?: React.ReactElement;
  trailingIcon?: React.ReactElement;
};

export const UncontrolledTextarea: FC<TextareaProps> = (props) => {
  const { label, helpText, error, hint, labelHidden, leadingIcon, trailingIcon, className, ...textareaProps } = props;
  const { name, required } = textareaProps;
  const inlineIconClasses = "absolute inset-y-3 flex items-center pointer-events-none";
  const withRequired = (string: string) => string + (required ? " *" : "");

  return (
    <div>
      <label htmlFor={name} className={clsx("block text-sm font-medium text-gray-700", { "sr-only": labelHidden })}>
        {withRequired(label)}
      </label>
      {hint && <span className="text-sm text-gray-500">{hint}</span>}
      <div className="relative mt-1">
        {leadingIcon && <div className={clsx(inlineIconClasses, "left-0 pl-3")}>{React.cloneElement(leadingIcon, { className: "h-5 w-5 text-gray-400" })}</div>}
        <textarea
          rows={4}
          {...textareaProps}
          className={clsx("block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm", className, {
            "pl-10": leadingIcon,
            "pr-10": trailingIcon,
          })}
        />
        {trailingIcon && <div className={clsx(inlineIconClasses, "right-0 pr-3")}>{React.cloneElement(trailingIcon, { className: "h-5 w-5 text-gray-400" })}</div>}
        {error && (
          <div className={clsx(inlineIconClasses, "top-auto right-0 pr-3")}>
            <p className="mr-2 text-sm text-red-600">{error}</p>
            <ExclamationCircleIcon className="w-5 h-5 text-red-500" />
          </div>
        )}
      </div>
      {helpText && <p className="mt-2 text-sm text-gray-500">{helpText}</p>}
    </div>
  );
};

import clsx from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label?: string;
  prefix?: React.ReactNode;
  errorMessage?: string;
};

export default function TextInput({
  className,
  prefix,
  errorMessage = "",
  ...props
}: Props) {
  return (
    <label className="form-control">
      <div className="label">
        <span className="label-text">{props.label}</span>
      </div>
      <div
        className={clsx(
          twMerge("input input-bordered flex items-center gap-2", className),
          {
            "input-error": errorMessage !== "",
          }
        )}
      >
        {prefix}
        <input {...props} className="grow" />
      </div>
      <div className="label">
        <span className="label-text-alt text-red-400">{errorMessage}</span>
      </div>
    </label>
  );
}

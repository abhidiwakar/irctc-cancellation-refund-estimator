import React from "react";

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  label: string;
};

export default function Button({ label, ...props }: Props) {
  return (
    <button className="btn btn-primary" {...props}>
      {label}
    </button>
  );
}

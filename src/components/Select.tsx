import clsx from "clsx";

type Props = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> & {
  label?: string;
  placeholderLabel?: string;
  errorMessage?: string;
  options: {
    value: string | number;
    label: string;
  }[];
};

export default function Select({
  label,
  placeholderLabel,
  options,
  errorMessage = "",
  ...props
}: Props) {
  return (
    <label className="form-control">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <select
        className={clsx("select select-bordered", {
          "select-error": errorMessage !== "",
        })}
        {...props}
      >
        <option value="" disabled>
          {placeholderLabel ?? label ?? "Select Option"}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="label">
        <span className="label-text-alt text-red-400">{errorMessage}</span>
      </div>
    </label>
  );
}

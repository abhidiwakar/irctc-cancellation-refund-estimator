type Props = {
  className?: string;
  variant?: "short" | "full";
  onReadmoreClick?: () => void;
};

export default function Disclaimer({ variant, ...props }: Props) {
  if (variant === "short") {
    return (
      <p className={props.className}>
        <b>Disclaimer:</b> The estimated refund amounts calculated by this
        website are for informational purposes only and may not accurately
        reflect the actual refund you receive.{" "}
        {props.onReadmoreClick && (
          <span
            className="underline cursor-pointer"
            onClick={props.onReadmoreClick}
          >
            Click here to read more.
          </span>
        )}
      </p>
    );
  }

  return (
    <p className={props.className}>
      <b>Disclaimer:</b> This website is an independent tool designed solely for
      the purpose of estimating potential refund amounts for train e-ticket
      cancellations based on the general rules of the Indian Railway Catering
      and Tourism Corporation (IRCTC).{" "}
      <span className="font-semibold">
        It is not an official website and is not affiliated with, endorsed by,
        or associated with IRCTC, Indian Railways, or any other entity or
        individual related to IRCTC or Indian Railways.
      </span>{" "}
      The estimated refund amounts calculated by this website are for
      informational purposes only and may not accurately reflect the actual
      refund you receive. Various factors, including but not limited to changes
      in IRCTC policies, specific e-ticket details, and other conditions, can
      affect the refund calculation.
      <span className="font-semibold">
        The website creator does not guarantee the accuracy, completeness, or
        reliability of the estimated refund amounts and shall not be held
        responsible or liable in any manner for any errors, omissions, or
        discrepancies in the estimated amounts calculated.
      </span>
      By using this website, you agree that the website creator assumes no
      responsibility or liability for any direct, indirect, incidental, or
      consequential loss or damage of any kind arising from your use of the
      information provided on this site. It is strongly recommended to refer to
      the official IRCTC website or contact IRCTC directly for the most accurate
      and up-to-date information regarding e-ticket cancellations and refunds.
    </p>
  );
}

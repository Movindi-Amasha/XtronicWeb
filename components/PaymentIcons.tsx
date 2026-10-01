// Visa/Mastercard/Amex/PayPal/Apple Pay/Google Pay — real full-color SVGs
// sourced from github.com/datatrans/payment-logos (CC-BY-SA-4.0), copied into
// public/payments/. They already bake in a white rounded-card background.
const CARD_LOGOS = [
  { name: "Visa", file: "visa.svg" },
  { name: "Mastercard", file: "mastercard.svg" },
  { name: "American Express", file: "american-express.svg" },
  { name: "PayPal", file: "paypal.svg" },
  { name: "Apple Pay", file: "apple-pay.svg" },
  { name: "Google Pay", file: "google-pay.svg" },
];

// Afterpay isn't in that collection. Its actual brand guideline shows the
// black "tick" mark on Afterpay's signature mint background — not a white
// chip, which is why an earlier version of this looked wrong.
const AFTERPAY_PATH =
  "M12 0C5.373 0 0 5.373 0 12c0 6.628 5.373 12 12 12 6.628 0 12-5.372 12-12 0-6.627-5.372-12-12-12Zm1.236 4.924a2.21 2.21 0 0 1 1.15.299l4.457 2.557c1.495.857 1.495 3.013 0 3.87l-4.457 2.558c-1.488.854-3.342-.22-3.342-1.935v-.34a.441.441 0 0 0-.66-.383L6.287 13.9a.441.441 0 0 0 0 .765l4.096 2.35a.44.44 0 0 0 .661-.382v-.685c0-.333.36-.542.649-.376l1.041.597a.441.441 0 0 1 .222.383v.29c0 1.715-1.854 2.789-3.342 1.935L5.157 16.22c-1.495-.857-1.495-3.013 0-3.87l4.457-2.558c1.488-.854 3.342.22 3.342 1.935v.34c0 .34.366.551.66.383l4.097-2.35a.441.441 0 0 0 0-.765l-4.096-2.351a.441.441 0 0 0-.661.382v.685c0 .333-.36.541-.649.375l-1.041-.597a.442.442 0 0 1-.222-.383v-.29c0-1.285 1.043-2.21 2.192-2.233z";

export default function PaymentIcons() {
  return (
    <ul className="flex flex-wrap items-center gap-2">
      {CARD_LOGOS.map((logo) => (
        <li key={logo.name} className="h-8 w-12 overflow-hidden rounded-btn-xs">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/payments/${logo.file}`}
            alt={logo.name}
            className="h-full w-full object-contain"
          />
        </li>
      ))}
      <li
        className="flex h-8 w-12 items-center justify-center rounded-btn-xs"
        style={{ backgroundColor: "#B2FCE4" }}
      >
        <svg role="img" aria-label="Afterpay" viewBox="0 0 24 24" className="h-4 w-4" fill="#000000">
          <path d={AFTERPAY_PATH} />
        </svg>
      </li>
    </ul>
  );
}

export function PayHereBadge() {
  return (
    <a
      href="https://www.payhere.lk"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/payments/payhere.png"
        alt="PayHere — accepted payment methods"
        className="h-8 w-auto rounded-btn-xs"
      />
    </a>
  );
}

// Visa/Mastercard/Amex/PayPal — real full-color SVGs sourced from
// github.com/datatrans/payment-logos (CC-BY-SA-4.0), copied into
// public/payments/. They already bake in a white rounded-card background.
const CARD_LOGOS = [
  { name: "Visa", file: "visa.svg" },
  { name: "Mastercard", file: "mastercard.svg" },
  { name: "American Express", file: "american-express.svg" },
  { name: "PayPal", file: "paypal.svg" },
];

export default function PaymentIcons() {
  return (
    <ul className="flex flex-wrap items-center gap-2">
      {CARD_LOGOS.map((logo) => (
        <li key={logo.name} className="h-8 w-12 overflow-hidden rounded-btn-xs">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/payments/${logo.file}`}
            alt={logo.name}
            width={48}
            height={32}
            loading="lazy"
            className="h-full w-full object-contain"
          />
        </li>
      ))}
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
        width={580}
        height={120}
        loading="lazy"
        className="h-8 w-auto rounded-btn-xs"
      />
    </a>
  );
}

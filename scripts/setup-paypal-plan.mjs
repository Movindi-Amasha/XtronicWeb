// One-time setup: creates a PayPal catalog Product + a monthly Billing Plan
// for the "XTRONIC KIDZ Club" subscription ($19.99 AUD/month), and prints
// the plan ID to put in .env as PAYPAL_CLUB_PLAN_ID. Real subscriptions
// should reuse one fixed plan rather than creating a new one per signup —
// re-run this only if the price/name actually needs to change.
// Run with: node --env-file=.env scripts/setup-paypal-plan.mjs

const API_BASE =
  process.env.PAYPAL_ENV === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

const CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error("Missing PAYPAL_CLIENT_ID / PAYPAL_CLIENT_SECRET in .env");
  process.exit(1);
}

async function getToken() {
  const res = await fetch(`${API_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  if (!res.ok) throw new Error(`Token request failed: ${res.status} ${await res.text()}`);
  const data = await res.json();
  return data.access_token;
}

async function paypal(token, path, body) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`${path} failed: ${res.status} ${await res.text()}`);
  return res.json();
}

const token = await getToken();

const product = await paypal(token, "/v1/catalogs/products", {
  name: "XTRONIC KIDZ Club",
  description: "Monthly STEM kit subscription — a new hands-on kit delivered every month.",
  type: "SERVICE",
  category: "EDUCATIONAL_AND_TEXTBOOKS",
});
console.log("Created PayPal product:", product.id);

const plan = await paypal(token, "/v1/billing/plans", {
  product_id: product.id,
  name: "XTRONIC KIDZ Club — Monthly",
  description: "A new STEM kit delivered every month, plus 15% off everything and early access to new kits.",
  billing_cycles: [
    {
      frequency: { interval_unit: "MONTH", interval_count: 1 },
      tenure_type: "REGULAR",
      sequence: 1,
      total_cycles: 0, // 0 = runs indefinitely until the customer cancels
      pricing_scheme: {
        fixed_price: { value: "19.99", currency_code: "AUD" },
      },
    },
  ],
  payment_preferences: {
    auto_bill_outstanding: true,
    payment_failure_threshold: 2,
  },
});
console.log("Created PayPal billing plan:", plan.id);
console.log("\nAdd this to your .env file:");
console.log(`PAYPAL_CLUB_PLAN_ID=${plan.id}`);

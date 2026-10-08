import { createHmac, timingSafeEqual } from "crypto";

// Passwordless access for Club members: we email a short-lived signed link
// instead of running full user accounts. The token is self-contained
// (email + expiry, HMAC-signed), so no token table is needed.

const LINK_TTL_MS = 60 * 60 * 1000; // 1 hour

// CLUB_LINK_SECRET if set, otherwise derived from the PayPal secret, which
// every deployment that can take Club payments already has. Rotating either
// simply invalidates outstanding links.
function signingKey(): string | null {
  const base = process.env.CLUB_LINK_SECRET ?? process.env.PAYPAL_CLIENT_SECRET;
  return base ? `club-manage:${base}` : null;
}

function sign(payload: string, key: string): string {
  return createHmac("sha256", key).update(payload).digest("base64url");
}

export function createClubManageToken(email: string): string {
  const key = signingKey();
  if (!key) throw new Error("No signing secret configured for Club links");
  const payload = Buffer.from(
    JSON.stringify({ e: email.trim().toLowerCase(), x: Date.now() + LINK_TTL_MS })
  ).toString("base64url");
  return `${payload}.${sign(payload, key)}`;
}

/** Returns the member's email if the token is genuine and unexpired. */
export function verifyClubManageToken(token: string | undefined | null): string | null {
  const key = signingKey();
  if (!key || !token) return null;

  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;

  const expected = Buffer.from(sign(payload, key));
  const given = Buffer.from(signature);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null;

  try {
    const { e, x } = JSON.parse(Buffer.from(payload, "base64url").toString()) as { e: string; x: number };
    return typeof e === "string" && typeof x === "number" && Date.now() < x ? e : null;
  } catch {
    return null;
  }
}

export interface PaypalSubscriber {
  email_address?: string;
  shipping_address?: {
    name?: { full_name?: string };
    address?: {
      address_line_1?: string;
      address_line_2?: string;
      admin_area_2?: string;
      admin_area_1?: string;
      postal_code?: string;
      country_code?: string;
    };
  };
}

/**
 * PayPal's subscriber shipping address, in the same JSON shape Order.shippingAddress
 * uses (name, line1, line2, city, state, postcode, country), or null if PayPal
 * didn't collect one.
 */
export function shippingFromPaypal(subscriber: PaypalSubscriber | undefined): string | null {
  const ship = subscriber?.shipping_address;
  const a = ship?.address;
  if (!a?.address_line_1) return null;
  return JSON.stringify({
    name: ship?.name?.full_name ?? "",
    line1: a.address_line_1 ?? "",
    line2: a.address_line_2 ?? "",
    city: a.admin_area_2 ?? "",
    state: a.admin_area_1 ?? "",
    postcode: a.postal_code ?? "",
    country: a.country_code ?? "",
  });
}

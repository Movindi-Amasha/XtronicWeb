import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { formatPriceAUD } from "@/lib/products";
import type { ResolvedLineItem } from "@/lib/orderTotals";

export const dynamic = "force-dynamic";

interface ShippingAddress {
  name?: string;
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  postcode?: string;
  country?: string;
  phone?: string;
}

function parseJson<T>(raw: string, fallback: T): T {
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await db.order.findUnique({ where: { id } });
  if (!order) notFound();

  const shipping = parseJson<ShippingAddress>(order.shippingAddress, {});
  const lineItems = parseJson<ResolvedLineItem[]>(order.lineItems, []);
  const hasAddress = shipping.line1 || shipping.city || shipping.postcode;

  return (
    <div className="mx-auto max-w-[900px] px-4 py-10 md:px-6">
      <Link href="/admin/orders" className="text-sm font-bold text-brand-blue hover:underline">
        ← Back to Orders
      </Link>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-heading text-2xl font-extrabold text-brand-navy">
          Order {order.id.slice(-8).toUpperCase()}
        </h1>
        <span className="rounded-full bg-brand-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-blue">
          {order.status}
        </span>
      </div>
      <p className="mt-1 text-sm text-muted">
        Placed {order.createdAt.toLocaleString("en-AU")} via{" "}
        <span className="font-semibold capitalize">{order.paymentProvider}</span>
        {order.providerReference && (
          <span className="font-mono text-xs"> · ref: {order.providerReference}</span>
        )}
      </p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div className="rounded-card border border-line bg-surface p-5">
          <h2 className="font-heading text-base font-bold text-brand-navy">Customer</h2>
          <p className="mt-2 text-sm text-brand-navy-700">
            This is the email the customer entered at checkout — not their
            PayPal account email, which may differ.
          </p>
          <p className="mt-3 text-sm font-semibold text-brand-navy">{order.email}</p>
          {shipping.phone && (
            <p className="mt-1 text-sm text-brand-navy-700">{shipping.phone}</p>
          )}
        </div>

        <div className="rounded-card border border-line bg-surface p-5">
          <h2 className="font-heading text-base font-bold text-brand-navy">
            Shipping Address
          </h2>
          {hasAddress ? (
            <address className="mt-2 text-sm not-italic text-brand-navy-700">
              {shipping.name && <span className="block font-semibold text-brand-navy">{shipping.name}</span>}
              {shipping.line1 && <span className="block">{shipping.line1}</span>}
              {shipping.line2 && <span className="block">{shipping.line2}</span>}
              <span className="block">
                {[shipping.city, shipping.state, shipping.postcode].filter(Boolean).join(" ")}
              </span>
              {shipping.country && <span className="block">{shipping.country}</span>}
            </address>
          ) : (
            <p className="mt-2 text-sm text-muted">
              No shipping address recorded for this order.
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-card border border-line bg-surface">
        <table className="w-full min-w-[500px] text-left text-sm">
          <thead className="bg-brand-navy text-white">
            <tr>
              <th className="px-4 py-3">Item</th>
              <th className="px-4 py-3">Qty</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Line total</th>
            </tr>
          </thead>
          <tbody>
            {lineItems.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-muted">
                  No line items recorded for this order.
                </td>
              </tr>
            )}
            {lineItems.map((item) => (
              <tr key={item.slug} className="border-t border-line">
                <td className="px-4 py-3 font-semibold text-brand-navy">{item.name}</td>
                <td className="px-4 py-3">{item.qty}</td>
                <td className="px-4 py-3">{formatPriceAUD(item.priceCents)}</td>
                <td className="px-4 py-3 font-bold">{formatPriceAUD(item.lineTotalCents)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex flex-col gap-1.5 border-t border-line p-4 text-sm">
          <div className="flex justify-between text-brand-navy-700">
            <span>Subtotal</span>
            <span>{formatPriceAUD(order.subtotalCents)}</span>
          </div>
          <div className="flex justify-between text-brand-navy-700">
            <span>Shipping</span>
            <span>{formatPriceAUD(order.shippingCents)}</span>
          </div>
          <div className="flex justify-between border-t border-line pt-2 font-body text-base font-extrabold text-brand-navy">
            <span>Total</span>
            <span>{formatPriceAUD(order.totalCents)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

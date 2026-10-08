import Link from "next/link";
import { db } from "@/lib/db";
import { formatPriceAUD } from "@/lib/products";
import type { SubscriptionStatus } from "@prisma/client";

export const dynamic = "force-dynamic";

// "Pending" = signed up but never approved the payment in PayPal.
const SUB_STATUS_STYLES: Record<SubscriptionStatus, string> = {
  active: "bg-brand-green/15 text-brand-green-700",
  pending: "bg-brand-yellow-50 text-brand-yellow-600",
  suspended: "bg-brand-amber-50 text-brand-amber-600",
  cancelled: "bg-line text-muted",
};

export default async function AdminOrdersPage() {
  const [orders, subscriptions, quotes] = await Promise.all([
    db.order.findMany({ orderBy: { createdAt: "desc" }, take: 100 }),
    db.clubSubscription.findMany({ orderBy: { createdAt: "desc" }, take: 100 }),
    db.schoolQuote.findMany({ orderBy: { createdAt: "desc" }, take: 100 }),
  ]);
  const activeCount = subscriptions.filter((s) => s.status === "active").length;

  return (
    <div className="mx-auto max-w-[1260px] px-4 py-10 md:px-6">
      <h1 className="font-heading text-2xl font-extrabold text-brand-navy">
        Orders
      </h1>
      <div className="mt-4 overflow-x-auto rounded-card border border-line bg-surface">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-brand-navy text-white">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Provider</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-muted">
                  No orders yet.
                </td>
              </tr>
            )}
            {orders.map((order) => (
              <tr key={order.id} className="border-t border-line hover:bg-brand-blue-50">
                <td className="p-0">
                  <Link href={`/admin/orders/${order.id}`} className="block px-4 py-3">
                    {order.createdAt.toLocaleDateString("en-AU")}
                  </Link>
                </td>
                <td className="p-0">
                  <Link href={`/admin/orders/${order.id}`} className="block px-4 py-3">
                    {order.email}
                  </Link>
                </td>
                <td className="p-0">
                  <Link href={`/admin/orders/${order.id}`} className="block px-4 py-3 capitalize">
                    {order.paymentProvider}
                  </Link>
                </td>
                <td className="p-0">
                  <Link href={`/admin/orders/${order.id}`} className="block px-4 py-3 capitalize">
                    {order.status}
                  </Link>
                </td>
                <td className="p-0">
                  <Link href={`/admin/orders/${order.id}`} className="block px-4 py-3 font-bold">
                    {formatPriceAUD(order.totalCents)}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mt-10 font-heading text-2xl font-extrabold text-brand-navy">
        Club Subscriptions
        <span className="ml-3 align-middle text-sm font-bold text-muted">
          {activeCount} active
        </span>
      </h2>
      <div className="mt-4 overflow-x-auto rounded-card border border-line bg-surface">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-brand-navy text-white">
            <tr>
              <th className="px-4 py-3">Signed up</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Started</th>
              <th className="px-4 py-3">Cancelled</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">PayPal ID</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-muted">
                  No Club subscriptions yet.
                </td>
              </tr>
            )}
            {subscriptions.map((sub) => (
              <tr key={sub.id} className="border-t border-line">
                <td className="px-4 py-3">{sub.createdAt.toLocaleDateString("en-AU")}</td>
                <td className="px-4 py-3">{sub.email}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-bold capitalize ${SUB_STATUS_STYLES[sub.status]}`}>
                    {sub.status}
                  </span>
                </td>
                <td className="px-4 py-3">{sub.startedAt?.toLocaleDateString("en-AU") ?? "—"}</td>
                <td className="px-4 py-3">{sub.cancelledAt?.toLocaleDateString("en-AU") ?? "—"}</td>
                <td className="px-4 py-3 font-bold">{formatPriceAUD(sub.priceCents)}/mo</td>
                <td className="px-4 py-3 font-mono text-xs text-muted">{sub.paypalSubscriptionId ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mt-10 font-heading text-2xl font-extrabold text-brand-navy">
        School Quote Requests
      </h2>
      <div className="mt-4 overflow-x-auto rounded-card border border-line bg-surface">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-brand-navy text-white">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">School</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Kits</th>
            </tr>
          </thead>
          <tbody>
            {quotes.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-muted">
                  No quote requests yet.
                </td>
              </tr>
            )}
            {quotes.map((quote) => (
              <tr key={quote.id} className="border-t border-line">
                <td className="px-4 py-3">
                  {quote.createdAt.toLocaleDateString("en-AU")}
                </td>
                <td className="px-4 py-3">{quote.name}</td>
                <td className="px-4 py-3">{quote.school}</td>
                <td className="px-4 py-3">{quote.email}</td>
                <td className="px-4 py-3">{quote.kitsInterest}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

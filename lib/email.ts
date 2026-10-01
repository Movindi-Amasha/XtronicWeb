import { Resend } from "resend";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Resend's shared test address — works with no domain verification, so
// emails can be sent in dev before the client sets up a verified sending
// domain. Swap EMAIL_FROM once that domain exists.
const DEFAULT_FROM = "XTRONIC KIDZ <onboarding@resend.dev>";

export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

let client: Resend | null = null;
function getClient(): Resend {
  if (!client) client = new Resend(process.env.RESEND_API_KEY);
  return client;
}

/**
 * Sends an email via Resend. Never throws — email delivery failures
 * shouldn't break checkout, newsletter signup, or quote submission. Returns
 * whether it actually sent (false if unconfigured or the API call failed).
 */
export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}): Promise<boolean> {
  if (!isEmailConfigured()) return false;

  try {
    const { error } = await getClient().emails.send({
      from: process.env.EMAIL_FROM ?? DEFAULT_FROM,
      to,
      subject,
      html,
    });
    if (error) {
      console.error("Resend send failed:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Resend send threw:", err);
    return false;
  }
}

export function orderConfirmationEmail({
  orderId,
  totalCents,
  currency,
}: {
  orderId: string;
  totalCents: number;
  currency: string;
}): { subject: string; html: string } {
  const amount = (totalCents / 100).toFixed(2);
  return {
    subject: "Your XTRONIC KIDZ order is confirmed!",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h1 style="color: #0D1F35;">Order confirmed 🎉</h1>
        <p>Thanks for your order — we're getting it ready to ship.</p>
        <p style="background: #F8FAFC; border-radius: 8px; padding: 16px;">
          <strong>Order reference:</strong> ${orderId}<br />
          <strong>Total paid:</strong> ${currency} $${amount}
        </p>
        <p>We'll email you again as soon as it ships.</p>
        <p style="color: #5B6B80; font-size: 13px;">XTRONIC KIDZ &middot; Learn &bull; Build &bull; Play</p>
      </div>
    `,
  };
}

export function newsletterCouponEmail({ code }: { code: string }): {
  subject: string;
  html: string;
} {
  return {
    subject: "Here's your 10% off code",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h1 style="color: #0D1F35;">You're in! 🎉</h1>
        <p>Thanks for joining the XTRONIC KIDZ workshop list. Here's your welcome code:</p>
        <p style="background: #FFF4E0; border-radius: 8px; padding: 16px; font-size: 20px; font-weight: bold; letter-spacing: 1px; text-align: center;">
          ${code}
        </p>
        <p>Use it at checkout for 10% off your first kit.</p>
        <p style="color: #5B6B80; font-size: 13px;">XTRONIC KIDZ &middot; Learn &bull; Build &bull; Play</p>
      </div>
    `,
  };
}

export function quoteAcknowledgementEmail({ name }: { name: string }): {
  subject: string;
  html: string;
} {
  return {
    subject: "We've received your school quote request",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h1 style="color: #0D1F35;">Thanks, ${escapeHtml(name)}!</h1>
        <p>We've received your request for a school/club quote and will get back to you within one business day.</p>
        <p style="color: #5B6B80; font-size: 13px;">XTRONIC KIDZ &middot; Learn &bull; Build &bull; Play</p>
      </div>
    `,
  };
}

export function quoteOwnerNotificationEmail({
  name,
  organisation,
  email,
  message,
}: {
  name: string;
  organisation: string;
  email: string;
  message: string;
}): { subject: string; html: string } {
  return {
    subject: `New school quote request — ${organisation}`,
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h1 style="color: #0D1F35;">New quote request</h1>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Organisation:</strong> ${escapeHtml(organisation)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong> ${escapeHtml(message)}</p>
      </div>
    `,
  };
}

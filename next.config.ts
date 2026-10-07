import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              // 'unsafe-eval' is needed for Next's dev-mode Fast Refresh; the
              // PayPal JS SDK (@paypal/react-paypal-js) injects its own
              // <script> tag at runtime rather than us adding one, so it
              // needs to be an allowed script-src origin.
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.paypal.com https://www.sandbox.paypal.com https://www.paypalobjects.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "media-src 'self' https://res.cloudinary.com",
              "font-src 'self' data:",
              "connect-src 'self' https://api-m.paypal.com https://api-m.sandbox.paypal.com https://www.paypal.com https://www.sandbox.paypal.com",
              // PayPal's buttons render inside an iframe/popup from its own
              // domain; PayHere isn't an iframe (see form-action below) but
              // is included here too in case that ever changes.
              "frame-src 'self' https://www.paypal.com https://www.sandbox.paypal.com",
              // PayHerePaymentSection does a full-page <form> POST redirect
              // straight to PayHere's checkout — that's governed by
              // form-action, not connect-src/frame-src.
              "form-action 'self' https://www.payhere.lk https://sandbox.payhere.lk",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;

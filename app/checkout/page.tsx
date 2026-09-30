import CheckoutForm from "@/components/checkout/CheckoutForm";

export default function CheckoutPage() {
  return (
    <section className="mx-auto max-w-[1100px] px-4 py-12 md:px-6">
      <h1 className="font-heading text-3xl font-extrabold text-brand-navy">
        Checkout
      </h1>
      <div className="mt-8">
        <CheckoutForm />
      </div>
    </section>
  );
}

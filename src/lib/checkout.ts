import { createServerFn } from "@tanstack/react-start";

export const getPayConfig = createServerFn({ method: "POST" }).handler(async () => {
  const { payConfig } = await import("./stripe.server");
  return payConfig();
});

export const startCheckout = createServerFn({ method: "POST" }).handler(async () => {
  const { createCheckoutUrl } = await import("./stripe.server");
  return createCheckoutUrl();
});

export const confirmCheckout = createServerFn({ method: "POST" })
  .validator((input: { sessionId: string }) => input)
  .handler(async ({ data }) => {
    const { sessionIsPaid } = await import("./stripe.server");
    const paid = await sessionIsPaid(data.sessionId);
    return { paid };
  });

export const canUnlockFromPaidFlag = createServerFn({ method: "POST" }).handler(
  async () => {
    const { honorPaidQuery } = await import("./stripe.server");
    return honorPaidQuery();
  },
);

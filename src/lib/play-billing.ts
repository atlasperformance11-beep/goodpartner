import { APP_PLAY_SKU, APP_PRICE_LABEL } from "./app-meta";

const PLAY_BILLING = "https://play.google.com/billing";

type PlayItem = {
  itemId: string;
  title?: string;
  description?: string;
  price?: { currency: string; value: string };
};

type PlayPurchase = {
  itemId: string;
  purchaseToken?: string;
};

type DigitalGoodsService = {
  getDetails: (ids: string[]) => Promise<PlayItem[]>;
  listPurchases: () => Promise<PlayPurchase[]>;
  acknowledge?: (token: string, type?: string) => Promise<void>;
  consume?: (token: string) => Promise<void>;
};

function goodsApi():
  | ((provider: string) => Promise<DigitalGoodsService | null>)
  | undefined {
  const w = window as Window & {
    getDigitalGoodsService?: (provider: string) => Promise<DigitalGoodsService | null>;
  };
  return w.getDigitalGoodsService;
}

export async function playBillingService(): Promise<DigitalGoodsService | null> {
  if (typeof window === "undefined") return null;
  const get = goodsApi();
  if (!get) return null;
  try {
    const service = await get(PLAY_BILLING);
    return service ?? null;
  } catch {
    return null;
  }
}

export async function playBillingAvailable(): Promise<boolean> {
  return (await playBillingService()) !== null;
}

function ownsUnlock(purchases: PlayPurchase[]): boolean {
  return purchases.some((p) => p.itemId === APP_PLAY_SKU);
}

export async function restorePlayUnlock(): Promise<boolean> {
  const service = await playBillingService();
  if (!service) return false;
  try {
    return ownsUnlock(await service.listPurchases());
  } catch {
    return false;
  }
}

export type PlayPurchaseResult = "purchased" | "owned" | "cancelled" | "unavailable" | "failed";

export async function purchasePlayUnlock(): Promise<PlayPurchaseResult> {
  const service = await playBillingService();
  if (!service) return "unavailable";

  try {
    if (ownsUnlock(await service.listPurchases())) return "owned";
  } catch {
    // Keep going — listPurchases can fail if the SKU is not live yet.
  }

  const request = new PaymentRequest(
    [
      {
        supportedMethods: PLAY_BILLING,
        data: { sku: APP_PLAY_SKU, itemId: APP_PLAY_SKU },
      },
    ],
    {
      total: {
        label: `Good Partner ${APP_PRICE_LABEL}`,
        amount: { currency: "USD", value: "0" },
      },
    },
  );

  try {
    const response = await request.show();
    const details = response.details as { purchaseToken?: string; token?: string };
    const token = details.purchaseToken || details.token;
    if (token && typeof service.acknowledge === "function") {
      try {
        await service.acknowledge(token, "onetime");
      } catch {
        // Play still grants entitlement; restore will pick it up.
      }
    }
    await response.complete("success");
    try {
      if (ownsUnlock(await service.listPurchases())) return "purchased";
    } catch {
      // Payment UI succeeded; treat as purchased.
    }
    return "purchased";
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") return "cancelled";
    return "failed";
  }
}

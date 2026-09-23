import { t as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout-o-SCFMnw.js
var getPayConfig_createServerFn_handler = createServerRpc({
	id: "132aacdd50ec3d941551bdbe0206e99bb3f8aea78806796e9f5aba39610ee55b",
	name: "getPayConfig",
	filename: "src/lib/checkout.ts"
}, (opts) => getPayConfig.__executeServer(opts));
var getPayConfig = createServerFn({ method: "POST" }).handler(getPayConfig_createServerFn_handler, async () => {
	const { payConfig } = await import("./stripe.server-DM-tbYt4.mjs");
	return payConfig();
});
var startCheckout_createServerFn_handler = createServerRpc({
	id: "8f68fe515934505b719754cfb5ea90121654c7dd4487cd4468056c08a221967a",
	name: "startCheckout",
	filename: "src/lib/checkout.ts"
}, (opts) => startCheckout.__executeServer(opts));
var startCheckout = createServerFn({ method: "POST" }).handler(startCheckout_createServerFn_handler, async () => {
	const { createCheckoutUrl } = await import("./stripe.server-DM-tbYt4.mjs");
	return createCheckoutUrl();
});
var confirmCheckout_createServerFn_handler = createServerRpc({
	id: "78e37f8c9c23c0b9b0012d58d12fa13d79860762e888f76a19fc5a33f3d8a821",
	name: "confirmCheckout",
	filename: "src/lib/checkout.ts"
}, (opts) => confirmCheckout.__executeServer(opts));
var confirmCheckout = createServerFn({ method: "POST" }).validator((input) => input).handler(confirmCheckout_createServerFn_handler, async ({ data }) => {
	const { sessionIsPaid } = await import("./stripe.server-DM-tbYt4.mjs");
	return { paid: await sessionIsPaid(data.sessionId) };
});
var canUnlockFromPaidFlag_createServerFn_handler = createServerRpc({
	id: "4927c775c77a8e9730b32ac7899d300bb47bed2e2fe0b3c1ef863f69f002f0ba",
	name: "canUnlockFromPaidFlag",
	filename: "src/lib/checkout.ts"
}, (opts) => canUnlockFromPaidFlag.__executeServer(opts));
var canUnlockFromPaidFlag = createServerFn({ method: "POST" }).handler(canUnlockFromPaidFlag_createServerFn_handler, async () => {
	const { honorPaidQuery } = await import("./stripe.server-DM-tbYt4.mjs");
	return honorPaidQuery();
});
//#endregion
export { canUnlockFromPaidFlag_createServerFn_handler, confirmCheckout_createServerFn_handler, getPayConfig_createServerFn_handler, startCheckout_createServerFn_handler };

import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout-Ao527YX7.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
createServerFn({ method: "POST" }).handler(createSsrRpc("132aacdd50ec3d941551bdbe0206e99bb3f8aea78806796e9f5aba39610ee55b"));
var startCheckout = createServerFn({ method: "POST" }).handler(createSsrRpc("8f68fe515934505b719754cfb5ea90121654c7dd4487cd4468056c08a221967a"));
var confirmCheckout = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("78e37f8c9c23c0b9b0012d58d12fa13d79860762e888f76a19fc5a33f3d8a821"));
var canUnlockFromPaidFlag = createServerFn({ method: "POST" }).handler(createSsrRpc("4927c775c77a8e9730b32ac7899d300bb47bed2e2fe0b3c1ef863f69f002f0ba"));
//#endregion
export { startCheckout as i, confirmCheckout as n, createSsrRpc as r, canUnlockFromPaidFlag as t };

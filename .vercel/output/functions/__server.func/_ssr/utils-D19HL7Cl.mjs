import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/utils-D19HL7Cl.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function nid() {
	return crypto.randomUUID();
}
//#endregion
export { nid as n, cn as t };

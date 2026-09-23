export type ShareBotResult = "shared" | "copied" | "cancelled" | "failed";

/** Hand a brief to Grok Bot via the system share sheet (iPhone lists Grok Bot). */
export async function shareWithGrokBot(text: string): Promise<ShareBotResult> {
  if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
    const file = new File([text], "good-partner-for-grok-bot.md", { type: "text/plain" });
    try {
      if (typeof navigator.canShare === "function" && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: "Good Partner",
          text: "Brief for a Grok Bot. Private.",
          files: [file],
        });
        return "shared";
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return "cancelled";
    }
    try {
      await navigator.share({
        title: "Good Partner",
        text,
        url: "https://goodpartner.grok.me/bot.md",
      });
      return "shared";
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return "cancelled";
    }
  }

  try {
    await navigator.clipboard.writeText(text);
    return "copied";
  } catch {
    return "failed";
  }
}

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { classifyNotifySurface } from "./notify-surface.ts";

describe("classifyNotifySurface", () => {
  it("is unsupported when the API is missing", () => {
    assert.deepEqual(
      classifyNotifySurface({
        supported: false,
        permission: "default",
        embedded: false,
        ios: false,
        standalone: false,
      }),
      { surface: "unsupported", canPrompt: false },
    );
  });

  it("can prompt on a top-level desktop/Android tab with default permission", () => {
    assert.deepEqual(
      classifyNotifySurface({
        supported: true,
        permission: "default",
        embedded: false,
        ios: false,
        standalone: false,
      }),
      { surface: "os", canPrompt: true },
    );
  });

  it("does not prompt after a grant", () => {
    assert.deepEqual(
      classifyNotifySurface({
        supported: true,
        permission: "granted",
        embedded: false,
        ios: true,
        standalone: true,
      }),
      { surface: "os", canPrompt: false },
    );
  });

  it("treats a grant as usable even inside a frame", () => {
    assert.deepEqual(
      classifyNotifySurface({
        supported: true,
        permission: "granted",
        embedded: true,
        ios: false,
        standalone: false,
      }),
      { surface: "os", canPrompt: false },
    );
  });

  it("sends iOS Safari tabs to Home Screen even when permission reads denied", () => {
    assert.deepEqual(
      classifyNotifySurface({
        supported: true,
        permission: "denied",
        embedded: false,
        ios: true,
        standalone: false,
      }),
      { surface: "ios-install", canPrompt: false },
    );
  });

  it("does not prompt from an iframe", () => {
    assert.deepEqual(
      classifyNotifySurface({
        supported: true,
        permission: "default",
        embedded: true,
        ios: false,
        standalone: false,
      }),
      { surface: "iframe", canPrompt: false },
    );
  });

  it("does not prompt from an iframe, even on iOS", () => {
    assert.deepEqual(
      classifyNotifySurface({
        supported: true,
        permission: "denied",
        embedded: true,
        ios: true,
        standalone: false,
      }),
      { surface: "iframe", canPrompt: false },
    );
  });

  it("is blocked after an explicit deny on a capable surface", () => {
    assert.deepEqual(
      classifyNotifySurface({
        supported: true,
        permission: "denied",
        embedded: false,
        ios: false,
        standalone: false,
      }),
      { surface: "blocked", canPrompt: false },
    );
  });

  it("can prompt from an iOS Home Screen app with default permission", () => {
    assert.deepEqual(
      classifyNotifySurface({
        supported: true,
        permission: "default",
        embedded: false,
        ios: true,
        standalone: true,
      }),
      { surface: "os", canPrompt: true },
    );
  });
});

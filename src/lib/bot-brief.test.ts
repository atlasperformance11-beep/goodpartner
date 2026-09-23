import assert from "node:assert/strict";
import test from "node:test";
import { buildBotBrief } from "./bot-brief.ts";
import type { AppData } from "./types.ts";

function empty(): AppData {
  return {
    weeklyGoal: 3,
    intention: { weekStart: "2026-09-21", text: "" },
    partner: {
      name: "",
      nickname: "",
      pronouns: "",
      howWeMet: "",
      notes: "",
      loveLanguages: [],
      likes: [],
      dislikes: [],
      shirtSize: "",
      shoeSize: "",
      ringSize: "",
      favoriteColor: "",
      favoriteFlower: "",
      favoriteFood: "",
      favoriteDrink: "",
      favoriteMovie: "",
      favoriteSong: "",
    },
    dates: [],
    ideas: [],
    gestures: [],
    quality: [],
    rituals: [],
  };
}

test("buildBotBrief names the partner and an upcoming date", () => {
  const data = empty();
  data.partner.name = "Maya Chen";
  data.partner.nickname = "May";
  data.partner.likes = ["oat lattes"];
  data.dates = [
    {
      id: "d1",
      title: "Maya's birthday",
      kind: "birthday",
      month: 10,
      day: 5,
      recursYearly: true,
      notes: "Ranunculus.",
      remindDays: [7, 1],
    },
  ];
  const text = buildBotBrief(data, new Date(2026, 8, 22));
  assert.match(text, /Maya Chen \(May\)/);
  assert.match(text, /oat lattes/);
  assert.match(text, /Maya's birthday/);
  assert.match(text, /in 13 days/);
  assert.match(text, /Do not publish/);
  assert.match(text, /\/bot\.md/);
});

test("buildBotBrief stays useful when the journal is empty", () => {
  const text = buildBotBrief(empty(), new Date(2026, 8, 22));
  assert.match(text, /not named yet/);
  assert.match(text, /None in the next 90 days/);
});

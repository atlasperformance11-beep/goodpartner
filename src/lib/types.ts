export const LOVE_LANGUAGES = [
  "Words of Affirmation",
  "Acts of Service",
  "Receiving Gifts",
  "Quality Time",
  "Physical Touch",
] as const;

export type LoveLanguage = (typeof LOVE_LANGUAGES)[number];

export type DateKind = "birthday" | "anniversary" | "first" | "custom";

export const DATE_KIND_LABEL: Record<DateKind, string> = {
  birthday: "Birthday",
  anniversary: "Anniversary",
  first: "Firsts",
  custom: "Occasion",
};

export type ImportantDate = {
  id: string;
  title: string;
  kind: DateKind;
  month: number;
  day: number;
  year?: number;
  recursYearly: boolean;
  notes: string;
  remindDays: number[];
};

export type IdeaKind = "gift" | "date";
export type IdeaStatus = "idea" | "planned" | "done";

export const IDEA_STATUS_LABEL: Record<IdeaStatus, string> = {
  idea: "Idea",
  planned: "Planned",
  done: "Done",
};

export type Idea = {
  id: string;
  kind: IdeaKind;
  title: string;
  notes: string;
  tags: string[];
  status: IdeaStatus;
  occasion: string;
  createdAt: string;
};

export type GestureKind = "note" | "gift" | "help" | "surprise" | "time" | "other";

export const GESTURE_KIND_LABEL: Record<GestureKind, string> = {
  note: "Note",
  gift: "Gift",
  help: "Help",
  surprise: "Surprise",
  time: "Time",
  other: "Other",
};

export type Gesture = {
  id: string;
  title: string;
  notes: string;
  date: string;
  kind: GestureKind;
};

export type QualityEntry = {
  id: string;
  date: string;
  minutes: number;
  title: string;
  notes: string;
};

export type Ritual = {
  id: string;
  title: string;
  cadenceDays: number;
  lastDone: string | null;
  notes: string;
};

export type Partner = {
  name: string;
  nickname: string;
  pronouns: string;
  howWeMet: string;
  notes: string;
  loveLanguages: LoveLanguage[];
  likes: string[];
  dislikes: string[];
  shirtSize: string;
  shoeSize: string;
  ringSize: string;
  favoriteColor: string;
  favoriteFlower: string;
  favoriteFood: string;
  favoriteDrink: string;
  favoriteMovie: string;
  favoriteSong: string;
};

export type Intention = {
  weekStart: string;
  text: string;
};

export type AppData = {
  partner: Partner;
  dates: ImportantDate[];
  ideas: Idea[];
  gestures: Gesture[];
  quality: QualityEntry[];
  rituals: Ritual[];
  intention: Intention;
  weeklyGoal: number;
};

export type Suggestion = {
  title: string;
  why: string;
  effort: "small" | "medium";
};

export const emptyPartner = (): Partner => ({
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
});

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { nid } from "./utils";
import { createEmpty, createSeed } from "./seed";
import { isoDate, weekStartIso } from "./dates";
import {
  defaultNotifications,
  type NotificationPrefs,
} from "./notify";
import type {
  AppData,
  Gesture,
  GestureKind,
  Idea,
  IdeaKind,
  IdeaStatus,
  ImportantDate,
  Partner,
  QualityEntry,
  Ritual,
} from "./types";

type AppState = AppData & {
  unlocked: boolean;
  previewingSample: boolean;
  notifications: NotificationPrefs;
  setNotifications: (patch: Partial<NotificationPrefs>) => void;
  addDate: (item: Omit<ImportantDate, "id">) => void;
  updateDate: (id: string, patch: Partial<ImportantDate>) => void;
  removeDate: (id: string) => void;
  addIdea: (item: Omit<Idea, "id" | "createdAt">) => void;
  updateIdea: (id: string, patch: Partial<Idea>) => void;
  removeIdea: (id: string) => void;
  addGesture: (item: Omit<Gesture, "id">) => void;
  removeGesture: (id: string) => void;
  addQuality: (item: Omit<QualityEntry, "id">) => void;
  removeQuality: (id: string) => void;
  addRitual: (item: Omit<Ritual, "id">) => void;
  updateRitual: (id: string, patch: Partial<Ritual>) => void;
  completeRitual: (id: string) => void;
  removeRitual: (id: string) => void;
  setPartner: (patch: Partial<Partner>) => void;
  setIntention: (text: string) => void;
  setWeeklyGoal: (n: number) => void;
  loadJournal: (data: AppData) => void;
  unlock: () => void;
  resetDemo: () => void;
  resetEmpty: () => void;
};

const empty = createEmpty();

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      ...empty,
      unlocked: false,
      previewingSample: false,
      notifications: defaultNotifications(),
      setNotifications: (patch) =>
        set((s) => ({ notifications: { ...s.notifications, ...patch } })),
      addDate: (item) =>
        set((s) => ({ dates: [{ ...item, id: nid() }, ...s.dates] })),
      updateDate: (id, patch) =>
        set((s) => ({
          dates: s.dates.map((d) => (d.id === id ? { ...d, ...patch } : d)),
        })),
      removeDate: (id) => set((s) => ({ dates: s.dates.filter((d) => d.id !== id) })),
      addIdea: (item) =>
        set((s) => ({
          ideas: [{ ...item, id: nid(), createdAt: isoDate() }, ...s.ideas],
        })),
      updateIdea: (id, patch) =>
        set((s) => ({
          ideas: s.ideas.map((i) => (i.id === id ? { ...i, ...patch } : i)),
        })),
      removeIdea: (id) => set((s) => ({ ideas: s.ideas.filter((i) => i.id !== id) })),
      addGesture: (item) =>
        set((s) => ({ gestures: [{ ...item, id: nid() }, ...s.gestures] })),
      removeGesture: (id) =>
        set((s) => ({ gestures: s.gestures.filter((g) => g.id !== id) })),
      addQuality: (item) =>
        set((s) => ({ quality: [{ ...item, id: nid() }, ...s.quality] })),
      removeQuality: (id) =>
        set((s) => ({ quality: s.quality.filter((q) => q.id !== id) })),
      addRitual: (item) =>
        set((s) => ({ rituals: [{ ...item, id: nid() }, ...s.rituals] })),
      updateRitual: (id, patch) =>
        set((s) => ({
          rituals: s.rituals.map((r) => (r.id === id ? { ...r, ...patch } : r)),
        })),
      completeRitual: (id) =>
        set((s) => ({
          rituals: s.rituals.map((r) =>
            r.id === id ? { ...r, lastDone: isoDate() } : r,
          ),
        })),
      removeRitual: (id) =>
        set((s) => ({ rituals: s.rituals.filter((r) => r.id !== id) })),
      setPartner: (patch) => set((s) => ({ partner: { ...s.partner, ...patch } })),
      setIntention: (text) =>
        set(() => ({ intention: { weekStart: weekStartIso(), text } })),
      setWeeklyGoal: (n) => set({ weeklyGoal: Math.max(1, Math.min(7, n)) }),
      loadJournal: (data) =>
        set({
          partner: data.partner,
          dates: data.dates,
          ideas: data.ideas,
          gestures: data.gestures,
          quality: data.quality,
          rituals: data.rituals,
          intention: data.intention,
          weeklyGoal: data.weeklyGoal,
        }),
      unlock: () => set({ unlocked: true, previewingSample: false }),
      resetDemo: () =>
        set((s) => ({
          ...createSeed(),
          unlocked: s.unlocked,
          notifications: s.notifications,
          previewingSample: true,
        })),
      resetEmpty: () =>
        set((s) => ({
          ...createEmpty(),
          unlocked: s.unlocked,
          notifications: s.notifications,
          previewingSample: false,
        })),
    }),
    {
      name: "good-partner-v4",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Partial<AppState>;
        return {
          ...current,
          ...p,
          notifications: {
            ...defaultNotifications(),
            ...(p.notifications ?? {}),
          },
        };
      },
      partialize: (s) => ({
        partner: s.partner,
        dates: s.dates,
        ideas: s.ideas,
        gestures: s.gestures,
        quality: s.quality,
        rituals: s.rituals,
        intention: s.intention,
        weeklyGoal: s.weeklyGoal,
        unlocked: s.unlocked,
        previewingSample: s.previewingSample,
        notifications: s.notifications,
      }),
    },
  ),
);

export type { GestureKind, IdeaKind, IdeaStatus };

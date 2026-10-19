import { useCallback, useEffect, useMemo, useState } from "react";
import { achievements, LEVEL_XP, VISIT_XP, type LocationId } from "@/data/portfolio";
import { sounds } from "@/lib/sounds";

const SAVE_KEY = "tawa-pixel-portfolio-save-v1";

type Save = {
  xp: number;
  visited: LocationId[];
  unlocked: string[];
  soundOn: boolean;
};

function loadSave(): Save {
  // Sound is OFF by default; the visitor opts in via the HUD toggle.
  const fallback: Save = { xp: 0, visited: [], unlocked: [], soundOn: false };
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(SAVE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as Partial<Save>;
    return {
      xp: typeof parsed.xp === "number" ? parsed.xp : 0,
      visited: Array.isArray(parsed.visited) ? (parsed.visited as LocationId[]) : [],
      unlocked: Array.isArray(parsed.unlocked) ? parsed.unlocked : [],
      soundOn: parsed.soundOn === true,
    };
  } catch {
    return fallback;
  }
}

export type Toast = { id: number; title: string; body: string };

export function useGameProgress() {
  const [save, setSave] = useState<Save>(loadSave);
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    sounds.muted = !save.soundOn;
    try {
      window.localStorage.setItem(SAVE_KEY, JSON.stringify(save));
    } catch {
      // storage unavailable — game still works for the session
    }
  }, [save]);

  const pushToast = useCallback((title: string, body: string) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, title, body }]);
    window.setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 4200);
  }, []);

  const unlock = useCallback(
    (id: string) => {
      const ach = achievements.find((a) => a.id === id);
      if (!ach) return;
      if (save.unlocked.includes(id)) return;
      sounds.play("achievement");
      pushToast(`Achievement unlocked: ${ach.name}`, `${ach.description} · +${ach.xp} XP`);
      setSave((s) => {
        if (s.unlocked.includes(id)) return s;
        return { ...s, xp: s.xp + ach.xp, unlocked: [...s.unlocked, id] };
      });
    },
    [save.unlocked, pushToast],
  );

  const visit = useCallback(
    (loc: LocationId) => {
      const isNew = !save.visited.includes(loc);
      const nextVisited = isNew ? [...save.visited, loc] : save.visited;

      setSave((s) => {
        if (s.visited.includes(loc)) return s;
        return { ...s, xp: s.xp + VISIT_XP, visited: [...s.visited, loc] };
      });

      const locAch: Record<LocationId, string> = {
        profile: "profile-viewer",
        skills: "skill-seeker",
        tech: "gear-check",
        projects: "project-inspector",
        certificates: "certified",
        contact: "networker",
      };
      unlock("curious");
      unlock(locAch[loc]);

      if (nextVisited.length >= 6 && !save.unlocked.includes("explorer")) {
        const ach = achievements.find((a) => a.id === "explorer");
        if (ach) {
          sounds.play("levelup");
          pushToast(`Achievement unlocked: ${ach.name}`, `${ach.description} · +${ach.xp} XP`);
          setSave((s) => ({
            ...s,
            xp: s.xp + ach.xp,
            unlocked: s.unlocked.includes("explorer") ? s.unlocked : [...s.unlocked, "explorer"],
          }));
        }
      }
    },
    [save.visited, save.unlocked, unlock, pushToast],
  );

  const markMoved = useCallback(() => unlock("first-steps"), [unlock]);
  const markResume = useCallback(() => unlock("resume-hunter"), [unlock]);

  const toggleSound = useCallback(() => {
    setSave((s) => ({ ...s, soundOn: !s.soundOn }));
  }, []);

  const resetProgress = useCallback(() => {
    setSave((s) => ({ xp: 0, visited: [], unlocked: [], soundOn: s.soundOn }));
    pushToast("Exploration reset", "XP, visited zones and achievements cleared.");
  }, [pushToast]);

  const level = Math.floor(save.xp / LEVEL_XP) + 1;
  const levelProgress = ((save.xp % LEVEL_XP) / LEVEL_XP) * 100;

  return useMemo(
    () => ({
      xp: save.xp,
      level,
      levelProgress,
      visited: save.visited,
      unlocked: save.unlocked,
      soundOn: save.soundOn,
      toasts,
      visit,
      unlock,
      markMoved,
      markResume,
      toggleSound,
      resetProgress,
    }),
    [
      save,
      level,
      levelProgress,
      toasts,
      visit,
      unlock,
      markMoved,
      markResume,
      toggleSound,
      resetProgress,
    ],
  );
}

import { act, cleanup, renderHook, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { useGameProgress } from "./useGameProgress";

const SAVE_KEY = "tawa-pixel-portfolio-save-v1";

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

describe("useGameProgress", () => {
  it("awards exploration XP once, including after visited zones are reset", async () => {
    const { result } = renderHook(() => useGameProgress());

    act(() => result.current.visit("profile"));
    const earnedXp = result.current.xp;
    expect(earnedXp).toBeGreaterThan(0);

    act(() => result.current.visit("profile"));
    expect(result.current.xp).toBe(earnedXp);

    act(() => result.current.resetProgress());
    expect(result.current.visited).toEqual([]);

    act(() => result.current.visit("profile"));
    expect(result.current.xp).toBe(earnedXp);

    await waitFor(() => {
      const saved = JSON.parse(window.localStorage.getItem(SAVE_KEY) ?? "{}");
      expect(saved.xp).toBe(earnedXp);
      expect(saved.earnedVisits).toContain("profile");
      expect(saved.unlocked).toContain("profile-viewer");
    });
  });

  it("charges XP only for a game's first unlock and persists the unlock", async () => {
    window.localStorage.setItem(
      SAVE_KEY,
      JSON.stringify({
        xp: 200,
        visited: [],
        unlocked: [],
        soundOn: false,
        spentXp: 0,
        rewards: [],
      }),
    );
    const { result, unmount } = renderHook(() => useGameProgress());

    act(() => {
      expect(result.current.redeem("quiz", 200)).toBe(true);
    });
    expect(result.current.availableXp).toBe(0);
    expect(result.current.rewards).toEqual(["quiz"]);

    act(() => {
      expect(result.current.redeem("quiz", 200)).toBe(true);
    });
    expect(result.current.availableXp).toBe(0);
    expect(result.current.rewards).toEqual(["quiz"]);

    await waitFor(() => {
      const saved = JSON.parse(window.localStorage.getItem(SAVE_KEY) ?? "{}");
      expect(saved.spentXp).toBe(200);
      expect(saved.rewards).toEqual(["quiz"]);
    });

    unmount();
    const reloaded = renderHook(() => useGameProgress());
    expect(reloaded.result.current.rewards).toContain("quiz");
    expect(reloaded.result.current.availableXp).toBe(0);
  });
});

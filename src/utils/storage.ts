import {ProgressData, ThemeId} from '../types/puzzle';
import {getLevelsForTheme} from '../data/puzzles';

const STORAGE_KEY = 'puzzle_ceria_progress_v1';

const DEFAULT_PROGRESS: ProgressData = {
  starsByLevel: {},
  soundEnabled: true,
};

export function loadProgress(): ProgressData {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw) as Partial<ProgressData>;
    return {
      starsByLevel: parsed.starsByLevel ?? {},
      soundEnabled: parsed.soundEnabled ?? true,
    };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function saveProgress(progress: ProgressData): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Ignore storage quota errors
  }
}

export function isLevelUnlocked(
  themeId: ThemeId,
  level: 1 | 2 | 3,
  starsByLevel: Record<string, number>
): boolean {
  if (level === 1) return true;
  const prevLevelId = `${themeId}-${level - 1}`;
  return (starsByLevel[prevLevelId] ?? 0) > 0;
}

export function getThemeStars(
  themeId: ThemeId,
  starsByLevel: Record<string, number>
): {earned: number; total: number} {
  const levels = getLevelsForTheme(themeId);
  const earned = levels.reduce((sum, l) => sum + (starsByLevel[l.id] ?? 0), 0);
  return {earned, total: levels.length * 3};
}

export function getTotalStars(starsByLevel: Record<string, number>): number {
  return Object.values(starsByLevel).reduce((sum, s) => sum + s, 0);
}

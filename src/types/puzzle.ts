export type ThemeId = 'hewan' | 'buah' | 'kendaraan';

export type LevelNumber = 1 | 2 | 3;

export type PuzzleImageId =
  | 'kucing'
  | 'gajah'
  | 'ikan'
  | 'apel'
  | 'pisang'
  | 'semangka'
  | 'mobil'
  | 'pesawat'
  | 'kereta';

export interface PuzzleLevelConfig {
  id: string;
  imageId: PuzzleImageId;
  themeId: ThemeId;
  level: LevelNumber;
  title: string;
  spokenPrompt: string;
  rows: number;
  cols: number;
  cellSize: number;
  boardWidth: number;
  boardHeight: number;
  accentColor: string;
  cardBg: string;
}

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  subtitle: string;
  previewImageId: PuzzleImageId;
  bgColor: string;
  borderColor: string;
  badgeColor: string;
}

export interface ProgressData {
  starsByLevel: Record<string, number>;
  soundEnabled: boolean;
}

import React from 'react';
import {
  ArrowLeft,
  Lock,
  Play,
  Star,
  Volume2,
  VolumeX,
} from 'lucide-react';
import {getLevelsForTheme, THEMES} from '../data/puzzles';
import {PuzzleLevelConfig, ThemeConfig, ThemeId} from '../types/puzzle';
import {getThemeStars, getTotalStars, isLevelUnlocked} from '../utils/storage';
import {playClickSound, speakIndonesian} from '../utils/sound';
import {PuzzleArt} from './illustrations/PuzzleArt';
import {PWAInstallButton} from './PWAInstallButton';

interface ThemeSelectorProps {
  selectedThemeId: ThemeId | null;
  starsByLevel: Record<string, number>;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onSelectTheme: (themeId: ThemeId | null) => void;
  onSelectLevel: (level: PuzzleLevelConfig) => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  selectedThemeId,
  starsByLevel,
  soundEnabled,
  onToggleSound,
  onSelectTheme,
  onSelectLevel,
}) => {
  const totalStars = getTotalStars(starsByLevel);
  const selectedTheme: ThemeConfig | undefined = THEMES.find(
    (t) => t.id === selectedThemeId
  );
  const themeLevels = selectedThemeId ? getLevelsForTheme(selectedThemeId) : [];

  const handleThemeClick = (theme: ThemeConfig) => {
    playClickSound(soundEnabled);
    speakIndonesian(`Tema ${theme.name}! Pilih levelnya ya!`, soundEnabled);
    onSelectTheme(theme.id);
  };

  const handleLevelClick = (level: PuzzleLevelConfig, unlocked: boolean) => {
    if (!unlocked) {
      playClickSound(soundEnabled);
      speakIndonesian(
        `Selesaikan level ${level.level - 1} dulu ya!`,
        soundEnabled
      );
      return;
    }
    playClickSound(soundEnabled);
    onSelectLevel(level);
  };

  return (
    <div className="safe-area-inset flex flex-col w-full h-dvh overflow-hidden bg-[#FFFBF0]">
      {/* Top Bar */}
      <header className="flex items-center justify-between gap-3 shrink-0 pb-2 sm:pb-3">
        <div className="flex items-center gap-3 min-w-0">
          {selectedTheme ? (
            <button
              type="button"
              onClick={() => {
                playClickSound(soundEnabled);
                onSelectTheme(null);
              }}
              aria-label="Kembali ke Pilih Tema"
              className="flex items-center justify-center gap-2 min-w-[80px] min-h-[64px] sm:min-h-[80px] px-4 rounded-2xl bg-white text-[#2D2424] font-bold text-base sm:text-lg border-3 border-[#2D2424] border-b-[6px] active:border-b-3 active:translate-y-[3px] transition-transform cursor-pointer shrink-0"
            >
              <ArrowLeft className="w-7 h-7 shrink-0" strokeWidth={2.75} />
              <span>Kembali</span>
            </button>
          ) : (
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#FF6B4A] border-3 border-[#2D2424] flex items-center justify-center shrink-0 shadow-sm">
                <svg viewBox="0 0 64 64" className="w-10 h-10">
                  <rect
                    x="8"
                    y="8"
                    width="22"
                    height="22"
                    rx="5"
                    fill="#FFD166"
                    stroke="#2D2424"
                    strokeWidth="3.5"
                  />
                  <rect
                    x="34"
                    y="8"
                    width="22"
                    height="22"
                    rx="5"
                    fill="#06D6A0"
                    stroke="#2D2424"
                    strokeWidth="3.5"
                  />
                  <rect
                    x="8"
                    y="34"
                    width="22"
                    height="22"
                    rx="5"
                    fill="#38BDF8"
                    stroke="#2D2424"
                    strokeWidth="3.5"
                  />
                  <rect
                    x="34"
                    y="34"
                    width="22"
                    height="22"
                    rx="5"
                    fill="#FB7185"
                    stroke="#2D2424"
                    strokeWidth="3.5"
                  />
                </svg>
              </div>
              <div className="min-w-0">
                <h1 className="text-2xl sm:text-3xl font-bold text-[#2D2424] tracking-tight truncate">
                  Puzzle Ceria
                </h1>
                <p className="text-xs sm:text-sm font-semibold text-[#6B5B5B] truncate">
                  Ayo susun gambar seru!
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Total Stars Counter */}
          <div
            className="flex items-center gap-2 min-h-[56px] sm:min-h-[68px] px-4 rounded-2xl bg-[#FEF3C7] border-3 border-[#2D2424]"
            aria-label={`Total bintang: ${totalStars} dari 27`}
          >
            <Star
              className="w-7 h-7 text-[#F59E0B] fill-[#FBBF24] shrink-0"
              strokeWidth={2.5}
            />
            <span className="text-lg sm:text-xl font-bold text-[#2D2424] tabular-nums">
              {totalStars}/27
            </span>
          </div>

          <PWAInstallButton />

          {/* Sound Toggle */}
          <button
            type="button"
            onClick={onToggleSound}
            aria-label={soundEnabled ? 'Matikan Suara' : 'Nyalakan Suara'}
            className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 min-w-[80px] min-h-[64px] sm:min-h-[80px] px-3 sm:px-4 rounded-2xl font-bold text-xs sm:text-base border-3 border-[#2D2424] border-b-[6px] active:border-b-3 active:translate-y-[3px] transition-transform cursor-pointer shrink-0 ${
              soundEnabled
                ? 'bg-[#22C55E] text-white'
                : 'bg-[#E5E7EB] text-[#4B5563]'
            }`}
          >
            {soundEnabled ? (
              <Volume2 className="w-7 h-7 shrink-0" strokeWidth={2.75} />
            ) : (
              <VolumeX className="w-7 h-7 shrink-0" strokeWidth={2.75} />
            )}
            <span>{soundEnabled ? 'Suara' : 'Diam'}</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 min-h-0 flex flex-col justify-center">
        {!selectedTheme ? (
          <div className="flex flex-col h-full min-h-0 justify-center gap-3 sm:gap-5">
            <div className="text-center shrink-0">
              <h2 className="text-xl sm:text-3xl font-bold text-[#2D2424]">
                Pilih Tema Gambar
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5 flex-1 min-h-0 max-h-[420px] w-full max-w-5xl mx-auto">
              {THEMES.map((theme) => {
                const {earned, total} = getThemeStars(theme.id, starsByLevel);
                return (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => handleThemeClick(theme)}
                    style={{
                      backgroundColor: theme.bgColor,
                      borderColor: '#2D2424',
                    }}
                    className="group relative flex sm:flex-col items-center justify-between sm:justify-center gap-3 p-3 sm:p-5 rounded-3xl border-4 border-b-[8px] active:border-b-4 active:translate-y-[4px] transition-transform cursor-pointer min-h-[96px] overflow-hidden"
                  >
                    {/* Preview Artwork Box */}
                    <div
                      className="w-20 h-20 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-2xl border-3 border-[#2D2424] overflow-hidden bg-white shrink-0 shadow-sm group-hover:scale-105 transition-transform"
                    >
                      <svg
                        viewBox="0 0 300 300"
                        className="w-full h-full block"
                      >
                        <PuzzleArt imageId={theme.previewImageId} />
                      </svg>
                    </div>

                    <div className="flex flex-col items-start sm:items-center flex-1 sm:flex-initial text-left sm:text-center min-w-0">
                      <span className="text-2xl sm:text-3xl font-bold text-[#2D2424] leading-tight">
                        {theme.name}
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-[#5C4E4E] mt-0.5 truncate max-w-full">
                        {theme.subtitle}
                      </span>
                    </div>

                    <div
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 border-[#2D2424] bg-white shrink-0"
                    >
                      <Star
                        className="w-5 h-5 text-[#F59E0B] fill-[#FBBF24]"
                        strokeWidth={2.5}
                      />
                      <span className="text-base font-bold text-[#2D2424] tabular-nums">
                        {earned}/{total}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-full min-h-0 justify-center gap-3 sm:gap-5">
            <div className="text-center shrink-0">
              <h2 className="text-xl sm:text-3xl font-bold text-[#2D2424]">
                Tema {selectedTheme.name} · Pilih Level
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5 flex-1 min-h-0 max-h-[420px] w-full max-w-5xl mx-auto">
              {themeLevels.map((lvl) => {
                const unlocked = isLevelUnlocked(
                  lvl.themeId,
                  lvl.level,
                  starsByLevel
                );
                const earnedStars = starsByLevel[lvl.id] ?? 0;
                const pieceCount = lvl.rows * lvl.cols;

                return (
                  <button
                    key={lvl.id}
                    type="button"
                    onClick={() => handleLevelClick(lvl, unlocked)}
                    style={{
                      backgroundColor: unlocked ? lvl.cardBg : '#F3F4F6',
                    }}
                    className={`relative flex sm:flex-col items-center justify-between sm:justify-center gap-3 p-3 sm:p-5 rounded-3xl border-4 border-[#2D2424] transition-transform min-h-[96px] overflow-hidden ${
                      unlocked
                        ? 'border-b-[8px] active:border-b-4 active:translate-y-[4px] cursor-pointer'
                        : 'opacity-80 cursor-not-allowed'
                    }`}
                  >
                    {/* Level Badge */}
                    <div
                      className="hidden sm:flex items-center justify-center px-3 py-1 rounded-xl border-2 border-[#2D2424] text-sm font-bold text-white"
                      style={{
                        backgroundColor: unlocked ? lvl.accentColor : '#9CA3AF',
                      }}
                    >
                      Level {lvl.level} · {pieceCount} Keping
                    </div>

                    {/* Preview Artwork */}
                    <div className="relative w-20 h-20 sm:w-40 sm:h-32 md:w-48 md:h-36 rounded-2xl border-3 border-[#2D2424] overflow-hidden bg-white shrink-0 flex items-center justify-center">
                      <svg
                        viewBox={`0 0 ${lvl.boardWidth} ${lvl.boardHeight}`}
                        className={`w-full h-full block ${
                          unlocked ? '' : 'grayscale opacity-50'
                        }`}
                      >
                        <PuzzleArt imageId={lvl.imageId} />
                      </svg>
                      {!unlocked && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/25">
                          <div className="w-12 h-12 rounded-2xl bg-white border-3 border-[#2D2424] flex items-center justify-center">
                            <Lock
                              className="w-6 h-6 text-[#4B5563]"
                              strokeWidth={2.75}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Title & Stars */}
                    <div className="flex flex-col items-start sm:items-center flex-1 sm:flex-initial min-w-0">
                      <span className="text-xl sm:text-2xl font-bold text-[#2D2424]">
                        {lvl.title}
                      </span>
                      <span className="sm:hidden text-xs font-semibold text-[#5C4E4E]">
                        Level {lvl.level} · {pieceCount} Keping
                      </span>

                      <div className="flex items-center gap-1.5 mt-1">
                        {[1, 2, 3].map((starIdx) => (
                          <Star
                            key={starIdx}
                            className={`w-6 h-6 sm:w-7 sm:h-7 ${
                              starIdx <= earnedStars
                                ? 'text-[#F59E0B] fill-[#FBBF24]'
                                : 'text-[#D1D5DB] fill-[#E5E7EB]'
                            }`}
                            strokeWidth={2.2}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Action Hint */}
                    {unlocked ? (
                      <div
                        className="flex items-center justify-center gap-1.5 min-w-[80px] min-h-[48px] px-4 rounded-2xl border-3 border-[#2D2424] text-white font-bold text-base shrink-0"
                        style={{backgroundColor: lvl.accentColor}}
                      >
                        <Play className="w-5 h-5 fill-white" />
                        <span>Main</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center min-w-[80px] min-h-[44px] px-3 rounded-2xl border-2 border-[#9CA3AF] bg-white text-[#6B7280] font-bold text-xs sm:text-sm shrink-0">
                        Terkunci
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

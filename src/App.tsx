import {useCallback, useState} from 'react';
import {PuzzleBoardGame} from './components/PuzzleBoardGame';
import {ThemeSelector} from './components/ThemeSelector';
import {getLevelsForTheme} from './data/puzzles';
import {ProgressData, PuzzleLevelConfig, ThemeId} from './types/puzzle';
import {playClickSound, speakIndonesian} from './utils/sound';
import {loadProgress, saveProgress} from './utils/storage';

export default function App() {
  const [progress, setProgress] = useState<ProgressData>(() => loadProgress());
  const [selectedThemeId, setSelectedThemeId] = useState<ThemeId | null>(null);
  const [activeLevel, setActiveLevel] = useState<PuzzleLevelConfig | null>(null);

  const handleToggleSound = useCallback(() => {
    setProgress((prev) => {
      const nextSound = !prev.soundEnabled;
      const updated: ProgressData = {
        ...prev,
        soundEnabled: nextSound,
      };
      saveProgress(updated);
      if (nextSound) {
        playClickSound(true);
        speakIndonesian('Suara menyala!', true);
      } else if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      return updated;
    });
  }, []);

  const handleCompleteLevel = useCallback(
    (levelId: string, stars: number) => {
      setProgress((prev) => {
        const bestStars = Math.max(prev.starsByLevel[levelId] ?? 0, stars);
        const updated: ProgressData = {
          ...prev,
          starsByLevel: {
            ...prev.starsByLevel,
            [levelId]: bestStars,
          },
        };
        saveProgress(updated);
        return updated;
      });
    },
    []
  );

  const handleGoHome = useCallback(() => {
    setActiveLevel(null);
  }, []);

  const nextLevelConfig = activeLevel
    ? getLevelsForTheme(activeLevel.themeId).find(
        (l) => l.level === activeLevel.level + 1
      ) ?? null
    : null;

  const handleNextLevel = useCallback(() => {
    if (nextLevelConfig) {
      setActiveLevel(nextLevelConfig);
    } else {
      setActiveLevel(null);
    }
  }, [nextLevelConfig]);

  if (activeLevel) {
    return (
      <PuzzleBoardGame
        level={activeLevel}
        hasNextLevel={!!nextLevelConfig}
        soundEnabled={progress.soundEnabled}
        onToggleSound={handleToggleSound}
        onGoHome={handleGoHome}
        onCompleteLevel={(stars) => handleCompleteLevel(activeLevel.id, stars)}
        onNextLevel={handleNextLevel}
      />
    );
  }

  return (
    <ThemeSelector
      selectedThemeId={selectedThemeId}
      starsByLevel={progress.starsByLevel}
      soundEnabled={progress.soundEnabled}
      onToggleSound={handleToggleSound}
      onSelectTheme={setSelectedThemeId}
      onSelectLevel={(lvl) => {
        setSelectedThemeId(lvl.themeId);
        setActiveLevel(lvl);
      }}
    />
  );
}

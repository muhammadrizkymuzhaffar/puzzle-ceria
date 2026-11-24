import React, {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  ArrowRight,
  Eye,
  Home,
  RotateCcw,
  Shuffle,
  Smile,
  Star,
  Volume2,
  VolumeX,
} from 'lucide-react';
import {PuzzleLevelConfig} from '../types/puzzle';
import {generateJigsawGrid, JigsawPieceGeometry} from '../utils/jigsawGeometry';
import {
  playClickSound,
  playHintSound,
  playPickSound,
  playSnapSound,
  playWinSound,
  playWrongSound,
  speakIndonesian,
  triggerGentleVibration,
} from '../utils/sound';
import {ConfettiBurst} from './ConfettiBurst';
import {PuzzleArt} from './illustrations/PuzzleArt';
import {JigsawPieceSvg} from './JigsawPieceSvg';

interface PuzzleBoardGameProps {
  level: PuzzleLevelConfig;
  hasNextLevel: boolean;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onGoHome: () => void;
  onCompleteLevel: (stars: number) => void;
  onNextLevel: () => void;
}

interface DragState {
  pieceIndex: number;
  pointerId: number;
  clientX: number;
  clientY: number;
  touchOffsetY: number;
}

function shuffleIndices(indices: number[]): number[] {
  const arr = [...indices];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const PuzzleBoardGame: React.FC<PuzzleBoardGameProps> = ({
  level,
  hasNextLevel,
  soundEnabled,
  onToggleSound,
  onGoHome,
  onCompleteLevel,
  onNextLevel,
}) => {
  const rawUid = useId().replace(/:/g, '');
  const pieces = useMemo(
    () =>
      generateJigsawGrid(level.id, level.rows, level.cols, level.cellSize),
    [level.id, level.rows, level.cols, level.cellSize]
  );

  const [trayOrder, setTrayOrder] = useState<number[]>(() =>
    shuffleIndices(pieces.map((p) => p.index))
  );
  const [placedIndices, setPlacedIndices] = useState<Set<number>>(
    () => new Set()
  );
  const [justSnappedIndex, setJustSnappedIndex] = useState<number | null>(null);
  const [dragState, setDragState] = useState<DragState | null>(null);
  const [hoveredTargetIndex, setHoveredTargetIndex] = useState<number | null>(
    null
  );
  const [wrongMessage, setWrongMessage] = useState<boolean>(false);
  const [hintsUsed, setHintsUsed] = useState<number>(0);
  const [hintSecondsLeft, setHintSecondsLeft] = useState<number>(0);
  const [isVictory, setIsVictory] = useState<boolean>(false);
  const [earnedStars, setEarnedStars] = useState<number>(3);
  const [isPortrait, setIsPortrait] = useState<boolean>(false);

  const boardContainerRef = useRef<HTMLDivElement | null>(null);
  const boardFrameRef = useRef<HTMLDivElement | null>(null);
  const trayContainerRef = useRef<HTMLDivElement | null>(null);
  const wrongTimeoutRef = useRef<number | null>(null);
  const hintIntervalRef = useRef<number | null>(null);

  const [boardSize, setBoardSize] = useState<{width: number; height: number}>({
    width: 300,
    height: 300,
  });
  const [trayBoxSize, setTrayBoxSize] = useState<{
    width: number;
    height: number;
  }>({
    width: 300,
    height: 300,
  });

  // Reset state cleanly when level changes
  useEffect(() => {
    setTrayOrder(shuffleIndices(pieces.map((p) => p.index)));
    setPlacedIndices(new Set());
    setJustSnappedIndex(null);
    setDragState(null);
    setHoveredTargetIndex(null);
    setWrongMessage(false);
    setHintsUsed(0);
    setHintSecondsLeft(0);
    setIsVictory(false);
    setEarnedStars(3);

    speakIndonesian(level.spokenPrompt, soundEnabled);

    return () => {
      if (wrongTimeoutRef.current) window.clearTimeout(wrongTimeoutRef.current);
      if (hintIntervalRef.current) window.clearInterval(hintIntervalRef.current);
    };
  }, [level.id, level.spokenPrompt, pieces]); // eslint-disable-line react-hooks/exhaustive-deps

  // Track orientation & responsive sizes with ResizeObserver
  useEffect(() => {
    const updateOrientation = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };
    updateOrientation();
    window.addEventListener('resize', updateOrientation);

    const observer = new ResizeObserver(() => {
      if (boardContainerRef.current) {
        const rect = boardContainerRef.current.getBoundingClientRect();
        setBoardSize({width: rect.width, height: rect.height});
      }
      if (trayContainerRef.current) {
        const rect = trayContainerRef.current.getBoundingClientRect();
        setTrayBoxSize({width: rect.width, height: rect.height});
      }
    });

    if (boardContainerRef.current) observer.observe(boardContainerRef.current);
    if (trayContainerRef.current) observer.observe(trayContainerRef.current);

    return () => {
      window.removeEventListener('resize', updateOrientation);
      observer.disconnect();
    };
  }, []);

  // Scale puzzle board to fit cleanly inside available space
  const boardScale = useMemo(() => {
    const availW = Math.max(160, boardSize.width - 24);
    const availH = Math.max(160, boardSize.height - 24);
    const scaleW = availW / level.boardWidth;
    const scaleH = availH / level.boardHeight;
    return Math.min(scaleW, scaleH, 1.45);
  }, [boardSize, level.boardWidth, level.boardHeight]);

  const renderedBoardW = level.boardWidth * boardScale;
  const renderedBoardH = level.boardHeight * boardScale;
  const cellScaled = level.cellSize * boardScale;
  const padScaled = Math.round(level.cellSize * 0.3) * boardScale;
  const fullPieceScaledSize = cellScaled + padScaled * 2;

  // Compute tray piece size (>= 80px when space permits)
  const trayPieceDisplaySize = useMemo(() => {
    const cols = level.cols;
    const rows = level.rows;
    const padX = 24;
    const padY = 24;
    const gap = 12;
    const maxCellW = (trayBoxSize.width - padX - gap * (cols - 1)) / cols;
    const maxCellH = (trayBoxSize.height - padY - gap * (rows - 1)) / rows;
    const raw = Math.floor(Math.min(maxCellW, maxCellH));
    return Math.max(76, Math.min(raw, 140));
  }, [trayBoxSize, level.cols, level.rows]);

  const handleResetPuzzle = useCallback(() => {
    playClickSound(soundEnabled);
    if (hintIntervalRef.current) window.clearInterval(hintIntervalRef.current);
    setHintSecondsLeft(0);
    setPlacedIndices(new Set());
    setTrayOrder(shuffleIndices(pieces.map((p) => p.index)));
    setHintsUsed(0);
    setIsVictory(false);
    setWrongMessage(false);
    setJustSnappedIndex(null);
    speakIndonesian(level.spokenPrompt, soundEnabled);
  }, [level.spokenPrompt, pieces, soundEnabled]);

  const handleShuffleTray = useCallback(() => {
    playClickSound(soundEnabled);
    setTrayOrder((prev) => shuffleIndices(prev));
  }, [soundEnabled]);

  const handleShowHint = useCallback(() => {
    if (isVictory || hintSecondsLeft > 0) return;
    playHintSound(soundEnabled);
    speakIndonesian('Ini gambarnya!', soundEnabled);
    setHintsUsed((h) => h + 1);
    setHintSecondsLeft(3);

    if (hintIntervalRef.current) window.clearInterval(hintIntervalRef.current);
    hintIntervalRef.current = window.setInterval(() => {
      setHintSecondsLeft((prev) => {
        if (prev <= 1) {
          if (hintIntervalRef.current) {
            window.clearInterval(hintIntervalRef.current);
            hintIntervalRef.current = null;
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [hintSecondsLeft, isVictory, soundEnabled]);

  const getDraggedPieceCenter = (state: DragState) => {
    return {
      cx: state.clientX,
      cy: state.clientY - state.touchOffsetY,
    };
  };

  const computeDropMatch = useCallback(
    (state: DragState) => {
      if (!boardFrameRef.current) {
        return {isCorrectSpot: false, isInsideBoard: false};
      }
      const piece = pieces[state.pieceIndex];
      const rect = boardFrameRef.current.getBoundingClientRect();
      const {cx, cy} = getDraggedPieceCenter(state);

      const targetX = rect.left + (piece.col + 0.5) * cellScaled;
      const targetY = rect.top + (piece.row + 0.5) * cellScaled;
      const dist = Math.hypot(cx - targetX, cy - targetY);
      const snapRadius = cellScaled * 0.52;

      const margin = 24;
      const isInsideBoard =
        cx >= rect.left - margin &&
        cx <= rect.right + margin &&
        cy >= rect.top - margin &&
        cy <= rect.bottom + margin;

      return {
        isCorrectSpot: dist <= snapRadius,
        isInsideBoard,
      };
    },
    [pieces, cellScaled]
  );

  const handlePointerDownPiece = (
    e: React.PointerEvent<HTMLButtonElement>,
    piece: JigsawPieceGeometry
  ) => {
    if (isVictory || placedIndices.has(piece.index)) return;
    e.preventDefault();
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Ignore if capture is unsupported
    }

    playPickSound(soundEnabled);

    const nextDrag: DragState = {
      pieceIndex: piece.index,
      pointerId: e.pointerId,
      clientX: e.clientX,
      clientY: e.clientY,
      touchOffsetY: e.pointerType === 'touch' ? 28 : 0,
    };
    setDragState(nextDrag);

    const {isCorrectSpot} = computeDropMatch(nextDrag);
    setHoveredTargetIndex(isCorrectSpot ? piece.index : null);
  };

  const handlePointerMovePiece = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!dragState || dragState.pointerId !== e.pointerId) return;
    e.preventDefault();
    const updated: DragState = {
      ...dragState,
      clientX: e.clientX,
      clientY: e.clientY,
    };
    setDragState(updated);

    const {isCorrectSpot} = computeDropMatch(updated);
    setHoveredTargetIndex(isCorrectSpot ? updated.pieceIndex : null);
  };

  const handlePointerUpPiece = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!dragState || dragState.pointerId !== e.pointerId) return;
    e.preventDefault();
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      // Ignore
    }

    const updated: DragState = {
      ...dragState,
      clientX: e.clientX,
      clientY: e.clientY,
    };

    const {isCorrectSpot, isInsideBoard} = computeDropMatch(updated);
    const pieceIndex = updated.pieceIndex;

    setDragState(null);
    setHoveredTargetIndex(null);

    if (isCorrectSpot) {
      const nextPlaced = new Set(placedIndices);
      nextPlaced.add(pieceIndex);
      setPlacedIndices(nextPlaced);
      setJustSnappedIndex(pieceIndex);
      setWrongMessage(false);
      triggerGentleVibration(35);

      if (nextPlaced.size === pieces.length) {
        // Completed the whole puzzle!
        const stars = hintsUsed === 0 ? 3 : hintsUsed === 1 ? 2 : 1;
        setEarnedStars(stars);
        setIsVictory(true);
        playWinSound(soundEnabled);
        triggerGentleVibration(80);
        speakIndonesian(`${level.title}! Hebat!`, soundEnabled);
        onCompleteLevel(stars);
      } else {
        playSnapSound(soundEnabled);
      }
    } else if (isInsideBoard) {
      // Gentle feedback without penalty
      playWrongSound(soundEnabled);
      speakIndonesian('Coba lagi ya!', soundEnabled, true);
      setWrongMessage(true);
      if (wrongTimeoutRef.current) window.clearTimeout(wrongTimeoutRef.current);
      wrongTimeoutRef.current = window.setTimeout(() => {
        setWrongMessage(false);
      }, 1700);
    }
  };

  const draggedPiece =
    dragState !== null ? pieces[dragState.pieceIndex] : null;
  const draggedCenter = dragState ? getDraggedPieceCenter(dragState) : null;

  return (
    <div className="safe-area-inset puzzle-touch-area flex flex-col w-full h-dvh overflow-hidden bg-[#FFFBF0]">
      {isVictory && <ConfettiBurst />}

      {/* Always-Visible Top Control Bar */}
      <header className="flex items-center justify-between gap-2 sm:gap-3 shrink-0 pb-2">
        <div className="flex items-center gap-2 min-w-0">
          {/* Rumah */}
          <button
            type="button"
            onClick={() => {
              playClickSound(soundEnabled);
              onGoHome();
            }}
            aria-label="Rumah"
            className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 min-w-[80px] min-h-[60px] sm:min-h-[76px] px-3 sm:px-4 rounded-2xl bg-[#FF6B4A] text-white font-bold text-xs sm:text-base border-3 border-[#2D2424] border-b-[6px] active:border-b-3 active:translate-y-[3px] transition-transform cursor-pointer shrink-0"
          >
            <Home className="w-6 h-6 sm:w-7 sm:h-7 shrink-0" strokeWidth={2.75} />
            <span>Rumah</span>
          </button>

          {/* Level Info Pill-Free Title */}
          <div className="hidden md:flex flex-col px-2 min-w-0">
            <span className="text-xl font-bold text-[#2D2424] leading-tight truncate">
              {level.title}
            </span>
            <span className="text-xs font-semibold text-[#6B5B5B] whitespace-nowrap">
              Level {level.level} · {placedIndices.size}/{pieces.length} Keping
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0 overflow-x-auto">
          {/* Ulangi */}
          <button
            type="button"
            onClick={handleResetPuzzle}
            aria-label="Ulangi"
            className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 min-w-[80px] min-h-[60px] sm:min-h-[76px] px-3 sm:px-4 rounded-2xl bg-white text-[#2D2424] font-bold text-xs sm:text-base border-3 border-[#2D2424] border-b-[6px] active:border-b-3 active:translate-y-[3px] transition-transform cursor-pointer shrink-0"
          >
            <RotateCcw
              className="w-6 h-6 sm:w-7 sm:h-7 shrink-0"
              strokeWidth={2.75}
            />
            <span>Ulangi</span>
          </button>

          {/* Acak Ulang */}
          <button
            type="button"
            onClick={handleShuffleTray}
            aria-label="Acak Ulang"
            className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 min-w-[80px] min-h-[60px] sm:min-h-[76px] px-3 sm:px-4 rounded-2xl bg-[#38BDF8] text-white font-bold text-xs sm:text-base border-3 border-[#2D2424] border-b-[6px] active:border-b-3 active:translate-y-[3px] transition-transform cursor-pointer shrink-0"
          >
            <Shuffle
              className="w-6 h-6 sm:w-7 sm:h-7 shrink-0"
              strokeWidth={2.75}
            />
            <span className="whitespace-nowrap">Acak Ulang</span>
          </button>

          {/* Bantuan (3 detik) */}
          <button
            type="button"
            onClick={handleShowHint}
            disabled={hintSecondsLeft > 0 || isVictory}
            aria-label="Bantuan lihat gambar 3 detik"
            className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 min-w-[80px] min-h-[60px] sm:min-h-[76px] px-3 sm:px-4 rounded-2xl font-bold text-xs sm:text-base border-3 border-[#2D2424] border-b-[6px] active:border-b-3 active:translate-y-[3px] transition-transform cursor-pointer shrink-0 ${
              hintSecondsLeft > 0
                ? 'bg-[#FDE047] text-[#2D2424]'
                : 'bg-[#FBBF24] text-[#2D2424]'
            }`}
          >
            <Eye
              className="w-6 h-6 sm:w-7 sm:h-7 shrink-0"
              strokeWidth={2.75}
            />
            <span>
              {hintSecondsLeft > 0 ? `${hintSecondsLeft}d` : 'Bantuan'}
            </span>
          </button>

          {/* Suara On/Off */}
          <button
            type="button"
            onClick={onToggleSound}
            aria-label={soundEnabled ? 'Matikan Suara' : 'Nyalakan Suara'}
            className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 min-w-[80px] min-h-[60px] sm:min-h-[76px] px-3 sm:px-4 rounded-2xl font-bold text-xs sm:text-base border-3 border-[#2D2424] border-b-[6px] active:border-b-3 active:translate-y-[3px] transition-transform cursor-pointer shrink-0 ${
              soundEnabled
                ? 'bg-[#22C55E] text-white'
                : 'bg-[#E5E7EB] text-[#4B5563]'
            }`}
          >
            {soundEnabled ? (
              <Volume2
                className="w-6 h-6 sm:w-7 sm:h-7 shrink-0"
                strokeWidth={2.75}
              />
            ) : (
              <VolumeX
                className="w-6 h-6 sm:w-7 sm:h-7 shrink-0"
                strokeWidth={2.75}
              />
            )}
            <span>{soundEnabled ? 'Suara' : 'Diam'}</span>
          </button>
        </div>
      </header>

      {/* Portrait gentle nudge (non-blocking) */}
      {isPortrait && (
        <div className="shrink-0 mb-1.5 text-center text-xs font-bold text-[#9A3412] bg-[#FFEDD5] border-2 border-[#FB923C] rounded-xl py-1 px-3">
          Putar HP ke samping (landscape) agar bermain lebih lega!
        </div>
      )}

      {/* Main Split Workspace: Board on Left, Shuffled Pieces on Right */}
      <div
        className={`flex-1 min-h-0 grid gap-3 sm:gap-5 ${
          isPortrait ? 'grid-rows-2 grid-cols-1' : 'grid-cols-2 grid-rows-1'
        }`}
      >
        {/* LEFT: PUZZLE BOARD */}
        <section
          ref={boardContainerRef}
          aria-label="Papan Puzzle"
          className="relative flex items-center justify-center rounded-3xl bg-[#FDE68A]/55 border-4 border-[#D99B52] p-2 sm:p-3 min-h-0 min-w-0"
        >
          <div
            ref={boardFrameRef}
            style={{
              width: `${renderedBoardW}px`,
              height: `${renderedBoardH}px`,
            }}
            className={`relative rounded-2xl bg-[#FFFDF7] border-4 border-[#2D2424] shadow-md transition-transform ${
              isVictory ? 'animate-celebrate-wiggle' : ''
            }`}
          >
            {/* Faint Silhouette Guide + Jigsaw Outlines */}
            <svg
              width={renderedBoardW}
              height={renderedBoardH}
              viewBox={`0 0 ${level.boardWidth} ${level.boardHeight}`}
              className="block w-full h-full rounded-xl"
            >
              {/* Faint transparent reference picture */}
              <g opacity={isVictory ? 1 : 0.22}>
                <PuzzleArt imageId={level.imageId} />
              </g>

              {/* Jigsaw Slot Outlines */}
              {!isVictory &&
                pieces.map((p) => {
                  const isHovered = hoveredTargetIndex === p.index;
                  return (
                    <path
                      key={p.index}
                      d={p.pathD}
                      fill={
                        isHovered ? 'rgba(250, 204, 21, 0.38)' : 'transparent'
                      }
                      stroke={isHovered ? '#F59E0B' : '#94A3B8'}
                      strokeWidth={isHovered ? 5 : 2.5}
                      strokeDasharray={isHovered ? undefined : '6 5'}
                    />
                  );
                })}
            </svg>

            {/* Placed Snapped Pieces */}
            {!isVictory &&
              pieces.map((p) => {
                if (!placedIndices.has(p.index)) return null;
                const left = p.col * cellScaled - padScaled;
                const top = p.row * cellScaled - padScaled;
                const isJustSnapped = justSnappedIndex === p.index;

                return (
                  <div
                    key={p.index}
                    style={{
                      left: `${left}px`,
                      top: `${top}px`,
                      width: `${fullPieceScaledSize}px`,
                      height: `${fullPieceScaledSize}px`,
                    }}
                    className={`pointer-events-none absolute ${
                      isJustSnapped ? 'animate-snap-pop' : ''
                    }`}
                  >
                    <JigsawPieceSvg
                      piece={p}
                      imageId={level.imageId}
                      uidPrefix={`board-${rawUid}`}
                      width={fullPieceScaledSize}
                      height={fullPieceScaledSize}
                      strokeWidth={3}
                    />
                  </div>
                );
              })}

            {/* 3-Second Help Overlay */}
            {hintSecondsLeft > 0 && !isVictory && (
              <div className="absolute inset-0 z-20 rounded-xl overflow-hidden border-4 border-[#FACC15] shadow-xl">
                <svg
                  viewBox={`0 0 ${level.boardWidth} ${level.boardHeight}`}
                  className="w-full h-full block"
                >
                  <PuzzleArt imageId={level.imageId} />
                </svg>
                <div className="absolute top-2 right-2 px-3 py-1 rounded-xl bg-[#FACC15] border-2 border-[#2D2424] text-[#2D2424] font-bold text-sm">
                  Bantuan · {hintSecondsLeft}
                </div>
              </div>
            )}
          </div>

          {/* Gentle "Coba lagi ya!" Toast */}
          {wrongMessage && !isVictory && (
            <div
              role="status"
              className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#FFFBEB] border-3 border-[#2D2424] shadow-lg animate-gentle-bounce"
            >
              <Smile className="w-7 h-7 text-[#F97316] shrink-0" strokeWidth={2.75} />
              <span className="text-lg sm:text-xl font-bold text-[#2D2424] whitespace-nowrap">
                Coba lagi ya!
              </span>
            </div>
          )}
        </section>

        {/* RIGHT: SHUFFLED PIECES TRAY */}
        <section
          ref={trayContainerRef}
          aria-label="Keping Puzzle"
          className="relative flex flex-col items-center justify-center rounded-3xl bg-white/85 border-4 border-[#2D2424] p-2 sm:p-3 min-h-0 min-w-0"
        >
          <div
            className="grid items-center justify-items-center gap-2 sm:gap-3"
            style={{
              gridTemplateColumns: `repeat(${level.cols}, minmax(0, 1fr))`,
            }}
          >
            {trayOrder.map((pieceIdx) => {
              const piece = pieces[pieceIdx];
              const isPlaced = placedIndices.has(piece.index);
              const isBeingDragged = dragState?.pieceIndex === piece.index;

              return (
                <div
                  key={piece.index}
                  style={{
                    width: `${trayPieceDisplaySize}px`,
                    height: `${trayPieceDisplaySize}px`,
                  }}
                  className="relative flex items-center justify-center rounded-2xl bg-[#FFFBF0] border-2 border-dashed border-[#CBD5E1]"
                >
                  {!isPlaced && (
                    <button
                      type="button"
                      onPointerDown={(e) => handlePointerDownPiece(e, piece)}
                      onPointerMove={handlePointerMovePiece}
                      onPointerUp={handlePointerUpPiece}
                      onPointerCancel={handlePointerUpPiece}
                      aria-label={`Keping puzzle ${piece.row + 1}-${piece.col + 1}`}
                      style={{
                        width: `${trayPieceDisplaySize}px`,
                        height: `${trayPieceDisplaySize}px`,
                      }}
                      className={`puzzle-touch-area flex items-center justify-center cursor-grab active:cursor-grabbing transition-opacity duration-150 focus-visible:outline-3 focus-visible:outline-[#FF6B4A] rounded-2xl ${
                        isBeingDragged
                          ? 'opacity-20 scale-95'
                          : 'opacity-100 hover:scale-105'
                      }`}
                    >
                      <JigsawPieceSvg
                        piece={piece}
                        imageId={level.imageId}
                        uidPrefix={`tray-${rawUid}`}
                        width={trayPieceDisplaySize * 0.92}
                        height={trayPieceDisplaySize * 0.92}
                        strokeWidth={4}
                        className="drop-shadow-md pointer-events-none"
                      />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* FLOATING DRAGGED PIECE LAYER */}
      {draggedPiece && draggedCenter && (
        <div
          style={{
            left: `${draggedCenter.cx - fullPieceScaledSize / 2}px`,
            top: `${draggedCenter.cy - fullPieceScaledSize / 2}px`,
            width: `${fullPieceScaledSize}px`,
            height: `${fullPieceScaledSize}px`,
          }}
          className="pointer-events-none fixed z-40 drop-shadow-2xl scale-105"
        >
          <JigsawPieceSvg
            piece={draggedPiece}
            imageId={level.imageId}
            uidPrefix={`drag-${rawUid}`}
            width={fullPieceScaledSize}
            height={fullPieceScaledSize}
            strokeWidth={3.5}
          />
        </div>
      )}

      {/* VICTORY MODAL OVERLAY (Keeps completed dancing picture visible on side or mini-showcase!) */}
      {isVictory && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/35 p-3 sm:p-6">
          <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-7 w-full max-w-2xl rounded-3xl bg-[#FFFBF0] border-4 border-[#2D2424] p-5 sm:p-7 shadow-2xl">
            {/* Dancing Completed Picture */}
            <div className="w-40 h-40 sm:w-52 sm:h-52 rounded-2xl border-4 border-[#2D2424] bg-white overflow-hidden shrink-0 animate-celebrate-wiggle shadow-md flex items-center justify-center">
              <svg
                viewBox={`0 0 ${level.boardWidth} ${level.boardHeight}`}
                className="w-full h-full block"
              >
                <PuzzleArt imageId={level.imageId} />
              </svg>
            </div>

            {/* Stars, Hebat! & Big Buttons */}
            <div className="flex flex-col items-center text-center flex-1 gap-3">
              <div className="flex items-center gap-2">
                {[1, 2, 3].map((idx) => (
                  <Star
                    key={idx}
                    style={{animationDelay: `${idx * 0.14}s`}}
                    className={`w-12 h-12 sm:w-14 sm:h-14 animate-star-pop ${
                      idx <= earnedStars
                        ? 'text-[#F59E0B] fill-[#FBBF24]'
                        : 'text-[#D1D5DB] fill-[#E5E7EB]'
                    }`}
                    strokeWidth={2.2}
                  />
                ))}
              </div>

              <div>
                <h2 className="text-4xl sm:text-5xl font-bold text-[#FF6B4A] leading-none">
                  Hebat!
                </h2>
                <p className="mt-1.5 text-xl sm:text-2xl font-bold text-[#2D2424]">
                  {level.title} selesai!
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 mt-2 w-full">
                <button
                  type="button"
                  onClick={handleResetPuzzle}
                  className="flex items-center justify-center gap-2 min-w-[80px] min-h-[68px] sm:min-h-[80px] px-5 rounded-2xl bg-white text-[#2D2424] font-bold text-base sm:text-lg border-3 border-[#2D2424] border-b-[6px] active:border-b-3 active:translate-y-[3px] cursor-pointer"
                >
                  <RotateCcw className="w-6 h-6" strokeWidth={2.75} />
                  <span>Main Lagi</span>
                </button>

                {hasNextLevel ? (
                  <button
                    type="button"
                    onClick={() => {
                      playClickSound(soundEnabled);
                      onNextLevel();
                    }}
                    className="flex items-center justify-center gap-2 min-w-[80px] min-h-[68px] sm:min-h-[80px] px-6 rounded-2xl bg-[#22C55E] text-white font-bold text-base sm:text-lg border-3 border-[#2D2424] border-b-[6px] active:border-b-3 active:translate-y-[3px] cursor-pointer"
                  >
                    <span>Lanjut</span>
                    <ArrowRight className="w-6 h-6" strokeWidth={2.75} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      playClickSound(soundEnabled);
                      onGoHome();
                    }}
                    className="flex items-center justify-center gap-2 min-w-[80px] min-h-[68px] sm:min-h-[80px] px-6 rounded-2xl bg-[#0EA5E9] text-white font-bold text-base sm:text-lg border-3 border-[#2D2424] border-b-[6px] active:border-b-3 active:translate-y-[3px] cursor-pointer"
                  >
                    <Home className="w-6 h-6" strokeWidth={2.75} />
                    <span>Pilih Tema</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

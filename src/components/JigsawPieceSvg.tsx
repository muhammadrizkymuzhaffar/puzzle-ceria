import React from 'react';
import {PuzzleImageId} from '../types/puzzle';
import {JigsawPieceGeometry} from '../utils/jigsawGeometry';
import {PuzzleArt} from './illustrations/PuzzleArt';

interface JigsawPieceSvgProps {
  piece: JigsawPieceGeometry;
  imageId: PuzzleImageId;
  uidPrefix: string;
  width: number;
  height: number;
  showOutline?: boolean;
  strokeWidth?: number;
  className?: string;
}

export const JigsawPieceSvg: React.FC<JigsawPieceSvgProps> = ({
  piece,
  imageId,
  uidPrefix,
  width,
  height,
  showOutline = true,
  strokeWidth = 3.2,
  className = '',
}) => {
  const vx = piece.x - piece.pad;
  const vy = piece.y - piece.pad;
  const vw = piece.size + piece.pad * 2;
  const vh = piece.size + piece.pad * 2;
  const clipId = `${uidPrefix}-${piece.clipId}`;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`${vx} ${vy} ${vw} ${vh}`}
      className={className}
      style={{overflow: 'visible'}}
    >
      <defs>
        <clipPath id={clipId}>
          <path d={piece.pathD} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <PuzzleArt imageId={imageId} />
      </g>
      {showOutline && (
        <path
          d={piece.pathD}
          fill="none"
          stroke="#2D2424"
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
};

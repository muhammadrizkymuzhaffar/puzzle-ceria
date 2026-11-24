export interface JigsawPieceGeometry {
  index: number;
  row: number;
  col: number;
  x: number;
  y: number;
  size: number;
  pad: number;
  pathD: string;
  clipId: string;
}

/**
 * Generates symmetric cubic Bezier commands for one edge from (x1, y1) to (x2, y2).
 * tab: 0 = flat, +1 = outward knob, -1 = inward socket.
 */
function buildJigsawEdge(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  tab: number
): string {
  if (tab === 0) {
    return `L ${x2.toFixed(2)} ${y2.toFixed(2)}`;
  }

  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  const ux = dx / len;
  const uy = dy / len;
  // Outward normal for clockwise traversal in screen coordinates
  const nx = uy * tab;
  const ny = -ux * tab;

  const pt = (t: number, n: number) => {
    const px = x1 + dx * t + nx * len * n;
    const py = y1 + dy * t + ny * len * n;
    return `${px.toFixed(2)} ${py.toFixed(2)}`;
  };

  // Symmetric rounded knob profile centered at t = 0.5
  return [
    `L ${pt(0.34, 0)}`,
    `C ${pt(0.41, 0)}, ${pt(0.39, 0.08)}, ${pt(0.36, 0.14)}`,
    `C ${pt(0.32, 0.22)}, ${pt(0.41, 0.27)}, ${pt(0.5, 0.27)}`,
    `C ${pt(0.59, 0.27)}, ${pt(0.68, 0.22)}, ${pt(0.64, 0.14)}`,
    `C ${pt(0.61, 0.08)}, ${pt(0.59, 0)}, ${pt(0.66, 0)}`,
    `L ${pt(1, 0)}`,
  ].join(' ');
}

function deterministicTab(seed: number, r: number, c: number, isVertical: boolean): number {
  const hash = (seed * 31 + r * 17 + c * 23 + (isVertical ? 7 : 13)) % 2;
  return hash === 0 ? 1 : -1;
}

export function generateJigsawGrid(
  puzzleId: string,
  rows: number,
  cols: number,
  cellSize: number
): JigsawPieceGeometry[] {
  const pad = Math.round(cellSize * 0.3);
  const cornerRadius = 16;
  const seed = puzzleId.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);

  // Precompute shared seams
  const verticalSeams: number[][] = Array.from({length: rows}, (_, r) =>
    Array.from({length: cols - 1}, (_, c) => deterministicTab(seed, r, c, true))
  );
  const horizontalSeams: number[][] = Array.from({length: rows - 1}, (_, r) =>
    Array.from({length: cols}, (_, c) => deterministicTab(seed, r, c, false))
  );

  const pieces: JigsawPieceGeometry[] = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = c * cellSize;
      const y = r * cellSize;

      const tabTop = r === 0 ? 0 : -horizontalSeams[r - 1][c];
      const tabRight = c === cols - 1 ? 0 : verticalSeams[r][c];
      const tabBottom = r === rows - 1 ? 0 : horizontalSeams[r][c];
      const tabLeft = c === 0 ? 0 : -verticalSeams[r][c - 1];

      const tlRound = r === 0 && c === 0 ? cornerRadius : 0;
      const trRound = r === 0 && c === cols - 1 ? cornerRadius : 0;
      const brRound = r === rows - 1 && c === cols - 1 ? cornerRadius : 0;
      const blRound = r === rows - 1 && c === 0 ? cornerRadius : 0;

      const startX = x + tlRound;
      const startY = y;

      const commands: string[] = [`M ${startX.toFixed(2)} ${startY.toFixed(2)}`];

      // Top edge
      if (tabTop === 0) {
        commands.push(`L ${(x + cellSize - trRound).toFixed(2)} ${y.toFixed(2)}`);
      } else {
        commands.push(buildJigsawEdge(x + tlRound, y, x + cellSize - trRound, y, tabTop));
      }
      if (trRound > 0) {
        commands.push(
          `A ${trRound} ${trRound} 0 0 1 ${(x + cellSize).toFixed(2)} ${(y + trRound).toFixed(2)}`
        );
      }

      // Right edge
      if (tabRight === 0) {
        commands.push(`L ${(x + cellSize).toFixed(2)} ${(y + cellSize - brRound).toFixed(2)}`);
      } else {
        commands.push(
          buildJigsawEdge(
            x + cellSize,
            y + trRound,
            x + cellSize,
            y + cellSize - brRound,
            tabRight
          )
        );
      }
      if (brRound > 0) {
        commands.push(
          `A ${brRound} ${brRound} 0 0 1 ${(x + cellSize - brRound).toFixed(2)} ${(y + cellSize).toFixed(2)}`
        );
      }

      // Bottom edge
      if (tabBottom === 0) {
        commands.push(`L ${(x + blRound).toFixed(2)} ${(y + cellSize).toFixed(2)}`);
      } else {
        commands.push(
          buildJigsawEdge(
            x + cellSize - brRound,
            y + cellSize,
            x + blRound,
            y + cellSize,
            tabBottom
          )
        );
      }
      if (blRound > 0) {
        commands.push(
          `A ${blRound} ${blRound} 0 0 1 ${x.toFixed(2)} ${(y + cellSize - blRound).toFixed(2)}`
        );
      }

      // Left edge
      if (tabLeft === 0) {
        commands.push(`L ${x.toFixed(2)} ${(y + tlRound).toFixed(2)}`);
      } else {
        commands.push(
          buildJigsawEdge(x, y + cellSize - blRound, x, y + tlRound, tabLeft)
        );
      }
      if (tlRound > 0) {
        commands.push(
          `A ${tlRound} ${tlRound} 0 0 1 ${(x + tlRound).toFixed(2)} ${y.toFixed(2)}`
        );
      }

      commands.push('Z');

      pieces.push({
        index: r * cols + c,
        row: r,
        col: c,
        x,
        y,
        size: cellSize,
        pad,
        pathD: commands.join(' '),
        clipId: `clip-${puzzleId}-${r}-${c}`,
      });
    }
  }

  return pieces;
}

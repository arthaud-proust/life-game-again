export const AliveCell = true;
export const DeadCell = false;
export type CellState = typeof AliveCell | typeof DeadCell;

export type CellX = number;
export type CellY = number;
export type StrCellCoords = `${CellX}:${CellY}`;
export type CellCoords = { x: CellX; y: CellY };
export type AliveCellsGrid = Set<StrCellCoords>;
export type GridBounds = {
  topRight: CellCoords;
  bottomLeft: CellCoords;
  height: number;
  width: number;
};

export class InvalidStringifiedCellCoordError extends Error {}

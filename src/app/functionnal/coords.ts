import {
  CellCoords,
  InvalidStringifiedCellCoordError,
  StrCellCoords,
} from "./contracts";

export const parseCoords = (cellCoord: StrCellCoords): CellCoords => {
  if (typeof cellCoord !== "string") {
    throw new InvalidStringifiedCellCoordError();
  }

  const splittedCoord = cellCoord.split(":");
  if (splittedCoord.length !== 2) {
    throw new InvalidStringifiedCellCoordError();
  }

  const x = Number.parseInt(splittedCoord[0]);
  if (!Number.isInteger(x)) {
    throw new InvalidStringifiedCellCoordError();
  }

  const y = Number.parseInt(splittedCoord[1]);
  if (!Number.isInteger(y)) {
    throw new InvalidStringifiedCellCoordError();
  }

  return { x, y };
};

export const getAroundCellsCoords = (
  cellCoord: StrCellCoords,
): Array<StrCellCoords> => {
  const { x, y } = parseCoords(cellCoord);

  return [
    // Left side
    `${x - 1}:${y - 1}`,
    `${x - 1}:${y}`,
    `${x - 1}:${y + 1}`,

    // Upper and lower cell
    `${x}:${y - 1}`,
    `${x}:${y + 1}`,

    // Right line
    `${x + 1}:${y - 1}`,
    `${x + 1}:${y}`,
    `${x + 1}:${y + 1}`,
  ];
};

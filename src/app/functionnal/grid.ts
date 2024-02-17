import { getNextStateByCoordsForGrid } from "./cell";
import {
  AliveCell,
  AliveCellsGrid,
  CellState,
  DeadCell,
  GridBounds,
  StrCellCoords,
} from "./contracts";
import { getAroundCellsCoords, parseCoords } from "./coords";

export const nextGrid = (aliveCells: AliveCellsGrid): AliveCellsGrid => {
  const getNextStateByCoords = getNextStateByCoordsForGrid(aliveCells);

  const newGrid = Array.from(aliveCells).reduce<Array<StrCellCoords>>(
    (newAliveCells, cellCoords) => {
      if (getNextStateByCoords(cellCoords) === AliveCell) {
        newAliveCells.push(cellCoords);
      }

      getAroundCellsCoords(cellCoords).forEach((aroundCellCoords) => {
        if (getNextStateByCoords(aroundCellCoords) === AliveCell) {
          newAliveCells.push(aroundCellCoords);
        }
      });

      return newAliveCells;
    },
    [],
  );

  return new Set(newGrid);
};

export const getGridBounds = (aliveCells: AliveCellsGrid): GridBounds => {
  let topRight = { x: -Infinity, y: -Infinity };
  let bottomLeft = { x: +Infinity, y: +Infinity };

  for (const cellCoords of aliveCells) {
    const { x, y } = parseCoords(cellCoords);

    if (x > topRight.x) {
      topRight.x = x;
    }

    if (y > topRight.y) {
      topRight.y = y;
    }

    if (x < bottomLeft.x) {
      bottomLeft.x = x;
    }

    if (y < bottomLeft.y) {
      bottomLeft.y = y;
    }
  }

  return {
    topRight,
    bottomLeft,
    height: Math.abs(topRight.y - bottomLeft.y) + 1,
    width: Math.abs(topRight.x - bottomLeft.x) + 1,
  };
};

export const gridToMatrix = (
  aliveCells: AliveCellsGrid,
): Array<Array<boolean>> => {
  const { topRight, bottomLeft, height, width } = getGridBounds(aliveCells);

  if (height === Infinity || width === Infinity) {
    return [];
  }

  const array = Array.from({ length: width }, () =>
    Array.from({ length: height }, () => DeadCell),
  );

  const xDiff = -bottomLeft.x;
  const yDiff = -bottomLeft.y;

  for (const cellCoords of aliveCells) {
    const { x, y } = parseCoords(cellCoords);

    array[x + xDiff][y + yDiff] = AliveCell;
  }

  return array;
};

export const gridToString = (aliveCells: AliveCellsGrid): string => {
  const matrix = gridToMatrix(aliveCells);

  return matrix
    .map((column) =>
      column
        .map((cellState: CellState) => (cellState === AliveCell ? "x" : " "))
        .join(" "),
    )
    .join("\n");
};

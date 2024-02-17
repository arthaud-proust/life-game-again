import {
  AliveCell,
  AliveCellsGrid,
  CellState,
  DeadCell,
  StrCellCoords,
} from "./contracts";
import { getAroundCellsCoords } from "./coords";

export const getStateForGrid =
  (aliveCells: AliveCellsGrid) =>
  (cellCoords: StrCellCoords): CellState =>
    aliveCells.has(cellCoords) ? AliveCell : DeadCell;

export const getAliveAroundCountForGrid = (aliveCells: AliveCellsGrid) => {
  const getState = getStateForGrid(aliveCells);

  return (cellCoords: StrCellCoords) =>
    getAroundCellsCoords(cellCoords).reduce((count, aroundCell) => {
      if (getState(aroundCell) === AliveCell) {
        count++;
      }
      return count;
    }, 0);
};

export const aliveGetNextState = (aliveCellsAround: number): CellState => {
  if (aliveCellsAround === 2 || aliveCellsAround === 3) {
    return AliveCell;
  }

  return DeadCell;
};

export const deadGetNextState = (aliveCellsAround: number): CellState => {
  if (aliveCellsAround === 3) {
    return AliveCell;
  }

  return DeadCell;
};

export const getNextState = (cellState: CellState) => {
  return cellState === AliveCell ? aliveGetNextState : deadGetNextState;
};

export const getNextStateByCoordsForGrid = (aliveCells: AliveCellsGrid) => {
  const getAliveAroundCount = getAliveAroundCountForGrid(aliveCells);
  const getState = getStateForGrid(aliveCells);

  return (cellCoords: StrCellCoords): CellState => {
    return getNextState(getState(cellCoords))(getAliveAroundCount(cellCoords));
  };
};

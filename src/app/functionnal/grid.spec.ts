import { describe, expect, it } from "vitest";
import {
  AliveCell,
  AliveCellsGrid,
  DeadCell,
  StrCellCoords,
} from "./contracts";
import { getGridBounds, gridToMatrix, nextGrid } from "./grid";

describe("nextGrid", () => {
  it("should kill the only cell", () => {
    const grid1: AliveCellsGrid = new Set(["0:0"]);
    const grid2 = nextGrid(grid1);

    expect(grid2.size).toBe(0);
  });

  it("should keep all cells alive", () => {
    const grid1: AliveCellsGrid = new Set(["0:0", "0:1", "1:0", "1:1"]);
    const grid2 = nextGrid(grid1);

    expect(grid2).toStrictEqual(grid1);
  });

  it("should born a new cell", () => {
    const grid1: AliveCellsGrid = new Set(["0:0", "0:1", "1:0"]);
    const grid2 = nextGrid(grid1);

    expect(grid2.has("0:0")).toBeTruthy();
    expect(grid2.has("0:1")).toBeTruthy();
    expect(grid2.has("1:0")).toBeTruthy();
    expect(grid2.has("1:1")).toBeTruthy();
    expect(grid2.size).toBe(4);
  });

  it("should rotate the line", () => {
    const grid1: AliveCellsGrid = new Set(["1:0", "0:0", "-1:0"]);
    const grid2 = nextGrid(grid1);

    expect(grid2.has("0:1")).toBeTruthy();
    expect(grid2.has("0:0")).toBeTruthy();
    expect(grid2.has("0:-1")).toBeTruthy();
    expect(grid2.size).toBe(3);
  });
});

describe("getGridCorners", () => {
  it("should return 0 for empty grid", () => {
    expect(getGridBounds(new Set())).toStrictEqual({
      topRight: { x: -Infinity, y: -Infinity },
      bottomLeft: { x: +Infinity, y: +Infinity },
      height: Infinity,
      width: Infinity,
    });
  });

  it("should find top left and bottom right corners", () => {
    expect(getGridBounds(new Set(["-1:0", "3:4"]))).toStrictEqual({
      topRight: { x: 3, y: 4 },
      bottomLeft: { x: -1, y: 0 },
      height: 5,
      width: 5,
    });

    expect(
      getGridBounds(new Set(["-100:0", "10:-10", "800:800", "3:4"])),
    ).toStrictEqual({
      topRight: { x: 800, y: 800 },
      bottomLeft: { x: -100, y: -10 },
      height: 811,
      width: 901,
    });
  });
});

describe("gridToMatrix", () => {
  it("should return empty array for empty grid", () => {
    expect(gridToMatrix(new Set())).toStrictEqual([]);
  });

  it("should return an array with same size", () => {
    const array = gridToMatrix(new Set(["-2:-1", "1:1"]));

    expect(array).toHaveLength(4);
    expect(array[0]).toHaveLength(3);
    expect(array[1]).toHaveLength(3);
    expect(array[2]).toHaveLength(3);
    expect(array[3]).toHaveLength(3);
  });

  it("should transform all present key to Alive Cell", () => {
    expect(gridToMatrix(new Set(["0:0"]))).toStrictEqual([[AliveCell]]);
  });

  it("should transform all not present key to Dead Cell", () => {
    expect(gridToMatrix(new Set(["0:0", "0:2"]))).toStrictEqual([
      [AliveCell, DeadCell, AliveCell],
    ]);
  });

  it("should make bottomLeft coords start to 0", () => {
    expect(gridToMatrix(new Set(["-1:-1"]))).toStrictEqual([[AliveCell]]);
  });

  it("should work", () => {
    const grid = new Set<StrCellCoords>(["1:-1", "1:1", "2:-1", "2:0", "3:0"]);

    expect(gridToMatrix(grid)).toStrictEqual([
      [AliveCell, DeadCell, AliveCell],
      [AliveCell, AliveCell, DeadCell],
      [DeadCell, AliveCell, DeadCell],
    ]);
  });
});

import { describe, expect, it } from "vitest";
import {
  aliveGetNextState,
  deadGetNextState,
  getAliveAroundCountForGrid,
  getStateForGrid,
} from "./cell";
import { AliveCell, DeadCell } from "./contracts";

describe("getCellState", () => {
  it("should return dead when no cell in grid", () => {
    expect(getStateForGrid(new Set())("0:0")).toBe(DeadCell);
  });

  it("should return dead when cell is not present in grid", () => {
    expect(getStateForGrid(new Set(["0:1"]))("0:0")).toBe(DeadCell);
  });

  it("should return alive when cell is present in grid", () => {
    expect(getStateForGrid(new Set(["0:0"]))("0:0")).toBe(AliveCell);
  });
});

describe("aliveCountAround", () => {
  it("should return 0 when no cell", () => {
    expect(getAliveAroundCountForGrid(new Set())("0:0")).toBe(0);
  });

  it("should count cells around given coord", () => {
    // left side
    expect(getAliveAroundCountForGrid(new Set(["-1:-1"]))("0:0")).toBe(1);
    expect(getAliveAroundCountForGrid(new Set(["-1:0"]))("0:0")).toBe(1);
    expect(getAliveAroundCountForGrid(new Set(["-1:1"]))("0:0")).toBe(1);

    // up cell
    expect(getAliveAroundCountForGrid(new Set(["0:1"]))("0:0")).toBe(1);

    // down cell
    expect(getAliveAroundCountForGrid(new Set(["0:-1"]))("0:0")).toBe(1);

    // right side cell
    expect(getAliveAroundCountForGrid(new Set(["1:-1"]))("0:0")).toBe(1);
    expect(getAliveAroundCountForGrid(new Set(["1:0"]))("0:0")).toBe(1);
    expect(getAliveAroundCountForGrid(new Set(["1:1"]))("0:0")).toBe(1);
  });

  it("should not count given coord cell", () => {
    expect(getAliveAroundCountForGrid(new Set(["0:0"]))("0:0")).toBe(0);
  });

  it("should not count cell farest than around given coord", () => {
    expect(getAliveAroundCountForGrid(new Set(["2:0"]))("0:0")).toBe(0);
  });
});

describe("deadCellNextState", () => {
  it("should return dead cell when less than three cells around", () => {
    expect(deadGetNextState(0)).toBe(DeadCell);
    expect(deadGetNextState(1)).toBe(DeadCell);
    expect(deadGetNextState(2)).toBe(DeadCell);
  });

  it("should return alive cell when three cells around", () => {
    expect(deadGetNextState(3)).toBe(AliveCell);
  });

  it("should return dead cell when more than three cells around", () => {
    expect(deadGetNextState(4)).toBe(DeadCell);
    expect(deadGetNextState(5)).toBe(DeadCell);
    expect(deadGetNextState(6)).toBe(DeadCell);
    expect(deadGetNextState(7)).toBe(DeadCell);
    expect(deadGetNextState(8)).toBe(DeadCell);
  });
});

describe("aliveCellNextState", () => {
  it("should return dead cell when less than 2 cells around", () => {
    expect(aliveGetNextState(0)).toBe(DeadCell);
    expect(aliveGetNextState(1)).toBe(DeadCell);
  });

  it("should return alive cell when two or three cells around", () => {
    expect(aliveGetNextState(2)).toBe(AliveCell);
    expect(aliveGetNextState(3)).toBe(AliveCell);
  });

  it("should return dead cell when more than three cells around", () => {
    expect(aliveGetNextState(4)).toBe(DeadCell);
    expect(aliveGetNextState(5)).toBe(DeadCell);
    expect(aliveGetNextState(6)).toBe(DeadCell);
    expect(aliveGetNextState(7)).toBe(DeadCell);
    expect(aliveGetNextState(8)).toBe(DeadCell);
  });
});

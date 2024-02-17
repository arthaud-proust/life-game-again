import { describe, expect, it } from "vitest";
import { InvalidStringifiedCellCoordError } from "./contracts";
import { getAroundCellsCoords, parseCoords } from "./coords";

describe("parseCoords", () => {
  it('should return 0,0 when given "0:0"', () => {
    const coords = parseCoords("0:0");

    expect(coords).toStrictEqual({ x: 0, y: 0 });
  });

  it('should return -1,-1 when given "-1.-1"', () => {
    const coords = parseCoords("-1:-1");

    expect(coords).toStrictEqual({ x: -1, y: -1 });
  });

  it('should throw an error if coords are not "x.y" format ', () => {
    expect(() => parseCoords(0)).toThrowError(InvalidStringifiedCellCoordError);
    expect(() => parseCoords("0")).toThrowError(
      InvalidStringifiedCellCoordError,
    );
    expect(() => parseCoords("00")).toThrowError(
      InvalidStringifiedCellCoordError,
    );
    expect(() => parseCoords(":")).toThrowError(
      InvalidStringifiedCellCoordError,
    );
    expect(() => parseCoords("test")).toThrowError(
      InvalidStringifiedCellCoordError,
    );
    expect(() => parseCoords("0:0:0")).toThrowError(
      InvalidStringifiedCellCoordError,
    );
    expect(() => parseCoords(":00:0:0")).toThrowError(
      InvalidStringifiedCellCoordError,
    );
  });
});

describe("getAroundCellsCoords", () => {
  it("should return coords of cells around", () => {
    const coordsAround = getAroundCellsCoords("0:0");

    expect(coordsAround).toHaveLength(8);
    expect(coordsAround).toStrictEqual([
      "-1:-1",
      "-1:0",
      "-1:1",
      "0:-1",
      "0:1",
      "1:-1",
      "1:0",
      "1:1",
    ]);
  });
});

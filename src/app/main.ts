import { AliveCellsGrid } from "./functionnal/contracts";
import { gridToMatrix, gridToString, nextGrid } from "./functionnal/grid";

let grid: AliveCellsGrid = new Set(["0:0", "1:0", "2:0", "1:2", "2:1"]);

setInterval(() => {
  console.log(gridToString(grid));
  grid = nextGrid(grid);
}, 100);

export {};

// const filename = "./day8.txt";
const filename = "./day8_test.txt";

const input = await Deno.readTextFile(new URL(filename, import.meta.url));

const lines = input.split("\n");

const expected = 0;
let result = 21;

const [min, max] = [0, 9];

const grid = lines.map((line) => line.split("").map((c) => Number(c)));

const outside = 4 * grid.length - 4;
let inside = 0;

// console.log(grid);

for (let y = 1; y < grid.length - 1; y++) {
  for (let x = 1; x < grid[y].length - 1; x++) {
    const height = grid[y][x];

    const row = grid[y].slice();
    const col = grid.map((r) => r[x]);
    console.log(row);
    console.log(col);
    console.log("-----------------");

    const left: number[] = row.slice(0, x);
    const right: number[] = row.slice(x + 1);
    const up: number[] = col.slice(0, y);
    const down: number[] = col.slice(y + 1);

    const isVisible = [left, right, up, down]
      .map((direction) => {
        for (const tree of direction) if (height <= tree) return false;
        return true;
      })
      .includes(true);

    if (isVisible) inside++;
  }
}

result = inside + outside;

// const outerTrees = 4 * grid.length - 4;
// let innerTrees = 0;
// let highestScore = 0;

// console.log(grid);
/* 
for (let i = 0; i < treeGrid.length; i++) {
  //   if (i > 1) break;
//   console.log("!!!!!!");
//   console.log(treeGrid[i]);

  for (let j = 0; j < treeGrid[i].length; j++) {
    const tree = treeGrid[i][j];
    const [height] = tree;
    // const treesBetween = treeGrid[i].slice(j + 1).every((t) => t[0] < height);
    // console.log(treesBetween);

    // if (treesBetween) {
    //   treeGrid[i][j][1] = true;
    // }

    // A tree is visible if all of the other trees between it and an edge of the grid are shorter than it.
    const left: number[] = treeGrid[i].slice(j - 1, j)
    const right: number[] = treeGrid[i].slice(j + 1)

    // console.log("left", left);
    // console.log("right", right);

    let up = [];
    if (treeGrid[i - 1]) {
      up = treeGrid[i - 1].slice(j)
        // console.log("up", up);
    }

    let down = [];
    if (treeGrid[i + 1]) {
      down = treeGrid[i + 1].slice(j)
        // console.log("down", down);
    }

    // const directions: number[] = [].concat(left, right, up, down);
    // console.log(directions);

    let isVisible = false

    // edges

    // directions.forEach((x) => {
    //     for (const tree of x) if (height > x) isVisible = true;
    //     // isVisibleInDirection(height, x)
    // });

    // if (isVisible) {
    //     tree[1] = true;
    // } 

    // /* # edges
    // if not left or not right or not above or not below:
    //     visible += 1

    // # visible
    // elif any(map(lambda x: max(x) < cell, [left, right, above, below])):
    //     visible += 1

    // console.log("-----");
  }
}*/

console.log("result:", result);
console.assert(expected === result);

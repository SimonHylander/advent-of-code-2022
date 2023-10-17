export {};

const filename = "./day8.txt";
// const filename = "./day8_test.txt";

const input = await Deno.readTextFile(new URL(filename, import.meta.url));

const lines = input.split("\n");

const expected = 0;
let result = 21;

const [min, max] = [0, 9];

let treeGrid: [
  number,
  boolean,
][][] = input.split("\n").map((line) =>
  line.split("").map((num) => [parseInt(num), false])
);

const grid = lines.map((line) => line.split("").map((c) => Number(c)));

let highestScore = 0;

const isVisibleInDirection = (treeHeight: number, trees: number[]) => {
  for (const tree of trees) if (treeHeight <= tree) return false;
  return true;
};

for (let y = 1; y < grid.length - 1; y++) {
  for (let x = 1; x < grid[y].length - 1; x++) {
    const height = grid[y][x];

    const row = grid[y].slice();
    const col = grid.map((row) => row[x]);

    const left: number[] = row.slice(0, x).reverse();
    const right: number[] = row.slice(x + 1);
    const up: number[] = col.slice(0, y).reverse();
    const down: number[] = col.slice(y + 1);

    const totalScore = [left, right, up, down]
      .map((direction) => {
        let score = 0;
        for (const tree of direction) {
          score++;
          if (height <= tree) break;
        }
        return score;
      })
      .reduce((a, b) => a * b);

    if (totalScore > highestScore) highestScore = totalScore;
  }
}

console.log(highestScore);

console.log("result:", result);
console.assert(expected === result);

export {};

// const filename = "./day14.txt";
const filename = "./day14_test.txt";

const input = await Deno.readTextFile(new URL(filename, import.meta.url));

type Point = [number, number];
const points = input
  .split("\n")
  .map((line) => line.split(" -> "))
  .map((l) => l.map((s) => s.split(",").map((i) => parseInt(i)) as Point));

points.forEach((point, i) => {
  // console.log(point);
  for (let i = 0; i < points.length; i++) {
  }
});

let [mX, mY] = [0, 0];
points.forEach((g) => {
  g.forEach(([x, y]) => {
    if (x > mX) mX = x;
    if (y > mY) mY = y;
  });
});

const grid = Array.from(
  { length: mY + 1 },
  () => Array.from({ length: mX }, () => "."),
);

console.log(grid);

const expected = 0;
let result = 0;

//How many units of sand come to rest before sand starts flowing into the abyss below
console.log("result:", result);
console.assert(expected === result);

/* type Point = [number, number];
const points = input
  .split("\n")
  .map((line) => line.split(" -> "))
  .map((l) => l.map((s) => s.split(",").map((i) => parseInt(i)) as Point));

const tick = (grid: string[][]) => {
  let sand = [500, 0];
  if (grid[sand[1]][sand[0]] === "X") return true;
  while (true) {
    const [x, y] = sand;

    if (y === grid.length - 1 || y < 0 || x > grid[0].length - 1 || x < 0) {
      throw new Error("taken");
    }

    if (grid[y + 1][x] === ".") {
      sand = [x, y + 1];
    } else if (grid[y + 1][x - 1] === ".") {
      sand = [x - 1, y];
    } else if (grid[y + 1][x + 1] === ".") {
      sand = [x + 1, y];
    } else {
      break;
    }
  }

  grid[sand[1]][sand[0]] = "X";
};

let [mX, mY] = [0, 0];
points.forEach((g) => {
  g.forEach(([x, y]) => {
    if (x > mX) mX = x;
    if (y > mY) mY = y;
  });
});

const grid = Array.from(
  { length: mY + 1 },
  () => Array.from({ length: mX }, () => "."),
);

points.forEach((path) => {
  for (let i = 1; i < path.length; i++) {
    const [x1, y1] = path[i];
    const [x2, y2] = path[i - 1];
    const changed = x1 !== x2;
    const [min, max] = changed
      ? [x1, x2].sort((a, b) => a - b)
      : [y1, y2].sort((a, b) => a - b);
    for (let i = min; i <= max; i++) {
      grid[changed ? y1 : i][changed ? i : x1] = "#";
    }
  }
});

const run = (cave: string[][]) => {
  grid[0][500] = "+";
  let count = 0;
  try {
    while (!tick(cave)) {
      count++;
    }
  } catch {
    return count;
  }
  return count;
};

console.log(run(grid)); */

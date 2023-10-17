export {};

const filename = "./day10.txt";
// const filename = "./day10_test.txt";

const input = await Deno.readTextFile(new URL(filename, import.meta.url));

const lines = input.split("\n");

const expected = 0;
let result = 0;

// let cycle = 0;
let x = 1;
// const width = 40;
// const height = 6;

const instructions: number[] = [];

for (let i = 0; i < lines.length; i++) {
  instructions.push(0);

  const [ins, amount] = lines[i].split(" ");
  if (ins === "addx") instructions.push(parseInt(amount));
}

// define grid of 40x6
const grid: string[][] = Array.from(
  { length: 6 },
  () => new Array(40).fill(" "),
);

instructions.forEach((ins, index) => {
  const [dx, dy] = [index % 40, Math.floor(index / 40)];

  const shouldPaint = dx === x || dx === x - 1 || dx === x + 1;
  grid[dy][dx] = shouldPaint ? "X" : " ";
  x += ins;
});

grid.forEach((row) => {
  console.log(row.join(""));
});

console.log("result:", result);
console.assert(expected === result);
